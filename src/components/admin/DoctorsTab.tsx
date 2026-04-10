"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Pencil, Image as ImageIcon } from "lucide-react";

export default function DoctorsTab() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ id: "", name: "", qualifications: "", specialization: "", experience: "", image_url: "" });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    const { data } = await supabase.from("doctors").select("*").order("created_at", { ascending: true });
    if (data) setDoctors(data);
    setLoading(false);
  };

  const handleOpenModal = (doc: any = null) => {
    if (doc) {
      setFormData(doc);
    } else {
      setFormData({ id: "", name: "", qualifications: "", specialization: "", experience: "", image_url: "" });
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    await supabase.from("doctors").delete().eq("id", id);
    fetchDoctors();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalImageUrl = formData.image_url;

    // Upload Image if present
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `doctors/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('clinic-assets')
        .upload(filePath, file);

      if (!uploadError) {
        const { data: publicData } = supabase.storage.from('clinic-assets').getPublicUrl(filePath);
        finalImageUrl = publicData.publicUrl;
      } else {
        alert("Image upload failed");
        setIsUploading(false);
        return;
      }
    }

    const payload = {
      name: formData.name,
      qualifications: formData.qualifications,
      specialization: formData.specialization,
      experience: formData.experience,
      image_url: finalImageUrl
    };

    if (formData.id) {
      // Update
      await supabase.from("doctors").update(payload).eq("id", formData.id);
    } else {
      // Insert
      await supabase.from("doctors").insert([payload]);
    }

    setIsUploading(false);
    setIsModalOpen(false);
    fetchDoctors();
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manage Doctors</h2>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Doctor
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading doctors...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-sm font-semibold text-slate-600">Photo</th>
                <th className="pb-3 text-sm font-semibold text-slate-600">Name</th>
                <th className="pb-3 text-sm font-semibold text-slate-600">Specialization</th>
                <th className="pb-3 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3">
                    {doc.image_url ? (
                      <img src={doc.image_url} alt="portrait" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center"><ImageIcon className="w-4 h-4 text-slate-500" /></div>
                    )}
                  </td>
                  <td className="py-3 font-medium text-slate-800">{doc.name}</td>
                  <td className="py-3 text-sm text-slate-600">{doc.specialization}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleOpenModal(doc)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(doc.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{formData.id ? "Edit Doctor" : "Add Doctor"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="Dr. Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Qualifications</label>
                <input required type="text" value={formData.qualifications} onChange={(e) => setFormData({...formData, qualifications: e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="BDS, MDS" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Specialization</label>
                <input required type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="Orthodontist" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience</label>
                <input required type="text" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="10+ Years" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo Upload</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full border rounded-xl px-3 py-2" />
                {formData.image_url && !file && <p className="text-xs text-sky-600 mt-1">Has existing photo.</p>}
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl font-medium">Cancel</button>
                <button type="submit" disabled={isUploading} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-xl font-medium disabled:opacity-50">
                  {isUploading ? "Saving..." : "Save Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
