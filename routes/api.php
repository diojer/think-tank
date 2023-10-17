<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ArticleController;
use App\Models\MailingList;
use App\Http\Requests\StoreEmailRequest;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware("auth:sanctum")->group(function(){
    Route::get("user", function(Request $request) {
        $user = $request->user();
        $admin = $user->hasRole("admin");
        return response(["user"=>$user, "admin"=>$admin]);
    });
});

//User routes
Route::post("/signup", [AuthController::class, "signup"]);
Route::post("/login", [AuthController::class, "login"]);
Route::post("/logout", [AuthController::class, "logout"]);

//Article Routes
Route::get("/articles", [ArticleController::class, "index"]);
Route::get("/article", [ArticleController::class, "show"]);
Route::apiResource("/articles", ArticleController::class)->only(["index", "show"]);

Route::middleware("auth:sanctum")->group(function(){
    Route::post("/article", [ArticleController::class, "store"]);
    Route::apiResource("/articles", ArticleController::class)->only(["create","destroy","update"]);
});

//Mailing list routes
Route::post("mailinglist", function(StoreEmailRequest $request){
    $data = $request->validated();
    MailingList::create([
        "email"=>$data["email"],
    ]);
    return response(["", 201]);
});
