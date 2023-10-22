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
        for ($i = 0; $i<2;$i++) {
            $list[$i]["created_at"] = $list[$i]["created_at"]->format("Y-m-d H:i:s");
        }
        return response ($list, 200);
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
        //
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
    public function destroy(string $id)
    {
        //
    }
}
