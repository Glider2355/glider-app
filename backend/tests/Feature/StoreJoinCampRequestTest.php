<?php

namespace Tests\Feature;

use App\Http\Requests\Camp\StoreJoinCampRequest;
use App\Infrastructure\Models\Camp;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Mockery;
use Tests\TestCase;

class StoreJoinCampRequestTest extends TestCase
{
    use RefreshDatabase;

    /** @dataProvider dataProvider
     * @param array $data
     * @param bool $expectedFails (falseの場合はバリデーションが通ることを期待する)
    */
    public function test_rules($data, $expectedFails)
    {
        // Campモデルのモックを作成
        $mockCamp = Mockery::mock('overload:' . Camp::class);
        $mockCamp->shouldReceive('findOrFail')
            ->andReturn((object) [
                'id' => 1,
                'start_date' => '2023-05-01',
                'end_date' => '2023-05-05'
            ]);

        $request = new StoreJoinCampRequest();

        $validator = Validator::make($data, $request->rules());

        $this->assertEquals($expectedFails, $validator->fails());
    }

    public function dataProvider()
    {
        return [
            '日程が被っていない' => [
                [
                    'camp_id' => 1,
                    'attendances' => [
                        [
                            'start_time_slot' => 'morning',
                            'start_date' => '2023-05-02',
                            'end_time_slot' => 'afternoon',
                            'end_date' => '2023-05-03',
                        ],
                        [
                            'start_time_slot' => 'morning',
                            'start_date' => '2023-05-04',
                            'end_time_slot' => 'afternoon',
                            'end_date' => '2023-05-05',
                        ],

                    ]
                ],
                false,
            ],
            '日程が被っている' => [
                [
                    'camp_id' => 1,
                    'attendances' => [
                        [
                            'start_time_slot' => 'morning',
                            'start_date' => '2023-05-01',
                            'end_time_slot' => 'afternoon',
                            'end_date' => '2023-05-03',
                        ],
                        [
                            'start_time_slot' => 'morning',
                            'start_date' => '2023-05-03',
                            'end_time_slot' => 'afternoon',
                            'end_date' => '2023-05-05',
                        ],

                    ]
                ],
                true,
            ],
            '合宿期間外' => [
                [
                    'camp_id' => 1,
                    'attendances' => [
                        [
                            'start_time_slot' => 'morning',
                            'start_date' => '2023-04-30',
                            'end_time_slot' => 'afternoon',
                            'end_date' => '2023-05-02',
                        ],
                        [
                            'start_time_slot' => 'morning',
                            'start_date' => '2023-05-03',
                            'end_time_slot' => 'afternoon',
                            'end_date' => '2023-05-06',
                        ],

                    ]
                ],
                true,
            ]
        ];
    }
}
