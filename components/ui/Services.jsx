import React from "react";
import { QrCode, UserRoundCog, Edit3 } from 'lucide-react';

const Services = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4">
            Naše usluge
          </h2>
          <p className="text-lg text-slate-600">
            Pružamo inovativne načine za očuvanje i deljenje dragocenih uspomena vaših voljenih.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <ServiceCard
            icon={<UserRoundCog className="w-8 h-8" />}
            title="Intuitivno korišćenje"
            details="Naša platforma je dizajnirana da bude jednostavna za upotrebu, omogućavajući vam da se fokusirate na kreiranje značajnih uspomena."
          />
          <ServiceCard
            icon={<QrCode className="w-8 h-8" />}
            title="Kvalitetna pločica sa QR kodom"
            details="Izdržljive i elegantne pločice sa jedinstvenim QR kodom koji povezuje fizički spomenik sa digitalnim sećanjima."
          />
          <ServiceCard
            icon={<Edit3 className="w-8 h-8" />}
            title="Neograničeno uređivanje profila"
            details="Fleksibilnost da ažurirate i obogatite memorijalni profil u bilo kom trenutku, čuvajući živim sećanje na voljenu osobu."
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, details }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="font-serif text-xl font-semibold text-slate-800 mb-3 text-center">
          {title}
        </h3>
        <p className="text-slate-600 text-center">{details}</p>
      </div>
      <div className="h-2 bg-primary"></div>
    </div>
  );
};

export default Services;

