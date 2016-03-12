<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('landing');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web'], 'prefix' => 'api'], function() {
    Route::resource('post', 'PostController');
    Route::resource('tag', 'TagController');
    Route::resource('category', 'CategoryController');
});

Route::group(['middleware' => ['web'], 'prefix' => 'blog'], function() {
    Route::get('/', function() {
        return view('index');
    });

    Route::any('{undefinedRoute}', function() {
        return view('index');
    })->where('undefinedRoute', '([A-z\d-\/_.]+)?');
});
