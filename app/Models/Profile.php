<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $primaryKey = 'userId';
    public $incrementing = false;

    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'userId',
        'name',
        'year',
        'course',
        'role',
        'bio',
        'profileImage',
    ];
}
