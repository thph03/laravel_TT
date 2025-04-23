<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Auth;

Route::view('/{any}','layouts.layoutAdmin')->where('any', '.*');
