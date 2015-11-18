/* global module */
// Vendor Bundle configuration
"use strict";

var VendorConfig = function () {
    var vendorPath = 'vendor/';

    return {
        getVendorFileList: function (dirPath, target) {
            var newDirPath = dirPath || '',
                minVendorList = [
                    newDirPath + vendorPath + 'jquery/dist/jquery.min.js',
                    newDirPath + vendorPath + 'jquery.cookie/jquery.cookie.js',
                    newDirPath + vendorPath + 'jquery-placeholder/jquery.placeholder.js',
                    newDirPath + vendorPath + 'modernizr/modernizr.js',
                    newDirPath + vendorPath + 'fastclick/lib/fastclick.js',
                    newDirPath + vendorPath + 'foundation/js/foundation.min.js',
                    newDirPath + vendorPath + 'foundation/js/foundation/foundation.dropdown.js',
                    newDirPath + vendorPath + 'angular/angular.min.js',
                    newDirPath + vendorPath + 'angular-animate/angular-animate.min.js',
                    newDirPath + vendorPath + 'angular-ui-router/release/angular-ui-router.min.js',
                    newDirPath + vendorPath + 'angular-foundation/mm-foundation.min.js',
                    newDirPath + vendorPath + 'angular-foundation/mm-foundation-tpls.min.js',
                    newDirPath + vendorPath + 'lodash/lodash.min.js'
                ],
                devVendorList = [
                    newDirPath + vendorPath + 'jquery/dist/jquery.js',
                    newDirPath + vendorPath + 'jquery.cookie/jquery.cookie.js',
                    newDirPath + vendorPath + 'jquery-placeholder/jquery.placeholder.js',
                    newDirPath + vendorPath + 'modernizr/modernizr.js',
                    newDirPath + vendorPath + 'fastclick/lib/fastclick.js',
                    newDirPath + vendorPath + 'foundation/js/foundation.js',
                    newDirPath + vendorPath + 'foundation/js/foundation/foundation.dropdown.js',
                    newDirPath + vendorPath + 'angular/angular.js',
                    newDirPath + vendorPath + 'angular-animate/angular-animate.js',
                    newDirPath + vendorPath + 'angular-ui-router/release/angular-ui-router.js',
                    newDirPath + vendorPath + 'angular-foundation/mm-foundation.js',
                    newDirPath + vendorPath + 'angular-foundation/mm-foundation-tpls.js',
                    newDirPath + vendorPath + 'lodash/lodash.js'

                ];
                return target && target === 'local' ? minVendorList : devVendorList;
        }
    };
};

module.exports = VendorConfig;


