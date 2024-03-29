<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FeedbackController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'student_id' => 'nullable|exists:students,id',
            'instructor_id' => 'nullable|exists:instructors,id',
            'title' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $feedback = new Feedback();
        $feedback->name = $validatedData['name'];
        $feedback->student_id = $validatedData['student_id'];
        $feedback->instructor_id = $validatedData['instructor_id'];
        $feedback->title = $validatedData['title'];
        $feedback->email = $validatedData['email'];
        $feedback->message = $validatedData['message'];
        $feedback->save();

        return response()->json(['message' => 'Thank you for your feedback!', 'feedback' => $feedback]);
    }

    public function index(): JsonResponse
    {
        $feedback = Feedback::all();
        return response()->json($feedback);
    }
}
