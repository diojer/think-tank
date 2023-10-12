<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function signup(SignupRequest $request) {

        $data = $request->validated();

        $user = User::create([
            "name"=>$data["username"],
            "email"=>$data["email"],
            "password"=>bcrypt($data["password"]),
        ]);
        $token = $user->createToken("main")->plainTextToken;
        return response([
            "user"=>$user,
            "token"=>$token,
            "message"=>"Registered Successfully!",
            "status"=>true,
        ]);
    }
    public function login(LoginRequest $request) {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                "message"=>"Provided email address or password incorrect"
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken("main")->plainTextToken;
        $admin = false;
        //function to decrypt token and set $admin equal to true if user is admin

        return response([
            "user"=>$user,
            "token"=>$token,
            "admin"=>$admin
        ]);
    }

    public function logout(Request $request) {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response("", 204);
    }
}
