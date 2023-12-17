<?php

namespace App\Domain\Entities\User;

/**
 * １ユーザの係クラス
 */

class Roles
{
    /**
     * @param Role[] $roles
     */
    private array $roles = [];

    public function addRole(Role $role): void
    {
        $this->roles[] = $role;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function toArray(): array
    {
        $roles = [];
        foreach ($this->roles as $role) {
            $roles[] = $this->convertRole($role);
        }
        return $roles;
    }

    public function toString(): string
    {
        $roles = [];
        foreach ($this->roles as $role) {
            $roles[] = $this->convertRole($role);
        }
        return implode(',', $roles);
    }

    /**
     * 養成の場合はカッコを付ける
     */
    private function convertRole(Role $role): string
    {
        if (!$role->getCertification()) {
            return '(' . $role->getName() . ')';
        }
        return $role->getName();
    }
}
