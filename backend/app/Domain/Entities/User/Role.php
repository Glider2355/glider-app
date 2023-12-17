<?php

namespace App\Domain\Entities\User;

/**
 * 係クラス
 */

class Role
{
    public function __construct(
        readonly private int $id,
        readonly private string $name,
        readonly private bool $certification,
    )
    { }

    public function getName(): string
    {
        return $this->name;
    }

    public function getCertification(): bool
    {
        return $this->certification;
    }
}
