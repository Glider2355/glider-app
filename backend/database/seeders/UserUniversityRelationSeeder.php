<?php

namespace Database\Seeders;

use App\Infrastructure\Models\UserUniversityRelation;
use Illuminate\Database\Seeder;

class UserUniversityRelationSeeder extends Seeder
{
    public function run(): void
    {
        UserUniversityRelation::factory()->count(10)->create();
    }
}
