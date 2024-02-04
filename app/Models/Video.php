<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Video extends Model
{
    use HasFactory;

    public function modules(): BelongsToMany
    {
        return $this->belongsToMany(Module::class);
    }

    public function getFormattedDurationAttribute()
    {
        return format_duration($this->duration);
    }

    public function getPublishedAtAttribute()
    {
        return $this->attributes['published_at']->format('Y-m-d');
    }

    public function setPublishedAtAttribute($value): void
    {
        $this->attributes['published_at'] = Carbon::createFromFormat('Y-m-d', $value);
    }

}
