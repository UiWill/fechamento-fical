"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Título que fica escondido atrás de uma máscara e desliza pra cima quando
 * entra na tela, como se fosse destampado — reservado pros títulos de
 * seção da landing (ver .titulo-mascara/.titulo-interior no globals.css).
 */
export function TituloCortina({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`titulo-mascara ${visivel ? "visivel" : ""} ${className}`}>
      <span className="titulo-interior">{children}</span>
    </Tag>
  );
}
