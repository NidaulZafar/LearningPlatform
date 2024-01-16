<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Assignment>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Assignment::class;
    public function definition(): array
    {
        $course = Course::inRandomOrder()->first();
        return [
            'title' => $this->faker->sentence(),
            'course_id' => $course->id,
            'description' => $this->faker->paragraph(),
            'due_date' => $this->faker->date(),
            'instructions' => $this->faker->paragraph(),
            'max_score' => rand(10, 15),
            'feedback' => $this->faker->paragraph(),
        ];
    }
}
