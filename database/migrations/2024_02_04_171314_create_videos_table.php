<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('videos', static function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('video_url');
            $table->integer('duration');
            $table->string('thumbnail')->nullable();
            $table->text('description')->nullable();
            $table->text('content')->nullable();
            $table->string('resource_files')->nullable();
            $table->string('resource_links')->nullable();
            $table->enum('status', ['watched', 'not_watched'])->default('not_watched');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
