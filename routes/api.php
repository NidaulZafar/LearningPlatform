<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentModuleController;
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


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], static function () {
    Route::get('/user', static function () {
        return auth()->user();
    });
    Route::get('/instructor-profile', [InstructorController::class, 'getInstructorProfile']);
    Route::get('/student-profile', [StudentController::class, 'getStudentProfile']);
    Route::put('/students/{id}', [StudentController::class, 'update']);
    Route::put('/instructors/{id}', [InstructorController::class, 'update']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::get('/courses/instructor/{id}', [CourseController::class, 'allCourses']);
    Route::get('/student_module', [StudentModuleController::class, 'getStudentModules']);
    Route::get('/module/{id}', [ModuleController::class, 'getModuleContent']);
    Route::put('/module/{id}/complete', [ModuleController::class, 'markAsCompleted']);
    Route::get('/instructors/{id}', [InstructorController::class, 'show']);
    Route::get('/enrolled-courses', [EnrollmentController::class, 'getEnrolledCourses']);
    Route::post('/enroll', [EnrollmentController::class, 'enrollStudent']);
    Route::delete('/enroll/{enrollmentId}', [EnrollmentController::class, 'unenrollStudent']);
    Route::post('/feedback', [FeedbackController::class, 'store']);
    Route::get('/feedback', [FeedbackController::class, 'index']);
    Route::post('/contact', [ContactController::class, 'store']);
    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/announcements', [AnnouncementController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
