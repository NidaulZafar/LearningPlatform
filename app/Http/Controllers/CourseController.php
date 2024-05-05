<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Module;
use App\Models\Video;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
        // creating a new course
    }

    public function store(Request $request): JsonResponse
    {

        $courseData = $request->all();

        $courseData['instructor_id'] = auth()->id();
        $course = Course::create($courseData);

        foreach ($courseData['modules'] as $moduleData) {
            $module = new Module($moduleData);
            $course->modules()->save($module);

            // videos for each module
            if (isset($moduleData['videos'])) {
                foreach ($moduleData['videos'] as $videoData) {
                    $video = new Video($videoData);
                    $module->videos()->save($video);
                }
            }
        }

        return response()->json(['message' => 'Course created successfully'], 201);
    }

    public function edit($course)
    {
        // Editing an existing course
    }

    public function update(Request $request, $course)
    {
        // Update an existing course
    }

    public function destroy($course)
    {
        // Delete a course
    }

    public function allCourses($instructorId): JsonResponse
    {
        $courses = Course::with(['instructor', 'modules'])->where('instructor_id', $instructorId)->get();
        return response()->json($courses);
    }
}
