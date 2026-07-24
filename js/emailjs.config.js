/**
 * emailjs.config.js — EmailJS Configuration
 *
 * HOW TO SET UP:
 * 1. Go to https://www.emailjs.com/ and create a free account.
 * 2. Create an Email Service (e.g., Gmail) → copy the Service ID below.
 * 3. Create an Email Template → copy the Template ID below.
 *    In your template, use these variables:
 *      - {{from_name}}    → sender's name
 *      - {{from_email}}   → sender's email
 *      - {{subject}}      → message subject
 *      - {{message}}      → message body
 *      - {{to_name}}      → "Vaddi Ram Charan" (set as default in template)
 * 4. Go to Account → API Keys → copy your Public Key below.
 * 5. Save the file and the contact form will work.
 *
 * NOTE: The Public Key is safe to expose in client-side code.
 * Never put your Private Key here.
 */

window.EMAILJS_CONFIG = {
  PUBLIC_KEY: 'zcVMPSbS6u6UitNBh',    // e.g., 'abc123XYZ...'
  SERVICE_ID: 'service_570eba2',    // e.g., 'service_abc123'
  TEMPLATE_ID: 'template_xoox2hs',  // e.g., 'template_xyz789'
};
