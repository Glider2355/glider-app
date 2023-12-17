<?php

namespace App\Domain\Usecases;

use App\Infrastructure\Repositories\CampAttendanceRepository;

class CampAttendance
{
    /**
     * @param int $campId
     * @return string
     */
    public function handle($campId): array
    {
        $campAttendance = (new CampAttendanceRepository)->getByCampId($campId);
        $camp = $campAttendance->getCamp();
        $endDate = $camp->getEndDate();

        // 合宿撤収日を元に年齢を計算する
        $campAttendance->calculateAge($endDate);

        return $campAttendance->toArray();
    }
}
