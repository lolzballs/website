<div id="blog">
    <div class="container">
        <h2>Blog</h2>

        @foreach ($posts as $post)
            <a class="post-entry" href="{{URL::route('blog.show', $post->slug)}}">
                <div class="post-content">
                    <span class="title">{{$post->title}}</span>
                    <span class="time">{{$post->created_at}}</span>
                    <span class="excerpt">{!!Markdown::convertToHTML(str_limit($post->body, $limit = 200, $end='...'))!!}</span>
                </div>
            </a>
        @endforeach
    </div>
</div>