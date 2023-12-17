<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\User\Users;
use App\Domain\Gateway\UserGateway;
use App\Infrastructure\Translator\UsersTranslator;
use Illuminate\Support\Facades\DB;

class UserRepository implements UserGateway
{
    /**
     * 複数のuserIdを元に、複数ユーザーの情報を取得する
     * @param array $userIds
     * @return Users
     */
    public function getByUserIds(array $userIds): Users
    {
        $translator = new UsersTranslator();

        $usersRaw = DB::table('users')
            ->leftJoin('user_university_relations', 'users.id', '=', 'user_university_relations.user_id')
            ->leftJoin('universities', 'user_university_relations.university_id', '=', 'universities.id')
            ->leftJoin('user_role_relations', 'users.id', '=', 'user_role_relations.user_id')
            ->leftJoin('roles', 'user_role_relations.role_id', '=', 'roles.id')
            ->select(
                'users.id',
                'users.first_name',
                'users.last_name',
                'users.grade',
                'users.license_deadline',
                'users.birthday',
                'universities.id as university_id',
                'universities.name as university_name',
                'roles.id as role_id',
                'roles.name as role_name',
                'user_role_relations.certification as role_certification'
            )
            ->whereIn('users.id', $userIds)
            ->get();

        return $translator->translate($usersRaw);
    }
}
