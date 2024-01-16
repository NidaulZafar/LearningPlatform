<?php

namespace Database\Seeders;

use App\Models\Announcement;
use Database\Factories\AnnouncementFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnnouncementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Announcement::factory(10)->create();
    }
}
