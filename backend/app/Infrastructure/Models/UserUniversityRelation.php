<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserUniversityRelation extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'university_id'];
    protected $hidden = ['created_at', 'updated_at'];

    public function university()
    {
        return $this->belongsTo(University::class);
    }

    protected static function factory()
    {
        return \Database\Factories\UserUniversityRelationFactory::new();
    }
}
