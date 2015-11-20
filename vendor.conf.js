/* global module */
// Vendor Bundle configuration
"use strict";

var VendorConfig = function () {
    var vendorPath = 'vendor/';

    return {
        getVendorJsList: function (dirPath, target) {
            var newDirPath = dirPath || '',
                minVendorList = [
                    newDirPath + vendorPath + 'jquery/dist/jquery.min.js',
                    newDirPath + vendorPath + 'jquery.cookie/jquery.cookie.js',
                    newDirPath + vendorPath + 'jquery-placeholder/jquery.placeholder.js',
                    newDirPath + vendorPath + 'modernizr/modernizr.js',
                    newDirPath + vendorPath + 'fastclick/lib/fastclick.js',
                    newDirPath + vendorPath + 'angular/angular.min.js',
                    newDirPath + vendorPath + 'angular-animate/angular-animate.min.js',
                    newDirPath + vendorPath + 'angular-ui-router/release/angular-ui-router.min.js',
                    newDirPath + vendorPath + 'angular-bootstrap/ui-bootstrap-tpls.min.js',
                    newDirPath + vendorPath + 'lodash/lodash.min.js'
                ],
                devVendorList = [
                    newDirPath + vendorPath + 'jquery/dist/jquery.js',
                    newDirPath + vendorPath + 'jquery.cookie/jquery.cookie.js',
                    newDirPath + vendorPath + 'jquery-placeholder/jquery.placeholder.js',
                    newDirPath + vendorPath + 'modernizr/modernizr.js',
                    newDirPath + vendorPath + 'fastclick/lib/fastclick.js',
                    newDirPath + vendorPath + 'angular/angular.js',
                    newDirPath + vendorPath + 'angular-animate/angular-animate.js',
                    newDirPath + vendorPath + 'angular-ui-router/release/angular-ui-router.js',
                    newDirPath + vendorPath + 'angular-bootstrap/ui-bootstrap-tpls.js',
                    newDirPath + vendorPath + 'lodash/lodash.js'

                ];
            return target && target === 'local' ? minVendorList : devVendorList;
        },

        getVendorStyleList: function (dirPath, target) {
            var newDirPath = dirPath || '',
                minVendorList = [
                    newDirPath + vendorPath + 'normalize-css/normalize.css',
                    newDirPath + vendorPath + 'bootstrap/dist/css/bootstrap.min.css'
                ],
                devVendorList = [
                    newDirPath + vendorPath + 'normalize-css/normalize.css',
                    newDirPath + vendorPath + 'bootstrap/dist/css/bootstrap.css'
                ];
            return target && target === 'local' ? minVendorList : devVendorList;
        }
    }
};

module.exports = VendorConfig;


