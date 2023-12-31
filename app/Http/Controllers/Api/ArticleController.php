<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Requests\DeleteArticleRequest;
use App\Http\Resources\ArticleResource;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ArticleResource::collection(Article::query()->orderBy("id", "desc")->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $data = $request->validated();

        $cardImage = $request->file("cardImage");
        $bannerImage = $request->file("bannerImage");

        $cardFilename = time()."_".$cardImage->getClientOriginalName();
        Storage::disk("public")->put("/images/articles/{$cardFilename}", file_get_contents($data["cardImage"]));

        $bannerFilename = time()."_".$bannerImage->getClientOriginalName();
        Storage::disk("public")->put("/images/articles/{$bannerFilename}", file_get_contents($data["bannerImage"]));
        $user = Article::create([
            "title"=>$data["title"],
            "author"=>$data["author"],
            "subject"=>$data["subject"],
            "tags"=>$data["tags"],
            "byline"=>$data["byline"],
            "content"=>$data["content"],
            "cardImage"=>"/images/articles/{$cardFilename}",
            "bannerImage"=>"/images/articles/{$bannerFilename}",
        ]);

        return response([
            "message"=>"Article Uploaded Successfully!",
            "status"=>true,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return new ArticleResource($article);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $data = $request->validated();
        $article["title"] = $data["title"];
        $article["author"] = $data["author"];
        $article["subject"] = $data["subject"];
        $article["content"] = $data["content"];
        $article["subject"] = $data["subject"];
        $article["byline"] = $data["byline"];
        if ($request->file("cardImage")) {
            $cardImage = $request->file("cardImage");
            $cardFilename = time()."_".$cardImage->getClientOriginalName();
            Storage::disk("public")->put("/images/articles/{$cardFilename}", file_get_contents($data["cardImage"]));
            $article->cardImage = "/images/articles/{$cardFilename}";
        }
        if ($request->file("bannerImage")) {
            $bannerImage = $request->file("bannerImage");
            $bannerFilename = time()."_".$bannerImage->getClientOriginalName();
            Storage::disk("public")->put("/images/articles/{$bannerFilename}", file_get_contents($data["bannerImage"]));
            $article->bannerImage = "/images/articles/{$bannerFilename}";
        }
        $article->save();
        return response("saved", 200);
        // $article->update($data);
        // return response(["", 201]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteArticleRequest $request, Article $article)
    {
        $article->delete();
        return response("", 201);
    }
}
