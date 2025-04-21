<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\ProductRepository;
use App\Repositories\IProductRepository;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IProductRepository::class, ProductRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {

        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));
    
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}
