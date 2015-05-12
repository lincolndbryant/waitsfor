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
var jasmine = require('gulp-jasmine-phantom');

// Variables
var distDir = './dist';
var pkg = require('./package.json');
var banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');
var babelOptions = {
  modules: 'umd',
  sourceRoot: 'src',
  moduleRoot: 'hubspot/waitsfor'
};

// Clean
gulp.task('clean', function() {
  del.sync([distDir]);
});


// Javascript
gulp.task('js', ['clean'], function() {
  gulp.src('./src/**/*.js')
    .pipe(babel(babelOptions))
    //.pipe(umd(umdOptions))
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

gulp.task('watch', ['js'], function() {
  gulp.watch('./src/js/**/*', ['js']);
});

gulp.task('test', function() {
  return gulp.src('spec/**/*.js')
    .pipe(babel())
    .pipe(jasmine({
      integration: true,
      quiet: true,
      keepRunner: true,
      vendor: ['node_modules/q/q.js', 'dist/js/waitsfor.js'],
      includeStackTrace: true
    }));
});

gulp.task('default', ['js'])

