<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadRequest;
use App\Models\Article;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function upload(UploadRequest $request) {
        $data = $request->validated();

        $cardFilename = time()."_".$data["cardimage"]->getClientOriginalName();
        Storage::disk("local")->put("/cardimages/{$cardFilename}", file_get_contents($data["cardimage"]));

        $bannerFilename = time()."_".$data["bannerimage"]->getClientOriginalName();
        Storage::disk("local")->put("/cardimages/{$bannerFilename}", file_get_contents($data["bannerimage"]));

        $user = Article::create([
            "title"=>$data["title"],
            "author"=>$data["author"],
            "subject"=>$data["subject"],
            "tags"=>$data["tags"],
            "content"=>$data["content"],
            "cardPath"=>"/cardimages/{$cardFilename}",
            "bannerPath"=>"/cardimages/{$bannerFilename}",
        ]);

        return response([
            "message"=>"Article Uploaded Successfully!",
            "status"=>true,
        ]);
    }
}