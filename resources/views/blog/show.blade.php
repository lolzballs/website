@extends('layouts.master')

@section('title', $post->title)

@section('content')
    <div class="container">
        <div id="blog">
            <div class="post">
                <h1 class="title">{{$post->title}}</h1>
                <span class="post-meta">{{$post->created_at}}</span>
                <div>
                    {!!Markdown::convertToHtml($post->body)!!}
                </div>
            </div>
        </div>
    </div>
@endsection
