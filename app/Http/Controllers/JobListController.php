<?php

namespace App\Http\Controllers;

use App\Models\JobList;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobListController extends Controller
{
    public function index()
    {
        $jobList = JobList::with('status')->latest()->paginate(5);
        $statuses = Status::select('id', 'name')->get();

        return Inertia::render('Index', [
            'jobList' => $jobList,
            'statuses' => $statuses,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'job_url' => 'required|string|max:255',
            'application_source' => 'required|string|max:255',
            'email' => 'email|nullable',
            'location' => 'required|string|max:255',
            'status_id' => 'required',
        ]);

        JobList::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, JobList $jobList)
    {
        $request->validate([
            'status_id' => 'required|exists:statuses,id',
        ]);

        $jobList->update([
            'status_id' => $request->status_id,
        ]);

        return redirect()->back();
    }

    public function destroy(JobList $jobList)
    {
        $jobList->delete();

        return redirect()->back();

    }
}
