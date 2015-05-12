var del         = require('del');
var gulp        = require('gulp');
var babel       = require('gulp-babel');
var bump        = require('gulp-bump');
var filter      = require('gulp-filter');
var sass        = require('gulp-ruby-sass');
var header      = require('gulp-header');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var tagVersion  = require('gulp-tag-version');
var umd         = require('gulp-wrap-umd');
var concat      = require('gulp-concat');

// Variables
var distDir = './dist';
var pkg = require('./package.json');
var banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');
var umdOptions = {
  exports: 'waitsFor',
  namespace: 'waitsFor',
  deps: [{
    name: 'waitsFor',
    globalName: 'waitsFor',
    paramName: 'waitsFor',
    amdName: 'waitsFor',
    cjsName: 'waitsFor'
  }]
};


// Clean
gulp.task('clean', function() {
  del.sync([distDir]);
});


// Javascript
gulp.task('js', ['clean'], function() {
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(umd(umdOptions))
    .pipe(header(banner))

    // Original
    .pipe(concat('waitsfor.js'))
    .pipe(gulp.dest(distDir + '/js'))

    // Minified
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(distDir + '/js'));
});


// Version bump
var VERSIONS = ['patch', 'minor', 'major'];
for (var i = 0; i < VERSIONS.length; ++i){
  (function(version) {
    var pkgFilter = filter('package.json');
    gulp.task('version:' + version, function() {
      gulp.src(['package.json', 'bower.json'])
        .pipe(bump({type: version}))
        .pipe(pkgFilter)
        .pipe(tagVersion())
        .pipe(pkgFilter.restore())
        .pipe(gulp.dest('.'))
    });
  })(VERSIONS[i]);
}


// Watch
gulp.task('watch', ['js'], function() {
  gulp.watch('./src/js/**/*', ['js']);
});


// Defaults
gulp.task('default', ['js'])

