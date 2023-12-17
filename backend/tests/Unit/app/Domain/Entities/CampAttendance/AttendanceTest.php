<?php

namespace Tests\Unit\app\Domain\Entities\CampAttendance;

use App\Domain\Entities\CampAttendance\Attendance;
use Carbon\Carbon;
use PHPUnit\Framework\TestCase;

class AttendanceTest extends TestCase
{
    /**
     * @test
     * @dataProvider campAttendanceDataProvider
     */
    public function test_toCampAttendance($startTimeSlot, $startDate, $endTimeSlot, $endDate, $expected): void
    {
        // Arrange
        $attendance = new Attendance($startTimeSlot, $startDate, $endTimeSlot, $endDate);

        $campStartDate = Carbon::create(2021, 8, 1);
        $campEndDate = Carbon::create(2021, 8, 5);

        // Act
        $result = $attendance->toCampAttendance($campStartDate, $campEndDate);

        // Assert
        $this->assertSame($expected, $result);
    }

    /**
     * @return array
     */
    public static function campAttendanceDataProvider(): array
    {
        return [
            'Test Case 1' => [
                'startTimeSlot' => 'morning',
                'startDate' => Carbon::create(2021, 8, 1),
                'endTimeSlot' => 'afternoon',
                'endDate' => Carbon::create(2021, 8, 3),
                'expected' => [
                    '2021-08-01' => '朝来',
                    '2021-08-02' => '◯',
                    '2021-08-03' => '昼帰',
                    '2021-08-04' =>  '',
                    '2021-08-05' => ''
                    ]
            ],
            'Test Case 2' => [
                'startTimeSlot' => 'afternoon',
                'startDate' => Carbon::create(2021, 8, 3),
                'endTimeSlot' => 'night',
                'endDate' => Carbon::create(2021, 8, 4),
                'expected' => [
                    '2021-08-01' => '',
                    '2021-08-02' => '',
                    '2021-08-03' => '昼来',
                    '2021-08-04' => '夜帰',
                    '2021-08-05' => ''
                    ]
            ],
            'Test Case 3' => [
                'startTimeSlot' => 'night',
                'startDate' => Carbon::create(2021, 8, 4),
                'endTimeSlot' => 'morning',
                'endDate' => Carbon::create(2021, 8, 5),
                'expected' => [
                    '2021-08-01' => '',
                    '2021-08-02' => '',
                    '2021-08-03' => '',
                    '2021-08-04' => '夜来',
                    '2021-08-05' => '朝帰'
                    ]
            ],
        ];
    }
}
