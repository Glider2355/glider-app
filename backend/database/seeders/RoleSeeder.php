<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::factory()->count(10)->create();
    }
}
