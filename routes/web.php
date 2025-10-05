<?php

use App\Http\Controllers\JobListController;
use Illuminate\Support\Facades\Route;

Route::get('/', [JobListController::class, 'index']);

Route::post('/job-lists', [JobListController::class, 'store']);

Route::put('/job-lists/{jobList}', [JobListController::class, 'update']);

Route::delete('/job-lists/{jobList}', [JobListController::class, 'destroy']);