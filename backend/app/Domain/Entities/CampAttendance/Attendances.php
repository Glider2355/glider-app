<?php

namespace App\Domain\Entities\CampAttendance;

use App\Domain\Entities\Camp\Camp;
use App\Domain\Entities\User\User;
use Carbon\Carbon;

/**
 * 合宿の1人の出入りを表すクラス
 */

class Attendances
{

    /**
     * @param array<Attendance[]>
     */
    private array $attendances = [];

    /**
     * @param User $user
     */
    public function __construct(
        readonly private User $user,
    )
    { }

    public function getUser(): User
    {
        return $this->user;
    }

    // Attendanceを追加し、AttendanceのstartDateでソートする
    public function addAttendance(Attendance $attendance): void
    {
        $this->attendances[] = $attendance;

        usort($this->attendances, function ($a, $b) {
            return $a->getStartDate() <=> $b->getStartDate();
        });
    }

    /**
     * @return array<Attendance[]>
     */
    public function getAttendances(): array
    {
        return $this->attendances;
    }

    public function calculateAge(Carbon $date): void
    {
        $this->user->calculateAge($date);
    }

    public function toArray(Camp $camp): array
    {
        return [
            'user_id' => $this->user->getId(),
            'user_first_name' =>  $this->user->getFirstName(),
            'user_last_name' => $this->user->getLastName(),
            'user_university' => $this->user->getUniversity()?->getName() ?? "",
            'grade' => $this->user->getGrade() ?? "",
            'licence_deadline' => $this->user->getLicenceDeadline()->format('Y-m-d') ?? "",
            'age' => $this->user->getAge() ?? "",
            'user_role' => $this->user->getRoles()?->toArray() ?? "",
            'attendances' => $this->mergeCampAttendances($camp->getStartDate(), $camp->getEndDate()),
        ];
    }

    public function mergeCampAttendances(Carbon $campStartDate, Carbon $campEndDate): array
    {
        $mergedAttendance = [];

        // 初期化
        for ($date = clone $campStartDate; $date->lte($campEndDate); $date->addDay()) {
            $formattedDate = $date->format('Y-m-d');
            $mergedAttendance[$formattedDate] = '';
        }

        foreach ($this->attendances as $attendance) {
            $attendanceArray = $attendance->toCampAttendance($campStartDate, $campEndDate);

            foreach ($attendanceArray as $date => $status) {
                if ($status !== '' && $mergedAttendance[$date] !== '') {
                    $mergedAttendance[$date] = $this->mergeAttendanceStatus($mergedAttendance[$date], $status);
                } elseif ($status !== '') {
                    $mergedAttendance[$date] = $status;
                }
            }
        }

        return $mergedAttendance;
    }

    private function mergeAttendanceStatus($existingStatus, $newStatus): string
    {
        // ここで、既存の出席状態と新しい出席状態を適切にマージするロジックを実装します
        // 例えば、'朝来 昼帰' と '昼来 夜帰' などの組み合わせを処理
        return $existingStatus . ',' . $newStatus;
    }
}
