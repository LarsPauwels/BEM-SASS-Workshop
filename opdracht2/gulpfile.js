const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function sass2css(done) {
    src("./css/sass/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(dest("./css/"));

    done();
}

function essix2js(done) {
    src("./js/es6/*")
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        .pipe(dest("./js/"));

    done();
}

watch('./css/sass/**/*.scss', parallel(sass2css));
watch('./js/es6/**/*.js', parallel(essix2js));

module.exports.default = parallel(sass2css, essix2js);