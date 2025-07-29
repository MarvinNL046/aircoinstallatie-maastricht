import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Shield, Wrench } from "lucide-react"

interface ProductContactCTAProps {
  productName?: string
}

export function ProductContactCTA({ productName }: ProductContactCTAProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {productName ? `Interesse in de ${productName}?` : 'Klaar voor uw nieuwe airco?'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Onze airco experts staan klaar om u te helpen met persoonlijk advies, 
            een gratis offerte en professionele installatie.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <Card className="p-6 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Contact</h3>
            <p className="text-muted-foreground mb-4">
              Bel ons voor direct advies of om een afspraak in te plannen
            </p>
            <div className="space-y-2 text-sm">
              <div className="font-medium">+31 (0)43 711 00 89</div>
              <div className="text-muted-foreground">Ma-Vr: 08:00 - 18:00</div>
              <div className="text-muted-foreground">Za: 09:00 - 17:00</div>
            </div>
            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
              Bel Direct
            </Button>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gratis Offerte</h3>
            <p className="text-muted-foreground mb-4">
              Vraag een vrijblijvende offerte aan en ontvang binnen 24 uur antwoord
            </p>
            <div className="space-y-2 text-sm">
              <div className="font-medium">info@staycoolairco.nl</div>
              <div className="text-muted-foreground">✓ Binnen 24 uur antwoord</div>
              <div className="text-muted-foreground">✓ Vrijblijvend advies</div>
            </div>
            <Link href="/offerte">
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Offerte Aanvragen
              </Button>
            </Link>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Locatie Bezoek</h3>
            <p className="text-muted-foreground mb-4">
              Plan een gratis locatiebezoek in voor persoonlijk advies op maat
            </p>
            <div className="space-y-2 text-sm">
              <div className="font-medium">Heel Limburg</div>
              <div className="text-muted-foreground">✓ Gratis locatiebezoek</div>
              <div className="text-muted-foreground">✓ Persoonlijk advies</div>
            </div>
            <Link href="/contact">
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Afspraak Maken
              </Button>
            </Link>
          </Card>
        </div>

        {/* Service Garanties */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Waarom kiezen voor StayCool Airco?
          </h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">5 Jaar Garantie</h4>
                <p className="text-sm text-muted-foreground">
                  Volledige garantie op alle installaties en onderdelen
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Wrench className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Gecertificeerde Monteurs</h4>
                <p className="text-sm text-muted-foreground">
                  Professionele installatie door erkende specialisten
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-100 rounded-full p-2">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Snelle Service</h4>
                <p className="text-sm text-muted-foreground">
                  Installatie binnen 48 uur na akkoord
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {productName ? `Start vandaag nog met uw ${productName}` : 'Start vandaag nog met uw nieuwe airco'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Gratis advies, eerlijke prijzen en professionele installatie. 
              Meer dan 1000+ tevreden klanten gingen u voor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
              >
                Bel Nu: 043 711 00 89
              </Button>
              <Link href="/offerte">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-600 font-semibold"
                >
                  Gratis Offerte Aanvragen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}