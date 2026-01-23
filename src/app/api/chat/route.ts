import { NextRequest, NextResponse } from "next/server";

// System prompt for the heritage assistant
const SYSTEM_PROMPT = `You are a knowledgeable and friendly heritage travel assistant for GUenARK, a tourism platform focused on India's cultural heritage.

Your role is to:
1. Help travelers plan their trips to heritage destinations
2. Provide information about historical sites, temples, forts, and cultural landmarks
3. Recommend local experiences, artisans, and community tourism options
4. Share cultural etiquette, safety tips, and respectful travel practices
5. Suggest itineraries based on user preferences and time constraints

Important guidelines:
- Always promote responsible and sustainable tourism
- Respect local cultures and traditions in your recommendations
- Be honest about limitations - don't make up information
- Include practical tips like best visiting times, dress codes, and entry fees when relevant
- Encourage travelers to support local communities and artisans
- Be concise but informative

Focus areas:
- Hampi (Vijayanagara Empire ruins)
- Varanasi (spiritual capital)
- Jaipur (Rajput heritage)
- Khajuraho (temple architecture)
- Mahabalipuram (Pallava dynasty)
- Ajanta & Ellora (rock-cut caves)

When uncertain, acknowledge it and suggest reliable sources or recommend speaking with local guides.`;

// Simulated responses for demo mode
function getSimulatedResponse(query: string): string {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("plan") || lowerQuery.includes("day") || lowerQuery.includes("itinerary")) {
        return `Here's a suggested day plan for Hampi:

🌅 **Morning (6-9 AM)**
Start at Virupaksha Temple for sunrise and morning prayers

🏛️ **Mid-Morning (9-12 PM)**
• Explore Hampi Bazaar
• Climb Hemakuta Hill for panoramic views
• Visit the Monolithic Bull (Nandi)

🍽️ **Lunch (12-1 PM)**
Try local South Indian cuisine at Mango Tree Restaurant

🏰 **Afternoon (2-5 PM)**
• Vittala Temple Complex (Stone Chariot & Musical Pillars)
• Royal Enclosure area

🌄 **Evening (5-7 PM)**
Sunset from Matanga Hill (30-min climb, worth it!)

💡 **Tips:**
• Carry water and sun protection
• Wear comfortable walking shoes
• Dress modestly for temple visits`;
    }

    if (lowerQuery.includes("stay") || lowerQuery.includes("hotel") || lowerQuery.includes("where to stay")) {
        return `Here are my top accommodation recommendations in Hampi:

🏡 **Budget-Friendly (₹500-1,500/night)**
• Goan Corner - Hippie Island
• Rocky Guest House - Near Virupaksha
• Shanthi Guest House

🌴 **Mid-Range (₹1,500-4,000/night)**
• Clarks Inn Hampi
• Kishkinda Heritage Resort
• Hampi's Boulders

✨ **Premium (₹5,000+/night)**
• Evolve Back - Luxury heritage resort
• Orange County Kabini

📍 I recommend staying on Hippie Island (Virupapur Gadde) side for a peaceful, backpacker-friendly vibe, or near Hampi Bazaar for easy temple access.

Would you like more details about any of these options?`;
    }

    if (lowerQuery.includes("near") || lowerQuery.includes("visit") || lowerQuery.includes("places") || lowerQuery.includes("see")) {
        return `Must-visit heritage sites in Hampi:

🛕 **Virupaksha Temple** (Free Entry)
Living temple since 7th century. Don't miss the camera obscura effect!

🏛️ **Vittala Temple Complex** (₹40)
Home to the iconic Stone Chariot and 56 musical pillars.

🏰 **Royal Enclosure** (₹40)
Underground chamber, stepped tank, and palace ruins.

🌄 **Matanga Hill** (Free)
Highest point - best sunrise/sunset views of the ruins.

💎 **Lotus Mahal** (₹40)
Beautiful Indo-Islamic architecture in the Zenana Enclosure.

🐘 **Elephant Stables** (Included with Royal Enclosure)
11 domed chambers that housed the royal elephants.

Would you like me to create an itinerary combining these sites?`;
    }

    if (lowerQuery.includes("reach") || lowerQuery.includes("how to get") || lowerQuery.includes("transport")) {
        return `How to reach Hampi:

✈️ **By Air**
Nearest airport: Hubli (143 km) or Belgaum (145 km)
Taxi to Hampi: ₹2,500-3,500 (~3 hours)

🚂 **By Train**
Nearest station: Hospet Junction (13 km)
Major connections from Bangalore, Hyderabad, Goa
Auto to Hampi: ₹150-300 (~20 mins)

🚌 **By Bus**
Overnight buses from:
• Bangalore (7-8 hrs) - ₹600-900
• Goa (8 hrs) - ₹700-1,000
• Hyderabad (8 hrs) - ₹700-900

🚗 **Self-Drive**
From Bangalore: NH48, ~350 km, 6-7 hours
Good road conditions, scenic route

Need help planning your arrival?`;
    }

    if (lowerQuery.includes("tip") || lowerQuery.includes("etiquette") || lowerQuery.includes("dress") || lowerQuery.includes("respect")) {
        return `Cultural tips for visiting Hampi's heritage sites:

👗 **Dress Code**
• Cover shoulders and knees at temples
• Remove footwear at temple entrances
• Avoid revealing clothing

📸 **Photography**
• No photos inside main sanctums
• Flash photography often restricted
• Ask before photographing locals

🙏 **Temple Etiquette**
• Walk clockwise around shrines
• Don't point feet toward deities
• Maintain silence in prayer areas

🌿 **Environmental Responsibility**
• No climbing on ruins or monuments
• Carry reusable water bottles
• Take your trash with you

⏰ **Timing**
• Temples: 6 AM - 6 PM
• Best light for photos: sunrise/sunset
• Avoid afternoon heat (12-3 PM)

Would you like specific tips for any particular site?`;
    }

    return `I'd be happy to help you explore India's heritage! I can assist with:

• **Trip Planning** - Create custom itineraries
• **Places to Visit** - Heritage sites, temples, forts
• **How to Reach** - Transport options and tips
• **Where to Stay** - Hotels, homestays, resorts
• **Cultural Tips** - Etiquette and dress codes
• **Local Experiences** - Artisans, guides, community tourism

What would you like to know about? Feel free to ask about specific destinations like Hampi, Varanasi, Jaipur, or any other heritage site!`;
}

