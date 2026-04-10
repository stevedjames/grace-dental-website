import { Star, MessageSquareQuote } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default async function Testimonials() {
  // Fetch testimonials from Supabase database
  const { data: testimonialsData } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  // Fallback to static dummy data if the DB is empty
  const reviews = testimonialsData && testimonialsData.length > 0 ? testimonialsData : [
    {
      name: "Aswathy Nair",
      review: "The clinic is exceptionally clean, and Dr. Darly is so patient. The root canal was entirely painless. Highly recommended for anyone in Thiruvalla!",
      rating: 5,
      image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      name: "Thomas Mathew",
      review: "Visited from Dubai for some restorative work. Excellent service, state of the art equipment, and very reasonable pricing compared to abroad.",
      rating: 5,
      image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
    },
    {
      name: "Riya Susan",
      review: "Dr. Johncy was amazing with my daughter's braces. The entire process was smooth, and the staff were very accommodating with appointments.",
      rating: 5,
      image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-teal-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-700 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3"></div>
      
      <div className="max-w-6xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">What Our Patients Say</h2>
          <p className="text-teal-100">Thousands of happy smiles restored. Read the experiences of our local and international patients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
              <div>
                <MessageSquareQuote className="text-teal-200 w-10 h-10 mb-6" />
                <p className="text-slate-600 italic mb-8 leading-relaxed">"{rev.review}"</p>
              </div>
              
              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <img src={rev.image_url || '/api/placeholder/100/100'} alt={rev.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{rev.name}</h4>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
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
