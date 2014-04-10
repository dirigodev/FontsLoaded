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

gulp.task('uglify', function() {

    console.log('[uglify]'.bold.magenta + ' Minifying JS files');

    return gulp.src('./src/**/*.js')
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('dist'));

});

// Clean dist/css folder
gulp.task('clean-dist-css', function() {

    console.log('[clean-dist-css]'.bold.magenta + ' Deleting all the files in /dist/css');

    return gulp.src(['dist/css', 'docs/dist/css', '_gh_pages/dist/css'], {read: false})
        .pipe(clean());

});


// Copy dist folder to docs folder
gulp.task('copy-dist', function () {

    console.log('[copy-dist]'.bold.magenta + ' Copying dist folder to docs');

    return gulp.src('dist/**/*', {base: './'})
        .pipe(gulp.dest('docs'))
        .pipe(gulp.dest('_gh_pages'));

});


// Watch files for changes
gulp.task('watch', function() {

    console.log('[watch]'.bold.magenta + ' Watching Sass files for changes');

    // gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/**/*.scss', ['copy-dist']);

});


// Start dev environment
gulp.task('dev', ['watch', 'jekyll-watch', 'livereload']);


// Default Task
gulp.task('default', ['sass', 'watch']);
