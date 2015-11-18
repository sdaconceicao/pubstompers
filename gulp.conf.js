'use strict';
//Plugins
var gulp = require('gulp'),
    argv = require("yargs").argv,
    ngTemplates = require('gulp-ng-templates'),
    karmaServer = require('karma').Server,
    webpack = require('webpack'),
    gutil = require("gulp-util"),
    sass = require('gulp-ruby-sass'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    preprocess = require('gulp-preprocess'),
    del = require('del'),
    runSequence = require('run-sequence'),
    vendorConfig = require('./vendor.conf.js'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback');
;

//Directories/filenames
var APP_DIR = './app',
    DIST_DIR = './dist',
    SCSS_MAIN_FILE = [APP_DIR + '/styles/styles.scss'],
    SCSS_WATCH_FILES = [SCSS_MAIN_FILE, APP_DIR + '/components/**/*.scss', APP_DIR + '/modules/**/*.scss'],
    IMG_FILES = [APP_DIR + '/styles/images/**/*'],
    TEMPLATE_WATCH_FILES = [APP_DIR + '/components/**/*.html', APP_DIR + '/modules/**/*.html'],
    WEBPACK_CONF = require('./webpack.conf.js'),
    JS_MAIN_FILE = './app/app.js',
    JS_OUTPUT_FILE = 'scripts.min.js',
    VENDOR_BUNDLER_FILES = vendorConfig().getVendorFileList(APP_DIR + '/', buildTarget),
    VENDOR_OUTPUT_FILE = 'vendor.min.js',
    FONT_FILES = [APP_DIR + '/vendor/components-font-awesome/fonts/*']
;

var buildTarget = argv.buildTarget || "local";
var production = function () {
    return buildTarget ==='production';
};

gulp.task('js', function () {
    console.log("Building JS");
    var wpconfig = WEBPACK_CONF;
    wpconfig.entry = JS_MAIN_FILE;
    wpconfig.output = {
        path: DIST_DIR,
        filename: JS_OUTPUT_FILE
    };
    webpack(wpconfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('Error in Webpack bundle', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunks: false
        }));
    });
});

gulp.task('watch-js', function () {
    console.log("Building JS Watch");
    var wpconfig = WEBPACK_CONF;
    wpconfig.entry = JS_MAIN_FILE;
    wpconfig.output = {
        path: DIST_DIR,
        filename: JS_OUTPUT_FILE
    };
    wpconfig.watch = true;
    wpconfig.devtool = 'source-map';
    webpack(wpconfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('Error in Webpack bundle', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunks: false
        }));
    });
});

gulp.task('vendor', function () {
    console.log("Building vendor js");
    gulp.src(VENDOR_BUNDLER_FILES)
        .pipe(concat(VENDOR_OUTPUT_FILE))
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('templates', function () {
    console.log('Building $templateCache');
    return gulp.src(TEMPLATE_WATCH_FILES)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(ngTemplates({
            filename: 'templates.js',
            module: 'pub.templates',
            path: function (path, base) {
                return path.replace(base, '').replace('/templates', '');
            }
        }))
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('watch-templates', function () {
    console.log("Watching Templates");
    gulp.watch(TEMPLATE_WATCH_FILES, ['templates']);
});

gulp.task('sass', function (done) {
    console.log('Compiling CSS');
    return sass(SCSS_MAIN_FILE, { style: (production() ? 'compressed' : 'compressed') })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('watch-sass', function () {
    console.log("Watching Scss");
    gulp.watch(SCSS_WATCH_FILES, ['sass']);
});

gulp.task('index', function(){
    return gulp.src(APP_DIR + '/*.html')
        .pipe(preprocess({
            context: {
                cacheBreakParam: (argv.noCacheBreak ? "" : "?d=" + Date.now()),
                mobile: argv.mobile
            }
        }))
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('watch-index', function () {
    console.log("Watching Index");
    gulp.watch(APP_DIR + '/index.html', ['index']);
});

gulp.task('img', function () {
    console.log("Moving Images");
    gulp.src(IMG_FILES)
        .pipe(gulp.dest(DIST_DIR + '/images'));
});

gulp.task('watch-img', function(){
    console.log("Watching Images");
    gulp.watch(APP_DIR + '/images/**/*', ['img']);
});

gulp.task('fonts', function () {
    console.log("Moving Fonts");
    gulp.src(FONT_FILES)
        .pipe(gulp.dest(DIST_DIR + '/fonts'));
});

gulp.task('watch-fonts', function(){
    console.log("Watching Fontsxw");
    gulp.watch(FONT_FILES, ['fonts']);
});

gulp.task('browser-sync', function () {
    console.log("Loading BrowserSync");

    browserSync.init({
        server: {
            baseDir: [DIST_DIR],
            middleware: [historyApiFallback()]
        },
        files: [DIST_DIR + '/**'],
        port: 4142
        }, function (err) {
            if (err) {
                console.log("BrowserSync Error");
                gutil.beep();
                gutil.log(gutil.colors.bgRed('Error'), err.message);
                return this.end();
            } else {
                console.log("BrowserSync initialized");
            }
    });

});

gulp.task('tdd', function (done) {
    console.log('Start Jasmine Tests');
    new karmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('default', function (done) {
    runSequence('index', 'img', 'templates', 'sass', 'fonts', 'vendor',
        'watch-index', 'watch-img', 'watch-templates', 'watch-sass', 'watch-fonts', 'watch-js',
        'browser-sync', done);
});
