<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Instructor;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Course::class;

    public function definition(): array
    {
        $instructor = Instructor::inRandomOrder()->first();
        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'instructor_id' => $instructor->id,
            'cover_image' => 'https://i.pravatar.cc/300',
            'code' => $this->faker->word() . ' ' . $this->faker->numberBetween(100, 999),
        ];
    }
}
