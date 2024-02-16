<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
            $course = Course::with(['instructor', 'modules', 'enrollments'])->findOrFail($id);
            return response()->json($course);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Course not found!'], 404);
        }
    }

    public function create()
    {
        // Define the logic for creating a new course
    }

    public function store(Request $request)
    {
        // Define the logic to store a new course
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
