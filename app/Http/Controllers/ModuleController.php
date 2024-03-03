<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ModuleController extends Controller
{
    public function getModuleContent($moduleId): JsonResponse
    {
        $studentId = Auth::id();
        $module = Module::with(['videos'])->findOrFail($moduleId);
        return response()->json($module);
    }

    public function markAsCompleted($moduleId): JsonResponse
    {
        $studentId = auth()->user()->id;
        DB::table('student_module')->where('student_id', $studentId)->where('module_id', $moduleId)->update(['status'
        => 'completed']);
        return response()->json(['message' => 'Module marked as completed']);
    }

}
