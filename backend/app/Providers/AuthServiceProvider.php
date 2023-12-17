<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Laravel\Sanctum\Sanctum;
use Laravel\Sanctum\PersonalAccessToken;
use App\Http\Controllers\AuthController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);

        Route::macro('sanctum', function ($prefix) {
            Route::prefix($prefix)->group(function () {
                Route::middleware(EnsureFrontendRequestsAreStateful::class)
                    ->post('/login', [AuthController::class, 'login'])
                    ->name('login');
                Route::middleware('auth:sanctum')
                    ->get('/user', function (Request $request) {
                        return $request->user();
                    })
                    ->name('user');
            });
        });
    }
}
