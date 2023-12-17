<?php

namespace Database\Factories;

use App\Infrastructure\Models\Camp;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserCampRelationFactory extends Factory
{
    protected $model = \App\Infrastructure\Models\UserCampRelation::class;

    public function definition(): array
    {
        $campId = $this->faker->numberBetween(1, 10);
        $date = $this->makeDate($campId);

        $time_slots = ['morning', 'afternoon', 'night'];
        $start_time_slot = $this->faker->randomElement($time_slots);
        $end_time_slot = $this->faker->randomElement($time_slots);

        return [
            'user_id' => $this->faker->numberBetween(1, 10),
            'camp_id' => $campId,
            'start_time_slot' => $start_time_slot,
            'start_date' => $date['start_date'],
            'end_time_slot' => $end_time_slot,
            'end_date' => $date['end_date'],
        ];
    }

    private function makeDate(int $campId): array
    {
        $camp = Camp::findOrFail($campId);
        $startDate = $camp->start_date;
        $endDate = $camp->end_date;

        $end_date = $this->faker->dateTimeBetween($startDate, $endDate);
        $start_date = $this->faker->dateTimeBetween($startDate, $end_date);

        $date = [
            'start_date' => $start_date->format('Y-m-d'),
            'end_date' => $end_date->format('Y-m-d'),
        ];

        return $date;
    }
}
