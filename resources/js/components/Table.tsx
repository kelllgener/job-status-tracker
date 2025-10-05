import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Button from './Button';
import DropdownInput from './DropdownInput';
import Modal from './Modal';

interface Job {
    id: number;
    company_name: string;
    job_title: string;
    job_url: string;
    application_source: string;
    email: string;
    contact_number: string;
    location: string;
    job_type: string;
    remote_type: string;
    status: { name: string; id: number };
    created_at: string;
}

interface Status {
    id: number;
    name: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface TableProps {
    data: Job[];
    links?: PaginationLink[];
    status: Status[];
    setFlashMessage?: (msg: string) => void;
}

const Table = ({ data, links, status, setFlashMessage }: TableProps) => {
    const [jobToDelete, setJobToDelete] = useState<number | null>(null);
    const toHumanReadableDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };

    const updateStatus = (jobId: number, statusId: number) => {
        router.put(
            `/job-lists/${jobId}`,
            {
                status_id: statusId,
            },
            {
                onSuccess: () => setFlashMessage?.('Status Updated Successfully.'),
            },
        );
    };

    const deleteJob = (jobId: number) => {
        router.delete(`/job-lists/${jobId}`, {
            onSuccess: () => {
                setFlashMessage?.('Job Deleted Successfully.');
            },
        });
    };

    return (
        <div>
            <div className="w-full max-w-full overflow-x-auto">
                <table className="table w-full min-w-[1100px] table-auto border border-gray-200 text-xs">
                    <thead>
                        <tr className="[&_th]:border [&_th]:border-gray-300 [&_th]:px-2 [&_th]:py-1">
                            <th>Company Name</th>
                            <th>Job Title</th>
                            <th>Job URL</th>
                            <th>App Source</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Uploaded At</th>
                            <th>Job Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((job) => (
                            <tr key={job.id} className="[&_td]:border [&_td]:border-gray-300 [&_td]:px-2 [&_td]:py-1 [&_td]:whitespace-nowrap">
                                <td>{job.company_name}</td>
                                <td>{job.job_title}</td>
                                <td>
                                    <a
                                        href={job.job_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="line-clamp-1 w-20 text-blue-600 hover:underline"
                                    >
                                        {job.job_url}
                                    </a>
                                </td>
                                <td>{job.application_source}</td>
                                <td>{job.email}</td>
                                <td>{job.location}</td>
                                <td>{toHumanReadableDateTime(job.created_at)}</td>
                                <td>
                                    <DropdownInput
                                        options={status} // all statuses
                                        value={job.status.id} // current status as default
                                        onChange={(newStatusId) => updateStatus(job.id, newStatusId)}
                                    />
                                </td>

                                <td className="text-center">
                                    <Button
                                        name="trash"
                                        toolTip="Delete"
                                        className="text-red-500 transition-colors duration-300 hover:text-red-700"
                                        onClick={() => setJobToDelete(job.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {jobToDelete !== null && (
                <Modal isOpen={true} onClose={() => setJobToDelete(null)} title="Delete Job?">
                    <div className="flex flex-col gap-2 text-base">
                        <span className="text-left text-wrap">Are you sure you want to delete this job? This action cannot be undone.</span>
                        <div className="mt-4 flex justify-end gap-2 border-t border-gray-200 py-2">
                            <Button
                                label="Close"
                                className="bg-gray-400 px-4 py-2 text-black transition-colors duration-300 hover:bg-gray-500"
                                onClick={() => setJobToDelete(null)}
                            />

                            <Button
                                type="button"
                                label="Yes, Delete."
                                onClick={() => {
                                    if (jobToDelete !== null) deleteJob(jobToDelete);
                                    setJobToDelete(null);
                                }}
                                className="bg-red-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600"
                            />
                        </div>
                    </div>
                </Modal>
            )}

            {links && links.length > 0 && (
                <div className="mt-4 flex justify-center space-x-1">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`rounded border px-3 py-1 text-xs ${
                                link.active ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Table;
