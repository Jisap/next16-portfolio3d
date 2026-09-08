/**
 * Tech Stack Data Layer
 * Source of truth: Technical Stack Specification
 */

export interface TechCategory {
    id: string;
    category: string;
    items: string[];
    isUnconfirmed?: boolean;
    description?: string;
}

export const techStackData: TechCategory[] = [
    {
        id: "programming-languages",
        category: "Programming Languages",
        items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
    },
    {
        id: "web-technologies",
        category: "Web Technologies",
        items: [
            "HTML5",
            "CSS3",
            "React.js",
            "Next.js",
            "Node.js",
            "Express.js",
        ],
    },
    {
        id: "frameworks-libraries",
        category: "Frameworks & Libraries",
        items: [
            "Tailwind CSS",
            "Bootstrap",
            "Flask",
            "Streamlit",
            "OpenCV",
            "Scikit-learn",
            "PyTorch",
        ],
    },
    {
        id: "tools-platforms",
        category: "Tools & Platforms",
        items: [
            "Git",
            "GitHub",
            "Postman",
            "VS Code",
            "npm",
            "Vite",
            "Docker",
            "Figma",
            "Render",
        ],
    },
    {
        id: "databases-cloud",
        category: "Databases & Cloud",
        items: ["MySQL", "MongoDB", "Supabase", "Firebase"],
    },
    {
        id: "soft-skills",
        category: "Soft Skills",
        items: [
            "Analytical Thinking",
            "Problem Solving",
            "Team Collaboration",
            "Adaptability",
            "Quick Learning",
        ],
    },
];

/**
 * Helper to get a flat list of all confirmed tech stack skills.
 */
export function getAllSkills(includeUnconfirmed = false): string[] {
    return techStackData
        .filter((cat) => includeUnconfirmed || !cat.isUnconfirmed)
        .flatMap((cat) => cat.items);
}