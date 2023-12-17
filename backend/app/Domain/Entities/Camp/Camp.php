<?php

namespace App\Domain\Entities\Camp;

use Carbon\Carbon;

class Camp
{
    public function __construct(
        readonly private int $id,
        readonly private string $name,
        readonly private string $location,
        readonly private Carbon $startDate,
        readonly private Carbon $endDate,
    )
    { }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getLocation(): string
    {
        return $this->location;
    }

    public function getStartDate(): Carbon
    {
        return $this->startDate;
    }

    public function getEndDate(): Carbon
    {
        return $this->endDate;
    }

    /**
     * @return Carbon[]
     */
    public function dateRangeArray(): array
    {
        $dateRange = [];
        $startDate = $this->startDate->copy();
        $endDate = $this->endDate->copy();

        while ($startDate->lte($endDate)) {
            $dateRange[] = $startDate->copy();
            $startDate->addDay();
        }

        return $dateRange;
    }
}
