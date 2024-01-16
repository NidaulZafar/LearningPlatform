<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    // Course model
    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class);
    }

// A course can belong to a user (instructor) who created it.
    public function instructor()
    {
        return $this->belongsTo(Instructor::class, 'instructor_id');
    }

}
