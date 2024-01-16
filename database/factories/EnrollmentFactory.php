<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Enrollment>
 */
class EnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Enrollment::class;
    public function definition(): array
    {
        $course = Course::inRandomOrder()->first();
        $student = Student::inRandomOrder()->first();
        return [
            'course_id' => $course->id,
            'student_id' => $student->id,
            'status' => 'enrolled',
            'enrolled_at' => now(),
        'finished_at' => now()->addDays(10),
            'grade' => random_int(1, 10),
            'feedback' => 'This is a feedback',
            'notes' => 'These are notes',
        ];
    }
}
