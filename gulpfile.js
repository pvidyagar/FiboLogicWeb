// ////////////////////////////////////////////
// Required
// ////////////////////////////////////////////
  var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
		minify = require('gulp-minify-css'),
	browserSync = require('browser-sync'),
	reload =  browserSync.reload,
	//compass = require('gulp-compass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	rename = require('gulp-rename');
   imagemin = require('gulp-imagemin');
   pngquant = require('imagemin-pngquant');
   minifyHTML = require('gulp-minify-html');
   imageop = require('gulp-image-optimization');
   
// ////////////////////////////////////////////
// Scripts Task
// ////////////////////////////////////////////
gulp.task('clientScripts', function(){
	gulp.src(['client/**/*.js'])
		.pipe(plumber())
		//.pipe(rename({suffix:'.min'}))
		//.pipe(uglify())
	.pipe(gulp.dest('build/client'))
	.pipe(reload({stream:true}));
});

gulp.task('serverScripts', function(){
	gulp.src(['server/**/*.js'])
		.pipe(plumber())
		//.pipe(rename({suffix:'.min'}))
		//.pipe(uglify())
	.pipe(gulp.dest('build/server'))
	.pipe(reload({stream:true}));
});
//////////////////////////////////////////////
//CSS Task
//////////////////////////////////////////////
gulp.task('minifyClientCSS', function(){
	gulp.src(['client/**/*.css', '!client/**/*.min.css'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(minify())
	.pipe(gulp.dest('build/client'))
	.pipe(reload({stream:true}));
});
gulp.task('minifyServerCSS', function(){
	gulp.src(['server/**/*.css', '!server/**/*.min.css'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(minify())
	.pipe(gulp.dest('build/server'))
	.pipe(reload({stream:true}));
});

//////////////////////////////////////////////
//HTML Task
//////////////////////////////////////////////

gulp.task('minify-html', function() {
	  return gulp.src('client/**/*.html')
	    //.pipe(minifyHTML({ empty: true }))
	    .pipe(gulp.dest('build/client'));
	});

//////////////////////////////////////////////
//Image Task
//////////////////////////////////////////////
gulp.task('minify-img', () => {
	return gulp.src(['client/views/assets/img/*.jpg','client/views/assets/img/*.png'])
		 .pipe(plumber())
		 //.pipe(imagemin({
		//	progressive: true,
		//	svgoPlugins: [{removeViewBox: false}],
		//	use: [pngquant()]
		//}))
		.pipe(gulp.dest('build/client/views/assets/img/'));
});

gulp.task('minify-images', function() {
    gulp.src(['client/**/*.jpg','client/**/*.png'])
    //.pipe(imageop({
    //    optimizationLevel: 5,
    //    progressive: true,
    //    interlaced: true
    //}))
    .pipe(gulp.dest('build/client'));

});

/*// ////////////////////////////////////////////
// Compass / Sass Tasks
// ////////////////////////////////////////////
gulp.task('compass', function() {
	gulp.src('app/scss/style.scss')
		.pipe(plumber())
		.pipe(compass({
		config_file: './config.rb',
		css: 'app/css',
		sass: 'app/scss',
		require: ['susy']
		}))
		.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('app/css/'))
	.pipe(reload({stream:true}));
});
*/

////////////////////////////////////////////////
// HTML Tasks
///////////////////////////////////////////////
//gulp.task('html', function() {
//	gulp.src('build/client/**/*.html','build/client/**/*.hml')
//	.pipe(reload({stream:true}));
//});


///////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

//clear out all files and folders from build folder
gulp.task('build:cleanfolder', function() {
	del([
		'build/**'
	]);
});


// task to create build directory for all files
//gulp.task('build:copyClient', ['build:cleanfolder'], function() { 
//	return gulp.src('client/**/')
//	.pipe(gulp.dest('build/client'));
//});
//task to create build directory for all files
//gulp.task('build:copySerer', function() { 
//	return gulp.src('server/**/')
//	.pipe(gulp.dest('build/server'));
//});

// task to remove unwanted build files
// list all files and directories here that you don't want to include
/*gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
		'build/**///',
		//'build/**/!(*.min.js)'
	//], cb);
//});*/


//gulp.task('build', ['build:copyClient','build:copySerer']);

/*// task to run build server for testing final app
gulp.task('build:serve', function() {
	browserSync({
		server:{
			baseDir: "./build/"
		}
	});
});*/

/*// task to run build server for testing final app
gulp.task('build:serve', function() {
	browserSync({
		server:{
			baseDir: "./build/"
		}
	});
});*/



// ////////////////////////////////////////////////
// Browser-Sync Tasks
// ///////////////////////////////////////////////


gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir: ["./client/","./public/","./server"],
			index: "./client/views/homeDelights.html"
		}

	});

});

gulp.task('magic', function() {
	browserSync({
		server:{
			baseDir: "./client/views/",
			index: "homeDelights.html"

		}
	});

});





////////////////////////////////////////////////
// Watch Tasks
// // /////////////////////////////////////////////
gulp.task('watch', function(){
	gulp.watch('client/**/*.js', ['clientScripts']);
	gulp.watch('server/**/*.js', ['serverScripts']);
	gulp.watch('client/**/*.css',['minifyClientCSS']);
	gulp.watch('client/**/*.html', ['html']);
});


// ////////////////////////////////////////////
// Default Task
// ////////////////////////////////////////////
gulp.task('default', ['build:cleanfolder','clientScripts','serverScripts','minifyClientCSS','minifyServerCSS','minify-html','minify-images']);

