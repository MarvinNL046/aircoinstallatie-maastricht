import { Metadata } from "next"
import { CityContent } from "@/components/city/city-content"
import { getCities } from "@/lib/cities"
import { generateLocalBusinessSchema } from "@/lib/schema"
import Script from "next/script"
import { notFound } from "next/navigation"

interface CityPageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cities = await getCities()
  const cityData = cities.find(city => city.city.toLowerCase() === params.city)
  
  if (!cityData) {
    return {
      title: "Stad niet gevonden | StayCool Airco",
      description: "De opgevraagde stad kon niet worden gevonden."
    }
  }

  // Optimize title and description based on city
  let title = "";
  let description = "";
  
  // Custom optimization for Maastricht (based on search console data)
  if (cityData.city.toLowerCase() === 'maastricht') {
    title = `Airco Installateur Maastricht | Airco Plaatsen & Specialist | StayCool`;
    description = `Professionele airco installatie in Maastricht door erkende specialisten. Airco plaatsen en onderhoud met 5 jaar garantie. Offerte binnen 24 uur.`;
  } else {
    title = `Airco Installateur ${cityData.city} | Erkend & Gecertificeerd | StayCool`;
    description = `Professionele airco installatie in ${cityData.city} door StayCool Airco. ✓ Erkend ✓ Gecertificeerd ✓ 5 jaar garantie. Vraag nu een offerte aan!`;
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://aircoinstallatie-maastricht.nl/steden/${params.city}`,
      siteName: "StayCool Airco Maastricht",
      locale: "nl_NL",
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const cities = await getCities()
  return cities.map((city) => ({
    city: city.city.toLowerCase(),
  }))
}

export default async function CityPage({ params }: CityPageProps) {
  const cities = await getCities()
  const cityData = cities.find(
    (city) => city.city.toLowerCase() === params.city
  )

  if (!cityData) {
    notFound()
  }

  const localBusinessSchema = generateLocalBusinessSchema(cityData.city)

  // Enhanced description for all cities based on search console data
  let description = `Professionele airco installatie in ${cityData.city} door StayCool Airco. Wij bieden complete airco-oplossingen voor zowel particulieren als bedrijven.`
  
  // Add more detailed content for Maastricht targeting top search terms
  if (cityData.city.toLowerCase() === 'maastricht') {
    description = `<h2 class="text-2xl font-bold mb-4">Airco Installateur Maastricht - StayCool Airco</h2>
    <p class="mb-4">Als erkende airco installateur in Maastricht bieden wij professionele airconditioning oplossingen voor woningen en bedrijven. Onze ervaren monteurs zorgen voor vakkundige installatie en onderhoud.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Airco Plaatsen in Maastricht</h2>
    <p class="mb-4">Op zoek naar een specialist om uw airco te plaatsen in Maastricht? StayCool Airco verzorgt het complete traject: van advies en offerte tot installatie en periodiek onderhoud.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Erkende Airco Specialist</h2>
    <p class="mb-4">Als gecertificeerde airco specialist in Maastricht hebben wij ruime ervaring met alle topmerken en systemen. Wij werken met hoogwaardige materialen en garanderen een perfecte installatie.</p>
    
    <p class="mt-4">Bekijk ook onze <a href="/kennisbank/airco-installatie-maastricht" class="text-blue-600 hover:underline">kennisbank over airco's in Maastricht</a>.</p>`
  }

  const city = {
    title: cityData.city,
    description: description,
    region: cityData.region,
    population: cityData.population,
    postal_codes: cityData.postal_codes
  }

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <CityContent city={city} />
    </>
  )
}
