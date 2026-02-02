
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInPage from './page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        refresh: vi.fn(),
    }),
    useSearchParams: () => ({
        get: (key: string) => {
            if (key === 'callbackUrl') return '/dashboard';
            if (key === 'error') return null;
            return null;
        },
    }),
}));

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
    signIn: vi.fn(),
}));

// Mock next/image
vi.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

// Mock lucide-react icons to avoid rendering issues in tests
vi.mock('lucide-react', () => ({
    Compass: () => <div data-testid="compass-icon" />,
    Mail: () => <div data-testid="mail-icon" />,
    Lock: () => <div data-testid="lock-icon" />,
    User: () => <div data-testid="user-icon" />,
    ArrowRight: () => <div data-testid="arrow-right-icon" />,
    Eye: () => <div data-testid="eye-icon" />,
    EyeOff: () => <div data-testid="eye-off-icon" />,
    Loader2: () => <div data-testid="loader-icon" />,
}));

describe('SignInPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    it('renders login form by default', () => {
        render(<SignInPage />);

        expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
        // Name field should NOT be present in login mode
        expect(screen.queryByPlaceholderText(/Your name/i)).not.toBeInTheDocument();

        // Check for Sign In button - using getByRole for button within the form
        const submitButton = screen.getByRole('button', { name: /sign in/i });
        expect(submitButton).toBeInTheDocument();
    });

    it('toggles to register mode', () => {
        render(<SignInPage />);

        // Find the "Sign up" toggle button
        const signUpToggle = screen.getByRole('button', { name: /sign up/i });
        fireEvent.click(signUpToggle);

        // Name field SHOULD be present in register mode
        expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
        const createAccountButton = screen.getByRole('button', { name: /create account/i });
        expect(createAccountButton).toBeInTheDocument();
    });

    it('handles login submission', async () => {
        const { signIn } = await import('next-auth/react');
        (signIn as any).mockResolvedValue({ error: null });

        render(<SignInPage />);

        fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
            target: { value: 'password123' },
        });

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith('credentials', {
                email: 'test@example.com',
                password: 'password123',
                redirect: false,
            });
        });
    });

    it('displays error on failed login', async () => {
        const { signIn } = await import('next-auth/react');
        (signIn as any).mockResolvedValue({ error: 'Invalid credentials' });

        render(<SignInPage />);

        fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
            target: { value: 'wrongpass' },
        });

        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
        });
    });

    it('handles registration flow', async () => {
        // Mock successful registration API call
        (global.fetch as any).mockResolvedValue({
            json: async () => ({ success: true }),
        });

        const { signIn } = await import('next-auth/react');
        (signIn as any).mockResolvedValue({ error: null });

        render(<SignInPage />);

        // Switch to register
        const signUpToggle = screen.getByRole('button', { name: /sign up/i });
        fireEvent.click(signUpToggle);

        // Fill form
        fireEvent.change(screen.getByPlaceholderText(/Your name/i), {
            target: { value: 'Test User' },
        });
        fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), {
            target: { value: 'newuser@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
            target: { value: 'newpassword123' },
        });

        // Submit
        const createAccountButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(createAccountButton);

        await waitFor(() => {
            // Check if registration API was called
            expect(global.fetch).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    name: 'Test User',
                    email: 'newuser@example.com',
                    password: 'newpassword123',
                }),
            }));

            // Check if auto-login was triggered
            expect(signIn).toHaveBeenCalledWith('credentials', expect.objectContaining({
                email: 'newuser@example.com',
                password: 'newpassword123',
            }));
        });
    });
});
