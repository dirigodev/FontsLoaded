var gulp    = require('gulp'),
    gutil   = require('gulp-util');
    clean   = require('gulp-clean'),
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),
    stylish = require('jshint-stylish'),
    colors  = require('colors');


gulp.task('lint', function() {
    console.log('[lint]'.bold.magenta + ' Linting JS files');

    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));

});

gulp.task('uglify', ['clean'], function() {

    console.log('[uglify]'.bold.magenta + ' Minifying JS files');

    return gulp.src('./src/**/*.js')
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('dist'));

});

// Clean dist/css folder
gulp.task('clean', function() {

    console.log('[clean]'.bold.magenta + ' Deleting all the files in /dist');

    return gulp.src(['dist'], {read: false})
        .pipe(clean());

});


// Watch files for changes
gulp.task('watch', function() {

    console.log('[watch]'.bold.magenta + ' Watching JS files for changes');

    gulp.watch('./src/**/*.js', ['lint']);

});

// Default Task
gulp.task('default', ['lint', 'watch']);
