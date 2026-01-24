
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from '../page';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock Next.js hooks
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
}));

// Mock NextAuth
vi.mock('next-auth/react', () => ({
    signIn: vi.fn(),
}));

describe('SignInPage', () => {
    const mockRouter = {
        push: vi.fn(),
        refresh: vi.fn(),
    };

    const mockSearchParams = {
        get: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (useRouter as any).mockReturnValue(mockRouter);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (useSearchParams as any).mockReturnValue(mockSearchParams);
    });

    it('renders the sign in form by default', () => {
        render(<SignInPage />);

        expect(screen.getByRole('heading', { name: /welcome back/i })).toBeDefined();
        expect(screen.getByPlaceholderText(/you@example.com/i)).toBeDefined();
        expect(screen.getByPlaceholderText(/••••••••/i)).toBeDefined();

        // Check for Sign In button
        const signInButton = screen.getByRole('button', { name: /sign in/i });
        expect(signInButton).toBeDefined();
    });

    it('handles sign in submission correctly', async () => {
        render(<SignInPage />);

        const emailInput = screen.getByPlaceholderText(/you@example.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const signInButton = screen.getByRole('button', { name: /sign in/i });

        // Fill form
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Mock signIn response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (signIn as any).mockResolvedValue({ error: null, ok: true });

        // Submit
        fireEvent.click(signInButton);

        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith('credentials', {
                email: 'test@example.com',
                password: 'password123',
                redirect: false,
            });
        });

        expect(mockRouter.push).toHaveBeenCalled();
    });

    it('toggles to sign up mode', () => {
        render(<SignInPage />);

        // Find toggle button
        const signUpLink = screen.getByRole('button', { name: /sign up/i });
        fireEvent.click(signUpLink);

        // Check validation of text change
        expect(screen.getByRole('heading', { name: /create your account/i })).toBeDefined();
        expect(screen.getByPlaceholderText(/your name/i)).toBeDefined();

        // Check button text change
        expect(screen.getByRole('button', { name: /create account/i })).toBeDefined();
    });

    it('shows error on failed login', async () => {
        render(<SignInPage />);

        const emailInput = screen.getByPlaceholderText(/you@example.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const signInButton = screen.getByRole('button', { name: /sign in/i });

        fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });

        // Mock failed signIn
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (signIn as any).mockResolvedValue({ error: 'Invalid credentials' });

        fireEvent.click(signInButton);

        await waitFor(() => {
            expect(screen.getByText(/invalid email or password/i)).toBeDefined();
        });
    });
});
