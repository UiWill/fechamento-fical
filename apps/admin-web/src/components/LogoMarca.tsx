/* eslint-disable @next/next/no-img-element */
// Duas versões da logo (a colorida some no fundo escuro): o CSS mostra a
// certa conforme o tema — ver .logo-marca em globals.css.
export function LogoMarca({ altura }: { altura: number }) {
  const estilo = { height: altura, width: "auto" } as const;
  return (
    <span className="logo-marca" style={{ height: altura }}>
      <img src="/logo-fechafiscal-claro.png" alt="Fecha Fiscal" className="logo-marca-escuro" style={estilo} />
      <img src="/logo-fechafiscal.png" alt="" aria-hidden="true" className="logo-marca-claro" style={estilo} />
    </span>
  );
}
