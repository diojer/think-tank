<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ArticleController;

use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\ProfileController;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MailinglistController;

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


//For logged in users - concerning user requests
Route::middleware("auth:sanctum")->group(function(){
    Route::get("/me", function(Request $request) {
        $user = $request->user();
        $admin = $user->hasRole("admin");
        return response(["user"=>$user, "admin"=>$admin]);
    });
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::apiResource("/users", UserController::class);
});

//User routes
Route::post("/signup", [AuthController::class, "signup"]);
Route::post("/login", [AuthController::class, "login"]);

//Author routes
Route::middleware("auth:sanctum")->group(function(){
    Route::apiResource("/authors", AuthorController::class);
});

// For logged in users - concerning profile requests
Route::middleware("auth:sanctum")->group(function(){
    Route::post("/profiles", [ProfileController::class, "store"]);
    Route::delete("/profiles/{profile}", [ProfileController::class, "destroy"]);
});

//Article Routes
Route::get("/articles", [ArticleController::class, "index"]);
Route::get("/article", [ArticleController::class, "show"]);
// This might break it
//Route::apiResource("/articles", [ArticleController::class, "indexAuthor"]);

//For logged in users - concerning article requests
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

//For logged in users - concerning mailing list requests
Route::middleware("auth:sanctum")->group(function(){
    Route::apiResource("/mailinglist", MailinglistController::class);
});
