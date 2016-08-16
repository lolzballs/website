<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    <script type="text/javascript" src="/bundle.js" charset="utf-8"></script>
</head>
<body>
<div class="header">
    <div class="title">
        <a href="#"><img alt="Benjamin Cheng" src="/img/logo.png"/></a>
    </div>
    <ul class="nav left">
        <li><a href="/#projects">Projects</a></li>
        <li><a href="/#blog">Blog</a></li>
        <li><a href="/#about">About</a></li>
    </ul>
    <ul class="nav right">
        <li>
            <a href="https://github.com/lolzballs" target="_blank">
                <img alt="GitHub" src="/img/github.png"/>
            </a>
        </li>
        <li>
            <a href="https://twitter.com/lolzballs" target="_blank">
                <img alt="Twitter" src="/img/twitter.png"/>
            </a>
        </li>
    </ul>
</div>

<div class="header-pad"></div>

@yield('content')

</body>
</html>
