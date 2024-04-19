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
            "profileId"=>$this->profileId,
            'name'=>$this->name,
            'year'=>$this->year,
            'course'=>$this->course,
            'role'=>$this->role,
            'bio'=>$this->bio,
            'profileImage'=>$this->profileImage,
            'linkedIn'=>$this->linkedIn,
            'policyArea'=>$this->policyArea,
        ];
    }
}
