import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import HomePage from '../page';
import React from 'react';

// Mock Lucide icons
vi.mock('lucide-react', async () => {
    return {
        Sparkles: ({ className }: { className?: string }) => <span data-testid="sparkles-icon" className={className} />,
        Compass: ({ className }: { className?: string }) => <span data-testid="compass-icon" className={className} />,
        User: ({ className }: { className?: string }) => <span data-testid="user-icon" className={className} />,
        Search: () => <span />,
        MapPin: () => <span />,
        Calendar: () => <span />,
        Users: () => <span />,
        Mountain: () => <span />,
        TreePine: () => <span />,
        Waves: () => <span />,
        Tent: () => <span />,
        Camera: () => <span />,
        Star: () => <span />,
        ArrowRight: () => <span />,
        ChevronDown: () => <span />,
        Heart: () => <span />,
        Play: () => <span />,
        Leaf: () => <span />,
        Bird: () => <span />,
    };
});

// Mock next/link
vi.mock('next/link', () => {
    return {
        default: ({ children, href, "data-testid": testId }: { children: React.ReactNode, href: string, "data-testid"?: string }) => (
            <a href={href} data-testid={testId}>{children}</a>
        ),
    };
});

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
    useSession: vi.fn(() => ({ data: null, status: 'unauthenticated' })),
    signIn: vi.fn(),
    signOut: vi.fn(),
}));

describe('HomePage Hero Section', () => {
    it('should render the AI Trip Planner button with correct text and icon', () => {
        render(<HomePage />);

        const aiButton = screen.queryByTestId('ai-planner-link');

        if (!aiButton) {
            throw new Error('AI Trip Planner button with data-testid="ai-planner-link" not found.');
        }

        expect(aiButton.getAttribute('href')).toBe('/ai-trip-planner');
        expect(aiButton.textContent).toContain('AI Trip Planner');

        // Check for sparkles icon INSIDE the button
        expect(within(aiButton).getByTestId('sparkles-icon')).toBeDefined();
    });

    it('should render the Sign In button', () => {
        render(<HomePage />);
        expect(screen.getByText(/Sign In to RhinoRoam/i)).toBeDefined();
    });
});
