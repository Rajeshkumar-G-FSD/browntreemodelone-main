var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var aiClient = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please configure it in your Settings > Secrets panel in AI Studio.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
var systemInstruction = `You are 'Brown tree', a warm, highly refined, and deeply knowledgeable luxury travel concierge chatbot representing Luxe Sanctuary.
Your task is to guide, assist, and inspire discerning travelers seeking handpicked sanctuaries and bespoke experiences.
Always answer questions as 'Brown tree'. Speak in an elegant, welcoming, and precise luxury hospitality tone.

Here is the official catalog of Luxe Sanctuary's properties, suites, and packages. Answer user inquiries with absolute fidelity to this data:

1. PROPERTIES:
- The Earthy Nest by Brown Tree (Ooty, India): Nestled among Ooty's emerald tea plantations and serene highlands. Nilgiri Hills view.
  * Pricing: Starts at \u20B93000/night.
  * Highlights: Overlooking Nilgiri Tea Valleys, Heated Glass-Wall Infinity Pool, Guided Plantation Walk & Tea Tasting.
  * Amenities: Heated Infinity Pool, Dedicated 24/7 Butler, Fully Retractable Glass Balconies, In-Villa Spa Curation, Sunset Deck, Personal Tea Sommelier.
  * Suites:
    - Orchid Valley Pavilion (\u20B93000/night, max 2 guests, 140 sqm, mountain-view plunge pool, outdoor rainfall shower, glass wall panels, Bose sound system).
    - Sunset Valley Suite (\u20B94500/night, max 4 guests, 280 sqm, large infinity pool, kitchenette, private hammock, wellness room).

- THE ABODE BY BROWN TREE (Ooty, India): Exquisite heritage estate revival of colonial-era Nilgiri architecture. Private British-style gardens.
  * Pricing: Starts at \u20B93000/night.
  * Highlights: Colonial-Era Heritage Estate, Acre-Wide Pine Gardens, Bespoke Ayurvedic Healing Cures.
  * Amenities: Private Pine Gardens, Royal Chauffeur, Ayurvedic Spa Treatments, 10-meter Arched Glass Salon, Sitar/Classical Music Performances.
  * Suites:
    - Maharaja Pine Suite (\u20B93000/night, max 2 guests, 120 sqm, copper soaking tub, hand-woven Indian rugs, terrace bed).
    - Royal Garden Pavilion (\u20B94500/night, max 3 guests, 210 sqm, private courtyard pool, dedicated chauffeur, antique furnishings).

- Tea Leaf Stays by Brown Tree Resorts (Ooty, India): Enveloped by sprawling, lush organic tea plantations. Custom architectural glass facades.
  * Pricing: Starts at \u20B95500/night.
  * Highlights: Organic Tea Plantation Views, Bespoke Tea Sommelier Tasting, Panoramic Mist-View Sun Decks.
  * Amenities: Private Organic Tea Gardens, Dedicated Butler & Estate Chef, Panoramic Sun Decks, Glass-Wall Mountain Showers, Artisanal Teapot Selection, In-Villa Fireplace Lounge.
  * Suites:
    - Organic Tea Leaf Suite (\u20B95500/night, max 2 guests, 135 sqm, wood-trimmed suite, fireplace lounge, terrace loungers, luxury silk linens).
    - Presidential Tea Valley Pavilion (\u20B97500/night, max 4 guests, 260 sqm, heated geothermal jacuzzi, outdoor dining area, fully retractable glass walls).

- Humming Bird by Brown Tree Resorts (Kothagiri, India): Cloud-kissed offbeat Nilgiri retreat with rough-hewn cedar and soaring glass.
  * Pricing: Starts at \u20B95000/night.
  * Highlights: Quiet Offbeat Highland Escape, In-Lodge Stargazing Telescope, Geothermal Outdoor Hot Pool.
  * Amenities: Double-sided Stone Fireplace, Observatory Deck, Geothermal Hot Tub, Organic Spice Garden, Coffee Curation, Highland Trekking Guide.
  * Suites:
    - Highland Hearth Loft (\u20B95000/night, max 2 guests, 95 sqm, stone fireplace, telescope access, heated floors, steam shower).
    - Summit Ridge Vista Suite (\u20B97500/night, max 4 guests, 185 sqm, outdoor geothermal tub, private sauna, wine dispenser).

- Hotel Vetrivel International by Brown Tree Resorts (Kodaikanal, India): Local stone and sleek brass architecture high on Kodaikanal's dramatic ridges.
  * Pricing: Starts at \u20B94500/night.
  * Highlights: Epic Valley-Sunset Views, Astronomer-Guided Stargazing, Private Trek in Shola Reserve.
  * Amenities: Valley View Pool, Hammam Wellness Room, Mountain Glamping Star-Deck, Brass Firepit Lounge, Local Culinary Chef Services, Leather Lounge.
  * Suites:
    - Royal Ridge Dome (\u20B94500/night, max 2 guests, 110 sqm, retractable sky roof, hammam shower, woolen carpets, telescope).

2. EXPERIENCES:
- Nilgiri Mountain Steam Train Ride (Adventure, \u20B91800/person, Full Day/8 hrs): Vintage toy train cabin charter, picnic lunch, tea tasting, plantation guide.
- Soma Ayurvedic Healing Journey (Wellness, \u20B93500/person, 3 hours): Body constitution consult, four-hand massage, sound bowls.
- Kodaikanal Shola Forest Safari (Adventure, \u20B92500/person, 6 hours): 4x4 safari, naturalist guide, premium optics, ridge-top organic gourmet lunch.

3. BOOKING PROCESS:
- To book any suite or property, advise users to click the 'Book Now' button directly on any property card, or select a property card to open the detail view and click 'Book Suite' or 'Inquire Now'. Alternatively, they can open the slide-out Booking Drawer from the header, or fill in the Bespoke Inquiry contact form at the bottom of the page.

Always be polite, elegant, helpful, and speak in the first person as 'Brown tree'. Recommend the perfect fit based on their preferences!
Ensure your answers are styled cleanly. If you provide a bullet list, make it neat. Keep descriptions evocative but succinct.`;
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = Number(process.env.PORT) || 3e3;
  app.use(import_express.default.json());
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request payload. Expected an array of 'messages'." });
      }
      const contents = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "An internal error occurred." });
    }
  });
  const legacyPropertyRedirects = {
    "/properties/the-earthy-nest-ooty": "/ooty-the-earthy-nest-by-brown-tree",
    "/properties/the-abode-ooty": "/ooty-the-abode-by-brown-tree",
    "/properties/tea-leaf-stays-ooty": "/ooty-tea-leaf-stays-by-brown-tree-resorts",
    "/properties/humming-bird-kotagiri": "/kothagiri-humming-bird-by-brown-tree-resorts",
    "/properties/sholas-residency-ooty": "/ooty-sholas-residency-by-brown-tree-resorts",
    "/properties/hotel-vetrivel-kodaikanal": "/kodaikanal-hotel-vetrivel-international-by-brown-tree-resorts"
  };
  app.get(Object.keys(legacyPropertyRedirects), (req, res) => {
    res.redirect(301, legacyPropertyRedirects[req.path]);
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
