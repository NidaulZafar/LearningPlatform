<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Module extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'course_id'];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function videos(): BelongsToMany
    {
        return $this->belongsToMany(Video::class, 'module_video', 'module_id', 'video_id');
    }


    public function studentModule(): BelongsToMany
    {
        return $this->belongsToMany(StudentModule::class, 'student_module')->withPivot('status')->withTimestamps();
    }


}
