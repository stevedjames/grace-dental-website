"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsTab() {
  const [logoUrl, setLogoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("clinic_settings").select("*").eq("setting_key", "logo_url").single();
    if (data) {
      setLogoUrl(data.setting_value);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    setIsUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;
    const filePath = `settings/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('clinic-assets')
      .upload(filePath, file);

    if (!uploadError) {
      const { data: publicData } = supabase.storage.from('clinic-assets').getPublicUrl(filePath);
      const newLogoUrl = publicData.publicUrl;
      
      // Update or insert setting
      const { data: existing } = await supabase.from("clinic_settings").select("id").eq("setting_key", "logo_url").single();
      
      if (existing) {
        await supabase.from("clinic_settings").update({ setting_value: newLogoUrl }).eq("id", existing.id);
      } else {
        await supabase.from("clinic_settings").insert([{ setting_key: "logo_url", setting_value: newLogoUrl }]);
      }

      setLogoUrl(newLogoUrl);
      setFile(null);
      alert("Logo updated successfully!");
    } else {
      alert("Upload failed.");
    }
    setIsUploading(false);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Site Settings</h2>
      
      <div className="max-w-md">
        <label className="block pb-2 font-medium text-slate-700">Official Clinic Logo</label>
        <p className="text-sm text-slate-500 mb-4">This logo will be displayed across the header and footer of your site.</p>
        
        <div className="mb-6 p-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 relative overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo preview" className="max-h-24 object-contain" />
          ) : (
            <span className="text-slate-400">No logo uploaded yet.</span>
          )}
        </div>

        <div className="flex gap-4 items-center">
           <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="flex-1 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
          />
          <button 
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Save Logo"}
          </button>
        </div>
      </div>
    </div>
  );
}
