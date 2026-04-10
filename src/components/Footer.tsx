import { MapPin, Phone, MessageSquareQuote, Syringe } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default async function Footer() {
  const { data: logoSetting } = await supabase.from("clinic_settings").select("setting_value").eq("setting_key", "logo_url").single();
  const logoUrl = logoSetting?.setting_value;

  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-800 pt-20 pb-10 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-4 max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              {logoUrl ? (
                <img src={logoUrl} alt="Clinic Logo" className="max-h-12 w-auto object-contain brightness-0 invert" /> // Forcing logo to white in dark footer
              ) : (
                <div className="bg-teal-600 text-white p-2 rounded-xl">
                  <Syringe className="h-6 w-6" />
                </div>
              )}
              <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                Grace Dental <span className="text-teal-500">Clinic</span>
              </h2>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Providing premium, comprehensive dental care in Thiruvalla. We ensure a safe, hygienic, and extremely comfortable environment for all our patients.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <span className="text-lg">f</span>
              </a>
              <a href="https://wa.me/+919447566869" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                <span className="sr-only">WhatsApp</span>
                <span className="text-lg">w</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Treatments</a></li>
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Meet the Doctors</a></li>
              <li><a href="#testimonials" className="hover:text-teal-400 transition-colors">Patient Reviews</a></li>
              <li><a href="/admin/login" className="hover:text-teal-400 transition-colors">Admin Portal</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-6 text-lg">Hours</h3>
            <ul className="space-y-5">
              <li className="flex flex-col gap-1">
                <span className="text-slate-400">Mon - Fri:</span>
                <span className="text-white font-medium">9:00 AM - 12:30 PM<br/>3:00 PM - 5:30 PM</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-slate-400">Saturday:</span>
                <span className="text-white font-medium">9:00 AM - 1:00 PM</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-slate-400">Sunday:</span>
                <span className="text-teal-400 font-medium">Closed</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
            <h3 className="text-white font-bold mb-6 text-lg relative z-10">Contact Us</h3>
            <ul className="space-y-5 relative z-10">
              <li className="flex items-start gap-4 hover:text-white transition-colors py-1">
                <MapPin className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <span>Grace Dental Clinic, Pullad P.O,<br /> Thiruvalla, Kerala, India</span>
              </li>
              <li>
                <a href="tel:04692660065" className="flex items-center gap-4 hover:text-teal-400 transition-colors py-1 group">
                  <Phone className="w-5 h-5 text-teal-500 shrink-0" />
                  <span>0469-2660065 <span className="text-xs ml-2 bg-slate-800 text-slate-400 px-2 py-0.5 rounded group-hover:bg-teal-900 group-hover:text-teal-100 transition-colors">Landline</span></span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/+919447566869" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-teal-400 transition-colors py-1 group">
                  <MessageSquareQuote className="w-5 h-5 text-teal-500 shrink-0" />
                  <span>+91-9447566869 <span className="text-xs ml-2 bg-slate-800 text-slate-400 px-2 py-0.5 rounded group-hover:bg-teal-900 group-hover:text-teal-100 transition-colors">Mobile/WhatsApp</span></span>
                </a>
              </li>
            </ul>
            
            {/* Embedded maps placeholder or link */}
            <div className="mt-8 rounded-xl overflow-hidden aspect-video bg-slate-800 relative group">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400&h=200" alt="Map Location" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <a href="https://maps.app.goo.gl/UNKgBbUv8tvee3Z2A" target="_blank" rel="noopener noreferrer" className="bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> View on Maps
                </a>
              </div>
            </div>
          </div>
          
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Grace Dental Clinic. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
