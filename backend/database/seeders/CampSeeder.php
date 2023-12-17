<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Infrastructure\Models\Camp;

class CampSeeder extends Seeder
{
    public function run(): void
    {
        Camp::factory()->count(10)->create();
    }
}
