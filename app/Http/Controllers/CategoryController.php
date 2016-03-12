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
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Store a newly created category in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:categories|max:255',
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($category)
    {
        return $category;
    }

    /**
     * Update the specified category in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $category)
    {
        $this->validate($request, [
            'name' => 'required|unique:categories|max:255',
        ]);

        $category->name = $request->name;
        return $category;
    }

    /**
     * Remove the specified category from storage.
     *
     * @param  Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($category)
    {
        $category->delete();
    }
}
