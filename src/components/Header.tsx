import Link from "next/link";
import { Phone, MapPin, CalendarDays, Syringe, Clipboard, User, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default async function Header() {
  const { data: logoSetting } = await supabase.from("clinic_settings").select("setting_value").eq("setting_key", "logo_url").single();
  const logoUrl = logoSetting?.setting_value;

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-teal-100 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            {logoUrl ? (
              <img src={logoUrl} alt="Clinic Logo" className="max-h-12 w-auto object-contain" />
            ) : (
              <div className="bg-teal-600 text-white p-2 rounded-xl group-hover:bg-teal-700 transition">
                <Syringe className="h-6 w-6" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-tight group-hover:text-teal-700 transition">
                Grace Dental <br />
                <span className="text-sm font-medium text-teal-600">Clinic</span>
              </h1>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#services" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">Treatments</Link>
          <Link href="#doctors" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">Meet the Doctors</Link>
          <Link href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">Testimonials</Link>
          <Link href="#contact" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/+919447566869"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Book</span> Appointment
          </a>
        </div>
      </div>
    </header>
  );
}
