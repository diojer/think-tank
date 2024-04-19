<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\DeleteProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
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

        if ($data['profilePic'] != null) {
            $profileImage = $request->file("profilePic");

            $profileFilename = time()."_".$profileImage->getClientOriginalName();
            Storage::disk("public")->put("/images/profiles/{$profileFilename}", file_get_contents($data["profilePic"]));
        }

        $profile = Profile::create([
            "year"=>$data["year"],
            "course"=>$data["course"],
            "bio"=>$data["bio"],
            "profilePic"=>$data["profilePic"],
            "linkedIn"=>$data["linkedIn"],
        ]);

        return response()->json([
            "data"=>$profile,
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

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request, Profile $profile)
    {
        $data = $request->validated();
        $profile->update($data);
        return response(["", 201]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteProfileRequest $request, Profile $profile)
    {
        // For deleting profiles
        $profile->delete();
        return response("", 201);
    }
}