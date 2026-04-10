"use client";

import { useState } from "react";
import DoctorsTab from "@/components/admin/DoctorsTab";
import TestimonialsTab from "@/components/admin/TestimonialsTab";
import SettingsTab from "@/components/admin/SettingsTab";
import TreatmentsTab from "@/components/admin/TreatmentsTab";
import { Users, MessageSquareQuote, ImageIcon, LogOut, Home, Stethoscope } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("doctors");
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage all public content across the Grace Dental website.</p>
        </div>
        <div className="flex items-center gap-6">
          <Link 
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-medium transition-colors"
          >
            <Home className="w-4 h-4" /> View Live Site
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-500 font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
        <button 
          onClick={() => setActiveTab("doctors")} 
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === "doctors" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}
        >
          <Users className="w-4 h-4" /> Doctors Directory
        </button>
        <button 
          onClick={() => setActiveTab("treatments")} 
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === "treatments" ? "border-indigo-600 text-indigo-700" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}
        >
          <Stethoscope className="w-4 h-4" /> Treatments
        </button>
        <button 
          onClick={() => setActiveTab("testimonials")} 
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === "testimonials" ? "border-sky-600 text-sky-700" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}
        >
          <MessageSquareQuote className="w-4 h-4" /> Patient Reviews
        </button>
        <button 
          onClick={() => setActiveTab("settings")} 
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === "settings" ? "border-amber-600 text-amber-700" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}
        >
          <ImageIcon className="w-4 h-4" /> Site Settings & Logo
        </button>
      </div>

      <div className="pt-4">
        {activeTab === "doctors" && <DoctorsTab />}
        {activeTab === "treatments" && <TreatmentsTab />}
        {activeTab === "testimonials" && <TestimonialsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}
