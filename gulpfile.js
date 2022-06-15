const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
//const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

// My
// server
const browserSync = require('browser-sync').create();

// pug
const pug = require('gulp-pug')
const beautify = require('gulp-jsbeautifier');

// Server
function server() {
    browserSync.init({
		//+open: true,
		//server: path.dist.distPath
		server: {
			baseDir:"./dist/"
		},
		port:5000,
		notify: false, // Отключаем уведомления
	});
}


function pugTask(){
	return src(files.pugPathIndex)
    .pipe(
		pug({
			//pretty: true
			//pretty: '\t'
			pretty: ''
		})
	)
    //.pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(beautify())
    .pipe(dest('dist'))
	.pipe(browserSync.stream())
}


// File paths
const files = { 
    scssPath: 'src/scss/**/*.scss',
    sassPath: 'src/sass/**/*.sass',
    jsPath: 'src/js/**/*.js',
    pugPathIndex: 'index.pug',
    pugPath: './**/*.pug'
};

function scssTask(){    
   // return src(files.scssPath)
    return src(files.sassPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass([])) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')
    ); // put final CSS in dist folder
}

function jsTask(){
    return src([
        files.jsPath
        ])
        //.pipe(concat('all.js'))
        .pipe(concat('main.js'))
       // .pipe(uglify())
        .pipe(dest('dist')
    );
}


function watchTask(){
    watch([files.pugPath, files.sassPath, files.jsPath], 
        parallel(pugTask, scssTask, jsTask));    
}

exports.default = series(
    parallel(pugTask, scssTask, jsTask),
	parallel(watchTask, server)    
);


/*
var cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}




/*
function watchTask(){
    watch([files.scssPath, files.jsPath], 
        parallel(scssTask, jsTask));    
}

exports.default = series(
    parallel(scssTask, jsTask), 
    cacheBustTask,
    watchTask
);
*/