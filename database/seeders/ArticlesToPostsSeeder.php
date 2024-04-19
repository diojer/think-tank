<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Post;

class ArticlesToPostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = DB::table('articles')->get();

        foreach ($articles as $article) {
            Post::create([
                'type' => 'article',
                'title' => $article->title,
                'author' => $article->author,
                'subject' => $article->subject,
                'tags' => $article->tags,
                'byline' => $article->byline,
                'content' => $article->content,
                'cardImage' => $article->cardImage,
                'bannerImage' => $article->bannerImage,
            ]);
        }
    }
}