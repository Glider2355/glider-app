<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CampFactory extends Factory
{
    protected $model = \App\Infrastructure\Models\Camp::class;

    public function definition(): array
    {
        $start_date = $this->faker->dateTimeBetween('-1 years', 'now');
        $end_date = $this->faker->dateTimeBetween($start_date->format('Y-m-d H:i:s'). ' +1 day', $start_date->format('Y-m-d H:i:s'). ' +1 week');
        return [
            'name' => $this->faker->realText(10),
            'location' => $this->faker->randomElement(['木曽川', '大野', '福井']),
            'start_date' => $start_date->format('Y-m-d'),
            'end_date' => $end_date->format('Y-m-d'),
        ];
    }
}
