<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        //Permissions
        Permission::create(["name"=>"edit articles"]);
        Permission::create(["name"=>"publish articles"]);
        Permission::create(["name"=>"delete articles"]);

        $roleAdmin = Role::create(["name"=>"admin"]);
        $roleAdmin->syncPermissions(["edit articles", "publish articles", "delete articles"]);
    }
}
