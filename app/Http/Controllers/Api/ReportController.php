<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Http\Requests\DeleteReportRequest;
use App\Http\Resources\ReportResource;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ReportResource::collection(Report::query()->orderBy("created_at", "desc")->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportRequest $request)
    {
        $data = $request->validated();

        $file = $request->file("fileLocation");

        $filename = time()."_".$file->getClientOriginalName();
        Storage::disk("public")->put("/reports/{$filename}", file_get_contents($data["file"]));

        $user = Report::create([
            "title"=>$data["title"],
            "author"=>$data["author"],
            "authorId"=>$data["authorId"],
            "summary"=>$data["subject"],
            "content"=>$data["content"],
            "fileLocation"=>"/images/articles/{$filename}",
        ]);

        return response([
            "message"=>"Report Uploaded Successfully!",
            "status"=>true,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        return new ReportResource($report);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportRequest $request, Report $report)
    {
        $data = $request->validated();
        $report->update($data);
        return response(["", 201]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteReportRequest $request, Report $report)
    {
        $report->delete();
        return response("", 201);
    }
}
