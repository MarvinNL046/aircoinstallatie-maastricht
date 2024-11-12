'use client';

import { motion } from 'framer-motion';
import { Shield, Leaf, ThumbsUp, Timer, Sun, Snowflake } from 'lucide-react';
import { Card } from '@/components/ui/card';

const benefits = [
  {
    icon: Sun,
    title: 'Perfecte Match voor Maastricht',
    description: 'Klimaatoplossingen afgestemd op de unieke architectuur van Maastrichtse panden',
  },
  {
    icon: Leaf,
    title: 'Duurzaam & Efficiënt',
    description: 'Optimaal rendement van uw zonnepanelen met slimme energieverdeling',
  },
  {
    icon: Shield,
    title: 'Lokale Expertise',
    description: 'Jarenlange ervaring met installaties in monumentale en moderne panden',
  },
  {
    icon: Snowflake,
    title: 'Maatwerk Oplossingen',
    description: 'Aangepast aan de specifieke eisen van uw Maastrichtse woning of bedrijfspand',
  },
];

export default function Benefits() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Specialist in Maastricht & Omgeving</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ontdek waarom steeds meer Maastrichtenaren kiezen voor onze klimaatoplossingen
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <benefit.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}