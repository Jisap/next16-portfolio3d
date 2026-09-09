"use client";

import React, { useState } from "react";
// Importamos los datos y la función que los ordena cronológicamente (del más reciente al más antiguo)
import { getSortedExperience, ExperienceItem } from "../../data/experienceData";
// Iconos para categorizar visualmente cada tipo de experiencia
import { Rocket, Trophy, Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const ExperienceTimeline = () => {
  // --- ESTADO DEL FILTRO ---
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Obtenemos la lista de experiencias ya ordenada por fecha
  const allExperiences = getSortedExperience();

  // Definimos las categorías disponibles manualmente para mantener el control del orden de los botones
  const categories = ["All", "Startup / Entrepreneurship", "Hackathons", "Job Simulations"];

  // Lógica de filtrado: si es "All" muestra todo, si no, filtra por coincidencia exacta de categoría
  const filtered =
    selectedCategory === "All"
      ? allExperiences
      : allExperiences.filter((item) => item.category === selectedCategory);

  // Función auxiliar para asignar iconos según el tipo de experiencia
  const getCategoryIcon = (category: string) => {
    if (category.includes("Startup")) {
      return <Rocket className="w-4 h-4 text-orange" />; // Cohete para emprendimiento
    }
    if (category.includes("Hackathon")) {
      return <Trophy className="w-4 h-4 text-amber-400" />; // Trofeo para competiciones
    }
    return <Briefcase className="w-4 h-4 text-blue-400" />; // Maletín por defecto para trabajos/simulaciones
  };

  return (
    <div className="w-full flex flex-col gap-8 text-left">

      {/* FILTROS DE CATEGORÍA */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            // Estilos condicionales para el estado activo/inactivo
            className={`text-xs font-barlow-condensed tracking-widest uppercase font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${selectedCategory === cat
              ? "bg-orange text-background border-orange font-bold"
              : "bg-white/5 text-foreground/70 border-white/10 hover:border-white/20 hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CONTENEDOR DE LA LÍNEA DE TIEMPO */}
      {/* La clase 'border-l' crea la línea vertical continua a la izquierda */}
      <div className="relative border-l border-white/10 ml-3 sm:ml-4 pl-6 sm:pl-8 flex flex-col gap-8">

        {filtered.map((item) => (
          <div key={item.id} className="relative group">

            {/* PUNTO DE LA LÍNEA DE TIEMPO (BULLET) */}
            {/* Posicionado absolutamente para quedar encima de la línea vertical */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full border-2 bg-background flex items-center justify-center transition-colors ${item.isCurrent
                ? "border-orange shadow-[0_0_12px_rgba(249,52,52,0.6)]" // Brillo naranja si es el rol actual
                : "border-white/30 group-hover:border-orange"         // Se ilumina al pasar el mouse sobre la tarjeta
                }`}
            >
              {/* Punto interior */}
              <div
                className={`w-2 h-2 rounded-full ${item.isCurrent ? "bg-orange" : "bg-white/40 group-hover:bg-orange"
                  }`}
              />
            </div>

            {/* TARJETA DE CONTENIDO */}
            <div className="rounded-xl border border-white/10 bg-[#171616] p-5 hover:border-orange/30 transition-all">

              {/* CABECERA DE LA TARJETA: Badges y Fecha */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Badge de Categoría con Icono */}
                  <span className="inline-flex items-center gap-1 text-xs font-barlow-condensed uppercase tracking-wider text-foreground/60 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                    {getCategoryIcon(item.category)}
                    {item.category}
                  </span>

                  {/* Badge "Current Role" si aplica */}
                  {item.isCurrent && (
                    <span className="text-[11px] font-barlow-condensed uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 font-bold">
                      Current Role
                    </span>
                  )}

                  {/* Badge de Resultado Logrado (ej: "Finalist", "Co-founded") */}
                  {item.result && (
                    <span className="text-[11px] font-barlow-condensed uppercase tracking-wider text-orange bg-orange/10 px-2 py-0.5 rounded border border-orange/20 font-semibold">
                      {item.result}
                    </span>
                  )}
                </div>

                {/* Fecha con Icono de Calendario */}
                <div className="flex items-center gap-1.5 text-xs text-foreground/50 font-barlow-condensed tracking-widest uppercase">
                  <Calendar className="w-3.5 h-3.5 text-orange" />
                  {item.date}
                </div>
              </div>

              {/* TÍTULO Y ROL */}
              <h4 className="text-xl font-bold font-barlow-condensed tracking-wide uppercase text-foreground group-hover:text-orange transition-colors">
                {item.title}
              </h4>
              <p className="text-sm font-barlow-condensed uppercase tracking-wider text-orange font-semibold mt-0.5">
                {item.role} &mdash; <span className="text-foreground/70">{item.organization}</span>
              </p>

              {/* DESCRIPCIÓN CORTA */}
              {item.shortDescription && (
                <p className="text-sm text-foreground/70 leading-relaxed mt-2.5">
                  {item.shortDescription}
                </p>
              )}

              {/* PILLS DE TECNOLOGÍAS USADAS */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-foreground/60 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceTimeline;