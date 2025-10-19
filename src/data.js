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
    Languages: ["Java", "Python", "JavaScript", "C", "SQL"],
    "Full-Stack Development": ["React", "Node.js", "Express.js", "Flask", "HTML5", "CSS", "Bootstrap", "Tailwind CSS", "REST APIs", "GraphQL", "MongoDB", "PostgreSQL"],
    "Cloud & Tools": ["AWS", "Git", "GitHub", "Docker", "CI/CD", "Postman", "VS Code", "Figma"]
  },
  projects: [
    {
      title: "Potato Leaf Disease Detector",
      period: "Jan 2025 – Apr 2025",
      stack: ["Flask", "MongoDB", "Node.js", "EJS"],
      bullets: [
        "Led the creation of a full-stack application for instant disease classification from leaf images, cutting manual inspection effort by 40%.",
        "Engineered robust data management with MongoDB for persistent session tracking and prediction history.",
        "Developed an interactive frontend with EJS for real-time visualization and email alerts, improving engagement by 30%."
      ],
      image: "/images/proj1.jpg"
    },
    {
      title: "Pneumonia Detection via Chest X-rays",
      period: "Aug 2024 – Dec 2024",
      stack: ["TensorFlow", "ResNet50", "MobileNet V2"],
      bullets: [
        "Built an end-to-end pipeline using ResNet 50, MobileNet V2, and VGG16 for automated pneumonia screening from X-ray datasets.",
        "Enhanced diagnostic reliability by 12-15% using feature fusion and classical models (KNN, Random Forest, SVM).",
        "Compiled results into clear visual reports for non-technical stakeholders."
      ],
      image: "/images/proj2.jpg"
    },
    {
      title: "Car Rental Platform",
      period: "Jan 2024 – May 2024",
      stack: ["Node.js", "Express.js", "MongoDB", "React"],
      bullets: [
        "Architected a backend with Node.js/Express for real-time booking and scheduling for 100+ users.",
        "Strengthened security with JWT-based authentication and Bcrypt encryption, reducing unauthorized access by 30%.",
        "Built a dynamic React frontend with reusable components, improving client-side responsiveness by 25%."
      ],
      image: "/images/proj3.jpg"
    }
  ],
  experience: [
    {
      role: "Technical Head",
      company: "VITMAS",
      period: "Jan 2022 – May 2025",
      bullets: [
        "Spearheaded a cross-functional team of 12 developers to design and deploy MERN-based internal platforms, streamlining technical operations for 1,000+ students.",
        "Built and launched a centralized portal for registrations, analytics, and email automation, reducing manual overhead by 60%.",
        "Directed project planning, delegated tasks, and facilitated collaboration to ensure timely project delivery."
      ]
    },
    {
      role: "R&D Intern",
      company: "NIT Warangal",
      period: "Aug 2023 – Dec 2023",
      bullets: [
        "Designed and optimized image processing pipelines (LBP, OpenCV, NumPy), achieving a 17% runtime gain.",
        "Leveraged TensorFlow, PyTorch, and Keras to prototype CNN-based models, improving classification performance.",
        "Curated benchmark datasets and automated evaluation with ranking models (k-NN, SVM)."
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
