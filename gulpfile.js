var gulp    = require('gulp'),
    gutil   = require('gulp-util');
    clean   = require('gulp-clean'),
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),
    stylish = require('jshint-stylish'),
    rename  = require('gulp-rename'),
    colors  = require('colors');

function startExpress() {

    var express = require('express'),
        app     = express();

    app.use(express.static(__dirname + '/test'));
    app.listen(4000);

    console.log('\n[express]'.bold.magenta + ' Server running on port 4000\n');

}


gulp.task('lint', function() {
    console.log('[lint]'.bold.magenta + ' Linting JS files');

    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));

});


gulp.task('uglify', ['copy-src'], function() {

    console.log('[uglify]'.bold.magenta + ' Minifying JS files');

    return gulp.src('./src/**/*.js')
        .pipe(uglify({
            preserveComments : 'some',
            outSourceMap     : true
        }))
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist'));

});


// Clean dist/css folder
gulp.task('clean', function() {

    console.log('[clean]'.bold.magenta + ' Deleting all the files in /dist');

    return gulp.src(['dist'], {read: false})
        .pipe(clean());

});


// Copy dist folder to test folder
gulp.task('copy-src', ['clean'], function () {

    console.log('[copy-src]'.bold.magenta + ' Copying src folder to dist');

    return gulp.src('src/**/*', {base: './src'})
        .pipe(gulp.dest('dist'));

});


// Copy dist folder to test folder
gulp.task('copy-dist', ['uglify'], function () {

    console.log('[copy-dist]'.bold.magenta + ' Copying dist folder to test');

    return gulp.src('dist/**/*', {base: './'})
        .pipe(gulp.dest('test'));

});


// Watch files for changes
gulp.task('watch', function() {

    console.log('[watch]'.bold.magenta + ' Watching JS files for changes');

    gulp.watch('./src/**/*.js', ['lint', 'copy-dist']);

});


// Serve test site
gulp.task('server', ['copy-dist'], function () {

    console.log('[server]'.bold.magenta + ' Starting Express server');

    startExpress();

});


// Build dist files
gulp.task('build', ['copy-dist']);

gulp.task('dev', ['server', 'lint', 'watch']);

gulp.task('test', ['server']);

// Default Task
gulp.task('default', ['lint', 'watch']);
