export const me = {
  name: "SAI KARAN AKULA",
  title: "Software Engineer",
  // NEW: full-stack focus + beginner in cloud
  blurb:
    "Full-stack developer focused on clean UI, reliable APIs, and pragmatic problem-solving. Early in my cloud journey—but curious, consistent, and actively learning.",
  available: "Available for Summer 2026 internships",
  location: "San Jose, CA",
  email: "akula.work01@gmail.com",
  phone: "(408) 590-7372",
  links: {
    github: "https://github.com/Karanakula",
    linkedin: "https://www.linkedin.com/in/sai-karan-akula-6534a4268/",
    leetcode: "https://leetcode.com/u/karanakula/",          // NEW
    resume: "/resume.pdf"                                    // keep for header nav button
  },
  tech: {
    Languages: ["Java", "JavaScript", "C", "Python"],
    "Web & Backend": ["React", "Angular", "Node.js", "Express.js", "Flask", "HTML5", "CSS", "Bootstrap"],
    Tools: ["GitHub", "Postman", "Figma"]
  },
  projects: [
    {
      title: "Potato Leaf Disease Detector",
      period: "Jan 2025 – Apr 2025",
      stack: ["Flask", "Deep Learning", "MongoDB", "Node.js"],
      bullets: [
        "Web app for uploading leaf images and getting instant disease predictions.",
        "Pipeline combined CNN features with classical ML; responsive dashboard and history."
      ],
      image: "/images/proj1.jpg"
    },
    {
      title: "Pneumonia Detection via Chest X-rays",
      period: "Aug 2024 – Dec 2024",
      stack: ["TensorFlow", "ResNet50", "MobileNetV2", "VGG16"],
      bullets: [
        "Feature extraction using pretrained CNNs with systematic model evaluation.",
        "Reported precision, recall, F1, and confusion matrix for fair comparisons."
      ],
      image: "/images/proj2.jpg"
    },
    // NEW: Project #3
    {
      title: "caRent — Car Rental Platform",
      period: "Jan 2024 – May 2024",
      stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
      bullets: [
        "Built real-time booking with city-based availability, scheduling, and search.",
        "Implemented JWT auth and bcrypt-hashed credentials; role-based access for admins.",
        "Responsive UI, streamlined flows, FAQs and testimonials to improve usability."
      ],
      image: "/images/proj3.jpg"
    }
  ],
  experience: [
    {
      role: "Technical Head",
      company: "VITMAS",
      period: "Jan 2022 – Dec 2024",
      bullets: [
        "Led a cross-functional team building MERN tools used across student events.",
        "Centralized portal for registrations, email automation, and analytics.",
        "JWT auth and responsive UI/UX."
      ]
    },
    {
      role: "R&D Intern",
      company: "NIT Warangal",
      period: "Nov 2023 – Dec 2023",
      bullets: [
        "Optimized image processing pipelines (LBP, OpenCV, NumPy).",
        "Prototyped CNN models with transfer learning; automated evaluation."
      ]
    }
  ],
  education: [
    {
      school: "San Jose State University",
      degree: "M.S., Software Engineering",
      period: "Aug 2025 – May 2027",
      coursework: [
        "Distributed Systems",
        "Cloud Technologies",
        "Enterprise Software Platforms",
        "Software Architecture",
        "Data Structures & Algorithms"
      ]
    },
    {
      school: "Vellore Institute of Technology",
      degree: "B.Tech, Information Technology • GPA 3.47",
      period: "Aug 2021 – May 2025",
      coursework: [
        "Database Systems",
        "Computer Networks",
        "Operating Systems",
        "Machine Learning",
        "Blockchain Technology",
        "Artificial Intelligence"
      ]
    }
  ],
  publications: [
    "Optimizing Image Steganography: Comparative Pre-Processing + Hybrid U-Encoder (ICIICS 2024)."
  ],
  certifications: [
    "AWS Cloud Foundations — Coursera (2024)",
    "Data Science & Hadoop Training — VIT (2023)"
  ]
};
