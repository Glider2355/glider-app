<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserUniversityRelationFactory extends Factory
{
    protected $model = \App\Infrastructure\Models\UserUniversityRelation::class;
    
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 10),
            'university_id' => $this->faker->numberBetween(1, 9)
        ];
    }
}
