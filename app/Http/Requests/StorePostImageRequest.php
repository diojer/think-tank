<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Namshi\JOSE\SimpleJWS;

class StorePostImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $authorization_token = $this->header("authorization");
        $jwt_public = env("CLERK_PUBLIC_JWT", null);
        $jws = SimpleJWS::load($authorization_token);
        return $jws->isValid($jwt_public, "RS256");
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "image"=>"required|image"
        ];
    }
}
