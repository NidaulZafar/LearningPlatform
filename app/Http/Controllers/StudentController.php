<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function getStudentProfile(Request $request): JsonResponse
    {
        $studentId = $request->user()->id;

        $student = Student::find($studentId);

        return $student
            ? response()->json($student)
            : response()->json(['error' => 'Student profile not found.'], 404);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['error' => 'Student not found.'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'string',
            'email' => 'email',
            'bio' => 'nullable|string',
            'education' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $student->update($validatedData);

        return response()->json($student);
    }
}
