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
        Schema::create('assignment_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_id')->constrained('assignments')->onDelete('cascade');
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->text('feedback')->nullable();
            $table->integer('score')->nullable()->default(0);
            $table->text('grade')->nullable();
            $table->timestamp('submitted_date')->nullable();
            $table->timestamp('graded_date')->nullable();
            $table->boolean('is_graded')->default(false);
            $table->boolean('is_submitted')->default(false);
            $table->boolean('is_late')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignment_students');
    }
};
