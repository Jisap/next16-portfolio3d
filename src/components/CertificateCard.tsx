"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// createPortal permite renderizar el modal fuera del flujo normal del DOM (directamente en <body>)
import { createPortal } from "react-dom";
import { CertificateItem } from "../../data/certificatesData";
import { Award, CheckCircle2, ExternalLink, Copy, Check, QrCode, ShieldCheck, Maximize2, X } from "lucide-react";
import { playClick, playHover } from "../../lib/soundeEffects";

export default function CertificateCard({ cert }: { cert: CertificateItem }) {
  // --- ESTADOS LOCALES ---
  const [copied, setCopied] = useState(false);                 // Para el feedback visual al copiar ID
  const [imgError, setImgError] = useState(false);             // Manejo de fallos de carga de imagen
  const [showModal, setShowModal] = useState(false);           // Controla si el modal existe en el DOM
  const [isModalVisible, setIsModalVisible] = useState(false); // Controla la opacidad (animación CSS)

  // Función para cerrar el modal con una transición suave
  const handleCloseModal = () => {
    playClick();
    setIsModalVisible(false); // Primero baja la opacidad a 0
    setTimeout(() => {
      setShowModal(false);    // Luego elimina el modal del DOM después de 200ms
    }, 200);
  };

  // --- EFECTOS SECUNDARIOS (MODAL) ---
  useEffect(() => {
    if (showModal) {
      // Usamos requestAnimationFrame para asegurar que el navegador procese el montaje antes de animar
      const raf = requestAnimationFrame(() => {
        setIsModalVisible(true);
      });

      // Bloqueamos el scroll del body para que el usuario no se mueva mientras ve el modal
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Permitimos cerrar con la tecla ESC
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleCloseModal();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      // Limpieza: restauramos el scroll y removemos listeners al desmontar
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = originalOverflow || "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      setIsModalVisible(false);
    }
  }, [showModal]);

  // Verificamos si hay imagen válida para mostrar
  const hasImage = !!cert.imagePath && !imgError;

  // Lógica para copiar el ID de credencial al portapapeles
  const handleCopyId = (idText: string) => {
    playClick();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(idText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Resetea el icono tras 2 segundos
    }
  };

  // Determina el estilo del badge según el resultado (Winner, Finalist, etc.)
  const getResultBadgeStyle = (result?: string) => {
    if (!result) return "bg-white/5 text-foreground/70 border-white/10";
    const lower = result.toLowerCase();
    if (lower.includes("winner") || lower.includes("1st")) {
      return "bg-amber-400/10 text-amber-400 border-amber-400/20"; // Oro
    }
    if (lower.includes("finalist") || lower.includes("top")) {
      return "bg-orange/10 text-orange border-orange/20 font-bold"; // Naranja (tu marca)
    }
    if (lower.includes("presented")) {
      return "bg-purple-400/10 text-purple-400 border-purple-400/20"; // Morado
    }
    if (lower.includes("completed")) {
      return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"; // Verde
    }
    return "bg-white/5 text-foreground/60 border-white/10";
  };

  return (
    <>
      {/* TARJETA PRINCIPAL */}
      <div className="group relative rounded-xl border border-white/10 bg-[#161515] p-5 hover:border-orange/40 transition-all duration-300 flex flex-col justify-between gap-4 text-left hover:shadow-xl hover:shadow-orange/5">

        {/* PREVISUALIZACIÓN DE IMAGEN */}
        {hasImage && (
          <div
            onClick={() => { playClick(); setShowModal(true); }}
            className="relative w-full h-44 rounded-lg overflow-hidden border border-white/10 bg-black/40 cursor-pointer group/img"
          >
            <Image
              src={cert.imagePath!}
              alt={cert.name}
              fill
              onError={() => setImgError(true)} // Si falla la carga, ocultamos la imagen
              className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay que aparece al hacer hover sobre la imagen */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-barlow-condensed tracking-wider uppercase font-bold text-white backdrop-blur-[2px]">
              <Maximize2 className="w-4 h-4 text-orange" /> Click to View
            </div>
          </div>
        )}

        {/* HEADER: Categoría y Badge de Resultado */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-barlow-condensed uppercase tracking-widest text-orange font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            {cert.category}
          </span>

          {cert.result && (
            <span
              className={`text-[11px] font-barlow-condensed tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${getResultBadgeStyle(cert.result)}`}
            >
              {cert.result}
            </span>
          )}
        </div>

        {/* TÍTULO Y ORGANIZADOR */}
        <div>
          <h4 className="text-lg font-bold font-barlow-condensed tracking-wide uppercase text-foreground group-hover:text-orange transition-colors leading-snug">
            {cert.name}
          </h4>
          <p className="text-xs font-barlow-condensed tracking-wider uppercase text-foreground/60 mt-1">
            {cert.organizer}
          </p>
        </div>

        {/* INFORMACIÓN ADICIONAL (Equipo / Proyecto) */}
        {(cert.project || cert.team) && (
          <div className="text-xs font-mono text-foreground/50 bg-white/[0.02] p-2 rounded border border-white/5 flex flex-wrap gap-x-3">
            {cert.team && (
              <span>Team: <strong className="text-foreground/70">{cert.team}</strong></span>
            )}
            {cert.project && (
              <span>Project: <strong className="text-foreground/70">{cert.project}</strong></span>
            )}
          </div>
        )}

        {/* FOOTER: Fecha, ID y Botones de Acción */}
        <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-foreground/50 font-barlow-condensed tracking-wider uppercase">
            <span>{cert.date}</span>
            {cert.isQrVerifiable && (
              <span className="inline-flex items-center gap-1 text-foreground/60">
                <QrCode className="w-3 h-3 text-orange" /> QR Verifiable
              </span>
            )}
          </div>

          {/* Campo de ID con botón de copiado */}
          {cert.credentialId && (
            <div className="flex items-center justify-between gap-2 bg-black/40 px-2.5 py-1.5 rounded-md border border-white/5 text-xs font-mono text-foreground/70">
              <span className="truncate" title={cert.credentialId}>
                ID: {cert.credentialId}
              </span>
              <button
                onClick={() => handleCopyId(cert.credentialId!)}
                className="text-foreground/50 hover:text-orange transition-colors p-0.5 cursor-pointer"
                title="Copy ID"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> // Icono de check verde si se copió
                ) : (
                  <Copy className="w-3.5 h-3.5" /> // Icono de copia normal
                )}
              </button>
            </div>
          )}

          {/* Botones Principales: Verificar Online y Ver Imagen */}
          <div className="flex items-center gap-2 mt-1">
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-barlow-condensed uppercase tracking-widest font-semibold text-orange hover:text-white bg-orange/10 hover:bg-orange px-3 py-1.5 rounded-md border border-orange/20 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Verify
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {hasImage && (
              <button
                onClick={() => { playClick(); setShowModal(true); }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-barlow-condensed uppercase tracking-widest font-semibold text-foreground/80 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/10 transition-all cursor-pointer"
              >
                <Maximize2 className="w-3 h-3 text-orange" /> View Certificate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MODAL / LIGHTBOX (Renderizado vía Portal) */}
      {showModal && hasImage && typeof document !== "undefined" && createPortal(
        <div
          className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-200 ${isModalVisible ? "opacity-100" : "opacity-0"}`}
          onClick={handleCloseModal} // Cierra al hacer clic en el fondo oscuro
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-[#141313] border border-white/20 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
          >
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-barlow-condensed uppercase tracking-wide text-foreground">
                  {cert.name}
                </h3>
                <p className="text-xs font-barlow-condensed tracking-wider uppercase text-foreground/60">
                  {cert.organizer} &bull; {cert.date}
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-orange text-foreground hover:text-background border border-white/15 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenedor de Imagen Alta Resolución */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-lg overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
              <Image
                src={cert.imagePath!}
                alt={cert.name}
                fill
                className="object-contain" // Asegura que el certificado completo se vea sin cortarse
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority // Carga prioritaria ya que el usuario está esperando verla
              />
            </div>

            {/* Pie del Modal con enlaces de verificación */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-mono text-foreground/60">
              {cert.credentialId && <span>Credential ID: {cert.credentialId}</span>}
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange hover:underline font-bold inline-flex items-center gap-1"
                >
                  Verify Online <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body // El portal se monta físicamente en el body del HTML
      )}
    </>
  );
}