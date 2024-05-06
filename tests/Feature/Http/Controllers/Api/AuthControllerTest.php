<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Http\Controllers\Api\AuthController;
use App\Models\Student;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;
    /** @test */
    public function it_can_register_a_student(): void
    {
        Artisan::call('migrate');
        Artisan::call('db:seed');

        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'type' => 'student'
        ];

        $response = $this->postJson('/api/signup', $data);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'created_at', 'updated_at'],
                'token'
            ]);
    }

    /** @test */
    public function it_can_login_a_student()
    {
        Artisan::call('migrate');
        Artisan::call('db:seed');

        $student = Student::create([
            'name' => 'Test Student',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $data = [
            'email' => 'test@example.com',
            'password' => 'password',
            'type' => 'student'
        ];

        $response = $this->postJson('/api/login', $data);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'created_at', 'updated_at'],
                'token'
            ]);
    }


    /** @test */
    public function it_can_logout_a_user(): void
    {
        Artisan::call('migrate');
        Artisan::call('db:seed');

        $student = Student::factory()->create();
        $token = $student->createToken('auth_token')->plainTextToken;
        $response = $this->withHeader('Authorization', 'Bearer ' . $token)->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Logged out'
            ]);
    }
}

