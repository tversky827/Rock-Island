import type { ImageKey } from "./images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SERVICES — add, remove, or edit services here.
 * ─────────────────────────────────────────────────────────────────────────────
 *  IMPORTANT: These are proposed content categories. NONE has been confirmed
 *  by the facility yet. Each service carries `verified: false` until the
 *  Administrator / Director of Nursing confirms it is offered.
 *
 *  - `published: false` hides a service everywhere (nav, grids, sitemap, pages).
 *  - `flagship: true` services have bespoke pages at /services/<slug>.
 *    All other services render through the shared template at /services/[slug].
 */

export type ServiceIcon =
  | "stethoscope" | "footprints" | "home" | "activity" | "hand" | "message" | "bandage"
  | "pill" | "heart-pulse" | "scissors" | "droplet" | "utensils" | "sun" | "sparkles";

export type ServiceCategory = "nursing" | "rehabilitation" | "clinical" | "support";

export interface Service {
  slug: string;
  title: string;
  /** Short label for cards & navigation. */
  short: string;
  icon: ServiceIcon;
  category: ServiceCategory;
  image: ImageKey;
  /** One-sentence card description. */
  summary: string;
  /** Hero line on the service page. */
  headline: string;
  intro: string;
  body: string[];
  purpose: { title: string; text: string }[];
  whoItHelps: string[];
  related: string[];
  seo: { title: string; description: string };
  flagship?: boolean;
  verified: boolean;
  published: boolean;
}

export const serviceCategories: Record<ServiceCategory, string> = {
  nursing: "Nursing & Residential Care",
  rehabilitation: "Rehabilitation & Therapy",
  clinical: "Clinical Services",
  support: "Supportive Services",
};

