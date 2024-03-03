<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentModule extends Model
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        'module_id',
        'status',
    ];
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    public function module()
    {
        return $this->belongsTo(Module::class);
    }

}