export async function POST(request: NextRequest) {
    try {
        const { message, context, sessionId } = await request.json();

        if (!message) {
            return NextResponse.json(
                { success: false, error: "Message is required" },
                { status: 400 }
            );
        }

        // Check if OpenAI API key is configured
        if (!process.env.OPENAI_API_KEY) {
            // Return simulated response for demo
            return NextResponse.json({
                success: true,
                data: {
                    message: getSimulatedResponse(message),
                    sessionId: sessionId || crypto.randomUUID(),
                },
            });
        }

        // Dynamically import OpenAI only when needed
        const OpenAI = (await import("openai")).default;
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // Build messages array
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: SYSTEM_PROMPT },
        ];

        // Add context if provided
        if (context) {
            messages.push({
                role: "system",
                content: `Current context: User is viewing ${context.destination || "the platform"}. ${context.poi ? `They are interested in ${context.poi}.` : ""}`,
            });
        }

        // Add user message
        messages.push({ role: "user", content: message });

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.7,
            max_tokens: 500,
        });

        const responseMessage = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

        return NextResponse.json({
            success: true,
            data: {
                message: responseMessage,
                sessionId: sessionId || crypto.randomUUID(),
            },
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to process chat message" },
            { status: 500 }
        );
    }
}

// Force route to be dynamic
export const dynamic = "force-dynamic";
