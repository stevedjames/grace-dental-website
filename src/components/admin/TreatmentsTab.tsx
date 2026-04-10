"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Pencil, Activity } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function TreatmentsTab() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({ id: "", title: "", description: "", icon_name: "Stethoscope", color_theme: "bg-teal-50 border-teal-100 text-teal-600" });

  // Example options for simple configuration
  const iconOptions = ["Stethoscope", "Sparkles", "Smile", "Activity", "ShieldCheck", "Bluetooth", "Heart", "Star"];
  const colorOptions = [
    { label: "Teal", value: "bg-teal-50 border-teal-100 text-teal-600" },
    { label: "Sky Blue", value: "bg-sky-50 border-sky-100 text-sky-600" },
    { label: "Indigo", value: "bg-indigo-50 border-indigo-100 text-indigo-600" },
    { label: "Rose", value: "bg-rose-50 border-rose-100 text-rose-600" },
    { label: "Emerald", value: "bg-emerald-50 border-emerald-100 text-emerald-600" },
    { label: "Amber", value: "bg-amber-50 border-amber-100 text-amber-600" }
  ];

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    setLoading(true);
    const { data } = await supabase.from("treatments").select("*").order("created_at", { ascending: true });
    if (data) setTreatments(data);
    setLoading(false);
  };

  const handleOpenModal = (trt: any = null) => {
    if (trt) {
      setFormData(trt);
    } else {
      setFormData({ id: "", title: "", description: "", icon_name: "Stethoscope", color_theme: colorOptions[0].value });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this treatment?")) return;
    await supabase.from("treatments").delete().eq("id", id);
    fetchTreatments();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      icon_name: formData.icon_name,
      color_theme: formData.color_theme
    };

    if (formData.id) {
      await supabase.from("treatments").update(payload).eq("id", formData.id);
    } else {
      await supabase.from("treatments").insert([payload]);
    }

    setIsSaving(false);
    setIsModalOpen(false);
    fetchTreatments();
  };

  const renderIcon = (iconName: string, className: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Activity;
    return <Icon className={className} />;
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manage Treatments</h2>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Treatment
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading treatments...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((trt) => (
            <div key={trt.id} className="p-6 rounded-2xl border border-slate-100 shadow-sm relative group bg-base">
              {/* Dynamic Theme classes split manually to apply text colors properly */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${trt.color_theme}`}>
                {renderIcon(trt.icon_name, "w-6 h-6")}
              </div>
              <h3 className="font-bold text-slate-800 mb-2 truncate" title={trt.title}>{trt.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-3">{trt.description}</p>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button onClick={() => handleOpenModal(trt)} className="p-2 bg-white border border-slate-200 text-blue-600 rounded-lg shadow-md hover:bg-blue-50"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(trt.id)} className="p-2 bg-white border border-slate-200 text-red-600 rounded-lg shadow-md hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {treatments.length === 0 && <p className="col-span-full text-slate-500 text-center py-8">No treatments found. Start by adding one.</p>}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{formData.id ? "Edit Treatment" : "Add Treatment"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="e.g. Root Canal" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="Brief description of the procedure..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Icon Style</label>
                  <select value={formData.icon_name} onChange={(e) => setFormData({...formData, icon_name: e.target.value})} className="w-full border rounded-xl px-3 py-2">
                    {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Color Theme</label>
                  <select value={formData.color_theme} onChange={(e) => setFormData({...formData, color_theme: e.target.value})} className="w-full border rounded-xl px-3 py-2">
                    {colorOptions.map(c => <option key={c.label} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              
              {/* Preview Block */}
              <div className="p-4 border rounded-2xl bg-slate-50 mt-4 flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.color_theme}`}>
                    {renderIcon(formData.icon_name, "w-6 h-6")}
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">Live Preview</p>
                    <p className="font-bold text-slate-800 truncate">{formData.title || "Treatment Title"}</p>
                 </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl font-medium">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium disabled:opacity-50">
                  {isSaving ? "Saving..." : "Save Treatment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
