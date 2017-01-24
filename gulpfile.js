var underscore = require('underscore');
var del = require('del');
var runSequence = require('run-sequence');

/* CREATE ARRAY OF PACKAGES TO COPY WHOLESALE */
var siteSpecific = require('./site_specific.json');
var nodePackagesArr = underscore.values(siteSpecific.packages.node_modules);
var resourcesPackagesArr = underscore.values(siteSpecific.packages.resources);

// For easy reference, declare all filepaths in one place.
var paths = {
    styles: {
        src: './resources/sass/screen.scss',
        plugins_src: siteSpecific.cssDependencies,
        dest: './dist/css/',
        watch: './resources/sass/**/*.scss' // Better LiveReload support.
    },
    scripts: {
        src: [
            './resources/js/*.js'
        ],
        all_src: [
            './resources/js/**/*.js'
        ],
        plugins_src: siteSpecific.jsDependencies,
        dest: './dist/js/'
    },
    packages: {
        node_src: nodePackagesArr,
        resources_src: resourcesPackagesArr,
        dest: './dist/vendor/'
    }
};

// To make things easy, auto-load all gulp modules.
require('matchdep').filterDev('gulp*').forEach(function( module ) {

    // Remove the `gulp-` prefix & internal hyphens for better module var names.
    var module_name = module.replace(/^gulp-/, '').replace(/-/, '');

    // Then require the module.
    global[module_name] = require(module);

});

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('styles', function(){

    // select, compile and minify sass files
    // resources/sass => /css/all.min.css
    gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            errorLogoToConsole: true,
            indentedSyntax:false,
            includePaths: ['node_modules/susy/sass']
        }))
        .pipe(autoprefixer())
        .pipe(concat('all.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(livereload());

    // select and concat npm plugins
    // node_modules/*.min.css => /css/plugins.min.css

    console.log('css plugin paths '+paths.styles.plugins_src);
    gulp.src(paths.styles.plugins_src)
        .pipe(concat('plugins.min.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(livereload());

});


gulp.task('scripts', function(){

    var stylish = require('jshint-stylish');

    // select, concat and minify script files written for this project into
    // resources/js => /js/all.min.js
    gulp.src(paths.scripts.src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify({mangle:false}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(livereload());

    // now grab all scripts from the same folder and merge for use in the backend
    gulp.src(paths.scripts.all_src)
        .pipe(sourcemaps.init())
        .pipe(concat('backend.min.js'))
        .pipe(uglify({mangle:false}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(livereload());

    // select and concat npm plugins
    // node_modules/*.min.js => /js/plugins.min.js
    gulp.src(paths.scripts.plugins_src)
        .pipe(concat('plugins.min.js', {newLine: ';\n'}))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(livereload());
});

// generate sprite.png, sprite@2x.png and _sprite.scss
gulp.task('sprites', function () {
    var spritesmith = require('gulp.spritesmith');
    var spriteData = gulp.src('./img/sprites/*.png').pipe(spritesmith({
        imgName: 'img/sprite.png',
        retinaSrcFilter: './img/sprites/*@2x.png',
        retinaImgName: 'img/sprite@2x.png',
        cssName: 'resources/sass/_sprite.scss'
    })).on('error', swallowError);
    return spriteData.pipe(gulp.dest('./'));
});

gulp.task('spriteStyles', function(){
    var runSequence = require('run-sequence');
    runSequence('sprites', 'styles');
});

gulp.task('packages', function(){
    gulp.src(paths.packages.node_src, {base: './node_modules'})
        .pipe(gulp.dest(paths.packages.dest));
    gulp.src(paths.packages.resources_src, {base: './resources/vendor'})
        .pipe(gulp.dest(paths.packages.dest));
});

gulp.task('clean', function(){

    return del([
        paths.styles.dest+'/**/*',
        paths.scripts.dest+'/**/*',
        // we don't want to clean this file though so we negate the pattern
        //'!dist/mobile/deploy.json'
    ]);

});

// GULP WATCH JUST WATCHES AND UPDATES DEV CREATED SASS AND JS
gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(paths.styles.watch, ['styles']);
    gulp.watch(paths.scripts.src, ['scripts']);
});


// GULP DEFAULT CLEANS ALL FOLDERS AND RUNS BUILD SCRIPTS
gulp.task('default', function(callback){
    runSequence('clean',
        ['spriteStyles', 'scripts', 'packages'],
        callback);
});