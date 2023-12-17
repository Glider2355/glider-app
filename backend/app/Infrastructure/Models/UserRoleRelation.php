<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRoleRelation extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'user_id', 'role_id', 'certification'];
    protected $hidden = ['created_at', 'updated_at'];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    protected static function factory()
    {
        return \Database\Factories\UserRoleRelationFactory::new();
    }
}
