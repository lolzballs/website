<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

class Post extends Model
{
    protected $fillable = ['title', 'slug', 'body'];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * A reusable query to pass params
     *
     * @param Builder $query
     * @param array $queryFilter
     *
     * @return Builder
     */
    public function scopeQueryWithParams($query, $queryFilter)
    {
        $limit = isset($queryFilter['limit']) ? $queryFilter['limit'] : 10;
        $perPage = isset($queryFilter['perPage']);
        $orderBy = isset($queryFilter['orderBy']) ? $queryFilter['orderBy'] : 'created_at';
        $sortOrder = isset($queryFilter['sortOrder']) ? $queryFilter['sortOrder'] : 'desc';

        $query->orderBy($orderBy, $sortOrder);
        if ($perPage) {
            return $query->paginate($perPage);
        }
        return $query->take($limit);
    }
}