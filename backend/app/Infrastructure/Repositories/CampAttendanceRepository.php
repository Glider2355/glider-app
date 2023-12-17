<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\CampAttendance\CampAttendance;
use App\Domain\Gateway\CampAttendancesGateway;
use App\Infrastructure\Models\UserCampRelation;
use App\Infrastructure\Translator\CampAttendanceTranslator;

class CampAttendanceRepository implements CampAttendancesGateway
{
    /**
     * @param int $campId
     * @return CampAttendance
     */
    public function getByCampId(int $campId): CampAttendance
    {
        $translator = new CampAttendanceTranslator();

        $camp = (new CampRepository())->getByCampId($campId);

        $campAttendanceCollection = UserCampRelation::where('camp_id', $campId)
        ->select('user_id', 'start_time_slot', 'start_date', 'end_time_slot', 'end_date')
        ->get();

        // campIdを元に、参加しているユーザーのidを配列で取得する
        $uniqueUserIds = $campAttendanceCollection->pluck('user_id')->unique()->toArray();

        // 参加しているユーザーのidを元に、参加しているユーザーの情報を取得する
        $users = (new UserRepository())->getByUserIds($uniqueUserIds);

        return $translator->translate($camp, $users, $campAttendanceCollection);
    }
}
