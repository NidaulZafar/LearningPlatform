<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EnrollmentController extends Controller
{
    public function getEnrolledCourses(): JsonResponse
    {
        $userId = auth()->id(); // Get the current authenticated user's ID
        $enrolledCourses = Enrollment::where('student_id', $userId)
            ->where('status', 'enrolled')
            ->with('course') // Assuming you have defined the relationship in your Enrollment model
            ->get();

        if ($enrolledCourses->isEmpty()) {
            return response()->json(['message' => 'No courses enrolled'], 200);
        }

        return response()->json($enrolledCourses);
    }

    public function enrollStudent(Request $request): JsonResponse
    {

        Log::info('Enrollment request payload:', $request->all());

        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $studentId = auth()->id();

        $enrollment = new Enrollment();
        $enrollment->course_id = $request->course_id;
        $enrollment->student_id = $studentId;
        $enrollment->status = 'enrolled';
        $enrollment->enrolled_at = now();
        $enrollment->save();

        return response()->json(['message' => 'Enrolled successfully'], 200);
    }

}