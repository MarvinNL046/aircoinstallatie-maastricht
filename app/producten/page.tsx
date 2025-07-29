import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import productsData from "@/data/products.json"
import brandsData from "@/data/brands.json"
import { CTAWithForm } from "@/components/sections/cta-with-form"

export const metadata: Metadata = {
  title: "Alle Airco Modellen | Airco Offerte Limburg",
  description: "Ontdek ons complete assortiment airconditioners van alle top merken. Van Daikin tot Samsung - vind de perfecte airco voor uw situatie.",
  keywords: [
    "airco modellen",
    "airconditioner",
    "klimaatbeheersing", 
    "Daikin",
    "Samsung",
    "Mitsubishi",
    "LG",
    "Tosot",
    "Limburg",
    "Maastricht"
  ],
}

export default function ProductsPage() {
  const breadcrumbItems = [
    { label: "Producten", href: "/producten" }
  ]

  // Flatten all products from all brands
  const allProducts = Object.entries(productsData.products).flatMap(([brandSlug, products]) => 
    products.map(product => ({
      ...product,
      brandSlug,
      brandName: brandsData.brands.find(b => b.slug === brandSlug)?.name || brandSlug
    }))
  )

  // Group by type for better organization
  const productsByType = allProducts.reduce((acc, product) => {
    const type = product.type
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(product)
    return acc
  }, {} as Record<string, typeof allProducts>)

  const typeLabels = {
    'wandmodel': 'Wandmodellen',
    'vloermodel': 'Vloermodellen', 
    'console': 'Console Modellen',
    'cassette': 'Cassette Modellen',
    'buitenunit': 'Buitenunits',
    'mobiele-airco': 'Mobiele Airco\'s',
    'accessoire': 'Accessoires'
  }

  const typeDescriptions = {
    'wandmodel': 'Wandgemonteerde airconditioners voor optimale ruimtebesparing',
    'vloermodel': 'Vloermodellen voor flexibele plaatsing zonder wandmontage',
    'console': 'Console modellen die zowel op de vloer als aan de wand kunnen',
    'cassette': 'Inbouw cassette modellen voor plafondmontage',
    'buitenunit': 'Buitenunits in verschillende uitvoeringen en capaciteiten',
    'mobiele-airco': 'Mobiele airconditioners voor flexibel gebruik',
    'accessoire': 'Accessoires voor optimale bescherming en onderhoud'
  }

  return (
    <>
      <div className="container py-12">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Alle Airco Modellen</h1>
          <p className="text-xl text-muted-foreground">
            Ontdek ons complete assortiment airconditioners van alle premium merken. 
            Van energiezuinige wandmodellen tot krachtige vloermodellen.
          </p>
        </div>

        {/* Filters Section - Future Enhancement */}
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter producten</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Zoeken</label>
              <Input placeholder="Zoek model..." />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Merk</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Alle merken" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle merken</SelectItem>
                  {brandsData.brands.map(brand => (
                    <SelectItem key={brand.slug} value={brand.slug}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Alle types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle types</SelectItem>
                  {Object.entries(typeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Energielabel</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Alle labels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle labels</SelectItem>
                  <SelectItem value="A+++">A+++</SelectItem>
                  <SelectItem value="A++">A++</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Filter functionaliteit wordt binnenkort toegevoegd. 
            <Link href="/contact" className="text-blue-600 hover:underline ml-1">
              Neem contact op voor specifieke wensen.
            </Link>
          </p>
        </Card>

        {/* Products by Type */}
        <div className="space-y-12">
          {Object.entries(productsByType).map(([type, products]) => (
            <div key={type}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {typeLabels[type as keyof typeof typeLabels]}
                </h2>
                <p className="text-muted-foreground">
                  {typeDescriptions[type as keyof typeof typeDescriptions]}
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-50">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Badge variant="outline" className="text-xs mb-1">
                            {product.brandName}
                          </Badge>
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {(product.specifications as any).energielabel || 'A+'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                        <div>Koeling: {(product.specifications as any).koelvermogen || 'N/A'}</div>
                        <div>Geluid: {(product.specifications as any).geluidsniveau || 'Stil'}</div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                          >
                            {feature}
                          </span>
                        ))}
                        {product.features.length > 2 && (
                          <span className="text-xs text-muted-foreground px-2 py-1">
                            +{product.features.length - 2} meer
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/producten/${product.id}`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            Details
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
      </div>

      <CTAWithForm 
        title="Hulp nodig bij het kiezen?" 
        description="Onze airco experts helpen u graag bij het vinden van de perfecte airconditioning voor uw situatie"
      />
    </>
  )
}