<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Requests\DeletePostRequest;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PostResource::collection(Post::query()->orderBy("id", "desc")->get());
    }

    /**
     * Display a listing of the author's resource.
     */
    public function indexAuthor($id)
    {
        return PostResource::collection(Post::author($id)->orderBy("id", "desc")->get());
    }

    /**
     * Display a listing of the articles resource.
     */
    public function indexArticle()
    {
        return PostResource::collection(Post::type("article")->orderBy("id", "desc")->get());
    }

    /**
     * Display a listing of the press release resource.
     */
    public function indexPress()
    {
        return PostResource::collection(Post::type("press")->orderBy("id", "desc")->get());
    }

    /**
     * Display a listing of the press release resource.
     */
    public function indexMedia()
    {
        return PostResource::collection(Post::type("media")->orderBy("id", "desc")->get());
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
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        $cardImage = $request->file("cardImage");
        $bannerImage = $request->file("bannerImage");

        $cardFilename = time()."_".$cardImage->getClientOriginalName();
        Storage::disk("public")->put("/images/articles/{$cardFilename}", file_get_contents($data["cardImage"]));

        $bannerFilename = time()."_".$bannerImage->getClientOriginalName();
        Storage::disk("public")->put("/images/articles/{$bannerFilename}", file_get_contents($data["bannerImage"]));
        $user = Post::create([
            "type"=>$data["type"],
            "title"=>$data["title"],
            "author"=>$data["author"],
            "authorId"=>$data["authorId"],
            "subject"=>$data["subject"],
            "tags"=>$data["tags"],
            "byline"=>$data["byline"],
            "content"=>$data["content"],
            "cardImage"=>"/images/articles/{$cardFilename}",
            "bannerImage"=>"/images/articles/{$bannerFilename}",
        ]);

        return response([
            "message"=>"Post Uploaded Successfully!",
            "status"=>true,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();
        $post->update($data);
        return response(["", 201]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeletePostRequest $request, Post $post)
    {
        $post->delete();
        return response("", 201);
    }
}
