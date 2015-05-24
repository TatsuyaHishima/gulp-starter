
/*------------------------------------------------------------------------------
 * Requirements
------------------------------------------------------------------------------*/

var gulp        = require('gulp');
var jade        = require('gulp-jade');
var imagemin    = require('gulp-imagemin');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var plumber     = require('gulp-plumber');
var browserSync = require('browser-sync');
var sass        = require('gulp-ruby-sass');
var pleeease    = require('gulp-pleeease');

/*------------------------------------------------------------------------------
 * File Paths
------------------------------------------------------------------------------*/

var paths = {
    'root'      : './',
    'srcDir'    : 'src',
    'srcJade'   : 'src/jade',
    'srcScss'   : 'src/scss',
    'srcJs'     : 'src/js',
    'srcImg'    : 'src/img',
    'distDir'   : 'dist',
    'distCss'   : 'dist/css',
    'distJs'    : 'dist/js',
    'distImg'   : 'dist/img'
}

/*------------------------------------------------------------------------------
 * browser-sync
------------------------------------------------------------------------------*/

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: paths.distDir
        }
    });
});


/*------------------------------------------------------------------------------
 * [Task] Jade
------------------------------------------------------------------------------*/

gulp.task('jade', function() {
    gulp.src([paths.srcJade + '/**/*.jade', '!' + paths.srcJade + '/**/_*.jade'])
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .on('error', console.log)
        .pipe(gulp.dest(paths.distDir))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/*------------------------------------------------------------------------------
 * [Task] Scss
------------------------------------------------------------------------------*/
gulp.task('scss', function() {
    return sass(paths.srcScss, {
            style: 'compressed',
            compass: true
        })
        .pipe(plumber())
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 2 versions']
            }
        }))
        .pipe(gulp.dest(paths.distCss))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/*------------------------------------------------------------------------------
 * 6. [Task] js
------------------------------------------------------------------------------*/
gulp.task('js', function() {
    gulp.src(paths.srcJs)
        .pipe(plumber())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js:vendor', function() {
    return gulp.src(paths.srcJs + '/vendor/')
        .pipe(gulp.dest('./dist/js/vendor'));
});

/*------------------------------------------------------------------------------
 * [Task] image
------------------------------------------------------------------------------*/
gulp.task('img', function() {
    gulp.src(paths.srcImg + '/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.distImg))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/*------------------------------------------------------------------------------
 * [Task] gulp
------------------------------------------------------------------------------*/
gulp.task('default', ['server', 'img', 'jade', 'scss', 'js'], function() {
    gulp.watch([paths.srcJade + '/**/*.jade'], ['jade']);
    gulp.watch([paths.srcJs + '/**/*.js'], ['js', 'js:vendor']);
    gulp.watch([paths.srcScss + '/**/*.scss'], ['scss']);
    gulp.watch([paths.srcImg + '/**/*.*'], ['img']);
});