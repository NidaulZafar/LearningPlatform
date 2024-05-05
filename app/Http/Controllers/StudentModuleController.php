<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Student;
use App\Models\StudentModule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class StudentModuleController extends Controller
{

    public function getStudentModules(Request $request): JsonResponse
    {
        $studentId = Auth::id();
        $moduleIds = explode(',', $request->input('module_ids')); // Split comma-separated string into array

        $studentModules = StudentModule::whereIn('module_id', $moduleIds)
            ->where('student_id', $studentId)
            ->get(['module_id', 'status']);

        return response()->json($studentModules);
    }
}
