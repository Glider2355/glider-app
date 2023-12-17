<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreUserRoleRequest;
use App\Infrastructure\Models\UserRoleRelation;

class UserRoleController extends Controller
{
    // ユーザーの全てのロールを取得する
    public function index()
    {
        $userRoles = UserRoleRelation::with('role')
        ->where('user_id', auth()->user()->id)->get();
        return response()->json($userRoles);
    }

    // ユーザーのロールを新規登録、更新する
    public function store(StoreUserRoleRequest $request)
    {
        $userId = auth()->user()->id;
        $id = $request->id;
        if ($id) {
            $userRoleRelation = UserRoleRelation::where('user_id', $userId)
                ->where('id', $id)
                ->firstOrFail();

            $userRoleRelation->certification = $request->certification;
            $userRoleRelation->role_id = $request->role_id;
            $userRoleRelation->save();

            $message = 'User role relation updated successfully';
        } else {
            $userRoleRelation = new UserRoleRelation([
                'user_id' => $userId,
                'certification' => $request->certification,
                'role_id' => $request->role_id,
            ]);

            $userRoleRelation->save();

            $message = 'User role relation created successfully';
        }

        return response()->json([
            'message' => $message,
            'data' => $userRoleRelation
        ], 201);
    }

    // ユーザーのロールを削除する
    public function destroy($id)
    {
        $userRole = UserRoleRelation::findOrFail($id);
        $userRole->delete();
        return response()->json($userRole);
    }
}
