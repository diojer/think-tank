<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
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
            "title"=>$this->title,
            "author"=>$this->author,
            "authorId"=>$this->authorId,
            "summary"=>$this->summary,
            "fileLocation"=>$this->fileLocation,
            "created_at"=>$this->created_at->format("Y-m-d H:i:s"),
        ];
    }
}
