<?php

namespace App\Domain\Entities\User;

/**
 * ユーザー集約クラス
 */

class Users
{
    /**
     * @param array<User[]>
     */
    private array $users = [];

    public function __construct()
    { }

    public function addUser(User $user): void
    {
        $this->users[] = $user;
    }

    /**
     * @return array<User[]>
     */
    public function getUsers(): array
    {
        return $this->users;
    }

    /**
     * @return User
     */
    public function getUser(int $userId): User
    {
        foreach ($this->users as $user) {
            if ($user->getId() === $userId) {
                return $user;
            }
        }
        throw new \Exception("User not found for ID: {$userId}");
    }
}
