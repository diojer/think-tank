<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Builder;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class Article extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'author',
        'authorId',
        'subject',
        'tags',
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
}
