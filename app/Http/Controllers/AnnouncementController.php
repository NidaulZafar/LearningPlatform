<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index(): JsonResponse
    {
        $announcements = Announcement::all();
        return response()->json($announcements);
    }
}
