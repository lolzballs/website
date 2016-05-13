<?php

namespace App\Http\Controllers;

use App\Post;

class HomeController extends Controller
{
    public function home()
    {
        return view('pages.home');
    }

    public function about()
    {
        return view('pages.about');
    }

    public function contact()
    {
        return view('pages.contact');
    }

    public function portfolio()
    {
        return view('pages.portfolio');
    }
}