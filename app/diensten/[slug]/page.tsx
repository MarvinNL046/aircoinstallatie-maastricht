import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { CTAWithForm } from "@/components/sections/cta-with-form"
import diensten from "@/data/diensten.json"
import { generateServiceSchema } from "@/lib/structured-data"
import Script from "next/script"

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dienst = diensten.find((d) => d.slug === params.slug)
  
  if (!dienst) {
    return {
      title: "Dienst niet gevonden",
      description: "De opgevraagde dienst bestaat niet."
    }
  }

  // Optimize title based on service type
  let title = "";
  let description = "";

  switch(params.slug) {
    case "installatie":
      title = `Airco Installateur Maastricht | Professionele Airco Installatie | StayCool`;
      description = `Vakkundige airco installatie in Maastricht door erkende installateurs. Alle topmerken, 5 jaar garantie. Vraag vandaag nog een offerte aan.`;
      break;
    case "onderhoud":
      title = `Airco Onderhoud Maastricht | Professioneel & Betrouwbaar | StayCool`;
      description = `Professioneel airco onderhoud in Maastricht. Verleng de levensduur van uw systeem en voorkom storingen. Erkende airco specialist.`;
      break;
    default:
      title = `${dienst.title} Maastricht | Erkende Airco Specialist | StayCool`;
      description = dienst.description.length > 155 ? 
        dienst.description.substring(0, 155) + "..." : 
        dienst.description;
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://aircoinstallatie-maastricht.nl/diensten/${params.slug}`,
      siteName: "StayCool Airco Maastricht",
      locale: "nl_NL",
      type: "website",
    },
  }
}

export function generateStaticParams() {
  return diensten.map((dienst) => ({
    slug: dienst.slug,
  }))
}

export default function DienstPage({ params }: Props) {
  const dienst = diensten.find((d) => d.slug === params.slug)

  if (!dienst) {
    notFound()
  }

  const serviceSchema = generateServiceSchema({
    name: dienst.title,
    description: dienst.description,
    price: dienst.price.from.toString(),
  })

  const breadcrumbItems = [
    { label: "Diensten", href: "/diensten" },
    { label: dienst.title, href: `/diensten/${dienst.slug}` }
  ]

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <h1 className="text-4xl font-bold mb-6">{dienst.title}</h1>
        
        <div className="prose max-w-none mb-16">
          <p className="text-lg mb-4">{dienst.description}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Voordelen</h2>
          <ul className="space-y-2">
            {dienst.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                {benefit}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Kenmerken</h2>
          <ul className="space-y-2">
            {dienst.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <CTAWithForm 
          title="Interesse in deze dienst?"
          description="Vraag direct een vrijblijvende offerte aan voor deze dienst."
        />
      </div>
    </>
  )
}
