<?php

namespace App\Infrastructure\Translator;

use App\Domain\Entities\User\Role;
use App\Domain\Entities\User\Roles;
use App\Domain\Entities\User\university;
use App\Domain\Entities\User\User;
use App\Domain\Entities\User\Users;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class UsersTranslator
{

    /**
     * @return Users
     */
    public function translate(Collection $usersCollection): Users
    {
        $users = new Users();

        // ユーザーIDでグループ化
        $groupedUsers = $usersCollection->groupBy('id');

        foreach ($groupedUsers as $userId => $userRecords) {
            $firstRecord = $userRecords->first();

            // 大学情報が存在する場合のみ、University オブジェクトを生成
            $university = null;
            if ($firstRecord->university_id && $firstRecord->university_name) {
                $university = new University($firstRecord->university_id, $firstRecord->university_name);
            }
            // ロールの集約
            $roles = new Roles();
            foreach ($userRecords as $record) {
                if ($record->role_id) {
                    $role = new Role($record->role_id, $record->role_name, $record->role_certification);
                    $roles->addRole($role);
                }
            }

            // User オブジェクトの作成
            $user = new User(
                $userId,
                $firstRecord->first_name,
                $firstRecord->last_name,
                $firstRecord->grade,
                new Carbon($firstRecord->birthday),
                new Carbon($firstRecord->license_deadline),
                $university,
                $roles
            );

            $users->addUser($user);
        }

        return $users;
    }
}
