-- Run this entirely in your Supabase SQL Editor (Dashboard -> Browse -> SQL Editor)

-- 1. Create Doctors Table
CREATE TABLE public.doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  qualifications TEXT NOT NULL,
  specialization TEXT NOT NULL,
  experience TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Testimonials Table
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Clinic Settings Table (For Logo)
CREATE TABLE public.clinic_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3.5 Create Treatments Table
CREATE TABLE public.treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Stethoscope',
  color_theme TEXT DEFAULT 'bg-teal-50 border-teal-100 text-teal-600',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Set up Row Level Security (RLS) policies
-- Enable RLS
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all these tables
CREATE POLICY "Allow public read access on doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Allow public read access on testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access on clinic_settings" ON public.clinic_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on treatments" ON public.treatments FOR SELECT USING (true);

-- Allow authenticated users (Admin) full access
CREATE POLICY "Allow authenticated full access on doctors" ON public.doctors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on clinic_settings" ON public.clinic_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on treatments" ON public.treatments FOR ALL USING (auth.role() = 'authenticated');

-- 5. Setup Storage Bucket for Assets (Doctor images, Logos, Patient photos)
INSERT INTO storage.buckets (id, name, public) VALUES ('clinic-assets', 'clinic-assets', true);

-- Allow public read access to the bucket
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'clinic-assets' );

-- Allow authenticated users to insert/update assets
CREATE POLICY "Authenticated user upload" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'clinic-assets' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated user update" 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'clinic-assets' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated user delete" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'clinic-assets' AND auth.role() = 'authenticated' );

-- 6. Insert Default Dummy Data (Optional, just to see it working immediately)
INSERT INTO public.doctors (name, qualifications, specialization, experience, image_url)
VALUES 
('Dr. Darly James', 'BSc, BDS', 'Principal Dentist', '25+ Years Experience', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'),
('Dr. Johncy John', 'BDS', 'Dental Surgeon', 'Advanced Restorative Care', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300');

INSERT INTO public.testimonials (name, review, rating, image_url)
VALUES 
('Aswathy Nair', 'The clinic is exceptionally clean, and Dr. Darly is so patient. The root canal was entirely painless. Highly recommended for anyone in Thiruvalla!', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100'),
('Thomas Mathew', 'Visited from Dubai for some restorative work. Excellent service, state of the art equipment, and very reasonable pricing compared to abroad.', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100');

INSERT INTO public.treatments (title, description, icon_name, color_theme)
VALUES 
('General Dentistry', 'Comprehensive check-ups, professional cleaning, and preventative care.', 'Activity', 'bg-teal-50 border-teal-100 text-teal-600'),
('Orthodontics', 'Traditional braces and clear aligners for all ages.', 'Sparkles', 'bg-sky-50 border-sky-100 text-sky-600'),
('Endodontics', 'Painless root canal treatments utilizing modern machinery.', 'Activity', 'bg-indigo-50 border-indigo-100 text-indigo-600'),
('Cosmetic Dentistry', 'Teeth whitening, veneers, and full smile makeovers.', 'Smile', 'bg-rose-50 border-rose-100 text-rose-600'),
('Prosthodontics', 'High-quality crowns, bridges, and custom dentures.', 'ShieldCheck', 'bg-amber-50 border-amber-100 text-amber-600'),
('Oral Surgery', 'Safe and comfortable wisdom tooth extractions or minor surgeries.', 'Activity', 'bg-emerald-50 border-emerald-100 text-emerald-600');
