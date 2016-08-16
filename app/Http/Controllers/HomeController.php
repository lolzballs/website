<?php

namespace App\Http\Controllers;

use App\Post;

class HomeController extends Controller
{
    public function home()
    {
        return view('pages.home');
    }
}
