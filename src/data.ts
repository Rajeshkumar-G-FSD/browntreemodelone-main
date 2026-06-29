/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Experience, Review, Destination } from "./types";
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
    description: "Earthy Nest by BrownTree – A Peaceful Nature Retreat\n\nNestled amidst the lush greenery of Ooty, Earthy Nest by BrownTree is a serene retreat offering breathtaking views of the Nilgiris. Wake up to crisp mountain air, explore Ooty's scenic beauty, and unwind in a peaceful setting designed for relaxation and unforgettable moments.\n\nWhether it's a family vacation, a friends' getaway, or a team get-together, Earthy Nest is the perfect escape from the fast-paced routine of everyday life. With cozy comforts, tranquil surroundings, and warm BrownTree hospitality, every stay is an opportunity to reconnect, recharge, and create lasting memories.",
    highlights: [
      "Overlooking Nilgiri Tea Valleys",
      "Heated Glass-Wall Infinity Pool",
      "Guided Plantation Walk & Tea Tasting"
    ],
    amenities: [
      "Heated Infinity Pool",
      "Dedicated 24/7 Butler",
      "Fully Retractable Glass Balconies",
      "In-Villa Spa Curation",
      "Private Sunset Deck",
      "Personal Tea Sommelier"
    ],
    suites: [
      {
        id: "orchid-pavilion",
        name: "Orchid Valley Pavilion",
        description: "Elegant mountain-view pavilion boasting floor-to-ceiling glass looking out over the tea estates, with a private warm tub.",
        pricePerNight: 3000,
        maxGuests: 2,
        size: "140 sqm / 1,500 sqft",
        amenities: ["Plunge Pool", "Outdoor Rainfall Shower", "Glass Wall Panels", "Bose Sound System"]
      },
      {
        id: "sunset-valley-suite",
        name: "Sunset Valley Suite",
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
    description: "Abode by BrownTree – Comfort in the Heart of Ooty\n\nLocated in the heart of Ooty, Abode by BrownTree offers the perfect balance of convenience and tranquility. While you're just minutes away from the town's popular attractions, shopping streets, and restaurants, the property provides a calm and peaceful ambiance where you can truly relax and unwind.\n\nDesigned with families, couples, and leisure travelers in mind, Abode features comfortable, well-appointed rooms and warm, personalized hospitality that makes every guest feel at home. Whether you're exploring the scenic beauty of the Nilgiris or simply looking for a cozy retreat after a day of sightseeing, Abode is the ideal place to create lasting memories with your loved ones.",
    highlights: [
      "Colonial-Era Heritage Estate",
      "Acre-Wide Pine Gardens",
      "Bespoke Ayurvedic Healing Cures"
    ],
    amenities: [
      "Private Pine Gardens",
      "Bespoke Royal Chauffeur",
      "Ayurvedic Spa Treatments",
      "10-meter Arched Glass Salon",
      "In-Suite Classical Music Performances",
      "Fine Dining Nilgiri Kitchen"
    ],
    suites: [
      {
        id: "pine-palace-suite",
        name: "Maharaja Pine Suite",
        description: "A grand colonial suite featuring wood paneling, copper soaking tubs, and private garden views.",
        pricePerNight: 3000,
        maxGuests: 2,
        size: "120 sqm / 1,290 sqft",
        amenities: ["Copper Soaking Tub", "Hand-woven Indian Rugs", "Terrace Bed", "Luxury Linens", "Pillow Menu"]
      },
      {
        id: "royal-garden-pavilion",
        name: "Royal Garden Pavilion",
        description: "Grand historic sanctuary with exclusive garden access, high ceilings, private pool, and historical antique furnishings.",
        pricePerNight: 4500,
        maxGuests: 3,
        size: "210 sqm / 2,260 sqft",
        amenities: ["Private Courtyard Pool", "Dedicated Chauffeur", "Antique Desk", "Outdoor Daybed"]
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
    description: "TeaLeaf Stays by BrownTree – A Refreshing Escape Amidst Tea Gardens\n\nSurrounded by the rolling tea estates and misty hills of the Nilgiris, TeaLeaf Stays by BrownTree offers a peaceful retreat where nature and comfort come together. Wake up to refreshing views, crisp mountain air, and the soothing charm of lush tea plantations, making every moment a truly relaxing experience.\n\nWhether you're seeking a quiet family getaway, a romantic escape, or a refreshing break with friends, TeaLeaf Stays provides cozy accommodations, serene surroundings, and warm BrownTree hospitality. Immerse yourself in the beauty of the hills and enjoy a stay that leaves you refreshed, rejuvenated, and inspired.",
    highlights: [
      "Organic Tea Plantation Views",
      "Bespoke Tea Sommelier Tasting",
      "Panoramic Mist-View Sun Decks"
    ],
    amenities: [
      "Private Organic Tea Gardens",
      "Dedicated Butler & Estate Chef",
      "Panoramic Sun Decks",
      "Glass-Wall Mountain Showers",
      "Artisanal Teapot Selection",
      "In-Villa Fireplace Lounge"
    ],
    suites: [
      {
        id: "tea-leaf-estate-suite",
        name: "Organic Tea Leaf Suite",
        description: "A gorgeous wood-trimmed suite overlooking the lush estate, complete with local organic tea selections and cozy fireplaces.",
        pricePerNight: 5500,
        maxGuests: 2,
        size: "135 sqm / 1,450 sqft",
        amenities: ["Artisanal Teapot", "Fireplace Lounge", "Terrace Loungers", "Luxury Silk Linens"]
      },
      {
        id: "tea-leaf-presidential-pavilion",
        name: "Presidential Tea Valley Pavilion",
        description: "An ultra-luxury estate pavilion featuring an outdoor heated jacuzzi and 360-degree views of the mist-shrouded valleys.",
        pricePerNight: 7500,
        maxGuests: 4,
        size: "260 sqm / 2,800 sqft",
        amenities: ["Heated Geothermal Jacuzzi", "Outdoor Dining Area", "Fully Retractable Glass Walls", "Personal Butler Services"]
      }
    ],
    coordinates: { lat: 11.4150, lng: 76.6850 }
  },
  {
    id: "solar-residency",
    name: "Solar Residency by Brown Tree",
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
    description: "Sholas Residency by BrownTree – A Boutique Stay in the Heart of Ooty\n\nExperience the charm of Sholas Residency by BrownTree, a boutique hotel thoughtfully designed for travelers who value comfort, style, and personalized hospitality. Ideally located in the heart of Ooty, it places you close to the town's iconic attractions, vibrant markets, and local dining, making every outing effortless.\n\nWhether you're visiting for a family holiday, a romantic escape, or a group vacation, Sholas Residency offers elegant accommodations and a warm, inviting atmosphere. Blending modern comforts with BrownTree's signature hospitality, it promises a relaxing stay and an authentic Ooty experience you'll cherish.",
    highlights: [
      "Eco-Powered Solar Property",
      "Panoramic Nilgiri Hill Views",
      "Warm BrownTree Hospitality"
    ],
    amenities: [
      "Solar-Powered Rooms",
      "Spacious Garden Lounge",
      "Mountain View Terrace",
      "Organic Breakfast Service",
      "In-House Bonfire Setup",
      "Free Parking"
    ],
    suites: [
      {
        id: "solar-standard-room",
        name: "Solar Standard Room",
        description: "A cozy, well-appointed room with garden views, natural ventilation, and all modern comforts powered by solar energy.",
        pricePerNight: 3500,
        maxGuests: 2,
        size: "120 sqm / 1,290 sqft",
        amenities: ["Solar Heating", "Garden View", "Free Wi-Fi", "Daily Breakfast"]
      },
      {
        id: "solar-family-suite",
        name: "Solar Family Suite",
        description: "A spacious family suite with a private sit-out, stunning hill views, and extra beds for a comfortable group stay.",
        pricePerNight: 5500,
        maxGuests: 4,
        size: "200 sqm / 2,150 sqft",
        amenities: ["Private Sit-Out", "Hill View", "Extra Beds", "Kitchenette", "Bonfire Access"]
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
    rating: 4.8,
    reviewCount: 36,
    image: hummingBirdMain,
    gallery: [
      hummingBirdMain,
      hummingBirdNightview,
      hummingBirdDoublebed,
      hummingBirdSinglebed,
      hummingBirdSinglebedA,
      hummingBirdParking,
      hummingBirdDining,
    ],
    description: "Humming Bird by BrownTree – A Nature Lover's Retreat\n\nNestled in the serene hills of Kotagiri, Humming Bird by BrownTree is a peaceful retreat surrounded by breathtaking valley views, lush greenery, and abundant birdlife. A haven for nature lovers, it's the perfect destination to enjoy scenic landscapes, bird watching, and the refreshing charm of the Nilgiris.\n\nLocated away from the city's hustle yet conveniently accessible from Mettupalayam, Humming Bird offers the perfect escape to slow down and reconnect with nature. Whether you're planning a family vacation, a getaway with friends, or simply seeking peace amidst the hills, every stay promises comfort, tranquility, and unforgettable views.",
    highlights: [
      "Quiet Offbeat Highland Escape",
      "In-Lodge Stargazing Telescope",
      "Geothermal Outdoor Hot Pool"
    ],
    amenities: [
      "Double-sided Stone Fireplace",
      "Observatory Deck",
      "Geothermal Hot Tub",
      "Organic Spice Garden",
      "In-Villa Coffee Curation tasting",
      "Bespoke Highland Trekking Guide"
    ],
    suites: [
      {
        id: "alpine-hearth",
        name: "Highland Hearth Loft",
        description: "A cozy log-and-glass loft with double-sided stone fireplace, premium local upholstery, and spectacular waterfall views.",
        pricePerNight: 5000,
        maxGuests: 2,
        size: "95 sqm / 1,020 sqft",
        amenities: ["Stone Fireplace", "Telescope Access", "Heated Floors", "Steam Shower", "Fine Local Tea Bar"]
      },
      {
        id: "glacial-vista",
        name: "Summit Ridge Vista Suite",
        description: "Superb split-level suite offering panoramic Nilgiri peak vistas, private outdoor hot tub, and direct plantation path access.",
        pricePerNight: 7500,
        maxGuests: 4,
        size: "185 sqm / 1,990 sqft",
        amenities: ["Outdoor Geothermal Tub", "Private Sauna", "Vaulted Cedar Ceilings", "Wine Dispenser"]
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
    description: "Vetrivel International by BrownTree – Stay Close to the Heart of Kodaikanal\n\nIdeally located just a short walk from the iconic Kodaikanal Lake, Vetrivel International by BrownTree offers the perfect blend of comfort, convenience, and warm hospitality. Its prime location allows guests to easily explore the town's popular attractions, charming cafés, shopping streets, and scenic viewpoints.\n\nWhether you're planning a family vacation, a getaway with friends, or a relaxing holiday, Vetrivel International provides comfortable accommodations and a welcoming ambiance for a memorable stay. Discover the beauty of Kodaikanal while enjoying the trusted hospitality and personalized service that define the BrownTree experience.",
    highlights: [
      "Epic Valley-Sunset Views",
      "Astronomer-Guided Stargazing",
      "Private Trek in Shola Reserve"
    ],
    amenities: [
      "Valley View Pool",
      "Hammam Wellness Room",
      "Mountain Glamping Star-Deck",
      "Brass Firepit Lounge",
      "Local Culinary Chef Services",
      "Premium Leather Lounge"
    ],
    suites: [
      {
        id: "nomad-dome",
        name: "Royal Ridge Dome",
        description: "An elegant structure featuring a retractable star-viewing roof, local plaster details, and a cozy central fire pit.",
        pricePerNight: 4500,
        maxGuests: 2,
        size: "110 sqm / 1,180 sqft",
        amenities: ["Retractable Sky Roof", "Hammam Shower", "Handmade Woolen Carpet", "Astronomical Telescope"]
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
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "dest-ooty",
    name: "Ooty",
    country: "Tamil Nadu, India",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80",
    description: "Queen of Hill Stations, known for its sprawling tea gardens and misty valleys.",
    propertyCount: 3
  },
  {
    id: "dest-kothagiri",
    name: "Kothagiri",
    country: "Tamil Nadu, India",
    image: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?auto=format&fit=crop&w=600&q=80",
    description: "A peaceful offbeat heaven of green slopes and cascading waterfalls.",
    propertyCount: 1
  },
  {
    id: "dest-kodaikanal",
    name: "Kodaikanal",
    country: "Tamil Nadu, India",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    description: "Princess of Hill Stations, featuring beautiful lakes, pine forests and cold mist.",
    propertyCount: 1
  }
];
