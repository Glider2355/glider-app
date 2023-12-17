<?php

namespace Database\Seeders;

use App\Infrastructure\Models\University;
use Illuminate\Database\Seeder;

class UniversitySeeder extends Seeder
{
    public function run(): void
    {
        University::factory()->count(10)->create();
    }
}
