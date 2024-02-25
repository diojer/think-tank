<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Author;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\DeleteAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Http\Resources\AuthorResource;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->hasRole("admin")) {
            return AuthorResource::collection(Author::query()->orderBy("id", "desc")->get());
        } else {
            return response("", 403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuthorRequest $request)
    {
        $data = $request->validated();

        $user = Author::create([
            "profileId"=>$data["profileId"],
            "name"=>$data["name"],
            "role"=>$data["role"],
        ]);

        return response([
            "message"=>"Author Created Successfully!",
            "status"=>true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthorRequest $request, Author $author)
    {
        //For making users admins
        $data = $request->validated();

        if ($request["profileId"] != null) {
            if ($request["profileId"] == -1) {
                $author->update(['profileId'=>NULL]);
            }
            else {
                $author->update(['profileId'=>$request["profileId"]]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteAuthorRequest $request, Author $author)
    {
        //For deleting authors
        $author->delete();
        return response("", 201);
    }
}
