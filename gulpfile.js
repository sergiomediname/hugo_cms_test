// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass          = require('gulp-sass')(require('sass'));
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const babel         = require('gulp-babel');
const terser        = require('gulp-terser');
const rename        = require('gulp-rename');
const tailwindcss   = require('tailwindcss');
// const obfuscator    = require('gulp-javascript-obfuscator');
// const concat        = require('gulp-concat');
const mode          = require('gulp-mode')();
const argv          = require('yargs').argv;


const path_theme = `themes/${argv.template}`;

let root = {
  sass: {
    src: `${path_theme}/assets/scss/style.scss`,
    root: `${path_theme}/css`,
    rename: `style.min.css`,
    dest: `${path_theme}/assets/css`
  },
  js: {
    src: `${path_theme}/js/*.js`,
    rename: `index.min.js`,
    dest: `/${path_theme}/js`
  },
  watch: [
    `${path_theme}/assets/scss/**/*.scss`,
    `${path_theme}/layouts/**/*.html`
  ],
  dev: argv.development ? true : false
};

// scssTask
function scssTask() {
  return src(root.sass.src, { sourcemaps: root.dev })
    .pipe(sass())
    // .pipe(dest(root.sass.root))
    .pipe((mode.development(postcss([tailwindcss('./tailwind.config.js'), autoprefixer()]))))
    .pipe((mode.production(postcss([tailwindcss('./tailwind.config.js'), autoprefixer(), cssnano()]))))
    .pipe(rename(root.sass.rename))
    .pipe(dest(root.sass.dest, { sourcemaps: '.' }));
}

// JavaScript Task
// function jsTask() {
//   return src(root.js.src, { sourcemaps: root.dev })
//     .pipe(concat(root.js.rename))
//     .pipe(babel({ presets: ['@babel/preset-env'] }))
//     // .pipe(rename('index.min.js'))
//     .pipe(dest(root.js.dest, { sourcemaps: '.' }));
// }

// Watch Task
function watchTask() {
  watch(
    root.watch,
    series(scssTask)
  );
}
function test() {
    return console.log(argv.template);
}
// Default Gulp Task
exports.default = series(scssTask, watchTask);
// Build Gulp Task
exports.build = series(scssTask);
exports.test = series(test);
