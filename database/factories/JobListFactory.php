<?php

namespace Database\Factories;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobList>
 */
class JobListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_name' => $this->faker->company,
            'job_title' => $this->faker->jobTitle,
            'job_url' => $this->faker->optional()->url,
            'application_source' => $this->faker->optional()->word,
            'email' => $this->faker->optional()->safeEmail,
            'location' => $this->faker->city,
            'status_id' => Status::inRandomOrder()->first()->id,
        ];
    }
}
