<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCampRelation extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'camp_id', 'start_time_slot', 'start_date', 'end_time_slot', 'end_date'];

    protected static function factory()
    {
        return \Database\Factories\UserCampRelationFactory::new();
    }
}
