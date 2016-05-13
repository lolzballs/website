<?php

namespace App\Http\Controllers;


use App\Http\Requests;
use App\Post;
use App\Repositories\PostRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * The post repository instance.
     *
     * @var PostRepository
     */
    protected $posts;

    /**
     * Create a new controller instance.
     *
     * @param  PostRepository $posts
     */
    public function __construct(PostRepository $posts)
    {
        $this->middleware('auth', ['except' => ['index', 'show']]);

        $this->posts = $posts;
    }

    /**
     * Display a list of all posts.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return view('blog', [
            'posts' => $this->posts->all(['orderBy' => 'created_at', 'sortOrder' => 'desc'])
        ]);
    }

    /**
     * Store a newly created post in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'body' => 'required',
            'tags.*' => 'exists:tags,id',
            'categories.*' => 'exists:categories,id',
        ]);

        $post = Post::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'body' => $request->body,
        ]);

        if (isset($request->categories)) {
            $post->categories()->sync($request->categories);
        }

        if (isset($request->tags)) {
            $post->tags()->sync($request->tags);
        }

        $post->load('categories', 'tags');
        return $post;
    }

    /**
     * Display the specified post.
     *
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($request)
    {
        $post = Post::where('slug', $request)->with('tags', 'categories')->get();
        return $post;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Post $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $post)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'body' => 'required',
            'tags.*' => 'exists:tags,id',
            'categories.*' => 'exists:categories,id',
        ]);

        $post->title = $request->title;
        $post->body = $request->body;

        if (isset($request->categories)) {
            $post->categories()->sync($request->categories);
        }

        if (isset($request->tags)) {
            $post->tags()->sync($request->tags);
        }
        $post->save();

        $post->load('categories', 'tags');
        return $post;
    }

    /**
     * Remove the specified post from storage.
     *
     * @param  Post $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($post)
    {
        $post->delete();
    }
}
