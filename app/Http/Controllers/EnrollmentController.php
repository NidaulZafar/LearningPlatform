<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            return response()->json(['message' => 'No courses enrolled. Please browse through our courses'], 200);
        }

        return response()->json($enrolledCourses);
    }

    public function enrollStudent(Request $request): JsonResponse
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $studentId = auth()->id();

        DB::beginTransaction();

        try {
            $enrollment = new Enrollment();
            $enrollment->course_id = $request->course_id;
            $enrollment->student_id = $studentId;
            $enrollment->status = 'enrolled';
            $enrollment->enrolled_at = now();
            $enrollment->save();

            DB::commit();

            return response()->json(['message' => 'Enrolled successfully', 'enrollment_id' => $enrollment->id], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Enrollment failed', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Enrollment failed'], 500);
        }

    }

    public function unenrollStudent(Request $request, $enrollmentId): JsonResponse
    {
        Log::info('Unenroll student', ['enrollment_id' => $enrollmentId]);
        Log::info('Request', $request->all());
        $studentId = auth()->id();
        Log::info('Student ID', ['student_id' => $studentId]);
        $enrollment = Enrollment::findOrFail($enrollmentId);

        if ($enrollment->student_id !== $studentId) {
            return response()->json(['message' => 'You are not authorized to unenroll from this course'], 403);
        }

        if (!$enrollment) {
            return response()->json(['message' => 'You are not enrolled in this course'], 404);
        }


        $enrollment->status = 'dropped';
        $enrollment->finished_at = now();
        $enrollment->save();

        return response()->json(['message' => 'Unenrolled successfully'], 200);
    }



}
