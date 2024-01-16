<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Grade;
use App\Models\Quiz;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Grade>
 */
class GradeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Grade::class;
    public function definition(): array
    {
        $quiz = Quiz::inRandomOrder()->first();
        $course = Course::inRandomOrder()->first();
        $student = Student::inRandomOrder()->first();

        return [
            'student_id' => $student->id,
            'course_id' => $course->id,
            'quiz_id' => $quiz->id,
            'score' => rand(0, $quiz->total_score),
            'total_score' => $quiz->total_score,
            'attempts' => rand(1, 3),
            'feedback' => 'This is a feedback',
            'is_passed' => function (array $attributes) use ($quiz) {
                $passingScore = $quiz->passing_score;
                return $attributes['score'] >= $passingScore;
            },
        ];
    }
}
