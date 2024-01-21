<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Student extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


protected $fillable = [
        'name',
        'email',
        'password',
        'type'
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
