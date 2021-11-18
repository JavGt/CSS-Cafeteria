// Gulp
const { src, dest, watch, parallel } = require("gulp");

// Sass y Css
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const imagemin = require("gulp-imagemin");
const autoprefixer = require("autoprefixer");
const webp = require("gulp-webp");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const cssnano = require("cssnano");

const paths = {
	scss: "src/scss/**/*.scss",
	js: "src/js/**/*.js",
	imagenes: "src/img/**/*",
};

function css() {
	// Compilar sass
	return (
		src(paths.scss)
			.pipe(sourcemaps.init())
			.pipe(sass({ outputStyle: "compressed" }))
			// .pipe(sass())
			.pipe(postcss([autoprefixer(), cssnano() ]))
			.pipe(rename({ suffix: ".min" }))
			.pipe(sourcemaps.write("."))
			.pipe(dest("./build/css"))
	);
}
function imagenes() {
	return src(paths.imagenes)
		.pipe(imagemin())
		.pipe(webp())
		.pipe(dest("./build/img"));
}
function watchArchivos() {
	watch(paths.scss, css);
	watch(paths.imagenes, imagenes);
}

exports.imagenes = imagenes;
exports.css = css;
exports.default = parallel(watchArchivos);
