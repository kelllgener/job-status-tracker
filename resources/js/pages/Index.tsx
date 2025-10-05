import Button from '@/components/Button';
import Input from '@/components/Form/Input';
import Modal from '@/components/Modal';
import Table from '@/components/Table';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Status {
    id: number;
    name: string;
}

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

interface IndexProps {
    jobList: {
        data: Job[];
        links: any[];
    };
    statuses: Status[];
}

const Index = ({ jobList, statuses }: IndexProps) => {
    const [toastVisible, setToastVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [flashMessage, setFlashMessage] = useState<string | null>(null);

    const form = useForm({
        company_name: '',
        job_title: '',
        job_url: '',
        application_source: '',
        email: '',
        location: '',
        status_id: 1,
    });

    const addJob = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post('job-lists', {
            onSuccess: () => {
                form.reset();
                setIsModalOpen(false);
                setFlashMessage('Job added Successfully.');
            },
        });
    };

    useEffect(() => {
        if (!flashMessage) return;

        // Show toast
        setToastVisible(true);

        // Hide after 3 seconds
        const timer = setTimeout(() => {
            setToastVisible(false); // start fade-out
        }, 3000);

        return () => clearTimeout(timer);
    }, [flashMessage]);

    return (
        <div className="container mx-auto flex flex-col space-y-4 rounded p-4 shadow-2xl">
            <div
                className={`transition-slide fixed top-4 right-4 z-50 rounded border border-green-700 bg-white px-4 py-2 text-green-700 shadow-lg ${toastVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
            >
                {flashMessage}
            </div>

            <div>
                <h1 className="text-center text-2xl font-semibold">Job Status Tracker</h1>
                <Button
                    name="plus"
                    label="Add Job"
                    className="bg-teal-800 px-4 py-2 text-white transition-colors duration-300 hover:bg-teal-900"
                    onClick={() => setIsModalOpen(true)}
                />

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Job">
                    <form onSubmit={addJob}>
                        <div className="flex flex-col gap-2">
                            <Input
                                id="company_name"
                                label="Company Name"
                                type="text"
                                value={form.data.company_name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('company_name', e.target.value)}
                                placeholder="Enter company name"
                                error={form.errors.company_name}
                            />

                            <Input
                                id="job_title"
                                label="Job Title"
                                type="text"
                                value={form.data.job_title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('job_title', e.target.value)}
                                placeholder="Enter job title"
                                error={form.errors.job_title}
                            />

                            <Input
                                id="job_url"
                                label="Job URL"
                                type="text"
                                value={form.data.job_url}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('job_url', e.target.value)}
                                placeholder="Enter job url"
                                error={form.errors.job_url}
                            />

                            <Input
                                id="application_source"
                                label="App Source"
                                type="text"
                                value={form.data.application_source}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('application_source', e.target.value)}
                                placeholder="Enter app source"
                                error={form.errors.application_source}
                            />

                            <Input
                                id="email"
                                label="Email"
                                type="email"
                                value={form.data.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('email', e.target.value)}
                                placeholder="Enter email"
                                error={form.errors.email}
                            />

                            <Input
                                id="location"
                                label="Location"
                                type="text"
                                value={form.data.location}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('location', e.target.value)}
                                placeholder="Enter location"
                                error={form.errors.location}
                            />

                            <div className="mt-4 flex justify-end gap-2 border-t border-gray-200 py-2">
                                <Button
                                    label="Close"
                                    className="bg-gray-400 px-4 py-2 text-black transition-colors duration-300 hover:bg-gray-500"
                                    onClick={() => setIsModalOpen(false)}
                                />

                                <Button
                                    type="submit"
                                    label="Add"
                                    className="bg-teal-800 px-4 py-2 text-white transition-colors duration-300 hover:bg-teal-900"
                                />
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>

            <Table data={jobList.data} links={jobList.links} status={statuses} setFlashMessage={setFlashMessage} />
        </div>
    );
};

export default Index;
