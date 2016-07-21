<!--DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>

    <link href="//fonts.googleapis.com/css?family=Lato|Roboto|Montserrat|Material+Icons" rel="stylesheet"
          type="text/css">
    <link rel="stylesheet" href="/components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
<div id="nav">
    <div id="nav-inner">
        <div id="nav-left">
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
        </div>
        <a href="/#" id="nav-home"><img src="/img/logo.png"></a>
        <div id="nav-right">
            <a href="/#portfolio">Portfolio</a>
            <a href="/#blog">Blog</a>
        </div>
        <a id="hamburger" class="visible-xs">
            <i class="material-icons">menu</i>
        </a>
    </div>
</div>
<div id="mobile-menu">
    <div class="container">
        <a href="/#home" class="quickNav">HOME</a>
        <div class="empty"></div>
        <a href="/#about" class="quickNav">ABOUT</a>
        <div class="empty"></div>
        <a href="/#contact" class="quickNav">CONTACT</a>
        <div class="empty"></div>
        <a href="/#portfolio" class="quickNav">PORTFOLIO</a>
        <div class="empty"></div>
        <a href="/#blog" class="quickNav">BLOG</a>
    </div>
</div>
@yield('content')
<script type="text/javascript" src="/components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="/components/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://use.fontawesome.com/dfc8ce83ab.js"></script>
<script type="text/javascript" src="/js/all.js"></script>

@yield('javascript')
</body>
</html>
-->
Under Construction