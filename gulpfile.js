/*JS VARIABLES*/
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
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

gulp.task('uglify-legacy', () => {
    return gulp.src('dist/*.legacy.js')
        .pipe(uglify({preserveComments: false, compress: true, mangle: true}).on('error',function(e){console.log('\x07',e.message);return this.end();}))
        .pipe(rename({extname : '.min.js'}))
        .pipe(gulp.dest(jsDist));
});

/*
WATCH
=====
*/
gulp.task('js-watch', ['babel','uglify-legacy']);
gulp.task('watch', function() {
  gulp.watch(jsSrc, ['js-watch']);
});