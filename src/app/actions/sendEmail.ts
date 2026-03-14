'use server';

import { Resend } from 'resend';

// Initialize Resend with your secret API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingDetails {
  clientName: string;
  serviceInterest: string;
  scheduledTime: string;
  phone: string;
  email?: string;
  notes?: string;
}

export async function sendAdminBookingNotification(bookingDetails: BookingDetails) {
  const { clientName, serviceInterest, scheduledTime, phone, email, notes } = bookingDetails;

  try {
    console.log('[Resend] Sending admin booking notification for:', clientName);

    const data = await resend.emails.send({
      from: 'Triverge System <onboarding@resend.dev>',
      to: ['samuel.ministar@gmail.com'],
      subject: `🚨 New Consultation Booked: ${clientName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #212121; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #2d4375;">New Consultation Request</h2>
          <p>A new booking has been made on the Triverge Healthcare website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Patient Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service Interest:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${serviceInterest}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Requested Time:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${scheduledTime}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Intake Notes:</strong></td>
              <td style="padding: 10px;">${notes || 'None provided'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; text-align: center; border-radius: 8px;">
            <a href="https://trivergecare.com/admin" style="background-color: #2ea69a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View in Dashboard</a>
          </div>
        </div>
      `,
    });

    console.log('[Resend] Email sent successfully:', JSON.stringify(data));
    return { success: true, data };
  } catch (error) {
    console.error('[Resend] Failed to send email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/* ──────────── Zoom Confirmation Email ──────────── */

interface ZoomConfirmationDetails {
  clientName: string;
  clientEmail: string;
  serviceType: string;
  scheduledTime: string;
  zoomLink: string;
}

export async function sendZoomConfirmationEmail(details: ZoomConfirmationDetails) {
  const { clientName, clientEmail, serviceType, scheduledTime, zoomLink } = details;

  try {
    console.log('[Resend] Sending Zoom confirmation to:', clientEmail);

    const data = await resend.emails.send({
      from: 'Triverge Healthcare <onboarding@resend.dev>',
      to: [clientEmail],
      subject: `✅ Your Consultation is Confirmed — ${serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #212121; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #2d4375;">Your Consultation is Confirmed!</h2>
          <p>Dear <strong>${clientName}</strong>,</p>
          <p>We're pleased to confirm your upcoming consultation with Triverge Healthcare. Below are your appointment details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Date & Time:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${scheduledTime}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f0faf9; text-align: center; border-radius: 10px; border: 1px solid #d0ede9;">
            <p style="margin: 0 0 15px 0; font-size: 14px; color: #555;">Join your consultation via Zoom:</p>
            <a href="${zoomLink}" style="background-color: #2ea69a; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Join Zoom Meeting</a>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 13px; color: #777;">
              If you need to reschedule or have any questions, please don't hesitate to reach out to us at 
              <a href="tel:+2347053390270" style="color: #2ea69a;">+234 705 3390 270</a>.
            </p>
            <p style="font-size: 13px; color: #999; margin-top: 15px;">
              Warm regards,<br/>
              <strong style="color: #2d4375;">The Triverge Healthcare Team</strong><br/>
              <em>Comfort. Dignity. Expertise.</em>
            </p>
          </div>
        </div>
      `,
    });

    console.log('[Resend] Zoom confirmation sent successfully:', JSON.stringify(data));
    return { success: true, data };
  } catch (error) {
    console.error('[Resend] Failed to send Zoom confirmation:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
