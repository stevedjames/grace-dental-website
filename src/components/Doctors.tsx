import { Award, CalendarDays, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Next.js Server Component makes this async, fetching data sequentially (SSR/SSG).
export default async function Doctors() {
  // Fetch doctors from the database
  const { data: doctorsData, error } = await supabase
    .from('doctors')
    .select('*')
    .order('created_at', { ascending: true });

  // Use fallback dummy data if the database is empty or not yet configured
  const doctors = doctorsData && doctorsData.length > 0 ? doctorsData : [
    {
      name: "Dr. Darly James",
      qualifications: "BSc, BDS",
      specialization: "Principal Dentist",
      experience: "25+ Years Experience",
      image_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      name: "Dr. Johncy John",
      qualifications: "BDS",
      specialization: "Dental Surgeon",
      experience: "Advanced Restorative Care",
      image_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300"
    }
  ];

  return (
    <section id="doctors" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">Meet Our Specialists</h2>
            <p className="text-slate-600">Our clinic is led by top-tier dental professionals dedicated to providing painless, highly effective treatments.</p>
          </div>
          <a
            href="https://wa.me/+919447566869"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 group transition-colors"
          >
            Consult a Doctor <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {doctors.map((doc, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-8 shadow-sm border border-slate-100 items-center sm:items-start group hover:shadow-lg transition-all">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shrink-0 border-4 border-teal-50">
                <img src={doc.image_url} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col text-center sm:text-left h-full justify-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{doc.name}</h3>
                <p className="text-teal-600 font-medium mb-4">{doc.qualifications}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 text-sm">
                    <Award className="w-4 h-4 text-teal-500" />
                    <span>{doc.specialization}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 text-sm">
                    <CalendarDays className="w-4 h-4 text-teal-500" />
                    <span>{doc.experience}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
