<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(CampSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UniversitySeeder::class);
        $this->call(UserUniversityRelationSeeder::class);
        $this->call(UserRoleRelationSeeder::class);
        $this->call(UserCampRelationSeeder::class);
    }
}
