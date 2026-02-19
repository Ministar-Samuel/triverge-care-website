
export const SERVICES_BENTO = {
  large: [
    {
      title: "Nursing care at home or in our centre",
      icon: "solar:heart-pulse-bold-duotone",
      icon3d: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Heart%20suit/3D/heart_suit_3d.png",
      bg: "bg-[#f9f9f9]",
    },
    {
      title: "Dementia care and memory support",
      icon: "solar:brain-bold-duotone",
      icon3d: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Brain/3D/brain_3d.png",
      bg: "bg-[#f9f9f9]",
    },
  ],
  medium: [
    {
      title: "Rehabilitation after stroke or surgery",
      icon: "solar:wheelchair-bold-duotone",
      icon3d: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Manual%20wheelchair/3D/manual_wheelchair_3d.png",
    },
    {
      title: "Physiotherapy and mobility training",
      icon: "solar:walking-bold-duotone",
      icon3d: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Person%20walking/Default/3D/person_walking_3d_default.png",
    },
    {
      title: "Occupational therapy",
      icon: "solar:hand-stars-bold-duotone",
      icon3d: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Puzzle%20piece/3D/puzzle_piece_3d.png",
    },
    {
      title: "Respite care for families",
      icon: "solar:sofa-bold-duotone",
      icon3d: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Couch%20and%20lamp/3D/couch_and_lamp_3d.png",
    },
  ],
  list: [
    "Help with bathing, dressing, feeding",
    "Companionship and social activities",
    "Assisted living and full residential care",
    "Community palliative care for serious illness",
    "Education and coaching for caregivers",
  ],
};

export interface PromiseItem {
  title: string;
  icon: string;
  image: string;
  imagePosition?: string;
}

export const PROMISES: PromiseItem[] = [
  {
    title: "You can speak to our team anytime",
    icon: "solar:phone-calling-bold",
    image: "/images/speak-to-team.jpg", // Professional talking
  },
  {
    title: "You get a clear care plan",
    icon: "solar:document-text-bold",
    image: "/images/clear-care-plan.jpg", // Medical notes/planning
  },
  {
    title: "We monitor progress and adjust care quickly",
    icon: "solar:graph-up-bold",
    image: "/images/monitor-progress.jpg", // Caregiver monitoring
    imagePosition: "object-bottom",
  },
  {
    title: "Our caregivers are trained to handle complex needs",
    icon: "solar:diploma-verified-bold",
    image: "/images/trained-caregivers-complex.jpg", // Nurse/Caregiver
  },
  {
    title: "Your loved one feels supported emotionally and socially",
    icon: "solar:users-group-rounded-bold",
    image: "/images/emotional-support.jpg", // Holding hands/Support
  },
];

