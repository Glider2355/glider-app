<?php

namespace App\Domain\Gateway;

interface CampAttendancesGateway
{
    public function getByCampId(int $camp_id);
}
