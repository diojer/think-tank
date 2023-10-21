<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Resources\ProfileResource;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProfileRequest $request)
    {
        $data = $request->validated();

        $profileImage = $request->file("profileImage");

        $profileFilename = time()."_".$profileImage->getClientOriginalName();
        Storage::disk("public")->put("/images/profiles/{$profileFilename}", file_get_contents($data["profileImage"]));
        $user = Profile::create([
            "userId"=>$data["userId"],
            "name"=>$data["name"],
            "year"=>$data["year"],
            "course"=>$data["course"],
            "role"=>$data["role"],
            "bio"=>$data["bio"],
            "profileImage"=>$data["profileImage"],
        ]);

        return response([
            "message"=>"Profile Created Successfully!",
            "status"=>true,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Profile $profile)
    {
        return new ProfileResource($profile);
    }
}