<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Infrastructure\Models\University>
 */
class UniversityFactory extends Factory
{

    protected $model = \App\Infrastructure\Models\University::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['関西', '関西学院', '立命館', '同志社', '大阪', '大阪市立', '大阪工業', '大阪', '大阪府立'])
        ];
    }
}
