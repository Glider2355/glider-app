<?php

namespace App\Http\Controllers\University;

use App\Http\Controllers\Controller;
use App\Http\Requests\University\StoreUniversityRequest;
use App\Http\Requests\University\UpdateUniversityRequest;
use App\Infrastructure\Models\University;

class UniversityController extends Controller
{
    // すべての大学を取得する
    public function index()
    {
        $university = University::all();
        return response()->json($university);
    }

    // 1つの大学を取得する
    public function show($id)
    {
        $university = University::findOrFail($id);
        return response()->json($university);
    }

    // 大学を新規作成する
    public function store(StoreUniversityRequest $request)
    {
        $university = new University();
        $university->name = $request->name;
        $university->save();
        return response()->json($university);
    }

    // 大学を更新する
    public function update(UpdateUniversityRequest $request)
    {
        $university = University::where('id', $request->id())->firstOrFail();
        $university->name = $request->name;
        $university->save();
        return response()->json($university);
    }

    // 大学を削除する
    public function destroy($id)
    {
        $university = University::findOrFail($id);
        $university->delete();
        return response()->json($university);
    }
}