export const TESTIMONIALS = [
  {
    name: "Mrs. Folake Adebayo",
    role: "Daughter of Resident",
    content: "The peace of mind I have knowing my mother is in safe hands is priceless. Triverge isn't just a facility; it's a family.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Mr. Tunde Bakare",
    role: "Stroke Recovery Patient",
    content: "After my stroke, I didn't think I'd walk independently again. The physiotherapy team here pushed me with love and expertise.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=2135&auto=format&fit=crop"
  },
  {
    name: "Dr. Ngozi Okonjo",
    role: "Geriatric Specialist",
    content: "I recommend Triverge to all my patients. Their attention to clinical detail alongside social care is unmatched in Ibadan.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    name: "Chinedu Eze",
    role: "Son of Resident",
    content: "My father has dementia, and the specialized care he receives here has improved his quality of life significantly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Mrs. Amara Obi",
    role: "Wife of Patient",
    content: "When my husband needed palliative care, Triverge gave him comfort and dignity in his final months. I will forever be grateful for their compassion.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    name: "Prof. Emeka Nwosu",
    role: "Retired Academic",
    content: "The daily living assistance program lets me maintain my independence while having expert help when I need it. I still feel like myself.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Aisha Mohammed",
    role: "HCAP Graduate",
    content: "The training I received at Triverge transformed my career. I went from an untrained helper to a certified healthcare assistant in just weeks.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1976&auto=format&fit=crop"
  },
  {
    name: "Chief Adewale Balogun",
    role: "Community Elder",
    content: "Triverge has brought world-class elderly care to our community. The respect they show to every single resident is remarkable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  },
];

export const HCAP_CURRICULUM = [
  "Personal care",
  "Basic nursing support",
  "Dementia care skills",
  "Mobility and fall prevention",
  "Communication and compassion",
  "Safety and hygiene",
  "Documentation and reporting",
];

export const SERVICES_DETAILS: Record<string, {
  title: string;
  tagline: string;
  heroImage: string;
  description: string;
  features: string[];
  benefits: { title: string; desc: string; icon: string }[];
}> = {
  "skilled-nursing": {
    title: "Skilled Nursing",
    tagline: "Professional medical care in the comfort of home.",
    heroImage: "/images/trained-caregivers-complex.jpg", // Using existing image for now
    description: "Our skilled nursing service brings hospital-level care to your doorstep. Whether it's post-surgical wound care, intravenous therapy, or chronic disease management, our registered nurses ensure your loved one receives the highest standard of medical attention without the stress of hospital visits.",
    features: ["Medication Administration", "Wound Care & Dressing", "Vitals Monitoring", "Catheter Care", "Diabetic Management"],
    benefits: [
      { title: "Reduced Hospital Visits", desc: "Minimize exposure to infections and travel stress.", icon: "solar:hospital-bold-duotone" },
      { title: "Personalised Attention", desc: "One-on-one care tailored to specific medical needs.", icon: "solar:user-heart-bold-duotone" },
      { title: "Peace of Mind", desc: "Know that a qualified professional is managing clinical risks.", icon: "solar:shield-check-bold-duotone" }
    ]
  },
  "dementia-care": {
    title: "Dementia Care",
    tagline: "Compassionate support for memory and mind.",
    heroImage: "/images/emotional-support.jpg",
    description: "Caring for a loved one with dementia requires patience, understanding, and specialized skills. Our dementia care program focuses on maintaining dignity, managing behavioral changes, and creating safe, stimulating environments that reduce anxiety and confusion.",
    features: ["Memory Exercises", "Wandering Prevention", "Behavioral Support", "Daily Routine Structure", "Family Education"],
    benefits: [
      { title: "Safety First", desc: "Environments and protocols designed to prevent accidents.", icon: "solar:shield-warning-bold-duotone" },
      { title: "Cognitive Engagement", desc: "Activities that slow progression and spark joy.", icon: "solar:brain-bold-duotone" },
      { title: "Emotional Stability", desc: "Techniques to soothe agitation and build trust.", icon: "solar:heart-bold-duotone" }
    ]
  },
  "post-hospital-rehab": {
    title: "Post-Hospital Rehabilitation",
    tagline: "Bridge the gap between hospital and full recovery.",
    heroImage: "/images/physiotherapy.jpg",
    description: "Recovery doesn't end at discharge. Our post-hospital rehabilitation service provides the intensive support needed to regain strength and independence after surgery, stroke, or serious illness. We work closely with your discharge plan to prevent readmission.",
    features: ["Mobility Assistance", "Surgical Site Care", "Pain Management", "Follow-up Appointment Coordination", "Nutrition Planning"],
    benefits: [
      { title: "Faster Recovery", desc: "Consistent care speeds up the healing process.", icon: "solar:running-bold-duotone" },
      { title: "Prevent Readmission", desc: "Close monitoring catches complications early.", icon: "solar:history-bold-duotone" },
      { title: "Independence", desc: "Regain the ability to perform daily tasks sooner.", icon: "solar:accessibility-bold-duotone" }
    ]
  },
  "physiotherapy": {
    title: "Physiotherapy",
    tagline: "Restoring movement, strength, and confidence.",
    heroImage: "/images/physiotherapy.jpg",
    description: "Our physiotherapy services are designed to help seniors recover physical function and reduce pain. Whether rehabilitating from a fall, managing arthritis, or recovering from a stroke, our licensed physiotherapists create personalized exercise plans to improve balance, strength, and mobility.",
    features: ["Fall Prevention Training", "Pain Management", "Balance & Gait Training", "Strength Building", "Post-Stroke Recovery"],
    benefits: [
      { title: "Improved Mobility", desc: "Move more freely and safely in your daily life.", icon: "solar:running-bold-duotone" },
      { title: "Pain Reduction", desc: "Techniques to manage chronic pain without over-reliance on medication.", icon: "solar:heart-pulse-bold-duotone" },
      { title: "Independence", desc: "Stay active and self-sufficient for longer.", icon: "solar:accessibility-bold-duotone" }
    ]
  },
  "occupational-therapy": {
    title: "Occupational Therapy",
    tagline: "Making daily living easier and safer.",
    heroImage: "/images/clear-care-plan.jpg",
    description: "Occupational therapy focuses on the things you do every day. Our therapists help seniors overcome physical challenges to perform daily tasks like dressing, cooking, and bathing. We also assess home safety and recommend adaptive equipment to support independence.",
    features: ["Home Safety Assessment", "Adaptive Equipment Training", "Fine Motor Skills", "Cognitive Rehabilitation", "Daily Routine Optimization"],
    benefits: [
      { title: "Safer Home Environment", desc: "Reduce risks of falls and accidents at home.", icon: "solar:home-smile-bold-duotone" },
      { title: "Preserved Independence", desc: "Continue doing the things you love with the right support.", icon: "solar:user-hand-up-bold-duotone" },
      { title: "Custom Solutions", desc: "Strategies tailored to your specific living situation.", icon: "solar:settings-bold-duotone" }
    ]
  },
  "daily-living-assistance": {
    title: "Daily Living Assistance",
    tagline: "Respectful support for personal care needs.",
    heroImage: "/images/monitor-progress.jpg",
    description: "Sometimes, a little help goes a long way. Our daily living assistance provides respectful, dignified support with personal care tasks. From bathing and grooming to feeding and mobility, our caregivers ensure your loved one feels comfortable and cared for.",
    features: ["Bathing & Grooming", "Incontinence Care", "Feeding Assistance", "Transfer & Mobility", "Oral Hygiene"],
    benefits: [
      { title: "Dignity Preserved", desc: "Care provided with the utmost respect and privacy.", icon: "solar:shield-check-bold-duotone" },
      { title: "Hygiene & Health", desc: "Consistent care prevents infections and skin issues.", icon: "solar:bath-bold-duotone" },
      { title: "Relief for Family", desc: "We handle the physical demands of caregiving.", icon: "solar:sofa-bold-duotone" }
    ]
  },
  "companionship": {
    title: "Companionship",
    tagline: "Combatting loneliness with genuine connection.",
    heroImage: "/images/speak-to-team.jpg",
    description: "Loneliness can impact health as much as any physical condition. Our companionship service connects seniors with friendly, empathetic caregivers who provide conversation, accompany them on outings, play games, or simply share a meal. It's about bringing joy back into daily life.",
    features: ["Social Outings", "Meaningful Conversation", "Hobby Assistance", "Reading & Games", "Light Housekeeping"],
    benefits: [
      { title: "Mental Well-being", desc: "Social interaction boosts mood and cognitive health.", icon: "solar:smile-circle-bold-duotone" },
      { title: "Emotional Support", desc: "A trusted friend to share stories and feelings with.", icon: "solar:heart-bold-duotone" },
      { title: "Active Lifestyle", desc: "Encouragement to stay engaged with the world.", icon: "solar:walking-bold-duotone" }
    ]
  },
  "respite-care": {
    title: "Respite Care",
    tagline: "Support for you, so you can support them.",
    heroImage: "/images/emotional-support.jpg",
    description: "Caregiving is a full-time job, and everyone needs a break. Our respite care service steps in to provide high-quality care for your loved one while you rest, travel, or attend to other matters. Whether for a few hours or a few weeks, we ensure a seamless transition.",
    features: ["Short-Term Stays", "In-Home Relief", "Emergency Care", "Overnight Support", "Activity Engagement"],
    benefits: [
      { title: "Caregiver Burnout Prevention", desc: "Take time to recharge and maintain your own health.", icon: "solar:battery-charge-bold-duotone" },
      { title: "Seamless Continuity", desc: "Your loved one's routine is maintained without interruption.", icon: "solar:refresh-circle-bold-duotone" },
      { title: "Flexible Options", desc: "Care available whenever you need it most.", icon: "solar:clock-circle-bold-duotone" }
    ]
  },
  "palliative-care": {
    title: "Palliative Care",
    tagline: "Comfort, dignity, and quality of life.",
    heroImage: "/images/trained-caregivers-complex.jpg",
    description: "Our community palliative care focuses on relief from the symptoms and stress of serious illness. We work alongside curative treatment to improve quality of life for both the patient and the family, providing pain management, emotional support, and spiritual care.",
    features: ["Pain & Symptom Management", "Emotional & Spiritual Support", "Care Coordination", "Family Counseling", "End-of-Life Comfort"],
    benefits: [
      { title: "Focus on Polish", desc: "Prioritizing comfort and what matters most to the patient.", icon: "solar:star-fall-bold-duotone" },
      { title: "Holistic Support", desc: "Addressing physical, emotional, and spiritual needs.", icon: "solar:users-group-rounded-bold-duotone" },
      { title: "Family Guidance", desc: "Helping families navigate difficult decisions.", icon: "solar:signpost-bold-duotone" }
    ]
  },
  "residential-care": {
    title: "Residential Care",
    tagline: "A home away from home at our Ibadan Centre.",
    heroImage: "/images/ibadan-facility.jpg",
    description: "For those who need 24/7 support, our Geriatric Centre in Ibadan offers a safe, nurturing environment. Residents enjoy private or shared suites, nutritious meals, daily activities, and round-the-clock medical supervision, all within a community that feels like family.",
    features: ["24/7 Medical Supervision", "Nutritious Meal Plans", "Social Activities", "Secure Environment", "Housekeeping & Laundry"],
    benefits: [
      { title: "Constant Safety", desc: "Help is always just a button press away.", icon: "solar:shield-bold-duotone" },
      { title: "Vibrant Community", desc: "Make new friends and stay socially active.", icon: "solar:users-group-two-rounded-bold-duotone" },
      { title: "Maintenance-Free Living", desc: "We handle all the chores so residents can relax.", icon: "solar:armchair-bold-duotone" }
    ]
  },
  "caregiver-education": {
    title: "Caregiver Education (HCAP)",
    tagline: "Empowering caregivers with professional skills.",
    heroImage: "/images/clear-care-plan.jpg",
    description: "The Healthcare Assistant Programme (HCAP) is designed to train family members and aspiring professionals in the essentials of elderly care. From safety techniques to dementia communication, our curriculum provides the practical skills needed to care with confidence.",
    features: ["Practical Skills Training", "Dementia Care Modules", "First Aid & CPR", "Patient Handling", "Certification"],
    benefits: [
      { title: "Confidence", desc: "Know exactly how to handle complex care situations.", icon: "solar:check-circle-bold-duotone" },
      { title: "Employability", desc: "Gain skills that are in high demand.", icon: "solar:briefcase-bold-duotone" },
      { title: "Better Care Outcomes", desc: "Trained caregivers provide safer, more effective support.", icon: "solar:heart-bold-duotone" }
    ]
  },

};

// Helper for other services to use generic data if not explicitly defined above
const GENERIC_SERVICE = {
  heroImage: "/images/ibadan-facility.jpg",
  description: "Experience the Triverge difference with our compassionate, professional care. We are dedicated to improving the quality of life for seniors through personalised support and medical expertise.",
  features: ["Expert Caregivers", "Personalised Care Plans", "24/7 Support Available", "Family Updates", "Holistic Approach"],
  benefits: [
    { title: "Professional Standards", desc: "All caregivers are trained and vetted.", icon: "solar:diploma-bold-duotone" },
    { title: "Compassionate Care", desc: "We treat every client like family.", icon: "solar:heart-angle-bold-duotone" },
    { title: "Flexible Scheduling", desc: "Care that fits your family's routine.", icon: "solar:calendar-bold-duotone" }
  ]
};

export function getServiceBySlug(slug: string) {
  const service = SERVICES_DETAILS[slug];
  if (service) return service;

  // Fallback/Generic generation based on slug
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    ...GENERIC_SERVICE,
    title,
    tagline: "Exceptional care tailored to your needs.",
  };
}


