import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { ContactForm } from "@/components/forms/contact-form"
import brandsData from "@/data/brands.json"
import productsData from "@/data/products.json"

interface BrandModelsPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return brandsData.brands.map((brand) => ({
    slug: brand.slug,
  }))
}

export function generateMetadata({ params }: BrandModelsPageProps): Metadata {
  const brand = brandsData.brands.find((b) => b.slug === params.slug)

  if (!brand) {
    return {
      title: "Merk niet gevonden | Airco Offerte Limburg",
      description: "Het opgevraagde merk kon niet worden gevonden.",
    }
  }

  return {
    title: `${brand.name} Airco Modellen | Airco Offerte Limburg`,
    description: `Ontdek alle ${brand.name} airconditioning modellen. Van wandmodellen tot vloermodellen - wij hebben het juiste model voor uw situatie.`,
    keywords: [
      `${brand.name} airco`,
      `${brand.name} modellen`,
      'airconditioning',
      'klimaatbeheersing',
      'Limburg',
      'Maastricht'
    ],
  }
}

export default function BrandModelsPage({ params }: BrandModelsPageProps) {
  const brand = brandsData.brands.find((b) => b.slug === params.slug)
  const models = productsData.products[params.slug as keyof typeof productsData.products] || []

  if (!brand) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Merken", href: "/merken" },
    { label: brand.name, href: `/merken/${brand.slug}` },
    { label: "Modellen", href: `/merken/${brand.slug}/modellen` }
  ]

  // Group models by type
  const groupedModels = models.reduce((acc, model) => {
    const type = model.type
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(model)
    return acc
  }, {} as Record<string, any[]>)

  const typeLabels = {
    'wandmodel': 'Wandmodellen',
    'vloermodel': 'Vloermodellen', 
    'console': 'Console Modellen',
    'cassette': 'Cassette Modellen',
    'buitenunit': 'Buitenunits',
    'mobiele-airco': 'Mobiele Airco\'s',
    'accessoire': 'Accessoires'
  }

  return (
    <div className="container py-12">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Alle {brand.name} Airco Modellen</h1>
        <p className="text-xl text-muted-foreground">
          Ontdek ons complete assortiment {brand.name} airconditioners. Van compacte wandmodellen tot krachtige vloermodellen.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          {Object.keys(groupedModels).length === 0 ? (
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Binnenkort beschikbaar</h2>
              <p className="text-muted-foreground mb-6">
                Wij werken aan het toevoegen van alle {brand.name} modellen. 
                Neem contact met ons op voor informatie over beschikbare modellen.
              </p>
              <Link href="/contact">
                <Button className="bg-green-600 hover:bg-green-700">
                  Informeer naar modellen
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedModels).map(([type, typeModels]) => (
                <div key={type}>
                  <h2 className="text-2xl font-semibold mb-6">
                    {typeLabels[type as keyof typeof typeLabels] || type}
                  </h2>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {typeModels.map((model) => (
                      <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {model.description}
                          </p>

                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                            <div>Koelvermogen: {(model.specifications as any).koelvermogen || 'N/A'}</div>
                            <div>Geluidsniveau: {(model.specifications as any).geluidsniveau || 'Stil'}</div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {model.features.slice(0, 3).map((feature: string, index: number) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                              >
                                {feature}
                              </span>
                            ))}
                            {model.features.length > 3 && (
                              <span className="text-xs text-muted-foreground px-2 py-1">
                                +{model.features.length - 3} meer
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
                                Offerte
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Persoonlijk Advies
            </h3>
            <p className="text-muted-foreground mb-4">
              Niet zeker welk {brand.name} model het beste bij u past? 
              Onze experts helpen u graag bij het maken van de juiste keuze.
            </p>
            <Link href="/contact" className="block">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Vraag advies aan
              </Button>
            </Link>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Offerte Aanvragen
            </h3>
            <ContactForm />
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Waarom {brand.name}?
            </h3>
            <ul className="space-y-2 text-sm">
              {brand.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}