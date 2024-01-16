<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Quiz>
 */
class QuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * @throws \Exception
     */
    public function definition(): array
    {
        $course = Course::inRandomOrder()->first();
        return [
            'title' => $this->faker->sentence(),
            'course_id' => $course->id,
            'description' => $this->faker->paragraph(),
            'number_of_questions' => rand(5, 15),
            'time_limit' => random_int(15, 45),
            'passing_score' => rand(20, 50),
            'total_score' => rand(50, 100),
            'attempts_limit' => rand(3, 5),
        ];
    }
}
