<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            AdminsTableSeeder::class,
            InstructorsTableSeeder::class,
            StudentsTableSeeder::class,
            AnnouncementsTableSeeder::class,
            CoursesTableSeeder::class,
            ModulesTableSeeder::class,
            EnrollmentsTableSeeder::class,
            QuizzesTableSeeder::class,
            GradesTableSeeder::class,
            AssignmentsTableSeeder::class,
            VideosTableSeeder::class,
        ]);
    }
}
