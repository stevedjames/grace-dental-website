import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default async function Services() {
  // Fetch treatments dynamically
  const { data: treatmentsData } = await supabase
    .from("treatments")
    .select("*")
    .order("created_at", { ascending: true });

  // Fallback static data
  const treatments = treatmentsData && treatmentsData.length > 0 ? treatmentsData : [
    { title: "General Dentistry", description: "Comprehensive check-ups, professional cleaning, and preventative care.", icon_name: "Activity", color_theme: "bg-teal-50 border-teal-100 text-teal-600" },
    { title: "Orthodontics", description: "Traditional braces and clear aligners for all ages.", icon_name: "Sparkles", color_theme: "bg-sky-50 border-sky-100 text-sky-600" },
    { title: "Endodontics", description: "Painless root canal treatments utilizing modern machinery.", icon_name: "Activity", color_theme: "bg-indigo-50 border-indigo-100 text-indigo-600" },
    { title: "Cosmetic Dentistry", description: "Teeth whitening, veneers, and full smile makeovers.", icon_name: "Smile", color_theme: "bg-rose-50 border-rose-100 text-rose-600" },
    { title: "Prosthodontics", description: "High-quality crowns, bridges, and custom dentures.", icon_name: "ShieldCheck", color_theme: "bg-amber-50 border-amber-100 text-amber-600" },
    { title: "Oral Surgery", description: "Safe and comfortable wisdom tooth extractions or minor surgeries.", icon_name: "Activity", color_theme: "bg-emerald-50 border-emerald-100 text-emerald-600" }
  ];

  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Activity;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">Our Premium Treatments</h2>
          <p className="text-slate-600">We offer a wide range of advanced dental procedures tailored to give you the perfect, healthy smile.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {treatments.map((service, idx) => (
            <div key={idx} className="group p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white relative overflow-hidden">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 border ${service.color_theme}`}>
                {renderIcon(service.icon_name)}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
