<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function getModuleContent($moduleId): JsonResponse
    {
        $module = Module::with('videos')->findOrfail($moduleId);
        return response()->json($module);
    }

}
