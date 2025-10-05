<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobList extends Model
{
    /** @use HasFactory<\Database\Factories\JobListFactory> */
    use HasFactory;

    protected $fillable = [
        'company_name',
        'job_title',
        'job_url',
        'application_source',
        'email',
        'contact_number',
        'location',
        'job_type',
        'remote_type',
        'status_id',
    ];

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
