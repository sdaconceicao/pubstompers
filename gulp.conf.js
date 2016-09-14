'use strict';
//Plugins
var gulp = require('gulp'),
    argv = require("yargs").argv,
    ngTemplates = require('gulp-ng-templates'),
    karmaServer = require('karma').Server,
    webpack = require('webpack'),
    gutil = require("gulp-util"),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    mergeStream = require('merge-stream'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    preprocess = require('gulp-preprocess'),
    ngConstant = require('gulp-ng-constant'),
    del = require('del'),
    runSequence = require('run-sequence'),
    vendorConfig = require('./vendor.conf.js'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    historyApiFallback = require('connect-history-api-fallback');
;



//Directories/filenames
var APP_DIR = './app',
    DIST_DIR = './dist',
    CONFIG_FILE = 'app.conf.json',
    SCSS_MAIN_FILE = [APP_DIR + '/styles/main.scss'],
    SCSS_WATCH_FILES = [SCSS_MAIN_FILE, APP_DIR + '/components/**/*.scss', APP_DIR + '/modules/**/*.scss'],
    IMG_FILES = [APP_DIR + '/styles/images/*'],
    TEMPLATE_WATCH_FILES = [APP_DIR + '/components/**/*.html', APP_DIR + '/modules/**/*.html'],
    WEBPACK_CONF = require('./webpack.conf.js'),
    JS_MAIN_FILE = './app/app.js',
    JS_OUTPUT_FILE = 'scripts.min.js',
    VENDOR_BUNDLER_FILES = vendorConfig().getVendorJsList(APP_DIR + '/', buildTarget),
    VENDOR_OUTPUT_CSS = 'vendor.css',
    VENDOR_CSS_FILES = vendorConfig().getVendorStyleList(APP_DIR + '/', buildTarget),
    VENDOR_OUTPUT_FILE = 'vendor.min.js',
    FONT_FILES = [APP_DIR + '/vendor/components-font-awesome/fonts/*', APP_DIR + '/vendor/bootstrap/fonts/*'],
    MAIN_CSS_FILE = 'main.css',
    OUTPUT_CSS_FILE = 'styles.css'
;

var buildTarget = argv.buildTarget || "local";
var production = function () {
    return buildTarget ==='production';
};

gulp.task('webpack', function (done) {
    console.log("Building JS Watch");
    var wpconfig = WEBPACK_CONF;
    wpconfig.entry = JS_MAIN_FILE;
    wpconfig.output = {
        path: DIST_DIR,
        filename: JS_OUTPUT_FILE
    };
    wpconfig.watch = argv.watch || true;
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
    done();
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

gulp.task('sass', function (done) {
    console.log('Compiling CSS');
    var sassStream = gulp.src(SCSS_MAIN_FILE)
        .pipe(sass({outputStyle: production() ? 'compressed' : 'compressed'}))
        .pipe(autoprefixer('last 2 version')),
        vendorStream = gulp.src(VENDOR_CSS_FILES)
        .pipe(concat(VENDOR_OUTPUT_CSS))
        .pipe(gulp.dest(DIST_DIR));

    return mergeStream(vendorStream, sassStream)
        .pipe(concat(OUTPUT_CSS_FILE))
        .pipe(gulp.dest(DIST_DIR))
        .pipe(browserSync.stream());


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


gulp.task('img', function () {
    console.log("Moving Images");
    gulp.src(IMG_FILES)
        .pipe(gulp.dest(DIST_DIR + '/styles/images'));
});

gulp.task('fonts', function () {
    console.log("Moving Fonts");
    gulp.src(FONT_FILES)
        .pipe(gulp.dest(DIST_DIR + '/fonts'));
});

gulp.task('constants', function(){
    console.log("Creating constants");
    gulp.src(CONFIG_FILE)
        .pipe(ngConstant({
            name: 'pub.constants',
            wrap: ' /* global angular, module, require */ "use strict"; <%= __ngModule %>',
            merge: true,
            constants: {
                api:{
                    extralifeUrl: '//www.extra-life.org/index.cfm?format=json&fuseaction=',
                }
            }
        }))
        // Writes constants to config folder
        .pipe(rename('constants.js'))
        .pipe(gulp.dest(APP_DIR+'/config'));


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

    gulp.watch(TEMPLATE_WATCH_FILES, ['templates']);
    gulp.watch(SCSS_WATCH_FILES, ['sass']);
    gulp.watch(APP_DIR + '/index.html', ['index']);
    gulp.watch(FONT_FILES, ['fonts']);
    gulp.watch(APP_DIR + '/styles/images/*', ['img']);

});

gulp.task('default', function (done) {
    runSequence('constants', 'index', 'img', 'templates', 'sass', 'fonts', 'vendor', 'webpack', 'browser-sync', done);
});

gulp.task('build', function (done) {
    runSequence('constants', 'index', 'img', 'templates', 'sass', 'fonts', 'vendor', 'webpack', done);
});
