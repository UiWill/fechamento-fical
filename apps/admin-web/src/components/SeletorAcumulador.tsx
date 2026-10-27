"use client";

import { ACUMULADORES_DOMINIO, rotuloAcumulador } from "@afe/shared";

/**
 * Campo de texto com autocompletar nativo do navegador (datalist) sobre o
 * catálogo oficial de acumuladores do Domínio — em vez de digitar livre
 * (risco de dois nomes diferentes pro mesmo acumulador), a pessoa busca por
 * código ou nome e escolhe da lista. Continua sendo um campo de texto por
 * baixo (o valor salvo no banco não muda de tipo), então um acumulador que
 * não está nessa lista ainda pode ser digitado manualmente — não bloqueia.
 */
export function SeletorAcumulador({
  value,
  onChange,
  idLista,
}: {
  value: string;
  onChange: (valor: string) => void;
  /** Precisa ser único na página quando o componente aparece mais de uma vez. */
  idLista?: string;
}) {
  const id = idLista ?? "acumuladores-dominio";
  return (
    <>
      <input
        list={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busque por código ou nome (ex: 100, revenda)…"
        className="campo"
      />
      <datalist id={id}>
        {ACUMULADORES_DOMINIO.map((acumulador) => (
          <option key={acumulador.codigo} value={rotuloAcumulador(acumulador)} />
        ))}
      </datalist>
    </>
  );
}
