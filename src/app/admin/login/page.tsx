"use client";

import { Syringe, Home } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing to itself
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // If successful, redirect to the dashboard
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
      <div className="flex justify-center mb-6">
        <div className="bg-teal-600 text-white p-3 rounded-2xl">
          <Syringe className="h-8 w-8" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">Admin Portal</h1>
      <p className="text-center text-slate-500 mb-8">Sign in to manage the Grace Dental Clinic website.</p>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            placeholder="admin@gracedental.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-xl transition-all shadow-md mt-4 disabled:opacity-70"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors font-medium">
          <Home className="w-4 h-4" /> Back to Home Page
        </Link>
      </div>
    </div>
  );
}
