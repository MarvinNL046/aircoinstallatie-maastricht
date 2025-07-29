import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import productsData from "@/data/products.json"
import brandsData from "@/data/brands.json"

export function ProductsShowcase() {
  // Get featured products from different brands
  const featuredProducts = [
    productsData.products.daikin?.[0], // Daikin Comfora
    productsData.products.samsung?.[0], // Samsung WindFree Comfort
    productsData.products.lg?.[0], // LG DualCool Premium
    productsData.products.tosot?.[0], // Tosot WTS Console
  ].filter(Boolean).slice(0, 4)

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Populaire Airco Modellen</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ontdek onze meest populaire airconditioners van topmerken zoals Daikin, Samsung, LG en Tosot. 
            Elk model is zorgvuldig geselecteerd voor optimale prestaties en energiebesparing.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {featuredProducts.map((product) => {
            const brand = brandsData.brands.find(b => b.slug === product.brand)
            
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-48 bg-gray-50">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs mb-1">
                      {brand?.name || product.brand}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {product.specifications.energielabel}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                    <div>Koeling: {product.specifications.koelvermogen}</div>
                    <div>Geluid: {product.specifications.geluidsniveau}</div>
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
            )
          })}
        </div>

        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/producten">
              <Button variant="outline" size="lg">
                Alle Modellen Bekijken
              </Button>
            </Link>
            <Link href="/merken">
              <Button variant="outline" size="lg">
                Alle Merken
              </Button>
            </Link>
            <Link href="/offerte">
              <Button className="bg-green-600 hover:bg-green-700" size="lg">
                Gratis Advies & Offerte
              </Button>
            </Link>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">
              Niet zeker welk model het beste bij u past?
            </h3>
            <p className="text-blue-800 text-sm mb-4">
              Onze airco experts helpen u graag bij het kiezen van de perfecte airconditioning 
              voor uw specifieke situatie. Gratis advies en offerte op maat.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link href="/contact">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
                  Vraag Persoonlijk Advies
                </Button>
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Bel Direct: 043 711 00 89
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}