export const VIDEO_TESTIMONIALS = [
  {
    id: "1",
    youtubeId: "dQw4w9WgXcQ", // Placeholder - User to update
    thumbnail: "https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=80&w=2070&auto=format&fit=crop",
    name: "Mrs. Abide",
    role: "Mother of HCAP Graduate",
    quote: "Triverge changed our lives completely."
  },
  {
    id: "2",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1968&auto=format&fit=crop",
    name: "Mr. Okafor",
    role: "Son of Resident",
    quote: "The facility is top-notch."
  },
  {
    id: "3",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop",
    name: "Nurse Amara",
    role: "Head of Nursing",
    quote: "I love working here."
  },
  {
    id: "4",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
    name: "Chief Adebayo",
    role: "Community Leader",
    quote: "A blessing to Ibadan."
  },
  {
    id: "5",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1551847677-dc82d764e1eb?q=80&w=2070&auto=format&fit=crop",
    name: "Mrs. Johnson",
    role: "Daughter of Patient",
    quote: "Finally, peace of mind."
  }
];

export const BLOG_CATEGORIES = [
  "All",
  "Health Tips",
  "Company News",
  "Caregiver Guide",
  "Nutrition",
  "Success Stories"
];

export const BLOG_POSTS = [
  {
    id: "featured",
    title: "The Emotional Side of Caregiving: How to Avoid Burnout & Find Balance",
    excerpt: "Caring for a loved one is rewarding but exhausting. Discover practical strategies to maintain your mental health while providing the best support.",
    category: "Caregiver Guide",
    date: "Oct 28, 2025",
    readTime: "5 min read",
    author: "Dr. A. Otaru",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=2070&auto=format&fit=crop",
    featured: true
  },
  {
    id: "1",
    title: "5 Early Signs of Dementia You Should Not Ignore",
    excerpt: "Memory loss is just one symptom. Learn to spot the subtle behavioral changes...",
    category: "Health Tips",
    date: "October 12, 2025",
    readTime: "4 min read",
    author: "Nurse Amara",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop",
    tags: ["Diagnosis", "Health Tips"]
  },
  {
    id: "2",
    title: "How to Prepare Your Home for Post-Hospital Recovery",
    excerpt: "Preparing your home for recovery is crucial for a smooth transition. Follow our step-by-step guide.",
    category: "Caregiver Guide",
    date: "Oct 5, 2025",
    readTime: "6 min read",
    author: "Dr. Ngozi Okonjo",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    secondary: true
  },
  {
    id: "3",
    title: "Why Social Interaction is Vital for Seniors",
    excerpt: "Isolation can be as damaging as illness. Here is how to keep your loved ones engaged and connected.",
    category: "Success Stories",
    date: "Sept 28, 2025",
    readTime: "4 min read",
    author: "Mrs. Folake Adebayo",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Nutritional Needs for the Elderly: A Simple Guide",
    excerpt: "Good nutrition is the foundation of good health. Learn about the essential nutrients for seniors.",
    category: "Nutrition",
    date: "Sept 15, 2025",
    readTime: "5 min read",
    author: "Nurse Amara",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2066&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Triverge Ibadan Centre: One Year of Compassionate Care",
    excerpt: "Celebrating our first anniversary and the lives we've touched in the Ibadan community.",
    category: "Company News",
    date: "Sept 1, 2025",
    readTime: "3 min read",
    author: "Dr. A. Otaru",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Managing Medication Safety at Home",
    excerpt: "Tips and tools for ensuring your loved ones take their prescriptions safely and on time.",
    category: "Caregiver Guide",
    date: "Aug 22, 2025",
    readTime: "7 min read",
    author: "Nurse Amara",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2070&auto=format&fit=crop"
  }
];
