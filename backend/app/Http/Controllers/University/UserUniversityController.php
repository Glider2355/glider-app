<?php

namespace App\Http\Controllers\University;

use App\Http\Controllers\Controller;
use App\Http\Requests\University\StoreUserUniversityRequest;

use App\Infrastructure\Models\UserUniversityRelation;

class UserUniversityController extends Controller
{
    // ユーザーの所属大学を取得する
    public function index()
    {
        $userUniversity = UserUniversityRelation::with('university')
            ->where('user_id', auth()->user()->id)
            ->get()->first();
        return response()->json($userUniversity);
    }


    // ユーザーの所属大学を新規登録、編集する
    public function store(StoreUserUniversityRequest $request)
    {
        $userUniversityRelation = UserUniversityRelation::updateOrCreate(
            ['user_id' => auth()->user()->id],
            ['university_id' => $request->university_id]
        );

        $message = $userUniversityRelation->wasRecentlyCreated
            ? 'User university relation created successfully'
            : 'User university relation updated successfully';

        return response()->json([
            'message' => $message,
            'data' => $userUniversityRelation
        ], 201);
    }

    // ユーザーの所属大学を削除する
    public function destroy($id)
    {
        $userUniversity = UserUniversityRelation::findOrFail($id);
        $userUniversity->delete();
        return response()->json($userUniversity);
    }
}
