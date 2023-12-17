<?php

namespace Database\Seeders;

use App\Infrastructure\Models\UserRoleRelation;
use Illuminate\Database\Seeder;

class UserRoleRelationSeeder extends Seeder
{
    public function run(): void
    {

        UserRoleRelation::factory()->count(10)->create();
    }
}
