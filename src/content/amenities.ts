import type { ImageKey } from "./images";

/**
 * AMENITIES — proposed categories only. Set `verified: true` once confirmed by
 * the facility, or `published: false` to hide anything not offered.
 */
export type AmenityIcon = "utensils" | "sparkle" | "shirt" | "palette" | "party" | "sofa" | "trees" | "users" | "church" | "scissors";

export interface Amenity {
  id: string;
  title: string;
  icon: AmenityIcon;
  text: string;
  group: "dining" | "living" | "activities" | "community";
  verified: boolean;
  published: boolean;
}

export const amenities: Amenity[] = [
  { id: "dining", title: "Dining", icon: "utensils", group: "dining", text: "Nourishing meals served in a social setting, with attention to therapeutic diets and personal preferences.", verified: false, published: true },
  { id: "housekeeping", title: "Housekeeping", icon: "sparkle", group: "living", text: "Regular housekeeping that keeps rooms and shared spaces clean, fresh, and comfortable.", verified: false, published: true },
  { id: "laundry", title: "Laundry", icon: "shirt", group: "living", text: "Personal laundry and linen service, handled with care for residents' belongings.", verified: false, published: true },
  { id: "activities", title: "Activities", icon: "palette", group: "activities", text: "A varied calendar of music, games, crafts, conversation, and gentle movement.", verified: false, published: true },
  { id: "events", title: "Social Events", icon: "party", group: "activities", text: "Seasonal celebrations, holiday gatherings, and special occasions shared together.", verified: false, published: true },
  { id: "common", title: "Common Areas", icon: "sofa", group: "living", text: "Comfortable shared spaces for reading, conversation, television, and visiting.", verified: false, published: true },
  { id: "outdoor", title: "Outdoor Spaces", icon: "trees", group: "community", text: "Outdoor areas for fresh air, sunshine, and quiet moments in good weather.", verified: false, published: true },
  { id: "family", title: "Family Visiting", icon: "users", group: "community", text: "Families are welcome partners; we encourage visits and celebrate family connection.", verified: false, published: true },
  { id: "spiritual", title: "Spiritual Support", icon: "church", group: "community", text: "Opportunities for faith, reflection, and connection with spiritual traditions.", verified: false, published: true },
  { id: "salon", title: "Salon & Barber", icon: "scissors", group: "living", text: "Hair care and grooming services that help residents look and feel their best.", verified: false, published: true },
];

export const publishedAmenities = amenities.filter((a) => a.published);

export const amenityGroups: { id: Amenity["group"]; title: string; text: string; image: ImageKey }[] = [
  { id: "dining", title: "Dining", text: "Mealtimes are some of the most social moments of the day. We aim for food that comforts, nourishes, and brings people together.", image: "lifeDining" },
  { id: "living", title: "Living Spaces", text: "Comfortable rooms and welcoming shared spaces, kept clean and cared for so residents can feel at ease.", image: "lifeLounge" },
  { id: "activities", title: "Activities", text: "Purposeful, enjoyable activities shaped by residents' interests — from music and games to creative projects.", image: "lifeActivities" },
  { id: "community", title: "Community Life", text: "Family visits, spiritual life, and time outdoors keep residents connected to the people and things they love.", image: "lifeGarden" },
];

/** Gallery for Amenities page — keys into the image registry. */
export const galleryImages: { image: ImageKey; caption: string }[] = [
  { image: "lifeDining", caption: "Dining" },
  { image: "lifeActivities", caption: "Activities" },
  { image: "lifeGarden", caption: "Outdoor spaces" },
  { image: "lifeFamily", caption: "Family visits" },
  { image: "lifeLounge", caption: "Common areas" },
  { image: "lifeSalon", caption: "Salon & barber" },
  { image: "lifeSpiritual", caption: "Reflection" },
  { image: "therapyPT", caption: "Therapy" },
];
