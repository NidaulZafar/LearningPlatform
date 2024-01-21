<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Instructor;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $headers = [
            'Access-Control-Allow-Origin' => '*',
        ];
        $data = $request->validated();
        if ($data['type'] === 'student') {
            $user = Student::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
        } else if ($data['type'] === 'instructor') {
            $user = Instructor::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
        } else {
            return response()->json([
                'message' => 'Invalid user type'
            ], 422);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response(compact('user', 'token', 'headers'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $userType = $request->input('type');

        if ($userType === 'student') {
            $guard = 'student';
        } else if ($userType === 'instructor') {
            $guard = 'instructor';
        } else {
            return response()->json([
                'message' => 'Invalid user type'
            ], 422);
        }

        if (Auth::guard($guard)->attempt($credentials)) {
            $user = Auth::guard($guard)->user();
            $token = $user->createToken('auth_token')->plainTextToken;
            return response(compact('user', 'token'));
        } else {
            return response()->json([
                'message' => "Invalid $userType login credentials"
            ], 401);
        }
    }


    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $user->currentAccessToken()->delete();
            return response()->json([
                'message' => 'Logged out'
            ]);
        }

        // If the user is not authenticated, return an appropriate response
        return response()->json([
            'message' => 'User not authenticated'
        ], 401);
    }
}
