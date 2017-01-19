/*JS VARIABLES*/
const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

/* PATH VARIABLES */

//JS
var jsSrc = 'lightboxAnything.js';
var jsDist = 'legacy';

/*
Use next generation JavaScript, today.
========================================
*/

gulp.task('babel', () => {
    return gulp.src(jsSrc)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({extname : '.legacy.js'}))
        .pipe(gulp.dest(jsDist));
});



/*
WATCH
=====
*/
gulp.task('js-watch', ['babel']);
gulp.task('watch', function() {
  gulp.watch(jsSrc, ['js-watch']);
});