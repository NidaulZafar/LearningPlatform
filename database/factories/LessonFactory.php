<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Lesson::class;
    public function definition(): array
    {
        $course = Course::inRandomOrder()->first();
        return [
            'title' => $this->faker->sentence(),
            'course_id' => $course->id,
            'description' => $this->faker->paragraph(),
            'content' => $this->faker->paragraph(),
            'video_url' => 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
            'duration' => rand(1, 10),
            'resource_links' => 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
            'resource_files' => 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        ];
    }
}
