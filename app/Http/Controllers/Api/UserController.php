<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\DeleteUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy("id", "desc")->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //We won't need this.
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //For profile pages?
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //For making users admins
        $data = $request.validated();
        $role = $data["role"];
        $user.assignRole($role);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteUserRequest $request, User $user)
    {
        //For deleting users
        $user->delete();
        return response("", 201);
    }
}
