<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'course_id',
        'user_id',
    ];

    public function course()
    {
        return $this->belongsToMany(Course::class);
    }

    public function instructor()
    {
        return $this->belongsToMany(Instructor::class);
    }

    public function student()
    {
        return $this->belongsToMany(Student::class);
    }

}
