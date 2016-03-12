<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/blog/">

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Benjamin Cheng</title>

    <link rel="stylesheet" href="/components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/app.css">
</head>
<body ng-app="app">
<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" ui-sref="home.index">getBlog();</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li ng-class="{active: $state.includes('post')}"><a ui-sref="post.index">Posts</a></li>
                <li ng-class="{active: $state.includes('category')}"><a ui-sref="category.index">Categories</a></li>
                <li ng-class="{active: $state.includes('tag')}"><a ui-sref="tag.index">Tags</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">About</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="container" ui-view="main">

</div>

<script type="text/javascript" src="/components/angular/angular.min.js"></script>
<script type="text/javascript" src="/components/angular-ui-router/release/angular-ui-router.min.js"></script>
<script type="text/javascript" src="/components/restangular/dist/restangular.min.js"></script>
<script type="text/javascript" src="/components/lodash/dist/lodash.min.js"></script>

<script type="text/javascript" src="/js/all.js"></script>

<script type="text/javascript" src="/components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="/components/bootstrap/dist/js/bootstrap.min.js"></script>

<link href="//fonts.googleapis.com/css?family=Lato|Roboto|Montserrat|Material+Icons" rel="stylesheet" type="text/css">
</body>
</html>
