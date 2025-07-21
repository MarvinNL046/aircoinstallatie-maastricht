import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bedankt voor uw bericht!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            We hebben uw aanvraag ontvangen en nemen zo spoedig mogelijk contact met u op.
          </p>
          
          <div className="space-y-2 mb-8">
            <p className="text-sm text-gray-500">
              U kunt ons ook direct bereiken via:
            </p>
            <p className="font-medium text-gray-900">
              Tel: 06-12345678
            </p>
            <p className="font-medium text-gray-900">
              Email: info@staycoolairco.nl
            </p>
          </div>
          
          <Link href="/">
            <Button className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" /> Terug naar Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}