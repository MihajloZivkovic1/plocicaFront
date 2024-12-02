import { Card, CardContent } from "@/components/ui/card"
import { Heart, Book, Camera } from "lucide-react"

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-100 via-rose-100 to-violet-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Čuvanje sećanja, poštovanje života..
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Heart className="w-12 h-12 text-rose-500" />}
            title="Napravite trajne posvete"
            description="Kreirajte prelepe digitalne uspomene koji prikazuju suštinu vaših najmilijih."
          />
          <FeatureCard
            icon={<Camera className="w-12 h-12 text-amber-500" />}
            title="Delite drage trenutke"
            description="Dodajte i organizujte fotograije i video zapise kako biste proslavili dobro proživljen zivot."
          />
          <FeatureCard
            icon={<Book className="w-12 h-12 text-violet-500" />}
            title="Ispričajte njihovu priču"
            description="Pišite i čuvajte životne priče, dostignuća i dragocene uspomene za generacije koje dolaze."
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode,
  title: string,
  description: string
}
