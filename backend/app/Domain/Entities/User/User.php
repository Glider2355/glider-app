<?php

namespace App\Domain\Entities\User;

use Carbon\Carbon;

/**
 * ユーザークラス
 */

class User
{
    private int $age;

    public function __construct(
        readonly private int $id,
        readonly private string $firstName,
        readonly private string $lastName,
        readonly private ?string $grade,
        readonly private ?Carbon $birthday,
        readonly private ?Carbon $licenceDeadline,
        readonly private ?University $university,
        readonly private ?Roles $roles,
    )
    { }

    public function getId(): int
    {
        return $this->id;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function getName(): string
    {
        return $this->lastName . ' ' . $this->firstName;
    }

    public function getGrade(): string
    {
        return $this->grade;
    }


    public function getBirthday(): Carbon
    {
        return $this->birthday;
    }

    // 受け取った日付の年齢をsetする
    public function calculateAge(Carbon $date): void
    {
        $this->age = $this->birthday->diffInYears($date);
    }

    public function getAge(): int
    {
        return $this->age;
    }

    public function getLicenceDeadline(): Carbon
    {
        return $this->licenceDeadline;
    }

    public function getUniversity(): ?University
    {
        return $this->university;
    }

    public function getRoles(): Roles
    {
        return $this->roles;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->firstName,
            'last_name' => $this->lastName,
            'university' => $this->university->getName(),
            'grade' => $this->grade,
            'license_deadline' => $this->licenceDeadline,
            'age' => $this->age,
            'roles' => $this->roles->toArray(),
        ];
    }
}
