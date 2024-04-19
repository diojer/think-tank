<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'type',
        'title',
        'author',
        'authorId',
        'subject',
        'tags',
        'byline',
        'content',
        'cardImage',
        'bannerImage',
    ];

    /**
     * Scope a query to only include a single author.
     */
    public function scopeAuthor(Builder $query, int $id): void
    {
        $query->where('authorId', '=', $id);
    }

    /**
     * Scope a query to only include a single type.
     */
    public function scopeType(Builder $query, string $type): void
    {
        $query->where('type', '=', $type);
    }

    /**
     * Atomatically add a UUID to the model
     */
    public static function booted() {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
