import { Inter } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
})

export const metadata = {
  metadataBase: new URL('https://aircoinstallatie-maastricht.nl'),
  title: {
    default: 'Airco Installateur Maastricht | Erkend & Gecertificeerd | StayCool',
    template: '%s | StayCool Airco'
  },
  description: 'Professionele airco installatie in Maastricht ✓ Erkend installateur ✓ Alle topmerken ✓ 5 jaar garantie. Bel nu: 046 202 1430',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192.png' },
    ],
  },
  keywords: [
    // Primaire zoektermen
    'airco installatie maastricht',
    'airco specialist maastricht',
    'airco monteur maastricht',
    'airco bedrijf maastricht',
    'airconditioning maastricht',
    
    // Installatie en service
    'professionele airco installatie',
    'airco installatie kosten',
    'split airco installatie',
    'multisplit airco maastricht',
    'airco onderhoud maastricht',
    'airco storing oplossen',
    'snelle airco service',
    
    // Producten en systemen
    'energiezuinige airco',
    'split airco systemen',
    'multi-split airconditioning',
    'stille airco installatie',
    'airco met verwarming',
    
    // Doelgroep specifiek
    'airco voor woning',
    'airco voor bedrijf',
    'airco voor slaapkamer',
    'beste airco voor thuis',
    
    // Commercieel
    'airco kopen maastricht',
    'airco maastricht prijzen',
    'airco prijsvergelijking',
    'airco financiering',
    'goedkope airco installatie',
    
    // Expertise en advies
    'airco showroom maastricht',
    'airco advies op maat',
    'gecertificeerde airco monteurs',
    'airco merken',
    'premium airco merken',
    
    // Conversie gericht
    'airco offerte aanvragen',
    'airco laten plaatsen',
    'airco installatie advies',
    
    // Seizoensgebonden
    'airco voor zomer en winter',
    'klimaatbeheersing',
    'duurzame koeling',
    'warmtepomp'
  ],
  authors: [{ name: 'StayCool Airco' }],
  creator: 'StayCool Airco',
  publisher: 'StayCool Airco',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: '/',
    siteName: 'StayCool Airco Maastricht',
    title: 'Airco Installateur Maastricht | Erkend & Gecertificeerd | StayCool',
    description: 'Professionele airco installatie in Maastricht door erkende installateurs. Topmerken, 5 jaar garantie en de beste service.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'StayCool Airco Maastricht - Professionele Airconditioning Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airco Installateur Maastricht | Erkend & Gecertificeerd | StayCool',
    description: 'Professionele airco installatie in Maastricht door erkende monteurs. Bel nu: 046 202 1430',
    images: ['/opengraph-image'],
    creator: '@staycoolairco',
    site: '@staycoolairco'
  },
  alternates: {
    canonical: 'https://aircoinstallatie-maastricht.nl'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'F7ziqeuiZtQK3wDaKBZ65SgfDN61xAKq09v9PUpqQSY',
    yandex: 'verification_token',
    yahoo: 'verification_token',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="nl" 
      suppressHydrationWarning
      className="scroll-smooth antialiased"
    >
      <head />
      <body 
        className={`${inter.className} min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
