const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const fileinclude = require("gulp-file-include");
const uglify = require("gulp-uglify-es").default;
const webp = require("gulp-webp");
const webpHTML = require("gulp-webp-html");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const del = require("del");

gulp.task("del", function() {
    return del("dist");
});

gulp.task("server", function () {
    browserSync({
        server: {
            baseDir: "dist",
        },
    });

    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/sass/*.scss").on("change", browserSync.reload);
});

gulp.task("styles", function () {
    return gulp
        .src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(rename({ suffix: ".min", prefix: "" }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function () {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", gulp.parallel("html"));
    gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
    gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));

    gulp.watch("src/img/**/*").on("all", gulp.parallel("images"));
});

gulp.task("html", function () {
    return gulp
        .src(["src/*.html", "!src/_*.html"])
        .pipe(fileinclude())
        .pipe(webpHTML())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
    return gulp
        .src("src/js/**/*.js")
        .pipe(fileinclude())
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js",
            })
        )
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
    return gulp
        .src("src/fonts/**/*")
        .pipe(ttf2woff())
        .pipe(gulp.dest("dist/fonts"))
        .pipe(gulp.src("src/fonts/**/*"))
        .pipe(ttf2woff2())
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});

gulp.task("images", function () {
    return gulp
        .src("src/img/**/*")
        .pipe(
            webp({
                quality: 70,
            })
        )
        .pipe(gulp.dest("dist/img"))
        .pipe(gulp.src("src/img/**/*"))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

gulp.task(
    "default",
    gulp.parallel(
        "watch",
        "server",
        "styles",
        "scripts",
        "fonts",
        "html",
        "images"
    )
);
