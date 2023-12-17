<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserRoleRelationFactory extends Factory
{
    protected $model = \App\Infrastructure\Models\UserRoleRelation::class;
    
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 10),
            'role_id' => $this->faker->numberBetween(1, 7)
        ];
    }
}
