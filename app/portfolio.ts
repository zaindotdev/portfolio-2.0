export const email = "zaindeveloperr@gmail.com";
export type Project = {
  slug: string; title: string; tags: string; color: string; category: string;
  cover: string; description: string; overview: string; outcome: string;
  image?: string; imageAlt?: string; github?: string; live?: string;
  features: [string, string][]; stack: string[];
};
export const projects: Project[] = [
  {
    "slug": "interview-ai",
    "title": "Interview AI.",
    "tags": "Next.js / Voice AI",
    "color": "jade",
    "category": "Interview preparation",
    "cover": "Practice with purpose.",
    "image": "/projects/interview-ai.png",
    "imageAlt": "Interview AI landing page showing personalized interview practice and real-time feedback",
    "description": "Personalized mock interviews, real-time voice conversations, and actionable feedback to help candidates walk into their next interview with confidence.",
    "overview": "Interview AI brings preparation, practice, and review into one experience. Candidates can upload a resume, practice questions tailored to a role, and review their performance after an AI-led mock interview. The focus is on making interview preparation more personal and less intimidating.",
    "features": [
      [
        "Prepare for your role",
        "Resume upload and AI analysis inform role-specific interview questions."
      ],
      [
        "Practice out loud",
        "Voice-based mock interviews use real-time speech and WebRTC to recreate a conversational interview."
      ],
      [
        "Review and improve",
        "Detailed feedback, analysis reports, video recording and playback, and progress tracking support the next practice session."
      ]
    ],
    "stack": [
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "OpenAI",
      "Gemini",
      "Vapi AI",
      "Cloudinary",
      "Stripe"
    ],
    "github": "https://github.com/zaindotdev/interview-ai",
    "live": "https://interview-ai.live",
    "outcome": "A connected preparation flow: bring your resume, practice an interview, then use the feedback to decide what to work on next."
  },
  {
    "slug": "ravintola-amazona",
    "title": "Ravintola Amazona.",
    "tags": "Django REST / React",
    "color": "marigold",
    "category": "Restaurant platform",
    "cover": "Behind the daily rush.",
    "description": "A full-stack platform for a Finnish restaurant, connecting its customer-facing experience with backend operations.",
    "overview": "Ravintola Amazona brings the restaurant’s frontend and backend together in one application. The project pairs a React interface with a Django REST backend to support the restaurant’s digital experience and day-to-day workflows.",
    "features": [
      [
        "Restaurant-focused experience",
        "An application built around the needs of a Finnish restaurant."
      ],
      [
        "Connected frontend and backend",
        "React handles the interface while Django REST provides the application API."
      ]
    ],
    "stack": [
      "React",
      "Django REST Framework"
    ],
    "github": "https://github.com/TimsalHassan/Rovitola-Amazona",
    "outcome": "One full-stack application connecting the restaurant experience from frontend to backend."
  },
  {
    "slug": "fitness-tracker",
    "title": "Fitness Tracker.",
    "tags": "React Native / Expo / Supabase",
    "color": "purple",
    "category": "Mobile fitness app · GitHub",
    "cover": "Move. Log. Repeat.",
    "description": "A mobile companion for home and gym workouts, daily nutrition, hydration, and activity—all organized around personal fitness goals.",
    "overview": "Fitness Tracker turns a collection of daily habits into one mobile dashboard. Goal-based onboarding leads into home or gym workout plans, while the home screen brings together calories, macronutrients, water intake, steps, and active minutes. The app is available as a source-code project on GitHub.",
    "features": [
      [
        "Plans that fit your routine",
        "Switch between home and gym plans, browse the week, and open a workout’s exercises and duration."
      ],
      [
        "Daily habits in one view",
        "Track meals, calories, macronutrients, water, steps, and active minutes from the home dashboard."
      ],
      [
        "A personal mobile experience",
        "Onboarding, fitness goals, profile settings, notifications, and theme preferences support a consistent routine."
      ]
    ],
    "stack": [
      "React Native",
      "Expo",
      "TypeScript",
      "Expo Router",
      "Supabase",
      "Redux Toolkit",
      "NativeWind",
      "Expo Sensors"
    ],
    "github": "https://github.com/zaindotdev/fitness_tracker",
    "outcome": "A single mobile experience for planning workouts and checking in on everyday health and fitness habits."
  },
  {
    "slug": "home-services-marketplace",
    "title": "Handigo.",
    "tags": "Express / Prisma / PostGIS",
    "color": "bone",
    "category": "Home services marketplace",
    "cover": "Trust starts at home.",
    "description": "A home services marketplace connecting homeowners with CNIC-verified technicians, with trust at the center of the experience.",
    "overview": "Handigo is a marketplace for homeowners and service technicians. The project centers on helping people find a technician with identity verification built into the experience, supported by an Express backend and a Prisma and PostGIS data stack.",
    "features": [
      [
        "Connect homeowners and technicians",
        "Bring demand for home services and the people who provide them into one marketplace."
      ],
      [
        "Verification as a foundation",
        "CNIC verification helps establish a technician’s identity before a homeowner chooses a service provider."
      ]
    ],
    "stack": [
      "Express",
      "Prisma",
      "PostGIS"
    ],
    "github": "https://github.com/zaindotdev/handigo",
    "outcome": "A marketplace concept organized around finding help for the home and establishing trust in the service provider."
  },
  {
    "slug": "multi-vendor-ecommerce",
    "title": "Multi-Vendor Commerce.",
    "tags": "Django REST / React / Celery",
    "color": "jade",
    "category": "Commerce platform",
    "cover": "Many vendors. One market.",
    "image": "/projects/multi-vendor-ecommerce.png",
    "imageAlt": "Multi-Vendor E-Commerce Platform project preview",
    "description": "A marketplace covering vendor management, product catalogs, orders, and payments, with background jobs handling automated work.",
    "overview": "This multi-vendor e-commerce platform brings the core parts of a marketplace together: managing sellers, maintaining a product catalog, processing orders, and handling payments. A Django REST API and React interface are supported by PostgreSQL, Redis, Celery, and Docker.",
    "features": [
      [
        "Vendor and catalog management",
        "Keep marketplace sellers and their product catalogs organized within one platform."
      ],
      [
        "Orders and payments",
        "Support the commerce workflow from product selection through order processing and payment."
      ],
      [
        "Automated background work",
        "Celery and Redis handle background tasks, with Docker supporting a consistent application environment."
      ]
    ],
    "stack": [
      "Django REST Framework",
      "React",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker"
    ],
    "github": "https://github.com/zaindotdev/Multi-Vendor-Ecommerce-Platform",
    "outcome": "A full-stack marketplace combining the customer-facing shopping experience with the operational services behind it."
  },
  {
    "slug": "truefeedback",
    "title": "TrueFeedback.",
    "tags": "Next.js / MongoDB / NextAuth",
    "color": "vermilion",
    "category": "Anonymous feedback",
    "cover": "Make room for honesty.",
    "image": "/projects/truefeedback.png",
    "imageAlt": "TrueFeedback anonymous feedback application preview",
    "description": "An anonymous feedback platform with secure authentication, role-based access, and serverless database operations.",
    "overview": "TrueFeedback gives people a place to collect anonymous feedback while keeping account access secure. Built with Next.js and MongoDB, the application uses NextAuth for authentication and Tailwind CSS for its interface.",
    "features": [
      [
        "Anonymous feedback",
        "Create a space for feedback without requiring the sender’s identity to be part of the message."
      ],
      [
        "Controlled account access",
        "Authentication and role-based access control support the platform’s account experience."
      ],
      [
        "A modern web stack",
        "Next.js, MongoDB, and serverless database operations connect the interface with its stored feedback."
      ]
    ],
    "stack": [
      "Next.js",
      "MongoDB",
      "NextAuth",
      "Tailwind CSS"
    ],
    "github": "https://github.com/zaindotdev/truefeedback",
    "live": "https://truefeedback-ruddy.vercel.app/",
    "outcome": "A focused feedback experience that combines anonymous submissions with authenticated account access."
  }
];
export const services = [
  {
    title: "Backend and APIs.",
    description:
      "Fast, boring-in-a-good-way services. Node.js, Django, PostgreSQL, Redis.",
  },
  {
    title: "Full-stack products.",
    description:
      "Database to pixel, shipped end to end. Next.js, React, TypeScript.",
  },
  {
    title: "AI integrations.",
    description:
      "Voice, chat and agents inside real products. OpenAI, Gemini, Groq, Vapi, Deepgram, Tavus.",
  },
  {
    title: "Deploy and DevOps.",
    description:
      "Docker, Nginx, Certbot, DigitalOcean. Live, secured, and staying that way.",
  },
] as const;
