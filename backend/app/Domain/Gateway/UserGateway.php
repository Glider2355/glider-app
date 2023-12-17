<?php

namespace App\Domain\Gateway;

interface UserGateway
{
    public function getByUserIds(array $userIds);
}
