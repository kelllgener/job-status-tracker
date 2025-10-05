<?php

namespace Database\Seeders;

use App\Models\JobList;
use App\Models\Status;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $statuses = [
            ['name' => 'Applied', 'slug' => 'applied'],
            ['name' => 'Interviewing', 'slug' => 'interviewing'],
            ['name' => 'Offer received', 'slug' => 'offer-received'],
            ['name' => 'Hired', 'slug' => 'hired'],
            ['name' => 'Not selected by employer', 'slug' => 'not-selected-by-employer'],
            ['name' => 'No longer interested', 'slug' => 'no-longer-interested'],
        ];
        foreach ($statuses as $status) {
            Status::create([
                'name' => $status['name'],
                'slug' => $status['slug'],
            ]);
        }

        // JobList::factory(10)->create();
    }
}
