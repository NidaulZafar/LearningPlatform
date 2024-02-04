<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Module>
 */
class ModuleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Module::class;
    public function definition(): array
    {
        $course = Course::inRandomOrder()->first();
        return [
            'title' => $this->faker->sentence(),
            'course_id' => $course->id,
            'description' => $this->faker->paragraph(),
            'content' => $this->faker->paragraph(),
            'duration' => rand(1, 10),
            'resource_links' => 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
            'resource_files' => 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
            'active' => true,
        ];
    }
}
