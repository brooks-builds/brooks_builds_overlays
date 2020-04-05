const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.scripts([
    'resources/js/p5.js',
    'resources/js/twitch_chat.js',
    'resources/js/game_of_life.js'
], 'public/js/game_of_life.js')
    .sass('resources/sass/app.scss', 'public/css');
