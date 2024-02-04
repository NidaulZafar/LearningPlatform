<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function () {
        return auth()->user();
    });
    Route::get('/instructor-profile', [InstructorController::class, 'getInstructorProfile']);
    Route::get('/student-profile', [StudentController::class, 'getStudentProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);


Route::get('/courses', [CourseController::class, 'index']);
