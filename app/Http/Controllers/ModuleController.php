<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function getModuleContent($moduleId){
        $module = Module::findOrfail($moduleId);
        return response()->json($module);
    }
}
