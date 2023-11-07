<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->id,
            "profileId"=>$this->profileId,
            "name"=>$this->name,
            "role"=>$this->role,
            "created_at"=>$this->created_at->format("Y-m-d H:i:s"),
        ];
    }
}
