<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EnrollmentController extends Controller
{
    public function getEnrolledCourses(): JsonResponse
    {
        $userId = auth()->id();
        $enrolledCourses = Enrollment::where('student_id', $userId)
            ->where('status', 'enrolled')
            ->with('course')
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

        $isEnrolled = Enrollment::where('student_id', $studentId)
            ->where('course_id', $request->course_id)
            ->where('status', 'enrolled')
            ->exists();

        if ($isEnrolled) {
            return response()->json(['message' => 'You are already enrolled in this course'], 400);
        }

        DB::beginTransaction();
        try {
            $enrollment = new Enrollment();
            $enrollment->course_id = $request->course_id;
            $enrollment->student_id = $studentId;
            $enrollment->status = 'enrolled';
            $enrollment->enrolled_at = now();
            $enrollment->save();

            $course = Course::findOrFail($request->course_id);
            $modules = $course->modules;

            foreach ($modules as $module) {
                $enrollment->modules()->attach($module->id, ['student_id' => $studentId]);
            }
            DB::commit();

            return response()->json(['message' => 'Enrolled successfully', 'enrollment_id' => $enrollment->id], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Enrollment failed'], 500);
        }
    }

    public function unenrollStudent(Request $request, $enrollmentId): JsonResponse
    {
        $studentId = auth()->id();
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
