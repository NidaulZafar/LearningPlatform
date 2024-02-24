<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Module;
use App\Models\Video;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{

    public function index(): JsonResponse
    {
        $courses = Course::with(['instructor', 'modules'])->get();

        return response()->json($courses);
    }


    public function show($id): JsonResponse
    {
        try {
            $userId = auth()->id();
            $course = Course::with(['instructor', 'modules', 'enrollments' => function ($query) use ($userId) {
                $query->where('student_id', $userId);
            }])->findOrFail($id);

            return response()->json($course);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Course not found!'], 404);
        }
    }

    public function create()
    {
        // Define the logic for creating a new course
    }

    public function store(Request $request): JsonResponse
    {
        // Validate the incoming request data

        $courseData = $request->all();

        $courseData['instructor_id'] = auth()->id();
Log::info($courseData);
        // Create the course
        $course = Course::create($courseData);

        // Create modules
        foreach ($courseData['modules'] as $moduleData) {
            $module = new Module($moduleData);
            $course->modules()->save($module);

            // Create videos for each module
            if (isset($moduleData['videos'])) {
                foreach ($moduleData['videos'] as $videoData) {
                    $video = new Video($videoData);
                    $module->videos()->save($video);
                }
            }
        }

        // Return success response
        return response()->json(['message' => 'Course created successfully'], 201);
    }

    public function edit($course)
    {
        // Define the logic for editing an existing course
    }

    public function update(Request $request, $course)
    {
        // Define the logic to update an existing course
    }

    public function destroy($course)
    {
        // Define the logic to delete a course
    }
}
