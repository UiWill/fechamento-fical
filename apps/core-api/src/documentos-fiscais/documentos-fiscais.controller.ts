import { BadRequestException, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import type { FastifyReply } from "fastify";
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

  /**
   * Reseta o controle de NSU da empresa — usado depois de uma perda de
   * dados (ex: reconstrução de servidor) pra forçar a SEFAZ a reenviar a
   * distribuição inteira de novo, já que ela só manda o que vem depois do
   * último NSU que a gente registrou.
   */
  @Post("nsu/zerar")
  zerarNsu(@Param("empresaId") empresaId: string) {
    return this.service.zerarNsu(empresaId);
  }

  @Get("xml-zip")
  async baixarXmlZip(
    @Param("empresaId") empresaId: string,
    @Query("direcao") direcao: string,
    @Query("inicio") inicio: string,
    @Query("fim") fim: string,
    @Res() reply: FastifyReply
  ) {
    if (direcao !== "ENTRADA" && direcao !== "SAIDA") {
      throw new BadRequestException('direcao deve ser "ENTRADA" ou "SAIDA"');
    }
    const stream = await this.service.baixarXmlsEmZip(empresaId, direcao, new Date(inicio), new Date(fim));
    reply
      .header("Content-Type", "application/zip")
      .header("Content-Disposition", `attachment; filename="xmls-${direcao.toLowerCase()}.zip"`)
      .send(stream);
  }
}
