@extends('layouts.master')

@section('title', 'Benjamin Cheng')

@section('content')
<div class="container">
    <div id="home">
        <h2 id="title">Hey There, I'm</h2>
        <h1>Benjamin Cheng</h1>
        <div id="slogan-wrapper">
            <div id="slogan"></div>
            <span class="typed-cursor"></span>
        </div>
    </div>
    <div id="projects">
        <a class="card" href="#" data-target="authfid">
            <img alt="" src="img/authfid.jpg"/>
            <div class="title">AuthFID</div>
        </a>
        <a class="card" href="#" data-target="studyhub">
            <img alt="" src="img/studyhub.png"/>
            <div class="title">StudyHUB</div>
        </a>
        <a class="card" href="#" data-target="projectascension">
            <img alt="" src="img/projectascension.png"/>
            <div class="title">Project Ascension</div>
        </a>
    </div>
    <div id="blog">
        @foreach ($posts as $post)
            <div class="preview">
                <div class="head">
                    <h2><a href="{{URL::route('blog.show', $post->slug)}}">{{$post->title}}</a></h2>
                    <span class="date right">{{$post->created_at->toFormattedDateString()}}</span>
                </div>
                <div class="clear"></div>
                <div class="content">
                    {!!Markdown::convertToHTML(str_limit($post->body, $limit = 200, $end='...'))!!}
                </div>
            </div>
        @endforeach
    </div>
    <div id="about">
        <h2>I make things using code.</h2>
        <p id="about-desc">Remind me to put more here soon.</p>
    </div>
</div>
<div id="authfid" class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <strong>AuthFID</strong>
            </div>
            <div class="modal-body">
                <p>
                    AuthFID is a dedicated device with a touch screen that allows fast, secure, and easy
                    access to two factor authentication codes. Users are authenticated to the device via
                    an RFID card, and tapping on the visible code will type it in on the computer
                    for you - this process takes less than 2 seconds, 5 times less than what would occur
                    through a normal process.
                </p>
                <p>
                    This was created in under 36 hours at HackWestern 2, winning the Best End-to-End
                    Integration prize. This project used Java, C++, Arduino, Raspberry Pi, as well as many
                    other hardware components.
                </p>
            </div>
            <div class="modal-footer">
                <button class="btn primary" data-close="authfid">Close</button>
            </div>
        </div>
    </div>
</div>

<div id="studyhub" class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <strong>StudyHUB</strong>
            </div>
            <div class="modal-body">
                StudyHub is a web application that allows students to organize their works, connect to
                their peers, and make them more productive in learning.

                This project is built with AngularJS, Laravel (PHP MVC framework), Bootstrap, MySQL, and jQuery.
            </div>
            <div class="modal-footer">
                <button class="btn primary" data-close="studyhub">Close</button>
            </div>
        </div>
    </div>
</div>

<div id="projectascension" class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <strong>Project Ascension</strong>
            </div>
            <div class="modal-body">
                Project Ascension is an open-source game launcher, aiming at unifying various services
                like Steam, Origin, uPlay, etc., together.

                As part of the Client team, I was a core contributor to the launcher itself, written in
                C++ with the Qt library. The server-side is written in PHP.
            </div>
            <div class="modal-footer">
                <button class="btn primary" data-close="projectascension">Close</button>
            </div>
        </div>
    </div>
</div>
@endsection
