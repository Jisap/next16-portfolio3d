/**
 * Experience & Timeline Data Layer
 * Source of truth: CONTENT.md
 */

export type ExperienceCategory =
    | "Startup / Entrepreneurship"
    | "Hackathons"
    | "Job Simulations"
    | string;

export interface ExperienceItem {
    id: string;
    title: string;
    organization: string;
    date: string;
    category: ExperienceCategory;
    role: string;
    result?: string;
    shortDescription: string;
    teamName?: string;
    projectAssociation?: string;
    skills?: string[];
    links?: { label: string; url: string }[];
    sortDate?: string; // Format: YYYY-MM or YYYY-MM-DD for chronological sorting
    isCurrent?: boolean;
}

export const experienceData: ExperienceItem[] = [
    // --- Startup / Entrepreneurship ---
    {
        id: "kidguides-co-founder",
        title: "KidGuides",
        organization: "Heritage Institute of Technology (Hult Prize Program)",
        date: "Jan 2026 – Present",
        category: "Startup / Entrepreneurship",
        role: "Co-Founder",
        result: "Built through Hult Prize 2026 on-campus program",
        shortDescription:
            "Co-founded KidGuides, an offline edtech startup, as part of the Hult Prize 2026 on-campus program at HIT.",
        projectAssociation: "KidGuides",
        isCurrent: true,
        sortDate: "2026-01-01",
        skills: ["EdTech", "Product Strategy", "Entrepreneurship", "Operations"],
    },

    // --- Hackathons ---
    {
        id: "nextgen-hackathon-2026-exp",
        title: "2nd NextGen Hackathon 2026",
        organization: "ACM Fremont Chapter, USA (with SCRS)",
        date: "15–16 Aug 2026",
        category: "Hackathons",
        role: "Team Kaalchakra Member",
        result: "Presented",
        teamName: "Kaalchakra",
        projectAssociation: "Argus: Autonomous Threat Detection & Governed Response System",
        shortDescription:
            "Built and presented 'Argus', an autonomous threat detection and governed response system for NextGen 2026.",
        sortDate: "2026-08-15",
        skills: ["AI/ML", "Cybersecurity", "Autonomous Systems"],
    },
    {
        id: "national-innovation-hackathon-2026-exp",
        title: "National Innovation Hackathon 2026",
        organization: "AMIEE Association & CMAOI Association, with HIT",
        date: "17–19 Jul 2026",
        category: "Hackathons",
        role: "Participant",
        result: "Participant",
        shortDescription:
            "Participated in the National Innovation Hackathon 2026 organized by AMIEE & CMAOI Associations at HIT.",
        sortDate: "2026-07-17",
    },
    {
        id: "iemhacks-4-exp",
        title: "IEMHACKS 4.0",
        organization: "Dept. of CSE & IT, IEM/UEM",
        date: "8–9 Aug 2026",
        category: "Hackathons",
        role: "Solo Builder (Team: Kal ka naya yug)",
        result: "Participant (Track 05: Social Issues)",
        teamName: "Kal ka naya yug",
        projectAssociation: "JanSewa",
        shortDescription:
            "Engineered JanSewa — a civic-tech platform with welfare scheme matching and SHA-256 grievance audit logs in a 36-hr sprint.",
        sortDate: "2026-08-08",
        skills: ["React", "Node.js", "Express", "MongoDB", "CivicTech"],
    },
    {
        id: "adobe-university-hackathon-exp",
        title: "Adobe University Hackathon",
        organization: "Adobe (via Unstop)",
        date: "9 Aug 2026",
        category: "Hackathons",
        role: "Participant",
        result: "Participant",
        shortDescription:
            "Competed in the Adobe University Hackathon tackling real-world problem statements.",
        sortDate: "2026-08-09",
    },
    {
        id: "nexbuildon-hack-2026-exp",
        title: "NEXBUILDON HACK 2026",
        organization: "NexBuildon Community",
        date: "17 Aug 2026",
        category: "Hackathons",
        role: "Participant",
        result: "Participant",
        shortDescription:
            "Competed in the NEXBUILDON HACK 2026 building rapid software prototypes.",
        sortDate: "2026-08-17",
    },
    {
        id: "hackforge-srijan-2026-exp",
        title: "Hackforge (Srijan 2026)",
        organization: "CodeClub JUSL, Jadavpur University",
        date: "4–5 Apr 2026",
        category: "Hackathons",
        role: "Frontend & Backend Integration Lead (Team UdyamX)",
        result: "Finalist",
        teamName: "Team UdyamX",
        projectAssociation: "VeriFund",
        shortDescription:
            "Reached the finals of the 24-hr Hackforge hackathon at Jadavpur University building VeriFund, a blockchain crowdfunding platform.",
        sortDate: "2026-04-04",
        skills: ["React", "Node.js", "Solidity", "Blockchain"],
    },
    {
        id: "model-forge-exp",
        title: "Model Forge",
        organization: "Heritage Institute of Technology (via Unstop)",
        date: "2026",
        category: "Hackathons",
        role: "Team Tensor Titans Member",
        result: "Participant",
        teamName: "Tensor Titans",
        shortDescription:
            "Participated in Model Forge focusing on machine learning model development and evaluation.",
        sortDate: "2026-05-01",
        skills: ["Machine Learning", "Data Science"],
    },
    {
        id: "ideatex-session-zero-2026-exp",
        title: "Ideatex (Session Zero 2026)",
        organization: "Google Developer Group on Campus, HIT",
        date: "30 May 2026",
        category: "Hackathons",
        role: "Team Zenforge Member",
        result: "Top 50 Finalist",
        teamName: "Zenforge",
        shortDescription:
            "Secured Top 50 Finalist standing at Ideatex Session Zero with innovative product ideation.",
        sortDate: "2026-05-30",
    },
    {
        id: "mlx-session-zero-2026-exp",
        title: "MLX (Session Zero 2026)",
        organization: "Google Developer Group on Campus, HIT",
        date: "2026",
        category: "Hackathons",
        role: "Participant",
        result: "Participant",
        shortDescription:
            "Engaged in the MLX machine learning sprint organized by GDG on Campus HIT.",
        sortDate: "2026-05-15",
        skills: ["Machine Learning", "Python"],
    },
    {
        id: "vibe-with-india-2-exp",
        title: "Vibe With India 2.0",
        organization: "HackWithIndia (via Devnovate)",
        date: "20 Mar 2026",
        category: "Hackathons",
        role: "Participant",
        result: "Participant",
        shortDescription:
            "Participated in the virtual hackathon Vibe With India 2.0 building creative tech solutions.",
        sortDate: "2026-03-20",
    },
    {
        id: "hult-prize-2026-exp",
        title: "Hult Prize 2026 On-Campus Program",
        organization: "Hult Prize @ HIT, with Institution's Innovation Council",
        date: "30 Jan 2026",
        category: "Hackathons",
        role: "Co-Founder / Pitch Lead",
        result: "Participant",
        projectAssociation: "KidGuides",
        shortDescription:
            "Pitched KidGuides in the prestigious Hult Prize 2026 on-campus program at HIT.",
        sortDate: "2026-01-30",
        skills: ["Startup Pitching", "Business Strategy", "Social Impact"],
    },
    {
        id: "ace-the-case-srijan-2026-exp",
        title: "Ace The Case (Srijan '26)",
        organization: "F.E.T.S.U. Presents Srijan '26 / IIC, JU E-Cell",
        date: "Apr 2026",
        category: "Hackathons",
        role: "Finalist",
        result: "Finalist",
        shortDescription:
            "Advanced to the finals in the Ace The Case business case study competition at Jadavpur University's Srijan '26.",
        sortDate: "2026-04-10",
        skills: ["Business Analysis", "Case Study", "Strategy"],
    },

    // --- Job Simulations ---
    {
        id: "goldman-sachs-risk-exp",
        title: "Risk Job Simulation",
        organization: "Goldman Sachs (via Forage)",
        date: "25 Jun 2026",
        category: "Job Simulations",
        role: "Student Analyst",
        result: "Completed",
        shortDescription:
            "Completed practical tasks in financial risk assessment, risk governance, and regulatory compliance modeling.",
        sortDate: "2026-06-25",
        skills: ["Financial Risk", "Risk Governance", "Data Analysis"],
    },
    {
        id: "tata-genai-data-analytics-exp",
        title: "GenAI Powered Data Analytics Job Simulation",
        organization: "Tata (via Forage)",
        date: "25 Jun 2026",
        category: "Job Simulations",
        role: "Student Analyst",
        result: "Completed",
        shortDescription:
            "Completed hands-on data analytics simulations leveraging Generative AI techniques to extract business insights.",
        sortDate: "2026-06-25",
        skills: ["Generative AI", "Data Analytics", "Business Intelligence"],
    },
];

/**
 * Returns experiences sorted in reverse chronological order (newest first).
 */
export function getSortedExperience(
    experiences: ExperienceItem[] = experienceData
): ExperienceItem[] {
    return [...experiences].sort((a, b) => {
        // Current positions always rank at top
        if (a.isCurrent && !b.isCurrent) return -1;
        if (!a.isCurrent && b.isCurrent) return 1;

        const dateA = a.sortDate || "";
        const dateB = b.sortDate || "";
        return dateB.localeCompare(dateA);
    });
}