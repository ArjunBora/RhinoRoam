/**
 * Contact Form Service
 * 
 * Handles saving contact form submissions to Firestore.
 * Uses the modular Firebase SDK syntax.
 */

import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';

// ===========================================
// Types
// ===========================================
export interface ContactMessage {
    name: string;
    email: string;
    subject?: string;
    message: string;
    phone?: string;
}

export interface ContactMessageWithMeta extends ContactMessage {
    createdAt: Timestamp;
    status: 'new' | 'read' | 'replied';
    source: string;
}

// ===========================================
// Service Functions
// ===========================================

/**
 * Save a contact form submission to Firestore
 * 
 * @param data - The contact form data
 * @returns The document ID of the saved message
 * @throws Error if the save operation fails
 * 
 * @example
 * ```ts
 * const docId = await saveContactMessage({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   message: 'Hello from Assam!'
 * });
 * ```
 */
export async function saveContactMessage(data: ContactMessage): Promise<string> {
    try {
        const messagesRef = collection(db, 'messages');

        const docRef = await addDoc(messagesRef, {
            ...data,
            createdAt: serverTimestamp(),
            status: 'new',
            source: 'website-contact-form',
        });

        console.log('Contact message saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving contact message:', error);
        throw new Error('Failed to save contact message. Please try again later.');
    }
}

/**
 * Validate contact form data before submission
 * 
 * @param data - The contact form data to validate
 * @returns An object with isValid flag and any error messages
 */
export function validateContactData(data: Partial<ContactMessage>): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Please provide a valid email address');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}
