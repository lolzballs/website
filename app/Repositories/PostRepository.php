<?php

namespace App\Repositories;


use App\Post;
use App\Tag;
use App\Category;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PostRepository
{
    /**
     * Get all of the posts with specified params.
     *
     * @param array $params
     *
     * @return Collection
     */
    public function all($params = [])
    {
        return Post::queryWithParams($params)->with('tags', 'categories')->get();
    }

    /**
     * Get all of the posts for a given category.
     *
     * @param Category $category
     * @param array $params
     *
     * @return Collection
     */
    public function forCategory(Category $category, $params = [])
    {
        return $category->posts()->queryWithParams($params)->get();
    }

    /**
     * Get all of the posts for a given tag.
     *
     * @param Tag $tag
     * @param array $params
     *
     * @return Collection
     */
    public function forTag(Tag $tag, $params = [])
    {
        return $tag->posts()->queryWithParams($params)->get();
    }

    /**
      * Add given tag to given post.
      *
      * @param Post $post
      * @param Tag $tag
      *
      * @return void
      */
    public function addTag(Post $post, Tag $tag)
    {
        $post->tags()->attach($tag->id);
    }

    /**
     * Add given category to given post.
     *
     * @param Post $post
     * @param Category $category
     *
     * @return void
     */
    public function addCategory(Post $post, Category $category)
    {
        $post->categories()->attach($category->id);
    }

    /**
     * Add given tag to given post.
     *
     * @param Post $post
     * @param Tag $tag
     *
     * @return void
     * @throws NotFoundHttpException
     */
    public function removeTag(Post $post, Tag $tag)
    {
        if (!$post->tags->contains($tag->id)) {
            throw new NotFoundHttpException("Tag doesn't exist on Post #" . $post->id);
        }

        $post->tags()->detach($tag->id);
    }

    /**
     * Remove given category from given post.
     *
     * @param Post $post
     * @param Category $category
     *
     * @return void
     * @throws NotFoundHttpException
     */
    public function removeCategory(Post $post, Category $category)
    {
        if (!$post->categories->contains($category->id)) {
            throw new NotFoundHttpException("Category doesn't exist on Post #" . $post->id);
        }

        $post->categories()->detach($category->id);
    }
}