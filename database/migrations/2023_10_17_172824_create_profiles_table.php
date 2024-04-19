<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->integer("profileId");
            $table->string("name");
            $table->string("year");
            $table->string("course");
            $table->string("role");
            $table->mediumText("bio");
            $table->string("profileImage")->nullable();
            $table->string("linkedIn");
            $table->string("policyArea");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
