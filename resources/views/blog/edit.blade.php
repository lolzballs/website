@extends('layouts.master')

@section('title', 'Edit Post')

@section('content')
    <div class="container post">
        <h2 class="page-header">Edit Post</h2>
        <form name="postForm" class="well" method="POST" action="{{route('blog.update', ['blog' => $post->slug])}}">
            <div class="form-group">
                <label>Title</label>
                <input type="text" name="title" class="form-control" placeholder="Title" value="{{$post->title}}"
                       required/>
            </div>
            <div class="form-group">
                <label>Body</label>
                <textarea class="form-control" name="body" placeholder="Insightful nonsense goes here" rows="5"
                          required>{{$post->body}}</textarea>
            </div>
            <div class="form-group">
                <label>Categories</label>
                <select name="categories" class="form-control" multiple></select>
            </div>
            <div class="form-group">
                <label>Tags</label>
                <select name="tags" class="form-control" multiple></select>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Create"/>
            </div>
            <input type="hidden" name="_method" value="PUT">
            <input type="hidden" name="_token" value="{{csrf_token()}}">
        </form>
    </div>
@endsection