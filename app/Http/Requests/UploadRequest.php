<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title"=>"required|string|max:55",
            "author"=>"required|string|max:55",
            "subject"=>"required|string|max:55",
            "tags"=>"nullable|string",
            "content"=>"required|string",
            "cardImage"=>"nullable|image",
            "bannerImage"=>"nullable|image",
        ];
    }
}