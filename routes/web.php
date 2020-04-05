<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/game_of_life', function () {
    $twitchPass = env('TWITCH_PASS', false);
    $twitchUser = env('TWITCH_USER', false);
    $twitchChannel = env('TWITCH_CHANNEL', false);

    if ($twitchPass === false || $twitchUser === false || $twitchChannel === false) {
        throw new Error('twitch authentication environment variables missing');
    }

    return view('game_of_life', [
        'twitchPass' => $twitchPass,
        'twitchUser' => $twitchUser,
        'twitchChannel' => $twitchChannel,
    ]);
});
