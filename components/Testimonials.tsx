'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie van der Linden',
    location: 'Wyck, Maastricht',
    text: 'Perfect geïnstalleerd in onze monumentale woning. Het team begreep precies hoe ze moesten werken met de historische details.',
    rating: 5,
  },
  {
    name: 'Peter Hermans',
    location: 'Céramique, Maastricht',
    text: 'Uitstekende service in ons moderne appartement. De airco is stil en past perfect in het interieur.',
    rating: 5,
  },
  {
    name: 'Marie Janssen',
    location: 'Sint Pieter, Maastricht',
    text: 'Zeer tevreden met de installatie. Het team was professioneel en heeft alles netjes afgewerkt.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ervaringen uit Maastricht
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wat onze klanten in Maastricht over ons zeggen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">{testimonial.text}</p>
                <div className="mt-auto">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}