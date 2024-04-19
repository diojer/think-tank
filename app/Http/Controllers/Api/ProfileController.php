<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Resources\ProfileResource;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\Log;

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
            "profileId"=>$data["profileId"],
            "name"=>$data["name"],
            "year"=>$data["year"],
            "course"=>$data["course"],
            "role"=>$data["role"],
            "bio"=>$data["bio"],
            "profileImage"=>$data["profileImage"],
            "linkedIn"=>$data["linkedIn"],
            "policyArea"=>$data["policyArea"]
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
        Log::info($profile);
        return new ProfileResource($profile);
    }
}