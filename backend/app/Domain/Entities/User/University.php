<?php

namespace App\Domain\Entities\User;

/**
 * 大学クラス
 */

class university
{
    public function __construct(
        readonly private int $id,
        readonly private string $name,
    )
    { }

    public function getName(): string
    {
        return $this->name;
    }
}
