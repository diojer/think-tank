<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProfileRequest extends FormRequest
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
            "userId"=>"required|integer",
            "name"=>"required|string|max:55",
            "year"=>"required|integer|max:55",
            "course"=>"required|string|max:55",
            "role"=>"required|string",
            "bio"=>"required|string",
            "profileImage"=>"nullable|image",
        ];
    }
}
