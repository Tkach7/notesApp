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
const importCss = require('gulp-import-css');
const postcss = require('gulp-postcss');



// @gulp:default
gulp.task('default', ['html'], () => {
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
// Make styles
gulp.task('css', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(plumber())
        .pipe(postcss([
            require('precss'),
            require('postcss-clearfix'),
            require('postcss-color-short'),
            require('postcss-cssnext'),
            require('postcss-size'),
            require("postcss-colour-functions")
        ]))
        .pipe(gulp.dest('public/css'));
});

// @gulp:html
gulp.task('html', ['js', 'vendors', 'css', 'watch'], () => {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('public'));
});

// @gulp:watch:css
gulp.task('watch', () => {
	gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch('src/*.html', ['html']);
});