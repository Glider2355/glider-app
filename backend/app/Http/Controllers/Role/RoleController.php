<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;

use App\Infrastructure\Models\Role;

class RoleController extends Controller
{
    // すべてのロールを取得する
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    // 1つのロールを取得する
    public function show($id)
    {
        $role = Role::findOrFail($id);
        return response()->json($role);
    }

    // ロールを新規作成する
    public function store(StoreRoleRequest $request)
    {
        $role = new Role();
        $role->name = $request->name;
        $role->save();
        return response()->json($role);
    }

    // ロールを更新する
    public function update(UpdateRoleRequest $request)
    {
        $role = Role::where('id', $request->id())->firstOrFail();
        $role->name = $request->name;
        $role->save();
        return response()->json($role);
    }

    // ロールを削除する
    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json($role);
    }
}
