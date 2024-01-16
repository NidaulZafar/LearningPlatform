<?php

namespace Database\Factories;

use App\Models\Instructor;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends Factory<Instructor>
 */
class InstructorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Instructor::class;
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('Test1234'),
            'bio' => $this->faker->paragraph(),
            'avatar' => 'https://i.pravatar.cc/300',
            'education' => $this->faker->sentence(),
            'occupation' => $this->faker->sentence(),
            'phone' => $this->faker->phoneNumber(),
        ];
    }
}
