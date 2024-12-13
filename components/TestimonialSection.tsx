import { Card, CardContent } from "@/components/ui/card"
import { Flower, Feather, Heart } from 'lucide-react'

export default function MemorialSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-6 text-slate-800">
          Čuvanje sećanja, slavlje života
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Stvorite trajno mesto za sećanje na vaše voljene, gde njihov duh živi kroz priče, slike i uspomene koje delite.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MemorialCard
            icon={<Heart className="w-10 h-10 text-slate-700" />}
            title="Negujte uspomene"
            description="Kreirajte nežne digitalne spomenike koji odražavaju suštinu vaših voljenih."
          />
          <MemorialCard
            icon={<Feather className="w-10 h-10 text-slate-700" />}
            title="Podelite njihovu priču"
            description="Zapišite i sačuvajte životne priče, dostignuća i dragocene trenutke za buduće generacije."
          />
          <MemorialCard
            icon={<Flower className="w-10 h-10 text-slate-700" />}
            title="Proslavite život"
            description="Dodajte fotografije i video zapise koji slave jedinstveni život vaših voljenih."
          />
        </div>
      </div>
    </section>
  )
}

function MemorialCard({ icon, title, description }: MemorialCardProps) {
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-slate-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 bg-slate-100 p-3 rounded-full">{icon}</div>
          <h3 className="text-xl font-serif font-semibold mb-2 text-slate-800">{title}</h3>
          <p className="text-slate-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface MemorialCardProps {
  icon: React.ReactNode,
  title: string,
  description: string
}

