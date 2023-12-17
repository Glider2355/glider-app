<?php

namespace App\Http\Controllers\Camp;

use App\Domain\Usecases\CampAttendance;
use App\Domain\Usecases\Export\CampAttendanceExcel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Camp\StoreJoinCampRequest;
use App\Infrastructure\Models\Camp;
use App\Infrastructure\Models\UserCampRelation;
use App\Infrastructure\Repositories\CampAttendanceRepository;
use Carbon\Carbon;

class JoinCampController extends Controller
{
    // 1つの合宿参加申請を全て取得する
    public function show($camp_id)
    {
        $useCase = new CampAttendance($camp_id);

        $campAttendance = $useCase->handle($camp_id);

        return response()->json($campAttendance);
    }

    // 合宿参加申請する
    public function store(StoreJoinCampRequest $request)
    {
        UserCampRelation::where('user_id', auth()->user()->id)->where('camp_id', $request->camp_id)->delete();
        foreach ($request->attendances as $attendance) {
            $userCampRelation = UserCampRelation::updateOrCreate(
                [
                    'user_id' => auth()->user()->id,
                    'camp_id' => $request->camp_id,
                    'start_date' => $attendance['start_date'],
                ],
                [
                    'start_time_slot' => $attendance['start_time_slot'],
                    'start_date' => Carbon::parse($attendance['start_date'])->format('Y-m-d'),
                    'end_time_slot' => $attendance['end_time_slot'],
                    'end_date' => Carbon::parse($attendance['end_date'])->format('Y-m-d')
                ]
            );
        }

        $message = $userCampRelation->wasRecentlyCreated
            ? 'User camp relation created successfully'
            : 'User camp relation updated successfully';

        return response()->json([
            'message' => $message,
            'data' => $userCampRelation
        ], 201);
    }

    // 合宿参加申請を削除する
    public function destroy($camp_id)
    {
        $userCampRelation = UserCampRelation::where('user_id', auth()->user()->id)->where('camp_id', $camp_id)->delete();
        return response()->json([
            'message' => 'User camp relation deleted successfully',
            'data' => $userCampRelation
        ], 200);
    }

    // 合宿の参加状況をExcelで返す
    public function export($camp_id)
    {
        $useCase = new CampAttendanceExcel(new CampAttendanceRepository());
        $content = $useCase->handle($camp_id);
        return response($content)
            ->header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            ->header('Content-Disposition', 'attachment; filename="file.xlsx"');
    }
}
