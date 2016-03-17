<?php

namespace App\Http\Controllers;


use App\Tag;
use App\Http\Requests;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of all tags.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->middleware('auth', ['except' => ['index', 'show']]);

        return Tag::all();
    }

    /**
     * Store a newly created tag in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:tags|max:255',
        ]);

        $tag = Tag::create([
            'name' => $request->name,
        ]);

        return $tag;
    }

    /**
     * Display the specified tag.
     *
     * @param  Tag $tag
     * @return \Illuminate\Http\Response
     */
    public function show($tag)
    {
        return $tag;
    }

    /**
     * Update the specified tag in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Tag $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $tag)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);

        $tag->name = $request->name;
        return $tag;
    }

    /**
     * Remove the specified tag from storage.
     *
     * @param  Tag $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy($tag)
    {
        $tag->delete();
    }
}
