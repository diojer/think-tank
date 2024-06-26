<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasRole("admin");
    }


    /**
     * Prepare the data for validation.
     *
     * @return void
     *
     * @throws \JsonException
     */
    protected function prepareForValidation(): void
    {
        $this->merge(json_decode($this->payload, true, 512, JSON_THROW_ON_ERROR));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "type"=>"required|string|max:10",
            "title"=>"required|string|max:55",
            "author"=>"required|string|max:55",
            "authorId"=>"required|integer",
            "subject"=>"required|string|max:55",
            "tags"=>"nullable|string",
            "byline"=>"nullable|string",
            "content"=>"required|string",
            "cardImage"=>"nullable|image",
            "bannerImage"=>"nullable|image",
        ];
    }
}
