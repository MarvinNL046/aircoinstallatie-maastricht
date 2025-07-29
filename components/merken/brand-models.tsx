import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import productsData from "@/data/products.json"

interface BrandModelsProps {
  brand: {
    name: string
    slug: string
  }
}

export function BrandModels({ brand }: BrandModelsProps) {
  const brandSlug = brand.slug
  const models = productsData.products[brandSlug as keyof typeof productsData.products] || []
  
  // Show only first 6 models
  const featuredModels = models.slice(0, 6)

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Onze {brand.name} Modellen</h2>
        <Link href={`/merken/${brandSlug}/modellen`}>
          <Button variant="outline" size="sm">
            Alle modellen bekijken
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featuredModels.map((model) => (
          <div key={model.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gray-50">
              <Image
                src={model.images[0]}
                alt={model.name}
                fill
                className="object-contain p-4"
              />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{model.name}</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {(model.specifications as any).energielabel || 'A+'}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {model.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                <div>Koelvermogen: {(model.specifications as any).koelvermogen || 'N/A'}</div>
                <div>Geluid: {(model.specifications as any).geluidsniveau || 'Stil'}</div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {model.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                  >
                    {feature}
                  </span>
                ))}
                {model.features.length > 2 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">
                    +{model.features.length - 2} meer
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Link href={`/producten/${model.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    Details bekijken
                  </Button>
                </Link>
                <Link href="/offerte">
                  <Button className="bg-green-600 hover:bg-green-700" size="sm">
                    Offerte aanvragen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {models.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Binnenkort beschikbaar...</p>
          <Link href="/contact">
            <Button className="mt-4 bg-green-600 hover:bg-green-700">
              Informeer naar beschikbaarheid
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}

