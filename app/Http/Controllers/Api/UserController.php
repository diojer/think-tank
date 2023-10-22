<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Http\Requests\ShowAllUsersRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\DeleteUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->hasRole("admin")) {
            return UserResource::collection(User::query()->orderBy("id", "desc")->get());
        } else {
            return response("", 403);
        }

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
        $data = $request->validated();
        $role = $request["role"];
        if ($user->hasRole($role)) {
            $user->removeRole($role);
            return response("Role removed", 202);
        } else {
            $user->assignRole($role);
            return response("Role assigned", 202);
        }
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
