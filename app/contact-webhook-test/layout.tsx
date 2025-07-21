import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webhook Test Page',
  robots: 'noindex, nofollow',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}