<?php

namespace App\Domain\Entities\CampAttendance;

use Carbon\Carbon;

/**
 * 合宿での入と出を表すクラス
 */

class Attendance
{
    /**
     * @param string $startTimeSlot
     * @param Carbon $startDate
     * @param string $endTimeSlot
     * @param Carbon $endDate
     */
    public function __construct(
        readonly private string $startTimeSlot,
        readonly private Carbon $startDate,
        readonly private string $endTimeSlot,
        readonly private Carbon $endDate
    )
    { }

    public function getStartTimeSlot(): string
    {
        return $this->startTimeSlot;
    }

    public function getStartDate(): Carbon
    {
        return $this->startDate;
    }

    public function getEndTimeSlot(): string
    {
        return $this->endTimeSlot;
    }

    public function getEndDate(): Carbon
    {
        return $this->endDate;
    }

    public function toArray(): array
    {
        return [
            'start_time_slot' => $this->startTimeSlot,
            'start_date' => $this->startDate->format('Y-m-d'),
            'end_time_slot' => $this->endTimeSlot,
            'end_date' => $this->endDate->format('Y-m-d'),
        ];
    }

    public function toCampAttendance(Carbon $campStartDate, Carbon $campEndDate): array
    {
        $attendanceArray = [];

        // 合宿期間をループして、日付ごとに処理
        for ($date = clone $campStartDate; $date->lte($campEndDate); $date->addDay()) {
            $formattedDate = $date->format('Y-m-d');

            if ($date->isSameDay($this->startDate) && $date->isSameDay($this->endDate)) {
                // 同じ日に出席開始と終了する場合
                $attendanceArray[$formattedDate] = '日帰';
            } elseif ($date->isSameDay($this->startDate)) {
                // 出席開始日
                $attendanceArray[$formattedDate] = $this->getParticipationMark($this->startTimeSlot);
            } elseif ($date->isSameDay($this->endDate)) {
                // 出席終了日
                $attendanceArray[$formattedDate] = $this->getReturnMark($this->endTimeSlot);
            } else {
                // その他の日
                $attendanceArray[$formattedDate] = $date->between($this->startDate, $this->endDate) ? '◯' : '';
            }
        }

        return $attendanceArray;
    }

    private function getParticipationMark($timeSlot): string
    {
        return match($timeSlot) {
            'morning' => '朝来',
            'afternoon' => '昼来',
            'night' => '夜来',
            default => ''
        };
    }

    private function getReturnMark($timeSlot): string
    {
        return match($timeSlot) {
            'morning' => '朝帰',
            'afternoon' => '昼帰',
            'night' => '夜帰',
            default => ''
        };
    }
}
