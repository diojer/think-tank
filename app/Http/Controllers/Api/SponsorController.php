<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sponsor;
use App\Http\Requests\StoreSponsorRequest;
use App\Http\Requests\UpdateSponsorRequest;
use App\Http\Requests\DeleteSponsorRequest;
use App\Http\Resources\SponsorResource;
use Illuminate\Support\Facades\Storage;

class SponsorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SponsorResource::collection(Sponsor::query()->orderBy("created_at", "desc")->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSponsorRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile("logo")) {
            $file = $request->file("logo");

            $filename = time()."_".$file->getClientOriginalName();
            Storage::disk("public")->put("/sponsors/logos/{$filename}", file_get_contents($data["file"]));
        }


        $user = Sponsor::create([
            "name"=>$data["name"],
            "logo"=>"/images/articles/{$filename}",
            "bio"=>$data["bio"],
        ]);

        return response([
            "message"=>"Sponsor Added Successfully!",
            "status"=>true,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sponsor $report)
    {
        return new SponsorResource($report);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSponsorRequest $request, Sponsor $report)
    {
        $data = $request->validated();
        $report->update($data);
        return response(["", 201]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteSponsorRequest $request, Sponsor $report)
    {
        $report->delete();
        return response("", 201);
    }
}
