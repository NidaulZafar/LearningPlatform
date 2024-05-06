<?php

namespace Tests\Feature\Models;

use App\Models\Course;
use App\Models\Instructor;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CourseTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_many_modules()
    {
        $instructor = Instructor::factory()->create();
        $course = Course::factory()->create(['instructor_id' => $instructor->id]);

        $modules = $course->modules()->createMany([
            ['title' => 'Module 1'],
            ['title' => 'Module 2'],
            ['title' => 'Module 3'],
        ]);

        $this->assertInstanceOf(Collection::class, $course->modules);
        $this->assertEquals(3, $course->modules->count());
        $this->assertEquals('Module 1', $course->modules->first()->title);
    }

    /** @test */
    public function it_belongs_to_an_instructor()
    {
        $instructor = Instructor::factory()->create();
        $course = Course::factory()->create(['instructor_id' => $instructor->id]);

        $this->assertInstanceOf(Instructor::class, $course->instructor);
        $this->assertEquals($instructor->id, $course->instructor->id);
    }
}
