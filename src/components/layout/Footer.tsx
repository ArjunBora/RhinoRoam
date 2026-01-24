'use client';

import Link from 'next/link';
import {
    MapPin, Mail, Phone, Facebook, Instagram, Twitter, Youtube,
    Heart, Leaf
} from 'lucide-react';

/* ============================================
   FOOTER COMPONENT
   Site-wide Footer
   ============================================ */

const footerLinks = {
    discover: [
        { label: 'All Experiences', href: '/experiences' },
        { label: 'Districts', href: '/districts' },
        { label: 'Collections', href: '/collections' },
        { label: 'Festivals', href: '/festivals' },
        { label: 'Plan Trip', href: '/plan' },
    ],
    categories: [
        { label: 'Wildlife Safari', href: '/experiences?collection=wildlife' },
        { label: 'Tea Trails', href: '/experiences?collection=tea' },
        { label: 'River Journeys', href: '/experiences?collection=river' },
        { label: 'Tribal Immersion', href: '/experiences?collection=tribal' },
        { label: 'Hidden Gems', href: '/experiences?collection=hidden' },
    ],
    community: [
        { label: 'Become a Host', href: '/hosts/register' },
        { label: 'Community Hosts', href: '/communities' },
        { label: 'Success Stories', href: '/stories' },
        { label: 'Sustainability', href: '/sustainability' },
    ],
    support: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Safety Guidelines', href: '/safety' },
    ],
    legal: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Cancellation Policy', href: '/cancellation' },
    ]
};

const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/axomconnect', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/axomconnect', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/axomconnect', label: 'Twitter' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/axomconnect', label: 'YouTube' },
];

export default function Footer() {
    return (
        <footer style={{ background: 'var(--bg-card)' }}>
            {/* Gamusa Border */}
            <div className="gamusa-border" />

            {/* Main Footer */}
            <div className="container-custom section-padding-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: 'var(--gradient-tea)' }}
                            >
                                <span className="text-lg font-bold text-white">অ</span>
                            </div>
                            <span
                                className="text-xl font-bold"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                RhinoRoam
                            </span>
                        </Link>
                        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                            Discover Assam through local eyes. Community-powered tourism connecting
                            travelers with authentic experiences.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                                    style={{
                                        background: 'var(--bg-secondary)',
                                        color: 'var(--text-muted)'
                                    }}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Discover */}
                    <div>
                        <h4 className="font-semibold mb-4">Discover</h4>
                        <ul className="space-y-2">
                            {footerLinks.discover.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors hover:text-tea-garden"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            {footerLinks.categories.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors hover:text-tea-garden"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="font-semibold mb-4">Community</h4>
                        <ul className="space-y-2">
                            {footerLinks.community.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors hover:text-tea-garden"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors hover:text-tea-garden"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--tea-garden)' }} />
                                Guwahati, Assam, India
                            </li>
                            <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                <Mail className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                hello@axomconnect.com
                            </li>
                            <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                <Phone className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                                +91 99999 99999
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div
                    className="p-8 rounded-2xl mb-12"
                    style={{ background: 'var(--bg-secondary)' }}
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Subscribe to our newsletter</h3>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Get travel tips, festival updates, and exclusive offers from Assam
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input-field w-64"
                            />
                            <button className="btn-primary whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid var(--border-light)' }}
                >
                    <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span>© 2026 RhinoRoam. All rights reserved.</span>
                        {footerLinks.legal.map((link, idx) => (
                            <span key={link.href} className="flex items-center gap-4">
                                <span className="hidden md:inline">•</span>
                                <Link href={link.href} className="hover:underline">
                                    {link.label}
                                </Link>
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span>Made with</span>
                        <Heart className="w-4 h-4" style={{ color: 'var(--mekhela-red)', fill: 'var(--mekhela-red)' }} />
                        <span>in Assam</span>
                        <Leaf className="w-4 h-4" style={{ color: 'var(--tea-garden)' }} />
                    </div>
                </div>
            </div>
        </footer>
    );
}
