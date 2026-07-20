/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Experience, Review, Destination } from "./types";
import ootyDestImage from "./assets/images/ooty.png";
import kothagiriDestImage from "./assets/images/kothagiri.jpg";
import kodaikanaldestImage from "./assets/images/kodaikanal.jpg";
import theAbodeMain from "./assets/images/theabodebybrowntree.png";
import theAbodeGarden from "./assets/images/theabodebybrowntree_gareden.jpg";
import theAbodeInterior from "./assets/images/theabodebybrowntree_.jpg";
import theAbodeDining from "./assets/images/theabodebybrowntree_dining.jpg";
import theAbodeCot from "./assets/images/theabodebybrowntree_cot.jpg";
import theAbodeDoubleHot from "./assets/images/theabodebybrowntree_doublehot.jpg";
import teaLeafMain from "./assets/images/Tealeaf.png";
import teaLeafInterior from "./assets/images/Tealeaf_.jpeg";
import teaLeafCampfire from "./assets/images/Tealeaf_campfire.webp";
import teaLeafSteps from "./assets/images/Tealeaf_steps.webp";
import teaLeafBalconyChair from "./assets/images/Tealeaf_balcony_chair.webp";
import teaLeafBalconySun from "./assets/images/Tealeaf_balcony_sun.webp";
import teaLeafBalcony from "./assets/images/Tealeaf_balcony.webp";
import teaLeafDinning from "./assets/images/Tealeaf_dinning.webp";
import teaLeafNaturalA from "./assets/images/Tealeaf_natural_.webp";
import teaLeafNaturalB from "./assets/images/Tealeaf_natural.webp";
import teaLeafBedroomsA from "./assets/images/Tealeaf.bed_rooms__.webp";
import teaLeafBedroomsB from "./assets/images/Tealeaf.bed_rooms_.webp";
import teaLeafBedA from "./assets/images/Tealeaf_bed_.webp";
import teaLeafBedroom from "./assets/images/Tealeaf_bedroom.webp";
import teaLeafBedB from "./assets/images/Tealeaf_bed.webp";
import hummingBirdMain from "./assets/images/HummingBird.png";
import hummingBirdNightview from "./assets/images/HummingBird_nightview.jpeg";
import hummingBirdDoublebed from "./assets/images/HummingBird_doublebed.jpeg";
import hummingBirdSinglebed from "./assets/images/HummingBird_singlebed.jpeg";
import hummingBirdSinglebedA from "./assets/images/HummingBird_Singlebed_.jpeg";
import hummingBirdParking from "./assets/images/HummingBird_parking.jpeg";
import hummingBirdDining from "./assets/images/HummingBird_dining.jpeg";
import hummingBirdBrowntree from "./assets/images/hummingbird_browntre_resorts_kothagiri.png";
import solarMain from "./assets/images/solar.png";
import solarSinglebed from "./assets/images/solar_singlebed.jpeg";
import solarSinglebedA from "./assets/images/solar_singlebed_.jpeg.jpeg";
import solarDoublebed from "./assets/images/solar_doublebed.jpeg";
import solarSinglebedPremium from "./assets/images/solar_singlebed_premium.jpeg";
import solarSinglebedRed from "./assets/images/solar_singlebed_red.jpeg";
import solarSinglebedDulex from "./assets/images/solar_singlebed_dulex.jpeg";
import solarSinglebedSuite from "./assets/images/solar_singlebed_suite.jpeg";
import solarSinglebedSuiteA from "./assets/images/solar_singlebed_suite_.jpeg";
import solarSinglebedSuiteRed from "./assets/images/solar_singlebed_suite_red.jpeg";
import solarSinglebedSuiteRedA from "./assets/images/solar_singlebed_suite_red_.jpeg";
import solarSinglebedSuiteGreen from "./assets/images/solar_singlebed_suite_green.jpeg";
import solarSinglebedSuitePink from "./assets/images/solar_singlebed_suite_pink.jpeg";
import solarDinning from "./assets/images/solar_dinning.jpeg";
import solarRestroom from "./assets/images/solar_restroom.jpeg";
import vetrivelMain from "./assets/images/vetrivel_inn.png";
import vetrivelFrontview from "./assets/images/vetrivel_inn_frontview.jpg";
import vetrivelRestroom from "./assets/images/vetrivel_inn_restroom.jpg";
import vetrivelBedNightview from "./assets/images/vetrivel_inn_bed_nightview.jpg";
import vetrivelDinning from "./assets/images/vetrivel_inn_dinning.jpg";
import vetrivelDoublesbed from "./assets/images/vetrivel_inn_doublesbed.jpg";
import vetrivelSuiteBed from "./assets/images/vetrivel_inn_suite_bed.jpg";
import vetrivelBedRed from "./assets/images/vetrivel_inn_bed_red.jpg";
import vetrivelBed from "./assets/images/vetrivel_inn_bed.jpg";
import earthyNestFront from "./assets/images/earthynest_frontviiew.png";
import earthyNestBedroom from "./assets/images/earthynest_bedroom.jpeg";
import earthyNestBrestosgroom from "./assets/images/earthynest_brestosgroom.jpeg";
import earthyNestGarden from "./assets/images/earthynest_garden.jpeg";

