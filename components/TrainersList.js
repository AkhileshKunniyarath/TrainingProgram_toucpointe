'use client';

import { useState, useEffect } from 'react';
import { LogOut, User, Phone, GraduationCap, Calendar, Languages, Share2, Search, Download } from 'lucide-react';

export default function TrainersList({ onLogout }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/trainers/registrations');
      const data = await response.json();
      if (data.success) {
        setRegistrations(data.data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = registrations.filter(r => 
    r.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.whatsappNumber?.includes(searchTerm)
  );

  const exportCSV = () => {
    if (registrations.length === 0) return;
    
    const headers = ["Date", "Student Name", "Grade", "School", "Language", "Guardian", "WhatsApp", "Batch", "Referral"];
    const rows = registrations.map(r => [
      new Date(r.createdAt).toLocaleDateString(),
      r.fullName,
      r.gradeLevel,
      r.schoolName,
      r.preferredLanguage,
      r.guardianName,
      r.whatsappNumber,
      r.preferredBatch,
      r.referral
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Registrations</h1>
            <p className="text-slate-500">Manage workshop enrollments</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={exportCSV}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <Download size={18} suppressHydrationWarning /> Export CSV
            </button>
            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium flex items-center gap-2 hover:bg-red-100 transition-colors"
            >
              <LogOut size={18} suppressHydrationWarning /> Logout
            </button>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-bottom border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} suppressHydrationWarning />
              <input 
                type="text" 
                placeholder="Search by name, school, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-semibold text-slate-700">Student Info</th>
                  <th className="p-4 font-semibold text-slate-700">Parent/Contact</th>
                  <th className="p-4 font-semibold text-slate-700">Workshop Details</th>
                  <th className="p-4 font-semibold text-slate-700 text-right">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-slate-500">Loading registrations...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-slate-500">No registrations found</td>
                  </tr>
                ) : (
                  filtered.map((reg) => (
                    <tr key={reg._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{reg.fullName}</div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                          <GraduationCap size={14} suppressHydrationWarning /> {reg.gradeLevel} • {reg.schoolName}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-700">{reg.guardianName}</div>
                        <div className="flex items-center gap-2 text-sm text-indigo-600 mt-1 font-semibold">
                          <Phone size={14} suppressHydrationWarning /> {reg.whatsappNumber}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2 mb-1">
                          <Languages size={14} className="text-slate-400" suppressHydrationWarning /> {reg.preferredLanguage}
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={14} className="text-slate-400" suppressHydrationWarning /> {reg.preferredBatch}
                        </div>
                        <div className="flex items-center gap-2">
                          <Share2 size={14} className="text-slate-400" suppressHydrationWarning /> {reg.referral}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="text-sm text-slate-500">{new Date(reg.createdAt).toLocaleDateString()}</div>
                        <div className="text-xs text-slate-400">{new Date(reg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
