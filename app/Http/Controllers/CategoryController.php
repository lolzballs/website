<?php

namespace App\Http\Controllers;


use App\Category;
use App\Http\Requests;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a list of all categories.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Store a newly created category in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return $category;
    }

    /**
     * Display the specified category.
     *
     * @param  Category $category
     * @return \Illuminate\Http\Response
     */
    public function show($category)
    {
        return $category;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
