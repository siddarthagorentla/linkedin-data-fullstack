import React, { useEffect, useState } from 'react';
import { getContacts } from '../services/geminiService';
import type { ContactInfo } from '../types';
import { UserIcon, MailIcon, PhoneIcon, GlobeAltIcon, LinkedInIcon } from './icons';

const Dashboard: React.FC = () => {
    const [contacts, setContacts] = useState<ContactInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const data = await getContacts();
                setContacts(data);
            } catch (err) {
                setError('Failed to load contacts');
            } finally {
                setIsLoading(false);
            }
        };

        fetchContacts();
    }, []);

    if (isLoading) return <div className="text-center text-white mt-8">Loading saved contacts...</div>;
    if (error) return <div className="text-center text-red-400 mt-8">{error}</div>;

    return (
        <div className="w-full max-w-6xl mx-auto mt-12 px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Saved Leads Dashboard</h2>

            {contacts.length === 0 ? (
                <div className="text-center text-gray-400 bg-gray-800/50 p-8 rounded-lg border border-gray-700">
                    <p className="text-xl">No saved contacts yet.</p>
                    <p className="mt-2 text-sm">Use the extractor to find and save new leads.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contacts.map((contact, index) => (
                        <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center truncate">
                                <UserIcon className="w-5 h-5 mr-2 text-indigo-400 flex-shrink-0" />
                                <span className="truncate">{contact.name || 'Unknown Contact'}</span>
                            </h3>
                            <div className="space-y-3 text-sm">
                                {contact.email && (
                                    <div className="flex items-center text-gray-300">
                                        <MailIcon className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                                        <span className="truncate">{contact.email}</span>
                                    </div>
                                )}
                                {contact.phone && (
                                    <div className="flex items-center text-gray-300">
                                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                                        <span className="truncate">{contact.phone}</span>
                                    </div>
                                )}
                                {contact.website && (
                                    <div className="flex items-center text-gray-300">
                                        <GlobeAltIcon className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                                        <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline truncate">
                                            Website
                                        </a>
                                    </div>
                                )}
                                <div className="flex items-center text-gray-300 pt-2 border-t border-gray-700 mt-2">
                                    <LinkedInIcon className="w-4 h-4 mr-2 text-[#0077b5] flex-shrink-0" />
                                    <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline truncate">
                                        View Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
