'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyJs = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

gulp.task('sass', () => {
    return gulp.src('src/assets/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('build/assets/css/'));
});

gulp.task('minifyJS', function() {
    return gulp.src('src/assets/js/**/*.js')
      .pipe(minifyJs())
      .pipe(gulp.dest('build/assets/js/'))
});

gulp.task('imageminify', function() {
    return gulp.src('src/assets/images/**/**')
        .pipe(imagemin())
        .pipe(gulp.dest('build/assets/images/'))
});




// Watch files 
gulp.task('watch', () => {
    gulp.watch(['src/assets/scss/**/*.scss', 'src/assets/js/**/*.js'], (done) => {
        gulp.series('sass') (done);
        gulp.series('minifyJS') (done);
    });

    // Reload browser every changes made on these paths
    gulp.watch('src/assets/scss/**/*.scss').on('change', browserSync.reload);
    gulp.watch("src/assets/css/style.css").on('change', browserSync.reload);
    gulp.watch("src/assets/js/main.js").on('change', browserSync.reload);
    gulp.watch("build/views/**/*.html").on('change', browserSync.reload);
});

// Serve application
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "build/",
            index: 'index.html',
            browser: ['chrome.exe', '*']
        }
    });
});

// Task for development (default)
gulp.task('default', gulp.series('imageminify', gulp.parallel('minifyJS', 'sass', 'watch', 'serve')));

// Task for production build
gulp.task('production', gulp.series('imageminify', 'minifyJS', 'sass'));