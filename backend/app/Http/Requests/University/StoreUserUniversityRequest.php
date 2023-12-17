<?php

namespace App\Http\Requests\University;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserUniversityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'university_id' => 'required|integer',
        ];
    }
}
