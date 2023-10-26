<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MailingList;
use Illuminate\Http\Request;

class MailinglistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $list = MailingList::query()->orderBy("id", "desc")->get();
        for ($i = 0; $i<$list->count();$i++) {
            $nlist[$i]["id"]=$list[$i]["id"];
            $nlist[$i]["email"]=$list[$i]["email"];
            $nlist[$i]["created_at"] = $list[$i]["created_at"]->format("Y-m-d H:i:s");
        }
        return response ($nlist, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Mailinglist::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        if ($request->user()->hasRole("admin")) {
            Mailinglist::findOrFail($id)->delete();
            return response("", 200);
        } else {
            return response("", 403);
        }
    }
}
