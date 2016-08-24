@extends('layouts.master')

@section('title', $post->title)

@section('content')
    <div class="container">
        <div id="blog">
            <div class="post">
                <div class="title">
                    <h1>{{$post->title}}</h1>
                </div>
                <span class="post-meta">{{$post->created_at}}</span>
                <div>
                    {!!Markdown::convertToHtml($post->body)!!}
                </div>
            </div>
        </div>
    </div>
@endsection
