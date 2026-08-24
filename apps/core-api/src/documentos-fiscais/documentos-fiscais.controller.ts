import { Controller, Get, Param, Post } from "@nestjs/common";
import { DocumentosFiscaisService } from "./documentos-fiscais.service";

@Controller("empresas/:empresaId/documentos-fiscais")
export class DocumentosFiscaisController {
  constructor(private readonly service: DocumentosFiscaisService) {}

  @Get()
  listar(@Param("empresaId") empresaId: string) {
    return this.service.listarPorEmpresa(empresaId);
  }

  @Post("sincronizar")
  sincronizar(@Param("empresaId") empresaId: string) {
    return this.service.sincronizarComSefaz(empresaId);
  }
}
