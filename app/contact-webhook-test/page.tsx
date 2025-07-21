"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import { sendToWebhookOnly } from '@/utils/email';
import type { EmailData } from '@/utils/email';

export default function WebhookTestPage() {
  const [formData, setFormData] = useState<EmailData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      await sendToWebhookOnly(formData);
      setStatus('success');
      // Don't reset form on test page to make re-testing easier
    } catch (error) {
      console.error('Webhook test failed:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Webhook Test Page
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            This page tests only the GHL webhook integration (EmailJS is disabled).
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                name="name"
                placeholder="Test Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="test@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="0612345678"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Input
                name="city"
                placeholder="Maastricht"
                value={formData.city}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                name="message"
                placeholder="Test message for webhook"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              disabled={status === 'sending'}
              className="w-full"
            >
              {status === 'sending' ? (
                'Sending to Webhook...'
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Test Webhook
                </>
              )}
            </Button>
          </form>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Webhook Success!</p>
                <p className="text-green-700 text-sm mt-1">
                  Data was successfully sent to the GHL webhook.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Webhook Failed</p>
                <p className="text-red-700 text-sm mt-1">
                  {errorMessage || 'Failed to send data to webhook'}
                </p>
              </div>
            </div>
          )}

          {/* Debug Info */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-xs font-mono text-gray-600">
              Webhook URL: {process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL?.substring(0, 50)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}