<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\SponsorController;

use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\ProfileController;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MailinglistController;

use App\Models\MailingList;
use App\Http\Requests\StoreEmailRequest;
use App\Models\Post;
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
Route::get("/articles", [PostController::class, "indexArticle"]);

//For old article routes
Route::get("/article", [PostController::class, "show"]);
Route::middleware("auth:sanctum")->group(function(){
    Route::post("/article", [PostController::class, "store"]);
});

//Media and Press Routes
Route::get("/media_appearances", [ProfileController::class, "indexMedia"]);
Route::get("/press_releases", [ProfileController::class, "indexPress"]);

//Post Routes
Route::get("/posts", [PostController::class, "index"]);
Route::get("/post", [PostController::class, "show"]);

//For logged in users - concerning post requests
Route::middleware("auth:sanctum")->group(function(){
    Route::post("/post", [PostController::class, "store"]);
    Route::apiResource("/posts", PostController::class)->only(["create","destroy","update"]);
});

//Mailing list routes
Route::post("/mailinglist", function(StoreEmailRequest $request){
    $data = $request->validated();
    MailingList::create([
        "email"=>$data["email"],
    ]);
    return response(["", 201]);
});

//For logged in users - concerning mailing list requests
Route::middleware("auth:sanctum")->group(function(){
    Route::apiResource("/mailinglist", MailinglistController::class)->only(["destroy", "index", "show"]);
});

//Reports routes
Route::get("/reports", [ReportController::class, "index"]);
Route::get("/report", [ReportController::class, "show"]);

//For logged in users - concerning reports
Route::middleware("auth:sanctum")->group(function(){
    Route::post("/report", [ReportController::class, "store"]);
    Route::apiResource("/reports", ReportController::class)->only(["create","destroy","update"]);
});

//Sponsors routes
Route::get("/sponsors", [SponsorController::class, "index"]);
Route::get("/sponsor", [SponsorController::class, "show"]);

//For logged in users - concerning sponsors
Route::middleware("auth:sanctum")->group(function(){
    Route::post("/sponor", [SponsorController::class, "store"]);
    Route::apiResource("/sponsors", SponsorController::class)->only(["create","destroy","update"]);
});
