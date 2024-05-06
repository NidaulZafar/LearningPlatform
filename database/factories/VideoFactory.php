<?php

namespace Database\Factories;

use App\Models\Module;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;
use Random\RandomException;

/**
 * @extends Factory<Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Video::class;

    /**
     * @throws RandomException
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'video_url' => 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
            'duration' => random_int(1, 10),
            'thumbnail' => 'https://i.pravatar.cc/300',
            'description' => $this->faker->paragraph(),
            'content' => $this->faker->paragraph(),
        ];
    }

    public function configure(): VideoFactory|Factory
    {
        return $this->afterCreating(function (Video $video) {
            $moduleIds = Module::pluck('id')->toArray();

            shuffle($moduleIds);

            $selectedModuleIds = array_slice($moduleIds, 0, random_int(3, 4));
            foreach ($selectedModuleIds as $moduleId) {
                $video->modules()->attach($moduleId);
            }
        });
    }
}
