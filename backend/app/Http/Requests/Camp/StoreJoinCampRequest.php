<?php

namespace App\Http\Requests\Camp;

use App\Infrastructure\Models\Camp;
use Illuminate\Foundation\Http\FormRequest;

class StoreJoinCampRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $camp = Camp::findOrFail($this->input('camp_id'));

        return [
            'camp_id' => 'required|integer',
            'attendances' => ['required', function ($attribute, $value, $fail) {
                for ($i = 0; $i < count($value); $i++) {
                    for ($j = $i + 1; $j < count($value); $j++) {
                        $overlap = $this->checkOverlap(
                            $value[$i]['start_date'], $value[$i]['end_date'],
                            $value[$j]['start_date'], $value[$j]['end_date']
                        );
                        if ($overlap) {
                            $fail('The schedules overlap.');
                            return;
                        }
                    }
                }
            }],
            'attendances.*.start_time_slot' => ['required', 'max:50', 'regex:/^(morning|afternoon|night)$/'],
            'attendances.*.start_date' => [
                'required',
                'date',
                'before_or_equal:' . $camp->end_date,
                'after_or_equal:' . $camp->start_date
            ],
            'attendances.*.end_time_slot' => ['required', 'max:50', 'regex:/^(morning|afternoon|night)$/'],
            'attendances.*.end_date' => [
                'required',
                'date',
                'after_or_equal:' . 'attendances.*.start_date',
                'before_or_equal:' . $camp->end_date,
            ],
        ];
    }

    protected function checkOverlap($start1, $end1, $start2, $end2)
    {
        return ($start1 <= $end2 && $start2 <= $end1);
    }

    public function messages()
    {
        return [
            'camp_id.required' => 'キャンプIDは必須項目です。',
            'camp_id.integer' => 'キャンプIDは整数である必要があります。',
            'attendances.*.start_time_slot.required' => '参加時間帯は必須項目です',
            'attendances.*.end_time_slot.required' => '帰る時間帯は必須項目です',
            // ...他のエラーメッセージ
        ];
    }
}
