<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\AssignmentStudent;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AssignmentStudent>
 */
class AssignmentStudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = AssignmentStudent::class;

    public function definition(): array
    {
        $assignment = Assignment::inRandomOrder()->first();
        $student = Student::inRandomOrder()->first();

        return [
            'assignment_id' => $assignment->id,
            'student_id' => $student->id,
            'score' => rand(0, $assignment->max_score),
            'feedback' => $this->faker->paragraph(),
        ];
    }
}
