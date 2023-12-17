<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\UserCampRelation;
use App\Infrastructure\Models\User;
use App\Infrastructure\Models\Camp;

class UserCampRelationSeeder extends Seeder
{
    public function run(): void
    {
        UserCampRelation::factory()->count(100)->create();
    }
}
