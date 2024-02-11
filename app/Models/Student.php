<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model implements Authenticatable
{
    use AuthenticatableTrait, HasApiTokens, HasFactory, Notifiable;

protected $fillable = [
        'name',
        'email',
        'password',
        'type',
        'bio',
        'education',
        'phone',
    ];


    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }

    public function assignments()
    {
        return $this->belongsToMany(Assignment::class);
    }

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }



}
