import emailjs from '@emailjs/browser';

// Debug mode for troubleshooting
const DEBUG_MODE = false;

// Initialize EmailJS
emailjs.init({
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "sjJ8kK6U9wFjY0zX9",
});

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_1rruujp";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_rkcpzhg";

// GHL Webhook configuration
const WEBHOOK_URL = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL || "https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f";

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  city?: string;
  message: string;
}

// Send data via EmailJS
const sendViaEmailJS = async (data: EmailData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      city: data.city || '',
      message: data.message,
      contact_number: Math.random() * 100000 | 0,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (DEBUG_MODE) {
      console.log('EmailJS response:', response);
    }

    return response.status === 200;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('EmailJS error:', error);
    }
    return false;
  }
};

// Send data to GHL webhook
const sendToWebhook = async (data: EmailData): Promise<boolean> => {
  try {
    const webhookData = {
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city || '',
        message: data.message
      }
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(webhookData)
    });

    if (DEBUG_MODE) {
      console.log('Webhook response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
    }

    if (!response.ok) {
      if (DEBUG_MODE) {
        const text = await response.text();
        console.error('Webhook error response:', text);
      }
      return false;
    }
    
    return true;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Webhook error:', error);
    }
    return false;
  }
};

// Main send function with dual submission
export const sendEmail = async (data: EmailData): Promise<void> => {
  if (DEBUG_MODE) {
    console.log('Sending email with data:', data);
  }

  // Send to both services in parallel
  const [emailJSSuccess, webhookSuccess] = await Promise.all([
    sendViaEmailJS(data),
    sendToWebhook(data)
  ]);

  if (DEBUG_MODE) {
    console.log('Results:', {
      emailJS: emailJSSuccess,
      webhook: webhookSuccess
    });
  }
  
  // Only throw error if BOTH methods fail
  if (!emailJSSuccess && !webhookSuccess) {
    throw new Error('Failed to send contact form data');
  }
};

// Function to test webhook only (for testing page)
export const sendToWebhookOnly = async (data: EmailData): Promise<void> => {
  const success = await sendToWebhook(data);
  if (!success) {
    throw new Error('Webhook submission failed');
  }
};