"use client"

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { playClick, playHover } from "../../lib/soundeEffects";
import { animateDrawSVG } from "../../lib/drawSvg";
import ScrollRevealText from "./ScrollRevealText";

if (typeof window !== "undefined") {  // Para evitar errores en el servidor de Vercel al compilar el proyecto
    gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
    {
        badge: "01",
        label: "Products Built",
        target: 7,
        suffix: "+",
        subtitle: "AI & Full-Stack Applications",
        desc: "SmartAttend, GymGuru, ResuMatch, RoopAntar, JanSewa, Nimiza & Verifund",
    },
    {
        badge: "02",
        label: "Hackathons & Challenges",
        target: 12,
        suffix: "+",
        subtitle: "National & Global Events",
        desc: "IEMHACKS, Adobe Univ, NextGen USA & JU Srijan '26 Finalist",
    },
    {
        badge: "03",
        label: "Milestones & Programs",
        target: 15,
        suffix: "+",
        subtitle: "Certifications & Industry Programs",
        desc: "Co-Founded KidGuides (Hult Prize), Goldman Sachs & Tata Simulations",
    },
];

const TAGLINES = [
    "BUILD · ITERATE · SCALE",
    "AI × FULL STACK × PRODUCTS",
    "DISCIPLINE BUILDS FREEDOM",
];



const AboutSection = () => {
    return (
        <div>AboutSection</div>
    )
}

export default AboutSection