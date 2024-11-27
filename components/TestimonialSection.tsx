import { Card, CardContent } from "@/components/ui/card"
import { Heart, Book, Camera } from "lucide-react"

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-100 via-rose-100 to-violet-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Preserving Memories, Honoring Lives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Heart className="w-12 h-12 text-rose-500" />}
            title="Create Lasting Tributes"
            description="Design beautiful digital memorials that capture the essence of your loved ones."
          />
          <FeatureCard
            icon={<Camera className="w-12 h-12 text-amber-500" />}
            title="Share Cherished Moments"
            description="Upload and organize photos and videos to celebrate a life well-lived."
          />
          <FeatureCard
            icon={<Book className="w-12 h-12 text-violet-500" />}
            title="Tell Their Story"
            description="Write and preserve life stories, achievements, and precious memories for generations to come."
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
  icon: any,
  title: string,
  description: string
}