export const services: Service[] = [
  {
    slug: "skilled-nursing",
    title: "Skilled Nursing",
    short: "Skilled Nursing",
    icon: "stethoscope",
    category: "nursing",
    image: "nursing",
    flagship: true,
    summary: "Around-the-clock licensed nursing care, thoughtfully coordinated with each resident's physicians and family.",
    headline: "Professional Nursing Care. Delivered With Heart.",
    intro:
      "Skilled nursing is for people whose health needs call for the ongoing attention of licensed nurses — after a hospital stay, during a complex recovery, or when a chronic condition requires careful daily oversight.",
    body: [
      "Our nursing team works from an individualized care plan built around each resident's medical needs, personal routines, and preferences. That plan is reviewed regularly and adjusted as needs change, in coordination with the resident's attending physician and the broader care team.",
      "Clinical skill matters. So does the way care is delivered. We ask our nurses and nursing assistants to take the time to explain, to listen, and to treat every interaction as an opportunity to preserve dignity and comfort.",
    ],
    purpose: [
      { title: "Individualized care planning", text: "Care plans reflect clinical orders, personal history, preferences, and goals — and are revisited as needs evolve." },
      { title: "Physician coordination", text: "Nurses communicate observations and changes in condition to attending physicians and specialists so care decisions are well informed." },
      { title: "Family communication", text: "Families are kept informed and are welcome partners in care conferences and day-to-day decisions." },
      { title: "Dignity in every task", text: "Personal care is delivered privately, respectfully, and at a pace that honors the resident." },
    ],
    whoItHelps: [
      "People transitioning from a hospital stay who need continued nursing oversight",
      "Individuals managing complex or multiple chronic conditions",
      "Residents who require medication administration, monitoring, or treatments by licensed nurses",
    ],
    related: ["short-term-rehabilitation", "medication-management", "wound-care", "long-term-care"],
    seo: {
      title: "Skilled Nursing in Rock Island, IL",
      description: "Skilled nursing care in Rock Island, Illinois with individualized care plans, physician coordination, and family communication. Serving the Quad Cities.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "short-term-rehabilitation",
    title: "Short-Term Rehabilitation",
    short: "Short-Term Rehab",
    icon: "footprints",
    category: "rehabilitation",
    image: "rehab",
    flagship: true,
    summary: "Focused, goal-oriented therapy and nursing support designed to help people prepare for the next step after a hospital stay.",
    headline: "Helping Residents Regain Strength, Confidence, and Independence.",
    intro:
      "Short-term rehabilitation bridges the gap between hospital and home. It combines therapy with skilled nursing support so people recovering from surgery, illness, or injury can work toward their personal goals in a supportive setting.",
    body: [
      "Every rehabilitation stay begins with evaluations by our therapy and nursing teams. Together with the resident and family, we set goals that matter to that person — walking to the mailbox, managing stairs, cooking a simple meal, or speaking with confidence.",
      "Progress is reviewed regularly by the interdisciplinary team, and discharge planning starts early so that the transition home, or to the next level of care, is well prepared.",
    ],
    purpose: [
      { title: "Personal recovery goals", text: "Therapy plans are built around what each person wants to get back to in daily life." },
      { title: "Therapy and nursing together", text: "Therapists and nurses coordinate so that skills practiced in therapy carry into the rest of the day." },
      { title: "Early discharge planning", text: "Our team begins planning for the transition from the start, including education for family caregivers." },
      { title: "Clear progress updates", text: "Residents and families receive regular updates on goals, progress, and next steps." },
    ],
    whoItHelps: [
      "People recovering after joint replacement, fracture, or other surgery",
      "Individuals regaining strength after a hospitalization for illness",
      "Those recovering from stroke or other neurological events, as clinically appropriate",
    ],
    related: ["physical-therapy", "occupational-therapy", "speech-therapy", "post-surgical-recovery"],
    seo: {
      title: "Short-Term Rehab in Rock Island, IL",
      description: "Short-term rehab in Rock Island, IL: physical, occupational, and speech therapy with skilled nursing. Serving Moline, Davenport, and the Quad Cities.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "long-term-care",
    title: "Long-Term Care",
    short: "Long-Term Care",
    icon: "home",
    category: "nursing",
    image: "longTerm",
    flagship: true,
    summary: "A supportive, comfortable home for people who need ongoing assistance and nursing care each day.",
    headline: "A Place Where Comfort, Connection, and Care Come Together.",
    intro:
      "Long-term care is for people who need ongoing help with daily activities and continuous access to nursing care. Here, it is also about home — familiar faces, personal routines, and a life that continues to have meaning.",
    body: [
      "We get to know each long-term resident as a person: their history, their family, their favorite foods, the music they love, and how they like to start the day. That knowledge shapes everything from care planning to activity calendars.",
      "Families remain a vital part of life here. We encourage visits, welcome participation in care conferences, and keep communication open so that loved ones always know how their family member is doing.",
    ],
    purpose: [
      { title: "Daily comfort and support", text: "Help with bathing, dressing, mobility, dining, and personal care — delivered with patience and respect." },
      { title: "Consistent nursing oversight", text: "Licensed nurses monitor health, administer medications, and coordinate with physicians." },
      { title: "Meaningful days", text: "Activities, social connection, and spiritual support help every day feel like more than a routine." },
      { title: "Family partnership", text: "Care conferences and ongoing communication keep families involved and informed." },
    ],
    whoItHelps: [
      "Individuals who can no longer safely live at home, even with support",
      "People living with chronic conditions that require daily nursing care",
      "Families seeking a caring, stable environment for a loved one",
    ],
    related: ["skilled-nursing", "medication-management", "pain-management", "respite-care"],
    seo: {
      title: "Long-Term Care in Rock Island, IL",
      description: "Long-term nursing home care in Rock Island, Illinois with daily support, nursing oversight, meaningful activities, and family partnership.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "therapy-services",
    title: "Therapy Services",
    short: "Therapy Services",
    icon: "activity",
    category: "rehabilitation",
    image: "therapyPT",
    flagship: true,
    summary: "Physical, occupational, and speech therapy delivered by licensed therapists as part of a coordinated plan of care.",
    headline: "Therapy That Meets People Where They Are.",
    intro:
      "Our therapy services bring together physical, occupational, and speech therapy to support mobility, independence, communication, and safety — for short-term rehabilitation guests and long-term residents alike.",
    body: [
      "Therapists evaluate each person individually, then design a plan around clinical needs and personal goals. Sessions are adapted as strength, endurance, and confidence change.",
      "Because therapy works best when it is reinforced, our therapists share strategies with nursing staff and families so that progress continues outside the therapy room.",
    ],
    purpose: [
      { title: "Physical therapy", text: "Strength, balance, mobility, and safe movement." },
      { title: "Occupational therapy", text: "Independence with the activities of daily life." },
      { title: "Speech therapy", text: "Communication, cognition, and safe swallowing." },
      { title: "Coordinated plans", text: "Therapy goals shared across nursing, social services, and family." },
    ],
    whoItHelps: [
      "Short-term rehabilitation guests working toward returning home",
      "Long-term residents maintaining function, comfort, and safety",
      "People whose physician has ordered therapy evaluation and treatment",
    ],
    related: ["physical-therapy", "occupational-therapy", "speech-therapy", "short-term-rehabilitation"],
    seo: {
      title: "Therapy Services in Rock Island, IL",
      description: "Physical, occupational, and speech therapy in Rock Island, Illinois for rehabilitation and long-term residents. Coordinated, individualized therapy plans.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "physical-therapy",
    title: "Physical Therapy",
    short: "Physical Therapy",
    icon: "footprints",
    category: "rehabilitation",
    image: "therapyPT",
    summary: "Individualized exercise and mobility training to build strength, balance, and confidence in movement.",
    headline: "Moving Forward, One Step at a Time.",
    intro:
      "Physical therapy focuses on the body's ability to move safely and with confidence. Our physical therapists work with each person on strength, balance, endurance, and mobility based on a thorough evaluation.",
    body: [
      "Sessions may include therapeutic exercise, gait and transfer training, balance work, and instruction in the safe use of walkers, canes, or wheelchairs. Plans are adjusted as each person's abilities change.",
      "Therapists also look ahead to daily life — practicing the movements a person will need at home, such as getting in and out of a chair, a car, or a bed.",
    ],
    purpose: [
      { title: "Strength & endurance", text: "Targeted exercise to rebuild muscle strength and stamina." },
      { title: "Balance & fall-risk awareness", text: "Training and education to support safer movement." },
      { title: "Mobility & transfers", text: "Practice with walking, stairs, and everyday transitions." },
      { title: "Assistive device training", text: "Guidance on choosing and safely using mobility aids." },
    ],
    whoItHelps: [
      "People recovering from orthopedic surgery or injury",
      "Individuals with weakness following illness or hospitalization",
      "Residents who want to maintain mobility and independence",
    ],
    related: ["occupational-therapy", "short-term-rehabilitation", "post-surgical-recovery", "therapy-services"],
    seo: {
      title: "Physical Therapy in Rock Island, IL",
      description: "Physical therapy in Rock Island, Illinois focused on strength, balance, mobility, and safe movement for rehabilitation and long-term residents.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "occupational-therapy",
    title: "Occupational Therapy",
    short: "Occupational Therapy",
    icon: "hand",
    category: "rehabilitation",
    image: "therapyOT",
    summary: "Practical, hands-on therapy that supports independence with dressing, bathing, cooking, and the routines of daily life.",
    headline: "Independence in the Moments That Matter.",
    intro:
      "Occupational therapy helps people do the everyday things that make life their own — getting dressed, grooming, preparing a meal, or managing a morning routine.",
    body: [
      "Our occupational therapists assess how a person performs daily activities and identify the skills, strategies, or adaptive equipment that can help. Practice is practical and purposeful.",
      "When a return home is planned, occupational therapists can recommend home safety considerations and train family members in ways to provide support.",
    ],
    purpose: [
      { title: "Daily living skills", text: "Dressing, bathing, grooming, toileting, and meal preparation." },
      { title: "Fine motor & coordination", text: "Hand strength and dexterity for everyday tasks." },
      { title: "Adaptive equipment", text: "Recommendations and training for tools that make tasks easier." },
      { title: "Home readiness", text: "Safety recommendations and caregiver education for the transition home." },
    ],
    whoItHelps: [
      "People relearning daily tasks after surgery, stroke, or illness",
      "Individuals with arthritis or reduced hand function",
      "Residents seeking to preserve independence in self-care",
    ],
    related: ["physical-therapy", "speech-therapy", "short-term-rehabilitation", "therapy-services"],
    seo: {
      title: "Occupational Therapy in Rock Island, IL",
      description: "Occupational therapy in Rock Island, Illinois supporting independence with dressing, bathing, meal preparation, and daily routines.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "speech-therapy",
    title: "Speech Therapy",
    short: "Speech Therapy",
    icon: "message",
    category: "rehabilitation",
    image: "therapyST",
    summary: "Support for communication, cognition, and safe swallowing from licensed speech-language pathologists.",
    headline: "Helping Every Voice Be Heard.",
    intro:
      "Speech-language pathologists help people with speech, language, memory and thinking skills, and swallowing. These abilities shape how we connect with others — and how safely we eat and drink.",
    body: [
      "Therapy begins with an evaluation and is tailored to the individual. It may include exercises for speech clarity, strategies for word-finding or memory, or swallowing evaluation and recommendations for safe diet textures.",
      "Speech therapists work closely with nursing and dietary staff so that recommendations are followed consistently at every meal and conversation.",
    ],
    purpose: [
      { title: "Speech & language", text: "Clarity, expression, and understanding." },
      { title: "Cognitive communication", text: "Attention, memory, problem-solving, and orientation strategies." },
      { title: "Swallowing support", text: "Evaluation and diet recommendations coordinated with dietary services." },
      { title: "Family education", text: "Communication strategies families can use during visits and at home." },
    ],
    whoItHelps: [
      "People recovering from stroke or other neurological conditions",
      "Individuals experiencing swallowing difficulty",
      "Residents with changes in memory or communication",
    ],
    related: ["occupational-therapy", "physical-therapy", "nutrition-dietary-services", "therapy-services"],
    seo: {
      title: "Speech Therapy in Rock Island, IL",
      description: "Speech therapy in Rock Island, Illinois for communication, cognition, and swallowing, coordinated with nursing and dietary teams.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "wound-care",
    title: "Wound Care",
    short: "Wound Care",
    icon: "bandage",
    category: "clinical",
    image: "clinical",
    summary: "Attentive nursing assessment and treatment of wounds, following physician orders and current clinical practices.",
    headline: "Careful Attention to Healing.",
    intro:
      "Wound care requires consistency, close observation, and clear communication. Our nurses assess and treat wounds according to physician orders and monitor for changes that should be reported promptly.",
    body: [
      "Care may include regular assessment and measurement, dressing changes, pressure redistribution, repositioning schedules, and nutritional support coordinated with dietary staff.",
      "Prevention matters too. Our team works to identify residents at higher risk of skin breakdown and builds protective measures into daily care.",
    ],
    purpose: [
      { title: "Regular assessment", text: "Ongoing observation and documentation of wound status." },
      { title: "Treatment per orders", text: "Dressings and treatments delivered as prescribed by the physician." },
      { title: "Prevention focus", text: "Repositioning, skin checks, and pressure-relief strategies." },
      { title: "Nutrition coordination", text: "Dietary support to promote healing, in partnership with dietary services." },
    ],
    whoItHelps: [
      "People with surgical wounds following a procedure",
      "Individuals with pressure injuries or chronic wounds",
      "Residents at elevated risk of skin breakdown",
    ],
    related: ["skilled-nursing", "post-surgical-recovery", "nutrition-dietary-services", "pain-management"],
    seo: {
      title: "Wound Care in Rock Island, IL",
      description: "Nursing wound care in Rock Island, Illinois with regular assessment, treatment per physician orders, prevention, and nutrition coordination.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "medication-management",
    title: "Medication Management",
    short: "Medication Management",
    icon: "pill",
    category: "clinical",
    image: "clinical",
    summary: "Accurate, coordinated medication administration and monitoring by licensed nursing staff.",
    headline: "Precision and Care in Every Dose.",
    intro:
      "Many residents take multiple medications, each with its own schedule and considerations. Licensed nurses administer medications as prescribed and monitor for effects and changes.",
    body: [
      "Medication management includes administering medications as ordered, observing for side effects, communicating with physicians and pharmacy partners, and participating in regular medication reviews.",
      "We also take time to explain medication changes to residents and families so everyone understands the plan.",
    ],
    purpose: [
      { title: "Administration as prescribed", text: "Medications given on schedule by licensed nursing staff." },
      { title: "Monitoring", text: "Observation for effects, side effects, and changes in condition." },
      { title: "Pharmacy coordination", text: "Communication with prescribers and pharmacy partners." },
      { title: "Clear explanations", text: "Plain-language updates for residents and families." },
    ],
    whoItHelps: [
      "Residents with complex medication schedules",
      "People transitioning from hospital with new prescriptions",
      "Individuals who need monitoring after medication changes",
    ],
    related: ["skilled-nursing", "pain-management", "iv-therapy", "long-term-care"],
    seo: {
      title: "Medication Management in Rock Island, IL",
      description: "Medication administration and monitoring by licensed nurses at Rock Island Nursing Home in Rock Island, Illinois.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "pain-management",
    title: "Pain Management",
    short: "Pain Management",
    icon: "heart-pulse",
    category: "clinical",
    image: "nursing",
    summary: "Ongoing attention to comfort, using physician-directed approaches and attentive nursing observation.",
    headline: "Comfort Is Part of Care.",
    intro:
      "Pain can affect sleep, mood, appetite, and participation in therapy. We treat comfort as an essential part of every care plan.",
    body: [
      "Nurses regularly ask about and observe for pain — including in residents who may have difficulty describing it. Findings are communicated to the physician, who directs the treatment approach.",
      "Approaches may include medication as ordered as well as non-medication comfort measures such as positioning, warmth, gentle activity, and therapy techniques.",
    ],
    purpose: [
      { title: "Regular comfort checks", text: "Routine assessment, including non-verbal cues." },
      { title: "Physician-directed treatment", text: "Approaches ordered and adjusted by the attending physician." },
      { title: "Non-medication comfort", text: "Positioning, therapy techniques, and comfort measures." },
      { title: "Supporting participation", text: "Comfort that helps residents engage in therapy and daily life." },
    ],
    whoItHelps: [
      "People recovering from surgery or injury",
      "Individuals living with chronic pain conditions",
      "Residents who may not easily express discomfort",
    ],
    related: ["skilled-nursing", "medication-management", "post-surgical-recovery", "therapy-services"],
    seo: {
      title: "Pain Management in Rock Island, IL",
      description: "Attentive, physician-directed pain management and comfort care at Rock Island Nursing Home in Rock Island, Illinois.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "post-surgical-recovery",
    title: "Post-Surgical Recovery",
    short: "Post-Surgical Recovery",
    icon: "sparkles",
    category: "rehabilitation",
    image: "rehab",
    summary: "Nursing and therapy support for people recovering after surgery who need more help than home can provide.",
    headline: "Support for the Days After Surgery.",
    intro:
      "After surgery, many people are ready to leave the hospital but not yet ready to manage at home. Post-surgical recovery care provides nursing oversight and therapy in a supportive environment.",
    body: [
      "Our team follows the surgeon's and physician's orders for incision care, activity, and medications, while therapists help rebuild strength and mobility.",
      "We coordinate follow-up appointments and prepare residents and families for a safe transition home.",
    ],
    purpose: [
      { title: "Following surgical orders", text: "Care aligned with the surgeon's and physician's instructions." },
      { title: "Incision & wound care", text: "Monitoring and care per orders." },
      { title: "Therapy support", text: "Physical and occupational therapy as ordered." },
      { title: "Follow-up coordination", text: "Help coordinating follow-up appointments and the transition home." },
    ],
    whoItHelps: [
      "People recovering after joint replacement or orthopedic surgery",
      "Individuals recovering after general or cardiac surgery, as clinically appropriate",
      "Anyone needing short-term support between hospital and home",
    ],
    related: ["short-term-rehabilitation", "physical-therapy", "wound-care", "pain-management"],
    seo: {
      title: "Post-Surgical Recovery in Rock Island, IL",
      description: "Post-surgical recovery with nursing oversight and therapy in Rock Island, Illinois. Serving patients from Quad Cities hospitals.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "iv-therapy",
    title: "IV Therapy",
    short: "IV Therapy",
    icon: "droplet",
    category: "clinical",
    image: "clinical",
    summary: "Intravenous therapies administered by qualified nursing staff according to physician orders, where offered.",
    headline: "Clinical Capability, Close to Home.",
    intro:
      "Some residents need intravenous medications or fluids as part of their recovery. Where this service is offered, IV therapy is provided by qualified nursing staff according to physician orders.",
    body: [
      "IV therapy may allow some people to complete a course of treatment outside the hospital. Our admissions team reviews each referral to confirm that the specific therapy ordered can be supported.",
      "Nurses monitor IV sites and responses to treatment and communicate promptly with physicians and pharmacy partners.",
    ],
    purpose: [
      { title: "Administration per orders", text: "IV medications and fluids as prescribed." },
      { title: "Site monitoring", text: "Regular assessment of IV access sites." },
      { title: "Referral review", text: "Each referral is reviewed to confirm the therapy can be supported." },
      { title: "Pharmacy partnership", text: "Coordination with pharmacy for preparation and delivery." },
    ],
    whoItHelps: [
      "People completing a course of IV antibiotics after hospitalization",
      "Individuals who need IV hydration as ordered",
      "Patients whose physicians recommend continued IV therapy in a nursing setting",
    ],
    related: ["skilled-nursing", "medication-management", "post-surgical-recovery", "short-term-rehabilitation"],
    seo: {
      title: "IV Therapy in Rock Island, IL",
      description: "IV therapy administered by qualified nursing staff per physician orders at Rock Island Nursing Home. Contact admissions to confirm availability.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "respite-care",
    title: "Respite Care",
    short: "Respite Care",
    icon: "sun",
    category: "support",
    image: "lifeLounge",
    summary: "Short stays that give family caregivers time to rest while their loved one receives attentive care.",
    headline: "Rest for Caregivers. Care for Loved Ones.",
    intro:
      "Caring for a family member at home is an act of love — and it can be exhausting. Respite stays, where offered, provide a temporary, supportive place for a loved one while caregivers rest, travel, or attend to other needs.",
    body: [
      "Respite guests receive the same attentive nursing care, meals, and activities as other residents. Our team learns their routines in advance so the stay feels comfortable and familiar.",
      "Availability depends on care needs, payment source, and bed availability; our admissions team can discuss options.",
    ],
    purpose: [
      { title: "Caregiver relief", text: "Time for family caregivers to rest and recharge." },
      { title: "Continuity of routine", text: "Personal routines and preferences learned before arrival." },
      { title: "Full participation", text: "Respite guests are welcome in dining and activities." },
      { title: "A first introduction", text: "A gentle way for families to get to know our community." },
    ],
    whoItHelps: [
      "Family caregivers who need a break",
      "Families planning travel or managing their own health needs",
      "Individuals who may consider long-term care in the future",
    ],
    related: ["long-term-care", "skilled-nursing", "nutrition-dietary-services"],
    seo: {
      title: "Respite Care in Rock Island, IL",
      description: "Short-term respite stays in Rock Island, Illinois that give family caregivers time to rest. Contact admissions to discuss availability.",
    },
    verified: false,
    published: true,
  },
  {
    slug: "nutrition-dietary-services",
    title: "Nutrition & Dietary Services",
    short: "Nutrition & Dietary",
    icon: "utensils",
    category: "support",
    image: "lifeDining",
    summary: "Nourishing meals and dietary planning that respect medical needs, personal preferences, and the joy of a good meal.",
    headline: "Nourishment for Body and Spirit.",
    intro:
      "Meals are about more than nutrition. They are a source of comfort, routine, and connection. Our dietary team works to prepare food that is nourishing, appealing, and aligned with each resident's needs.",
    body: [
      "Dietary planning considers physician-ordered diets, texture recommendations from speech therapy, allergies, cultural and personal preferences, and appetite changes.",
      "Where a dietitian is part of the team, nutritional assessments help support healing, strength, and overall well-being.",
    ],
    purpose: [
      { title: "Therapeutic diets", text: "Meals that follow physician-ordered dietary requirements." },
      { title: "Texture modifications", text: "Coordinated with speech therapy recommendations." },
      { title: "Personal preferences", text: "Favorite foods, cultural traditions, and choices honored where possible." },
      { title: "Social dining", text: "Mealtimes designed to encourage connection and conversation." },
    ],
    whoItHelps: [
      "Residents with medically prescribed diets",
      "People with swallowing difficulties",
      "Anyone whose recovery benefits from careful nutritional support",
    ],
    related: ["speech-therapy", "wound-care", "long-term-care"],
    seo: {
      title: "Nutrition & Dietary Services",
      description: "Nutrition and dietary services at Rock Island Nursing Home: therapeutic diets, texture modifications, and meals that honor personal preferences.",
    },
    verified: false,
    published: true,
  },
];

export const publishedServices = services.filter((s) => s.published);
export const flagshipServices = publishedServices.filter((s) => s.flagship);
export const getService = (slug: string) => publishedServices.find((s) => s.slug === slug);
export const serviceHref = (slug: string) => `/services/${slug}`;

/** Ordered list for the homepage services grid. */
export const homepageServiceSlugs = [
  "skilled-nursing", "short-term-rehabilitation", "long-term-care", "physical-therapy",
  "occupational-therapy", "speech-therapy", "wound-care", "medication-management",
  "pain-management", "post-surgical-recovery", "iv-therapy", "respite-care",
];
