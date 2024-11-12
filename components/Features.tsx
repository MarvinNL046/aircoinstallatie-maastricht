'use client';

import { motion } from 'framer-motion';
import { Thermometer, Wind, Sun, Battery } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Innovatieve Klimaatbeheersing voor Maastricht
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ontdek hoe onze oplossingen perfect aansluiten bij het Maastrichtse klimaat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <Sun className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Slim Energiebeheer in Maastricht
                </h3>
                <p className="text-muted-foreground">
                  Profiteer maximaal van uw zonnepanelen met onze slimme klimaatsystemen, perfect afgestemd op het Limburgse klimaat.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Battery className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Zuinig & Effectief
                </h3>
                <p className="text-muted-foreground">
                  Speciaal ontwikkeld voor de karakteristieke woningen van Maastricht, met behoud van authenticiteit en optimaal comfort.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Thermometer className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Lokale Klimaatexpertise
                </h3>
                <p className="text-muted-foreground">
                  Onze systemen zijn specifiek afgestemd op het microklimaat van Maastricht en omgeving.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&q=80"
              alt="Airconditioning installatie in Maastricht"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}