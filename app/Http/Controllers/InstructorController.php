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
}
