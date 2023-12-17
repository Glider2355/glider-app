<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    protected $model = \App\Infrastructure\Models\Role::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['会計', '13', '21', 'ラジオ', 'リトリブ', '車', '機材'])
        ];
    }
}
