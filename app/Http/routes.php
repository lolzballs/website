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

Route::group(['middleware' => ['web']], function() {
    Route::get('auth/login', 'Auth\AuthController@getLogin');
    Route::post('auth/login', 'Auth\AuthController@login');
    Route::get('auth/logout', 'Auth\AuthController@logout');

    Route::get('home', 'HomeController@home');
    Route::get('about', 'HomeController@about');
    Route::get('contact', 'HomeController@contact');
    Route::get('portfolio', 'HomeController@portfolio');
    Route::get('blog', 'HomeController@blog');

    Route::get('api/auth', function() {
        return (String) Auth::check();
    });
    Route::resource('api/post', 'PostController');
    Route::resource('api/tag', 'TagController');
    Route::resource('api/category', 'CategoryController');

    Route::get('blog', function() {
        return view('index');
    });

    Route::any('blog/{undefinedRoute}', function() {
        return view('index');
    })->where('undefinedRoute', '([A-z\d-\/_.]+)?');
});
