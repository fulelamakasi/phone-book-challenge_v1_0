<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faker = Faker::create();
        $users = User::all();
        $totalUsers = $users->count();

        foreach ($users as $user) {
            for ($i = 0; $i < $totalUsers; $i++) {
                DB::table('contacts')->insert([
                    'user_id' => $user->id,  // Set the user_id to match the current user
                    'name' => $faker->name,
                    'email' => $faker->email,
                    'phone' => $faker->phoneNumber,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
