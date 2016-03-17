<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Benjamin Cheng</title>

    <link rel="stylesheet" href="/components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>

<div class="container">
    <h2 class="page-header">Login</h2>
    <form class="well" role="form" method="POST" action="{{ url('/auth/login') }}">
        {!! csrf_field() !!}

        <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
            <label>Username</label>

            <input type="text" class="form-control" name="username" value="{{ old('username') }}" required>

            @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('username') }}</strong>
                </span>
            @endif
        </div>

        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
            <label>Password</label>

            <input type="password" class="form-control" name="password" required>

            @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button>
        </div>
    </form>
</div>

<script type="text/javascript" src="/components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="/components/bootstrap/dist/js/bootstrap.min.js"></script>

<link href="//fonts.googleapis.com/css?family=Lato|Roboto|Montserrat|Material+Icons" rel="stylesheet" type="text/css">
</body>
</html>
