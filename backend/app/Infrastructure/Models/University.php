<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at'];

    public function userUniversityRelations()
    {
        return $this->hasMany(UserUniversityRelation::class);
    }

    protected static function factory()
    {
        return \Database\Factories\UniversityFactory::new();
    }
}
