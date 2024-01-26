<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Instructor extends Model implements Authenticatable
{
    use AuthenticatableTrait, HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'bio',
        'avatar',
        'education',
        'occupation',
        'phone',
        'type',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    public function setPasswordAttribute($value): void
    {
        $this->attributes['password'] = bcrypt($value);
    }
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