export const PROPERTIES: Property[] = [
  {
    id: "azure-orchid",
    name: "The Earthy Nest by Brown Tree",
    type: "Ooty",
    location: "Ooty, India",
    region: "Nilgiri Hills",
    price: 3000,
    rating: 4.9,
    reviewCount: 42,
    image: earthyNestFront,
    gallery: [
      earthyNestFront,
      earthyNestBedroom,
      earthyNestBrestosgroom,
      earthyNestGarden,
    ],
    description: "Nestled amidst the serene beauty of nature, The Earthy Nest by Brown Tree offers the perfect escape for travelers seeking peace, comfort, and unforgettable experiences. Surrounded by lush greenery and refreshing mountain air, our homestay creates a warm and welcoming atmosphere where guests can truly relax and reconnect with nature.\n\nWake up to scenic views, enjoy peaceful morning walks, and unwind in thoughtfully designed rooms featuring cozy interiors, comfortable bedding, elegant furnishings, and modern amenities. Every room is equipped with an individual geyser providing 24-hour hot water, ensuring complete comfort at any time of the day.\n\nWhether you're planning a family vacation, a romantic getaway, or a short weekend retreat, our attentive caretaker and friendly staff are always available to make your stay seamless, relaxing, and memorable.",
    highlights: [
      "Overlooking Nilgiri Tea Valleys",
      "Peaceful Nature Retreat",
      "Guided Plantation Walk & Tea Tasting"
    ],
    amenities: [
      "Parking",
      "Wi-Fi",
      "Power Backup",
      "Room Service",
      "Daily Housekeeping",
      "Caretaker Assistance",
      "Kids Play Area"
    ],
    propertyHighlightCards: [
      "Private Room in a Homestay",
      "1 Bedroom",
      "2 Double Beds",
      "Ideal for Couples & Families",
      "Managed by Caretaker",
      "Daily Housekeeping",
      "Peaceful Nature Location",
      "Scenic Balcony",
      "Mountain Views"
    ],
    popularAmenities: [
      "Parking",
      "Wi-Fi",
      "Power Backup",
      "Room Service",
      "Housekeeping",
      "Caretaker Assistance",
      "Kids Play Area"
    ],
    roomAmenities: [
      "Bathroom",
      "Comfortable Seating Area",
      "Private Balcony",
      "Balcony / Terrace",
      "Blackout Curtains",
      "Ceiling Fan",
      "Fireplace",
      "Closet",
      "Sofa",
      "Chair",
      "LED TV",
      "Electric Kettle",
      "Charging Points",
      "International Plug Adapters",
      "24-Hour Hot & Cold Water",
      "Private Bathroom",
      "Bath Towels",
      "Shampoo",
      "Shower Gel",
      "Premium Toiletries",
      "Toilet with Grab Rails",
      "Woollen Blanket",
      "In-room Dining"
    ],
    whyStayFeatures: [
      "Peaceful Natural Surroundings",
      "Comfortable Spacious Rooms",
      "Family Friendly",
      "Ideal for Weekend Getaways",
      "Warm Hospitality",
      "Private Balcony",
      "Scenic Mountain Views",
      "Personalized Guest Service"
    ],
    houseRules: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      rules: [
        "No Smoking inside Rooms",
        "Pets on Request",
        "Family Friendly",
        "Valid Government ID Required"
      ]
    },
    nearbyAttractions: [
      "Ooty Lake",
      "Botanical Garden",
      "Rose Garden",
      "Doddabetta Peak",
      "Tea Museum",
      "Pykara Lake",
      "Nilgiri Mountain Railway"
    ],
    suites: [
      {
        id: "orchid-pavilion",
        name: "1BHK First Floor",
        description: "Elegant mountain-view pavilion boasting floor-to-ceiling glass looking out over the tea estates, with a private warm tub.",
        pricePerNight: 3000,
        maxGuests: 2,
        size: "140 sqm / 1,500 sqft",
        amenities: ["Plunge Pool", "Outdoor Rainfall Shower", "Glass Wall Panels", "Bose Sound System"]
      },
      {
        id: "sunset-valley-suite",
        name: "2BHK First Floor",
        description: "A sprawling mountain-top residence with premium sunset vistas and a private outdoor fireplace setup.",
        pricePerNight: 4500,
        maxGuests: 4,
        size: "280 sqm / 3,010 sqft",
        amenities: ["Large Infinity Pool", "Kitchenette", "Private Hammock", "Sun Loungers", "Wellness Room"]
      }
    ],
    coordinates: { lat: 11.4102, lng: 76.6950 }
  },
  {
    id: "heritage-pine",
    name: "THE ABODE BY BROWN TREE",
    type: "Ooty",
    location: "Ooty, India",
    region: "Nilgiri Hills",
    price: 3000,
    rating: 4.9,
    reviewCount: 118,
    image: theAbodeMain,
    gallery: [
      theAbodeMain,
      theAbodeGarden,
      theAbodeInterior,
      theAbodeDining,
      theAbodeCot,
      theAbodeDoubleHot,
    ],
    description: "THE ABODE BY BROWN TREE RESORTS – French Styled Hillside Villa in Ooty\n\nNestled on a peaceful hillside in Ooty, THE ABODE BY BROWN TREE RESORTS is surrounded by lush greenery and panoramic views of the Nilgiri Mountains. Inspired by elegant French-style architecture, the resort offers a perfect escape from city life while providing modern comforts for couples, families, and leisure travelers.\n\nWhether you're enjoying a relaxing vacation, celebrating special moments, or exploring Ooty's attractions, every stay promises warmth, comfort, and unforgettable memories. Wake up to breathtaking valley and hill views, savour freshly prepared meals in our cozy dining area, and experience the warmth of dedicated hospitality that makes every moment truly special.",
    highlights: [
      "French Styled Hillside Villa",
      "Panoramic Nilgiri Mountain Views",
      "Warm Personalized Hospitality"
    ],
    amenities: [
      "Free Parking",
      "Power Backup",
      "Refrigerator",
      "Housekeeping",
      "Doctor on Call",
      "Luggage Assistance",
      "CCTV Surveillance"
    ],
    propertyHighlightCards: [
      "Quiet Hillside Location",
      "French Styled Architecture",
      "Comfortable Accommodation",
      "Scenic Mountain Views",
      "On-site Dining",
      "Friendly Hospitality",
      "Complimentary Parking",
      "Bonfire Experience"
    ],
    popularAmenities: [
      "Free Parking",
      "Power Backup",
      "Housekeeping",
      "Luggage Assistance",
      "Doctor on Call",
      "CCTV Surveillance",
      "Bonfire"
    ],
    roomAmenities: [
      "Attached Bathroom",
      "LED Television",
      "Sofa",
      "Living Area",
      "Heater (Selected Rooms)",
      "Complimentary Toiletries",
      "Iron & Ironing Board",
      "Dental Kit",
      "Refrigerator",
      "Fresh Towels",
      "Hot Water",
      "Dining Area"
    ],
    whyStayFeatures: [
      "Peaceful Hillside Atmosphere",
      "French Styled Architecture",
      "Beautiful Mountain Views",
      "Family Friendly Stay",
      "Warm Personalized Hospitality",
      "On-site Dining",
      "Comfortable Spacious Rooms",
      "Pickup & Drop Available"
    ],
    houseRules: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      rules: [
        "No Smoking Inside Rooms",
        "Family Friendly",
        "Valid Government ID Required",
        "Pets on Request"
      ]
    },
    nearbyAttractions: [
      "Ooty Lake – 4.8 km",
      "Government Botanical Garden – 1.9 km",
      "Elk Hill – 3.6 km",
      "Tiger Hill – 5 km",
      "Tibetan Market – 1.7 km",
      "ATC Bus Stand – 2.9 km",
      "Udhagamandalam Railway Station – 3.7 km",
      "Rallia Dam – 17.1 km"
    ],
    suites: [
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        description: "Perfect for couples and solo travelers. A comfortable, well-appointed room featuring a queen-size bed, LED TV, and an attached bathroom with complimentary toiletries and fresh towels. Enjoy beautiful mountain or garden views and daily housekeeping.",
        pricePerNight: 3000,
        maxGuests: 2,
        size: "Deluxe",
        amenities: ["Queen-size Bed", "LED TV", "Attached Bathroom", "Complimentary Toiletries", "Fresh Towels", "Mountain or Garden Views", "Daily Housekeeping", "Cozy Interiors"]
      },
      {
        id: "suite-room",
        name: "Suite Room",
        description: "Ideal for families and groups. A spacious suite with a separate living area, sofa, and LED TV. Features an attached bathroom with premium amenities, extra seating space, and beautiful hillside views for a truly comfortable stay.",
        pricePerNight: 4500,
        maxGuests: 4,
        size: "Suite",
        amenities: ["Spacious Bedroom", "Separate Living Area", "Sofa", "LED TV", "Attached Bathroom", "Premium Amenities", "Extra Seating Space", "Beautiful Hillside Views"]
      }
    ],
    coordinates: { lat: 11.4050, lng: 76.7120 }
  },
  {
    id: "tea-leaf-stays",
    name: "Tea Leaf Stays by Brown Tree Resorts",
    type: "Ooty",
    location: "Ooty, India",
    region: "Nilgiri Hills",
    price: 5500,
    rating: 4.8,
    reviewCount: 24,
    image: teaLeafMain,
    gallery: [
      teaLeafMain,
      teaLeafInterior,
      teaLeafCampfire,
      teaLeafSteps,
      teaLeafBalconyChair,
      teaLeafBalconySun,
      teaLeafBalcony,
      teaLeafDinning,
      teaLeafNaturalA,
      teaLeafNaturalB,
      teaLeafBedroomsA,
      teaLeafBedroomsB,
      teaLeafBedA,
      teaLeafBedroom,
      teaLeafBedB,
    ],
    description: "Stay Close to Nature\n\nTea Leaf Stays by Brown Tree Resorts is nestled in the peaceful tea estates of Ooty, offering guests an authentic hill-country experience surrounded by rolling green plantations and mist-covered mountains.\n\nDesigned to blend naturally with its surroundings, the resort combines rustic charm with modern comfort. Every stay offers tranquility, scenic beauty, and personalized hospitality, making it an ideal destination for couples, families, photographers, and nature lovers.\n\nRelax on your private balcony, enjoy freshly brewed Nilgiri tea, explore nearby plantations, or simply soak in the breathtaking landscapes that make Ooty one of India's most loved hill stations.",
    highlights: [
      "Tea Plantation Views",
      "Cozy Wooden Interiors",
      "Panoramic Mist-View Balconies"
    ],
    amenities: [
      "Free On-site Parking",
      "Halal Restaurant",
      "Power Backup",
      "Housekeeping",
      "Bonfire (Paid)",
      "CCTV Surveillance",
      "Kids Play Area"
    ],
    propertyHighlightCards: [
      "Tea Plantation Views",
      "Cozy Wooden Interiors",
      "Peaceful Nature Retreat",
      "Fresh Mountain Climate",
      "Scenic Photography Spots",
      "Local Cuisine",
      "Bonfire Evenings",
      "Personalized Hospitality"
    ],
    popularAmenities: [
      "Free On-site Parking",
      "Restaurant (Halal)",
      "Paid Bonfire",
      "Power Backup",
      "Housekeeping",
      "Room Service",
      "CCTV Surveillance"
    ],
    roomAmenities: [
      "Coffee Machine (Selected Rooms)",
      "Fireplace (Selected Rooms)",
      "Living Area",
      "Hair Dryer",
      "Dental Kit",
      "LED Television",
      "Premium Toiletries",
      "Comfortable Bedding",
      "Spacious Bathrooms"
    ],
    whyStayFeatures: [
      "Tea Plantation Views",
      "Cozy Wooden Interiors",
      "Peaceful Nature Retreat",
      "Fresh Mountain Climate",
      "Scenic Photography Spots",
      "Local Cuisine",
      "Bonfire Evenings",
      "Personalized Hospitality"
    ],
    whyStayCards: [
      { title: "Tea Plantation Views", description: "Wake up to endless green tea gardens stretching across the Nilgiri hills." },
      { title: "Cozy Wooden Interiors", description: "Warm and elegant interiors inspired by traditional hill cottages." },
      { title: "Peaceful Nature Retreat", description: "Perfect escape from busy city life into the serenity of the mountains." },
      { title: "Fresh Mountain Climate", description: "Cool, crisp Ooty weather to keep you refreshed throughout the year." },
      { title: "Scenic Photography Spots", description: "Beautiful sunrise, mist and valley viewpoints at every turn." },
      { title: "Local Cuisine", description: "Enjoy authentic South Indian and local Nilgiri specialties." },
      { title: "Bonfire Evenings", description: "Relax with family around a warm bonfire under the stars." },
      { title: "Personalized Hospitality", description: "Friendly staff dedicated to making every stay truly memorable." }
    ],
    houseRules: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      rules: [
        "No Smoking Inside Rooms",
        "Family Friendly",
        "Valid Government ID Required",
        "Pets on Request"
      ]
    },
    signatureExperiences: [
      { title: "Tea Garden Walks", description: "Enjoy guided walks through lush tea plantations and learn about tea cultivation from experts." },
      { title: "Nature Walks", description: "Explore beautiful forest trails surrounded by native flora and breathtaking Nilgiri hillscapes." },
      { title: "Sunrise Views", description: "Watch spectacular golden sunrises paint the sky over the mist-draped Nilgiri Mountains." },
      { title: "Bonfire Nights", description: "Experience memorable evenings gathered around a warm bonfire under a canopy of stars." },
      { title: "Local Cuisine", description: "Taste delicious regional dishes prepared with fresh, locally sourced Nilgiri ingredients." }
    ],
    amenityCategories: [
      {
        category: "Highlighted Amenities",
        items: ["Free On-site Parking", "Restaurant (Halal)", "Paid Bonfire"]
      },
      {
        category: "Basic Facilities",
        items: ["Free Parking", "Power Backup", "Housekeeping", "Room Service (Limited Hours)", "Umbrellas"]
      },
      {
        category: "General Services",
        items: ["Doctor on Call", "Luggage Assistance", "Multilingual Staff (English & Tamil)"]
      },
      {
        category: "Health & Wellness",
        items: ["First Aid Services"]
      },
      {
        category: "Transfers",
        items: ["Shuttle Service (Paid)", "Airport Transfers (Private Taxi)"]
      },
      {
        category: "Room Amenities",
        items: ["Coffee Machine (Selected Rooms)", "Fireplace (Selected Rooms)", "Living Area", "Hair Dryer", "Dental Kit", "LED Television", "Premium Toiletries", "Comfortable Bedding", "Spacious Bathrooms"]
      },
      {
        category: "Dining",
        items: ["Halal Restaurant", "Dining Area", "Barbecue Facilities"]
      },
      {
        category: "Safety",
        items: ["CCTV Surveillance", "Fire Extinguishers"]
      },
      {
        category: "Outdoor Activities",
        items: ["Bonfire", "Outdoor Games", "Nature Walks"]
      },
      {
        category: "Common Areas",
        items: ["Reception", "Balcony", "Terrace"]
      },
      {
        category: "Family Facilities",
        items: ["Kids Play Area"]
      },
      {
        category: "Beauty & Wellness",
        items: ["Open Air Bath"]
      }
    ],
    guestHighlights: [
      "Stunning tea plantation views",
      "Spacious, well-appointed rooms",
      "Peaceful and serene surroundings",
      "Friendly and attentive caretaker",
      "Cool, refreshing mountain climate"
    ],
    amenitiesRating: 3.8,
    nearbyAttractions: [
      "Rallia Dam – 8 km",
      "Ooty Lake – 13.7 km",
      "Coonoor Falls – 18.8 km",
      "John Sullivan Memorial – 19.6 km",
      "ATC Bus Stand – 11.8 km",
      "Ooty Bus Station – 12.5 km",
      "Ketti Railway Station – 8.3 km",
      "Udhagamandalam Railway Station – 12.6 km"
    ],
    nearbyLandmarks: [
      { name: "Rallia Dam", distance: "8 km" },
      { name: "Ooty Lake", distance: "13.7 km" },
      { name: "Coonoor Falls", distance: "18.8 km" },
      { name: "John Sullivan Memorial", distance: "19.6 km" }
    ],
    nearbyTransport: [
      {
        type: "Bus Terminals",
        items: [
          { name: "ATC Bus Stand", distance: "11.8 km" },
          { name: "Ooty Bus Station", distance: "12.5 km" }
        ]
      },
      {
        type: "Railway Stations",
        items: [
          { name: "Ketti Railway Station", distance: "8.3 km" },
          { name: "Udhagamandalam Railway Station", distance: "12.6 km" }
        ]
      }
    ],
    suites: [
      {
        id: "tea-leaf-standard-room",
        name: "Cozy Tea Garden Room",
        description: "A warmly furnished room with wooden interiors and a private balcony overlooking the rolling tea estates. Perfect for couples and solo travelers seeking a peaceful mountain retreat.",
        pricePerNight: 5500,
        maxGuests: 2,
        size: "Standard",
        amenities: ["Private Balcony", "Tea Plantation View", "LED Television", "Coffee Machine", "Premium Toiletries", "Daily Housekeeping"]
      },
      {
        id: "tea-leaf-family-suite",
        name: "Premium Valley Suite",
        description: "A spacious suite with a separate living area, fireplace, and panoramic valley views. Ideal for families and groups wanting extra space amidst the Nilgiri tea gardens.",
        pricePerNight: 7500,
        maxGuests: 4,
        size: "Suite",
        amenities: ["Fireplace", "Separate Living Area", "Panoramic Valley View", "Coffee Machine", "Premium Toiletries", "Spacious Bathroom", "Daily Housekeeping"]
      }
    ],
    coordinates: { lat: 11.4150, lng: 76.6850 }
  },
  {
    id: "solar-residency",
    name: "Sholas Residency by Brown Tree Resorts",
    type: "Ooty",
    location: "Ooty, India",
    region: "Nilgiri Hills",
    price: 3500,
    rating: 4.8,
    reviewCount: 18,
    image: solarMain,
    gallery: [
      solarMain,
      solarSinglebed,
      solarSinglebedA,
      solarDoublebed,
      solarSinglebedPremium,
      solarSinglebedRed,
      solarSinglebedDulex,
      solarSinglebedSuite,
      solarSinglebedSuiteA,
      solarSinglebedSuiteRed,
      solarSinglebedSuiteRedA,
      solarSinglebedSuiteGreen,
      solarSinglebedSuitePink,
      solarDinning,
      solarRestroom,
    ],
    description: "Sholas Residency by Brown Tree Resorts is a stylish hotel located on Palace Road in the heart of Ooty. Perfectly positioned near the city's major attractions, shopping areas, railway station, and bus terminal, the hotel offers guests the perfect combination of convenience and comfort.\n\nDesigned with contemporary interiors and modern amenities, Sholas Residency welcomes families, couples, business travelers, and holidaymakers seeking a relaxing stay in the Queen of Hill Stations.\n\nEnjoy thoughtfully designed rooms, warm hospitality, high-speed Wi-Fi, and a delightful dining experience while exploring everything Ooty has to offer.",
    highlights: [
      "Prime City Location",
      "Modern Comfortable Rooms",
      "Warm BrownTree Hospitality"
    ],
    amenities: [
      "Restaurant",
      "Free Parking",
      "High-Speed Wi-Fi",
      "Power Backup",
      "Housekeeping",
      "Doctor on Call",
      "CCTV Surveillance"
    ],
    aboutSectionTitle: "Comfort Meets Convenience",
    propertyHighlightCards: [
      "Prime City Location",
      "Comfortable Accommodation",
      "High-Speed Wi-Fi",
      "Multi-Cuisine Restaurant",
      "Family Friendly",
      "Dedicated Hospitality",
      "Secure Parking",
      "Modern Comfort"
    ],
    popularAmenities: [
      "Restaurant",
      "Free Parking",
      "High-Speed Wi-Fi",
      "Power Backup",
      "Housekeeping",
      "Room Service",
      "CCTV Surveillance"
    ],
    roomAmenities: [
      "Complimentary Toiletries",
      "Mineral Water",
      "Electric Kettle",
      "Flat Screen TV",
      "Hair Dryer",
      "Wardrobe",
      "Telephone",
      "Alarm Clock",
      "Geyser with Hot & Cold Water",
      "Heater (Available on Request)"
    ],
    whyStayCards: [
      { title: "Prime City Location", description: "Located close to Ooty Railway Station, Bus Stand, shopping streets, and major attractions." },
      { title: "Comfortable Accommodation", description: "Modern Deluxe and Premium Rooms designed for restful stays." },
      { title: "High-Speed Wi-Fi", description: "Stay connected throughout your visit." },
      { title: "Multi-Cuisine Restaurant", description: "Enjoy delicious local and international cuisine." },
      { title: "Family Friendly", description: "Ideal for families, couples, and business travelers." },
      { title: "Dedicated Hospitality", description: "Friendly multilingual staff committed to exceptional service." },
      { title: "Secure Parking", description: "Convenient on-site parking for guests." },
      { title: "Modern Comfort", description: "Well-equipped rooms with contemporary amenities and elegant interiors." }
    ],
    houseRules: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      rules: [
        "No Smoking Inside Rooms",
        "Family Friendly",
        "Valid Government ID Required",
        "Pets on Request"
      ]
    },
    amenityCategories: [
      {
        category: "Highlighted Amenities",
        items: ["Restaurant", "Free Parking", "High-Speed Wi-Fi"]
      },
      {
        category: "Basic Facilities",
        items: ["Parking", "Wi-Fi", "Power Backup", "Housekeeping", "Room Service"]
      },
      {
        category: "General Services",
        items: ["Multilingual Staff", "Caretaker", "Doctor on Call", "Luggage Assistance"]
      },
      {
        category: "Health & Wellness",
        items: ["First Aid Services"]
      },
      {
        category: "Room Amenities",
        items: ["Complimentary Toiletries", "Mineral Water", "Electric Kettle", "Flat Screen TV", "Hair Dryer", "Wardrobe", "Telephone", "Alarm Clock", "Geyser with Hot & Cold Water", "Heater (Available on Request)"]
      },
      {
        category: "Dining",
        items: ["Multi-Cuisine Restaurant", "Dining Area"]
      },
      {
        category: "Safety & Security",
        items: ["CCTV Surveillance", "Fire Extinguishers", "Security Alarms"]
      },
      {
        category: "Media & Entertainment",
        items: ["Smart Television"]
      },
      {
        category: "Common Areas",
        items: ["Reception", "Balcony / Terrace"]
      },
      {
        category: "Additional Facilities",
        items: ["Cloak Room"]
      }
    ],
    guestHighlights: [
      "Central location close to major attractions",
      "Comfortable and spacious rooms",
      "Friendly and helpful staff",
      "Convenient restaurant facilities",
      "Excellent connectivity to transport hubs"
    ],
    amenitiesRating: 4.0,
    nearbyAttractions: [
      "Ooty Lake – 3.5 km",
      "Coonoor Falls – 17.4 km",
      "Rallia Dam – 18 km",
      "Elk Hill – 1.5 km",
      "Government Botanical Garden – 1.7 km",
      "Honeymoon Boat House – 4.9 km",
      "Ketti Valley – 5 km"
    ],
    nearbyLandmarks: [
      { name: "Elk Hill", distance: "1.5 km" },
      { name: "Government Botanical Garden", distance: "1.7 km" },
      { name: "Ooty Lake", distance: "3.5 km" },
      { name: "Honeymoon Boat House", distance: "4.9 km" },
      { name: "Ketti Valley", distance: "5 km" },
      { name: "Coonoor Falls", distance: "17.4 km" },
      { name: "Rallia Dam", distance: "18 km" }
    ],
    nearbyFoodShopping: [
      { name: "Tibetan Market", distance: "1.4 km" },
      { name: "Municipal Market", distance: "1.7 km" },
      { name: "Main Bazaar", distance: "2 km" }
    ],
    nearbyTransport: [
      {
        type: "Bus Terminals",
        items: [
          { name: "ATC Bus Stand", distance: "1.2 km" },
          { name: "Ooty Bus Station", distance: "2.3 km" }
        ]
      },
      {
        type: "Railway & Transit",
        items: [
          { name: "Ooty Taxi Stand", distance: "1.8 km" },
          { name: "Udhagamandalam Railway Station", distance: "2.3 km" },
          { name: "Lovedale Railway Station", distance: "4.5 km" },
          { name: "Ketti Railway Station", distance: "6.9 km" },
          { name: "Coonoor Railway Station", distance: "15.8 km" }
        ]
      }
    ],
    suites: [
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        description: "Perfect for solo travelers and couples. A comfortable, well-appointed room featuring a standard bed, Flat Screen TV, and a modern bathroom with complimentary toiletries. Enjoy the convenience of high-speed Wi-Fi and daily housekeeping.",
        pricePerNight: 3500,
        maxGuests: 2,
        size: "125 sq. ft.",
        amenities: ["Comfortable Standard Bed", "High-Speed Wi-Fi", "Flat Screen TV", "Electric Kettle", "Wardrobe", "Telephone", "Hair Dryer", "Modern Bathroom", "Complimentary Toiletries", "Daily Housekeeping"]
      },
      {
        id: "premium-room",
        name: "Premium Room",
        description: "Ideal for families and guests seeking extra space. A spacious room with a king size bed, a comfortable seating area, and elegant interior design — perfect for a relaxing and luxurious stay in Ooty.",
        pricePerNight: 5000,
        maxGuests: 4,
        size: "150 sq. ft.",
        amenities: ["King Size Bed", "Spacious Living Area", "Elegant Interior Design", "Flat Screen TV", "Electric Kettle", "High-Speed Wi-Fi", "Premium Bathroom", "Hair Dryer", "Daily Housekeeping", "Comfortable Seating Area"]
      }
    ],
    coordinates: { lat: 11.4180, lng: 76.7000 }
  },
  {
    id: "misty-peaks",
    name: "Humming Bird by Brown Tree Resorts",
    type: "Kothagiri",
    location: "Kothagiri, India",
    region: "Nilgiri Hills",
    price: 5000,
    rating: 4.6,
    reviewCount: 36,
    image: hummingBirdBrowntree,
    gallery: [
      hummingBirdBrowntree,
      hummingBirdNightview,
      hummingBirdDoublebed,
      hummingBirdSinglebed,
      hummingBirdSinglebedA,
      hummingBirdParking,
      hummingBirdDining,
      hummingBirdMain,
    ],
    description: "Nestled amidst the tranquil hills of Kothagiri, Humming Bird by Brown Tree Resorts offers a serene villa experience designed for families, couples, and small groups looking to escape the rush of city life.\n\nSurrounded by lush greenery and refreshing mountain air, the property combines modern comforts with warm interiors to create a relaxing home-away-from-home. Spacious accommodations, beautiful outdoor spaces, and personalized hospitality make every stay memorable.\n\nWhether you're planning a family vacation, a romantic getaway, or a weekend retreat with friends, Humming Bird offers the perfect setting to relax, reconnect, and rejuvenate.",
    highlights: [
      "Private Villa Experience",
      "Peaceful Mountain Location",
      "Spacious Family Accommodation",
      "Beautiful Garden & Outdoor Spaces",
      "Delicious Dining",
      "Indoor & Outdoor Activities",
      "Personalized Hospitality",
      "Ideal for Relaxation"
    ],
    amenities: [
      "Halal Restaurant",
      "Indoor Games",
      "Free Parking",
      "Free High-Speed Wi-Fi",
      "24-Hour Room Service",
      "Power Backup",
      "Housekeeping",
      "CCTV Surveillance",
      "Badminton",
      "Barbecue"
    ],
    suites: [
      {
        id: "hb-family-suite",
        name: "Family Villa Suite",
        description: "A spacious and comfortable family suite with a double bed, cozy living area, and a private terrace overlooking the garden. Perfect for families and small groups seeking a home-away-from-home experience.",
        pricePerNight: 5000,
        maxGuests: 4,
        size: "Spacious Suite",
        amenities: ["Double Bed", "Spacious Living Area", "Private Terrace", "Geyser", "LED Television", "Premium Toiletries", "Comfortable Bedding"]
      },
      {
        id: "hb-fireplace-room",
        name: "Cozy Fireplace Room",
        description: "A warm and intimate room featuring a cozy fireplace for cool Kothagiri evenings, ideal for couples or solo travelers seeking a peaceful retreat in nature.",
        pricePerNight: 4000,
        maxGuests: 2,
        size: "Comfortable Room",
        amenities: ["Fireplace", "Single / Double Bed", "Balcony", "Geyser", "LED Television", "Dental Kit", "Comfortable Bedding"]
      }
    ],
    aboutSectionTitle: "Experience Peace, Privacy & Nature",
    propertyHighlightCards: [
      "Private Villa Experience",
      "Peaceful Mountain Location",
      "Spacious Family Accommodation",
      "Beautiful Garden & Outdoor Spaces",
      "Delicious Dining",
      "Indoor & Outdoor Activities",
      "Personalized Hospitality",
      "Ideal for Relaxation"
    ],
    popularAmenities: [
      "Halal Restaurant",
      "Indoor Games",
      "Free Parking",
      "Free High-Speed Wi-Fi",
      "Power Backup",
      "Badminton",
      "Barbecue"
    ],
    roomAmenities: [
      "Spacious Living Area",
      "Fireplace (Selected Rooms)",
      "Terrace",
      "Dining Area",
      "Geyser",
      "Premium Toiletries",
      "Dental Kit",
      "Comfortable Bedding",
      "LED Television",
      "Refrigerator"
    ],
    whyStayCards: [
      { title: "Private Villa Experience", description: "Enjoy complete privacy in a spacious villa designed for comfort and relaxation." },
      { title: "Peaceful Mountain Location", description: "Wake up to fresh air, lush greenery, and serene mountain surroundings every morning." },
      { title: "Spacious Family Accommodation", description: "Perfect for families, couples, and small groups with spacious and comfortable rooms." },
      { title: "Beautiful Garden & Outdoor Spaces", description: "Relax in beautifully maintained garden and outdoor areas surrounded by nature." },
      { title: "Delicious Dining", description: "Enjoy freshly prepared meals with Indian and local specialties in our Halal restaurant." },
      { title: "Indoor & Outdoor Activities", description: "Badminton, indoor games, and barbecue evenings for an active and fun stay." },
      { title: "Personalized Hospitality", description: "Friendly and attentive staff dedicated to making every moment of your stay memorable." },
      { title: "Ideal for Relaxation", description: "Escape city life and experience complete tranquility in the hills of Kothagiri." }
    ],
    houseRules: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      rules: [
        "No Smoking Inside Rooms",
        "Family Friendly",
        "Valid Government ID Required"
      ]
    },
    signatureExperiences: [
      { title: "Spacious Living Areas", description: "Comfortable interiors with cozy seating and family-friendly spaces to unwind." },
      { title: "Fireplace Rooms", description: "Selected rooms feature a cozy fireplace for warm, relaxing cool mountain evenings." },
      { title: "Balcony & Terrace", description: "Relax on your private balcony or terrace while enjoying refreshing views of the surrounding hills." },
      { title: "Garden Retreat", description: "Spend peaceful evenings surrounded by lush nature in our beautifully maintained garden." },
      { title: "Barbecue Evenings", description: "Create memorable moments with family and friends around an outdoor barbecue." },
      { title: "Mountain Fresh Air", description: "Experience one of Kothagiri's most peaceful and refreshing natural environments." }
    ],
    amenityCategories: [
      {
        category: "Highlighted Amenities",
        items: ["Halal Restaurant", "Indoor Games", "Free Parking", "Free High-Speed Wi-Fi"]
      },
      {
        category: "Basic Facilities",
        items: ["24-Hour Room Service", "Free Wi-Fi", "Free Parking", "Power Backup", "Housekeeping", "Refrigerator", "Laundry Service", "Elevator", "LAN Connectivity", "Umbrellas"]
      },
      {
        category: "General Services",
        items: ["Multilingual Staff", "Caretaker", "Luggage Assistance"]
      },
      {
        category: "Health & Wellness",
        items: ["First Aid Services"]
      },
      {
        category: "Transfers",
        items: ["Pickup & Drop (On Request)", "Airport Transfers (On Request)", "Railway Transfers (On Request)", "Bus Station Transfers (On Request)", "Shuttle Service (On Request)"]
      },
      {
        category: "Room Amenities",
        items: ["Spacious Living Area", "Fireplace (Selected Rooms)", "Terrace", "Dining Area", "Geyser", "Premium Toiletries", "Dental Kit", "Comfortable Bedding"]
      },
      {
        category: "Dining",
        items: ["Halal Restaurant", "Breakfast", "Indian Cuisine", "Jain Food Available", "Kid's Menu", "Barbecue", "Indian Chef"]
      },
      {
        category: "Safety & Security",
        items: ["CCTV Surveillance", "Security Guard", "Security Alarms", "Fire Extinguishers"]
      },
      {
        category: "Entertainment",
        items: ["LED Television"]
      },
      {
        category: "Outdoor Activities",
        items: ["Badminton", "Garden Walks", "Outdoor Games"]
      },
      {
        category: "Indoor Activities",
        items: ["Carrom Board", "Indoor Games"]
      },
      {
        category: "Common Areas",
        items: ["Living Room", "Balcony", "Terrace", "Garden", "24-Hour Reception"]
      },
      {
        category: "Additional Facilities",
        items: ["Accessible Parking", "Wide Pathways", "Accessible Washrooms", "Grocery Purchase Assistance", "Food Options Available"]
      }
    ],
    guestHighlights: [
      "Peaceful and private villa experience",
      "Spacious and comfortable rooms",
      "Beautiful natural surroundings",
      "Friendly and attentive hospitality",
      "Perfect destination for family getaways"
    ],
    amenitiesRating: 4.6,
    nearbyLandmarks: [
      { name: "John Sullivan Memorial", distance: "8.1 km" },
      { name: "Rallia Dam", distance: "15.1 km" }
    ],
    nearbyTransport: [
      {
        type: "Railway",
        items: [
          { name: "Coonoor Railway Station", distance: "23 km" }
        ]
      }
    ],
    coordinates: { lat: 11.4300, lng: 76.8800 }
  },
  {
    id: "mirage-ridge",
    name: "Hotel Vetrivel International by Brown Tree Resorts",
    type: "Kodaikanal",
    location: "Kodaikanal, India",
    region: "Palani Hills",
    price: 4500,
    rating: 4.9,
    reviewCount: 29,
    image: vetrivelMain,
    gallery: [
      vetrivelMain,
      vetrivelFrontview,
      vetrivelRestroom,
      vetrivelBedNightview,
      vetrivelDinning,
      vetrivelDoublesbed,
      vetrivelSuiteBed,
      vetrivelBedRed,
      vetrivelBed,
    ],
    heroSubtitle: "Experience modern comfort in the heart of Kodaikanal with spacious rooms, premium hospitality, delicious dining, wellness experiences, and easy access to the city's iconic attractions.",
    description: "Hotel Vetrivel International by Brown Tree Resorts is a modern hotel located in the heart of Kodaikanal, offering guests a perfect blend of comfort, convenience, and personalized hospitality.\n\nWhether you're visiting for a family vacation, honeymoon, business trip, or weekend getaway, the hotel provides spacious accommodations, modern amenities, and warm service designed to make every stay memorable.\n\nLocated close to Kodaikanal's major attractions, shopping streets, restaurants, and transport hubs, the hotel allows guests to explore the beauty of the Princess of Hill Stations while enjoying a relaxing and comfortable stay.",
    aboutSectionTitle: "Comfort, Convenience & Hospitality",
    highlights: [
      "Prime City Location",
      "Spacious Modern Rooms",
      "Warm BrownTree Hospitality"
    ],
    amenities: [
      "Free Parking",
      "24-Hour Room Service",
      "Lounge",
      "Yoga",
      "Bonfire"
    ],
    propertyHighlightCards: [
      "Prime City Location",
      "Spacious Modern Rooms",
      "Wellness Experiences",
      "Family Friendly",
      "Business & Events",
      "Free High-Speed Wi-Fi",
      "Warm Hospitality"
    ],
    popularAmenities: [
      "Free Parking",
      "24-Hour Room Service",
      "Lounge",
      "Yoga",
      "Bonfire",
      "Free High-Speed Wi-Fi"
    ],
    roomAmenities: [
      "Living Area",
      "Balcony (Selected Rooms)",
      "Terrace (Selected Rooms)",
      "Work Desk",
      "Sofa",
      "Dining Area",
      "Geyser",
      "Dental Kit",
      "Premium Toiletries",
      "Interconnected Rooms (Selected Rooms)"
    ],
    whyStayCards: [
      { title: "Prime City Location", description: "Easy access to Kodaikanal Lake, Bryant Park, shopping areas, and transport hubs." },
      { title: "Spacious Modern Rooms", description: "Elegant accommodations designed for comfort and relaxation." },
      { title: "Wellness Experiences", description: "Yoga, meditation, and peaceful surroundings for complete relaxation." },
      { title: "Family Friendly", description: "Ideal for families, couples, business travelers, and groups." },
      { title: "Business & Events", description: "Banquet facilities available for meetings and celebrations." },
      { title: "Free High-Speed Wi-Fi", description: "Stay connected throughout your visit." },
      { title: "Warm Hospitality", description: "Friendly staff dedicated to providing exceptional guest experiences." }
    ],
    hideHouseRules: true,
    signatureExperiences: [
      { title: "Morning Yoga", description: "Refresh your body and mind with guided yoga sessions." },
      { title: "Meditation Room", description: "Find peace and relaxation in a quiet wellness space." },
      { title: "Evening Bonfire", description: "Enjoy cozy evenings with family and friends under the stars." }
    ],
    amenityCategories: [
      {
        category: "Highlighted Amenities",
        items: ["Free Parking", "24-Hour Room Service", "Lounge", "Yoga", "Bonfire"]
      },
      {
        category: "Basic Facilities",
        items: ["Free High-Speed Wi-Fi", "Housekeeping", "24-Hour Room Service", "Free Parking", "Laundry Service", "Elevator", "Power Backup", "Umbrellas"]
      },
      {
        category: "General Services",
        items: ["Caretaker", "Luggage Assistance", "Multilingual Staff", "Facilities for Guests with Disabilities"]
      },
      {
        category: "Wellness",
        items: ["Yoga Sessions", "Meditation Room", "First Aid Services"]
      },
      {
        category: "Transfers",
        items: ["Airport Transfers (On Request)", "Railway Transfers (On Request)", "Bus Station Transfers (On Request)", "Shuttle Service (On Request)"]
      },
      {
        category: "Room Amenities",
        items: ["Living Area", "Balcony (Selected Rooms)", "Terrace (Selected Rooms)", "Work Desk", "Sofa", "Dining Area", "Geyser", "Dental Kit", "Premium Toiletries", "Interconnected Rooms (Selected Rooms)"]
      },
      {
        category: "Dining",
        items: ["Halal Cuisine", "Kosher Cuisine", "Indian Vegetarian Cuisine", "Dining Area", "Barbecue"]
      },
      {
        category: "Safety & Security",
        items: ["CCTV Surveillance", "Security Guards", "Fire Extinguishers"]
      },
      {
        category: "Media & Entertainment",
        items: ["LED Television"]
      },
      {
        category: "Outdoor Experiences",
        items: ["Bonfire"]
      },
      {
        category: "Common Areas",
        items: ["Lounge", "Reception", "Living Room", "Balcony", "Terrace"]
      },
      {
        category: "Business Facilities",
        items: ["Banquet Hall"]
      },
      {
        category: "Additional Facilities",
        items: ["Garden", "Cloak Room", "Food Options Available"]
      }
    ],
    guestHighlights: [
      "Spacious and comfortable rooms",
      "Friendly and welcoming staff",
      "Convenient central location",
      "Delicious dining options",
      "Peaceful atmosphere",
      "Great value for families and couples"
    ],
    amenitiesRating: 4.5,
    nearbyLandmarks: [
      { name: "Bryant Park", distance: "1.8 km" },
      { name: "Kodaikanal Lake", distance: "2.7 km" },
      { name: "Pine Forest", distance: "2.9 km" },
      { name: "Bear Shola Falls", distance: "1.5 km" },
      { name: "Kurinji Andavar Temple", distance: "2.2 km" },
      { name: "Fairy Falls", distance: "3.5 km" },
      { name: "Liril Falls", distance: "4.1 km" }
    ],
    nearbyFoodShopping: [
      { name: "Organic Farmers Market", distance: "7 min walk" },
      { name: "Potter's Shed", distance: "10 min walk" },
      { name: "Corsack", distance: "10 min walk" },
      { name: "Eco Nut", distance: "11 min walk" },
      { name: "Bazar Road", distance: "1.3 km" },
      { name: "Spices Corner", distance: "4 km" }
    ],
    nearbyTransport: [
      {
        type: "Bus Terminals",
        items: [
          { name: "Kodaikanal Bus Stand", distance: "1.2 km" },
          { name: "Srinivasapuram Bus Stand", distance: "2.8 km" }
        ]
      },
      {
        type: "Nearby Transit Points",
        items: [
          { name: "7 Roads Junction", distance: "9 min walk" },
          { name: "Kodaikanal Bus Stand", distance: "1.2 km" },
          { name: "Srinivasapuram Bus Stand", distance: "2.8 km" }
        ]
      }
    ],
    suites: [
      {
        id: "vetrivel-deluxe-room",
        name: "Deluxe Room",
        description: "Perfect for couples and business travelers.",
        pricePerNight: 4500,
        maxGuests: 2,
        size: "Deluxe",
        amenities: ["Comfortable Queen Bed", "LED Smart TV", "High-Speed Wi-Fi", "Work Desk", "Premium Bathroom", "Daily Housekeeping", "Complimentary Toiletries", "Modern Interiors"]
      },
      {
        id: "vetrivel-premium-room",
        name: "Premium Room",
        description: "Ideal for families and longer stays.",
        pricePerNight: 6000,
        maxGuests: 4,
        size: "Premium",
        amenities: ["Spacious Living Area", "Balcony (Selected Rooms)", "Sofa Seating", "Dining Area", "Work Desk", "Premium Bathroom", "LED Television", "Complimentary Toiletries", "Comfortable Bedding"]
      }
    ],
    coordinates: { lat: 10.2381, lng: 77.4892 }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-yacht",
    title: "Nilgiri Mountain Steam Train Ride",
    category: "Adventure",
    description: "Embark on a private vintage toy train journey, weaving through tea estates, historic bridges, and pine forests, accompanied by local historians and a custom gourmet picnic basket.",
    image: "https://picsum.photos/seed/yacht/800/500",
    duration: "Full Day (8 Hours)",
    pricePerPerson: 1800,
    details: [
      "Exclusive private toy train cabin charter",
      "Bespoke multi-course hill-station picnic",
      "Personal tea plantation guide & historian",
      "Nilgiri premium reserve tea sampling"
    ]
  },
  {
    id: "exp-healing",
    title: "Soma Ayurvedic Healing Journey",
    category: "Wellness",
    description: "A transformative deep-wellness retreat curated by traditional master practitioners. Includes a personalized body constitution diagnosis, customized herbal oils, organic local botanical therapy, and sound resonance healing.",
    image: "https://picsum.photos/seed/spa/800/500",
    duration: "3 Hours",
    pricePerPerson: 3500,
    details: [
      "Ayurvedic Doctor constitution consult",
      "Four-hand synchronous botanical massage",
      "Tibetan sound bowl vibrational session",
      "Custom-formulated herbal tea curation"
    ]
  },
  {
    id: "exp-heli",
    title: "Kodaikanal Shola Forest Safari",
    category: "Adventure",
    description: "Venture deep into the pristine, hidden Shola forest trails of Kodaikanal. Spot indigenous wildlife, admire ancient botanical species, and enjoy a high-altitude organic lunch prepared by our culinary team.",
    image: "https://picsum.photos/seed/heli/800/500",
    duration: "6 Hours",
    pricePerPerson: 2500,
    details: [
      "Custom-guided private 4x4 forest safari",
      "Veteran naturalist and wildlife photographer",
      "Premium optics and tracking equipment",
      "Scenic ridge-top organic hot gourmet lunch"
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Lady Eleanor Sterling",
    role: "Aesthetic Connoisseur & Member since 2021",
    avatar: "https://picsum.photos/seed/woman1/100/100",
    rating: 5,
    date: "May 2026",
    content: "Luxe Sanctuary truly understands that modern luxury is about silence, space, and pristine architectural restraint. Our stay at the Heritage Pine Palace in Ooty was a masterclass in elegant serenity. The morning fog rising over the tea estates is etched into my memory.",
    propertyId: "heritage-pine"
  },
  {
    id: "rev-2",
    author: "Jean-Pierre Moreau",
    role: "Architectural Critic",
    avatar: "https://picsum.photos/seed/man1/100/100",
    rating: 5,
    date: "April 2026",
    content: "The glass facade at Azure Orchid Resort in Ooty maintains a seamless dialogue with the Nilgiri hills. Every line, from the stone fireplaces to the hand-carved copper fixtures, reflects absolute, uncompromising craftsmanship.",
    propertyId: "azure-orchid"
  },
  {
    id: "rev-3",
    author: "Dr. Maya Lin",
    role: "Elite Travel Journal Editor",
    avatar: "https://picsum.photos/seed/woman2/100/100",
    rating: 5,
    date: "June 2026",
    content: "Misty Peaks Lodge is a true hill-station sanctuary. Sitting by the double-sided stone hearth in Kothagiri, with a cup of freshly brewed Nilgiri tea, watching the slopes disappear into the thick fog—it was the ultimate digital detox.",
    propertyId: "misty-peaks"
  },
  {
    id: "rev-4",
    author: "Priya Ramanathan",
    role: "Family Traveler, Chennai",
    avatar: "https://picsum.photos/seed/woman3/100/100",
    rating: 5,
    date: "March 2026",
    content: "The Abode by Brown Tree felt like a home away from home in the heart of Ooty. The staff were incredibly warm, the rooms spotless, and the view from our window every morning was simply breathtaking. Our kids absolutely loved it.",
    propertyId: "heritage-pine"
  },
  {
    id: "rev-5",
    author: "Arjun & Deepa Krishnan",
    role: "Honeymooners, Bangalore",
    avatar: "https://picsum.photos/seed/couple1/100/100",
    rating: 5,
    date: "February 2026",
    content: "Tea Leaf Stays was the perfect honeymoon retreat. Waking up to rolling tea gardens, sipping fresh Nilgiri tea on the balcony with mist swirling around us — it was pure magic. Brown Tree's hospitality made every moment feel special.",
    propertyId: "tea-leaf-stays"
  },
  {
    id: "rev-6",
    author: "Rahul Mehta",
    role: "Solo Traveler & Nature Enthusiast",
    avatar: "https://picsum.photos/seed/man2/100/100",
    rating: 5,
    date: "April 2026",
    content: "Humming Bird by Brown Tree in Kothagiri is a hidden gem. The valley views from my room were unlike anything I've seen, the birdsong at dawn was my alarm clock, and the staff went above and beyond to make me feel welcome.",
    propertyId: "misty-peaks"
  },
  {
    id: "rev-7",
    author: "Sunita & Vikram Nair",
    role: "Weekend Getaway, Coimbatore",
    avatar: "https://picsum.photos/seed/woman4/100/100",
    rating: 5,
    date: "May 2026",
    content: "Solar Residency surprised us in the best way possible. Clean, comfortable, well-located in Ooty, and the staff treated us like family. The local food served was authentic and delicious. Will definitely be back with the whole family!",
    propertyId: "solar-residency"
  },
  {
    id: "rev-8",
    author: "Kavitha Subramaniam",
    role: "Travel Blogger, Madurai",
    avatar: "https://picsum.photos/seed/woman5/100/100",
    rating: 5,
    date: "January 2026",
    content: "Hotel Vetrivel International is perfectly placed for exploring Kodaikanal. Just a short walk from the lake, cozy rooms, and genuine BrownTree hospitality. The evening mist rolling through the pine trees outside our window was surreal.",
    propertyId: "mirage-ridge"
  },
  {
    id: "rev-9",
    author: "Anand & Friends Group",
    role: "Friends Getaway, Hyderabad",
    avatar: "https://picsum.photos/seed/man3/100/100",
    rating: 5,
    date: "June 2026",
    content: "The Earthy Nest by Brown Tree was the ultimate group retreat. The garden area is perfect for hangouts, the rooms were cozy yet spacious, and the Ooty sunrise from the property left us all speechless. Highly recommend for friend trips!",
    propertyId: "azure-orchid"
  },
  {
    id: "rev-10",
    author: "Meena Sundaram",
    role: "Corporate Retreat Organizer",
    avatar: "https://picsum.photos/seed/woman6/100/100",
    rating: 5,
    date: "March 2026",
    content: "We organized a corporate offsite at Tea Leaf Stays and Brown Tree made it effortless. The serene tea garden backdrop kept the team refreshed and focused, the service was impeccable, and every detail was thoughtfully arranged.",
    propertyId: "tea-leaf-stays"
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "dest-ooty",
    name: "Ooty",
    country: "Tamil Nadu, India",
    image: ootyDestImage,
    description: "Queen of Hill Stations, known for its sprawling tea gardens and misty valleys.",
    propertyCount: 3
  },
  {
    id: "dest-kothagiri",
    name: "Kothagiri",
    country: "Tamil Nadu, India",
    image: kothagiriDestImage,
    description: "A peaceful offbeat heaven of green slopes and cascading waterfalls.",
    propertyCount: 1
  },
  {
    id: "dest-kodaikanal",
    name: "Kodaikanal",
    country: "Tamil Nadu, India",
    image: kodaikanaldestImage,
    description: "Princess of Hill Stations, featuring beautiful lakes, pine forests and cold mist.",
    propertyCount: 1
  }
];
