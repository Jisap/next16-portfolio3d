"use client";

import React, { useState } from "react";
// Importamos los datos crudos y una función auxiliar para extraer las categorías únicas automáticamente
import { certificatesData, getCertificateCategories } from "../../data/certificatesData";
// Componente hijo que renderiza la tarjeta individual de cada certificado
import CertificateCard from "./CertificateCard";

/**
 * Este componente es un Sistema de Filtrado de Certificados. A diferencia de las secciones anteriores que dependían mucho 
 * de animaciones complejas al hacer scroll, esta sección se centra en la interactividad del usuario y la gestión del estado 
 * para organizar tu contenido.
 */

export default function CertificatesSection() {
  // --- GESTIÓN DE ESTADO ---
  // 'selectedCategory' guarda qué filtro está activo actualmente. Inicia en "All".
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Generamos dinámicamente la lista de botones de filtro.
  // ["All", "AI & ML", "Cloud", ...]
  const categories = ["All", ...getCertificateCategories()];

  // --- LÓGICA DE FILTRADO ---
  // Creamos una nueva lista basada en la selección del usuario.
  // Esto se recalcula cada vez que cambia 'selectedCategory'.
  const filteredCertificates =
    selectedCategory === "All"
      ? certificatesData // Si es "All", mostramos todo el array original
      : certificatesData.filter((cert) => cert.category === selectedCategory); // Si no, filtramos por coincidencia

  return (
    <div className="w-full flex flex-col gap-8">

      {/* BARRA DE FILTROS (TABS) */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            // Al hacer click, actualizamos el estado, lo que dispara el re-renderizado y el filtrado
            onClick={() => setSelectedCategory(cat)}
            // Clases condicionales: cambian drásticamente si el botón está activo o no
            className={`text-xs font-barlow-condensed tracking-widest uppercase font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${selectedCategory === cat
              ? "bg-orange text-background border-orange font-bold" // Estado ACTIVO: Naranja sólido
              : "bg-white/5 text-foreground/70 border-white/10 hover:border-white/20 hover:text-white" // Estado INACTIVO: Transparente
              }`
            }
          >
            {cat}
            {/* Contador Dinámico: Muestra cuántos certs hay en esa categoría */}
            <span className="ml-1.5 opacity-60 text-[10px]">
              (
              {cat === "All"
                ? certificatesData.length // Total global
                : certificatesData.filter((c) => c.category === cat).length} // Total por categoría
              )
            </span>
          </button>
        ))}
      </div>

      {/* GRID DE CERTIFICADOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert) => (
          // Renderizamos una tarjeta por cada ítem que pasó el filtro
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </div>
  );
}