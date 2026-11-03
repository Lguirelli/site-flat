import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Accommodations } from "@/components/sections/Accommodations";
import { Gallery } from "@/components/sections/Gallery";
import { Amenities } from "@/components/sections/Amenities";
import { Location } from "@/components/sections/Location";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { MobileCTA } from "@/components/layout/MobileCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Accommodations />
      <Gallery />
      <Amenities />
      <Location />
      <FAQ />
      <ContactCTA />
      <MobileCTA />
    </>
  );
}
