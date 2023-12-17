<?php

namespace App\Infrastructure\Translator;

use App\Domain\Entities\Camp\Camp;
use App\Domain\Entities\CampAttendance\Attendance;
use App\Domain\Entities\CampAttendance\Attendances;
use App\Domain\Entities\CampAttendance\CampAttendance;
use App\Domain\Entities\User\Users;
use App\Infrastructure\Models\UserCampRelation;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class CampAttendanceTranslator
{

    /**
     * @param Camp
     * @param Users
     * @param UserCampRelation[]
     * @return CampAttendance
     */
    public function translate(Camp $camp, Users $users, Collection $userCampRelations): CampAttendance
    {
        $campAttendance = new CampAttendance($camp);

        // userIdでグループ化する
        $groupedUserCampRelations = $userCampRelations->groupBy('user_id');

        foreach ($groupedUserCampRelations as $userId => $relations) {
            $user = $users->getUser($userId);
            $attendances = new Attendances($user);

            // 1ユーザーの出入り情報を追加する
            foreach ($relations as $relation) {
                $attendance = new Attendance(
                    $relation->start_time_slot,
                    new Carbon($relation->start_date),
                    $relation->end_time_slot,
                    new Carbon($relation->end_date)
                );
                $attendances->addAttendance($attendance);
            }

            $campAttendance->addAttendances($attendances);
        }

        return $campAttendance;
    }
}
