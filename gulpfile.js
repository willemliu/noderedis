var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', (cb) => {
    del(['dist'], cb);
});

gulp.task('watch', ['build'], (cb) => {
    gulp.watch(['src/**/*.ts'], ['ts']);
    gulp.watch(['src/**/*.mst'], ['copy-templates']);
});

gulp.task('default', ['build']);

gulp.task('build', ['ts', 'copy-templates']);

gulp.task('ts', [], () => {
    return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-templates', [], () => {
    return gulp.src([
        './src/**/*.mst'
    ]).pipe(gulp.dest('./dist'))
    .on('end', function() {
        console.log('Copied fonts to build/css/fonts/');
    });
});