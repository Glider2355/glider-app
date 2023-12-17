<?php

namespace App\Http\Requests\Camp;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCampRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|max:50',
            'location' => ['required', 'max:50', 'regex:/^(木曽川|大野|福井)$/'],
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ];
    }

    public function id(): int
    {
        return (int) $this->route('id');
    }
}
