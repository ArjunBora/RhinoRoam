"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, MapPin, Calendar, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    actions?: QuickAction[];
}

interface QuickAction {
    type: "view_poi" | "view_destination" | "plan_trip";
    label: string;
    href: string;
}

const QUICK_PROMPTS = [
    { icon: Calendar, label: "Plan my day", prompt: "Plan a perfect day trip for me" },
    { icon: MapPin, label: "Nearby places", prompt: "What are the must-visit places nearby?" },
    { icon: Home, label: "Where to stay", prompt: "Recommend good places to stay" },
];

const INITIAL_MESSAGE: Message = {
    id: "welcome",
    role: "assistant",
    content: "Namaste! 🙏 I'm your heritage travel assistant. I can help you:\n\n• Plan your itinerary\n• Find places to visit\n• Get cultural insights\n• Recommend stays & guides\n\nHow can I help you explore today?",
    timestamp: new Date(),
};

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: messageText,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Simulated response for MVP - replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: getSimulatedResponse(messageText),
                timestamp: new Date(),
                actions: getSimulatedActions(messageText),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl transition-all duration-300",
                    "bg-gradient-heritage text-white flex items-center justify-center",
                    "hover:scale-110 hover:shadow-2xl",
                    isOpen && "scale-0 opacity-0"
                )}
            >
                <MessageCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--success)] rounded-full animate-pulse" />
            </button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)]",
                    "bg-[var(--bg-card)] rounded-2xl shadow-2xl overflow-hidden",
                    "flex flex-col transition-all duration-300 origin-bottom-right",
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="bg-gradient-heritage p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Heritage Assistant</h3>
                            <p className="text-xs text-white/80">AI-powered travel guide</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex",
                                message.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[85%] rounded-2xl px-4 py-3",
                                    message.role === "user"
                                        ? "bg-gradient-heritage text-white rounded-br-sm"
                                        : "bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-bl-sm"
                                )}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                {message.actions && message.actions.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {message.actions.map((action, index) => (
                                            <a
                                                key={index}
                                                href={action.href}
                                                className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                            >
                                                {action.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-[var(--bg-secondary)] rounded-2xl rounded-bl-sm px-4 py-3">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                {messages.length === 1 && (
                    <div className="px-4 pb-2">
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                            {QUICK_PROMPTS.map((prompt) => {
                                const Icon = prompt.icon;
                                return (
                                    <button
                                        key={prompt.label}
                                        onClick={() => handleSend(prompt.prompt)}
                                        className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-secondary)] rounded-full text-sm whitespace-nowrap hover:bg-[var(--border-light)] transition-colors"
                                    >
                                        <Icon className="w-4 h-4 text-[var(--heritage-gold)]" />
                                        <span>{prompt.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-[var(--border-light)]">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about heritage, places, tips..."
                            className="flex-1 px-4 py-3 bg-[var(--bg-secondary)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--heritage-gold)]"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="p-3 bg-gradient-heritage text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                    <p className="text-[10px] text-[var(--text-muted)] text-center mt-2">
                        AI assistance for travel planning • Respect local customs
                    </p>
                </div>
            </div>
        </>
    );
}

// Simulated responses for MVP demo
function getSimulatedResponse(query: string): string {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("plan") || lowerQuery.includes("day")) {
        return `Here's a suggested day plan for Hampi:\n\n🌅 **Morning (6-9 AM)**\nStart at Virupaksha Temple for sunrise\n\n🏛️ **Mid-Morning (9-12 PM)**\nExplore Hampi Bazaar & Hemakuta Hill\n\n🍽️ **Lunch (12-1 PM)**\nTry local cuisine at Mango Tree Restaurant\n\n🏰 **Afternoon (2-5 PM)**\nVisit Vittala Temple & Stone Chariot\n\n🌄 **Evening (5-7 PM)**\nSunset at Matanga Hill\n\n💡 **Tip:** Carry water, wear comfortable shoes, and dress modestly for temples.`;
    }

    if (lowerQuery.includes("stay") || lowerQuery.includes("hotel")) {
        return `Here are my top recommendations for stays in Hampi:\n\n🏡 **Budget-Friendly**\n• Goan Corner - ₹800/night\n• Rocky Guest House - ₹1,000/night\n\n🌴 **Mid-Range**\n• Clarks Inn Hampi - ₹2,500/night\n• Kishkinda Heritage Resort - ₹3,500/night\n\n✨ **Premium**\n• Evolve Back - ₹15,000/night\n\nI recommend staying on the Hippie Island side for a peaceful experience!`;
    }

    if (lowerQuery.includes("nearby") || lowerQuery.includes("visit") || lowerQuery.includes("places")) {
        return `Must-visit places in Hampi:\n\n🛕 **Virupaksha Temple** - Living temple, 7th century\n🏛️ **Vittala Temple** - Famous Stone Chariot\n🏰 **Royal Enclosure** - Ancient palace ruins\n🌄 **Matanga Hill** - Best sunset point\n💎 **Lotus Mahal** - Indo-Islamic architecture\n🐘 **Elephant Stables** - Royal elephant housing\n\nWould you like detailed information about any of these?`;
    }

    return `That's a great question! I can help you with:\n\n• Planning your itinerary\n• Finding heritage sites to visit\n• Recommending local stays\n• Cultural tips and etiquette\n• Transportation options\n\nWhat would you like to know more about?`;
}

function getSimulatedActions(query: string): QuickAction[] {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("plan") || lowerQuery.includes("day")) {
        return [
            { type: "plan_trip", label: "Create Itinerary", href: "/plan" },
            { type: "view_destination", label: "Explore Map", href: "/explore" },
        ];
    }

    if (lowerQuery.includes("stay") || lowerQuery.includes("hotel")) {
        return [
            { type: "view_destination", label: "View All Stays", href: "/destinations/hampi?tab=stays" },
        ];
    }

    if (lowerQuery.includes("nearby") || lowerQuery.includes("visit")) {
        return [
            { type: "view_poi", label: "View on Map", href: "/explore" },
            { type: "view_destination", label: "All POIs", href: "/destinations/hampi?tab=pois" },
        ];
    }

    return [];
}
