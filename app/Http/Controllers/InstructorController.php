<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    public function getInstructorProfile(Request $request): JsonResponse
    {
        $instructorId = $request->user()->id;

        $instructor = Instructor::find($instructorId);

        return $instructor
            ? response()->json($instructor)
            : response()->json(['error' => 'Instructor profile not found.'], 404);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $instructor = Instructor::find($id);

        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found.'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'string',
            'email' => 'email',
            'bio' => 'nullable|string',
            'education' => 'nullable|string',
            'occupation' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $instructor->update($validatedData);

        return response()->json($instructor);
    }
}
