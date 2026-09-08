/**
 * Bio and Profile Data Layer
 * Source of truth: CONTENT.md
 */

export interface HeroContent {
    name: string;
    primaryTitle: string;
    headline: string;
    terminalLine: string;
    email: string;
}

export interface BioContent {
    shortBio: string;
    longBio: string;
}

export interface AssetsConfig {
    profilePortrait: string;
    resumePdf: string;
    favicon: string;
    logoMark: string;
    logoBadge: string;
}

export interface SocialLink {
    name: string;
    url: string;
}

export const heroContent: HeroContent = {
    name: "Ayush Kumar Agarwal",
    primaryTitle: "Full Stack Developer · AI/ML Enthusiast · B.Tech CSBS",
    headline: "Building AI-powered products, full-stack applications, and ideas that can scale.",
    terminalLine: "> building AI-powered products and full-stack applications",
    email: "ayushtechnoworld@gmail.com",
};

export const bioContent: BioContent = {
    shortBio:
        "I'm Ayush Kumar Agarwal, a Computer Science & Business Systems student and passionate developer who loves building impactful digital products. I enjoy exploring Full-Stack Development, Artificial Intelligence, and innovative startup ideas — from AI-powered attendance systems to fitness coaches that watch your form in real time. Currently focused on strengthening my technical skills, building real-world projects, and turning ideas into scalable solutions.",
    longBio: `Hi, I'm Ayush Kumar Agarwal, a Computer Science & Business Systems student at Heritage Institute of Technology, Kolkata, and an aspiring technology entrepreneur with a strong interest in software development, Artificial Intelligence, and building innovative digital products.

My journey in technology started with curiosity — understanding how applications work and gradually moving towards building projects myself. That curiosity turned into three shipped products: SmartAttend, an AI-powered attendance system using facial recognition; GymGuru, a real-time fitness coach that uses pose detection to correct your form and count reps; and ResuMatch, an NLP-based ATS resume analyzer. I'm currently building RoopAntar, a neural style transfer tool, alongside a growing set of applied ML experiments. Over time, I've developed a growing interest in Full-Stack Development, Data Structures & Algorithms, and problem-solving.

I enjoy participating in hackathons, working on real-world ideas, and exploring how technology can solve meaningful problems — I've competed in IEMHACKS, the Adobe University Hackathon, the NextGen Hackathon (ACM Fremont Chapter, USA), and made it to the finals at Hackforge (Jadavpur University's Srijan '26) and Ace The Case. Alongside development, I'm also deeply interested in startups, finance, and building scalable businesses through technology — I co-founded KidGuides, an offline edtech startup, through the Hult Prize program at HIT, and explored the finance side through Goldman Sachs' Risk job simulation, Tata's GenAI Data Analytics simulation, and Study2Win's Financial Freedom program.

Currently, I'm focused on improving my development skills, strengthening my DSA fundamentals, building better projects, and exploring AI-powered solutions. My long-term goal is to create impactful technology products and build something meaningful at a large scale.`,
};

/**
 * Centralized assets configuration.
 * Change portrait, document, or logo paths here in one place.
 */
export const assetsConfig: AssetsConfig = {
    profilePortrait: "", // Set empty string for clean monogram/badge fallback
    resumePdf: "/resume.pdf", // Gracefully handled
    favicon: "/favicon-32.png",
    logoMark: "/Images/logo-mark.svg",
    logoBadge: "/Images/logo-badge.svg",
};

export const socialLinks: SocialLink[] = [
    { name: "GitHub", url: "https://github.com/ayushagarwal619" },
    { name: "LinkedIn", url: "https://linkedin.com/in/ayushagarwal619" },
];