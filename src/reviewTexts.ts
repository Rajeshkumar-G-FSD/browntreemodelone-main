// Transcribed from the guest-review screenshots in src/assets/images (the
// *_review_*.png files) so the "Reflections of Luxury" carousel can render
// real text instead of images — real text means title/description font size
// can be made genuinely uniform across every card via CSS, which is
// impossible with screenshots since their baked-in text scale varies per
// source image. One review (a mixed/negative Sholas one about a cleanliness
// and leakage complaint) was intentionally left out of this curated list.
export interface GuestReview {
  property: string;
  title: string;
  content: string;
}

export const GUEST_REVIEWS: GuestReview[] = [
  // THE ABODE BY BROWN TREE — Ooty
  {
    property: "THE ABODE BY BROWN TREE",
    title: "Homely place to stay",
    content:
      "I had booked a suite room for me and my parents for two nights, no where I felt it is a hotel it was like home stay. My parents had liked the place they were not there for site seeing just to relax. If someone wants to continue home like food served hot i would strongly recommend this place, may be not too many varieties available, whatever better to inform them well before.",
  },
  {
    property: "THE ABODE BY BROWN TREE",
    title: "Exceptional",
    content: "Location is very beautiful. We loved balcony view. Staff very cooperative we have an excellent stay.",
  },
  {
    property: "THE ABODE BY BROWN TREE",
    title: "Exceptional",
    content:
      "Value for money, incharge Rayyapan sir will take care like one of the family member, he will guide perfectly and we'll and good, thank you sir. Next time I will choose definitely this cottage, no disturbance, very peaceful area, but road condition is worst so kindly take action sir. Thank you Rayyapan sir, I will visit again.",
  },
  {
    property: "THE ABODE BY BROWN TREE",
    title: "Excellent stay",
    content: "Stay is best but little difficult to reach, roads are narrow for car and need to go downhill for any thing.",
  },
  {
    property: "THE ABODE BY BROWN TREE",
    title: "Exceptional",
    content:
      "Suite rooms are spacious, and many tourist places in Ooty are situated within 10 km of this stay. Value for money. Rooms were clean. Breakfast and dinner are available.",
  },
  {
    property: "THE ABODE BY BROWN TREE",
    title: "Best stay",
    content:
      "Best stay in that price range with lot of facilities and a good view from the balcony. Cleanliness is on point. Staffs are really good and are happy to help. Will definitely recommend for couples.",
  },
  {
    property: "THE ABODE BY BROWN TREE",
    title: "Exceptional",
    content:
      "Had a great and comfortable space for the stay, enjoyed a lot with a good scenic view and comfortable homemade style food. The staffs were more friendly and welcomed warmly.",
  },
  {
    property: "THE ABODE BY BROWN TREE",
    title: "A Fantastic Stay",
    content:
      "This is a very nice place for couples. The location is a bit remote yet accessible. The stay was perfect. The staff were super helpful and friendly. All the amenities were on point. Definitely coming back next time for a longer stay.",
  },
  {
    property: "THE ABODE BY BROWN TREE",
    title: "Awesome and Romantic",
    content:
      "We had a quality time here. Rooms are well maintained and cleaned. The fragrance smell gives a romantic stay. Awesome view from balcony. Definitely will visit again for their delicious food. Thank you so much Mr. Daniel for the good room.",
  },
  {
    property: "THE ABODE BY BROWN TREE",
    title: "100% safety",
    content:
      "It's genuinely good staff and I booked from Agoda. When I booked, I was also scared but don't worry, it's just what you want. I booked a Deluxe room and thought it would be a bit congested and small, but it was much bigger than I expected and exactly as shown in the picture. The manager and the other staff are kind and helpful. Try the morning breakfast — idli and dosa, so amazing! All in all, I like this stay and the full staff service. THANK YOU.",
  },

  // SHOLAS RESIDENCY BY BROWN TREE — Ooty
  {
    property: "SHOLAS RESIDENCY BY BROWN TREE",
    title: "Best stay for family members",
    content:
      "Our family had an amazing stay at Hotel Sholas Ooty. The rooms were spotless, spacious, and very comfortable. The staff welcomed us with genuine warmth and provided excellent service throughout our stay. The food was fresh, tasty, and hygienically prepared. Hotel Sholas is an excellent choice for families looking for comfort, hospitality, and a memorable stay in Ooty.",
  },
  {
    property: "SHOLAS RESIDENCY BY BROWN TREE",
    title: "Perfect Family Stay in Ooty",
    content:
      "I had a wonderful stay at Hotel Sholas, Ooty with my family. The staff welcomed us with a warm smile and made us feel truly special. The rooms were clean and comfortable, and the food was fresh, hygienic, and delicious. The staff also guided us to the best nearby attractions — Botanical Garden, Rose Garden, Tea Museum, Doddabetta Peak, and Ooty Lake. I highly recommend Hotel Sholas to anyone looking for comfort and outstanding service.",
  },
  {
    property: "SHOLAS RESIDENCY BY BROWN TREE",
    title: "Excellent",
    content:
      "Very good rooms and the ambience looks great. The amenities are also good and well maintained. The staff are very polite and supportive, which made the stay even more pleasant. The breakfast and dinner were delicious. Highly recommended!",
  },
  {
    property: "SHOLAS RESIDENCY BY BROWN TREE",
    title: "Very good",
    content: "Stay is neat and clean and nearby to all the tourist spots. Staff was very supportive and helpful, especially Yudha, very good in nature and very amiable.",
  },
  {
    property: "SHOLAS RESIDENCY BY BROWN TREE",
    title: "Very good stay",
    content:
      "I had a great stay at this hotel. The check-in process was smooth and the staff were very polite. The room was clean, spacious, and comfortable. Overall a very good experience and I would recommend this hotel to anyone visiting the area.",
  },
  {
    property: "SHOLAS RESIDENCY BY BROWN TREE",
    title: "Awesome stay!!!",
    content:
      "Wonderful stay at Sholas residency, staff members especially Mr. J. Kumar & Rahul are very cooperative and I would highly recommend this hotel on location, cleanliness and staff support!!",
  },
  {
    property: "SHOLAS RESIDENCY BY BROWN TREE",
    title: "Very good",
    content:
      "I had a comfortable and secure stay at this hotel. The rooms were well-maintained, the food was good, and the overall ambience was pleasant. The room amenities and cleanliness were excellent. Overall, we had a very pleasant stay and would definitely recommend this hotel to others.",
  },

  // HUMMING BIRD BY BROWN TREE — Kothagiri
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "Mansion (Calm Cozy & Cute)",
    content:
      "In one word, it was peaceful. Little away from market chaos but close enough so you can drive there anytime. Wooden floors & stairs will make you feel royal. The owner is a very humble and genuine person — he arranged a birthday cake for my wife, no charge. Breakfast is tasty, everyday different menu. Overall me and my wife loved the property and want everyone to stay there for a memorable trip.",
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "Serene Getaway at The Humming Bird",
    content:
      "We had a very peaceful and relaxing stay at The Humming Bird. It's a charming old British bungalow with beautiful interiors that reflect its heritage, while still being thoughtfully maintained for comfort. The staff were incredibly courteous and attentive. The location is superb, quiet and serene, yet conveniently accessible. We'd definitely love to visit again.",
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "Fantastic experience",
    content: "We loved the rooms, the look, the comfort and the view from the cottage. Excellent place to stay and accessible from railway station. Worth the money!!",
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "We had a wonderful stay at Humming Bird Hotel",
    content:
      "The property is located on a cliff and offers a mesmerising, breathtaking view. What really stood out for us was the exceptional cleanliness — not a single dust particle anywhere. The morning breakfast was another highlight — freshly prepared, a different menu every day, served directly at your table. A special thanks to Kunal, the manager. Highly recommended, and we look forward to coming back again.",
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "Super Stay",
    content: "I would recommend this property, it was very nice and staff are very good and good location.",
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "Excellent stay",
    content: "We have an excellent and wonderful stay. Breakfast was exceptional. I recommend this stay to all.",
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "A satisfactory Stay",
    content:
      "We got the property room at a very cheap rate compared to the average price quoted online. The room was a standard bedroom with typical amenities, including a complimentary kettle and tea and coffee. TV was functioning with high-speed wifi and the view outside the window was amazing. The owner was very cooperative and the complimentary breakfast was amazing before we checked out.",
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "A Magical Stay!",
    content:
      "If you are planning for Ooty without second thought go The Humming Bird Stay. It is an English style bungalow with a beautiful garden around, situated above mountains — you will wake up to sparkling sunrise with a beautiful misty view of the city. The breakfast is amazing and the staff are very friendly. Overall I want to say, 'it's a magical place'!",
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "Amazing Stay",
    content: "Had an amazing stay, the property is clean, nice interiors and very good location as well. Staff were very helpful as well.",
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    title: "Best homestay in Ooty",
    content:
      "This original colonial style homestay with wooden floors and wooden stairs is located in a quiet place uphill and at the same time not far from the city center. The view is breathtaking both during the morning and at night. The in-house complimentary breakfast options were great too — very tasty and served hot on order. Owner / caretakers are very attentive. You will love this peaceful quiet homestay. Must stay!!",
  },

  // HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE — Kodaikanal
  {
    property: "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE",
    title: "Great service",
    content: "Located at the centre of city and walkable to lake. Clean and spacious rooms. Staff behaved really well and supportive.",
  },
  {
    property: "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE",
    title: "Excellent stay",
    content: "I have travelled many times to Kodaikanal and this hotel is the best in what price range I got from Agoda.",
  },
  {
    property: "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE",
    title: "Good property",
    content: "Good decent property with spacious car parking. And easy to access to lake. Good, helpful staff, room was good and clean.",
  },
  {
    property: "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE",
    title: "Overall good",
    content:
      "Comfortable stay. Near by lake, hotels are all in walkable distance, available with car parking, value for money. I stayed there for two days — in first day they switched off the heater at evening time and in second day it was switched on. I suggest them to provide all time if possible. Other than that, all good.",
  },
  {
    property: "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE",
    title: "Great Stay",
    content: "Booked the hotel on a rush, surprisingly turned out to be great. Great staff, good locations, view was great.",
  },
  {
    property: "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE",
    title: "Excellent Facility for family",
    content: "Room is big and very clean. Very good supportive staffs. Location is near to lake and restaurants are in walking distance. Parking is available inside.",
  },
  {
    property: "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE",
    title: "Safe stay",
    content:
      "We stayed here for 2 nights and 2 days. Good atmosphere and safest place for family. We were told that a restaurant was available, but during our stay it was under renovation. Bed quality should be improved.",
  },
  {
    property: "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE",
    title: "Good Stay for Family",
    content:
      "Had a wonderful stay with my family over a weekend. Hotel is very near to the lake with walkable distance. Rooms were spacious and clean. Food prepared at the hotel was tasty. Thanks, liked the stay.",
  },
  {
    property: "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE",
    title: "Overall Good experience",
    content: "Very near to Kodaikanal lake. Good location. Peaceful environment. Excellent scenic view. Hot water is available. Kettle is also available. Overall good experience.",
  },
];
