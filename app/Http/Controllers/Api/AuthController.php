<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

//Spatie Perms
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{

    public function signup(SignupRequest $request) {

        $data = $request->validated();

        $user = User::create([
            "name"=>$data["name"],
            "email"=>$data["email"],
            "password"=>bcrypt($data["password"]),
        ]);
        $user->assignRole("admin");
        $token = $user->createToken("main")->plainTextToken;
        return response([
            "message"=>"Registered Successfully!"
        ]);
    }
    public function login(LoginRequest $request) {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                "message"=>"Provided email address or password incorrect"
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken("main")->plainTextToken;
        $admin = $user->hasRole("admin");
        //function to decrypt token and set $admin equal to true if user is admin

        return response([
            "user"=>$user,
            "token"=>$token,
            "admin"=>$admin,
        ]);
    }

    public function logout(Request $request) {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response("", 204);
    }
}
