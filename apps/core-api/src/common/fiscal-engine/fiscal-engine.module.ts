import { Global, Module } from "@nestjs/common";
import { FiscalEngineClient } from "./fiscal-engine.client";

@Global()
@Module({
  providers: [FiscalEngineClient],
  exports: [FiscalEngineClient],
})
export class FiscalEngineModule {}
