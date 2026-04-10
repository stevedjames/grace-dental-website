import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Doctors from "@/components/Doctors";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export const revalidate = 0; // Force always fetch fresh data from Supabase

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Doctors />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
