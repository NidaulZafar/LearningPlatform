<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VideoController extends Controller
{
    public function index(): JsonResponse
    {
        $videos = Video::all();
        return response()->json(['videos' => $videos]);
    }

    public function show(Video $video): JsonResponse
    {
        /** @noinspection PhpConditionAlreadyCheckedInspection */

        return $video
            ? response()->json($video)
            : response()->json(['error' => 'Video not found.'], 404);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'url' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $video = Video::create($request->all());
        return response()->json($video, 201);
    }
}
