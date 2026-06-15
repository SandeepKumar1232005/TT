import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

// Setup DOMPurify on the server side using jsdom
const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

/**
 * Sanitizes input text to prevent XSS / Script injection.
 */
export function sanitizeText(text: string | undefined | null): string {
  if (text === undefined || text === null) return '';
  return purify.sanitize(String(text).trim());
}

/**
 * Validates that an Indian phone number is exactly 10 digits.
 */
export function validatePhone(phone: string | undefined | null): boolean {
  if (!phone) return false;
  // Strip non-digit characters
  const cleaned = String(phone).replace(/\D/g, '');
  return cleaned.length === 10;
}

/**
 * Checks for missing required fields in a request body.
 * Returns an array of missing field names.
 */
export function validateRequiredFields(
  body: Record<string, any>,
  requiredFields: string[]
): string[] {
  const missing: string[] = [];
  for (const field of requiredFields) {
    const value = body[field];
    if (value === undefined || value === null || String(value).trim() === '') {
      missing.push(field);
    }
  }
  return missing;
}
