<?php

namespace App\Http\Controllers\Camp;

use App\Http\Controllers\Controller;
use App\Infrastructure\Models\Camp;
use App\Http\Requests\Camp\StoreCampRequest;
use App\Http\Requests\Camp\UpdateCampRequest;
use App\Infrastructure\Models\UserCampRelation;
use Carbon\Carbon;

class CampController extends Controller
{
    // すべての合宿を取得する
    public function index()
    {
        $camps = Camp::orderBy('created_at', 'DESC')->get();
        return response()->json($camps);
    }

    // 1つの合宿を取得する
    public function show($id)
    {
        $camp = Camp::findOrFail($id);
        return response()->json($camp);
    }

    // 合宿を新規作成する
    public function store(StoreCampRequest $request)
    {
        $camp = new Camp;
        $camp->name = $request->name;
        $camp->location = $request->location;
        $camp->start_date = Carbon::parse($request->start_date)->format('Y-m-d');
        $camp->end_date = Carbon::parse($request->end_date)->format('Y-m-d');
        $camp->save();
        return response()->json($camp);
    }

    // 合宿を更新する
    public function update(UpdateCampRequest $request)
    {
        $camp = Camp::where('id', $request->id())->firstOrFail();
        $camp->name = $request->name;
        $camp->location = $request->location;
        $camp->start_date = $request->start_date;
        $camp->end_date = $request->end_date;
        $camp->save();
        return response()->json($camp);
    }

    // 合宿を削除する
    public function destroy($id)
    {
        $camp = Camp::findOrFail($id);
        $camp->delete();
        UserCampRelation::where('camp_id', $id)->delete();
        return response()->json($camp);
    }
}
