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
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string("type");
            $table->string("title");
            $table->string("author");
            $table->integer("authorId")->nullable();
            $table->string("subject");
            $table->text("byline")->nullable();
            $table->mediumText("content");
            $table->string("bannerImage");
            $table->string("cardImage");
            $table->string("tags")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
