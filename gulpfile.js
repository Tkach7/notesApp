'use strict';

const gulp = require('gulp');
const server = require('gulp-develop-server');
const util = require('gulp-util');

const named = require('vinyl-named');
const plumber = require('gulp-plumber');
const webpackStream = require('webpack-stream');
const ngAnnotate = require('gulp-ng-annotate');

const concat = require('gulp-concat');
const vendors = require('main-bower-files');
const filter = require('gulp-filter');

const webpack = webpackStream.webpack;



// @gulp:default
gulp.task('default', ['js', 'vendors', 'css', 'html', 'watch'], () => {
	server.listen({
		path: 'server.js'
	}, () => {
		util.log(util.colors.cyan.bold(':: Development server listening ::'));
	});
});

// @gulp:js
gulp.task('js', (callback) => {

	// Webpack options
	let options = {
		output: {
			publicPath: '/js/',
			filename: '[name].js'
		},
		plugins: [
			new webpack.NoErrorsPlugin()
		],
		module: {
			loaders: [{
				test: /\.html$/,
				loader: 'raw',
				exclude: /(node_modules|bower_components)/,
			}, {
				test: /\.json$/,
				loader: 'json',
				exclude: /(node_modules|bower_components)/,
			}, {
				test: /\.js$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: ['es2015']
				}
			}]
		},
		watch: true,
		devtool: 'eval'
	}

	gulp.src('src/js/cores/app.js')
		.pipe(named())
		.pipe(plumber())
		.pipe(webpackStream(options))
		.pipe(ngAnnotate())
		.pipe(gulp.dest('./public/js'))
		.on('data', function() {
			if (!callback.called) {
				callback.called = true;
				callback();
			}
		});
});

// @gulp:vendors
gulp.task('vendors', () => {
	return gulp.src(vendors())
        .pipe(filter('**/*.js', {
            restore: true
        }))
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('public/js'));
});

// @gulp:css
gulp.task('css', () => {
	return console.log('Build js');
});

// @gulp:html
gulp.task('html', () => {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('public'));
});

// @gulp:watch:css
gulp.task('watch', () => {
	gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch('src/*.html', ['html']);
});