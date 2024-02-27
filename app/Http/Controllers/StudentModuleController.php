<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentModuleController extends Controller
{
    public function markModuleAsCompleted($studentId, $moduleId): JsonResponse
    {
        $student = Student::findOrFail($studentId);
        $module = Module::findOrFail($moduleId);

        $student->modules()->syncWithoutDetaching([$moduleId => ['status' => 'completed']]);

        return response()->json(['message' => 'Module marked as completed for the student']);
    }
}
