<?php

namespace App\Domain\Gateway;

use App\Domain\Entities\Camp\Camp;

interface CampGateway
{
    public function getByCampId(int $campId): Camp;
}
