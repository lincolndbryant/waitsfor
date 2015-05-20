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
var extend = require('node.extend');

// Variables
var distDir = './dist';
var pkg = require('./package.json');
var banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');
var babelOptions = {
  modules: 'umd', moduleIds: true, getModuleId: function(name) { return name; }
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

  var specs = ['./spec/unit.js', '/.spec/integration.js'];
  var testBabelOptions = extend({}, {sourceMaps: 'inline', modules: 'ignore', moduleIds: false});
  return gulp.src(specs)
    .pipe(babel(testBabelOptions))
    .pipe(gulp.dest(distDir + '/spec'))
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
  gulp.watch('src/**/*', ['js']);
});

var bundle = ['node_modules/q/q.js', 'dist/js/waitsfor.js'];

gulp.task('test:unit', function() {
  var src = ['babel/register', 'spec/launch-unit.js']
  return gulp.src(src)
    .pipe(jasmine({
      includeStackTrace: true
    }));
});

gulp.task('test:phantom', ['js'], function() {
  var src = ['dist/spec/unit.js', 'dist/spec/integration.js'];
  return gulp.src(src)
    .pipe(jasmine({
      vendor: bundle,
      integration: true,
      //keepRunner: './',
      includeStackTrace: true
    }));
});

gulp.task('test', [
  'test:unit',
  'test:phantom'
]);

gulp.task('bump', function(){
  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['js']);

