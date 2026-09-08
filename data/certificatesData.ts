/**
 * Certificates & Achievements Data Layer
 * Source of truth: CONTENT.md
 *
 * Privacy Rule: No internal account IDs or private enrolment hashes are included.
 * Only public-safe credentials and verification links are exported.
 */

export type CertificateCategory =
    | "Hackathons"
    | "Job Simulations"
    | "Quizzes"
    | "Workshops"
    | "Courses"
    | string;

export interface CertificateItem {
    id: string;
    name: string;
    category: CertificateCategory;
    organizer: string;
    date: string;
    result?: string;
    credentialId?: string;
    verificationUrl?: string;
    imagePath?: string;
    team?: string;
    project?: string;
    isQrVerifiable?: boolean;
}

export const certificatesData: CertificateItem[] = [
    // --- Hackathons ---
    {
        id: "nextgen-hackathon-2026",
        name: "2nd NextGen Hackathon 2026 — Team Kaalchakra",
        category: "Hackathons",
        organizer: "ACM Fremont Chapter, USA (with SCRS)",
        date: "15–16 Aug 2026",
        result: "Presented",
        project: "Argus: Autonomous Threat Detection & Governed Response System",
        team: "Kaalchakra",
        credentialId: "SCRS/2nd NextGen 2026/PC/NGH26_247",
        verificationUrl: "https://nextgen2026.thescrs.org/",
        imagePath: "/Images/Certificates/nextgen-hackathon-2026.jpg",
    },
    {
        id: "national-innovation-hackathon-2026",
        name: "National Innovation Hackathon 2026",
        category: "Hackathons",
        organizer: "AMIEE Association & CMAOI Association, with HIT",
        date: "17–19 Jul 2026",
        result: "Participant",
        credentialId: "AMH202600353-M345",
        isQrVerifiable: true,
        imagePath: "/Images/Certificates/national-innovation-hackathon-2026.jpg",
    },
    {
        id: "iemhacks-4",
        name: "IEMHACKS 4.0 (36-hr online hackathon)",
        category: "Hackathons",
        organizer: "Dept. of CSE & IT, IEM/UEM",
        date: "8–9 Aug 2026",
        result: "Participant",
        team: "Kal ka naya yug",
        project: "JanSewa (Track 05: Social Issues)",
        imagePath: "/Images/Certificates/iemhacks-4.jpg",
    },
    {
        id: "adobe-university-hackathon",
        name: "Adobe University Hackathon",
        category: "Hackathons",
        organizer: "Adobe (via Unstop)",
        date: "9 Aug 2026",
        result: "Participant",
        isQrVerifiable: true,
        imagePath: "/Images/Certificates/adobe-university-hackathon.jpg",
    },
    {
        id: "nexbuildon-hack-2026",
        name: "NEXBUILDON HACK 2026",
        category: "Hackathons",
        organizer: "NexBuildon Community",
        date: "17 Aug 2026",
        result: "Participant",
        credentialId: "NEX26-PART-0323",
        imagePath: "/Images/Certificates/nexbuildon-hack-2026.jpg",
    },
    {
        id: "hackforge-srijan-2026",
        name: "Hackforge (24-hr hackathon, Srijan 2026)",
        category: "Hackathons",
        organizer: "CodeClub JUSL, Jadavpur University",
        date: "4–5 Apr 2026",
        result: "Finalist",
        team: "Team UdyamX",
        project: "VeriFund",
        imagePath: "/Images/Certificates/hackforge-srijan-2026.png",
    },
    {
        id: "model-forge",
        name: "Model Forge",
        category: "Hackathons",
        organizer: "Heritage Institute of Technology (via Unstop)",
        date: "2026",
        result: "Participant",
        team: "Tensor Titans",
        isQrVerifiable: true,
        imagePath: "/Images/Certificates/model-forge.jpg",
    },
    {
        id: "ideatex-session-zero-2026",
        name: "Ideatex (Session Zero 2026)",
        category: "Hackathons",
        organizer: "Google Developer Group on Campus, HIT",
        date: "30 May 2026",
        result: "Top 50 Finalist",
        team: "Zenforge",
        isQrVerifiable: true,
        imagePath: "/Images/Certificates/ideatex-session-zero-2026.jpg",
    },
    {
        id: "mlx-session-zero-2026",
        name: "MLX (Session Zero 2026)",
        category: "Hackathons",
        organizer: "Google Developer Group on Campus, HIT",
        date: "29 May 2026",
        result: "Participant",
        isQrVerifiable: true,
        imagePath: "/Images/Certificates/mlx-session-zero-2026.jpg",
    },
    {
        id: "vibe-with-india-2",
        name: "Vibe With India 2.0 (Virtual Hackathon)",
        category: "Hackathons",
        organizer: "HackWithIndia (via Devnovate)",
        date: "20 Mar 2026",
        result: "Participant",
        imagePath: "/Images/Certificates/vibe-with-india-2.jpg",
    },
    {
        id: "hult-prize-2026",
        name: "Hult Prize 2026 (On-Campus Program)",
        category: "Hackathons",
        organizer: "Hult Prize @ HIT, with Institution's Innovation Council",
        date: "30 Jan 2026",
        result: "Participant",
        project: "KidGuides",
        imagePath: "/Images/Certificates/hult-prize-2026.jpg",
    },
    {
        id: "ace-the-case-srijan-2026",
        name: "Ace The Case (Srijan '26)",
        category: "Hackathons",
        organizer: "F.E.T.S.U. Presents Srijan '26 / IIC, JU E-Cell",
        date: "Apr 2026",
        result: "Finalist",
        imagePath: "/Images/Certificates/ace-the-case-srijan-2026.jpg",
    },

    // --- Job Simulations ---
    {
        id: "goldman-sachs-risk-simulation",
        name: "Risk Job Simulation",
        category: "Job Simulations",
        organizer: "Goldman Sachs (via Forage)",
        date: "25 Jun 2026",
        result: "Completed",
        imagePath: "/Images/Certificates/goldman-sachs-risk-simulation.jpg",
    },
    {
        id: "tata-genai-data-analytics-simulation",
        name: "GenAI Powered Data Analytics Job Simulation",
        category: "Job Simulations",
        organizer: "Tata (via Forage)",
        date: "25 Jun 2026",
        result: "Completed",
        imagePath: "/Images/Certificates/tata-genai-data-analytics-simulation.jpg",
    },

    // --- Quizzes ---
    {
        id: "national-financial-literacy-quiz-2026",
        name: "National Financial Literacy Quiz 2026 (Online Round)",
        category: "Quizzes",
        organizer: "NISM (SEBI initiative)",
        date: "2026",
        result: "Participant",
        imagePath: "/Images/Certificates/national-financial-literacy-quiz-2026.jpg",
    },
    {
        id: "hacktherank-quiz",
        name: "HackTheRank (Online Quiz)",
        category: "Quizzes",
        organizer: "HackerRank",
        date: "2026",
        result: "Participant",
        isQrVerifiable: true,
        imagePath: "/Images/Certificates/hacktherank-quiz.jpg",
    },
    {
        id: "vande-mataram-150-quiz",
        name: "Vande Mataram — 150 Years Quiz",
        category: "Quizzes",
        organizer: "Ministry of Culture & MyGov",
        date: "2026",
        result: "Participant",
        imagePath: "/Images/Certificates/vande-mataram-150-quiz.png",
    },
    {
        id: "data-sprint-2026",
        name: "DATA SPRINT 2026 — Quiz Round",
        category: "Quizzes",
        organizer: "Data Science Club NIST/MAIT (via HackerRank)",
        date: "2026",
        result: "Participant",
        isQrVerifiable: true,
        imagePath: "/Images/Certificates/data-sprint-2026.jpg",
    },
    {
        id: "ice-breaker-5",
        name: "Ice Breaker 5 (Prelims)",
        category: "Quizzes",
        organizer: "Google Developer Group on Campus HIT",
        date: "22 Mar 2026",
        result: "Participant",
        isQrVerifiable: true,
        imagePath: "/Images/Certificates/ice-breaker-5.jpg",
    },

    // --- Workshops ---
    {
        id: "ai-tools-workshop-be10x",
        name: "AI Tools Workshop (AI Tools & ChatGPT)",
        category: "Workshops",
        organizer: "be10x",
        date: "8 Mar 2026",
        result: "Completed",
        isQrVerifiable: true,
        imagePath: "/Images/Certificates/ai-tools-workshop-be10x.jpg",
    },

    // --- Courses ---
    {
        id: "prime-aiml-course",
        name: "Prime (AI/ML) Course",
        category: "Courses",
        organizer: "Apna College (instructor: Shradha Khapra)",
        date: "2026",
        result: "Completed",
        credentialId: "6a3d4bc3ed172e4a2b02ad9a",
        imagePath: "/Images/Certificates/prime-aiml-course.png",
    },
    {
        id: "financial-freedom-batch-15",
        name: "Financial Freedom — Batch 15 Sapphire (Stock Market, Investing & Wealth Creation)",
        category: "Courses",
        organizer: "Study2Win (trainer: Sagar Dodeja)",
        date: "Started 15 Nov 2025",
        result: "Completed",
        credentialId: "S2W-FF15-SAPPHIRE-2026",
        imagePath: "/Images/Certificates/financial-freedom-batch-15.jpg",
    },
];

/**
 * Dynamically extracts all unique categories present in the certificates list.
 * Filter/tab UIs can use this so new categories work automatically without code changes.
 */
export function getCertificateCategories(
    certificates: CertificateItem[] = certificatesData
): string[] {
    return Array.from(new Set(certificates.map((cert) => cert.category)));
}