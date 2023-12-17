<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\Camp\Camp;
use App\Domain\Gateway\CampGateway;
use App\Infrastructure\Models\Camp as ModelsCamp;
use Carbon\Carbon;

class CampRepository implements CampGateway
{
    public function getByCampId(int $campId): Camp
    {
        $campModel = ModelsCamp::find($campId);

        return new Camp(
            $campModel->id,
            $campModel->name,
            $campModel->location,
            new Carbon($campModel->start_date),
            new Carbon($campModel->end_date),
        );
    }
}
