import { z } from "zod";
import {
  AMBIENTE_FISCAL,
  DIRECAO_DOCUMENTO,
  STATUS_DOCUMENTO_FISCAL,
  STATUS_EMPRESA,
  TIPO_DOCUMENTO_FISCAL,
} from "./enums";
import { validarDigitosCnpj } from "./cnpj";

// CNPJ: 14 dígitos numéricos, sem máscara — normalização acontece na borda
// (DTO -> domínio) — e com dígito verificador válido (não é só contagem de
// caracteres, rejeita números com 14 dígitos mas checksum errado).
export const cnpjSchema = z
  .string()
  .regex(/^\d{14}$/, "CNPJ deve conter 14 dígitos numéricos, sem máscara")
  .refine(validarDigitosCnpj, "CNPJ inválido (dígito verificador não confere)");

export const chaveAcessoSchema = z
  .string()
  .regex(/^\d{44}$/, "Chave de acesso deve conter 44 dígitos numéricos");

export const criarEmpresaSchema = z.object({
  organizacaoId: z.string().cuid(),
  cnpj: cnpjSchema,
  razaoSocial: z.string().min(1),
  uf: z.string().length(2),
  codigoUf: z.number().int().positive(),
  ambiente: z.enum(AMBIENTE_FISCAL).default("HOMOLOGACAO"),
});
export type CriarEmpresaInput = z.infer<typeof criarEmpresaSchema>;

export const empresaSchema = criarEmpresaSchema.extend({
  id: z.string().cuid(),
  status: z.enum(STATUS_EMPRESA),
  ativadaEm: z.coerce.date(),
  desativadaEm: z.coerce.date().nullable(),
});
export type Empresa = z.infer<typeof empresaSchema>;

export const documentoFiscalSchema = z.object({
  id: z.string().cuid(),
  empresaId: z.string().cuid(),
  chaveAcesso: chaveAcessoSchema,
  tipo: z.enum(TIPO_DOCUMENTO_FISCAL),
  direcao: z.enum(DIRECAO_DOCUMENTO),
  status: z.enum(STATUS_DOCUMENTO_FISCAL),
  cfop: z.string().nullable(),
  emitidoEm: z.coerce.date().nullable(),
  recebidoEm: z.coerce.date(),
});
export type DocumentoFiscal = z.infer<typeof documentoFiscalSchema>;

export const criarRegraFiscalSchema = z.object({
  organizacaoId: z.string().cuid(),
  empresaId: z.string().cuid().nullable().optional(),
  cfopEntrada: z.string().min(1),
  descricao: z.string().min(1),
  observacao: z.string().optional(),
  acumulador: z.string().optional(),
});
export type CriarRegraFiscalInput = z.infer<typeof criarRegraFiscalSchema>;

export const uploadCertificadoSchema = z.object({
  empresaId: z.string().cuid(),
  senha: z.string().min(1),
});
export type UploadCertificadoInput = z.infer<typeof uploadCertificadoSchema>;
