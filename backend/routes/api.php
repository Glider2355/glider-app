<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

use App\Http\Controllers\Camp\CampController;
use App\Http\Controllers\University\UniversityController;
use App\Http\Controllers\Camp\JoinCampController;
use App\Http\Controllers\Role\UserRoleController;
use App\Http\Controllers\University\UserUniversityController;

use App\Http\Controllers\Role\RoleController;

// 認証系
Route::post('/user/register', [AuthController::class, 'register']);
Route::post('/user/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/logout', [AuthController::class, 'logout']);
    Route::post('/token', function (Request $request) {
        $user = $request->user();
        $token = $user->createToken('API Token')->plainTextToken;
        return response()->json([
            'token' => $token
        ], 200);
    });
});

// 各種データ系
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ユーザー
    Route::put('/user/update', [AuthController::class, 'update']);

    // 合宿
    Route::get('/camp', [CampController::class, 'index']);
    Route::get('/camp/{id}', [CampController::class, 'show']);
    Route::post('/camp/create', [CampController::class, 'store']);
    Route::put('/camp/update/{id}', [CampController::class, 'update']);
    Route::delete('/camp/delete/{id}', [CampController::class, 'destroy']);

    // 合宿参加申請, 参加状況
    Route::get('/camp/join/{id}', [JoinCampController::class, 'show']);
    Route::post('/camp/join', [JoinCampController::class, 'store'])->name('camp.join');
    Route::delete('/camp/join/{id}', [JoinCampController::class, 'destroy']);
    Route::get('/camp/join/export/{id}', [JoinCampController::class, 'export']);

    // 係
    Route::get('/role', [RoleController::class, 'index']);
    Route::get('/role/{id}', [RoleController::class, 'show']);
    Route::post('/role/create', [RoleController::class, 'store']);
    Route::put('/role/update/{id}', [RoleController::class, 'update']);
    Route::delete('/role/delete/{id}', [RoleController::class, 'destroy']);

    // ユーザーの係
    Route::get('/user/role', [UserRoleController::class, 'index']);
    Route::post('/user/role/create', [UserRoleController::class, 'store']);
    Route::delete('/user/role/delete/{id}', [UserRoleController::class, 'destroy']);

    // 大学
    Route::get('/university', [UniversityController::class, 'index']);
    Route::get('/university/{id}', [UniversityController::class, 'show']);
    Route::post('/university/create', [UniversityController::class, 'store']);
    Route::put('/university/update/{id}', [UniversityController::class, 'update']);
    Route::delete('/university/delete/{id}', [UniversityController::class, 'destroy']);

     // ユーザーの所属大学
    Route::get('/user/university', [UserUniversityController::class, 'index']);
    Route::post('/user/university/create', [UserUniversityController::class, 'store']);
});
