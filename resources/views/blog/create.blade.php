@extends('layouts.master')

@section('title', 'Add Post')

@section('content')
    <div class="container post">
        <h2 class="page-header">Add Post</h2>
        <form name="postForm" class="well" method="POST" action="{{route('blog.store')}}">
            <div class="form-group">
                <label>Title</label>
                <input type="text" name="title" class="form-control" placeholder="Title" required/>
            </div>
            <div class="form-group">
                <label>Body</label>
        <textarea class="form-control" name="body" placeholder="Insightful nonsense goes here" rows="5" required></textarea>
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
        </form>
    </div>
@endsection