<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'year'=>$this->year,
            'course'=>$this->course,
            'bio'=>$this->bio,
            'profilePic'=>$this->profilePic,
            'linkedIn'=>$this->linkedIn,
            "created_at"=>$this->created_at->format("Y-m-d H:i:s"),
        ];
    }
}
