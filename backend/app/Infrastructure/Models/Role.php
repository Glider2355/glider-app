<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at'];

    public function userRoleRelations()
    {
        return $this->hasMany(UserRoleRelation::class);
    }

    protected static function factory()
    {
        return \Database\Factories\RoleFactory::new();
    }
}
