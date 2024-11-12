'use client';

import * as React from 'react';
import { useToast as useToastOriginal } from '@/components/ui/use-toast';

export function useToast() {
  const { toast } = useToastOriginal();
  return { toast };
}