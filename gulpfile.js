'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('sass', () => {
    return gulp.src('src/assets/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('build/assets/css/'));
});

gulp.task('watch', () => {
    gulp.watch('src/assets/scss/**.scss', (done) => {
        gulp.series('sass') (done);
    });
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "build/",
            index: 'index.html',
            browser: ['chrome.exe']
        }
    });
    gulp.watch("src/assets/css/style.css").on('change', browserSync.reload);
    gulp.watch("src/assets/js/main.js").on('change', browserSync.reload);
    gulp.watch("src/views/*.html").on('change', browserSync.reload);

});

gulp.task('default', gulp.parallel('sass', 'serve', 'watch'));