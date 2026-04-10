import { ArrowRight, MessageCircle, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120%] h-full bg-gradient-to-br from-teal-50 via-white to-sky-50 rounded-full blur-[100px] opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold tracking-wide">
            <Star className="h-4 w-4 fill-teal-600 text-teal-600" />
            Top Rated Care in Thiruvalla
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Smile With <br className="hidden lg:block" />
            <span className="text-teal-600">Confidence</span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Experience comprehensive, pain-free dental care at Grace Dental Clinic. From routine checkups to specialized cosmetic procedures, we bring the best in modern dentistry to Pullad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <a
              href="https://wa.me/+919447566869"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-teal-500/30 transform hover:-translate-y-1 w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Book via WhatsApp
            </a>

            <a
              href="#services"
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border shadow-sm border-slate-200 px-8 py-4 rounded-full text-lg font-medium transition-all w-full sm:w-auto hover:-translate-y-0.5"
            >
              Explore Treatments
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600" />
            </a>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 bg-teal-100 rounded-full flex items-center justify-center shadow-2xl overflow-hidden ring-8 ring-white">
            {/* We will rely on image generation for a real photo, using a placeholder styling for now */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-sky-300 opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600"
              alt="Happy Patient"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-xl">👩‍⚕️</span>
            </div>
            <div>
              <p className="font-bold text-slate-800">Expert Doctors</p>
              <p className="text-sm text-slate-500">20+ Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
