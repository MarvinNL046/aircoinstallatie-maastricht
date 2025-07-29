import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { ContactForm } from "@/components/forms/contact-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import productsData from "@/data/products.json"
import brandsData from "@/data/brands.json"
import { CheckCircle, Phone, Mail, MapPin } from "lucide-react"
import { ProductContactCTA } from "@/components/sections/product-contact-cta"

interface ProductPageProps {
  params: {
    id: string
  }
}

function findProduct(id: string) {
  for (const [brandSlug, products] of Object.entries(productsData.products)) {
    const product = products.find((p: any) => p.id === id)
    if (product) {
      return { product, brandSlug }
    }
  }
  return null
}

export function generateStaticParams() {
  const params: { id: string }[] = []
  
  Object.values(productsData.products).forEach((products) => {
    products.forEach((product: any) => {
      params.push({ id: product.id })
    })
  })
  
  return params
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const result = findProduct(params.id)
  
  if (!result) {
    return {
      title: "Product niet gevonden | Airco Offerte Limburg",
      description: "Het opgevraagde product kon niet worden gevonden.",
    }
  }

  const { product } = result
  
  return {
    title: `${product.name} | ${product.brand.charAt(0).toUpperCase() + product.brand.slice(1)} Airco | Airco Offerte Limburg`,
    description: `${product.description} ✓ ${(product.specifications as any).energielabel || 'Energiezuinig'} energielabel ✓ ${(product.specifications as any).koelvermogen || 'Krachtig'} koelvermogen ✓ Gratis offerte`,
    keywords: [
      product.name,
      product.brand,
      product.type,
      'airconditioning',
      'klimaatbeheersing',
      'Limburg',
      'Maastricht',
      'installatie'
    ],
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const result = findProduct(params.id)
  
  if (!result) {
    notFound()
  }

  const { product, brandSlug } = result
  const brand = brandsData.brands.find(b => b.slug === brandSlug)
  
  const breadcrumbItems = [
    { label: "Merken", href: "/merken" },
    { label: brand?.name || product.brand, href: `/merken/${brandSlug}` },
    { label: product.name, href: `/producten/${product.id}` }
  ]

  const typeLabels = {
    'wandmodel': 'Wandmodel',
    'vloermodel': 'Vloermodel', 
    'console': 'Console Model',
    'cassette': 'Cassette Model',
    'buitenunit': 'Buitenunit',
    'mobiele-airco': 'Mobiele Airco',
    'accessoire': 'Accessoire'
  }

  return (
    <div className="container py-12">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="grid gap-8 lg:grid-cols-2 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 2}`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-green-700 border-green-200">
                {brand?.name || product.brand}
              </Badge>
              <Badge className="bg-green-100 text-green-800">
                {(product.specifications as any).energielabel || 'A+'}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground text-lg mb-4">
              {typeLabels[product.type as keyof typeof typeLabels]} • Model: {product.model}
            </p>
            <p className="text-lg leading-relaxed">{product.description}</p>
          </div>

          {/* Key Specifications */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Belangrijkste Specificaties</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Koelvermogen:</span>
                <div className="font-medium">{(product.specifications as any).koelvermogen || 'N/A'}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Verwarmingsvermogen:</span>
                <div className="font-medium">{(product.specifications as any).verwarmingsvermogen || 'N/A'}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Energielabel:</span>
                <div className="font-medium">{(product.specifications as any).energielabel || 'A+'}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Geluidsniveau:</span>
                <div className="font-medium">{(product.specifications as any).geluidsniveau || 'Stil'}</div>
              </div>
            </div>
          </Card>

          {/* Key Benefits */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Voordelen</h3>
            <div className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Link href="/offerte" className="flex-1">
              <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                Gratis Offerte Aanvragen
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Bel voor Advies
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-3 text-blue-900">Direct Contact</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+31 (0)43 711 00 89</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@staycoolairco.nl</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Limburg & omstreken</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="features" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Eigenschappen</TabsTrigger>
          <TabsTrigger value="specifications">Specificaties</TabsTrigger>
          <TabsTrigger value="installation">Installatie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="features" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Alle Eigenschappen</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Technische Specificaties</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <div className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="font-medium">{value}</div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="installation" className="mt-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Installatie Service</h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">✓ Inbegrepen bij installatie:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Gratis vooronderzoek en advies</li>
                    <li>• Professionele installatie door gecertificeerde monteurs</li>
                    <li>• Inbedrijfstelling en uitleg werking</li>
                    <li>• 2 jaar volledige garantie</li>
                    <li>• Afvoer van oude airco (indien van toepassing)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🔧 Service gebied:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Heel Limburg</li>
                    <li>• Zuid-Nederland</li>
                    <li>• Snelle service binnen 48 uur</li>
                    <li>• Weekend en avond installaties mogelijk</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Interesse in deze {product.name}?
                </h4>
                <p className="text-green-800 text-sm mb-3">
                  Vraag een vrijblijvende offerte aan en ontvang binnen 24 uur een persoonlijke prijsopgave.
                </p>
                <Link href="/offerte">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Offerte aanvragen voor {product.name}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Form Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Offerte Aanvragen voor {product.name}
          </h2>
          <p className="text-muted-foreground mb-6">
            Vul het formulier in en ontvang binnen 24 uur een persoonlijke offerte 
            voor de {product.name} inclusief professionele installatie.
          </p>
          <ContactForm />
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Waarom kiezen voor deze {product.brand} airco?
          </h2>
          <div className="space-y-4">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Nog vragen?</h3>
            <p className="text-blue-800 text-sm mb-3">
              Onze airco experts staan klaar om al uw vragen te beantwoorden.
            </p>
            <div className="flex gap-2">
              <Link href="/contact" className="flex-1">
                <Button variant="outline" className="w-full">
                  Contact opnemen
                </Button>
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Bel direct: 043 711 00 89
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <ProductContactCTA productName={product.name} />
    </div>
  )
}