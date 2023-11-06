<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreArticleImageRequest;
use Illuminate\Support\Facades\Storage;



class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function storeArticleImage(StoreArticleImageRequest $request) {
        $data = $request->validated();

        $image = $request->file("image");
        $imageName = time()."_".$image->getClientOriginalName();
        $imagePath = "/images/articles/{$imageName}";
        Storage::disk("public")->put($imagePath, file_get_contents($data["image"]));
        return response([
            "location"=>$imagePath,
            "message"=>"Image Uploaded Successfully",
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
