<?php

namespace App\Domain\Entities\CampAttendance;

use App\Domain\Entities\Camp\Camp;
use Carbon\Carbon;

/**
 * 1つの合宿の出入りを表すクラス
 */

class CampAttendance
{
    /**
     * @param array<Attendances[]>
     */
    private array $campAttendance = [];

    /**
     * @param Camp $camp
     */
    public function __construct(
        readonly private Camp $camp,
    )
    { }

    public function getCamp(): Camp
    {
        return $this->camp;
    }

    public function addAttendances(Attendances $attendances): void
    {
        $this->campAttendance[] = $attendances;
    }

    /**
     * @return array<Attendances[]>
     */
    public function getAttendances(): array
    {
        return $this->campAttendance;
    }

    public function calculateAge(Carbon $campEndDate): void
    {
        foreach ($this->campAttendance as $attendances) {
            $attendances->calculateAge($campEndDate);
        }
    }


    public function toArray(): array
    {
        $array = [];
        foreach ($this->campAttendance as $attendances) {
            $array[] = $attendances->toArray($this->camp);
        }
        
        return $array;
    }
}
