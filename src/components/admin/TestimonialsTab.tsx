"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Pencil, Image as ImageIcon, Star } from "lucide-react";

export default function TestimonialsTab() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({ id: "", name: "", review: "", rating: 5, image_url: "" });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (data) setReviews(data);
    setLoading(false);
  };

  const handleOpenModal = (rev: any = null) => {
    if (rev) {
      setFormData(rev);
    } else {
      setFormData({ id: "", name: "", review: "", rating: 5, image_url: "" });
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    fetchReviews();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalImageUrl = formData.image_url;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `testimonials/${fileName}`;

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
      review: formData.review,
      rating: formData.rating,
      image_url: finalImageUrl
    };

    if (formData.id) {
      await supabase.from("testimonials").update(payload).eq("id", formData.id);
    } else {
      await supabase.from("testimonials").insert([payload]);
    }

    setIsUploading(false);
    setIsModalOpen(false);
    fetchReviews();
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manage Testimonials</h2>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Review
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading testimonials...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-sm font-semibold text-slate-600">Patient</th>
                <th className="pb-3 text-sm font-semibold text-slate-600">Review Snippet</th>
                <th className="pb-3 text-sm font-semibold text-slate-600">Rating</th>
                <th className="pb-3 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      {rev.image_url ? (
                        <img src={rev.image_url} alt="patient" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center"><ImageIcon className="w-3 h-3 text-slate-500" /></div>
                      )}
                      <span className="font-medium text-slate-800">{rev.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-slate-600 max-w-xs truncate" title={rev.review}>{rev.review}</td>
                  <td className="py-3">
                    {/* Display stars purely for visuals */}
                    <div className="flex">
                       {[...Array(rev.rating || 5)].map((_,i) => <Starey key={i} />)}
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleOpenModal(rev)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(rev.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
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
            <h3 className="text-xl font-bold mb-4">{formData.id ? "Edit Testimonial" : "Add Testimonial"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Patient Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Review Text</label>
                <textarea required rows={4} value={formData.review} onChange={(e) => setFormData({...formData, review: e.target.value})} className="w-full border rounded-xl px-3 py-2" placeholder="Excellent experience..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                <input required type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full border rounded-xl px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Patient Photo (Optional)</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full border rounded-xl px-3 py-2" />
                {formData.image_url && !file && <p className="text-xs text-sky-600 mt-1">Has existing photo.</p>}
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl font-medium">Cancel</button>
                <button type="submit" disabled={isUploading} className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-xl font-medium disabled:opacity-50">
                  {isUploading ? "Saving..." : "Save Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Mini Star icon component for the table
function Starey() {
  return <Star className="w-3 h-3 fill-amber-400 text-amber-400" />;
}
