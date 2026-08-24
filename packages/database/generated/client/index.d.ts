
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organizacao
 * 
 */
export type Organizacao = $Result.DefaultSelection<Prisma.$OrganizacaoPayload>
/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Empresa
 * 
 */
export type Empresa = $Result.DefaultSelection<Prisma.$EmpresaPayload>
/**
 * Model NsuControle
 * 
 */
export type NsuControle = $Result.DefaultSelection<Prisma.$NsuControlePayload>
/**
 * Model Certificado
 * 
 */
export type Certificado = $Result.DefaultSelection<Prisma.$CertificadoPayload>
/**
 * Model DocumentoFiscal
 * 
 */
export type DocumentoFiscal = $Result.DefaultSelection<Prisma.$DocumentoFiscalPayload>
/**
 * Model ManifestacaoEvento
 * 
 */
export type ManifestacaoEvento = $Result.DefaultSelection<Prisma.$ManifestacaoEventoPayload>
/**
 * Model RegraFiscal
 * 
 */
export type RegraFiscal = $Result.DefaultSelection<Prisma.$RegraFiscalPayload>
/**
 * Model ExportacaoTxt
 * 
 */
export type ExportacaoTxt = $Result.DefaultSelection<Prisma.$ExportacaoTxtPayload>
/**
 * Model Fatura
 * 
 */
export type Fatura = $Result.DefaultSelection<Prisma.$FaturaPayload>
/**
 * Model ItemFatura
 * 
 */
export type ItemFatura = $Result.DefaultSelection<Prisma.$ItemFaturaPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PapelUsuario: {
  ADMIN_PLATAFORMA: 'ADMIN_PLATAFORMA',
  ADMIN_ORGANIZACAO: 'ADMIN_ORGANIZACAO',
  OPERADOR: 'OPERADOR'
};

export type PapelUsuario = (typeof PapelUsuario)[keyof typeof PapelUsuario]


export const StatusEmpresa: {
  ATIVA: 'ATIVA',
  INATIVA: 'INATIVA'
};

export type StatusEmpresa = (typeof StatusEmpresa)[keyof typeof StatusEmpresa]


export const AmbienteFiscal: {
  PRODUCAO: 'PRODUCAO',
  HOMOLOGACAO: 'HOMOLOGACAO'
};

export type AmbienteFiscal = (typeof AmbienteFiscal)[keyof typeof AmbienteFiscal]


export const TipoDocumentoFiscal: {
  NFE: 'NFE',
  NFCE: 'NFCE'
};

export type TipoDocumentoFiscal = (typeof TipoDocumentoFiscal)[keyof typeof TipoDocumentoFiscal]


export const DirecaoDocumento: {
  ENTRADA: 'ENTRADA',
  SAIDA: 'SAIDA'
};

export type DirecaoDocumento = (typeof DirecaoDocumento)[keyof typeof DirecaoDocumento]


export const StatusDocumentoFiscal: {
  RECEBIDO: 'RECEBIDO',
  MANIFESTADO: 'MANIFESTADO',
  CLASSIFICADO: 'CLASSIFICADO',
  EXPORTADO: 'EXPORTADO',
  ERRO: 'ERRO'
};

export type StatusDocumentoFiscal = (typeof StatusDocumentoFiscal)[keyof typeof StatusDocumentoFiscal]


export const TipoEventoManifestacao: {
  CIENCIA_OPERACAO: 'CIENCIA_OPERACAO',
  CONFIRMACAO_OPERACAO: 'CONFIRMACAO_OPERACAO',
  DESCONHECIMENTO_OPERACAO: 'DESCONHECIMENTO_OPERACAO',
  OPERACAO_NAO_REALIZADA: 'OPERACAO_NAO_REALIZADA'
};

export type TipoEventoManifestacao = (typeof TipoEventoManifestacao)[keyof typeof TipoEventoManifestacao]


export const StatusManifestacao: {
  PENDENTE: 'PENDENTE',
  ENVIADA: 'ENVIADA',
  AUTORIZADA: 'AUTORIZADA',
  REJEITADA: 'REJEITADA'
};

export type StatusManifestacao = (typeof StatusManifestacao)[keyof typeof StatusManifestacao]


export const StatusExportacaoTxt: {
  PENDENTE: 'PENDENTE',
  PROCESSANDO: 'PROCESSANDO',
  CONCLUIDA: 'CONCLUIDA',
  ERRO: 'ERRO'
};

export type StatusExportacaoTxt = (typeof StatusExportacaoTxt)[keyof typeof StatusExportacaoTxt]


export const StatusFatura: {
  ABERTA: 'ABERTA',
  PAGA: 'PAGA',
  ATRASADA: 'ATRASADA',
  CANCELADA: 'CANCELADA'
};

export type StatusFatura = (typeof StatusFatura)[keyof typeof StatusFatura]

}

export type PapelUsuario = $Enums.PapelUsuario

export const PapelUsuario: typeof $Enums.PapelUsuario

export type StatusEmpresa = $Enums.StatusEmpresa

export const StatusEmpresa: typeof $Enums.StatusEmpresa

export type AmbienteFiscal = $Enums.AmbienteFiscal

export const AmbienteFiscal: typeof $Enums.AmbienteFiscal

export type TipoDocumentoFiscal = $Enums.TipoDocumentoFiscal

export const TipoDocumentoFiscal: typeof $Enums.TipoDocumentoFiscal

export type DirecaoDocumento = $Enums.DirecaoDocumento

export const DirecaoDocumento: typeof $Enums.DirecaoDocumento

export type StatusDocumentoFiscal = $Enums.StatusDocumentoFiscal

export const StatusDocumentoFiscal: typeof $Enums.StatusDocumentoFiscal

export type TipoEventoManifestacao = $Enums.TipoEventoManifestacao

export const TipoEventoManifestacao: typeof $Enums.TipoEventoManifestacao

export type StatusManifestacao = $Enums.StatusManifestacao

export const StatusManifestacao: typeof $Enums.StatusManifestacao

export type StatusExportacaoTxt = $Enums.StatusExportacaoTxt

export const StatusExportacaoTxt: typeof $Enums.StatusExportacaoTxt

export type StatusFatura = $Enums.StatusFatura

export const StatusFatura: typeof $Enums.StatusFatura

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Organizacaos
 * const organizacaos = await prisma.organizacao.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Organizacaos
   * const organizacaos = await prisma.organizacao.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.organizacao`: Exposes CRUD operations for the **Organizacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizacaos
    * const organizacaos = await prisma.organizacao.findMany()
    * ```
    */
  get organizacao(): Prisma.OrganizacaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.empresa`: Exposes CRUD operations for the **Empresa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Empresas
    * const empresas = await prisma.empresa.findMany()
    * ```
    */
  get empresa(): Prisma.EmpresaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nsuControle`: Exposes CRUD operations for the **NsuControle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NsuControles
    * const nsuControles = await prisma.nsuControle.findMany()
    * ```
    */
  get nsuControle(): Prisma.NsuControleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.certificado`: Exposes CRUD operations for the **Certificado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Certificados
    * const certificados = await prisma.certificado.findMany()
    * ```
    */
  get certificado(): Prisma.CertificadoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentoFiscal`: Exposes CRUD operations for the **DocumentoFiscal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentoFiscals
    * const documentoFiscals = await prisma.documentoFiscal.findMany()
    * ```
    */
  get documentoFiscal(): Prisma.DocumentoFiscalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.manifestacaoEvento`: Exposes CRUD operations for the **ManifestacaoEvento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ManifestacaoEventos
    * const manifestacaoEventos = await prisma.manifestacaoEvento.findMany()
    * ```
    */
  get manifestacaoEvento(): Prisma.ManifestacaoEventoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.regraFiscal`: Exposes CRUD operations for the **RegraFiscal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegraFiscals
    * const regraFiscals = await prisma.regraFiscal.findMany()
    * ```
    */
  get regraFiscal(): Prisma.RegraFiscalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exportacaoTxt`: Exposes CRUD operations for the **ExportacaoTxt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExportacaoTxts
    * const exportacaoTxts = await prisma.exportacaoTxt.findMany()
    * ```
    */
  get exportacaoTxt(): Prisma.ExportacaoTxtDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fatura`: Exposes CRUD operations for the **Fatura** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Faturas
    * const faturas = await prisma.fatura.findMany()
    * ```
    */
  get fatura(): Prisma.FaturaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemFatura`: Exposes CRUD operations for the **ItemFatura** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemFaturas
    * const itemFaturas = await prisma.itemFatura.findMany()
    * ```
    */
  get itemFatura(): Prisma.ItemFaturaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Organizacao: 'Organizacao',
    Usuario: 'Usuario',
    Empresa: 'Empresa',
    NsuControle: 'NsuControle',
    Certificado: 'Certificado',
    DocumentoFiscal: 'DocumentoFiscal',
    ManifestacaoEvento: 'ManifestacaoEvento',
    RegraFiscal: 'RegraFiscal',
    ExportacaoTxt: 'ExportacaoTxt',
    Fatura: 'Fatura',
    ItemFatura: 'ItemFatura',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "organizacao" | "usuario" | "empresa" | "nsuControle" | "certificado" | "documentoFiscal" | "manifestacaoEvento" | "regraFiscal" | "exportacaoTxt" | "fatura" | "itemFatura" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organizacao: {
        payload: Prisma.$OrganizacaoPayload<ExtArgs>
        fields: Prisma.OrganizacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload>
          }
          findFirst: {
            args: Prisma.OrganizacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload>
          }
          findMany: {
            args: Prisma.OrganizacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload>[]
          }
          create: {
            args: Prisma.OrganizacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload>
          }
          createMany: {
            args: Prisma.OrganizacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload>[]
          }
          delete: {
            args: Prisma.OrganizacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload>
          }
          update: {
            args: Prisma.OrganizacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload>
          }
          deleteMany: {
            args: Prisma.OrganizacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload>[]
          }
          upsert: {
            args: Prisma.OrganizacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizacaoPayload>
          }
          aggregate: {
            args: Prisma.OrganizacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizacao>
          }
          groupBy: {
            args: Prisma.OrganizacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizacaoCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizacaoCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Empresa: {
        payload: Prisma.$EmpresaPayload<ExtArgs>
        fields: Prisma.EmpresaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmpresaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmpresaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findFirst: {
            args: Prisma.EmpresaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmpresaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findMany: {
            args: Prisma.EmpresaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          create: {
            args: Prisma.EmpresaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          createMany: {
            args: Prisma.EmpresaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmpresaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          delete: {
            args: Prisma.EmpresaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          update: {
            args: Prisma.EmpresaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          deleteMany: {
            args: Prisma.EmpresaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmpresaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmpresaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          upsert: {
            args: Prisma.EmpresaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          aggregate: {
            args: Prisma.EmpresaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmpresa>
          }
          groupBy: {
            args: Prisma.EmpresaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmpresaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmpresaCountArgs<ExtArgs>
            result: $Utils.Optional<EmpresaCountAggregateOutputType> | number
          }
        }
      }
      NsuControle: {
        payload: Prisma.$NsuControlePayload<ExtArgs>
        fields: Prisma.NsuControleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NsuControleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NsuControleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload>
          }
          findFirst: {
            args: Prisma.NsuControleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NsuControleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload>
          }
          findMany: {
            args: Prisma.NsuControleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload>[]
          }
          create: {
            args: Prisma.NsuControleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload>
          }
          createMany: {
            args: Prisma.NsuControleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NsuControleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload>[]
          }
          delete: {
            args: Prisma.NsuControleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload>
          }
          update: {
            args: Prisma.NsuControleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload>
          }
          deleteMany: {
            args: Prisma.NsuControleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NsuControleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NsuControleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload>[]
          }
          upsert: {
            args: Prisma.NsuControleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NsuControlePayload>
          }
          aggregate: {
            args: Prisma.NsuControleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNsuControle>
          }
          groupBy: {
            args: Prisma.NsuControleGroupByArgs<ExtArgs>
            result: $Utils.Optional<NsuControleGroupByOutputType>[]
          }
          count: {
            args: Prisma.NsuControleCountArgs<ExtArgs>
            result: $Utils.Optional<NsuControleCountAggregateOutputType> | number
          }
        }
      }
      Certificado: {
        payload: Prisma.$CertificadoPayload<ExtArgs>
        fields: Prisma.CertificadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CertificadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CertificadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload>
          }
          findFirst: {
            args: Prisma.CertificadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CertificadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload>
          }
          findMany: {
            args: Prisma.CertificadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload>[]
          }
          create: {
            args: Prisma.CertificadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload>
          }
          createMany: {
            args: Prisma.CertificadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CertificadoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload>[]
          }
          delete: {
            args: Prisma.CertificadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload>
          }
          update: {
            args: Prisma.CertificadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload>
          }
          deleteMany: {
            args: Prisma.CertificadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CertificadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CertificadoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload>[]
          }
          upsert: {
            args: Prisma.CertificadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificadoPayload>
          }
          aggregate: {
            args: Prisma.CertificadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCertificado>
          }
          groupBy: {
            args: Prisma.CertificadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CertificadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CertificadoCountArgs<ExtArgs>
            result: $Utils.Optional<CertificadoCountAggregateOutputType> | number
          }
        }
      }
      DocumentoFiscal: {
        payload: Prisma.$DocumentoFiscalPayload<ExtArgs>
        fields: Prisma.DocumentoFiscalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentoFiscalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentoFiscalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload>
          }
          findFirst: {
            args: Prisma.DocumentoFiscalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentoFiscalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload>
          }
          findMany: {
            args: Prisma.DocumentoFiscalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload>[]
          }
          create: {
            args: Prisma.DocumentoFiscalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload>
          }
          createMany: {
            args: Prisma.DocumentoFiscalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentoFiscalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload>[]
          }
          delete: {
            args: Prisma.DocumentoFiscalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload>
          }
          update: {
            args: Prisma.DocumentoFiscalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload>
          }
          deleteMany: {
            args: Prisma.DocumentoFiscalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentoFiscalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentoFiscalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload>[]
          }
          upsert: {
            args: Prisma.DocumentoFiscalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoFiscalPayload>
          }
          aggregate: {
            args: Prisma.DocumentoFiscalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentoFiscal>
          }
          groupBy: {
            args: Prisma.DocumentoFiscalGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentoFiscalGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentoFiscalCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentoFiscalCountAggregateOutputType> | number
          }
        }
      }
      ManifestacaoEvento: {
        payload: Prisma.$ManifestacaoEventoPayload<ExtArgs>
        fields: Prisma.ManifestacaoEventoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ManifestacaoEventoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ManifestacaoEventoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload>
          }
          findFirst: {
            args: Prisma.ManifestacaoEventoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ManifestacaoEventoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload>
          }
          findMany: {
            args: Prisma.ManifestacaoEventoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload>[]
          }
          create: {
            args: Prisma.ManifestacaoEventoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload>
          }
          createMany: {
            args: Prisma.ManifestacaoEventoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ManifestacaoEventoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload>[]
          }
          delete: {
            args: Prisma.ManifestacaoEventoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload>
          }
          update: {
            args: Prisma.ManifestacaoEventoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload>
          }
          deleteMany: {
            args: Prisma.ManifestacaoEventoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ManifestacaoEventoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ManifestacaoEventoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload>[]
          }
          upsert: {
            args: Prisma.ManifestacaoEventoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManifestacaoEventoPayload>
          }
          aggregate: {
            args: Prisma.ManifestacaoEventoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateManifestacaoEvento>
          }
          groupBy: {
            args: Prisma.ManifestacaoEventoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ManifestacaoEventoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ManifestacaoEventoCountArgs<ExtArgs>
            result: $Utils.Optional<ManifestacaoEventoCountAggregateOutputType> | number
          }
        }
      }
      RegraFiscal: {
        payload: Prisma.$RegraFiscalPayload<ExtArgs>
        fields: Prisma.RegraFiscalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegraFiscalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegraFiscalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload>
          }
          findFirst: {
            args: Prisma.RegraFiscalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegraFiscalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload>
          }
          findMany: {
            args: Prisma.RegraFiscalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload>[]
          }
          create: {
            args: Prisma.RegraFiscalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload>
          }
          createMany: {
            args: Prisma.RegraFiscalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegraFiscalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload>[]
          }
          delete: {
            args: Prisma.RegraFiscalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload>
          }
          update: {
            args: Prisma.RegraFiscalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload>
          }
          deleteMany: {
            args: Prisma.RegraFiscalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegraFiscalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegraFiscalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload>[]
          }
          upsert: {
            args: Prisma.RegraFiscalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegraFiscalPayload>
          }
          aggregate: {
            args: Prisma.RegraFiscalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegraFiscal>
          }
          groupBy: {
            args: Prisma.RegraFiscalGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegraFiscalGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegraFiscalCountArgs<ExtArgs>
            result: $Utils.Optional<RegraFiscalCountAggregateOutputType> | number
          }
        }
      }
      ExportacaoTxt: {
        payload: Prisma.$ExportacaoTxtPayload<ExtArgs>
        fields: Prisma.ExportacaoTxtFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExportacaoTxtFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExportacaoTxtFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload>
          }
          findFirst: {
            args: Prisma.ExportacaoTxtFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExportacaoTxtFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload>
          }
          findMany: {
            args: Prisma.ExportacaoTxtFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload>[]
          }
          create: {
            args: Prisma.ExportacaoTxtCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload>
          }
          createMany: {
            args: Prisma.ExportacaoTxtCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExportacaoTxtCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload>[]
          }
          delete: {
            args: Prisma.ExportacaoTxtDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload>
          }
          update: {
            args: Prisma.ExportacaoTxtUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload>
          }
          deleteMany: {
            args: Prisma.ExportacaoTxtDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExportacaoTxtUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExportacaoTxtUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload>[]
          }
          upsert: {
            args: Prisma.ExportacaoTxtUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExportacaoTxtPayload>
          }
          aggregate: {
            args: Prisma.ExportacaoTxtAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExportacaoTxt>
          }
          groupBy: {
            args: Prisma.ExportacaoTxtGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExportacaoTxtGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExportacaoTxtCountArgs<ExtArgs>
            result: $Utils.Optional<ExportacaoTxtCountAggregateOutputType> | number
          }
        }
      }
      Fatura: {
        payload: Prisma.$FaturaPayload<ExtArgs>
        fields: Prisma.FaturaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FaturaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FaturaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          findFirst: {
            args: Prisma.FaturaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FaturaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          findMany: {
            args: Prisma.FaturaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>[]
          }
          create: {
            args: Prisma.FaturaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          createMany: {
            args: Prisma.FaturaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FaturaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>[]
          }
          delete: {
            args: Prisma.FaturaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          update: {
            args: Prisma.FaturaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          deleteMany: {
            args: Prisma.FaturaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FaturaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FaturaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>[]
          }
          upsert: {
            args: Prisma.FaturaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FaturaPayload>
          }
          aggregate: {
            args: Prisma.FaturaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFatura>
          }
          groupBy: {
            args: Prisma.FaturaGroupByArgs<ExtArgs>
            result: $Utils.Optional<FaturaGroupByOutputType>[]
          }
          count: {
            args: Prisma.FaturaCountArgs<ExtArgs>
            result: $Utils.Optional<FaturaCountAggregateOutputType> | number
          }
        }
      }
      ItemFatura: {
        payload: Prisma.$ItemFaturaPayload<ExtArgs>
        fields: Prisma.ItemFaturaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFaturaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFaturaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload>
          }
          findFirst: {
            args: Prisma.ItemFaturaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFaturaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload>
          }
          findMany: {
            args: Prisma.ItemFaturaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload>[]
          }
          create: {
            args: Prisma.ItemFaturaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload>
          }
          createMany: {
            args: Prisma.ItemFaturaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemFaturaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload>[]
          }
          delete: {
            args: Prisma.ItemFaturaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload>
          }
          update: {
            args: Prisma.ItemFaturaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload>
          }
          deleteMany: {
            args: Prisma.ItemFaturaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemFaturaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemFaturaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload>[]
          }
          upsert: {
            args: Prisma.ItemFaturaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFaturaPayload>
          }
          aggregate: {
            args: Prisma.ItemFaturaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemFatura>
          }
          groupBy: {
            args: Prisma.ItemFaturaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemFaturaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemFaturaCountArgs<ExtArgs>
            result: $Utils.Optional<ItemFaturaCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    organizacao?: OrganizacaoOmit
    usuario?: UsuarioOmit
    empresa?: EmpresaOmit
    nsuControle?: NsuControleOmit
    certificado?: CertificadoOmit
    documentoFiscal?: DocumentoFiscalOmit
    manifestacaoEvento?: ManifestacaoEventoOmit
    regraFiscal?: RegraFiscalOmit
    exportacaoTxt?: ExportacaoTxtOmit
    fatura?: FaturaOmit
    itemFatura?: ItemFaturaOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizacaoCountOutputType
   */

  export type OrganizacaoCountOutputType = {
    empresas: number
    regrasFiscais: number
    usuarios: number
    faturas: number
    auditLogs: number
  }

  export type OrganizacaoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresas?: boolean | OrganizacaoCountOutputTypeCountEmpresasArgs
    regrasFiscais?: boolean | OrganizacaoCountOutputTypeCountRegrasFiscaisArgs
    usuarios?: boolean | OrganizacaoCountOutputTypeCountUsuariosArgs
    faturas?: boolean | OrganizacaoCountOutputTypeCountFaturasArgs
    auditLogs?: boolean | OrganizacaoCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * OrganizacaoCountOutputType without action
   */
  export type OrganizacaoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizacaoCountOutputType
     */
    select?: OrganizacaoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizacaoCountOutputType without action
   */
  export type OrganizacaoCountOutputTypeCountEmpresasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaWhereInput
  }

  /**
   * OrganizacaoCountOutputType without action
   */
  export type OrganizacaoCountOutputTypeCountRegrasFiscaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegraFiscalWhereInput
  }

  /**
   * OrganizacaoCountOutputType without action
   */
  export type OrganizacaoCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }

  /**
   * OrganizacaoCountOutputType without action
   */
  export type OrganizacaoCountOutputTypeCountFaturasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaturaWhereInput
  }

  /**
   * OrganizacaoCountOutputType without action
   */
  export type OrganizacaoCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type EmpresaCountOutputType
   */

  export type EmpresaCountOutputType = {
    documentosFiscais: number
    manifestacoes: number
    exportacoesTxt: number
    itensFatura: number
    regrasFiscaisOverride: number
  }

  export type EmpresaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documentosFiscais?: boolean | EmpresaCountOutputTypeCountDocumentosFiscaisArgs
    manifestacoes?: boolean | EmpresaCountOutputTypeCountManifestacoesArgs
    exportacoesTxt?: boolean | EmpresaCountOutputTypeCountExportacoesTxtArgs
    itensFatura?: boolean | EmpresaCountOutputTypeCountItensFaturaArgs
    regrasFiscaisOverride?: boolean | EmpresaCountOutputTypeCountRegrasFiscaisOverrideArgs
  }

  // Custom InputTypes
  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaCountOutputType
     */
    select?: EmpresaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountDocumentosFiscaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentoFiscalWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountManifestacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManifestacaoEventoWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountExportacoesTxtArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExportacaoTxtWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountItensFaturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFaturaWhereInput
  }

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountRegrasFiscaisOverrideArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegraFiscalWhereInput
  }


  /**
   * Count Type DocumentoFiscalCountOutputType
   */

  export type DocumentoFiscalCountOutputType = {
    manifestacoes: number
  }

  export type DocumentoFiscalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manifestacoes?: boolean | DocumentoFiscalCountOutputTypeCountManifestacoesArgs
  }

  // Custom InputTypes
  /**
   * DocumentoFiscalCountOutputType without action
   */
  export type DocumentoFiscalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscalCountOutputType
     */
    select?: DocumentoFiscalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentoFiscalCountOutputType without action
   */
  export type DocumentoFiscalCountOutputTypeCountManifestacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManifestacaoEventoWhereInput
  }


  /**
   * Count Type FaturaCountOutputType
   */

  export type FaturaCountOutputType = {
    itens: number
  }

  export type FaturaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itens?: boolean | FaturaCountOutputTypeCountItensArgs
  }

  // Custom InputTypes
  /**
   * FaturaCountOutputType without action
   */
  export type FaturaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FaturaCountOutputType
     */
    select?: FaturaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FaturaCountOutputType without action
   */
  export type FaturaCountOutputTypeCountItensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFaturaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organizacao
   */

  export type AggregateOrganizacao = {
    _count: OrganizacaoCountAggregateOutputType | null
    _min: OrganizacaoMinAggregateOutputType | null
    _max: OrganizacaoMaxAggregateOutputType | null
  }

  export type OrganizacaoMinAggregateOutputType = {
    id: string | null
    razaoSocial: string | null
    cnpj: string | null
    emailContato: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type OrganizacaoMaxAggregateOutputType = {
    id: string | null
    razaoSocial: string | null
    cnpj: string | null
    emailContato: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type OrganizacaoCountAggregateOutputType = {
    id: number
    razaoSocial: number
    cnpj: number
    emailContato: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type OrganizacaoMinAggregateInputType = {
    id?: true
    razaoSocial?: true
    cnpj?: true
    emailContato?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type OrganizacaoMaxAggregateInputType = {
    id?: true
    razaoSocial?: true
    cnpj?: true
    emailContato?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type OrganizacaoCountAggregateInputType = {
    id?: true
    razaoSocial?: true
    cnpj?: true
    emailContato?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type OrganizacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizacao to aggregate.
     */
    where?: OrganizacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizacaos to fetch.
     */
    orderBy?: OrganizacaoOrderByWithRelationInput | OrganizacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizacaos
    **/
    _count?: true | OrganizacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizacaoMaxAggregateInputType
  }

  export type GetOrganizacaoAggregateType<T extends OrganizacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizacao[P]>
      : GetScalarType<T[P], AggregateOrganizacao[P]>
  }




  export type OrganizacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizacaoWhereInput
    orderBy?: OrganizacaoOrderByWithAggregationInput | OrganizacaoOrderByWithAggregationInput[]
    by: OrganizacaoScalarFieldEnum[] | OrganizacaoScalarFieldEnum
    having?: OrganizacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizacaoCountAggregateInputType | true
    _min?: OrganizacaoMinAggregateInputType
    _max?: OrganizacaoMaxAggregateInputType
  }

  export type OrganizacaoGroupByOutputType = {
    id: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm: Date
    atualizadoEm: Date
    _count: OrganizacaoCountAggregateOutputType | null
    _min: OrganizacaoMinAggregateOutputType | null
    _max: OrganizacaoMaxAggregateOutputType | null
  }

  type GetOrganizacaoGroupByPayload<T extends OrganizacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizacaoGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizacaoGroupByOutputType[P]>
        }
      >
    >


  export type OrganizacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    emailContato?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    empresas?: boolean | Organizacao$empresasArgs<ExtArgs>
    regrasFiscais?: boolean | Organizacao$regrasFiscaisArgs<ExtArgs>
    usuarios?: boolean | Organizacao$usuariosArgs<ExtArgs>
    faturas?: boolean | Organizacao$faturasArgs<ExtArgs>
    auditLogs?: boolean | Organizacao$auditLogsArgs<ExtArgs>
    _count?: boolean | OrganizacaoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizacao"]>

  export type OrganizacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    emailContato?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["organizacao"]>

  export type OrganizacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    emailContato?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["organizacao"]>

  export type OrganizacaoSelectScalar = {
    id?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    emailContato?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type OrganizacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "razaoSocial" | "cnpj" | "emailContato" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["organizacao"]>
  export type OrganizacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresas?: boolean | Organizacao$empresasArgs<ExtArgs>
    regrasFiscais?: boolean | Organizacao$regrasFiscaisArgs<ExtArgs>
    usuarios?: boolean | Organizacao$usuariosArgs<ExtArgs>
    faturas?: boolean | Organizacao$faturasArgs<ExtArgs>
    auditLogs?: boolean | Organizacao$auditLogsArgs<ExtArgs>
    _count?: boolean | OrganizacaoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organizacao"
    objects: {
      empresas: Prisma.$EmpresaPayload<ExtArgs>[]
      regrasFiscais: Prisma.$RegraFiscalPayload<ExtArgs>[]
      usuarios: Prisma.$UsuarioPayload<ExtArgs>[]
      faturas: Prisma.$FaturaPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      razaoSocial: string
      cnpj: string
      emailContato: string
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["organizacao"]>
    composites: {}
  }

  type OrganizacaoGetPayload<S extends boolean | null | undefined | OrganizacaoDefaultArgs> = $Result.GetResult<Prisma.$OrganizacaoPayload, S>

  type OrganizacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizacaoCountAggregateInputType | true
    }

  export interface OrganizacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organizacao'], meta: { name: 'Organizacao' } }
    /**
     * Find zero or one Organizacao that matches the filter.
     * @param {OrganizacaoFindUniqueArgs} args - Arguments to find a Organizacao
     * @example
     * // Get one Organizacao
     * const organizacao = await prisma.organizacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizacaoFindUniqueArgs>(args: SelectSubset<T, OrganizacaoFindUniqueArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organizacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizacaoFindUniqueOrThrowArgs} args - Arguments to find a Organizacao
     * @example
     * // Get one Organizacao
     * const organizacao = await prisma.organizacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organizacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoFindFirstArgs} args - Arguments to find a Organizacao
     * @example
     * // Get one Organizacao
     * const organizacao = await prisma.organizacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizacaoFindFirstArgs>(args?: SelectSubset<T, OrganizacaoFindFirstArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organizacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoFindFirstOrThrowArgs} args - Arguments to find a Organizacao
     * @example
     * // Get one Organizacao
     * const organizacao = await prisma.organizacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizacaos
     * const organizacaos = await prisma.organizacao.findMany()
     * 
     * // Get first 10 Organizacaos
     * const organizacaos = await prisma.organizacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizacaoWithIdOnly = await prisma.organizacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizacaoFindManyArgs>(args?: SelectSubset<T, OrganizacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organizacao.
     * @param {OrganizacaoCreateArgs} args - Arguments to create a Organizacao.
     * @example
     * // Create one Organizacao
     * const Organizacao = await prisma.organizacao.create({
     *   data: {
     *     // ... data to create a Organizacao
     *   }
     * })
     * 
     */
    create<T extends OrganizacaoCreateArgs>(args: SelectSubset<T, OrganizacaoCreateArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizacaos.
     * @param {OrganizacaoCreateManyArgs} args - Arguments to create many Organizacaos.
     * @example
     * // Create many Organizacaos
     * const organizacao = await prisma.organizacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizacaoCreateManyArgs>(args?: SelectSubset<T, OrganizacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizacaos and returns the data saved in the database.
     * @param {OrganizacaoCreateManyAndReturnArgs} args - Arguments to create many Organizacaos.
     * @example
     * // Create many Organizacaos
     * const organizacao = await prisma.organizacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizacaos and only return the `id`
     * const organizacaoWithIdOnly = await prisma.organizacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organizacao.
     * @param {OrganizacaoDeleteArgs} args - Arguments to delete one Organizacao.
     * @example
     * // Delete one Organizacao
     * const Organizacao = await prisma.organizacao.delete({
     *   where: {
     *     // ... filter to delete one Organizacao
     *   }
     * })
     * 
     */
    delete<T extends OrganizacaoDeleteArgs>(args: SelectSubset<T, OrganizacaoDeleteArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organizacao.
     * @param {OrganizacaoUpdateArgs} args - Arguments to update one Organizacao.
     * @example
     * // Update one Organizacao
     * const organizacao = await prisma.organizacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizacaoUpdateArgs>(args: SelectSubset<T, OrganizacaoUpdateArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizacaos.
     * @param {OrganizacaoDeleteManyArgs} args - Arguments to filter Organizacaos to delete.
     * @example
     * // Delete a few Organizacaos
     * const { count } = await prisma.organizacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizacaoDeleteManyArgs>(args?: SelectSubset<T, OrganizacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizacaos
     * const organizacao = await prisma.organizacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizacaoUpdateManyArgs>(args: SelectSubset<T, OrganizacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizacaos and returns the data updated in the database.
     * @param {OrganizacaoUpdateManyAndReturnArgs} args - Arguments to update many Organizacaos.
     * @example
     * // Update many Organizacaos
     * const organizacao = await prisma.organizacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizacaos and only return the `id`
     * const organizacaoWithIdOnly = await prisma.organizacao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organizacao.
     * @param {OrganizacaoUpsertArgs} args - Arguments to update or create a Organizacao.
     * @example
     * // Update or create a Organizacao
     * const organizacao = await prisma.organizacao.upsert({
     *   create: {
     *     // ... data to create a Organizacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organizacao we want to update
     *   }
     * })
     */
    upsert<T extends OrganizacaoUpsertArgs>(args: SelectSubset<T, OrganizacaoUpsertArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoCountArgs} args - Arguments to filter Organizacaos to count.
     * @example
     * // Count the number of Organizacaos
     * const count = await prisma.organizacao.count({
     *   where: {
     *     // ... the filter for the Organizacaos we want to count
     *   }
     * })
    **/
    count<T extends OrganizacaoCountArgs>(
      args?: Subset<T, OrganizacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organizacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizacaoAggregateArgs>(args: Subset<T, OrganizacaoAggregateArgs>): Prisma.PrismaPromise<GetOrganizacaoAggregateType<T>>

    /**
     * Group by Organizacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizacaoGroupByArgs['orderBy'] }
        : { orderBy?: OrganizacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organizacao model
   */
  readonly fields: OrganizacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organizacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresas<T extends Organizacao$empresasArgs<ExtArgs> = {}>(args?: Subset<T, Organizacao$empresasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    regrasFiscais<T extends Organizacao$regrasFiscaisArgs<ExtArgs> = {}>(args?: Subset<T, Organizacao$regrasFiscaisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usuarios<T extends Organizacao$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, Organizacao$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    faturas<T extends Organizacao$faturasArgs<ExtArgs> = {}>(args?: Subset<T, Organizacao$faturasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Organizacao$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Organizacao$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organizacao model
   */
  interface OrganizacaoFieldRefs {
    readonly id: FieldRef<"Organizacao", 'String'>
    readonly razaoSocial: FieldRef<"Organizacao", 'String'>
    readonly cnpj: FieldRef<"Organizacao", 'String'>
    readonly emailContato: FieldRef<"Organizacao", 'String'>
    readonly criadoEm: FieldRef<"Organizacao", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Organizacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organizacao findUnique
   */
  export type OrganizacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    /**
     * Filter, which Organizacao to fetch.
     */
    where: OrganizacaoWhereUniqueInput
  }

  /**
   * Organizacao findUniqueOrThrow
   */
  export type OrganizacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    /**
     * Filter, which Organizacao to fetch.
     */
    where: OrganizacaoWhereUniqueInput
  }

  /**
   * Organizacao findFirst
   */
  export type OrganizacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    /**
     * Filter, which Organizacao to fetch.
     */
    where?: OrganizacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizacaos to fetch.
     */
    orderBy?: OrganizacaoOrderByWithRelationInput | OrganizacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizacaos.
     */
    cursor?: OrganizacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizacaos.
     */
    distinct?: OrganizacaoScalarFieldEnum | OrganizacaoScalarFieldEnum[]
  }

  /**
   * Organizacao findFirstOrThrow
   */
  export type OrganizacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    /**
     * Filter, which Organizacao to fetch.
     */
    where?: OrganizacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizacaos to fetch.
     */
    orderBy?: OrganizacaoOrderByWithRelationInput | OrganizacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizacaos.
     */
    cursor?: OrganizacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizacaos.
     */
    distinct?: OrganizacaoScalarFieldEnum | OrganizacaoScalarFieldEnum[]
  }

  /**
   * Organizacao findMany
   */
  export type OrganizacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    /**
     * Filter, which Organizacaos to fetch.
     */
    where?: OrganizacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizacaos to fetch.
     */
    orderBy?: OrganizacaoOrderByWithRelationInput | OrganizacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizacaos.
     */
    cursor?: OrganizacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizacaos.
     */
    skip?: number
    distinct?: OrganizacaoScalarFieldEnum | OrganizacaoScalarFieldEnum[]
  }

  /**
   * Organizacao create
   */
  export type OrganizacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Organizacao.
     */
    data: XOR<OrganizacaoCreateInput, OrganizacaoUncheckedCreateInput>
  }

  /**
   * Organizacao createMany
   */
  export type OrganizacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizacaos.
     */
    data: OrganizacaoCreateManyInput | OrganizacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organizacao createManyAndReturn
   */
  export type OrganizacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Organizacaos.
     */
    data: OrganizacaoCreateManyInput | OrganizacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organizacao update
   */
  export type OrganizacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Organizacao.
     */
    data: XOR<OrganizacaoUpdateInput, OrganizacaoUncheckedUpdateInput>
    /**
     * Choose, which Organizacao to update.
     */
    where: OrganizacaoWhereUniqueInput
  }

  /**
   * Organizacao updateMany
   */
  export type OrganizacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizacaos.
     */
    data: XOR<OrganizacaoUpdateManyMutationInput, OrganizacaoUncheckedUpdateManyInput>
    /**
     * Filter which Organizacaos to update
     */
    where?: OrganizacaoWhereInput
    /**
     * Limit how many Organizacaos to update.
     */
    limit?: number
  }

  /**
   * Organizacao updateManyAndReturn
   */
  export type OrganizacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * The data used to update Organizacaos.
     */
    data: XOR<OrganizacaoUpdateManyMutationInput, OrganizacaoUncheckedUpdateManyInput>
    /**
     * Filter which Organizacaos to update
     */
    where?: OrganizacaoWhereInput
    /**
     * Limit how many Organizacaos to update.
     */
    limit?: number
  }

  /**
   * Organizacao upsert
   */
  export type OrganizacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Organizacao to update in case it exists.
     */
    where: OrganizacaoWhereUniqueInput
    /**
     * In case the Organizacao found by the `where` argument doesn't exist, create a new Organizacao with this data.
     */
    create: XOR<OrganizacaoCreateInput, OrganizacaoUncheckedCreateInput>
    /**
     * In case the Organizacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizacaoUpdateInput, OrganizacaoUncheckedUpdateInput>
  }

  /**
   * Organizacao delete
   */
  export type OrganizacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    /**
     * Filter which Organizacao to delete.
     */
    where: OrganizacaoWhereUniqueInput
  }

  /**
   * Organizacao deleteMany
   */
  export type OrganizacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizacaos to delete
     */
    where?: OrganizacaoWhereInput
    /**
     * Limit how many Organizacaos to delete.
     */
    limit?: number
  }

  /**
   * Organizacao.empresas
   */
  export type Organizacao$empresasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    where?: EmpresaWhereInput
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    cursor?: EmpresaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Organizacao.regrasFiscais
   */
  export type Organizacao$regrasFiscaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    where?: RegraFiscalWhereInput
    orderBy?: RegraFiscalOrderByWithRelationInput | RegraFiscalOrderByWithRelationInput[]
    cursor?: RegraFiscalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegraFiscalScalarFieldEnum | RegraFiscalScalarFieldEnum[]
  }

  /**
   * Organizacao.usuarios
   */
  export type Organizacao$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Organizacao.faturas
   */
  export type Organizacao$faturasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    where?: FaturaWhereInput
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    cursor?: FaturaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FaturaScalarFieldEnum | FaturaScalarFieldEnum[]
  }

  /**
   * Organizacao.auditLogs
   */
  export type Organizacao$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Organizacao without action
   */
  export type OrganizacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
  }


  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    nome: string | null
    email: string | null
    senhaHash: string | null
    papel: $Enums.PapelUsuario | null
    ativo: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    nome: string | null
    email: string | null
    senhaHash: string | null
    papel: $Enums.PapelUsuario | null
    ativo: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    organizacaoId: number
    nome: number
    email: number
    senhaHash: number
    papel: number
    ativo: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    organizacaoId?: true
    nome?: true
    email?: true
    senhaHash?: true
    papel?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    organizacaoId?: true
    nome?: true
    email?: true
    senhaHash?: true
    papel?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    organizacaoId?: true
    nome?: true
    email?: true
    senhaHash?: true
    papel?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    organizacaoId: string | null
    nome: string
    email: string
    senhaHash: string
    papel: $Enums.PapelUsuario
    ativo: boolean
    criadoEm: Date
    atualizadoEm: Date
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    papel?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    organizacao?: boolean | Usuario$organizacaoArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    papel?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    organizacao?: boolean | Usuario$organizacaoArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    papel?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    organizacao?: boolean | Usuario$organizacaoArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    organizacaoId?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    papel?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizacaoId" | "nome" | "email" | "senhaHash" | "papel" | "ativo" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | Usuario$organizacaoArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | Usuario$organizacaoArgs<ExtArgs>
  }
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | Usuario$organizacaoArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      organizacao: Prisma.$OrganizacaoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizacaoId: string | null
      nome: string
      email: string
      senhaHash: string
      papel: $Enums.PapelUsuario
      ativo: boolean
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizacao<T extends Usuario$organizacaoArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$organizacaoArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly organizacaoId: FieldRef<"Usuario", 'String'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly senhaHash: FieldRef<"Usuario", 'String'>
    readonly papel: FieldRef<"Usuario", 'PapelUsuario'>
    readonly ativo: FieldRef<"Usuario", 'Boolean'>
    readonly criadoEm: FieldRef<"Usuario", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.organizacao
   */
  export type Usuario$organizacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    where?: OrganizacaoWhereInput
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Empresa
   */

  export type AggregateEmpresa = {
    _count: EmpresaCountAggregateOutputType | null
    _avg: EmpresaAvgAggregateOutputType | null
    _sum: EmpresaSumAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  export type EmpresaAvgAggregateOutputType = {
    codigoUf: number | null
  }

  export type EmpresaSumAggregateOutputType = {
    codigoUf: number | null
  }

  export type EmpresaMinAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    cnpj: string | null
    razaoSocial: string | null
    uf: string | null
    codigoUf: number | null
    ambiente: $Enums.AmbienteFiscal | null
    status: $Enums.StatusEmpresa | null
    ativadaEm: Date | null
    desativadaEm: Date | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type EmpresaMaxAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    cnpj: string | null
    razaoSocial: string | null
    uf: string | null
    codigoUf: number | null
    ambiente: $Enums.AmbienteFiscal | null
    status: $Enums.StatusEmpresa | null
    ativadaEm: Date | null
    desativadaEm: Date | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type EmpresaCountAggregateOutputType = {
    id: number
    organizacaoId: number
    cnpj: number
    razaoSocial: number
    uf: number
    codigoUf: number
    ambiente: number
    status: number
    ativadaEm: number
    desativadaEm: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type EmpresaAvgAggregateInputType = {
    codigoUf?: true
  }

  export type EmpresaSumAggregateInputType = {
    codigoUf?: true
  }

  export type EmpresaMinAggregateInputType = {
    id?: true
    organizacaoId?: true
    cnpj?: true
    razaoSocial?: true
    uf?: true
    codigoUf?: true
    ambiente?: true
    status?: true
    ativadaEm?: true
    desativadaEm?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type EmpresaMaxAggregateInputType = {
    id?: true
    organizacaoId?: true
    cnpj?: true
    razaoSocial?: true
    uf?: true
    codigoUf?: true
    ambiente?: true
    status?: true
    ativadaEm?: true
    desativadaEm?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type EmpresaCountAggregateInputType = {
    id?: true
    organizacaoId?: true
    cnpj?: true
    razaoSocial?: true
    uf?: true
    codigoUf?: true
    ambiente?: true
    status?: true
    ativadaEm?: true
    desativadaEm?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type EmpresaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresa to aggregate.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Empresas
    **/
    _count?: true | EmpresaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmpresaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmpresaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmpresaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmpresaMaxAggregateInputType
  }

  export type GetEmpresaAggregateType<T extends EmpresaAggregateArgs> = {
        [P in keyof T & keyof AggregateEmpresa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmpresa[P]>
      : GetScalarType<T[P], AggregateEmpresa[P]>
  }




  export type EmpresaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaWhereInput
    orderBy?: EmpresaOrderByWithAggregationInput | EmpresaOrderByWithAggregationInput[]
    by: EmpresaScalarFieldEnum[] | EmpresaScalarFieldEnum
    having?: EmpresaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmpresaCountAggregateInputType | true
    _avg?: EmpresaAvgAggregateInputType
    _sum?: EmpresaSumAggregateInputType
    _min?: EmpresaMinAggregateInputType
    _max?: EmpresaMaxAggregateInputType
  }

  export type EmpresaGroupByOutputType = {
    id: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente: $Enums.AmbienteFiscal
    status: $Enums.StatusEmpresa
    ativadaEm: Date
    desativadaEm: Date | null
    criadoEm: Date
    atualizadoEm: Date
    _count: EmpresaCountAggregateOutputType | null
    _avg: EmpresaAvgAggregateOutputType | null
    _sum: EmpresaSumAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  type GetEmpresaGroupByPayload<T extends EmpresaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmpresaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmpresaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
            : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
        }
      >
    >


  export type EmpresaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    cnpj?: boolean
    razaoSocial?: boolean
    uf?: boolean
    codigoUf?: boolean
    ambiente?: boolean
    status?: boolean
    ativadaEm?: boolean
    desativadaEm?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    certificado?: boolean | Empresa$certificadoArgs<ExtArgs>
    documentosFiscais?: boolean | Empresa$documentosFiscaisArgs<ExtArgs>
    manifestacoes?: boolean | Empresa$manifestacoesArgs<ExtArgs>
    exportacoesTxt?: boolean | Empresa$exportacoesTxtArgs<ExtArgs>
    itensFatura?: boolean | Empresa$itensFaturaArgs<ExtArgs>
    nsuControle?: boolean | Empresa$nsuControleArgs<ExtArgs>
    regrasFiscaisOverride?: boolean | Empresa$regrasFiscaisOverrideArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    cnpj?: boolean
    razaoSocial?: boolean
    uf?: boolean
    codigoUf?: boolean
    ambiente?: boolean
    status?: boolean
    ativadaEm?: boolean
    desativadaEm?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    cnpj?: boolean
    razaoSocial?: boolean
    uf?: boolean
    codigoUf?: boolean
    ambiente?: boolean
    status?: boolean
    ativadaEm?: boolean
    desativadaEm?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectScalar = {
    id?: boolean
    organizacaoId?: boolean
    cnpj?: boolean
    razaoSocial?: boolean
    uf?: boolean
    codigoUf?: boolean
    ambiente?: boolean
    status?: boolean
    ativadaEm?: boolean
    desativadaEm?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type EmpresaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizacaoId" | "cnpj" | "razaoSocial" | "uf" | "codigoUf" | "ambiente" | "status" | "ativadaEm" | "desativadaEm" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["empresa"]>
  export type EmpresaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    certificado?: boolean | Empresa$certificadoArgs<ExtArgs>
    documentosFiscais?: boolean | Empresa$documentosFiscaisArgs<ExtArgs>
    manifestacoes?: boolean | Empresa$manifestacoesArgs<ExtArgs>
    exportacoesTxt?: boolean | Empresa$exportacoesTxtArgs<ExtArgs>
    itensFatura?: boolean | Empresa$itensFaturaArgs<ExtArgs>
    nsuControle?: boolean | Empresa$nsuControleArgs<ExtArgs>
    regrasFiscaisOverride?: boolean | Empresa$regrasFiscaisOverrideArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmpresaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
  }
  export type EmpresaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
  }

  export type $EmpresaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Empresa"
    objects: {
      organizacao: Prisma.$OrganizacaoPayload<ExtArgs>
      certificado: Prisma.$CertificadoPayload<ExtArgs> | null
      documentosFiscais: Prisma.$DocumentoFiscalPayload<ExtArgs>[]
      manifestacoes: Prisma.$ManifestacaoEventoPayload<ExtArgs>[]
      exportacoesTxt: Prisma.$ExportacaoTxtPayload<ExtArgs>[]
      itensFatura: Prisma.$ItemFaturaPayload<ExtArgs>[]
      nsuControle: Prisma.$NsuControlePayload<ExtArgs> | null
      regrasFiscaisOverride: Prisma.$RegraFiscalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizacaoId: string
      cnpj: string
      razaoSocial: string
      uf: string
      codigoUf: number
      ambiente: $Enums.AmbienteFiscal
      status: $Enums.StatusEmpresa
      ativadaEm: Date
      desativadaEm: Date | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["empresa"]>
    composites: {}
  }

  type EmpresaGetPayload<S extends boolean | null | undefined | EmpresaDefaultArgs> = $Result.GetResult<Prisma.$EmpresaPayload, S>

  type EmpresaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmpresaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmpresaCountAggregateInputType | true
    }

  export interface EmpresaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Empresa'], meta: { name: 'Empresa' } }
    /**
     * Find zero or one Empresa that matches the filter.
     * @param {EmpresaFindUniqueArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmpresaFindUniqueArgs>(args: SelectSubset<T, EmpresaFindUniqueArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Empresa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmpresaFindUniqueOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmpresaFindUniqueOrThrowArgs>(args: SelectSubset<T, EmpresaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmpresaFindFirstArgs>(args?: SelectSubset<T, EmpresaFindFirstArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmpresaFindFirstOrThrowArgs>(args?: SelectSubset<T, EmpresaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Empresas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Empresas
     * const empresas = await prisma.empresa.findMany()
     * 
     * // Get first 10 Empresas
     * const empresas = await prisma.empresa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const empresaWithIdOnly = await prisma.empresa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmpresaFindManyArgs>(args?: SelectSubset<T, EmpresaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Empresa.
     * @param {EmpresaCreateArgs} args - Arguments to create a Empresa.
     * @example
     * // Create one Empresa
     * const Empresa = await prisma.empresa.create({
     *   data: {
     *     // ... data to create a Empresa
     *   }
     * })
     * 
     */
    create<T extends EmpresaCreateArgs>(args: SelectSubset<T, EmpresaCreateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Empresas.
     * @param {EmpresaCreateManyArgs} args - Arguments to create many Empresas.
     * @example
     * // Create many Empresas
     * const empresa = await prisma.empresa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmpresaCreateManyArgs>(args?: SelectSubset<T, EmpresaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Empresas and returns the data saved in the database.
     * @param {EmpresaCreateManyAndReturnArgs} args - Arguments to create many Empresas.
     * @example
     * // Create many Empresas
     * const empresa = await prisma.empresa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Empresas and only return the `id`
     * const empresaWithIdOnly = await prisma.empresa.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmpresaCreateManyAndReturnArgs>(args?: SelectSubset<T, EmpresaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Empresa.
     * @param {EmpresaDeleteArgs} args - Arguments to delete one Empresa.
     * @example
     * // Delete one Empresa
     * const Empresa = await prisma.empresa.delete({
     *   where: {
     *     // ... filter to delete one Empresa
     *   }
     * })
     * 
     */
    delete<T extends EmpresaDeleteArgs>(args: SelectSubset<T, EmpresaDeleteArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Empresa.
     * @param {EmpresaUpdateArgs} args - Arguments to update one Empresa.
     * @example
     * // Update one Empresa
     * const empresa = await prisma.empresa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmpresaUpdateArgs>(args: SelectSubset<T, EmpresaUpdateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Empresas.
     * @param {EmpresaDeleteManyArgs} args - Arguments to filter Empresas to delete.
     * @example
     * // Delete a few Empresas
     * const { count } = await prisma.empresa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmpresaDeleteManyArgs>(args?: SelectSubset<T, EmpresaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmpresaUpdateManyArgs>(args: SelectSubset<T, EmpresaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas and returns the data updated in the database.
     * @param {EmpresaUpdateManyAndReturnArgs} args - Arguments to update many Empresas.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Empresas and only return the `id`
     * const empresaWithIdOnly = await prisma.empresa.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmpresaUpdateManyAndReturnArgs>(args: SelectSubset<T, EmpresaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Empresa.
     * @param {EmpresaUpsertArgs} args - Arguments to update or create a Empresa.
     * @example
     * // Update or create a Empresa
     * const empresa = await prisma.empresa.upsert({
     *   create: {
     *     // ... data to create a Empresa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Empresa we want to update
     *   }
     * })
     */
    upsert<T extends EmpresaUpsertArgs>(args: SelectSubset<T, EmpresaUpsertArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaCountArgs} args - Arguments to filter Empresas to count.
     * @example
     * // Count the number of Empresas
     * const count = await prisma.empresa.count({
     *   where: {
     *     // ... the filter for the Empresas we want to count
     *   }
     * })
    **/
    count<T extends EmpresaCountArgs>(
      args?: Subset<T, EmpresaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmpresaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmpresaAggregateArgs>(args: Subset<T, EmpresaAggregateArgs>): Prisma.PrismaPromise<GetEmpresaAggregateType<T>>

    /**
     * Group by Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmpresaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmpresaGroupByArgs['orderBy'] }
        : { orderBy?: EmpresaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmpresaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Empresa model
   */
  readonly fields: EmpresaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Empresa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmpresaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizacao<T extends OrganizacaoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizacaoDefaultArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    certificado<T extends Empresa$certificadoArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$certificadoArgs<ExtArgs>>): Prisma__CertificadoClient<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    documentosFiscais<T extends Empresa$documentosFiscaisArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$documentosFiscaisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    manifestacoes<T extends Empresa$manifestacoesArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$manifestacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exportacoesTxt<T extends Empresa$exportacoesTxtArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$exportacoesTxtArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    itensFatura<T extends Empresa$itensFaturaArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$itensFaturaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nsuControle<T extends Empresa$nsuControleArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$nsuControleArgs<ExtArgs>>): Prisma__NsuControleClient<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    regrasFiscaisOverride<T extends Empresa$regrasFiscaisOverrideArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$regrasFiscaisOverrideArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Empresa model
   */
  interface EmpresaFieldRefs {
    readonly id: FieldRef<"Empresa", 'String'>
    readonly organizacaoId: FieldRef<"Empresa", 'String'>
    readonly cnpj: FieldRef<"Empresa", 'String'>
    readonly razaoSocial: FieldRef<"Empresa", 'String'>
    readonly uf: FieldRef<"Empresa", 'String'>
    readonly codigoUf: FieldRef<"Empresa", 'Int'>
    readonly ambiente: FieldRef<"Empresa", 'AmbienteFiscal'>
    readonly status: FieldRef<"Empresa", 'StatusEmpresa'>
    readonly ativadaEm: FieldRef<"Empresa", 'DateTime'>
    readonly desativadaEm: FieldRef<"Empresa", 'DateTime'>
    readonly criadoEm: FieldRef<"Empresa", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Empresa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Empresa findUnique
   */
  export type EmpresaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findUniqueOrThrow
   */
  export type EmpresaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findFirst
   */
  export type EmpresaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findFirstOrThrow
   */
  export type EmpresaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findMany
   */
  export type EmpresaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresas to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa create
   */
  export type EmpresaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to create a Empresa.
     */
    data: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
  }

  /**
   * Empresa createMany
   */
  export type EmpresaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Empresa createManyAndReturn
   */
  export type EmpresaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Empresa update
   */
  export type EmpresaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to update a Empresa.
     */
    data: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
    /**
     * Choose, which Empresa to update.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa updateMany
   */
  export type EmpresaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to update.
     */
    limit?: number
  }

  /**
   * Empresa updateManyAndReturn
   */
  export type EmpresaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Empresa upsert
   */
  export type EmpresaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The filter to search for the Empresa to update in case it exists.
     */
    where: EmpresaWhereUniqueInput
    /**
     * In case the Empresa found by the `where` argument doesn't exist, create a new Empresa with this data.
     */
    create: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
    /**
     * In case the Empresa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
  }

  /**
   * Empresa delete
   */
  export type EmpresaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter which Empresa to delete.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa deleteMany
   */
  export type EmpresaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresas to delete
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to delete.
     */
    limit?: number
  }

  /**
   * Empresa.certificado
   */
  export type Empresa$certificadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    where?: CertificadoWhereInput
  }

  /**
   * Empresa.documentosFiscais
   */
  export type Empresa$documentosFiscaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    where?: DocumentoFiscalWhereInput
    orderBy?: DocumentoFiscalOrderByWithRelationInput | DocumentoFiscalOrderByWithRelationInput[]
    cursor?: DocumentoFiscalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentoFiscalScalarFieldEnum | DocumentoFiscalScalarFieldEnum[]
  }

  /**
   * Empresa.manifestacoes
   */
  export type Empresa$manifestacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    where?: ManifestacaoEventoWhereInput
    orderBy?: ManifestacaoEventoOrderByWithRelationInput | ManifestacaoEventoOrderByWithRelationInput[]
    cursor?: ManifestacaoEventoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ManifestacaoEventoScalarFieldEnum | ManifestacaoEventoScalarFieldEnum[]
  }

  /**
   * Empresa.exportacoesTxt
   */
  export type Empresa$exportacoesTxtArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    where?: ExportacaoTxtWhereInput
    orderBy?: ExportacaoTxtOrderByWithRelationInput | ExportacaoTxtOrderByWithRelationInput[]
    cursor?: ExportacaoTxtWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExportacaoTxtScalarFieldEnum | ExportacaoTxtScalarFieldEnum[]
  }

  /**
   * Empresa.itensFatura
   */
  export type Empresa$itensFaturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    where?: ItemFaturaWhereInput
    orderBy?: ItemFaturaOrderByWithRelationInput | ItemFaturaOrderByWithRelationInput[]
    cursor?: ItemFaturaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemFaturaScalarFieldEnum | ItemFaturaScalarFieldEnum[]
  }

  /**
   * Empresa.nsuControle
   */
  export type Empresa$nsuControleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    where?: NsuControleWhereInput
  }

  /**
   * Empresa.regrasFiscaisOverride
   */
  export type Empresa$regrasFiscaisOverrideArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    where?: RegraFiscalWhereInput
    orderBy?: RegraFiscalOrderByWithRelationInput | RegraFiscalOrderByWithRelationInput[]
    cursor?: RegraFiscalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegraFiscalScalarFieldEnum | RegraFiscalScalarFieldEnum[]
  }

  /**
   * Empresa without action
   */
  export type EmpresaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
  }


  /**
   * Model NsuControle
   */

  export type AggregateNsuControle = {
    _count: NsuControleCountAggregateOutputType | null
    _avg: NsuControleAvgAggregateOutputType | null
    _sum: NsuControleSumAggregateOutputType | null
    _min: NsuControleMinAggregateOutputType | null
    _max: NsuControleMaxAggregateOutputType | null
  }

  export type NsuControleAvgAggregateOutputType = {
    ultimoNsu: number | null
  }

  export type NsuControleSumAggregateOutputType = {
    ultimoNsu: bigint | null
  }

  export type NsuControleMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    ultimoNsu: bigint | null
    atualizadoEm: Date | null
  }

  export type NsuControleMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    ultimoNsu: bigint | null
    atualizadoEm: Date | null
  }

  export type NsuControleCountAggregateOutputType = {
    id: number
    empresaId: number
    ultimoNsu: number
    atualizadoEm: number
    _all: number
  }


  export type NsuControleAvgAggregateInputType = {
    ultimoNsu?: true
  }

  export type NsuControleSumAggregateInputType = {
    ultimoNsu?: true
  }

  export type NsuControleMinAggregateInputType = {
    id?: true
    empresaId?: true
    ultimoNsu?: true
    atualizadoEm?: true
  }

  export type NsuControleMaxAggregateInputType = {
    id?: true
    empresaId?: true
    ultimoNsu?: true
    atualizadoEm?: true
  }

  export type NsuControleCountAggregateInputType = {
    id?: true
    empresaId?: true
    ultimoNsu?: true
    atualizadoEm?: true
    _all?: true
  }

  export type NsuControleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NsuControle to aggregate.
     */
    where?: NsuControleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NsuControles to fetch.
     */
    orderBy?: NsuControleOrderByWithRelationInput | NsuControleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NsuControleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NsuControles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NsuControles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NsuControles
    **/
    _count?: true | NsuControleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NsuControleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NsuControleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NsuControleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NsuControleMaxAggregateInputType
  }

  export type GetNsuControleAggregateType<T extends NsuControleAggregateArgs> = {
        [P in keyof T & keyof AggregateNsuControle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNsuControle[P]>
      : GetScalarType<T[P], AggregateNsuControle[P]>
  }




  export type NsuControleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NsuControleWhereInput
    orderBy?: NsuControleOrderByWithAggregationInput | NsuControleOrderByWithAggregationInput[]
    by: NsuControleScalarFieldEnum[] | NsuControleScalarFieldEnum
    having?: NsuControleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NsuControleCountAggregateInputType | true
    _avg?: NsuControleAvgAggregateInputType
    _sum?: NsuControleSumAggregateInputType
    _min?: NsuControleMinAggregateInputType
    _max?: NsuControleMaxAggregateInputType
  }

  export type NsuControleGroupByOutputType = {
    id: string
    empresaId: string
    ultimoNsu: bigint
    atualizadoEm: Date
    _count: NsuControleCountAggregateOutputType | null
    _avg: NsuControleAvgAggregateOutputType | null
    _sum: NsuControleSumAggregateOutputType | null
    _min: NsuControleMinAggregateOutputType | null
    _max: NsuControleMaxAggregateOutputType | null
  }

  type GetNsuControleGroupByPayload<T extends NsuControleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NsuControleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NsuControleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NsuControleGroupByOutputType[P]>
            : GetScalarType<T[P], NsuControleGroupByOutputType[P]>
        }
      >
    >


  export type NsuControleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    ultimoNsu?: boolean
    atualizadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nsuControle"]>

  export type NsuControleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    ultimoNsu?: boolean
    atualizadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nsuControle"]>

  export type NsuControleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    ultimoNsu?: boolean
    atualizadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nsuControle"]>

  export type NsuControleSelectScalar = {
    id?: boolean
    empresaId?: boolean
    ultimoNsu?: boolean
    atualizadoEm?: boolean
  }

  export type NsuControleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "ultimoNsu" | "atualizadoEm", ExtArgs["result"]["nsuControle"]>
  export type NsuControleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type NsuControleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type NsuControleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $NsuControlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NsuControle"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      ultimoNsu: bigint
      atualizadoEm: Date
    }, ExtArgs["result"]["nsuControle"]>
    composites: {}
  }

  type NsuControleGetPayload<S extends boolean | null | undefined | NsuControleDefaultArgs> = $Result.GetResult<Prisma.$NsuControlePayload, S>

  type NsuControleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NsuControleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NsuControleCountAggregateInputType | true
    }

  export interface NsuControleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NsuControle'], meta: { name: 'NsuControle' } }
    /**
     * Find zero or one NsuControle that matches the filter.
     * @param {NsuControleFindUniqueArgs} args - Arguments to find a NsuControle
     * @example
     * // Get one NsuControle
     * const nsuControle = await prisma.nsuControle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NsuControleFindUniqueArgs>(args: SelectSubset<T, NsuControleFindUniqueArgs<ExtArgs>>): Prisma__NsuControleClient<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NsuControle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NsuControleFindUniqueOrThrowArgs} args - Arguments to find a NsuControle
     * @example
     * // Get one NsuControle
     * const nsuControle = await prisma.nsuControle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NsuControleFindUniqueOrThrowArgs>(args: SelectSubset<T, NsuControleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NsuControleClient<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NsuControle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NsuControleFindFirstArgs} args - Arguments to find a NsuControle
     * @example
     * // Get one NsuControle
     * const nsuControle = await prisma.nsuControle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NsuControleFindFirstArgs>(args?: SelectSubset<T, NsuControleFindFirstArgs<ExtArgs>>): Prisma__NsuControleClient<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NsuControle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NsuControleFindFirstOrThrowArgs} args - Arguments to find a NsuControle
     * @example
     * // Get one NsuControle
     * const nsuControle = await prisma.nsuControle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NsuControleFindFirstOrThrowArgs>(args?: SelectSubset<T, NsuControleFindFirstOrThrowArgs<ExtArgs>>): Prisma__NsuControleClient<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NsuControles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NsuControleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NsuControles
     * const nsuControles = await prisma.nsuControle.findMany()
     * 
     * // Get first 10 NsuControles
     * const nsuControles = await prisma.nsuControle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nsuControleWithIdOnly = await prisma.nsuControle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NsuControleFindManyArgs>(args?: SelectSubset<T, NsuControleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NsuControle.
     * @param {NsuControleCreateArgs} args - Arguments to create a NsuControle.
     * @example
     * // Create one NsuControle
     * const NsuControle = await prisma.nsuControle.create({
     *   data: {
     *     // ... data to create a NsuControle
     *   }
     * })
     * 
     */
    create<T extends NsuControleCreateArgs>(args: SelectSubset<T, NsuControleCreateArgs<ExtArgs>>): Prisma__NsuControleClient<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NsuControles.
     * @param {NsuControleCreateManyArgs} args - Arguments to create many NsuControles.
     * @example
     * // Create many NsuControles
     * const nsuControle = await prisma.nsuControle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NsuControleCreateManyArgs>(args?: SelectSubset<T, NsuControleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NsuControles and returns the data saved in the database.
     * @param {NsuControleCreateManyAndReturnArgs} args - Arguments to create many NsuControles.
     * @example
     * // Create many NsuControles
     * const nsuControle = await prisma.nsuControle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NsuControles and only return the `id`
     * const nsuControleWithIdOnly = await prisma.nsuControle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NsuControleCreateManyAndReturnArgs>(args?: SelectSubset<T, NsuControleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NsuControle.
     * @param {NsuControleDeleteArgs} args - Arguments to delete one NsuControle.
     * @example
     * // Delete one NsuControle
     * const NsuControle = await prisma.nsuControle.delete({
     *   where: {
     *     // ... filter to delete one NsuControle
     *   }
     * })
     * 
     */
    delete<T extends NsuControleDeleteArgs>(args: SelectSubset<T, NsuControleDeleteArgs<ExtArgs>>): Prisma__NsuControleClient<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NsuControle.
     * @param {NsuControleUpdateArgs} args - Arguments to update one NsuControle.
     * @example
     * // Update one NsuControle
     * const nsuControle = await prisma.nsuControle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NsuControleUpdateArgs>(args: SelectSubset<T, NsuControleUpdateArgs<ExtArgs>>): Prisma__NsuControleClient<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NsuControles.
     * @param {NsuControleDeleteManyArgs} args - Arguments to filter NsuControles to delete.
     * @example
     * // Delete a few NsuControles
     * const { count } = await prisma.nsuControle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NsuControleDeleteManyArgs>(args?: SelectSubset<T, NsuControleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NsuControles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NsuControleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NsuControles
     * const nsuControle = await prisma.nsuControle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NsuControleUpdateManyArgs>(args: SelectSubset<T, NsuControleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NsuControles and returns the data updated in the database.
     * @param {NsuControleUpdateManyAndReturnArgs} args - Arguments to update many NsuControles.
     * @example
     * // Update many NsuControles
     * const nsuControle = await prisma.nsuControle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NsuControles and only return the `id`
     * const nsuControleWithIdOnly = await prisma.nsuControle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NsuControleUpdateManyAndReturnArgs>(args: SelectSubset<T, NsuControleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NsuControle.
     * @param {NsuControleUpsertArgs} args - Arguments to update or create a NsuControle.
     * @example
     * // Update or create a NsuControle
     * const nsuControle = await prisma.nsuControle.upsert({
     *   create: {
     *     // ... data to create a NsuControle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NsuControle we want to update
     *   }
     * })
     */
    upsert<T extends NsuControleUpsertArgs>(args: SelectSubset<T, NsuControleUpsertArgs<ExtArgs>>): Prisma__NsuControleClient<$Result.GetResult<Prisma.$NsuControlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NsuControles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NsuControleCountArgs} args - Arguments to filter NsuControles to count.
     * @example
     * // Count the number of NsuControles
     * const count = await prisma.nsuControle.count({
     *   where: {
     *     // ... the filter for the NsuControles we want to count
     *   }
     * })
    **/
    count<T extends NsuControleCountArgs>(
      args?: Subset<T, NsuControleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NsuControleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NsuControle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NsuControleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NsuControleAggregateArgs>(args: Subset<T, NsuControleAggregateArgs>): Prisma.PrismaPromise<GetNsuControleAggregateType<T>>

    /**
     * Group by NsuControle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NsuControleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NsuControleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NsuControleGroupByArgs['orderBy'] }
        : { orderBy?: NsuControleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NsuControleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNsuControleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NsuControle model
   */
  readonly fields: NsuControleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NsuControle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NsuControleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NsuControle model
   */
  interface NsuControleFieldRefs {
    readonly id: FieldRef<"NsuControle", 'String'>
    readonly empresaId: FieldRef<"NsuControle", 'String'>
    readonly ultimoNsu: FieldRef<"NsuControle", 'BigInt'>
    readonly atualizadoEm: FieldRef<"NsuControle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NsuControle findUnique
   */
  export type NsuControleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    /**
     * Filter, which NsuControle to fetch.
     */
    where: NsuControleWhereUniqueInput
  }

  /**
   * NsuControle findUniqueOrThrow
   */
  export type NsuControleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    /**
     * Filter, which NsuControle to fetch.
     */
    where: NsuControleWhereUniqueInput
  }

  /**
   * NsuControle findFirst
   */
  export type NsuControleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    /**
     * Filter, which NsuControle to fetch.
     */
    where?: NsuControleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NsuControles to fetch.
     */
    orderBy?: NsuControleOrderByWithRelationInput | NsuControleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NsuControles.
     */
    cursor?: NsuControleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NsuControles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NsuControles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NsuControles.
     */
    distinct?: NsuControleScalarFieldEnum | NsuControleScalarFieldEnum[]
  }

  /**
   * NsuControle findFirstOrThrow
   */
  export type NsuControleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    /**
     * Filter, which NsuControle to fetch.
     */
    where?: NsuControleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NsuControles to fetch.
     */
    orderBy?: NsuControleOrderByWithRelationInput | NsuControleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NsuControles.
     */
    cursor?: NsuControleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NsuControles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NsuControles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NsuControles.
     */
    distinct?: NsuControleScalarFieldEnum | NsuControleScalarFieldEnum[]
  }

  /**
   * NsuControle findMany
   */
  export type NsuControleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    /**
     * Filter, which NsuControles to fetch.
     */
    where?: NsuControleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NsuControles to fetch.
     */
    orderBy?: NsuControleOrderByWithRelationInput | NsuControleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NsuControles.
     */
    cursor?: NsuControleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NsuControles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NsuControles.
     */
    skip?: number
    distinct?: NsuControleScalarFieldEnum | NsuControleScalarFieldEnum[]
  }

  /**
   * NsuControle create
   */
  export type NsuControleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    /**
     * The data needed to create a NsuControle.
     */
    data: XOR<NsuControleCreateInput, NsuControleUncheckedCreateInput>
  }

  /**
   * NsuControle createMany
   */
  export type NsuControleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NsuControles.
     */
    data: NsuControleCreateManyInput | NsuControleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NsuControle createManyAndReturn
   */
  export type NsuControleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * The data used to create many NsuControles.
     */
    data: NsuControleCreateManyInput | NsuControleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NsuControle update
   */
  export type NsuControleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    /**
     * The data needed to update a NsuControle.
     */
    data: XOR<NsuControleUpdateInput, NsuControleUncheckedUpdateInput>
    /**
     * Choose, which NsuControle to update.
     */
    where: NsuControleWhereUniqueInput
  }

  /**
   * NsuControle updateMany
   */
  export type NsuControleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NsuControles.
     */
    data: XOR<NsuControleUpdateManyMutationInput, NsuControleUncheckedUpdateManyInput>
    /**
     * Filter which NsuControles to update
     */
    where?: NsuControleWhereInput
    /**
     * Limit how many NsuControles to update.
     */
    limit?: number
  }

  /**
   * NsuControle updateManyAndReturn
   */
  export type NsuControleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * The data used to update NsuControles.
     */
    data: XOR<NsuControleUpdateManyMutationInput, NsuControleUncheckedUpdateManyInput>
    /**
     * Filter which NsuControles to update
     */
    where?: NsuControleWhereInput
    /**
     * Limit how many NsuControles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NsuControle upsert
   */
  export type NsuControleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    /**
     * The filter to search for the NsuControle to update in case it exists.
     */
    where: NsuControleWhereUniqueInput
    /**
     * In case the NsuControle found by the `where` argument doesn't exist, create a new NsuControle with this data.
     */
    create: XOR<NsuControleCreateInput, NsuControleUncheckedCreateInput>
    /**
     * In case the NsuControle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NsuControleUpdateInput, NsuControleUncheckedUpdateInput>
  }

  /**
   * NsuControle delete
   */
  export type NsuControleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
    /**
     * Filter which NsuControle to delete.
     */
    where: NsuControleWhereUniqueInput
  }

  /**
   * NsuControle deleteMany
   */
  export type NsuControleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NsuControles to delete
     */
    where?: NsuControleWhereInput
    /**
     * Limit how many NsuControles to delete.
     */
    limit?: number
  }

  /**
   * NsuControle without action
   */
  export type NsuControleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NsuControle
     */
    select?: NsuControleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NsuControle
     */
    omit?: NsuControleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NsuControleInclude<ExtArgs> | null
  }


  /**
   * Model Certificado
   */

  export type AggregateCertificado = {
    _count: CertificadoCountAggregateOutputType | null
    _min: CertificadoMinAggregateOutputType | null
    _max: CertificadoMaxAggregateOutputType | null
  }

  export type CertificadoMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nomeArquivoOriginal: string | null
    objetoStorage: string | null
    senhaCriptografada: string | null
    ivCriptografia: string | null
    validoAte: Date | null
    alertaVencimentoEnviado: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CertificadoMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    nomeArquivoOriginal: string | null
    objetoStorage: string | null
    senhaCriptografada: string | null
    ivCriptografia: string | null
    validoAte: Date | null
    alertaVencimentoEnviado: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CertificadoCountAggregateOutputType = {
    id: number
    empresaId: number
    nomeArquivoOriginal: number
    objetoStorage: number
    senhaCriptografada: number
    ivCriptografia: number
    validoAte: number
    alertaVencimentoEnviado: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type CertificadoMinAggregateInputType = {
    id?: true
    empresaId?: true
    nomeArquivoOriginal?: true
    objetoStorage?: true
    senhaCriptografada?: true
    ivCriptografia?: true
    validoAte?: true
    alertaVencimentoEnviado?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CertificadoMaxAggregateInputType = {
    id?: true
    empresaId?: true
    nomeArquivoOriginal?: true
    objetoStorage?: true
    senhaCriptografada?: true
    ivCriptografia?: true
    validoAte?: true
    alertaVencimentoEnviado?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CertificadoCountAggregateInputType = {
    id?: true
    empresaId?: true
    nomeArquivoOriginal?: true
    objetoStorage?: true
    senhaCriptografada?: true
    ivCriptografia?: true
    validoAte?: true
    alertaVencimentoEnviado?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type CertificadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certificado to aggregate.
     */
    where?: CertificadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificados to fetch.
     */
    orderBy?: CertificadoOrderByWithRelationInput | CertificadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CertificadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Certificados
    **/
    _count?: true | CertificadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CertificadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CertificadoMaxAggregateInputType
  }

  export type GetCertificadoAggregateType<T extends CertificadoAggregateArgs> = {
        [P in keyof T & keyof AggregateCertificado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCertificado[P]>
      : GetScalarType<T[P], AggregateCertificado[P]>
  }




  export type CertificadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificadoWhereInput
    orderBy?: CertificadoOrderByWithAggregationInput | CertificadoOrderByWithAggregationInput[]
    by: CertificadoScalarFieldEnum[] | CertificadoScalarFieldEnum
    having?: CertificadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CertificadoCountAggregateInputType | true
    _min?: CertificadoMinAggregateInputType
    _max?: CertificadoMaxAggregateInputType
  }

  export type CertificadoGroupByOutputType = {
    id: string
    empresaId: string
    nomeArquivoOriginal: string
    objetoStorage: string
    senhaCriptografada: string
    ivCriptografia: string
    validoAte: Date
    alertaVencimentoEnviado: boolean
    criadoEm: Date
    atualizadoEm: Date
    _count: CertificadoCountAggregateOutputType | null
    _min: CertificadoMinAggregateOutputType | null
    _max: CertificadoMaxAggregateOutputType | null
  }

  type GetCertificadoGroupByPayload<T extends CertificadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CertificadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CertificadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CertificadoGroupByOutputType[P]>
            : GetScalarType<T[P], CertificadoGroupByOutputType[P]>
        }
      >
    >


  export type CertificadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nomeArquivoOriginal?: boolean
    objetoStorage?: boolean
    senhaCriptografada?: boolean
    ivCriptografia?: boolean
    validoAte?: boolean
    alertaVencimentoEnviado?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificado"]>

  export type CertificadoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nomeArquivoOriginal?: boolean
    objetoStorage?: boolean
    senhaCriptografada?: boolean
    ivCriptografia?: boolean
    validoAte?: boolean
    alertaVencimentoEnviado?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificado"]>

  export type CertificadoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    nomeArquivoOriginal?: boolean
    objetoStorage?: boolean
    senhaCriptografada?: boolean
    ivCriptografia?: boolean
    validoAte?: boolean
    alertaVencimentoEnviado?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificado"]>

  export type CertificadoSelectScalar = {
    id?: boolean
    empresaId?: boolean
    nomeArquivoOriginal?: boolean
    objetoStorage?: boolean
    senhaCriptografada?: boolean
    ivCriptografia?: boolean
    validoAte?: boolean
    alertaVencimentoEnviado?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type CertificadoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "nomeArquivoOriginal" | "objetoStorage" | "senhaCriptografada" | "ivCriptografia" | "validoAte" | "alertaVencimentoEnviado" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["certificado"]>
  export type CertificadoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type CertificadoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type CertificadoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $CertificadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Certificado"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      nomeArquivoOriginal: string
      objetoStorage: string
      senhaCriptografada: string
      ivCriptografia: string
      validoAte: Date
      alertaVencimentoEnviado: boolean
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["certificado"]>
    composites: {}
  }

  type CertificadoGetPayload<S extends boolean | null | undefined | CertificadoDefaultArgs> = $Result.GetResult<Prisma.$CertificadoPayload, S>

  type CertificadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CertificadoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CertificadoCountAggregateInputType | true
    }

  export interface CertificadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Certificado'], meta: { name: 'Certificado' } }
    /**
     * Find zero or one Certificado that matches the filter.
     * @param {CertificadoFindUniqueArgs} args - Arguments to find a Certificado
     * @example
     * // Get one Certificado
     * const certificado = await prisma.certificado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CertificadoFindUniqueArgs>(args: SelectSubset<T, CertificadoFindUniqueArgs<ExtArgs>>): Prisma__CertificadoClient<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Certificado that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CertificadoFindUniqueOrThrowArgs} args - Arguments to find a Certificado
     * @example
     * // Get one Certificado
     * const certificado = await prisma.certificado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CertificadoFindUniqueOrThrowArgs>(args: SelectSubset<T, CertificadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CertificadoClient<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Certificado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificadoFindFirstArgs} args - Arguments to find a Certificado
     * @example
     * // Get one Certificado
     * const certificado = await prisma.certificado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CertificadoFindFirstArgs>(args?: SelectSubset<T, CertificadoFindFirstArgs<ExtArgs>>): Prisma__CertificadoClient<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Certificado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificadoFindFirstOrThrowArgs} args - Arguments to find a Certificado
     * @example
     * // Get one Certificado
     * const certificado = await prisma.certificado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CertificadoFindFirstOrThrowArgs>(args?: SelectSubset<T, CertificadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CertificadoClient<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Certificados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Certificados
     * const certificados = await prisma.certificado.findMany()
     * 
     * // Get first 10 Certificados
     * const certificados = await prisma.certificado.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const certificadoWithIdOnly = await prisma.certificado.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CertificadoFindManyArgs>(args?: SelectSubset<T, CertificadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Certificado.
     * @param {CertificadoCreateArgs} args - Arguments to create a Certificado.
     * @example
     * // Create one Certificado
     * const Certificado = await prisma.certificado.create({
     *   data: {
     *     // ... data to create a Certificado
     *   }
     * })
     * 
     */
    create<T extends CertificadoCreateArgs>(args: SelectSubset<T, CertificadoCreateArgs<ExtArgs>>): Prisma__CertificadoClient<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Certificados.
     * @param {CertificadoCreateManyArgs} args - Arguments to create many Certificados.
     * @example
     * // Create many Certificados
     * const certificado = await prisma.certificado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CertificadoCreateManyArgs>(args?: SelectSubset<T, CertificadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Certificados and returns the data saved in the database.
     * @param {CertificadoCreateManyAndReturnArgs} args - Arguments to create many Certificados.
     * @example
     * // Create many Certificados
     * const certificado = await prisma.certificado.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Certificados and only return the `id`
     * const certificadoWithIdOnly = await prisma.certificado.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CertificadoCreateManyAndReturnArgs>(args?: SelectSubset<T, CertificadoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Certificado.
     * @param {CertificadoDeleteArgs} args - Arguments to delete one Certificado.
     * @example
     * // Delete one Certificado
     * const Certificado = await prisma.certificado.delete({
     *   where: {
     *     // ... filter to delete one Certificado
     *   }
     * })
     * 
     */
    delete<T extends CertificadoDeleteArgs>(args: SelectSubset<T, CertificadoDeleteArgs<ExtArgs>>): Prisma__CertificadoClient<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Certificado.
     * @param {CertificadoUpdateArgs} args - Arguments to update one Certificado.
     * @example
     * // Update one Certificado
     * const certificado = await prisma.certificado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CertificadoUpdateArgs>(args: SelectSubset<T, CertificadoUpdateArgs<ExtArgs>>): Prisma__CertificadoClient<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Certificados.
     * @param {CertificadoDeleteManyArgs} args - Arguments to filter Certificados to delete.
     * @example
     * // Delete a few Certificados
     * const { count } = await prisma.certificado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CertificadoDeleteManyArgs>(args?: SelectSubset<T, CertificadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Certificados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Certificados
     * const certificado = await prisma.certificado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CertificadoUpdateManyArgs>(args: SelectSubset<T, CertificadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Certificados and returns the data updated in the database.
     * @param {CertificadoUpdateManyAndReturnArgs} args - Arguments to update many Certificados.
     * @example
     * // Update many Certificados
     * const certificado = await prisma.certificado.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Certificados and only return the `id`
     * const certificadoWithIdOnly = await prisma.certificado.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CertificadoUpdateManyAndReturnArgs>(args: SelectSubset<T, CertificadoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Certificado.
     * @param {CertificadoUpsertArgs} args - Arguments to update or create a Certificado.
     * @example
     * // Update or create a Certificado
     * const certificado = await prisma.certificado.upsert({
     *   create: {
     *     // ... data to create a Certificado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Certificado we want to update
     *   }
     * })
     */
    upsert<T extends CertificadoUpsertArgs>(args: SelectSubset<T, CertificadoUpsertArgs<ExtArgs>>): Prisma__CertificadoClient<$Result.GetResult<Prisma.$CertificadoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Certificados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificadoCountArgs} args - Arguments to filter Certificados to count.
     * @example
     * // Count the number of Certificados
     * const count = await prisma.certificado.count({
     *   where: {
     *     // ... the filter for the Certificados we want to count
     *   }
     * })
    **/
    count<T extends CertificadoCountArgs>(
      args?: Subset<T, CertificadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CertificadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Certificado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CertificadoAggregateArgs>(args: Subset<T, CertificadoAggregateArgs>): Prisma.PrismaPromise<GetCertificadoAggregateType<T>>

    /**
     * Group by Certificado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificadoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CertificadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CertificadoGroupByArgs['orderBy'] }
        : { orderBy?: CertificadoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CertificadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Certificado model
   */
  readonly fields: CertificadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Certificado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CertificadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Certificado model
   */
  interface CertificadoFieldRefs {
    readonly id: FieldRef<"Certificado", 'String'>
    readonly empresaId: FieldRef<"Certificado", 'String'>
    readonly nomeArquivoOriginal: FieldRef<"Certificado", 'String'>
    readonly objetoStorage: FieldRef<"Certificado", 'String'>
    readonly senhaCriptografada: FieldRef<"Certificado", 'String'>
    readonly ivCriptografia: FieldRef<"Certificado", 'String'>
    readonly validoAte: FieldRef<"Certificado", 'DateTime'>
    readonly alertaVencimentoEnviado: FieldRef<"Certificado", 'Boolean'>
    readonly criadoEm: FieldRef<"Certificado", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Certificado", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Certificado findUnique
   */
  export type CertificadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    /**
     * Filter, which Certificado to fetch.
     */
    where: CertificadoWhereUniqueInput
  }

  /**
   * Certificado findUniqueOrThrow
   */
  export type CertificadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    /**
     * Filter, which Certificado to fetch.
     */
    where: CertificadoWhereUniqueInput
  }

  /**
   * Certificado findFirst
   */
  export type CertificadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    /**
     * Filter, which Certificado to fetch.
     */
    where?: CertificadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificados to fetch.
     */
    orderBy?: CertificadoOrderByWithRelationInput | CertificadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certificados.
     */
    cursor?: CertificadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certificados.
     */
    distinct?: CertificadoScalarFieldEnum | CertificadoScalarFieldEnum[]
  }

  /**
   * Certificado findFirstOrThrow
   */
  export type CertificadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    /**
     * Filter, which Certificado to fetch.
     */
    where?: CertificadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificados to fetch.
     */
    orderBy?: CertificadoOrderByWithRelationInput | CertificadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certificados.
     */
    cursor?: CertificadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certificados.
     */
    distinct?: CertificadoScalarFieldEnum | CertificadoScalarFieldEnum[]
  }

  /**
   * Certificado findMany
   */
  export type CertificadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    /**
     * Filter, which Certificados to fetch.
     */
    where?: CertificadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificados to fetch.
     */
    orderBy?: CertificadoOrderByWithRelationInput | CertificadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Certificados.
     */
    cursor?: CertificadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificados.
     */
    skip?: number
    distinct?: CertificadoScalarFieldEnum | CertificadoScalarFieldEnum[]
  }

  /**
   * Certificado create
   */
  export type CertificadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    /**
     * The data needed to create a Certificado.
     */
    data: XOR<CertificadoCreateInput, CertificadoUncheckedCreateInput>
  }

  /**
   * Certificado createMany
   */
  export type CertificadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Certificados.
     */
    data: CertificadoCreateManyInput | CertificadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Certificado createManyAndReturn
   */
  export type CertificadoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * The data used to create many Certificados.
     */
    data: CertificadoCreateManyInput | CertificadoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Certificado update
   */
  export type CertificadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    /**
     * The data needed to update a Certificado.
     */
    data: XOR<CertificadoUpdateInput, CertificadoUncheckedUpdateInput>
    /**
     * Choose, which Certificado to update.
     */
    where: CertificadoWhereUniqueInput
  }

  /**
   * Certificado updateMany
   */
  export type CertificadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Certificados.
     */
    data: XOR<CertificadoUpdateManyMutationInput, CertificadoUncheckedUpdateManyInput>
    /**
     * Filter which Certificados to update
     */
    where?: CertificadoWhereInput
    /**
     * Limit how many Certificados to update.
     */
    limit?: number
  }

  /**
   * Certificado updateManyAndReturn
   */
  export type CertificadoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * The data used to update Certificados.
     */
    data: XOR<CertificadoUpdateManyMutationInput, CertificadoUncheckedUpdateManyInput>
    /**
     * Filter which Certificados to update
     */
    where?: CertificadoWhereInput
    /**
     * Limit how many Certificados to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Certificado upsert
   */
  export type CertificadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    /**
     * The filter to search for the Certificado to update in case it exists.
     */
    where: CertificadoWhereUniqueInput
    /**
     * In case the Certificado found by the `where` argument doesn't exist, create a new Certificado with this data.
     */
    create: XOR<CertificadoCreateInput, CertificadoUncheckedCreateInput>
    /**
     * In case the Certificado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CertificadoUpdateInput, CertificadoUncheckedUpdateInput>
  }

  /**
   * Certificado delete
   */
  export type CertificadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
    /**
     * Filter which Certificado to delete.
     */
    where: CertificadoWhereUniqueInput
  }

  /**
   * Certificado deleteMany
   */
  export type CertificadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certificados to delete
     */
    where?: CertificadoWhereInput
    /**
     * Limit how many Certificados to delete.
     */
    limit?: number
  }

  /**
   * Certificado without action
   */
  export type CertificadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificado
     */
    select?: CertificadoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certificado
     */
    omit?: CertificadoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificadoInclude<ExtArgs> | null
  }


  /**
   * Model DocumentoFiscal
   */

  export type AggregateDocumentoFiscal = {
    _count: DocumentoFiscalCountAggregateOutputType | null
    _avg: DocumentoFiscalAvgAggregateOutputType | null
    _sum: DocumentoFiscalSumAggregateOutputType | null
    _min: DocumentoFiscalMinAggregateOutputType | null
    _max: DocumentoFiscalMaxAggregateOutputType | null
  }

  export type DocumentoFiscalAvgAggregateOutputType = {
    nsu: number | null
  }

  export type DocumentoFiscalSumAggregateOutputType = {
    nsu: bigint | null
  }

  export type DocumentoFiscalMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    chaveAcesso: string | null
    tipo: $Enums.TipoDocumentoFiscal | null
    direcao: $Enums.DirecaoDocumento | null
    nsu: bigint | null
    status: $Enums.StatusDocumentoFiscal | null
    cfop: string | null
    objetoStorageXml: string | null
    emitidoEm: Date | null
    recebidoEm: Date | null
    atualizadoEm: Date | null
  }

  export type DocumentoFiscalMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    chaveAcesso: string | null
    tipo: $Enums.TipoDocumentoFiscal | null
    direcao: $Enums.DirecaoDocumento | null
    nsu: bigint | null
    status: $Enums.StatusDocumentoFiscal | null
    cfop: string | null
    objetoStorageXml: string | null
    emitidoEm: Date | null
    recebidoEm: Date | null
    atualizadoEm: Date | null
  }

  export type DocumentoFiscalCountAggregateOutputType = {
    id: number
    empresaId: number
    chaveAcesso: number
    tipo: number
    direcao: number
    nsu: number
    status: number
    cfop: number
    objetoStorageXml: number
    emitidoEm: number
    recebidoEm: number
    atualizadoEm: number
    _all: number
  }


  export type DocumentoFiscalAvgAggregateInputType = {
    nsu?: true
  }

  export type DocumentoFiscalSumAggregateInputType = {
    nsu?: true
  }

  export type DocumentoFiscalMinAggregateInputType = {
    id?: true
    empresaId?: true
    chaveAcesso?: true
    tipo?: true
    direcao?: true
    nsu?: true
    status?: true
    cfop?: true
    objetoStorageXml?: true
    emitidoEm?: true
    recebidoEm?: true
    atualizadoEm?: true
  }

  export type DocumentoFiscalMaxAggregateInputType = {
    id?: true
    empresaId?: true
    chaveAcesso?: true
    tipo?: true
    direcao?: true
    nsu?: true
    status?: true
    cfop?: true
    objetoStorageXml?: true
    emitidoEm?: true
    recebidoEm?: true
    atualizadoEm?: true
  }

  export type DocumentoFiscalCountAggregateInputType = {
    id?: true
    empresaId?: true
    chaveAcesso?: true
    tipo?: true
    direcao?: true
    nsu?: true
    status?: true
    cfop?: true
    objetoStorageXml?: true
    emitidoEm?: true
    recebidoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type DocumentoFiscalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentoFiscal to aggregate.
     */
    where?: DocumentoFiscalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentoFiscals to fetch.
     */
    orderBy?: DocumentoFiscalOrderByWithRelationInput | DocumentoFiscalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentoFiscalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentoFiscals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentoFiscals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentoFiscals
    **/
    _count?: true | DocumentoFiscalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentoFiscalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentoFiscalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentoFiscalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentoFiscalMaxAggregateInputType
  }

  export type GetDocumentoFiscalAggregateType<T extends DocumentoFiscalAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentoFiscal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentoFiscal[P]>
      : GetScalarType<T[P], AggregateDocumentoFiscal[P]>
  }




  export type DocumentoFiscalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentoFiscalWhereInput
    orderBy?: DocumentoFiscalOrderByWithAggregationInput | DocumentoFiscalOrderByWithAggregationInput[]
    by: DocumentoFiscalScalarFieldEnum[] | DocumentoFiscalScalarFieldEnum
    having?: DocumentoFiscalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentoFiscalCountAggregateInputType | true
    _avg?: DocumentoFiscalAvgAggregateInputType
    _sum?: DocumentoFiscalSumAggregateInputType
    _min?: DocumentoFiscalMinAggregateInputType
    _max?: DocumentoFiscalMaxAggregateInputType
  }

  export type DocumentoFiscalGroupByOutputType = {
    id: string
    empresaId: string
    chaveAcesso: string
    tipo: $Enums.TipoDocumentoFiscal
    direcao: $Enums.DirecaoDocumento
    nsu: bigint | null
    status: $Enums.StatusDocumentoFiscal
    cfop: string | null
    objetoStorageXml: string
    emitidoEm: Date | null
    recebidoEm: Date
    atualizadoEm: Date
    _count: DocumentoFiscalCountAggregateOutputType | null
    _avg: DocumentoFiscalAvgAggregateOutputType | null
    _sum: DocumentoFiscalSumAggregateOutputType | null
    _min: DocumentoFiscalMinAggregateOutputType | null
    _max: DocumentoFiscalMaxAggregateOutputType | null
  }

  type GetDocumentoFiscalGroupByPayload<T extends DocumentoFiscalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentoFiscalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentoFiscalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentoFiscalGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentoFiscalGroupByOutputType[P]>
        }
      >
    >


  export type DocumentoFiscalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    chaveAcesso?: boolean
    tipo?: boolean
    direcao?: boolean
    nsu?: boolean
    status?: boolean
    cfop?: boolean
    objetoStorageXml?: boolean
    emitidoEm?: boolean
    recebidoEm?: boolean
    atualizadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    manifestacoes?: boolean | DocumentoFiscal$manifestacoesArgs<ExtArgs>
    _count?: boolean | DocumentoFiscalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentoFiscal"]>

  export type DocumentoFiscalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    chaveAcesso?: boolean
    tipo?: boolean
    direcao?: boolean
    nsu?: boolean
    status?: boolean
    cfop?: boolean
    objetoStorageXml?: boolean
    emitidoEm?: boolean
    recebidoEm?: boolean
    atualizadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentoFiscal"]>

  export type DocumentoFiscalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    chaveAcesso?: boolean
    tipo?: boolean
    direcao?: boolean
    nsu?: boolean
    status?: boolean
    cfop?: boolean
    objetoStorageXml?: boolean
    emitidoEm?: boolean
    recebidoEm?: boolean
    atualizadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentoFiscal"]>

  export type DocumentoFiscalSelectScalar = {
    id?: boolean
    empresaId?: boolean
    chaveAcesso?: boolean
    tipo?: boolean
    direcao?: boolean
    nsu?: boolean
    status?: boolean
    cfop?: boolean
    objetoStorageXml?: boolean
    emitidoEm?: boolean
    recebidoEm?: boolean
    atualizadoEm?: boolean
  }

  export type DocumentoFiscalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "chaveAcesso" | "tipo" | "direcao" | "nsu" | "status" | "cfop" | "objetoStorageXml" | "emitidoEm" | "recebidoEm" | "atualizadoEm", ExtArgs["result"]["documentoFiscal"]>
  export type DocumentoFiscalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    manifestacoes?: boolean | DocumentoFiscal$manifestacoesArgs<ExtArgs>
    _count?: boolean | DocumentoFiscalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentoFiscalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type DocumentoFiscalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $DocumentoFiscalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentoFiscal"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      manifestacoes: Prisma.$ManifestacaoEventoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      chaveAcesso: string
      tipo: $Enums.TipoDocumentoFiscal
      direcao: $Enums.DirecaoDocumento
      nsu: bigint | null
      status: $Enums.StatusDocumentoFiscal
      cfop: string | null
      objetoStorageXml: string
      emitidoEm: Date | null
      recebidoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["documentoFiscal"]>
    composites: {}
  }

  type DocumentoFiscalGetPayload<S extends boolean | null | undefined | DocumentoFiscalDefaultArgs> = $Result.GetResult<Prisma.$DocumentoFiscalPayload, S>

  type DocumentoFiscalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentoFiscalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentoFiscalCountAggregateInputType | true
    }

  export interface DocumentoFiscalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentoFiscal'], meta: { name: 'DocumentoFiscal' } }
    /**
     * Find zero or one DocumentoFiscal that matches the filter.
     * @param {DocumentoFiscalFindUniqueArgs} args - Arguments to find a DocumentoFiscal
     * @example
     * // Get one DocumentoFiscal
     * const documentoFiscal = await prisma.documentoFiscal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentoFiscalFindUniqueArgs>(args: SelectSubset<T, DocumentoFiscalFindUniqueArgs<ExtArgs>>): Prisma__DocumentoFiscalClient<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentoFiscal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentoFiscalFindUniqueOrThrowArgs} args - Arguments to find a DocumentoFiscal
     * @example
     * // Get one DocumentoFiscal
     * const documentoFiscal = await prisma.documentoFiscal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentoFiscalFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentoFiscalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentoFiscalClient<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentoFiscal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFiscalFindFirstArgs} args - Arguments to find a DocumentoFiscal
     * @example
     * // Get one DocumentoFiscal
     * const documentoFiscal = await prisma.documentoFiscal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentoFiscalFindFirstArgs>(args?: SelectSubset<T, DocumentoFiscalFindFirstArgs<ExtArgs>>): Prisma__DocumentoFiscalClient<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentoFiscal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFiscalFindFirstOrThrowArgs} args - Arguments to find a DocumentoFiscal
     * @example
     * // Get one DocumentoFiscal
     * const documentoFiscal = await prisma.documentoFiscal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentoFiscalFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentoFiscalFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentoFiscalClient<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentoFiscals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFiscalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentoFiscals
     * const documentoFiscals = await prisma.documentoFiscal.findMany()
     * 
     * // Get first 10 DocumentoFiscals
     * const documentoFiscals = await prisma.documentoFiscal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentoFiscalWithIdOnly = await prisma.documentoFiscal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentoFiscalFindManyArgs>(args?: SelectSubset<T, DocumentoFiscalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentoFiscal.
     * @param {DocumentoFiscalCreateArgs} args - Arguments to create a DocumentoFiscal.
     * @example
     * // Create one DocumentoFiscal
     * const DocumentoFiscal = await prisma.documentoFiscal.create({
     *   data: {
     *     // ... data to create a DocumentoFiscal
     *   }
     * })
     * 
     */
    create<T extends DocumentoFiscalCreateArgs>(args: SelectSubset<T, DocumentoFiscalCreateArgs<ExtArgs>>): Prisma__DocumentoFiscalClient<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentoFiscals.
     * @param {DocumentoFiscalCreateManyArgs} args - Arguments to create many DocumentoFiscals.
     * @example
     * // Create many DocumentoFiscals
     * const documentoFiscal = await prisma.documentoFiscal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentoFiscalCreateManyArgs>(args?: SelectSubset<T, DocumentoFiscalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentoFiscals and returns the data saved in the database.
     * @param {DocumentoFiscalCreateManyAndReturnArgs} args - Arguments to create many DocumentoFiscals.
     * @example
     * // Create many DocumentoFiscals
     * const documentoFiscal = await prisma.documentoFiscal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentoFiscals and only return the `id`
     * const documentoFiscalWithIdOnly = await prisma.documentoFiscal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentoFiscalCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentoFiscalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentoFiscal.
     * @param {DocumentoFiscalDeleteArgs} args - Arguments to delete one DocumentoFiscal.
     * @example
     * // Delete one DocumentoFiscal
     * const DocumentoFiscal = await prisma.documentoFiscal.delete({
     *   where: {
     *     // ... filter to delete one DocumentoFiscal
     *   }
     * })
     * 
     */
    delete<T extends DocumentoFiscalDeleteArgs>(args: SelectSubset<T, DocumentoFiscalDeleteArgs<ExtArgs>>): Prisma__DocumentoFiscalClient<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentoFiscal.
     * @param {DocumentoFiscalUpdateArgs} args - Arguments to update one DocumentoFiscal.
     * @example
     * // Update one DocumentoFiscal
     * const documentoFiscal = await prisma.documentoFiscal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentoFiscalUpdateArgs>(args: SelectSubset<T, DocumentoFiscalUpdateArgs<ExtArgs>>): Prisma__DocumentoFiscalClient<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentoFiscals.
     * @param {DocumentoFiscalDeleteManyArgs} args - Arguments to filter DocumentoFiscals to delete.
     * @example
     * // Delete a few DocumentoFiscals
     * const { count } = await prisma.documentoFiscal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentoFiscalDeleteManyArgs>(args?: SelectSubset<T, DocumentoFiscalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentoFiscals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFiscalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentoFiscals
     * const documentoFiscal = await prisma.documentoFiscal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentoFiscalUpdateManyArgs>(args: SelectSubset<T, DocumentoFiscalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentoFiscals and returns the data updated in the database.
     * @param {DocumentoFiscalUpdateManyAndReturnArgs} args - Arguments to update many DocumentoFiscals.
     * @example
     * // Update many DocumentoFiscals
     * const documentoFiscal = await prisma.documentoFiscal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentoFiscals and only return the `id`
     * const documentoFiscalWithIdOnly = await prisma.documentoFiscal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentoFiscalUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentoFiscalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentoFiscal.
     * @param {DocumentoFiscalUpsertArgs} args - Arguments to update or create a DocumentoFiscal.
     * @example
     * // Update or create a DocumentoFiscal
     * const documentoFiscal = await prisma.documentoFiscal.upsert({
     *   create: {
     *     // ... data to create a DocumentoFiscal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentoFiscal we want to update
     *   }
     * })
     */
    upsert<T extends DocumentoFiscalUpsertArgs>(args: SelectSubset<T, DocumentoFiscalUpsertArgs<ExtArgs>>): Prisma__DocumentoFiscalClient<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentoFiscals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFiscalCountArgs} args - Arguments to filter DocumentoFiscals to count.
     * @example
     * // Count the number of DocumentoFiscals
     * const count = await prisma.documentoFiscal.count({
     *   where: {
     *     // ... the filter for the DocumentoFiscals we want to count
     *   }
     * })
    **/
    count<T extends DocumentoFiscalCountArgs>(
      args?: Subset<T, DocumentoFiscalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentoFiscalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentoFiscal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFiscalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentoFiscalAggregateArgs>(args: Subset<T, DocumentoFiscalAggregateArgs>): Prisma.PrismaPromise<GetDocumentoFiscalAggregateType<T>>

    /**
     * Group by DocumentoFiscal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFiscalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentoFiscalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentoFiscalGroupByArgs['orderBy'] }
        : { orderBy?: DocumentoFiscalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentoFiscalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentoFiscalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentoFiscal model
   */
  readonly fields: DocumentoFiscalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentoFiscal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentoFiscalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    manifestacoes<T extends DocumentoFiscal$manifestacoesArgs<ExtArgs> = {}>(args?: Subset<T, DocumentoFiscal$manifestacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentoFiscal model
   */
  interface DocumentoFiscalFieldRefs {
    readonly id: FieldRef<"DocumentoFiscal", 'String'>
    readonly empresaId: FieldRef<"DocumentoFiscal", 'String'>
    readonly chaveAcesso: FieldRef<"DocumentoFiscal", 'String'>
    readonly tipo: FieldRef<"DocumentoFiscal", 'TipoDocumentoFiscal'>
    readonly direcao: FieldRef<"DocumentoFiscal", 'DirecaoDocumento'>
    readonly nsu: FieldRef<"DocumentoFiscal", 'BigInt'>
    readonly status: FieldRef<"DocumentoFiscal", 'StatusDocumentoFiscal'>
    readonly cfop: FieldRef<"DocumentoFiscal", 'String'>
    readonly objetoStorageXml: FieldRef<"DocumentoFiscal", 'String'>
    readonly emitidoEm: FieldRef<"DocumentoFiscal", 'DateTime'>
    readonly recebidoEm: FieldRef<"DocumentoFiscal", 'DateTime'>
    readonly atualizadoEm: FieldRef<"DocumentoFiscal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentoFiscal findUnique
   */
  export type DocumentoFiscalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    /**
     * Filter, which DocumentoFiscal to fetch.
     */
    where: DocumentoFiscalWhereUniqueInput
  }

  /**
   * DocumentoFiscal findUniqueOrThrow
   */
  export type DocumentoFiscalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    /**
     * Filter, which DocumentoFiscal to fetch.
     */
    where: DocumentoFiscalWhereUniqueInput
  }

  /**
   * DocumentoFiscal findFirst
   */
  export type DocumentoFiscalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    /**
     * Filter, which DocumentoFiscal to fetch.
     */
    where?: DocumentoFiscalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentoFiscals to fetch.
     */
    orderBy?: DocumentoFiscalOrderByWithRelationInput | DocumentoFiscalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentoFiscals.
     */
    cursor?: DocumentoFiscalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentoFiscals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentoFiscals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentoFiscals.
     */
    distinct?: DocumentoFiscalScalarFieldEnum | DocumentoFiscalScalarFieldEnum[]
  }

  /**
   * DocumentoFiscal findFirstOrThrow
   */
  export type DocumentoFiscalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    /**
     * Filter, which DocumentoFiscal to fetch.
     */
    where?: DocumentoFiscalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentoFiscals to fetch.
     */
    orderBy?: DocumentoFiscalOrderByWithRelationInput | DocumentoFiscalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentoFiscals.
     */
    cursor?: DocumentoFiscalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentoFiscals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentoFiscals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentoFiscals.
     */
    distinct?: DocumentoFiscalScalarFieldEnum | DocumentoFiscalScalarFieldEnum[]
  }

  /**
   * DocumentoFiscal findMany
   */
  export type DocumentoFiscalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    /**
     * Filter, which DocumentoFiscals to fetch.
     */
    where?: DocumentoFiscalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentoFiscals to fetch.
     */
    orderBy?: DocumentoFiscalOrderByWithRelationInput | DocumentoFiscalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentoFiscals.
     */
    cursor?: DocumentoFiscalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentoFiscals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentoFiscals.
     */
    skip?: number
    distinct?: DocumentoFiscalScalarFieldEnum | DocumentoFiscalScalarFieldEnum[]
  }

  /**
   * DocumentoFiscal create
   */
  export type DocumentoFiscalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentoFiscal.
     */
    data: XOR<DocumentoFiscalCreateInput, DocumentoFiscalUncheckedCreateInput>
  }

  /**
   * DocumentoFiscal createMany
   */
  export type DocumentoFiscalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentoFiscals.
     */
    data: DocumentoFiscalCreateManyInput | DocumentoFiscalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentoFiscal createManyAndReturn
   */
  export type DocumentoFiscalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentoFiscals.
     */
    data: DocumentoFiscalCreateManyInput | DocumentoFiscalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentoFiscal update
   */
  export type DocumentoFiscalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentoFiscal.
     */
    data: XOR<DocumentoFiscalUpdateInput, DocumentoFiscalUncheckedUpdateInput>
    /**
     * Choose, which DocumentoFiscal to update.
     */
    where: DocumentoFiscalWhereUniqueInput
  }

  /**
   * DocumentoFiscal updateMany
   */
  export type DocumentoFiscalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentoFiscals.
     */
    data: XOR<DocumentoFiscalUpdateManyMutationInput, DocumentoFiscalUncheckedUpdateManyInput>
    /**
     * Filter which DocumentoFiscals to update
     */
    where?: DocumentoFiscalWhereInput
    /**
     * Limit how many DocumentoFiscals to update.
     */
    limit?: number
  }

  /**
   * DocumentoFiscal updateManyAndReturn
   */
  export type DocumentoFiscalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * The data used to update DocumentoFiscals.
     */
    data: XOR<DocumentoFiscalUpdateManyMutationInput, DocumentoFiscalUncheckedUpdateManyInput>
    /**
     * Filter which DocumentoFiscals to update
     */
    where?: DocumentoFiscalWhereInput
    /**
     * Limit how many DocumentoFiscals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentoFiscal upsert
   */
  export type DocumentoFiscalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentoFiscal to update in case it exists.
     */
    where: DocumentoFiscalWhereUniqueInput
    /**
     * In case the DocumentoFiscal found by the `where` argument doesn't exist, create a new DocumentoFiscal with this data.
     */
    create: XOR<DocumentoFiscalCreateInput, DocumentoFiscalUncheckedCreateInput>
    /**
     * In case the DocumentoFiscal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentoFiscalUpdateInput, DocumentoFiscalUncheckedUpdateInput>
  }

  /**
   * DocumentoFiscal delete
   */
  export type DocumentoFiscalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
    /**
     * Filter which DocumentoFiscal to delete.
     */
    where: DocumentoFiscalWhereUniqueInput
  }

  /**
   * DocumentoFiscal deleteMany
   */
  export type DocumentoFiscalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentoFiscals to delete
     */
    where?: DocumentoFiscalWhereInput
    /**
     * Limit how many DocumentoFiscals to delete.
     */
    limit?: number
  }

  /**
   * DocumentoFiscal.manifestacoes
   */
  export type DocumentoFiscal$manifestacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    where?: ManifestacaoEventoWhereInput
    orderBy?: ManifestacaoEventoOrderByWithRelationInput | ManifestacaoEventoOrderByWithRelationInput[]
    cursor?: ManifestacaoEventoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ManifestacaoEventoScalarFieldEnum | ManifestacaoEventoScalarFieldEnum[]
  }

  /**
   * DocumentoFiscal without action
   */
  export type DocumentoFiscalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentoFiscal
     */
    select?: DocumentoFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentoFiscal
     */
    omit?: DocumentoFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoFiscalInclude<ExtArgs> | null
  }


  /**
   * Model ManifestacaoEvento
   */

  export type AggregateManifestacaoEvento = {
    _count: ManifestacaoEventoCountAggregateOutputType | null
    _min: ManifestacaoEventoMinAggregateOutputType | null
    _max: ManifestacaoEventoMaxAggregateOutputType | null
  }

  export type ManifestacaoEventoMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    documentoFiscalId: string | null
    tipoEvento: $Enums.TipoEventoManifestacao | null
    status: $Enums.StatusManifestacao | null
    protocoloSefaz: string | null
    motivoSefaz: string | null
    enviadoEm: Date | null
    criadoEm: Date | null
  }

  export type ManifestacaoEventoMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    documentoFiscalId: string | null
    tipoEvento: $Enums.TipoEventoManifestacao | null
    status: $Enums.StatusManifestacao | null
    protocoloSefaz: string | null
    motivoSefaz: string | null
    enviadoEm: Date | null
    criadoEm: Date | null
  }

  export type ManifestacaoEventoCountAggregateOutputType = {
    id: number
    empresaId: number
    documentoFiscalId: number
    tipoEvento: number
    status: number
    protocoloSefaz: number
    motivoSefaz: number
    enviadoEm: number
    criadoEm: number
    _all: number
  }


  export type ManifestacaoEventoMinAggregateInputType = {
    id?: true
    empresaId?: true
    documentoFiscalId?: true
    tipoEvento?: true
    status?: true
    protocoloSefaz?: true
    motivoSefaz?: true
    enviadoEm?: true
    criadoEm?: true
  }

  export type ManifestacaoEventoMaxAggregateInputType = {
    id?: true
    empresaId?: true
    documentoFiscalId?: true
    tipoEvento?: true
    status?: true
    protocoloSefaz?: true
    motivoSefaz?: true
    enviadoEm?: true
    criadoEm?: true
  }

  export type ManifestacaoEventoCountAggregateInputType = {
    id?: true
    empresaId?: true
    documentoFiscalId?: true
    tipoEvento?: true
    status?: true
    protocoloSefaz?: true
    motivoSefaz?: true
    enviadoEm?: true
    criadoEm?: true
    _all?: true
  }

  export type ManifestacaoEventoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ManifestacaoEvento to aggregate.
     */
    where?: ManifestacaoEventoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManifestacaoEventos to fetch.
     */
    orderBy?: ManifestacaoEventoOrderByWithRelationInput | ManifestacaoEventoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ManifestacaoEventoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManifestacaoEventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManifestacaoEventos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ManifestacaoEventos
    **/
    _count?: true | ManifestacaoEventoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManifestacaoEventoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManifestacaoEventoMaxAggregateInputType
  }

  export type GetManifestacaoEventoAggregateType<T extends ManifestacaoEventoAggregateArgs> = {
        [P in keyof T & keyof AggregateManifestacaoEvento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManifestacaoEvento[P]>
      : GetScalarType<T[P], AggregateManifestacaoEvento[P]>
  }




  export type ManifestacaoEventoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManifestacaoEventoWhereInput
    orderBy?: ManifestacaoEventoOrderByWithAggregationInput | ManifestacaoEventoOrderByWithAggregationInput[]
    by: ManifestacaoEventoScalarFieldEnum[] | ManifestacaoEventoScalarFieldEnum
    having?: ManifestacaoEventoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManifestacaoEventoCountAggregateInputType | true
    _min?: ManifestacaoEventoMinAggregateInputType
    _max?: ManifestacaoEventoMaxAggregateInputType
  }

  export type ManifestacaoEventoGroupByOutputType = {
    id: string
    empresaId: string
    documentoFiscalId: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status: $Enums.StatusManifestacao
    protocoloSefaz: string | null
    motivoSefaz: string | null
    enviadoEm: Date | null
    criadoEm: Date
    _count: ManifestacaoEventoCountAggregateOutputType | null
    _min: ManifestacaoEventoMinAggregateOutputType | null
    _max: ManifestacaoEventoMaxAggregateOutputType | null
  }

  type GetManifestacaoEventoGroupByPayload<T extends ManifestacaoEventoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ManifestacaoEventoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManifestacaoEventoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManifestacaoEventoGroupByOutputType[P]>
            : GetScalarType<T[P], ManifestacaoEventoGroupByOutputType[P]>
        }
      >
    >


  export type ManifestacaoEventoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    documentoFiscalId?: boolean
    tipoEvento?: boolean
    status?: boolean
    protocoloSefaz?: boolean
    motivoSefaz?: boolean
    enviadoEm?: boolean
    criadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    documentoFiscal?: boolean | DocumentoFiscalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["manifestacaoEvento"]>

  export type ManifestacaoEventoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    documentoFiscalId?: boolean
    tipoEvento?: boolean
    status?: boolean
    protocoloSefaz?: boolean
    motivoSefaz?: boolean
    enviadoEm?: boolean
    criadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    documentoFiscal?: boolean | DocumentoFiscalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["manifestacaoEvento"]>

  export type ManifestacaoEventoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    documentoFiscalId?: boolean
    tipoEvento?: boolean
    status?: boolean
    protocoloSefaz?: boolean
    motivoSefaz?: boolean
    enviadoEm?: boolean
    criadoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    documentoFiscal?: boolean | DocumentoFiscalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["manifestacaoEvento"]>

  export type ManifestacaoEventoSelectScalar = {
    id?: boolean
    empresaId?: boolean
    documentoFiscalId?: boolean
    tipoEvento?: boolean
    status?: boolean
    protocoloSefaz?: boolean
    motivoSefaz?: boolean
    enviadoEm?: boolean
    criadoEm?: boolean
  }

  export type ManifestacaoEventoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "documentoFiscalId" | "tipoEvento" | "status" | "protocoloSefaz" | "motivoSefaz" | "enviadoEm" | "criadoEm", ExtArgs["result"]["manifestacaoEvento"]>
  export type ManifestacaoEventoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    documentoFiscal?: boolean | DocumentoFiscalDefaultArgs<ExtArgs>
  }
  export type ManifestacaoEventoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    documentoFiscal?: boolean | DocumentoFiscalDefaultArgs<ExtArgs>
  }
  export type ManifestacaoEventoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
    documentoFiscal?: boolean | DocumentoFiscalDefaultArgs<ExtArgs>
  }

  export type $ManifestacaoEventoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ManifestacaoEvento"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
      documentoFiscal: Prisma.$DocumentoFiscalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      documentoFiscalId: string
      tipoEvento: $Enums.TipoEventoManifestacao
      status: $Enums.StatusManifestacao
      protocoloSefaz: string | null
      motivoSefaz: string | null
      enviadoEm: Date | null
      criadoEm: Date
    }, ExtArgs["result"]["manifestacaoEvento"]>
    composites: {}
  }

  type ManifestacaoEventoGetPayload<S extends boolean | null | undefined | ManifestacaoEventoDefaultArgs> = $Result.GetResult<Prisma.$ManifestacaoEventoPayload, S>

  type ManifestacaoEventoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ManifestacaoEventoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ManifestacaoEventoCountAggregateInputType | true
    }

  export interface ManifestacaoEventoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ManifestacaoEvento'], meta: { name: 'ManifestacaoEvento' } }
    /**
     * Find zero or one ManifestacaoEvento that matches the filter.
     * @param {ManifestacaoEventoFindUniqueArgs} args - Arguments to find a ManifestacaoEvento
     * @example
     * // Get one ManifestacaoEvento
     * const manifestacaoEvento = await prisma.manifestacaoEvento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ManifestacaoEventoFindUniqueArgs>(args: SelectSubset<T, ManifestacaoEventoFindUniqueArgs<ExtArgs>>): Prisma__ManifestacaoEventoClient<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ManifestacaoEvento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ManifestacaoEventoFindUniqueOrThrowArgs} args - Arguments to find a ManifestacaoEvento
     * @example
     * // Get one ManifestacaoEvento
     * const manifestacaoEvento = await prisma.manifestacaoEvento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ManifestacaoEventoFindUniqueOrThrowArgs>(args: SelectSubset<T, ManifestacaoEventoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ManifestacaoEventoClient<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ManifestacaoEvento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManifestacaoEventoFindFirstArgs} args - Arguments to find a ManifestacaoEvento
     * @example
     * // Get one ManifestacaoEvento
     * const manifestacaoEvento = await prisma.manifestacaoEvento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ManifestacaoEventoFindFirstArgs>(args?: SelectSubset<T, ManifestacaoEventoFindFirstArgs<ExtArgs>>): Prisma__ManifestacaoEventoClient<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ManifestacaoEvento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManifestacaoEventoFindFirstOrThrowArgs} args - Arguments to find a ManifestacaoEvento
     * @example
     * // Get one ManifestacaoEvento
     * const manifestacaoEvento = await prisma.manifestacaoEvento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ManifestacaoEventoFindFirstOrThrowArgs>(args?: SelectSubset<T, ManifestacaoEventoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ManifestacaoEventoClient<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ManifestacaoEventos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManifestacaoEventoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ManifestacaoEventos
     * const manifestacaoEventos = await prisma.manifestacaoEvento.findMany()
     * 
     * // Get first 10 ManifestacaoEventos
     * const manifestacaoEventos = await prisma.manifestacaoEvento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const manifestacaoEventoWithIdOnly = await prisma.manifestacaoEvento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ManifestacaoEventoFindManyArgs>(args?: SelectSubset<T, ManifestacaoEventoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ManifestacaoEvento.
     * @param {ManifestacaoEventoCreateArgs} args - Arguments to create a ManifestacaoEvento.
     * @example
     * // Create one ManifestacaoEvento
     * const ManifestacaoEvento = await prisma.manifestacaoEvento.create({
     *   data: {
     *     // ... data to create a ManifestacaoEvento
     *   }
     * })
     * 
     */
    create<T extends ManifestacaoEventoCreateArgs>(args: SelectSubset<T, ManifestacaoEventoCreateArgs<ExtArgs>>): Prisma__ManifestacaoEventoClient<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ManifestacaoEventos.
     * @param {ManifestacaoEventoCreateManyArgs} args - Arguments to create many ManifestacaoEventos.
     * @example
     * // Create many ManifestacaoEventos
     * const manifestacaoEvento = await prisma.manifestacaoEvento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ManifestacaoEventoCreateManyArgs>(args?: SelectSubset<T, ManifestacaoEventoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ManifestacaoEventos and returns the data saved in the database.
     * @param {ManifestacaoEventoCreateManyAndReturnArgs} args - Arguments to create many ManifestacaoEventos.
     * @example
     * // Create many ManifestacaoEventos
     * const manifestacaoEvento = await prisma.manifestacaoEvento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ManifestacaoEventos and only return the `id`
     * const manifestacaoEventoWithIdOnly = await prisma.manifestacaoEvento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ManifestacaoEventoCreateManyAndReturnArgs>(args?: SelectSubset<T, ManifestacaoEventoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ManifestacaoEvento.
     * @param {ManifestacaoEventoDeleteArgs} args - Arguments to delete one ManifestacaoEvento.
     * @example
     * // Delete one ManifestacaoEvento
     * const ManifestacaoEvento = await prisma.manifestacaoEvento.delete({
     *   where: {
     *     // ... filter to delete one ManifestacaoEvento
     *   }
     * })
     * 
     */
    delete<T extends ManifestacaoEventoDeleteArgs>(args: SelectSubset<T, ManifestacaoEventoDeleteArgs<ExtArgs>>): Prisma__ManifestacaoEventoClient<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ManifestacaoEvento.
     * @param {ManifestacaoEventoUpdateArgs} args - Arguments to update one ManifestacaoEvento.
     * @example
     * // Update one ManifestacaoEvento
     * const manifestacaoEvento = await prisma.manifestacaoEvento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ManifestacaoEventoUpdateArgs>(args: SelectSubset<T, ManifestacaoEventoUpdateArgs<ExtArgs>>): Prisma__ManifestacaoEventoClient<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ManifestacaoEventos.
     * @param {ManifestacaoEventoDeleteManyArgs} args - Arguments to filter ManifestacaoEventos to delete.
     * @example
     * // Delete a few ManifestacaoEventos
     * const { count } = await prisma.manifestacaoEvento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ManifestacaoEventoDeleteManyArgs>(args?: SelectSubset<T, ManifestacaoEventoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ManifestacaoEventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManifestacaoEventoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ManifestacaoEventos
     * const manifestacaoEvento = await prisma.manifestacaoEvento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ManifestacaoEventoUpdateManyArgs>(args: SelectSubset<T, ManifestacaoEventoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ManifestacaoEventos and returns the data updated in the database.
     * @param {ManifestacaoEventoUpdateManyAndReturnArgs} args - Arguments to update many ManifestacaoEventos.
     * @example
     * // Update many ManifestacaoEventos
     * const manifestacaoEvento = await prisma.manifestacaoEvento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ManifestacaoEventos and only return the `id`
     * const manifestacaoEventoWithIdOnly = await prisma.manifestacaoEvento.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ManifestacaoEventoUpdateManyAndReturnArgs>(args: SelectSubset<T, ManifestacaoEventoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ManifestacaoEvento.
     * @param {ManifestacaoEventoUpsertArgs} args - Arguments to update or create a ManifestacaoEvento.
     * @example
     * // Update or create a ManifestacaoEvento
     * const manifestacaoEvento = await prisma.manifestacaoEvento.upsert({
     *   create: {
     *     // ... data to create a ManifestacaoEvento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ManifestacaoEvento we want to update
     *   }
     * })
     */
    upsert<T extends ManifestacaoEventoUpsertArgs>(args: SelectSubset<T, ManifestacaoEventoUpsertArgs<ExtArgs>>): Prisma__ManifestacaoEventoClient<$Result.GetResult<Prisma.$ManifestacaoEventoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ManifestacaoEventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManifestacaoEventoCountArgs} args - Arguments to filter ManifestacaoEventos to count.
     * @example
     * // Count the number of ManifestacaoEventos
     * const count = await prisma.manifestacaoEvento.count({
     *   where: {
     *     // ... the filter for the ManifestacaoEventos we want to count
     *   }
     * })
    **/
    count<T extends ManifestacaoEventoCountArgs>(
      args?: Subset<T, ManifestacaoEventoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManifestacaoEventoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ManifestacaoEvento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManifestacaoEventoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ManifestacaoEventoAggregateArgs>(args: Subset<T, ManifestacaoEventoAggregateArgs>): Prisma.PrismaPromise<GetManifestacaoEventoAggregateType<T>>

    /**
     * Group by ManifestacaoEvento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManifestacaoEventoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ManifestacaoEventoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManifestacaoEventoGroupByArgs['orderBy'] }
        : { orderBy?: ManifestacaoEventoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ManifestacaoEventoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManifestacaoEventoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ManifestacaoEvento model
   */
  readonly fields: ManifestacaoEventoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ManifestacaoEvento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ManifestacaoEventoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    documentoFiscal<T extends DocumentoFiscalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentoFiscalDefaultArgs<ExtArgs>>): Prisma__DocumentoFiscalClient<$Result.GetResult<Prisma.$DocumentoFiscalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ManifestacaoEvento model
   */
  interface ManifestacaoEventoFieldRefs {
    readonly id: FieldRef<"ManifestacaoEvento", 'String'>
    readonly empresaId: FieldRef<"ManifestacaoEvento", 'String'>
    readonly documentoFiscalId: FieldRef<"ManifestacaoEvento", 'String'>
    readonly tipoEvento: FieldRef<"ManifestacaoEvento", 'TipoEventoManifestacao'>
    readonly status: FieldRef<"ManifestacaoEvento", 'StatusManifestacao'>
    readonly protocoloSefaz: FieldRef<"ManifestacaoEvento", 'String'>
    readonly motivoSefaz: FieldRef<"ManifestacaoEvento", 'String'>
    readonly enviadoEm: FieldRef<"ManifestacaoEvento", 'DateTime'>
    readonly criadoEm: FieldRef<"ManifestacaoEvento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ManifestacaoEvento findUnique
   */
  export type ManifestacaoEventoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    /**
     * Filter, which ManifestacaoEvento to fetch.
     */
    where: ManifestacaoEventoWhereUniqueInput
  }

  /**
   * ManifestacaoEvento findUniqueOrThrow
   */
  export type ManifestacaoEventoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    /**
     * Filter, which ManifestacaoEvento to fetch.
     */
    where: ManifestacaoEventoWhereUniqueInput
  }

  /**
   * ManifestacaoEvento findFirst
   */
  export type ManifestacaoEventoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    /**
     * Filter, which ManifestacaoEvento to fetch.
     */
    where?: ManifestacaoEventoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManifestacaoEventos to fetch.
     */
    orderBy?: ManifestacaoEventoOrderByWithRelationInput | ManifestacaoEventoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ManifestacaoEventos.
     */
    cursor?: ManifestacaoEventoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManifestacaoEventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManifestacaoEventos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ManifestacaoEventos.
     */
    distinct?: ManifestacaoEventoScalarFieldEnum | ManifestacaoEventoScalarFieldEnum[]
  }

  /**
   * ManifestacaoEvento findFirstOrThrow
   */
  export type ManifestacaoEventoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    /**
     * Filter, which ManifestacaoEvento to fetch.
     */
    where?: ManifestacaoEventoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManifestacaoEventos to fetch.
     */
    orderBy?: ManifestacaoEventoOrderByWithRelationInput | ManifestacaoEventoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ManifestacaoEventos.
     */
    cursor?: ManifestacaoEventoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManifestacaoEventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManifestacaoEventos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ManifestacaoEventos.
     */
    distinct?: ManifestacaoEventoScalarFieldEnum | ManifestacaoEventoScalarFieldEnum[]
  }

  /**
   * ManifestacaoEvento findMany
   */
  export type ManifestacaoEventoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    /**
     * Filter, which ManifestacaoEventos to fetch.
     */
    where?: ManifestacaoEventoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManifestacaoEventos to fetch.
     */
    orderBy?: ManifestacaoEventoOrderByWithRelationInput | ManifestacaoEventoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ManifestacaoEventos.
     */
    cursor?: ManifestacaoEventoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManifestacaoEventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManifestacaoEventos.
     */
    skip?: number
    distinct?: ManifestacaoEventoScalarFieldEnum | ManifestacaoEventoScalarFieldEnum[]
  }

  /**
   * ManifestacaoEvento create
   */
  export type ManifestacaoEventoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    /**
     * The data needed to create a ManifestacaoEvento.
     */
    data: XOR<ManifestacaoEventoCreateInput, ManifestacaoEventoUncheckedCreateInput>
  }

  /**
   * ManifestacaoEvento createMany
   */
  export type ManifestacaoEventoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ManifestacaoEventos.
     */
    data: ManifestacaoEventoCreateManyInput | ManifestacaoEventoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ManifestacaoEvento createManyAndReturn
   */
  export type ManifestacaoEventoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * The data used to create many ManifestacaoEventos.
     */
    data: ManifestacaoEventoCreateManyInput | ManifestacaoEventoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ManifestacaoEvento update
   */
  export type ManifestacaoEventoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    /**
     * The data needed to update a ManifestacaoEvento.
     */
    data: XOR<ManifestacaoEventoUpdateInput, ManifestacaoEventoUncheckedUpdateInput>
    /**
     * Choose, which ManifestacaoEvento to update.
     */
    where: ManifestacaoEventoWhereUniqueInput
  }

  /**
   * ManifestacaoEvento updateMany
   */
  export type ManifestacaoEventoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ManifestacaoEventos.
     */
    data: XOR<ManifestacaoEventoUpdateManyMutationInput, ManifestacaoEventoUncheckedUpdateManyInput>
    /**
     * Filter which ManifestacaoEventos to update
     */
    where?: ManifestacaoEventoWhereInput
    /**
     * Limit how many ManifestacaoEventos to update.
     */
    limit?: number
  }

  /**
   * ManifestacaoEvento updateManyAndReturn
   */
  export type ManifestacaoEventoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * The data used to update ManifestacaoEventos.
     */
    data: XOR<ManifestacaoEventoUpdateManyMutationInput, ManifestacaoEventoUncheckedUpdateManyInput>
    /**
     * Filter which ManifestacaoEventos to update
     */
    where?: ManifestacaoEventoWhereInput
    /**
     * Limit how many ManifestacaoEventos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ManifestacaoEvento upsert
   */
  export type ManifestacaoEventoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    /**
     * The filter to search for the ManifestacaoEvento to update in case it exists.
     */
    where: ManifestacaoEventoWhereUniqueInput
    /**
     * In case the ManifestacaoEvento found by the `where` argument doesn't exist, create a new ManifestacaoEvento with this data.
     */
    create: XOR<ManifestacaoEventoCreateInput, ManifestacaoEventoUncheckedCreateInput>
    /**
     * In case the ManifestacaoEvento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ManifestacaoEventoUpdateInput, ManifestacaoEventoUncheckedUpdateInput>
  }

  /**
   * ManifestacaoEvento delete
   */
  export type ManifestacaoEventoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
    /**
     * Filter which ManifestacaoEvento to delete.
     */
    where: ManifestacaoEventoWhereUniqueInput
  }

  /**
   * ManifestacaoEvento deleteMany
   */
  export type ManifestacaoEventoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ManifestacaoEventos to delete
     */
    where?: ManifestacaoEventoWhereInput
    /**
     * Limit how many ManifestacaoEventos to delete.
     */
    limit?: number
  }

  /**
   * ManifestacaoEvento without action
   */
  export type ManifestacaoEventoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManifestacaoEvento
     */
    select?: ManifestacaoEventoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ManifestacaoEvento
     */
    omit?: ManifestacaoEventoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManifestacaoEventoInclude<ExtArgs> | null
  }


  /**
   * Model RegraFiscal
   */

  export type AggregateRegraFiscal = {
    _count: RegraFiscalCountAggregateOutputType | null
    _min: RegraFiscalMinAggregateOutputType | null
    _max: RegraFiscalMaxAggregateOutputType | null
  }

  export type RegraFiscalMinAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    empresaId: string | null
    cfopEntrada: string | null
    descricao: string | null
    observacao: string | null
    acumulador: string | null
    ativa: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type RegraFiscalMaxAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    empresaId: string | null
    cfopEntrada: string | null
    descricao: string | null
    observacao: string | null
    acumulador: string | null
    ativa: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type RegraFiscalCountAggregateOutputType = {
    id: number
    organizacaoId: number
    empresaId: number
    cfopEntrada: number
    descricao: number
    observacao: number
    acumulador: number
    ativa: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type RegraFiscalMinAggregateInputType = {
    id?: true
    organizacaoId?: true
    empresaId?: true
    cfopEntrada?: true
    descricao?: true
    observacao?: true
    acumulador?: true
    ativa?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type RegraFiscalMaxAggregateInputType = {
    id?: true
    organizacaoId?: true
    empresaId?: true
    cfopEntrada?: true
    descricao?: true
    observacao?: true
    acumulador?: true
    ativa?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type RegraFiscalCountAggregateInputType = {
    id?: true
    organizacaoId?: true
    empresaId?: true
    cfopEntrada?: true
    descricao?: true
    observacao?: true
    acumulador?: true
    ativa?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type RegraFiscalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegraFiscal to aggregate.
     */
    where?: RegraFiscalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegraFiscals to fetch.
     */
    orderBy?: RegraFiscalOrderByWithRelationInput | RegraFiscalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegraFiscalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegraFiscals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegraFiscals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RegraFiscals
    **/
    _count?: true | RegraFiscalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegraFiscalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegraFiscalMaxAggregateInputType
  }

  export type GetRegraFiscalAggregateType<T extends RegraFiscalAggregateArgs> = {
        [P in keyof T & keyof AggregateRegraFiscal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegraFiscal[P]>
      : GetScalarType<T[P], AggregateRegraFiscal[P]>
  }




  export type RegraFiscalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegraFiscalWhereInput
    orderBy?: RegraFiscalOrderByWithAggregationInput | RegraFiscalOrderByWithAggregationInput[]
    by: RegraFiscalScalarFieldEnum[] | RegraFiscalScalarFieldEnum
    having?: RegraFiscalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegraFiscalCountAggregateInputType | true
    _min?: RegraFiscalMinAggregateInputType
    _max?: RegraFiscalMaxAggregateInputType
  }

  export type RegraFiscalGroupByOutputType = {
    id: string
    organizacaoId: string
    empresaId: string | null
    cfopEntrada: string
    descricao: string
    observacao: string | null
    acumulador: string | null
    ativa: boolean
    criadoEm: Date
    atualizadoEm: Date
    _count: RegraFiscalCountAggregateOutputType | null
    _min: RegraFiscalMinAggregateOutputType | null
    _max: RegraFiscalMaxAggregateOutputType | null
  }

  type GetRegraFiscalGroupByPayload<T extends RegraFiscalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegraFiscalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegraFiscalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegraFiscalGroupByOutputType[P]>
            : GetScalarType<T[P], RegraFiscalGroupByOutputType[P]>
        }
      >
    >


  export type RegraFiscalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    empresaId?: boolean
    cfopEntrada?: boolean
    descricao?: boolean
    observacao?: boolean
    acumulador?: boolean
    ativa?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    empresa?: boolean | RegraFiscal$empresaArgs<ExtArgs>
  }, ExtArgs["result"]["regraFiscal"]>

  export type RegraFiscalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    empresaId?: boolean
    cfopEntrada?: boolean
    descricao?: boolean
    observacao?: boolean
    acumulador?: boolean
    ativa?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    empresa?: boolean | RegraFiscal$empresaArgs<ExtArgs>
  }, ExtArgs["result"]["regraFiscal"]>

  export type RegraFiscalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    empresaId?: boolean
    cfopEntrada?: boolean
    descricao?: boolean
    observacao?: boolean
    acumulador?: boolean
    ativa?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    empresa?: boolean | RegraFiscal$empresaArgs<ExtArgs>
  }, ExtArgs["result"]["regraFiscal"]>

  export type RegraFiscalSelectScalar = {
    id?: boolean
    organizacaoId?: boolean
    empresaId?: boolean
    cfopEntrada?: boolean
    descricao?: boolean
    observacao?: boolean
    acumulador?: boolean
    ativa?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type RegraFiscalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizacaoId" | "empresaId" | "cfopEntrada" | "descricao" | "observacao" | "acumulador" | "ativa" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["regraFiscal"]>
  export type RegraFiscalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    empresa?: boolean | RegraFiscal$empresaArgs<ExtArgs>
  }
  export type RegraFiscalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    empresa?: boolean | RegraFiscal$empresaArgs<ExtArgs>
  }
  export type RegraFiscalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    empresa?: boolean | RegraFiscal$empresaArgs<ExtArgs>
  }

  export type $RegraFiscalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegraFiscal"
    objects: {
      organizacao: Prisma.$OrganizacaoPayload<ExtArgs>
      empresa: Prisma.$EmpresaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizacaoId: string
      empresaId: string | null
      cfopEntrada: string
      descricao: string
      observacao: string | null
      acumulador: string | null
      ativa: boolean
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["regraFiscal"]>
    composites: {}
  }

  type RegraFiscalGetPayload<S extends boolean | null | undefined | RegraFiscalDefaultArgs> = $Result.GetResult<Prisma.$RegraFiscalPayload, S>

  type RegraFiscalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegraFiscalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegraFiscalCountAggregateInputType | true
    }

  export interface RegraFiscalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RegraFiscal'], meta: { name: 'RegraFiscal' } }
    /**
     * Find zero or one RegraFiscal that matches the filter.
     * @param {RegraFiscalFindUniqueArgs} args - Arguments to find a RegraFiscal
     * @example
     * // Get one RegraFiscal
     * const regraFiscal = await prisma.regraFiscal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegraFiscalFindUniqueArgs>(args: SelectSubset<T, RegraFiscalFindUniqueArgs<ExtArgs>>): Prisma__RegraFiscalClient<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RegraFiscal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegraFiscalFindUniqueOrThrowArgs} args - Arguments to find a RegraFiscal
     * @example
     * // Get one RegraFiscal
     * const regraFiscal = await prisma.regraFiscal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegraFiscalFindUniqueOrThrowArgs>(args: SelectSubset<T, RegraFiscalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegraFiscalClient<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegraFiscal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegraFiscalFindFirstArgs} args - Arguments to find a RegraFiscal
     * @example
     * // Get one RegraFiscal
     * const regraFiscal = await prisma.regraFiscal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegraFiscalFindFirstArgs>(args?: SelectSubset<T, RegraFiscalFindFirstArgs<ExtArgs>>): Prisma__RegraFiscalClient<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegraFiscal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegraFiscalFindFirstOrThrowArgs} args - Arguments to find a RegraFiscal
     * @example
     * // Get one RegraFiscal
     * const regraFiscal = await prisma.regraFiscal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegraFiscalFindFirstOrThrowArgs>(args?: SelectSubset<T, RegraFiscalFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegraFiscalClient<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RegraFiscals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegraFiscalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegraFiscals
     * const regraFiscals = await prisma.regraFiscal.findMany()
     * 
     * // Get first 10 RegraFiscals
     * const regraFiscals = await prisma.regraFiscal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const regraFiscalWithIdOnly = await prisma.regraFiscal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegraFiscalFindManyArgs>(args?: SelectSubset<T, RegraFiscalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RegraFiscal.
     * @param {RegraFiscalCreateArgs} args - Arguments to create a RegraFiscal.
     * @example
     * // Create one RegraFiscal
     * const RegraFiscal = await prisma.regraFiscal.create({
     *   data: {
     *     // ... data to create a RegraFiscal
     *   }
     * })
     * 
     */
    create<T extends RegraFiscalCreateArgs>(args: SelectSubset<T, RegraFiscalCreateArgs<ExtArgs>>): Prisma__RegraFiscalClient<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RegraFiscals.
     * @param {RegraFiscalCreateManyArgs} args - Arguments to create many RegraFiscals.
     * @example
     * // Create many RegraFiscals
     * const regraFiscal = await prisma.regraFiscal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegraFiscalCreateManyArgs>(args?: SelectSubset<T, RegraFiscalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RegraFiscals and returns the data saved in the database.
     * @param {RegraFiscalCreateManyAndReturnArgs} args - Arguments to create many RegraFiscals.
     * @example
     * // Create many RegraFiscals
     * const regraFiscal = await prisma.regraFiscal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RegraFiscals and only return the `id`
     * const regraFiscalWithIdOnly = await prisma.regraFiscal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegraFiscalCreateManyAndReturnArgs>(args?: SelectSubset<T, RegraFiscalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RegraFiscal.
     * @param {RegraFiscalDeleteArgs} args - Arguments to delete one RegraFiscal.
     * @example
     * // Delete one RegraFiscal
     * const RegraFiscal = await prisma.regraFiscal.delete({
     *   where: {
     *     // ... filter to delete one RegraFiscal
     *   }
     * })
     * 
     */
    delete<T extends RegraFiscalDeleteArgs>(args: SelectSubset<T, RegraFiscalDeleteArgs<ExtArgs>>): Prisma__RegraFiscalClient<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RegraFiscal.
     * @param {RegraFiscalUpdateArgs} args - Arguments to update one RegraFiscal.
     * @example
     * // Update one RegraFiscal
     * const regraFiscal = await prisma.regraFiscal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegraFiscalUpdateArgs>(args: SelectSubset<T, RegraFiscalUpdateArgs<ExtArgs>>): Prisma__RegraFiscalClient<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RegraFiscals.
     * @param {RegraFiscalDeleteManyArgs} args - Arguments to filter RegraFiscals to delete.
     * @example
     * // Delete a few RegraFiscals
     * const { count } = await prisma.regraFiscal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegraFiscalDeleteManyArgs>(args?: SelectSubset<T, RegraFiscalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegraFiscals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegraFiscalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegraFiscals
     * const regraFiscal = await prisma.regraFiscal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegraFiscalUpdateManyArgs>(args: SelectSubset<T, RegraFiscalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegraFiscals and returns the data updated in the database.
     * @param {RegraFiscalUpdateManyAndReturnArgs} args - Arguments to update many RegraFiscals.
     * @example
     * // Update many RegraFiscals
     * const regraFiscal = await prisma.regraFiscal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RegraFiscals and only return the `id`
     * const regraFiscalWithIdOnly = await prisma.regraFiscal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegraFiscalUpdateManyAndReturnArgs>(args: SelectSubset<T, RegraFiscalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RegraFiscal.
     * @param {RegraFiscalUpsertArgs} args - Arguments to update or create a RegraFiscal.
     * @example
     * // Update or create a RegraFiscal
     * const regraFiscal = await prisma.regraFiscal.upsert({
     *   create: {
     *     // ... data to create a RegraFiscal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegraFiscal we want to update
     *   }
     * })
     */
    upsert<T extends RegraFiscalUpsertArgs>(args: SelectSubset<T, RegraFiscalUpsertArgs<ExtArgs>>): Prisma__RegraFiscalClient<$Result.GetResult<Prisma.$RegraFiscalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RegraFiscals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegraFiscalCountArgs} args - Arguments to filter RegraFiscals to count.
     * @example
     * // Count the number of RegraFiscals
     * const count = await prisma.regraFiscal.count({
     *   where: {
     *     // ... the filter for the RegraFiscals we want to count
     *   }
     * })
    **/
    count<T extends RegraFiscalCountArgs>(
      args?: Subset<T, RegraFiscalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegraFiscalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RegraFiscal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegraFiscalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegraFiscalAggregateArgs>(args: Subset<T, RegraFiscalAggregateArgs>): Prisma.PrismaPromise<GetRegraFiscalAggregateType<T>>

    /**
     * Group by RegraFiscal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegraFiscalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegraFiscalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegraFiscalGroupByArgs['orderBy'] }
        : { orderBy?: RegraFiscalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegraFiscalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegraFiscalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RegraFiscal model
   */
  readonly fields: RegraFiscalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RegraFiscal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegraFiscalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizacao<T extends OrganizacaoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizacaoDefaultArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    empresa<T extends RegraFiscal$empresaArgs<ExtArgs> = {}>(args?: Subset<T, RegraFiscal$empresaArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RegraFiscal model
   */
  interface RegraFiscalFieldRefs {
    readonly id: FieldRef<"RegraFiscal", 'String'>
    readonly organizacaoId: FieldRef<"RegraFiscal", 'String'>
    readonly empresaId: FieldRef<"RegraFiscal", 'String'>
    readonly cfopEntrada: FieldRef<"RegraFiscal", 'String'>
    readonly descricao: FieldRef<"RegraFiscal", 'String'>
    readonly observacao: FieldRef<"RegraFiscal", 'String'>
    readonly acumulador: FieldRef<"RegraFiscal", 'String'>
    readonly ativa: FieldRef<"RegraFiscal", 'Boolean'>
    readonly criadoEm: FieldRef<"RegraFiscal", 'DateTime'>
    readonly atualizadoEm: FieldRef<"RegraFiscal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RegraFiscal findUnique
   */
  export type RegraFiscalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    /**
     * Filter, which RegraFiscal to fetch.
     */
    where: RegraFiscalWhereUniqueInput
  }

  /**
   * RegraFiscal findUniqueOrThrow
   */
  export type RegraFiscalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    /**
     * Filter, which RegraFiscal to fetch.
     */
    where: RegraFiscalWhereUniqueInput
  }

  /**
   * RegraFiscal findFirst
   */
  export type RegraFiscalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    /**
     * Filter, which RegraFiscal to fetch.
     */
    where?: RegraFiscalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegraFiscals to fetch.
     */
    orderBy?: RegraFiscalOrderByWithRelationInput | RegraFiscalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegraFiscals.
     */
    cursor?: RegraFiscalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegraFiscals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegraFiscals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegraFiscals.
     */
    distinct?: RegraFiscalScalarFieldEnum | RegraFiscalScalarFieldEnum[]
  }

  /**
   * RegraFiscal findFirstOrThrow
   */
  export type RegraFiscalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    /**
     * Filter, which RegraFiscal to fetch.
     */
    where?: RegraFiscalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegraFiscals to fetch.
     */
    orderBy?: RegraFiscalOrderByWithRelationInput | RegraFiscalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegraFiscals.
     */
    cursor?: RegraFiscalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegraFiscals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegraFiscals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegraFiscals.
     */
    distinct?: RegraFiscalScalarFieldEnum | RegraFiscalScalarFieldEnum[]
  }

  /**
   * RegraFiscal findMany
   */
  export type RegraFiscalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    /**
     * Filter, which RegraFiscals to fetch.
     */
    where?: RegraFiscalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegraFiscals to fetch.
     */
    orderBy?: RegraFiscalOrderByWithRelationInput | RegraFiscalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RegraFiscals.
     */
    cursor?: RegraFiscalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegraFiscals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegraFiscals.
     */
    skip?: number
    distinct?: RegraFiscalScalarFieldEnum | RegraFiscalScalarFieldEnum[]
  }

  /**
   * RegraFiscal create
   */
  export type RegraFiscalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    /**
     * The data needed to create a RegraFiscal.
     */
    data: XOR<RegraFiscalCreateInput, RegraFiscalUncheckedCreateInput>
  }

  /**
   * RegraFiscal createMany
   */
  export type RegraFiscalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegraFiscals.
     */
    data: RegraFiscalCreateManyInput | RegraFiscalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegraFiscal createManyAndReturn
   */
  export type RegraFiscalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * The data used to create many RegraFiscals.
     */
    data: RegraFiscalCreateManyInput | RegraFiscalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RegraFiscal update
   */
  export type RegraFiscalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    /**
     * The data needed to update a RegraFiscal.
     */
    data: XOR<RegraFiscalUpdateInput, RegraFiscalUncheckedUpdateInput>
    /**
     * Choose, which RegraFiscal to update.
     */
    where: RegraFiscalWhereUniqueInput
  }

  /**
   * RegraFiscal updateMany
   */
  export type RegraFiscalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RegraFiscals.
     */
    data: XOR<RegraFiscalUpdateManyMutationInput, RegraFiscalUncheckedUpdateManyInput>
    /**
     * Filter which RegraFiscals to update
     */
    where?: RegraFiscalWhereInput
    /**
     * Limit how many RegraFiscals to update.
     */
    limit?: number
  }

  /**
   * RegraFiscal updateManyAndReturn
   */
  export type RegraFiscalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * The data used to update RegraFiscals.
     */
    data: XOR<RegraFiscalUpdateManyMutationInput, RegraFiscalUncheckedUpdateManyInput>
    /**
     * Filter which RegraFiscals to update
     */
    where?: RegraFiscalWhereInput
    /**
     * Limit how many RegraFiscals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RegraFiscal upsert
   */
  export type RegraFiscalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    /**
     * The filter to search for the RegraFiscal to update in case it exists.
     */
    where: RegraFiscalWhereUniqueInput
    /**
     * In case the RegraFiscal found by the `where` argument doesn't exist, create a new RegraFiscal with this data.
     */
    create: XOR<RegraFiscalCreateInput, RegraFiscalUncheckedCreateInput>
    /**
     * In case the RegraFiscal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegraFiscalUpdateInput, RegraFiscalUncheckedUpdateInput>
  }

  /**
   * RegraFiscal delete
   */
  export type RegraFiscalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
    /**
     * Filter which RegraFiscal to delete.
     */
    where: RegraFiscalWhereUniqueInput
  }

  /**
   * RegraFiscal deleteMany
   */
  export type RegraFiscalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegraFiscals to delete
     */
    where?: RegraFiscalWhereInput
    /**
     * Limit how many RegraFiscals to delete.
     */
    limit?: number
  }

  /**
   * RegraFiscal.empresa
   */
  export type RegraFiscal$empresaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmpresaInclude<ExtArgs> | null
    where?: EmpresaWhereInput
  }

  /**
   * RegraFiscal without action
   */
  export type RegraFiscalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegraFiscal
     */
    select?: RegraFiscalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegraFiscal
     */
    omit?: RegraFiscalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegraFiscalInclude<ExtArgs> | null
  }


  /**
   * Model ExportacaoTxt
   */

  export type AggregateExportacaoTxt = {
    _count: ExportacaoTxtCountAggregateOutputType | null
    _avg: ExportacaoTxtAvgAggregateOutputType | null
    _sum: ExportacaoTxtSumAggregateOutputType | null
    _min: ExportacaoTxtMinAggregateOutputType | null
    _max: ExportacaoTxtMaxAggregateOutputType | null
  }

  export type ExportacaoTxtAvgAggregateOutputType = {
    totalDocumentos: number | null
  }

  export type ExportacaoTxtSumAggregateOutputType = {
    totalDocumentos: number | null
  }

  export type ExportacaoTxtMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    periodoInicio: Date | null
    periodoFim: Date | null
    status: $Enums.StatusExportacaoTxt | null
    objetoStorageTxt: string | null
    totalDocumentos: number | null
    erro: string | null
    criadoEm: Date | null
    concluidoEm: Date | null
  }

  export type ExportacaoTxtMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    periodoInicio: Date | null
    periodoFim: Date | null
    status: $Enums.StatusExportacaoTxt | null
    objetoStorageTxt: string | null
    totalDocumentos: number | null
    erro: string | null
    criadoEm: Date | null
    concluidoEm: Date | null
  }

  export type ExportacaoTxtCountAggregateOutputType = {
    id: number
    empresaId: number
    periodoInicio: number
    periodoFim: number
    status: number
    objetoStorageTxt: number
    totalDocumentos: number
    erro: number
    criadoEm: number
    concluidoEm: number
    _all: number
  }


  export type ExportacaoTxtAvgAggregateInputType = {
    totalDocumentos?: true
  }

  export type ExportacaoTxtSumAggregateInputType = {
    totalDocumentos?: true
  }

  export type ExportacaoTxtMinAggregateInputType = {
    id?: true
    empresaId?: true
    periodoInicio?: true
    periodoFim?: true
    status?: true
    objetoStorageTxt?: true
    totalDocumentos?: true
    erro?: true
    criadoEm?: true
    concluidoEm?: true
  }

  export type ExportacaoTxtMaxAggregateInputType = {
    id?: true
    empresaId?: true
    periodoInicio?: true
    periodoFim?: true
    status?: true
    objetoStorageTxt?: true
    totalDocumentos?: true
    erro?: true
    criadoEm?: true
    concluidoEm?: true
  }

  export type ExportacaoTxtCountAggregateInputType = {
    id?: true
    empresaId?: true
    periodoInicio?: true
    periodoFim?: true
    status?: true
    objetoStorageTxt?: true
    totalDocumentos?: true
    erro?: true
    criadoEm?: true
    concluidoEm?: true
    _all?: true
  }

  export type ExportacaoTxtAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExportacaoTxt to aggregate.
     */
    where?: ExportacaoTxtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExportacaoTxts to fetch.
     */
    orderBy?: ExportacaoTxtOrderByWithRelationInput | ExportacaoTxtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExportacaoTxtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExportacaoTxts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExportacaoTxts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExportacaoTxts
    **/
    _count?: true | ExportacaoTxtCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExportacaoTxtAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExportacaoTxtSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExportacaoTxtMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExportacaoTxtMaxAggregateInputType
  }

  export type GetExportacaoTxtAggregateType<T extends ExportacaoTxtAggregateArgs> = {
        [P in keyof T & keyof AggregateExportacaoTxt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExportacaoTxt[P]>
      : GetScalarType<T[P], AggregateExportacaoTxt[P]>
  }




  export type ExportacaoTxtGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExportacaoTxtWhereInput
    orderBy?: ExportacaoTxtOrderByWithAggregationInput | ExportacaoTxtOrderByWithAggregationInput[]
    by: ExportacaoTxtScalarFieldEnum[] | ExportacaoTxtScalarFieldEnum
    having?: ExportacaoTxtScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExportacaoTxtCountAggregateInputType | true
    _avg?: ExportacaoTxtAvgAggregateInputType
    _sum?: ExportacaoTxtSumAggregateInputType
    _min?: ExportacaoTxtMinAggregateInputType
    _max?: ExportacaoTxtMaxAggregateInputType
  }

  export type ExportacaoTxtGroupByOutputType = {
    id: string
    empresaId: string
    periodoInicio: Date
    periodoFim: Date
    status: $Enums.StatusExportacaoTxt
    objetoStorageTxt: string | null
    totalDocumentos: number
    erro: string | null
    criadoEm: Date
    concluidoEm: Date | null
    _count: ExportacaoTxtCountAggregateOutputType | null
    _avg: ExportacaoTxtAvgAggregateOutputType | null
    _sum: ExportacaoTxtSumAggregateOutputType | null
    _min: ExportacaoTxtMinAggregateOutputType | null
    _max: ExportacaoTxtMaxAggregateOutputType | null
  }

  type GetExportacaoTxtGroupByPayload<T extends ExportacaoTxtGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExportacaoTxtGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExportacaoTxtGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExportacaoTxtGroupByOutputType[P]>
            : GetScalarType<T[P], ExportacaoTxtGroupByOutputType[P]>
        }
      >
    >


  export type ExportacaoTxtSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    periodoInicio?: boolean
    periodoFim?: boolean
    status?: boolean
    objetoStorageTxt?: boolean
    totalDocumentos?: boolean
    erro?: boolean
    criadoEm?: boolean
    concluidoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exportacaoTxt"]>

  export type ExportacaoTxtSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    periodoInicio?: boolean
    periodoFim?: boolean
    status?: boolean
    objetoStorageTxt?: boolean
    totalDocumentos?: boolean
    erro?: boolean
    criadoEm?: boolean
    concluidoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exportacaoTxt"]>

  export type ExportacaoTxtSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    periodoInicio?: boolean
    periodoFim?: boolean
    status?: boolean
    objetoStorageTxt?: boolean
    totalDocumentos?: boolean
    erro?: boolean
    criadoEm?: boolean
    concluidoEm?: boolean
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exportacaoTxt"]>

  export type ExportacaoTxtSelectScalar = {
    id?: boolean
    empresaId?: boolean
    periodoInicio?: boolean
    periodoFim?: boolean
    status?: boolean
    objetoStorageTxt?: boolean
    totalDocumentos?: boolean
    erro?: boolean
    criadoEm?: boolean
    concluidoEm?: boolean
  }

  export type ExportacaoTxtOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "empresaId" | "periodoInicio" | "periodoFim" | "status" | "objetoStorageTxt" | "totalDocumentos" | "erro" | "criadoEm" | "concluidoEm", ExtArgs["result"]["exportacaoTxt"]>
  export type ExportacaoTxtInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type ExportacaoTxtIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type ExportacaoTxtIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $ExportacaoTxtPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExportacaoTxt"
    objects: {
      empresa: Prisma.$EmpresaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      empresaId: string
      periodoInicio: Date
      periodoFim: Date
      status: $Enums.StatusExportacaoTxt
      objetoStorageTxt: string | null
      totalDocumentos: number
      erro: string | null
      criadoEm: Date
      concluidoEm: Date | null
    }, ExtArgs["result"]["exportacaoTxt"]>
    composites: {}
  }

  type ExportacaoTxtGetPayload<S extends boolean | null | undefined | ExportacaoTxtDefaultArgs> = $Result.GetResult<Prisma.$ExportacaoTxtPayload, S>

  type ExportacaoTxtCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExportacaoTxtFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExportacaoTxtCountAggregateInputType | true
    }

  export interface ExportacaoTxtDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExportacaoTxt'], meta: { name: 'ExportacaoTxt' } }
    /**
     * Find zero or one ExportacaoTxt that matches the filter.
     * @param {ExportacaoTxtFindUniqueArgs} args - Arguments to find a ExportacaoTxt
     * @example
     * // Get one ExportacaoTxt
     * const exportacaoTxt = await prisma.exportacaoTxt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExportacaoTxtFindUniqueArgs>(args: SelectSubset<T, ExportacaoTxtFindUniqueArgs<ExtArgs>>): Prisma__ExportacaoTxtClient<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExportacaoTxt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExportacaoTxtFindUniqueOrThrowArgs} args - Arguments to find a ExportacaoTxt
     * @example
     * // Get one ExportacaoTxt
     * const exportacaoTxt = await prisma.exportacaoTxt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExportacaoTxtFindUniqueOrThrowArgs>(args: SelectSubset<T, ExportacaoTxtFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExportacaoTxtClient<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExportacaoTxt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportacaoTxtFindFirstArgs} args - Arguments to find a ExportacaoTxt
     * @example
     * // Get one ExportacaoTxt
     * const exportacaoTxt = await prisma.exportacaoTxt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExportacaoTxtFindFirstArgs>(args?: SelectSubset<T, ExportacaoTxtFindFirstArgs<ExtArgs>>): Prisma__ExportacaoTxtClient<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExportacaoTxt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportacaoTxtFindFirstOrThrowArgs} args - Arguments to find a ExportacaoTxt
     * @example
     * // Get one ExportacaoTxt
     * const exportacaoTxt = await prisma.exportacaoTxt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExportacaoTxtFindFirstOrThrowArgs>(args?: SelectSubset<T, ExportacaoTxtFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExportacaoTxtClient<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExportacaoTxts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportacaoTxtFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExportacaoTxts
     * const exportacaoTxts = await prisma.exportacaoTxt.findMany()
     * 
     * // Get first 10 ExportacaoTxts
     * const exportacaoTxts = await prisma.exportacaoTxt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exportacaoTxtWithIdOnly = await prisma.exportacaoTxt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExportacaoTxtFindManyArgs>(args?: SelectSubset<T, ExportacaoTxtFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExportacaoTxt.
     * @param {ExportacaoTxtCreateArgs} args - Arguments to create a ExportacaoTxt.
     * @example
     * // Create one ExportacaoTxt
     * const ExportacaoTxt = await prisma.exportacaoTxt.create({
     *   data: {
     *     // ... data to create a ExportacaoTxt
     *   }
     * })
     * 
     */
    create<T extends ExportacaoTxtCreateArgs>(args: SelectSubset<T, ExportacaoTxtCreateArgs<ExtArgs>>): Prisma__ExportacaoTxtClient<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExportacaoTxts.
     * @param {ExportacaoTxtCreateManyArgs} args - Arguments to create many ExportacaoTxts.
     * @example
     * // Create many ExportacaoTxts
     * const exportacaoTxt = await prisma.exportacaoTxt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExportacaoTxtCreateManyArgs>(args?: SelectSubset<T, ExportacaoTxtCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExportacaoTxts and returns the data saved in the database.
     * @param {ExportacaoTxtCreateManyAndReturnArgs} args - Arguments to create many ExportacaoTxts.
     * @example
     * // Create many ExportacaoTxts
     * const exportacaoTxt = await prisma.exportacaoTxt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExportacaoTxts and only return the `id`
     * const exportacaoTxtWithIdOnly = await prisma.exportacaoTxt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExportacaoTxtCreateManyAndReturnArgs>(args?: SelectSubset<T, ExportacaoTxtCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExportacaoTxt.
     * @param {ExportacaoTxtDeleteArgs} args - Arguments to delete one ExportacaoTxt.
     * @example
     * // Delete one ExportacaoTxt
     * const ExportacaoTxt = await prisma.exportacaoTxt.delete({
     *   where: {
     *     // ... filter to delete one ExportacaoTxt
     *   }
     * })
     * 
     */
    delete<T extends ExportacaoTxtDeleteArgs>(args: SelectSubset<T, ExportacaoTxtDeleteArgs<ExtArgs>>): Prisma__ExportacaoTxtClient<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExportacaoTxt.
     * @param {ExportacaoTxtUpdateArgs} args - Arguments to update one ExportacaoTxt.
     * @example
     * // Update one ExportacaoTxt
     * const exportacaoTxt = await prisma.exportacaoTxt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExportacaoTxtUpdateArgs>(args: SelectSubset<T, ExportacaoTxtUpdateArgs<ExtArgs>>): Prisma__ExportacaoTxtClient<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExportacaoTxts.
     * @param {ExportacaoTxtDeleteManyArgs} args - Arguments to filter ExportacaoTxts to delete.
     * @example
     * // Delete a few ExportacaoTxts
     * const { count } = await prisma.exportacaoTxt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExportacaoTxtDeleteManyArgs>(args?: SelectSubset<T, ExportacaoTxtDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExportacaoTxts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportacaoTxtUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExportacaoTxts
     * const exportacaoTxt = await prisma.exportacaoTxt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExportacaoTxtUpdateManyArgs>(args: SelectSubset<T, ExportacaoTxtUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExportacaoTxts and returns the data updated in the database.
     * @param {ExportacaoTxtUpdateManyAndReturnArgs} args - Arguments to update many ExportacaoTxts.
     * @example
     * // Update many ExportacaoTxts
     * const exportacaoTxt = await prisma.exportacaoTxt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExportacaoTxts and only return the `id`
     * const exportacaoTxtWithIdOnly = await prisma.exportacaoTxt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExportacaoTxtUpdateManyAndReturnArgs>(args: SelectSubset<T, ExportacaoTxtUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExportacaoTxt.
     * @param {ExportacaoTxtUpsertArgs} args - Arguments to update or create a ExportacaoTxt.
     * @example
     * // Update or create a ExportacaoTxt
     * const exportacaoTxt = await prisma.exportacaoTxt.upsert({
     *   create: {
     *     // ... data to create a ExportacaoTxt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExportacaoTxt we want to update
     *   }
     * })
     */
    upsert<T extends ExportacaoTxtUpsertArgs>(args: SelectSubset<T, ExportacaoTxtUpsertArgs<ExtArgs>>): Prisma__ExportacaoTxtClient<$Result.GetResult<Prisma.$ExportacaoTxtPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExportacaoTxts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportacaoTxtCountArgs} args - Arguments to filter ExportacaoTxts to count.
     * @example
     * // Count the number of ExportacaoTxts
     * const count = await prisma.exportacaoTxt.count({
     *   where: {
     *     // ... the filter for the ExportacaoTxts we want to count
     *   }
     * })
    **/
    count<T extends ExportacaoTxtCountArgs>(
      args?: Subset<T, ExportacaoTxtCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExportacaoTxtCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExportacaoTxt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportacaoTxtAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExportacaoTxtAggregateArgs>(args: Subset<T, ExportacaoTxtAggregateArgs>): Prisma.PrismaPromise<GetExportacaoTxtAggregateType<T>>

    /**
     * Group by ExportacaoTxt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExportacaoTxtGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExportacaoTxtGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExportacaoTxtGroupByArgs['orderBy'] }
        : { orderBy?: ExportacaoTxtGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExportacaoTxtGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExportacaoTxtGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExportacaoTxt model
   */
  readonly fields: ExportacaoTxtFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExportacaoTxt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExportacaoTxtClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExportacaoTxt model
   */
  interface ExportacaoTxtFieldRefs {
    readonly id: FieldRef<"ExportacaoTxt", 'String'>
    readonly empresaId: FieldRef<"ExportacaoTxt", 'String'>
    readonly periodoInicio: FieldRef<"ExportacaoTxt", 'DateTime'>
    readonly periodoFim: FieldRef<"ExportacaoTxt", 'DateTime'>
    readonly status: FieldRef<"ExportacaoTxt", 'StatusExportacaoTxt'>
    readonly objetoStorageTxt: FieldRef<"ExportacaoTxt", 'String'>
    readonly totalDocumentos: FieldRef<"ExportacaoTxt", 'Int'>
    readonly erro: FieldRef<"ExportacaoTxt", 'String'>
    readonly criadoEm: FieldRef<"ExportacaoTxt", 'DateTime'>
    readonly concluidoEm: FieldRef<"ExportacaoTxt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExportacaoTxt findUnique
   */
  export type ExportacaoTxtFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    /**
     * Filter, which ExportacaoTxt to fetch.
     */
    where: ExportacaoTxtWhereUniqueInput
  }

  /**
   * ExportacaoTxt findUniqueOrThrow
   */
  export type ExportacaoTxtFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    /**
     * Filter, which ExportacaoTxt to fetch.
     */
    where: ExportacaoTxtWhereUniqueInput
  }

  /**
   * ExportacaoTxt findFirst
   */
  export type ExportacaoTxtFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    /**
     * Filter, which ExportacaoTxt to fetch.
     */
    where?: ExportacaoTxtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExportacaoTxts to fetch.
     */
    orderBy?: ExportacaoTxtOrderByWithRelationInput | ExportacaoTxtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExportacaoTxts.
     */
    cursor?: ExportacaoTxtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExportacaoTxts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExportacaoTxts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExportacaoTxts.
     */
    distinct?: ExportacaoTxtScalarFieldEnum | ExportacaoTxtScalarFieldEnum[]
  }

  /**
   * ExportacaoTxt findFirstOrThrow
   */
  export type ExportacaoTxtFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    /**
     * Filter, which ExportacaoTxt to fetch.
     */
    where?: ExportacaoTxtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExportacaoTxts to fetch.
     */
    orderBy?: ExportacaoTxtOrderByWithRelationInput | ExportacaoTxtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExportacaoTxts.
     */
    cursor?: ExportacaoTxtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExportacaoTxts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExportacaoTxts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExportacaoTxts.
     */
    distinct?: ExportacaoTxtScalarFieldEnum | ExportacaoTxtScalarFieldEnum[]
  }

  /**
   * ExportacaoTxt findMany
   */
  export type ExportacaoTxtFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    /**
     * Filter, which ExportacaoTxts to fetch.
     */
    where?: ExportacaoTxtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExportacaoTxts to fetch.
     */
    orderBy?: ExportacaoTxtOrderByWithRelationInput | ExportacaoTxtOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExportacaoTxts.
     */
    cursor?: ExportacaoTxtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExportacaoTxts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExportacaoTxts.
     */
    skip?: number
    distinct?: ExportacaoTxtScalarFieldEnum | ExportacaoTxtScalarFieldEnum[]
  }

  /**
   * ExportacaoTxt create
   */
  export type ExportacaoTxtCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    /**
     * The data needed to create a ExportacaoTxt.
     */
    data: XOR<ExportacaoTxtCreateInput, ExportacaoTxtUncheckedCreateInput>
  }

  /**
   * ExportacaoTxt createMany
   */
  export type ExportacaoTxtCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExportacaoTxts.
     */
    data: ExportacaoTxtCreateManyInput | ExportacaoTxtCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExportacaoTxt createManyAndReturn
   */
  export type ExportacaoTxtCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * The data used to create many ExportacaoTxts.
     */
    data: ExportacaoTxtCreateManyInput | ExportacaoTxtCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExportacaoTxt update
   */
  export type ExportacaoTxtUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    /**
     * The data needed to update a ExportacaoTxt.
     */
    data: XOR<ExportacaoTxtUpdateInput, ExportacaoTxtUncheckedUpdateInput>
    /**
     * Choose, which ExportacaoTxt to update.
     */
    where: ExportacaoTxtWhereUniqueInput
  }

  /**
   * ExportacaoTxt updateMany
   */
  export type ExportacaoTxtUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExportacaoTxts.
     */
    data: XOR<ExportacaoTxtUpdateManyMutationInput, ExportacaoTxtUncheckedUpdateManyInput>
    /**
     * Filter which ExportacaoTxts to update
     */
    where?: ExportacaoTxtWhereInput
    /**
     * Limit how many ExportacaoTxts to update.
     */
    limit?: number
  }

  /**
   * ExportacaoTxt updateManyAndReturn
   */
  export type ExportacaoTxtUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * The data used to update ExportacaoTxts.
     */
    data: XOR<ExportacaoTxtUpdateManyMutationInput, ExportacaoTxtUncheckedUpdateManyInput>
    /**
     * Filter which ExportacaoTxts to update
     */
    where?: ExportacaoTxtWhereInput
    /**
     * Limit how many ExportacaoTxts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExportacaoTxt upsert
   */
  export type ExportacaoTxtUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    /**
     * The filter to search for the ExportacaoTxt to update in case it exists.
     */
    where: ExportacaoTxtWhereUniqueInput
    /**
     * In case the ExportacaoTxt found by the `where` argument doesn't exist, create a new ExportacaoTxt with this data.
     */
    create: XOR<ExportacaoTxtCreateInput, ExportacaoTxtUncheckedCreateInput>
    /**
     * In case the ExportacaoTxt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExportacaoTxtUpdateInput, ExportacaoTxtUncheckedUpdateInput>
  }

  /**
   * ExportacaoTxt delete
   */
  export type ExportacaoTxtDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
    /**
     * Filter which ExportacaoTxt to delete.
     */
    where: ExportacaoTxtWhereUniqueInput
  }

  /**
   * ExportacaoTxt deleteMany
   */
  export type ExportacaoTxtDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExportacaoTxts to delete
     */
    where?: ExportacaoTxtWhereInput
    /**
     * Limit how many ExportacaoTxts to delete.
     */
    limit?: number
  }

  /**
   * ExportacaoTxt without action
   */
  export type ExportacaoTxtDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExportacaoTxt
     */
    select?: ExportacaoTxtSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExportacaoTxt
     */
    omit?: ExportacaoTxtOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExportacaoTxtInclude<ExtArgs> | null
  }


  /**
   * Model Fatura
   */

  export type AggregateFatura = {
    _count: FaturaCountAggregateOutputType | null
    _avg: FaturaAvgAggregateOutputType | null
    _sum: FaturaSumAggregateOutputType | null
    _min: FaturaMinAggregateOutputType | null
    _max: FaturaMaxAggregateOutputType | null
  }

  export type FaturaAvgAggregateOutputType = {
    referenciaMes: number | null
    referenciaAno: number | null
    valorTotal: Decimal | null
  }

  export type FaturaSumAggregateOutputType = {
    referenciaMes: number | null
    referenciaAno: number | null
    valorTotal: Decimal | null
  }

  export type FaturaMinAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    referenciaMes: number | null
    referenciaAno: number | null
    valorTotal: Decimal | null
    status: $Enums.StatusFatura | null
    geradaEm: Date | null
    pagaEm: Date | null
  }

  export type FaturaMaxAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    referenciaMes: number | null
    referenciaAno: number | null
    valorTotal: Decimal | null
    status: $Enums.StatusFatura | null
    geradaEm: Date | null
    pagaEm: Date | null
  }

  export type FaturaCountAggregateOutputType = {
    id: number
    organizacaoId: number
    referenciaMes: number
    referenciaAno: number
    valorTotal: number
    status: number
    geradaEm: number
    pagaEm: number
    _all: number
  }


  export type FaturaAvgAggregateInputType = {
    referenciaMes?: true
    referenciaAno?: true
    valorTotal?: true
  }

  export type FaturaSumAggregateInputType = {
    referenciaMes?: true
    referenciaAno?: true
    valorTotal?: true
  }

  export type FaturaMinAggregateInputType = {
    id?: true
    organizacaoId?: true
    referenciaMes?: true
    referenciaAno?: true
    valorTotal?: true
    status?: true
    geradaEm?: true
    pagaEm?: true
  }

  export type FaturaMaxAggregateInputType = {
    id?: true
    organizacaoId?: true
    referenciaMes?: true
    referenciaAno?: true
    valorTotal?: true
    status?: true
    geradaEm?: true
    pagaEm?: true
  }

  export type FaturaCountAggregateInputType = {
    id?: true
    organizacaoId?: true
    referenciaMes?: true
    referenciaAno?: true
    valorTotal?: true
    status?: true
    geradaEm?: true
    pagaEm?: true
    _all?: true
  }

  export type FaturaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fatura to aggregate.
     */
    where?: FaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faturas to fetch.
     */
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Faturas
    **/
    _count?: true | FaturaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FaturaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FaturaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FaturaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FaturaMaxAggregateInputType
  }

  export type GetFaturaAggregateType<T extends FaturaAggregateArgs> = {
        [P in keyof T & keyof AggregateFatura]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFatura[P]>
      : GetScalarType<T[P], AggregateFatura[P]>
  }




  export type FaturaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FaturaWhereInput
    orderBy?: FaturaOrderByWithAggregationInput | FaturaOrderByWithAggregationInput[]
    by: FaturaScalarFieldEnum[] | FaturaScalarFieldEnum
    having?: FaturaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FaturaCountAggregateInputType | true
    _avg?: FaturaAvgAggregateInputType
    _sum?: FaturaSumAggregateInputType
    _min?: FaturaMinAggregateInputType
    _max?: FaturaMaxAggregateInputType
  }

  export type FaturaGroupByOutputType = {
    id: string
    organizacaoId: string
    referenciaMes: number
    referenciaAno: number
    valorTotal: Decimal
    status: $Enums.StatusFatura
    geradaEm: Date
    pagaEm: Date | null
    _count: FaturaCountAggregateOutputType | null
    _avg: FaturaAvgAggregateOutputType | null
    _sum: FaturaSumAggregateOutputType | null
    _min: FaturaMinAggregateOutputType | null
    _max: FaturaMaxAggregateOutputType | null
  }

  type GetFaturaGroupByPayload<T extends FaturaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FaturaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FaturaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FaturaGroupByOutputType[P]>
            : GetScalarType<T[P], FaturaGroupByOutputType[P]>
        }
      >
    >


  export type FaturaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    referenciaMes?: boolean
    referenciaAno?: boolean
    valorTotal?: boolean
    status?: boolean
    geradaEm?: boolean
    pagaEm?: boolean
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    itens?: boolean | Fatura$itensArgs<ExtArgs>
    _count?: boolean | FaturaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fatura"]>

  export type FaturaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    referenciaMes?: boolean
    referenciaAno?: boolean
    valorTotal?: boolean
    status?: boolean
    geradaEm?: boolean
    pagaEm?: boolean
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fatura"]>

  export type FaturaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    referenciaMes?: boolean
    referenciaAno?: boolean
    valorTotal?: boolean
    status?: boolean
    geradaEm?: boolean
    pagaEm?: boolean
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fatura"]>

  export type FaturaSelectScalar = {
    id?: boolean
    organizacaoId?: boolean
    referenciaMes?: boolean
    referenciaAno?: boolean
    valorTotal?: boolean
    status?: boolean
    geradaEm?: boolean
    pagaEm?: boolean
  }

  export type FaturaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizacaoId" | "referenciaMes" | "referenciaAno" | "valorTotal" | "status" | "geradaEm" | "pagaEm", ExtArgs["result"]["fatura"]>
  export type FaturaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
    itens?: boolean | Fatura$itensArgs<ExtArgs>
    _count?: boolean | FaturaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FaturaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
  }
  export type FaturaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | OrganizacaoDefaultArgs<ExtArgs>
  }

  export type $FaturaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fatura"
    objects: {
      organizacao: Prisma.$OrganizacaoPayload<ExtArgs>
      itens: Prisma.$ItemFaturaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizacaoId: string
      referenciaMes: number
      referenciaAno: number
      valorTotal: Prisma.Decimal
      status: $Enums.StatusFatura
      geradaEm: Date
      pagaEm: Date | null
    }, ExtArgs["result"]["fatura"]>
    composites: {}
  }

  type FaturaGetPayload<S extends boolean | null | undefined | FaturaDefaultArgs> = $Result.GetResult<Prisma.$FaturaPayload, S>

  type FaturaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FaturaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FaturaCountAggregateInputType | true
    }

  export interface FaturaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fatura'], meta: { name: 'Fatura' } }
    /**
     * Find zero or one Fatura that matches the filter.
     * @param {FaturaFindUniqueArgs} args - Arguments to find a Fatura
     * @example
     * // Get one Fatura
     * const fatura = await prisma.fatura.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FaturaFindUniqueArgs>(args: SelectSubset<T, FaturaFindUniqueArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fatura that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FaturaFindUniqueOrThrowArgs} args - Arguments to find a Fatura
     * @example
     * // Get one Fatura
     * const fatura = await prisma.fatura.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FaturaFindUniqueOrThrowArgs>(args: SelectSubset<T, FaturaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fatura that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaFindFirstArgs} args - Arguments to find a Fatura
     * @example
     * // Get one Fatura
     * const fatura = await prisma.fatura.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FaturaFindFirstArgs>(args?: SelectSubset<T, FaturaFindFirstArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fatura that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaFindFirstOrThrowArgs} args - Arguments to find a Fatura
     * @example
     * // Get one Fatura
     * const fatura = await prisma.fatura.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FaturaFindFirstOrThrowArgs>(args?: SelectSubset<T, FaturaFindFirstOrThrowArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Faturas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Faturas
     * const faturas = await prisma.fatura.findMany()
     * 
     * // Get first 10 Faturas
     * const faturas = await prisma.fatura.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const faturaWithIdOnly = await prisma.fatura.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FaturaFindManyArgs>(args?: SelectSubset<T, FaturaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fatura.
     * @param {FaturaCreateArgs} args - Arguments to create a Fatura.
     * @example
     * // Create one Fatura
     * const Fatura = await prisma.fatura.create({
     *   data: {
     *     // ... data to create a Fatura
     *   }
     * })
     * 
     */
    create<T extends FaturaCreateArgs>(args: SelectSubset<T, FaturaCreateArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Faturas.
     * @param {FaturaCreateManyArgs} args - Arguments to create many Faturas.
     * @example
     * // Create many Faturas
     * const fatura = await prisma.fatura.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FaturaCreateManyArgs>(args?: SelectSubset<T, FaturaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Faturas and returns the data saved in the database.
     * @param {FaturaCreateManyAndReturnArgs} args - Arguments to create many Faturas.
     * @example
     * // Create many Faturas
     * const fatura = await prisma.fatura.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Faturas and only return the `id`
     * const faturaWithIdOnly = await prisma.fatura.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FaturaCreateManyAndReturnArgs>(args?: SelectSubset<T, FaturaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fatura.
     * @param {FaturaDeleteArgs} args - Arguments to delete one Fatura.
     * @example
     * // Delete one Fatura
     * const Fatura = await prisma.fatura.delete({
     *   where: {
     *     // ... filter to delete one Fatura
     *   }
     * })
     * 
     */
    delete<T extends FaturaDeleteArgs>(args: SelectSubset<T, FaturaDeleteArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fatura.
     * @param {FaturaUpdateArgs} args - Arguments to update one Fatura.
     * @example
     * // Update one Fatura
     * const fatura = await prisma.fatura.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FaturaUpdateArgs>(args: SelectSubset<T, FaturaUpdateArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Faturas.
     * @param {FaturaDeleteManyArgs} args - Arguments to filter Faturas to delete.
     * @example
     * // Delete a few Faturas
     * const { count } = await prisma.fatura.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FaturaDeleteManyArgs>(args?: SelectSubset<T, FaturaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Faturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Faturas
     * const fatura = await prisma.fatura.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FaturaUpdateManyArgs>(args: SelectSubset<T, FaturaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Faturas and returns the data updated in the database.
     * @param {FaturaUpdateManyAndReturnArgs} args - Arguments to update many Faturas.
     * @example
     * // Update many Faturas
     * const fatura = await prisma.fatura.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Faturas and only return the `id`
     * const faturaWithIdOnly = await prisma.fatura.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FaturaUpdateManyAndReturnArgs>(args: SelectSubset<T, FaturaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fatura.
     * @param {FaturaUpsertArgs} args - Arguments to update or create a Fatura.
     * @example
     * // Update or create a Fatura
     * const fatura = await prisma.fatura.upsert({
     *   create: {
     *     // ... data to create a Fatura
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fatura we want to update
     *   }
     * })
     */
    upsert<T extends FaturaUpsertArgs>(args: SelectSubset<T, FaturaUpsertArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Faturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaCountArgs} args - Arguments to filter Faturas to count.
     * @example
     * // Count the number of Faturas
     * const count = await prisma.fatura.count({
     *   where: {
     *     // ... the filter for the Faturas we want to count
     *   }
     * })
    **/
    count<T extends FaturaCountArgs>(
      args?: Subset<T, FaturaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FaturaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FaturaAggregateArgs>(args: Subset<T, FaturaAggregateArgs>): Prisma.PrismaPromise<GetFaturaAggregateType<T>>

    /**
     * Group by Fatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FaturaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FaturaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FaturaGroupByArgs['orderBy'] }
        : { orderBy?: FaturaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FaturaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFaturaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fatura model
   */
  readonly fields: FaturaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fatura.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FaturaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizacao<T extends OrganizacaoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizacaoDefaultArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    itens<T extends Fatura$itensArgs<ExtArgs> = {}>(args?: Subset<T, Fatura$itensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fatura model
   */
  interface FaturaFieldRefs {
    readonly id: FieldRef<"Fatura", 'String'>
    readonly organizacaoId: FieldRef<"Fatura", 'String'>
    readonly referenciaMes: FieldRef<"Fatura", 'Int'>
    readonly referenciaAno: FieldRef<"Fatura", 'Int'>
    readonly valorTotal: FieldRef<"Fatura", 'Decimal'>
    readonly status: FieldRef<"Fatura", 'StatusFatura'>
    readonly geradaEm: FieldRef<"Fatura", 'DateTime'>
    readonly pagaEm: FieldRef<"Fatura", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fatura findUnique
   */
  export type FaturaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Fatura to fetch.
     */
    where: FaturaWhereUniqueInput
  }

  /**
   * Fatura findUniqueOrThrow
   */
  export type FaturaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Fatura to fetch.
     */
    where: FaturaWhereUniqueInput
  }

  /**
   * Fatura findFirst
   */
  export type FaturaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Fatura to fetch.
     */
    where?: FaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faturas to fetch.
     */
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Faturas.
     */
    cursor?: FaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Faturas.
     */
    distinct?: FaturaScalarFieldEnum | FaturaScalarFieldEnum[]
  }

  /**
   * Fatura findFirstOrThrow
   */
  export type FaturaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Fatura to fetch.
     */
    where?: FaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faturas to fetch.
     */
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Faturas.
     */
    cursor?: FaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Faturas.
     */
    distinct?: FaturaScalarFieldEnum | FaturaScalarFieldEnum[]
  }

  /**
   * Fatura findMany
   */
  export type FaturaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter, which Faturas to fetch.
     */
    where?: FaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faturas to fetch.
     */
    orderBy?: FaturaOrderByWithRelationInput | FaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Faturas.
     */
    cursor?: FaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faturas.
     */
    skip?: number
    distinct?: FaturaScalarFieldEnum | FaturaScalarFieldEnum[]
  }

  /**
   * Fatura create
   */
  export type FaturaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * The data needed to create a Fatura.
     */
    data: XOR<FaturaCreateInput, FaturaUncheckedCreateInput>
  }

  /**
   * Fatura createMany
   */
  export type FaturaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Faturas.
     */
    data: FaturaCreateManyInput | FaturaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fatura createManyAndReturn
   */
  export type FaturaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * The data used to create many Faturas.
     */
    data: FaturaCreateManyInput | FaturaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fatura update
   */
  export type FaturaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * The data needed to update a Fatura.
     */
    data: XOR<FaturaUpdateInput, FaturaUncheckedUpdateInput>
    /**
     * Choose, which Fatura to update.
     */
    where: FaturaWhereUniqueInput
  }

  /**
   * Fatura updateMany
   */
  export type FaturaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Faturas.
     */
    data: XOR<FaturaUpdateManyMutationInput, FaturaUncheckedUpdateManyInput>
    /**
     * Filter which Faturas to update
     */
    where?: FaturaWhereInput
    /**
     * Limit how many Faturas to update.
     */
    limit?: number
  }

  /**
   * Fatura updateManyAndReturn
   */
  export type FaturaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * The data used to update Faturas.
     */
    data: XOR<FaturaUpdateManyMutationInput, FaturaUncheckedUpdateManyInput>
    /**
     * Filter which Faturas to update
     */
    where?: FaturaWhereInput
    /**
     * Limit how many Faturas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fatura upsert
   */
  export type FaturaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * The filter to search for the Fatura to update in case it exists.
     */
    where: FaturaWhereUniqueInput
    /**
     * In case the Fatura found by the `where` argument doesn't exist, create a new Fatura with this data.
     */
    create: XOR<FaturaCreateInput, FaturaUncheckedCreateInput>
    /**
     * In case the Fatura was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FaturaUpdateInput, FaturaUncheckedUpdateInput>
  }

  /**
   * Fatura delete
   */
  export type FaturaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
    /**
     * Filter which Fatura to delete.
     */
    where: FaturaWhereUniqueInput
  }

  /**
   * Fatura deleteMany
   */
  export type FaturaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Faturas to delete
     */
    where?: FaturaWhereInput
    /**
     * Limit how many Faturas to delete.
     */
    limit?: number
  }

  /**
   * Fatura.itens
   */
  export type Fatura$itensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    where?: ItemFaturaWhereInput
    orderBy?: ItemFaturaOrderByWithRelationInput | ItemFaturaOrderByWithRelationInput[]
    cursor?: ItemFaturaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemFaturaScalarFieldEnum | ItemFaturaScalarFieldEnum[]
  }

  /**
   * Fatura without action
   */
  export type FaturaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fatura
     */
    select?: FaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fatura
     */
    omit?: FaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FaturaInclude<ExtArgs> | null
  }


  /**
   * Model ItemFatura
   */

  export type AggregateItemFatura = {
    _count: ItemFaturaCountAggregateOutputType | null
    _avg: ItemFaturaAvgAggregateOutputType | null
    _sum: ItemFaturaSumAggregateOutputType | null
    _min: ItemFaturaMinAggregateOutputType | null
    _max: ItemFaturaMaxAggregateOutputType | null
  }

  export type ItemFaturaAvgAggregateOutputType = {
    valor: Decimal | null
  }

  export type ItemFaturaSumAggregateOutputType = {
    valor: Decimal | null
  }

  export type ItemFaturaMinAggregateOutputType = {
    id: string | null
    faturaId: string | null
    empresaId: string | null
    valor: Decimal | null
  }

  export type ItemFaturaMaxAggregateOutputType = {
    id: string | null
    faturaId: string | null
    empresaId: string | null
    valor: Decimal | null
  }

  export type ItemFaturaCountAggregateOutputType = {
    id: number
    faturaId: number
    empresaId: number
    valor: number
    _all: number
  }


  export type ItemFaturaAvgAggregateInputType = {
    valor?: true
  }

  export type ItemFaturaSumAggregateInputType = {
    valor?: true
  }

  export type ItemFaturaMinAggregateInputType = {
    id?: true
    faturaId?: true
    empresaId?: true
    valor?: true
  }

  export type ItemFaturaMaxAggregateInputType = {
    id?: true
    faturaId?: true
    empresaId?: true
    valor?: true
  }

  export type ItemFaturaCountAggregateInputType = {
    id?: true
    faturaId?: true
    empresaId?: true
    valor?: true
    _all?: true
  }

  export type ItemFaturaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFatura to aggregate.
     */
    where?: ItemFaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFaturas to fetch.
     */
    orderBy?: ItemFaturaOrderByWithRelationInput | ItemFaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemFaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFaturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemFaturas
    **/
    _count?: true | ItemFaturaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemFaturaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemFaturaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemFaturaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemFaturaMaxAggregateInputType
  }

  export type GetItemFaturaAggregateType<T extends ItemFaturaAggregateArgs> = {
        [P in keyof T & keyof AggregateItemFatura]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemFatura[P]>
      : GetScalarType<T[P], AggregateItemFatura[P]>
  }




  export type ItemFaturaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFaturaWhereInput
    orderBy?: ItemFaturaOrderByWithAggregationInput | ItemFaturaOrderByWithAggregationInput[]
    by: ItemFaturaScalarFieldEnum[] | ItemFaturaScalarFieldEnum
    having?: ItemFaturaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemFaturaCountAggregateInputType | true
    _avg?: ItemFaturaAvgAggregateInputType
    _sum?: ItemFaturaSumAggregateInputType
    _min?: ItemFaturaMinAggregateInputType
    _max?: ItemFaturaMaxAggregateInputType
  }

  export type ItemFaturaGroupByOutputType = {
    id: string
    faturaId: string
    empresaId: string
    valor: Decimal
    _count: ItemFaturaCountAggregateOutputType | null
    _avg: ItemFaturaAvgAggregateOutputType | null
    _sum: ItemFaturaSumAggregateOutputType | null
    _min: ItemFaturaMinAggregateOutputType | null
    _max: ItemFaturaMaxAggregateOutputType | null
  }

  type GetItemFaturaGroupByPayload<T extends ItemFaturaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemFaturaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemFaturaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemFaturaGroupByOutputType[P]>
            : GetScalarType<T[P], ItemFaturaGroupByOutputType[P]>
        }
      >
    >


  export type ItemFaturaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    faturaId?: boolean
    empresaId?: boolean
    valor?: boolean
    fatura?: boolean | FaturaDefaultArgs<ExtArgs>
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFatura"]>

  export type ItemFaturaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    faturaId?: boolean
    empresaId?: boolean
    valor?: boolean
    fatura?: boolean | FaturaDefaultArgs<ExtArgs>
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFatura"]>

  export type ItemFaturaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    faturaId?: boolean
    empresaId?: boolean
    valor?: boolean
    fatura?: boolean | FaturaDefaultArgs<ExtArgs>
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFatura"]>

  export type ItemFaturaSelectScalar = {
    id?: boolean
    faturaId?: boolean
    empresaId?: boolean
    valor?: boolean
  }

  export type ItemFaturaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "faturaId" | "empresaId" | "valor", ExtArgs["result"]["itemFatura"]>
  export type ItemFaturaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fatura?: boolean | FaturaDefaultArgs<ExtArgs>
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type ItemFaturaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fatura?: boolean | FaturaDefaultArgs<ExtArgs>
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }
  export type ItemFaturaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fatura?: boolean | FaturaDefaultArgs<ExtArgs>
    empresa?: boolean | EmpresaDefaultArgs<ExtArgs>
  }

  export type $ItemFaturaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemFatura"
    objects: {
      fatura: Prisma.$FaturaPayload<ExtArgs>
      empresa: Prisma.$EmpresaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      faturaId: string
      empresaId: string
      valor: Prisma.Decimal
    }, ExtArgs["result"]["itemFatura"]>
    composites: {}
  }

  type ItemFaturaGetPayload<S extends boolean | null | undefined | ItemFaturaDefaultArgs> = $Result.GetResult<Prisma.$ItemFaturaPayload, S>

  type ItemFaturaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFaturaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemFaturaCountAggregateInputType | true
    }

  export interface ItemFaturaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemFatura'], meta: { name: 'ItemFatura' } }
    /**
     * Find zero or one ItemFatura that matches the filter.
     * @param {ItemFaturaFindUniqueArgs} args - Arguments to find a ItemFatura
     * @example
     * // Get one ItemFatura
     * const itemFatura = await prisma.itemFatura.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFaturaFindUniqueArgs>(args: SelectSubset<T, ItemFaturaFindUniqueArgs<ExtArgs>>): Prisma__ItemFaturaClient<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemFatura that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFaturaFindUniqueOrThrowArgs} args - Arguments to find a ItemFatura
     * @example
     * // Get one ItemFatura
     * const itemFatura = await prisma.itemFatura.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFaturaFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFaturaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemFaturaClient<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFatura that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFaturaFindFirstArgs} args - Arguments to find a ItemFatura
     * @example
     * // Get one ItemFatura
     * const itemFatura = await prisma.itemFatura.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFaturaFindFirstArgs>(args?: SelectSubset<T, ItemFaturaFindFirstArgs<ExtArgs>>): Prisma__ItemFaturaClient<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFatura that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFaturaFindFirstOrThrowArgs} args - Arguments to find a ItemFatura
     * @example
     * // Get one ItemFatura
     * const itemFatura = await prisma.itemFatura.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFaturaFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFaturaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemFaturaClient<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemFaturas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFaturaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemFaturas
     * const itemFaturas = await prisma.itemFatura.findMany()
     * 
     * // Get first 10 ItemFaturas
     * const itemFaturas = await prisma.itemFatura.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemFaturaWithIdOnly = await prisma.itemFatura.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFaturaFindManyArgs>(args?: SelectSubset<T, ItemFaturaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemFatura.
     * @param {ItemFaturaCreateArgs} args - Arguments to create a ItemFatura.
     * @example
     * // Create one ItemFatura
     * const ItemFatura = await prisma.itemFatura.create({
     *   data: {
     *     // ... data to create a ItemFatura
     *   }
     * })
     * 
     */
    create<T extends ItemFaturaCreateArgs>(args: SelectSubset<T, ItemFaturaCreateArgs<ExtArgs>>): Prisma__ItemFaturaClient<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemFaturas.
     * @param {ItemFaturaCreateManyArgs} args - Arguments to create many ItemFaturas.
     * @example
     * // Create many ItemFaturas
     * const itemFatura = await prisma.itemFatura.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemFaturaCreateManyArgs>(args?: SelectSubset<T, ItemFaturaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemFaturas and returns the data saved in the database.
     * @param {ItemFaturaCreateManyAndReturnArgs} args - Arguments to create many ItemFaturas.
     * @example
     * // Create many ItemFaturas
     * const itemFatura = await prisma.itemFatura.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemFaturas and only return the `id`
     * const itemFaturaWithIdOnly = await prisma.itemFatura.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemFaturaCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemFaturaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemFatura.
     * @param {ItemFaturaDeleteArgs} args - Arguments to delete one ItemFatura.
     * @example
     * // Delete one ItemFatura
     * const ItemFatura = await prisma.itemFatura.delete({
     *   where: {
     *     // ... filter to delete one ItemFatura
     *   }
     * })
     * 
     */
    delete<T extends ItemFaturaDeleteArgs>(args: SelectSubset<T, ItemFaturaDeleteArgs<ExtArgs>>): Prisma__ItemFaturaClient<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemFatura.
     * @param {ItemFaturaUpdateArgs} args - Arguments to update one ItemFatura.
     * @example
     * // Update one ItemFatura
     * const itemFatura = await prisma.itemFatura.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemFaturaUpdateArgs>(args: SelectSubset<T, ItemFaturaUpdateArgs<ExtArgs>>): Prisma__ItemFaturaClient<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemFaturas.
     * @param {ItemFaturaDeleteManyArgs} args - Arguments to filter ItemFaturas to delete.
     * @example
     * // Delete a few ItemFaturas
     * const { count } = await prisma.itemFatura.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemFaturaDeleteManyArgs>(args?: SelectSubset<T, ItemFaturaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemFaturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFaturaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemFaturas
     * const itemFatura = await prisma.itemFatura.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemFaturaUpdateManyArgs>(args: SelectSubset<T, ItemFaturaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemFaturas and returns the data updated in the database.
     * @param {ItemFaturaUpdateManyAndReturnArgs} args - Arguments to update many ItemFaturas.
     * @example
     * // Update many ItemFaturas
     * const itemFatura = await prisma.itemFatura.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItemFaturas and only return the `id`
     * const itemFaturaWithIdOnly = await prisma.itemFatura.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemFaturaUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemFaturaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItemFatura.
     * @param {ItemFaturaUpsertArgs} args - Arguments to update or create a ItemFatura.
     * @example
     * // Update or create a ItemFatura
     * const itemFatura = await prisma.itemFatura.upsert({
     *   create: {
     *     // ... data to create a ItemFatura
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemFatura we want to update
     *   }
     * })
     */
    upsert<T extends ItemFaturaUpsertArgs>(args: SelectSubset<T, ItemFaturaUpsertArgs<ExtArgs>>): Prisma__ItemFaturaClient<$Result.GetResult<Prisma.$ItemFaturaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemFaturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFaturaCountArgs} args - Arguments to filter ItemFaturas to count.
     * @example
     * // Count the number of ItemFaturas
     * const count = await prisma.itemFatura.count({
     *   where: {
     *     // ... the filter for the ItemFaturas we want to count
     *   }
     * })
    **/
    count<T extends ItemFaturaCountArgs>(
      args?: Subset<T, ItemFaturaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemFaturaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemFatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFaturaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemFaturaAggregateArgs>(args: Subset<T, ItemFaturaAggregateArgs>): Prisma.PrismaPromise<GetItemFaturaAggregateType<T>>

    /**
     * Group by ItemFatura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFaturaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemFaturaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemFaturaGroupByArgs['orderBy'] }
        : { orderBy?: ItemFaturaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemFaturaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemFaturaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemFatura model
   */
  readonly fields: ItemFaturaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemFatura.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemFaturaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fatura<T extends FaturaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FaturaDefaultArgs<ExtArgs>>): Prisma__FaturaClient<$Result.GetResult<Prisma.$FaturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    empresa<T extends EmpresaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaDefaultArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemFatura model
   */
  interface ItemFaturaFieldRefs {
    readonly id: FieldRef<"ItemFatura", 'String'>
    readonly faturaId: FieldRef<"ItemFatura", 'String'>
    readonly empresaId: FieldRef<"ItemFatura", 'String'>
    readonly valor: FieldRef<"ItemFatura", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * ItemFatura findUnique
   */
  export type ItemFaturaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFatura to fetch.
     */
    where: ItemFaturaWhereUniqueInput
  }

  /**
   * ItemFatura findUniqueOrThrow
   */
  export type ItemFaturaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFatura to fetch.
     */
    where: ItemFaturaWhereUniqueInput
  }

  /**
   * ItemFatura findFirst
   */
  export type ItemFaturaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFatura to fetch.
     */
    where?: ItemFaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFaturas to fetch.
     */
    orderBy?: ItemFaturaOrderByWithRelationInput | ItemFaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFaturas.
     */
    cursor?: ItemFaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFaturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFaturas.
     */
    distinct?: ItemFaturaScalarFieldEnum | ItemFaturaScalarFieldEnum[]
  }

  /**
   * ItemFatura findFirstOrThrow
   */
  export type ItemFaturaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFatura to fetch.
     */
    where?: ItemFaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFaturas to fetch.
     */
    orderBy?: ItemFaturaOrderByWithRelationInput | ItemFaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFaturas.
     */
    cursor?: ItemFaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFaturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFaturas.
     */
    distinct?: ItemFaturaScalarFieldEnum | ItemFaturaScalarFieldEnum[]
  }

  /**
   * ItemFatura findMany
   */
  export type ItemFaturaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFaturas to fetch.
     */
    where?: ItemFaturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFaturas to fetch.
     */
    orderBy?: ItemFaturaOrderByWithRelationInput | ItemFaturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemFaturas.
     */
    cursor?: ItemFaturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFaturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFaturas.
     */
    skip?: number
    distinct?: ItemFaturaScalarFieldEnum | ItemFaturaScalarFieldEnum[]
  }

  /**
   * ItemFatura create
   */
  export type ItemFaturaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemFatura.
     */
    data: XOR<ItemFaturaCreateInput, ItemFaturaUncheckedCreateInput>
  }

  /**
   * ItemFatura createMany
   */
  export type ItemFaturaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemFaturas.
     */
    data: ItemFaturaCreateManyInput | ItemFaturaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemFatura createManyAndReturn
   */
  export type ItemFaturaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * The data used to create many ItemFaturas.
     */
    data: ItemFaturaCreateManyInput | ItemFaturaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemFatura update
   */
  export type ItemFaturaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemFatura.
     */
    data: XOR<ItemFaturaUpdateInput, ItemFaturaUncheckedUpdateInput>
    /**
     * Choose, which ItemFatura to update.
     */
    where: ItemFaturaWhereUniqueInput
  }

  /**
   * ItemFatura updateMany
   */
  export type ItemFaturaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemFaturas.
     */
    data: XOR<ItemFaturaUpdateManyMutationInput, ItemFaturaUncheckedUpdateManyInput>
    /**
     * Filter which ItemFaturas to update
     */
    where?: ItemFaturaWhereInput
    /**
     * Limit how many ItemFaturas to update.
     */
    limit?: number
  }

  /**
   * ItemFatura updateManyAndReturn
   */
  export type ItemFaturaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * The data used to update ItemFaturas.
     */
    data: XOR<ItemFaturaUpdateManyMutationInput, ItemFaturaUncheckedUpdateManyInput>
    /**
     * Filter which ItemFaturas to update
     */
    where?: ItemFaturaWhereInput
    /**
     * Limit how many ItemFaturas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemFatura upsert
   */
  export type ItemFaturaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemFatura to update in case it exists.
     */
    where: ItemFaturaWhereUniqueInput
    /**
     * In case the ItemFatura found by the `where` argument doesn't exist, create a new ItemFatura with this data.
     */
    create: XOR<ItemFaturaCreateInput, ItemFaturaUncheckedCreateInput>
    /**
     * In case the ItemFatura was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemFaturaUpdateInput, ItemFaturaUncheckedUpdateInput>
  }

  /**
   * ItemFatura delete
   */
  export type ItemFaturaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
    /**
     * Filter which ItemFatura to delete.
     */
    where: ItemFaturaWhereUniqueInput
  }

  /**
   * ItemFatura deleteMany
   */
  export type ItemFaturaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFaturas to delete
     */
    where?: ItemFaturaWhereInput
    /**
     * Limit how many ItemFaturas to delete.
     */
    limit?: number
  }

  /**
   * ItemFatura without action
   */
  export type ItemFaturaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFatura
     */
    select?: ItemFaturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFatura
     */
    omit?: ItemFaturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFaturaInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    usuarioId: string | null
    acao: string | null
    entidade: string | null
    entidadeId: string | null
    criadoEm: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    organizacaoId: string | null
    usuarioId: string | null
    acao: string | null
    entidade: string | null
    entidadeId: string | null
    criadoEm: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    organizacaoId: number
    usuarioId: number
    acao: number
    entidade: number
    entidadeId: number
    detalhes: number
    criadoEm: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    organizacaoId?: true
    usuarioId?: true
    acao?: true
    entidade?: true
    entidadeId?: true
    criadoEm?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    organizacaoId?: true
    usuarioId?: true
    acao?: true
    entidade?: true
    entidadeId?: true
    criadoEm?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    organizacaoId?: true
    usuarioId?: true
    acao?: true
    entidade?: true
    entidadeId?: true
    detalhes?: true
    criadoEm?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    organizacaoId: string | null
    usuarioId: string | null
    acao: string
    entidade: string
    entidadeId: string | null
    detalhes: JsonValue | null
    criadoEm: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    usuarioId?: boolean
    acao?: boolean
    entidade?: boolean
    entidadeId?: boolean
    detalhes?: boolean
    criadoEm?: boolean
    organizacao?: boolean | AuditLog$organizacaoArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    usuarioId?: boolean
    acao?: boolean
    entidade?: boolean
    entidadeId?: boolean
    detalhes?: boolean
    criadoEm?: boolean
    organizacao?: boolean | AuditLog$organizacaoArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizacaoId?: boolean
    usuarioId?: boolean
    acao?: boolean
    entidade?: boolean
    entidadeId?: boolean
    detalhes?: boolean
    criadoEm?: boolean
    organizacao?: boolean | AuditLog$organizacaoArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    organizacaoId?: boolean
    usuarioId?: boolean
    acao?: boolean
    entidade?: boolean
    entidadeId?: boolean
    detalhes?: boolean
    criadoEm?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizacaoId" | "usuarioId" | "acao" | "entidade" | "entidadeId" | "detalhes" | "criadoEm", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | AuditLog$organizacaoArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | AuditLog$organizacaoArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizacao?: boolean | AuditLog$organizacaoArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      organizacao: Prisma.$OrganizacaoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizacaoId: string | null
      usuarioId: string | null
      acao: string
      entidade: string
      entidadeId: string | null
      detalhes: Prisma.JsonValue | null
      criadoEm: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizacao<T extends AuditLog$organizacaoArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$organizacaoArgs<ExtArgs>>): Prisma__OrganizacaoClient<$Result.GetResult<Prisma.$OrganizacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly organizacaoId: FieldRef<"AuditLog", 'String'>
    readonly usuarioId: FieldRef<"AuditLog", 'String'>
    readonly acao: FieldRef<"AuditLog", 'String'>
    readonly entidade: FieldRef<"AuditLog", 'String'>
    readonly entidadeId: FieldRef<"AuditLog", 'String'>
    readonly detalhes: FieldRef<"AuditLog", 'Json'>
    readonly criadoEm: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.organizacao
   */
  export type AuditLog$organizacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organizacao
     */
    select?: OrganizacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organizacao
     */
    omit?: OrganizacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizacaoInclude<ExtArgs> | null
    where?: OrganizacaoWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizacaoScalarFieldEnum: {
    id: 'id',
    razaoSocial: 'razaoSocial',
    cnpj: 'cnpj',
    emailContato: 'emailContato',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type OrganizacaoScalarFieldEnum = (typeof OrganizacaoScalarFieldEnum)[keyof typeof OrganizacaoScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    organizacaoId: 'organizacaoId',
    nome: 'nome',
    email: 'email',
    senhaHash: 'senhaHash',
    papel: 'papel',
    ativo: 'ativo',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const EmpresaScalarFieldEnum: {
    id: 'id',
    organizacaoId: 'organizacaoId',
    cnpj: 'cnpj',
    razaoSocial: 'razaoSocial',
    uf: 'uf',
    codigoUf: 'codigoUf',
    ambiente: 'ambiente',
    status: 'status',
    ativadaEm: 'ativadaEm',
    desativadaEm: 'desativadaEm',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type EmpresaScalarFieldEnum = (typeof EmpresaScalarFieldEnum)[keyof typeof EmpresaScalarFieldEnum]


  export const NsuControleScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    ultimoNsu: 'ultimoNsu',
    atualizadoEm: 'atualizadoEm'
  };

  export type NsuControleScalarFieldEnum = (typeof NsuControleScalarFieldEnum)[keyof typeof NsuControleScalarFieldEnum]


  export const CertificadoScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    nomeArquivoOriginal: 'nomeArquivoOriginal',
    objetoStorage: 'objetoStorage',
    senhaCriptografada: 'senhaCriptografada',
    ivCriptografia: 'ivCriptografia',
    validoAte: 'validoAte',
    alertaVencimentoEnviado: 'alertaVencimentoEnviado',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type CertificadoScalarFieldEnum = (typeof CertificadoScalarFieldEnum)[keyof typeof CertificadoScalarFieldEnum]


  export const DocumentoFiscalScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    chaveAcesso: 'chaveAcesso',
    tipo: 'tipo',
    direcao: 'direcao',
    nsu: 'nsu',
    status: 'status',
    cfop: 'cfop',
    objetoStorageXml: 'objetoStorageXml',
    emitidoEm: 'emitidoEm',
    recebidoEm: 'recebidoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type DocumentoFiscalScalarFieldEnum = (typeof DocumentoFiscalScalarFieldEnum)[keyof typeof DocumentoFiscalScalarFieldEnum]


  export const ManifestacaoEventoScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    documentoFiscalId: 'documentoFiscalId',
    tipoEvento: 'tipoEvento',
    status: 'status',
    protocoloSefaz: 'protocoloSefaz',
    motivoSefaz: 'motivoSefaz',
    enviadoEm: 'enviadoEm',
    criadoEm: 'criadoEm'
  };

  export type ManifestacaoEventoScalarFieldEnum = (typeof ManifestacaoEventoScalarFieldEnum)[keyof typeof ManifestacaoEventoScalarFieldEnum]


  export const RegraFiscalScalarFieldEnum: {
    id: 'id',
    organizacaoId: 'organizacaoId',
    empresaId: 'empresaId',
    cfopEntrada: 'cfopEntrada',
    descricao: 'descricao',
    observacao: 'observacao',
    acumulador: 'acumulador',
    ativa: 'ativa',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type RegraFiscalScalarFieldEnum = (typeof RegraFiscalScalarFieldEnum)[keyof typeof RegraFiscalScalarFieldEnum]


  export const ExportacaoTxtScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    periodoInicio: 'periodoInicio',
    periodoFim: 'periodoFim',
    status: 'status',
    objetoStorageTxt: 'objetoStorageTxt',
    totalDocumentos: 'totalDocumentos',
    erro: 'erro',
    criadoEm: 'criadoEm',
    concluidoEm: 'concluidoEm'
  };

  export type ExportacaoTxtScalarFieldEnum = (typeof ExportacaoTxtScalarFieldEnum)[keyof typeof ExportacaoTxtScalarFieldEnum]


  export const FaturaScalarFieldEnum: {
    id: 'id',
    organizacaoId: 'organizacaoId',
    referenciaMes: 'referenciaMes',
    referenciaAno: 'referenciaAno',
    valorTotal: 'valorTotal',
    status: 'status',
    geradaEm: 'geradaEm',
    pagaEm: 'pagaEm'
  };

  export type FaturaScalarFieldEnum = (typeof FaturaScalarFieldEnum)[keyof typeof FaturaScalarFieldEnum]


  export const ItemFaturaScalarFieldEnum: {
    id: 'id',
    faturaId: 'faturaId',
    empresaId: 'empresaId',
    valor: 'valor'
  };

  export type ItemFaturaScalarFieldEnum = (typeof ItemFaturaScalarFieldEnum)[keyof typeof ItemFaturaScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    organizacaoId: 'organizacaoId',
    usuarioId: 'usuarioId',
    acao: 'acao',
    entidade: 'entidade',
    entidadeId: 'entidadeId',
    detalhes: 'detalhes',
    criadoEm: 'criadoEm'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'PapelUsuario'
   */
  export type EnumPapelUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PapelUsuario'>
    


  /**
   * Reference to a field of type 'PapelUsuario[]'
   */
  export type ListEnumPapelUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PapelUsuario[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'AmbienteFiscal'
   */
  export type EnumAmbienteFiscalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AmbienteFiscal'>
    


  /**
   * Reference to a field of type 'AmbienteFiscal[]'
   */
  export type ListEnumAmbienteFiscalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AmbienteFiscal[]'>
    


  /**
   * Reference to a field of type 'StatusEmpresa'
   */
  export type EnumStatusEmpresaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusEmpresa'>
    


  /**
   * Reference to a field of type 'StatusEmpresa[]'
   */
  export type ListEnumStatusEmpresaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusEmpresa[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'TipoDocumentoFiscal'
   */
  export type EnumTipoDocumentoFiscalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoDocumentoFiscal'>
    


  /**
   * Reference to a field of type 'TipoDocumentoFiscal[]'
   */
  export type ListEnumTipoDocumentoFiscalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoDocumentoFiscal[]'>
    


  /**
   * Reference to a field of type 'DirecaoDocumento'
   */
  export type EnumDirecaoDocumentoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DirecaoDocumento'>
    


  /**
   * Reference to a field of type 'DirecaoDocumento[]'
   */
  export type ListEnumDirecaoDocumentoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DirecaoDocumento[]'>
    


  /**
   * Reference to a field of type 'StatusDocumentoFiscal'
   */
  export type EnumStatusDocumentoFiscalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusDocumentoFiscal'>
    


  /**
   * Reference to a field of type 'StatusDocumentoFiscal[]'
   */
  export type ListEnumStatusDocumentoFiscalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusDocumentoFiscal[]'>
    


  /**
   * Reference to a field of type 'TipoEventoManifestacao'
   */
  export type EnumTipoEventoManifestacaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoEventoManifestacao'>
    


  /**
   * Reference to a field of type 'TipoEventoManifestacao[]'
   */
  export type ListEnumTipoEventoManifestacaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoEventoManifestacao[]'>
    


  /**
   * Reference to a field of type 'StatusManifestacao'
   */
  export type EnumStatusManifestacaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusManifestacao'>
    


  /**
   * Reference to a field of type 'StatusManifestacao[]'
   */
  export type ListEnumStatusManifestacaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusManifestacao[]'>
    


  /**
   * Reference to a field of type 'StatusExportacaoTxt'
   */
  export type EnumStatusExportacaoTxtFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusExportacaoTxt'>
    


  /**
   * Reference to a field of type 'StatusExportacaoTxt[]'
   */
  export type ListEnumStatusExportacaoTxtFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusExportacaoTxt[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'StatusFatura'
   */
  export type EnumStatusFaturaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusFatura'>
    


  /**
   * Reference to a field of type 'StatusFatura[]'
   */
  export type ListEnumStatusFaturaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusFatura[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizacaoWhereInput = {
    AND?: OrganizacaoWhereInput | OrganizacaoWhereInput[]
    OR?: OrganizacaoWhereInput[]
    NOT?: OrganizacaoWhereInput | OrganizacaoWhereInput[]
    id?: StringFilter<"Organizacao"> | string
    razaoSocial?: StringFilter<"Organizacao"> | string
    cnpj?: StringFilter<"Organizacao"> | string
    emailContato?: StringFilter<"Organizacao"> | string
    criadoEm?: DateTimeFilter<"Organizacao"> | Date | string
    atualizadoEm?: DateTimeFilter<"Organizacao"> | Date | string
    empresas?: EmpresaListRelationFilter
    regrasFiscais?: RegraFiscalListRelationFilter
    usuarios?: UsuarioListRelationFilter
    faturas?: FaturaListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type OrganizacaoOrderByWithRelationInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    emailContato?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    empresas?: EmpresaOrderByRelationAggregateInput
    regrasFiscais?: RegraFiscalOrderByRelationAggregateInput
    usuarios?: UsuarioOrderByRelationAggregateInput
    faturas?: FaturaOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type OrganizacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cnpj?: string
    AND?: OrganizacaoWhereInput | OrganizacaoWhereInput[]
    OR?: OrganizacaoWhereInput[]
    NOT?: OrganizacaoWhereInput | OrganizacaoWhereInput[]
    razaoSocial?: StringFilter<"Organizacao"> | string
    emailContato?: StringFilter<"Organizacao"> | string
    criadoEm?: DateTimeFilter<"Organizacao"> | Date | string
    atualizadoEm?: DateTimeFilter<"Organizacao"> | Date | string
    empresas?: EmpresaListRelationFilter
    regrasFiscais?: RegraFiscalListRelationFilter
    usuarios?: UsuarioListRelationFilter
    faturas?: FaturaListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "cnpj">

  export type OrganizacaoOrderByWithAggregationInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    emailContato?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: OrganizacaoCountOrderByAggregateInput
    _max?: OrganizacaoMaxOrderByAggregateInput
    _min?: OrganizacaoMinOrderByAggregateInput
  }

  export type OrganizacaoScalarWhereWithAggregatesInput = {
    AND?: OrganizacaoScalarWhereWithAggregatesInput | OrganizacaoScalarWhereWithAggregatesInput[]
    OR?: OrganizacaoScalarWhereWithAggregatesInput[]
    NOT?: OrganizacaoScalarWhereWithAggregatesInput | OrganizacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organizacao"> | string
    razaoSocial?: StringWithAggregatesFilter<"Organizacao"> | string
    cnpj?: StringWithAggregatesFilter<"Organizacao"> | string
    emailContato?: StringWithAggregatesFilter<"Organizacao"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Organizacao"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Organizacao"> | Date | string
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    organizacaoId?: StringNullableFilter<"Usuario"> | string | null
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senhaHash?: StringFilter<"Usuario"> | string
    papel?: EnumPapelUsuarioFilter<"Usuario"> | $Enums.PapelUsuario
    ativo?: BoolFilter<"Usuario"> | boolean
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
    organizacao?: XOR<OrganizacaoNullableScalarRelationFilter, OrganizacaoWhereInput> | null
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    organizacaoId?: SortOrderInput | SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    papel?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    organizacao?: OrganizacaoOrderByWithRelationInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    organizacaoId?: StringNullableFilter<"Usuario"> | string | null
    nome?: StringFilter<"Usuario"> | string
    senhaHash?: StringFilter<"Usuario"> | string
    papel?: EnumPapelUsuarioFilter<"Usuario"> | $Enums.PapelUsuario
    ativo?: BoolFilter<"Usuario"> | boolean
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
    organizacao?: XOR<OrganizacaoNullableScalarRelationFilter, OrganizacaoWhereInput> | null
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    organizacaoId?: SortOrderInput | SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    papel?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    organizacaoId?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    senhaHash?: StringWithAggregatesFilter<"Usuario"> | string
    papel?: EnumPapelUsuarioWithAggregatesFilter<"Usuario"> | $Enums.PapelUsuario
    ativo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type EmpresaWhereInput = {
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    id?: StringFilter<"Empresa"> | string
    organizacaoId?: StringFilter<"Empresa"> | string
    cnpj?: StringFilter<"Empresa"> | string
    razaoSocial?: StringFilter<"Empresa"> | string
    uf?: StringFilter<"Empresa"> | string
    codigoUf?: IntFilter<"Empresa"> | number
    ambiente?: EnumAmbienteFiscalFilter<"Empresa"> | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFilter<"Empresa"> | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFilter<"Empresa"> | Date | string
    desativadaEm?: DateTimeNullableFilter<"Empresa"> | Date | string | null
    criadoEm?: DateTimeFilter<"Empresa"> | Date | string
    atualizadoEm?: DateTimeFilter<"Empresa"> | Date | string
    organizacao?: XOR<OrganizacaoScalarRelationFilter, OrganizacaoWhereInput>
    certificado?: XOR<CertificadoNullableScalarRelationFilter, CertificadoWhereInput> | null
    documentosFiscais?: DocumentoFiscalListRelationFilter
    manifestacoes?: ManifestacaoEventoListRelationFilter
    exportacoesTxt?: ExportacaoTxtListRelationFilter
    itensFatura?: ItemFaturaListRelationFilter
    nsuControle?: XOR<NsuControleNullableScalarRelationFilter, NsuControleWhereInput> | null
    regrasFiscaisOverride?: RegraFiscalListRelationFilter
  }

  export type EmpresaOrderByWithRelationInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    cnpj?: SortOrder
    razaoSocial?: SortOrder
    uf?: SortOrder
    codigoUf?: SortOrder
    ambiente?: SortOrder
    status?: SortOrder
    ativadaEm?: SortOrder
    desativadaEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    organizacao?: OrganizacaoOrderByWithRelationInput
    certificado?: CertificadoOrderByWithRelationInput
    documentosFiscais?: DocumentoFiscalOrderByRelationAggregateInput
    manifestacoes?: ManifestacaoEventoOrderByRelationAggregateInput
    exportacoesTxt?: ExportacaoTxtOrderByRelationAggregateInput
    itensFatura?: ItemFaturaOrderByRelationAggregateInput
    nsuControle?: NsuControleOrderByWithRelationInput
    regrasFiscaisOverride?: RegraFiscalOrderByRelationAggregateInput
  }

  export type EmpresaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cnpj?: string
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    organizacaoId?: StringFilter<"Empresa"> | string
    razaoSocial?: StringFilter<"Empresa"> | string
    uf?: StringFilter<"Empresa"> | string
    codigoUf?: IntFilter<"Empresa"> | number
    ambiente?: EnumAmbienteFiscalFilter<"Empresa"> | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFilter<"Empresa"> | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFilter<"Empresa"> | Date | string
    desativadaEm?: DateTimeNullableFilter<"Empresa"> | Date | string | null
    criadoEm?: DateTimeFilter<"Empresa"> | Date | string
    atualizadoEm?: DateTimeFilter<"Empresa"> | Date | string
    organizacao?: XOR<OrganizacaoScalarRelationFilter, OrganizacaoWhereInput>
    certificado?: XOR<CertificadoNullableScalarRelationFilter, CertificadoWhereInput> | null
    documentosFiscais?: DocumentoFiscalListRelationFilter
    manifestacoes?: ManifestacaoEventoListRelationFilter
    exportacoesTxt?: ExportacaoTxtListRelationFilter
    itensFatura?: ItemFaturaListRelationFilter
    nsuControle?: XOR<NsuControleNullableScalarRelationFilter, NsuControleWhereInput> | null
    regrasFiscaisOverride?: RegraFiscalListRelationFilter
  }, "id" | "cnpj">

  export type EmpresaOrderByWithAggregationInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    cnpj?: SortOrder
    razaoSocial?: SortOrder
    uf?: SortOrder
    codigoUf?: SortOrder
    ambiente?: SortOrder
    status?: SortOrder
    ativadaEm?: SortOrder
    desativadaEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: EmpresaCountOrderByAggregateInput
    _avg?: EmpresaAvgOrderByAggregateInput
    _max?: EmpresaMaxOrderByAggregateInput
    _min?: EmpresaMinOrderByAggregateInput
    _sum?: EmpresaSumOrderByAggregateInput
  }

  export type EmpresaScalarWhereWithAggregatesInput = {
    AND?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    OR?: EmpresaScalarWhereWithAggregatesInput[]
    NOT?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Empresa"> | string
    organizacaoId?: StringWithAggregatesFilter<"Empresa"> | string
    cnpj?: StringWithAggregatesFilter<"Empresa"> | string
    razaoSocial?: StringWithAggregatesFilter<"Empresa"> | string
    uf?: StringWithAggregatesFilter<"Empresa"> | string
    codigoUf?: IntWithAggregatesFilter<"Empresa"> | number
    ambiente?: EnumAmbienteFiscalWithAggregatesFilter<"Empresa"> | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaWithAggregatesFilter<"Empresa"> | $Enums.StatusEmpresa
    ativadaEm?: DateTimeWithAggregatesFilter<"Empresa"> | Date | string
    desativadaEm?: DateTimeNullableWithAggregatesFilter<"Empresa"> | Date | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Empresa"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Empresa"> | Date | string
  }

  export type NsuControleWhereInput = {
    AND?: NsuControleWhereInput | NsuControleWhereInput[]
    OR?: NsuControleWhereInput[]
    NOT?: NsuControleWhereInput | NsuControleWhereInput[]
    id?: StringFilter<"NsuControle"> | string
    empresaId?: StringFilter<"NsuControle"> | string
    ultimoNsu?: BigIntFilter<"NsuControle"> | bigint | number
    atualizadoEm?: DateTimeFilter<"NsuControle"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }

  export type NsuControleOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    ultimoNsu?: SortOrder
    atualizadoEm?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
  }

  export type NsuControleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    empresaId?: string
    AND?: NsuControleWhereInput | NsuControleWhereInput[]
    OR?: NsuControleWhereInput[]
    NOT?: NsuControleWhereInput | NsuControleWhereInput[]
    ultimoNsu?: BigIntFilter<"NsuControle"> | bigint | number
    atualizadoEm?: DateTimeFilter<"NsuControle"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }, "id" | "empresaId">

  export type NsuControleOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    ultimoNsu?: SortOrder
    atualizadoEm?: SortOrder
    _count?: NsuControleCountOrderByAggregateInput
    _avg?: NsuControleAvgOrderByAggregateInput
    _max?: NsuControleMaxOrderByAggregateInput
    _min?: NsuControleMinOrderByAggregateInput
    _sum?: NsuControleSumOrderByAggregateInput
  }

  export type NsuControleScalarWhereWithAggregatesInput = {
    AND?: NsuControleScalarWhereWithAggregatesInput | NsuControleScalarWhereWithAggregatesInput[]
    OR?: NsuControleScalarWhereWithAggregatesInput[]
    NOT?: NsuControleScalarWhereWithAggregatesInput | NsuControleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NsuControle"> | string
    empresaId?: StringWithAggregatesFilter<"NsuControle"> | string
    ultimoNsu?: BigIntWithAggregatesFilter<"NsuControle"> | bigint | number
    atualizadoEm?: DateTimeWithAggregatesFilter<"NsuControle"> | Date | string
  }

  export type CertificadoWhereInput = {
    AND?: CertificadoWhereInput | CertificadoWhereInput[]
    OR?: CertificadoWhereInput[]
    NOT?: CertificadoWhereInput | CertificadoWhereInput[]
    id?: StringFilter<"Certificado"> | string
    empresaId?: StringFilter<"Certificado"> | string
    nomeArquivoOriginal?: StringFilter<"Certificado"> | string
    objetoStorage?: StringFilter<"Certificado"> | string
    senhaCriptografada?: StringFilter<"Certificado"> | string
    ivCriptografia?: StringFilter<"Certificado"> | string
    validoAte?: DateTimeFilter<"Certificado"> | Date | string
    alertaVencimentoEnviado?: BoolFilter<"Certificado"> | boolean
    criadoEm?: DateTimeFilter<"Certificado"> | Date | string
    atualizadoEm?: DateTimeFilter<"Certificado"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }

  export type CertificadoOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nomeArquivoOriginal?: SortOrder
    objetoStorage?: SortOrder
    senhaCriptografada?: SortOrder
    ivCriptografia?: SortOrder
    validoAte?: SortOrder
    alertaVencimentoEnviado?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
  }

  export type CertificadoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    empresaId?: string
    AND?: CertificadoWhereInput | CertificadoWhereInput[]
    OR?: CertificadoWhereInput[]
    NOT?: CertificadoWhereInput | CertificadoWhereInput[]
    nomeArquivoOriginal?: StringFilter<"Certificado"> | string
    objetoStorage?: StringFilter<"Certificado"> | string
    senhaCriptografada?: StringFilter<"Certificado"> | string
    ivCriptografia?: StringFilter<"Certificado"> | string
    validoAte?: DateTimeFilter<"Certificado"> | Date | string
    alertaVencimentoEnviado?: BoolFilter<"Certificado"> | boolean
    criadoEm?: DateTimeFilter<"Certificado"> | Date | string
    atualizadoEm?: DateTimeFilter<"Certificado"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }, "id" | "empresaId">

  export type CertificadoOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nomeArquivoOriginal?: SortOrder
    objetoStorage?: SortOrder
    senhaCriptografada?: SortOrder
    ivCriptografia?: SortOrder
    validoAte?: SortOrder
    alertaVencimentoEnviado?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: CertificadoCountOrderByAggregateInput
    _max?: CertificadoMaxOrderByAggregateInput
    _min?: CertificadoMinOrderByAggregateInput
  }

  export type CertificadoScalarWhereWithAggregatesInput = {
    AND?: CertificadoScalarWhereWithAggregatesInput | CertificadoScalarWhereWithAggregatesInput[]
    OR?: CertificadoScalarWhereWithAggregatesInput[]
    NOT?: CertificadoScalarWhereWithAggregatesInput | CertificadoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Certificado"> | string
    empresaId?: StringWithAggregatesFilter<"Certificado"> | string
    nomeArquivoOriginal?: StringWithAggregatesFilter<"Certificado"> | string
    objetoStorage?: StringWithAggregatesFilter<"Certificado"> | string
    senhaCriptografada?: StringWithAggregatesFilter<"Certificado"> | string
    ivCriptografia?: StringWithAggregatesFilter<"Certificado"> | string
    validoAte?: DateTimeWithAggregatesFilter<"Certificado"> | Date | string
    alertaVencimentoEnviado?: BoolWithAggregatesFilter<"Certificado"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"Certificado"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Certificado"> | Date | string
  }

  export type DocumentoFiscalWhereInput = {
    AND?: DocumentoFiscalWhereInput | DocumentoFiscalWhereInput[]
    OR?: DocumentoFiscalWhereInput[]
    NOT?: DocumentoFiscalWhereInput | DocumentoFiscalWhereInput[]
    id?: StringFilter<"DocumentoFiscal"> | string
    empresaId?: StringFilter<"DocumentoFiscal"> | string
    chaveAcesso?: StringFilter<"DocumentoFiscal"> | string
    tipo?: EnumTipoDocumentoFiscalFilter<"DocumentoFiscal"> | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFilter<"DocumentoFiscal"> | $Enums.DirecaoDocumento
    nsu?: BigIntNullableFilter<"DocumentoFiscal"> | bigint | number | null
    status?: EnumStatusDocumentoFiscalFilter<"DocumentoFiscal"> | $Enums.StatusDocumentoFiscal
    cfop?: StringNullableFilter<"DocumentoFiscal"> | string | null
    objetoStorageXml?: StringFilter<"DocumentoFiscal"> | string
    emitidoEm?: DateTimeNullableFilter<"DocumentoFiscal"> | Date | string | null
    recebidoEm?: DateTimeFilter<"DocumentoFiscal"> | Date | string
    atualizadoEm?: DateTimeFilter<"DocumentoFiscal"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    manifestacoes?: ManifestacaoEventoListRelationFilter
  }

  export type DocumentoFiscalOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    nsu?: SortOrderInput | SortOrder
    status?: SortOrder
    cfop?: SortOrderInput | SortOrder
    objetoStorageXml?: SortOrder
    emitidoEm?: SortOrderInput | SortOrder
    recebidoEm?: SortOrder
    atualizadoEm?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    manifestacoes?: ManifestacaoEventoOrderByRelationAggregateInput
  }

  export type DocumentoFiscalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chaveAcesso?: string
    AND?: DocumentoFiscalWhereInput | DocumentoFiscalWhereInput[]
    OR?: DocumentoFiscalWhereInput[]
    NOT?: DocumentoFiscalWhereInput | DocumentoFiscalWhereInput[]
    empresaId?: StringFilter<"DocumentoFiscal"> | string
    tipo?: EnumTipoDocumentoFiscalFilter<"DocumentoFiscal"> | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFilter<"DocumentoFiscal"> | $Enums.DirecaoDocumento
    nsu?: BigIntNullableFilter<"DocumentoFiscal"> | bigint | number | null
    status?: EnumStatusDocumentoFiscalFilter<"DocumentoFiscal"> | $Enums.StatusDocumentoFiscal
    cfop?: StringNullableFilter<"DocumentoFiscal"> | string | null
    objetoStorageXml?: StringFilter<"DocumentoFiscal"> | string
    emitidoEm?: DateTimeNullableFilter<"DocumentoFiscal"> | Date | string | null
    recebidoEm?: DateTimeFilter<"DocumentoFiscal"> | Date | string
    atualizadoEm?: DateTimeFilter<"DocumentoFiscal"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    manifestacoes?: ManifestacaoEventoListRelationFilter
  }, "id" | "chaveAcesso">

  export type DocumentoFiscalOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    nsu?: SortOrderInput | SortOrder
    status?: SortOrder
    cfop?: SortOrderInput | SortOrder
    objetoStorageXml?: SortOrder
    emitidoEm?: SortOrderInput | SortOrder
    recebidoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: DocumentoFiscalCountOrderByAggregateInput
    _avg?: DocumentoFiscalAvgOrderByAggregateInput
    _max?: DocumentoFiscalMaxOrderByAggregateInput
    _min?: DocumentoFiscalMinOrderByAggregateInput
    _sum?: DocumentoFiscalSumOrderByAggregateInput
  }

  export type DocumentoFiscalScalarWhereWithAggregatesInput = {
    AND?: DocumentoFiscalScalarWhereWithAggregatesInput | DocumentoFiscalScalarWhereWithAggregatesInput[]
    OR?: DocumentoFiscalScalarWhereWithAggregatesInput[]
    NOT?: DocumentoFiscalScalarWhereWithAggregatesInput | DocumentoFiscalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentoFiscal"> | string
    empresaId?: StringWithAggregatesFilter<"DocumentoFiscal"> | string
    chaveAcesso?: StringWithAggregatesFilter<"DocumentoFiscal"> | string
    tipo?: EnumTipoDocumentoFiscalWithAggregatesFilter<"DocumentoFiscal"> | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoWithAggregatesFilter<"DocumentoFiscal"> | $Enums.DirecaoDocumento
    nsu?: BigIntNullableWithAggregatesFilter<"DocumentoFiscal"> | bigint | number | null
    status?: EnumStatusDocumentoFiscalWithAggregatesFilter<"DocumentoFiscal"> | $Enums.StatusDocumentoFiscal
    cfop?: StringNullableWithAggregatesFilter<"DocumentoFiscal"> | string | null
    objetoStorageXml?: StringWithAggregatesFilter<"DocumentoFiscal"> | string
    emitidoEm?: DateTimeNullableWithAggregatesFilter<"DocumentoFiscal"> | Date | string | null
    recebidoEm?: DateTimeWithAggregatesFilter<"DocumentoFiscal"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"DocumentoFiscal"> | Date | string
  }

  export type ManifestacaoEventoWhereInput = {
    AND?: ManifestacaoEventoWhereInput | ManifestacaoEventoWhereInput[]
    OR?: ManifestacaoEventoWhereInput[]
    NOT?: ManifestacaoEventoWhereInput | ManifestacaoEventoWhereInput[]
    id?: StringFilter<"ManifestacaoEvento"> | string
    empresaId?: StringFilter<"ManifestacaoEvento"> | string
    documentoFiscalId?: StringFilter<"ManifestacaoEvento"> | string
    tipoEvento?: EnumTipoEventoManifestacaoFilter<"ManifestacaoEvento"> | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFilter<"ManifestacaoEvento"> | $Enums.StatusManifestacao
    protocoloSefaz?: StringNullableFilter<"ManifestacaoEvento"> | string | null
    motivoSefaz?: StringNullableFilter<"ManifestacaoEvento"> | string | null
    enviadoEm?: DateTimeNullableFilter<"ManifestacaoEvento"> | Date | string | null
    criadoEm?: DateTimeFilter<"ManifestacaoEvento"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    documentoFiscal?: XOR<DocumentoFiscalScalarRelationFilter, DocumentoFiscalWhereInput>
  }

  export type ManifestacaoEventoOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    documentoFiscalId?: SortOrder
    tipoEvento?: SortOrder
    status?: SortOrder
    protocoloSefaz?: SortOrderInput | SortOrder
    motivoSefaz?: SortOrderInput | SortOrder
    enviadoEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    documentoFiscal?: DocumentoFiscalOrderByWithRelationInput
  }

  export type ManifestacaoEventoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ManifestacaoEventoWhereInput | ManifestacaoEventoWhereInput[]
    OR?: ManifestacaoEventoWhereInput[]
    NOT?: ManifestacaoEventoWhereInput | ManifestacaoEventoWhereInput[]
    empresaId?: StringFilter<"ManifestacaoEvento"> | string
    documentoFiscalId?: StringFilter<"ManifestacaoEvento"> | string
    tipoEvento?: EnumTipoEventoManifestacaoFilter<"ManifestacaoEvento"> | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFilter<"ManifestacaoEvento"> | $Enums.StatusManifestacao
    protocoloSefaz?: StringNullableFilter<"ManifestacaoEvento"> | string | null
    motivoSefaz?: StringNullableFilter<"ManifestacaoEvento"> | string | null
    enviadoEm?: DateTimeNullableFilter<"ManifestacaoEvento"> | Date | string | null
    criadoEm?: DateTimeFilter<"ManifestacaoEvento"> | Date | string
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
    documentoFiscal?: XOR<DocumentoFiscalScalarRelationFilter, DocumentoFiscalWhereInput>
  }, "id">

  export type ManifestacaoEventoOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    documentoFiscalId?: SortOrder
    tipoEvento?: SortOrder
    status?: SortOrder
    protocoloSefaz?: SortOrderInput | SortOrder
    motivoSefaz?: SortOrderInput | SortOrder
    enviadoEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    _count?: ManifestacaoEventoCountOrderByAggregateInput
    _max?: ManifestacaoEventoMaxOrderByAggregateInput
    _min?: ManifestacaoEventoMinOrderByAggregateInput
  }

  export type ManifestacaoEventoScalarWhereWithAggregatesInput = {
    AND?: ManifestacaoEventoScalarWhereWithAggregatesInput | ManifestacaoEventoScalarWhereWithAggregatesInput[]
    OR?: ManifestacaoEventoScalarWhereWithAggregatesInput[]
    NOT?: ManifestacaoEventoScalarWhereWithAggregatesInput | ManifestacaoEventoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ManifestacaoEvento"> | string
    empresaId?: StringWithAggregatesFilter<"ManifestacaoEvento"> | string
    documentoFiscalId?: StringWithAggregatesFilter<"ManifestacaoEvento"> | string
    tipoEvento?: EnumTipoEventoManifestacaoWithAggregatesFilter<"ManifestacaoEvento"> | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoWithAggregatesFilter<"ManifestacaoEvento"> | $Enums.StatusManifestacao
    protocoloSefaz?: StringNullableWithAggregatesFilter<"ManifestacaoEvento"> | string | null
    motivoSefaz?: StringNullableWithAggregatesFilter<"ManifestacaoEvento"> | string | null
    enviadoEm?: DateTimeNullableWithAggregatesFilter<"ManifestacaoEvento"> | Date | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"ManifestacaoEvento"> | Date | string
  }

  export type RegraFiscalWhereInput = {
    AND?: RegraFiscalWhereInput | RegraFiscalWhereInput[]
    OR?: RegraFiscalWhereInput[]
    NOT?: RegraFiscalWhereInput | RegraFiscalWhereInput[]
    id?: StringFilter<"RegraFiscal"> | string
    organizacaoId?: StringFilter<"RegraFiscal"> | string
    empresaId?: StringNullableFilter<"RegraFiscal"> | string | null
    cfopEntrada?: StringFilter<"RegraFiscal"> | string
    descricao?: StringFilter<"RegraFiscal"> | string
    observacao?: StringNullableFilter<"RegraFiscal"> | string | null
    acumulador?: StringNullableFilter<"RegraFiscal"> | string | null
    ativa?: BoolFilter<"RegraFiscal"> | boolean
    criadoEm?: DateTimeFilter<"RegraFiscal"> | Date | string
    atualizadoEm?: DateTimeFilter<"RegraFiscal"> | Date | string
    organizacao?: XOR<OrganizacaoScalarRelationFilter, OrganizacaoWhereInput>
    empresa?: XOR<EmpresaNullableScalarRelationFilter, EmpresaWhereInput> | null
  }

  export type RegraFiscalOrderByWithRelationInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    empresaId?: SortOrderInput | SortOrder
    cfopEntrada?: SortOrder
    descricao?: SortOrder
    observacao?: SortOrderInput | SortOrder
    acumulador?: SortOrderInput | SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    organizacao?: OrganizacaoOrderByWithRelationInput
    empresa?: EmpresaOrderByWithRelationInput
  }

  export type RegraFiscalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RegraFiscalWhereInput | RegraFiscalWhereInput[]
    OR?: RegraFiscalWhereInput[]
    NOT?: RegraFiscalWhereInput | RegraFiscalWhereInput[]
    organizacaoId?: StringFilter<"RegraFiscal"> | string
    empresaId?: StringNullableFilter<"RegraFiscal"> | string | null
    cfopEntrada?: StringFilter<"RegraFiscal"> | string
    descricao?: StringFilter<"RegraFiscal"> | string
    observacao?: StringNullableFilter<"RegraFiscal"> | string | null
    acumulador?: StringNullableFilter<"RegraFiscal"> | string | null
    ativa?: BoolFilter<"RegraFiscal"> | boolean
    criadoEm?: DateTimeFilter<"RegraFiscal"> | Date | string
    atualizadoEm?: DateTimeFilter<"RegraFiscal"> | Date | string
    organizacao?: XOR<OrganizacaoScalarRelationFilter, OrganizacaoWhereInput>
    empresa?: XOR<EmpresaNullableScalarRelationFilter, EmpresaWhereInput> | null
  }, "id">

  export type RegraFiscalOrderByWithAggregationInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    empresaId?: SortOrderInput | SortOrder
    cfopEntrada?: SortOrder
    descricao?: SortOrder
    observacao?: SortOrderInput | SortOrder
    acumulador?: SortOrderInput | SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: RegraFiscalCountOrderByAggregateInput
    _max?: RegraFiscalMaxOrderByAggregateInput
    _min?: RegraFiscalMinOrderByAggregateInput
  }

  export type RegraFiscalScalarWhereWithAggregatesInput = {
    AND?: RegraFiscalScalarWhereWithAggregatesInput | RegraFiscalScalarWhereWithAggregatesInput[]
    OR?: RegraFiscalScalarWhereWithAggregatesInput[]
    NOT?: RegraFiscalScalarWhereWithAggregatesInput | RegraFiscalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RegraFiscal"> | string
    organizacaoId?: StringWithAggregatesFilter<"RegraFiscal"> | string
    empresaId?: StringNullableWithAggregatesFilter<"RegraFiscal"> | string | null
    cfopEntrada?: StringWithAggregatesFilter<"RegraFiscal"> | string
    descricao?: StringWithAggregatesFilter<"RegraFiscal"> | string
    observacao?: StringNullableWithAggregatesFilter<"RegraFiscal"> | string | null
    acumulador?: StringNullableWithAggregatesFilter<"RegraFiscal"> | string | null
    ativa?: BoolWithAggregatesFilter<"RegraFiscal"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"RegraFiscal"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"RegraFiscal"> | Date | string
  }

  export type ExportacaoTxtWhereInput = {
    AND?: ExportacaoTxtWhereInput | ExportacaoTxtWhereInput[]
    OR?: ExportacaoTxtWhereInput[]
    NOT?: ExportacaoTxtWhereInput | ExportacaoTxtWhereInput[]
    id?: StringFilter<"ExportacaoTxt"> | string
    empresaId?: StringFilter<"ExportacaoTxt"> | string
    periodoInicio?: DateTimeFilter<"ExportacaoTxt"> | Date | string
    periodoFim?: DateTimeFilter<"ExportacaoTxt"> | Date | string
    status?: EnumStatusExportacaoTxtFilter<"ExportacaoTxt"> | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: StringNullableFilter<"ExportacaoTxt"> | string | null
    totalDocumentos?: IntFilter<"ExportacaoTxt"> | number
    erro?: StringNullableFilter<"ExportacaoTxt"> | string | null
    criadoEm?: DateTimeFilter<"ExportacaoTxt"> | Date | string
    concluidoEm?: DateTimeNullableFilter<"ExportacaoTxt"> | Date | string | null
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }

  export type ExportacaoTxtOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    periodoInicio?: SortOrder
    periodoFim?: SortOrder
    status?: SortOrder
    objetoStorageTxt?: SortOrderInput | SortOrder
    totalDocumentos?: SortOrder
    erro?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrderInput | SortOrder
    empresa?: EmpresaOrderByWithRelationInput
  }

  export type ExportacaoTxtWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExportacaoTxtWhereInput | ExportacaoTxtWhereInput[]
    OR?: ExportacaoTxtWhereInput[]
    NOT?: ExportacaoTxtWhereInput | ExportacaoTxtWhereInput[]
    empresaId?: StringFilter<"ExportacaoTxt"> | string
    periodoInicio?: DateTimeFilter<"ExportacaoTxt"> | Date | string
    periodoFim?: DateTimeFilter<"ExportacaoTxt"> | Date | string
    status?: EnumStatusExportacaoTxtFilter<"ExportacaoTxt"> | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: StringNullableFilter<"ExportacaoTxt"> | string | null
    totalDocumentos?: IntFilter<"ExportacaoTxt"> | number
    erro?: StringNullableFilter<"ExportacaoTxt"> | string | null
    criadoEm?: DateTimeFilter<"ExportacaoTxt"> | Date | string
    concluidoEm?: DateTimeNullableFilter<"ExportacaoTxt"> | Date | string | null
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }, "id">

  export type ExportacaoTxtOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    periodoInicio?: SortOrder
    periodoFim?: SortOrder
    status?: SortOrder
    objetoStorageTxt?: SortOrderInput | SortOrder
    totalDocumentos?: SortOrder
    erro?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrderInput | SortOrder
    _count?: ExportacaoTxtCountOrderByAggregateInput
    _avg?: ExportacaoTxtAvgOrderByAggregateInput
    _max?: ExportacaoTxtMaxOrderByAggregateInput
    _min?: ExportacaoTxtMinOrderByAggregateInput
    _sum?: ExportacaoTxtSumOrderByAggregateInput
  }

  export type ExportacaoTxtScalarWhereWithAggregatesInput = {
    AND?: ExportacaoTxtScalarWhereWithAggregatesInput | ExportacaoTxtScalarWhereWithAggregatesInput[]
    OR?: ExportacaoTxtScalarWhereWithAggregatesInput[]
    NOT?: ExportacaoTxtScalarWhereWithAggregatesInput | ExportacaoTxtScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExportacaoTxt"> | string
    empresaId?: StringWithAggregatesFilter<"ExportacaoTxt"> | string
    periodoInicio?: DateTimeWithAggregatesFilter<"ExportacaoTxt"> | Date | string
    periodoFim?: DateTimeWithAggregatesFilter<"ExportacaoTxt"> | Date | string
    status?: EnumStatusExportacaoTxtWithAggregatesFilter<"ExportacaoTxt"> | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: StringNullableWithAggregatesFilter<"ExportacaoTxt"> | string | null
    totalDocumentos?: IntWithAggregatesFilter<"ExportacaoTxt"> | number
    erro?: StringNullableWithAggregatesFilter<"ExportacaoTxt"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"ExportacaoTxt"> | Date | string
    concluidoEm?: DateTimeNullableWithAggregatesFilter<"ExportacaoTxt"> | Date | string | null
  }

  export type FaturaWhereInput = {
    AND?: FaturaWhereInput | FaturaWhereInput[]
    OR?: FaturaWhereInput[]
    NOT?: FaturaWhereInput | FaturaWhereInput[]
    id?: StringFilter<"Fatura"> | string
    organizacaoId?: StringFilter<"Fatura"> | string
    referenciaMes?: IntFilter<"Fatura"> | number
    referenciaAno?: IntFilter<"Fatura"> | number
    valorTotal?: DecimalFilter<"Fatura"> | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFilter<"Fatura"> | $Enums.StatusFatura
    geradaEm?: DateTimeFilter<"Fatura"> | Date | string
    pagaEm?: DateTimeNullableFilter<"Fatura"> | Date | string | null
    organizacao?: XOR<OrganizacaoScalarRelationFilter, OrganizacaoWhereInput>
    itens?: ItemFaturaListRelationFilter
  }

  export type FaturaOrderByWithRelationInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    referenciaMes?: SortOrder
    referenciaAno?: SortOrder
    valorTotal?: SortOrder
    status?: SortOrder
    geradaEm?: SortOrder
    pagaEm?: SortOrderInput | SortOrder
    organizacao?: OrganizacaoOrderByWithRelationInput
    itens?: ItemFaturaOrderByRelationAggregateInput
  }

  export type FaturaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    organizacaoId_referenciaAno_referenciaMes?: FaturaOrganizacaoIdReferenciaAnoReferenciaMesCompoundUniqueInput
    AND?: FaturaWhereInput | FaturaWhereInput[]
    OR?: FaturaWhereInput[]
    NOT?: FaturaWhereInput | FaturaWhereInput[]
    organizacaoId?: StringFilter<"Fatura"> | string
    referenciaMes?: IntFilter<"Fatura"> | number
    referenciaAno?: IntFilter<"Fatura"> | number
    valorTotal?: DecimalFilter<"Fatura"> | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFilter<"Fatura"> | $Enums.StatusFatura
    geradaEm?: DateTimeFilter<"Fatura"> | Date | string
    pagaEm?: DateTimeNullableFilter<"Fatura"> | Date | string | null
    organizacao?: XOR<OrganizacaoScalarRelationFilter, OrganizacaoWhereInput>
    itens?: ItemFaturaListRelationFilter
  }, "id" | "organizacaoId_referenciaAno_referenciaMes">

  export type FaturaOrderByWithAggregationInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    referenciaMes?: SortOrder
    referenciaAno?: SortOrder
    valorTotal?: SortOrder
    status?: SortOrder
    geradaEm?: SortOrder
    pagaEm?: SortOrderInput | SortOrder
    _count?: FaturaCountOrderByAggregateInput
    _avg?: FaturaAvgOrderByAggregateInput
    _max?: FaturaMaxOrderByAggregateInput
    _min?: FaturaMinOrderByAggregateInput
    _sum?: FaturaSumOrderByAggregateInput
  }

  export type FaturaScalarWhereWithAggregatesInput = {
    AND?: FaturaScalarWhereWithAggregatesInput | FaturaScalarWhereWithAggregatesInput[]
    OR?: FaturaScalarWhereWithAggregatesInput[]
    NOT?: FaturaScalarWhereWithAggregatesInput | FaturaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Fatura"> | string
    organizacaoId?: StringWithAggregatesFilter<"Fatura"> | string
    referenciaMes?: IntWithAggregatesFilter<"Fatura"> | number
    referenciaAno?: IntWithAggregatesFilter<"Fatura"> | number
    valorTotal?: DecimalWithAggregatesFilter<"Fatura"> | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaWithAggregatesFilter<"Fatura"> | $Enums.StatusFatura
    geradaEm?: DateTimeWithAggregatesFilter<"Fatura"> | Date | string
    pagaEm?: DateTimeNullableWithAggregatesFilter<"Fatura"> | Date | string | null
  }

  export type ItemFaturaWhereInput = {
    AND?: ItemFaturaWhereInput | ItemFaturaWhereInput[]
    OR?: ItemFaturaWhereInput[]
    NOT?: ItemFaturaWhereInput | ItemFaturaWhereInput[]
    id?: StringFilter<"ItemFatura"> | string
    faturaId?: StringFilter<"ItemFatura"> | string
    empresaId?: StringFilter<"ItemFatura"> | string
    valor?: DecimalFilter<"ItemFatura"> | Decimal | DecimalJsLike | number | string
    fatura?: XOR<FaturaScalarRelationFilter, FaturaWhereInput>
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }

  export type ItemFaturaOrderByWithRelationInput = {
    id?: SortOrder
    faturaId?: SortOrder
    empresaId?: SortOrder
    valor?: SortOrder
    fatura?: FaturaOrderByWithRelationInput
    empresa?: EmpresaOrderByWithRelationInput
  }

  export type ItemFaturaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItemFaturaWhereInput | ItemFaturaWhereInput[]
    OR?: ItemFaturaWhereInput[]
    NOT?: ItemFaturaWhereInput | ItemFaturaWhereInput[]
    faturaId?: StringFilter<"ItemFatura"> | string
    empresaId?: StringFilter<"ItemFatura"> | string
    valor?: DecimalFilter<"ItemFatura"> | Decimal | DecimalJsLike | number | string
    fatura?: XOR<FaturaScalarRelationFilter, FaturaWhereInput>
    empresa?: XOR<EmpresaScalarRelationFilter, EmpresaWhereInput>
  }, "id">

  export type ItemFaturaOrderByWithAggregationInput = {
    id?: SortOrder
    faturaId?: SortOrder
    empresaId?: SortOrder
    valor?: SortOrder
    _count?: ItemFaturaCountOrderByAggregateInput
    _avg?: ItemFaturaAvgOrderByAggregateInput
    _max?: ItemFaturaMaxOrderByAggregateInput
    _min?: ItemFaturaMinOrderByAggregateInput
    _sum?: ItemFaturaSumOrderByAggregateInput
  }

  export type ItemFaturaScalarWhereWithAggregatesInput = {
    AND?: ItemFaturaScalarWhereWithAggregatesInput | ItemFaturaScalarWhereWithAggregatesInput[]
    OR?: ItemFaturaScalarWhereWithAggregatesInput[]
    NOT?: ItemFaturaScalarWhereWithAggregatesInput | ItemFaturaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ItemFatura"> | string
    faturaId?: StringWithAggregatesFilter<"ItemFatura"> | string
    empresaId?: StringWithAggregatesFilter<"ItemFatura"> | string
    valor?: DecimalWithAggregatesFilter<"ItemFatura"> | Decimal | DecimalJsLike | number | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    organizacaoId?: StringNullableFilter<"AuditLog"> | string | null
    usuarioId?: StringNullableFilter<"AuditLog"> | string | null
    acao?: StringFilter<"AuditLog"> | string
    entidade?: StringFilter<"AuditLog"> | string
    entidadeId?: StringNullableFilter<"AuditLog"> | string | null
    detalhes?: JsonNullableFilter<"AuditLog">
    criadoEm?: DateTimeFilter<"AuditLog"> | Date | string
    organizacao?: XOR<OrganizacaoNullableScalarRelationFilter, OrganizacaoWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    organizacaoId?: SortOrderInput | SortOrder
    usuarioId?: SortOrderInput | SortOrder
    acao?: SortOrder
    entidade?: SortOrder
    entidadeId?: SortOrderInput | SortOrder
    detalhes?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    organizacao?: OrganizacaoOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    organizacaoId?: StringNullableFilter<"AuditLog"> | string | null
    usuarioId?: StringNullableFilter<"AuditLog"> | string | null
    acao?: StringFilter<"AuditLog"> | string
    entidade?: StringFilter<"AuditLog"> | string
    entidadeId?: StringNullableFilter<"AuditLog"> | string | null
    detalhes?: JsonNullableFilter<"AuditLog">
    criadoEm?: DateTimeFilter<"AuditLog"> | Date | string
    organizacao?: XOR<OrganizacaoNullableScalarRelationFilter, OrganizacaoWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    organizacaoId?: SortOrderInput | SortOrder
    usuarioId?: SortOrderInput | SortOrder
    acao?: SortOrder
    entidade?: SortOrder
    entidadeId?: SortOrderInput | SortOrder
    detalhes?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    organizacaoId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    usuarioId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    acao?: StringWithAggregatesFilter<"AuditLog"> | string
    entidade?: StringWithAggregatesFilter<"AuditLog"> | string
    entidadeId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    detalhes?: JsonNullableWithAggregatesFilter<"AuditLog">
    criadoEm?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type OrganizacaoCreateInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaCreateNestedManyWithoutOrganizacaoInput
    regrasFiscais?: RegraFiscalCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoUncheckedCreateInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaUncheckedCreateNestedManyWithoutOrganizacaoInput
    regrasFiscais?: RegraFiscalUncheckedCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaUncheckedCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUpdateManyWithoutOrganizacaoNestedInput
    regrasFiscais?: RegraFiscalUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUncheckedUpdateManyWithoutOrganizacaoNestedInput
    regrasFiscais?: RegraFiscalUncheckedUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUncheckedUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoCreateManyInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrganizacaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizacaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    papel?: $Enums.PapelUsuario
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao?: OrganizacaoCreateNestedOneWithoutUsuariosInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    organizacaoId?: string | null
    nome: string
    email: string
    senhaHash: string
    papel?: $Enums.PapelUsuario
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    papel?: EnumPapelUsuarioFieldUpdateOperationsInput | $Enums.PapelUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneWithoutUsuariosNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    papel?: EnumPapelUsuarioFieldUpdateOperationsInput | $Enums.PapelUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateManyInput = {
    id?: string
    organizacaoId?: string | null
    nome: string
    email: string
    senhaHash: string
    papel?: $Enums.PapelUsuario
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    papel?: EnumPapelUsuarioFieldUpdateOperationsInput | $Enums.PapelUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    papel?: EnumPapelUsuarioFieldUpdateOperationsInput | $Enums.PapelUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaCreateInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutEmpresasInput
    certificado?: CertificadoCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateInput = {
    id?: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    certificado?: CertificadoUncheckedCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalUncheckedCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtUncheckedCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaUncheckedCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleUncheckedCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutEmpresasNestedInput
    certificado?: CertificadoUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    certificado?: CertificadoUncheckedUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUncheckedUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUncheckedUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUncheckedUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaCreateManyInput = {
    id?: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type EmpresaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NsuControleCreateInput = {
    id?: string
    ultimoNsu?: bigint | number
    atualizadoEm?: Date | string
    empresa: EmpresaCreateNestedOneWithoutNsuControleInput
  }

  export type NsuControleUncheckedCreateInput = {
    id?: string
    empresaId: string
    ultimoNsu?: bigint | number
    atualizadoEm?: Date | string
  }

  export type NsuControleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ultimoNsu?: BigIntFieldUpdateOperationsInput | bigint | number
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutNsuControleNestedInput
  }

  export type NsuControleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    ultimoNsu?: BigIntFieldUpdateOperationsInput | bigint | number
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NsuControleCreateManyInput = {
    id?: string
    empresaId: string
    ultimoNsu?: bigint | number
    atualizadoEm?: Date | string
  }

  export type NsuControleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ultimoNsu?: BigIntFieldUpdateOperationsInput | bigint | number
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NsuControleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    ultimoNsu?: BigIntFieldUpdateOperationsInput | bigint | number
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificadoCreateInput = {
    id?: string
    nomeArquivoOriginal: string
    objetoStorage: string
    senhaCriptografada: string
    ivCriptografia: string
    validoAte: Date | string
    alertaVencimentoEnviado?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresa: EmpresaCreateNestedOneWithoutCertificadoInput
  }

  export type CertificadoUncheckedCreateInput = {
    id?: string
    empresaId: string
    nomeArquivoOriginal: string
    objetoStorage: string
    senhaCriptografada: string
    ivCriptografia: string
    validoAte: Date | string
    alertaVencimentoEnviado?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CertificadoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivoOriginal?: StringFieldUpdateOperationsInput | string
    objetoStorage?: StringFieldUpdateOperationsInput | string
    senhaCriptografada?: StringFieldUpdateOperationsInput | string
    ivCriptografia?: StringFieldUpdateOperationsInput | string
    validoAte?: DateTimeFieldUpdateOperationsInput | Date | string
    alertaVencimentoEnviado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutCertificadoNestedInput
  }

  export type CertificadoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nomeArquivoOriginal?: StringFieldUpdateOperationsInput | string
    objetoStorage?: StringFieldUpdateOperationsInput | string
    senhaCriptografada?: StringFieldUpdateOperationsInput | string
    ivCriptografia?: StringFieldUpdateOperationsInput | string
    validoAte?: DateTimeFieldUpdateOperationsInput | Date | string
    alertaVencimentoEnviado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificadoCreateManyInput = {
    id?: string
    empresaId: string
    nomeArquivoOriginal: string
    objetoStorage: string
    senhaCriptografada: string
    ivCriptografia: string
    validoAte: Date | string
    alertaVencimentoEnviado?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CertificadoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivoOriginal?: StringFieldUpdateOperationsInput | string
    objetoStorage?: StringFieldUpdateOperationsInput | string
    senhaCriptografada?: StringFieldUpdateOperationsInput | string
    ivCriptografia?: StringFieldUpdateOperationsInput | string
    validoAte?: DateTimeFieldUpdateOperationsInput | Date | string
    alertaVencimentoEnviado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificadoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    nomeArquivoOriginal?: StringFieldUpdateOperationsInput | string
    objetoStorage?: StringFieldUpdateOperationsInput | string
    senhaCriptografada?: StringFieldUpdateOperationsInput | string
    ivCriptografia?: StringFieldUpdateOperationsInput | string
    validoAte?: DateTimeFieldUpdateOperationsInput | Date | string
    alertaVencimentoEnviado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentoFiscalCreateInput = {
    id?: string
    chaveAcesso: string
    tipo: $Enums.TipoDocumentoFiscal
    direcao: $Enums.DirecaoDocumento
    nsu?: bigint | number | null
    status?: $Enums.StatusDocumentoFiscal
    cfop?: string | null
    objetoStorageXml: string
    emitidoEm?: Date | string | null
    recebidoEm?: Date | string
    atualizadoEm?: Date | string
    empresa: EmpresaCreateNestedOneWithoutDocumentosFiscaisInput
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutDocumentoFiscalInput
  }

  export type DocumentoFiscalUncheckedCreateInput = {
    id?: string
    empresaId: string
    chaveAcesso: string
    tipo: $Enums.TipoDocumentoFiscal
    direcao: $Enums.DirecaoDocumento
    nsu?: bigint | number | null
    status?: $Enums.StatusDocumentoFiscal
    cfop?: string | null
    objetoStorageXml: string
    emitidoEm?: Date | string | null
    recebidoEm?: Date | string
    atualizadoEm?: Date | string
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutDocumentoFiscalInput
  }

  export type DocumentoFiscalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDocumentoFiscalFieldUpdateOperationsInput | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFieldUpdateOperationsInput | $Enums.DirecaoDocumento
    nsu?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumStatusDocumentoFiscalFieldUpdateOperationsInput | $Enums.StatusDocumentoFiscal
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    objetoStorageXml?: StringFieldUpdateOperationsInput | string
    emitidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recebidoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutDocumentosFiscaisNestedInput
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutDocumentoFiscalNestedInput
  }

  export type DocumentoFiscalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDocumentoFiscalFieldUpdateOperationsInput | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFieldUpdateOperationsInput | $Enums.DirecaoDocumento
    nsu?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumStatusDocumentoFiscalFieldUpdateOperationsInput | $Enums.StatusDocumentoFiscal
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    objetoStorageXml?: StringFieldUpdateOperationsInput | string
    emitidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recebidoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutDocumentoFiscalNestedInput
  }

  export type DocumentoFiscalCreateManyInput = {
    id?: string
    empresaId: string
    chaveAcesso: string
    tipo: $Enums.TipoDocumentoFiscal
    direcao: $Enums.DirecaoDocumento
    nsu?: bigint | number | null
    status?: $Enums.StatusDocumentoFiscal
    cfop?: string | null
    objetoStorageXml: string
    emitidoEm?: Date | string | null
    recebidoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type DocumentoFiscalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDocumentoFiscalFieldUpdateOperationsInput | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFieldUpdateOperationsInput | $Enums.DirecaoDocumento
    nsu?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumStatusDocumentoFiscalFieldUpdateOperationsInput | $Enums.StatusDocumentoFiscal
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    objetoStorageXml?: StringFieldUpdateOperationsInput | string
    emitidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recebidoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentoFiscalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDocumentoFiscalFieldUpdateOperationsInput | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFieldUpdateOperationsInput | $Enums.DirecaoDocumento
    nsu?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumStatusDocumentoFiscalFieldUpdateOperationsInput | $Enums.StatusDocumentoFiscal
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    objetoStorageXml?: StringFieldUpdateOperationsInput | string
    emitidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recebidoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManifestacaoEventoCreateInput = {
    id?: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status?: $Enums.StatusManifestacao
    protocoloSefaz?: string | null
    motivoSefaz?: string | null
    enviadoEm?: Date | string | null
    criadoEm?: Date | string
    empresa: EmpresaCreateNestedOneWithoutManifestacoesInput
    documentoFiscal: DocumentoFiscalCreateNestedOneWithoutManifestacoesInput
  }

  export type ManifestacaoEventoUncheckedCreateInput = {
    id?: string
    empresaId: string
    documentoFiscalId: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status?: $Enums.StatusManifestacao
    protocoloSefaz?: string | null
    motivoSefaz?: string | null
    enviadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ManifestacaoEventoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutManifestacoesNestedInput
    documentoFiscal?: DocumentoFiscalUpdateOneRequiredWithoutManifestacoesNestedInput
  }

  export type ManifestacaoEventoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    documentoFiscalId?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManifestacaoEventoCreateManyInput = {
    id?: string
    empresaId: string
    documentoFiscalId: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status?: $Enums.StatusManifestacao
    protocoloSefaz?: string | null
    motivoSefaz?: string | null
    enviadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ManifestacaoEventoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManifestacaoEventoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    documentoFiscalId?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegraFiscalCreateInput = {
    id?: string
    cfopEntrada: string
    descricao: string
    observacao?: string | null
    acumulador?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutRegrasFiscaisInput
    empresa?: EmpresaCreateNestedOneWithoutRegrasFiscaisOverrideInput
  }

  export type RegraFiscalUncheckedCreateInput = {
    id?: string
    organizacaoId: string
    empresaId?: string | null
    cfopEntrada: string
    descricao: string
    observacao?: string | null
    acumulador?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type RegraFiscalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutRegrasFiscaisNestedInput
    empresa?: EmpresaUpdateOneWithoutRegrasFiscaisOverrideNestedInput
  }

  export type RegraFiscalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegraFiscalCreateManyInput = {
    id?: string
    organizacaoId: string
    empresaId?: string | null
    cfopEntrada: string
    descricao: string
    observacao?: string | null
    acumulador?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type RegraFiscalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegraFiscalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExportacaoTxtCreateInput = {
    id?: string
    periodoInicio: Date | string
    periodoFim: Date | string
    status?: $Enums.StatusExportacaoTxt
    objetoStorageTxt?: string | null
    totalDocumentos?: number
    erro?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
    empresa: EmpresaCreateNestedOneWithoutExportacoesTxtInput
  }

  export type ExportacaoTxtUncheckedCreateInput = {
    id?: string
    empresaId: string
    periodoInicio: Date | string
    periodoFim: Date | string
    status?: $Enums.StatusExportacaoTxt
    objetoStorageTxt?: string | null
    totalDocumentos?: number
    erro?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type ExportacaoTxtUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodoInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    periodoFim?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusExportacaoTxtFieldUpdateOperationsInput | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: NullableStringFieldUpdateOperationsInput | string | null
    totalDocumentos?: IntFieldUpdateOperationsInput | number
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    empresa?: EmpresaUpdateOneRequiredWithoutExportacoesTxtNestedInput
  }

  export type ExportacaoTxtUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    periodoInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    periodoFim?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusExportacaoTxtFieldUpdateOperationsInput | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: NullableStringFieldUpdateOperationsInput | string | null
    totalDocumentos?: IntFieldUpdateOperationsInput | number
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExportacaoTxtCreateManyInput = {
    id?: string
    empresaId: string
    periodoInicio: Date | string
    periodoFim: Date | string
    status?: $Enums.StatusExportacaoTxt
    objetoStorageTxt?: string | null
    totalDocumentos?: number
    erro?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type ExportacaoTxtUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodoInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    periodoFim?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusExportacaoTxtFieldUpdateOperationsInput | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: NullableStringFieldUpdateOperationsInput | string | null
    totalDocumentos?: IntFieldUpdateOperationsInput | number
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExportacaoTxtUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    periodoInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    periodoFim?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusExportacaoTxtFieldUpdateOperationsInput | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: NullableStringFieldUpdateOperationsInput | string | null
    totalDocumentos?: IntFieldUpdateOperationsInput | number
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FaturaCreateInput = {
    id?: string
    referenciaMes: number
    referenciaAno: number
    valorTotal: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusFatura
    geradaEm?: Date | string
    pagaEm?: Date | string | null
    organizacao: OrganizacaoCreateNestedOneWithoutFaturasInput
    itens?: ItemFaturaCreateNestedManyWithoutFaturaInput
  }

  export type FaturaUncheckedCreateInput = {
    id?: string
    organizacaoId: string
    referenciaMes: number
    referenciaAno: number
    valorTotal: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusFatura
    geradaEm?: Date | string
    pagaEm?: Date | string | null
    itens?: ItemFaturaUncheckedCreateNestedManyWithoutFaturaInput
  }

  export type FaturaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenciaMes?: IntFieldUpdateOperationsInput | number
    referenciaAno?: IntFieldUpdateOperationsInput | number
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFieldUpdateOperationsInput | $Enums.StatusFatura
    geradaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    pagaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizacao?: OrganizacaoUpdateOneRequiredWithoutFaturasNestedInput
    itens?: ItemFaturaUpdateManyWithoutFaturaNestedInput
  }

  export type FaturaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    referenciaMes?: IntFieldUpdateOperationsInput | number
    referenciaAno?: IntFieldUpdateOperationsInput | number
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFieldUpdateOperationsInput | $Enums.StatusFatura
    geradaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    pagaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: ItemFaturaUncheckedUpdateManyWithoutFaturaNestedInput
  }

  export type FaturaCreateManyInput = {
    id?: string
    organizacaoId: string
    referenciaMes: number
    referenciaAno: number
    valorTotal: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusFatura
    geradaEm?: Date | string
    pagaEm?: Date | string | null
  }

  export type FaturaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenciaMes?: IntFieldUpdateOperationsInput | number
    referenciaAno?: IntFieldUpdateOperationsInput | number
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFieldUpdateOperationsInput | $Enums.StatusFatura
    geradaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    pagaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FaturaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    referenciaMes?: IntFieldUpdateOperationsInput | number
    referenciaAno?: IntFieldUpdateOperationsInput | number
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFieldUpdateOperationsInput | $Enums.StatusFatura
    geradaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    pagaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFaturaCreateInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    fatura: FaturaCreateNestedOneWithoutItensInput
    empresa: EmpresaCreateNestedOneWithoutItensFaturaInput
  }

  export type ItemFaturaUncheckedCreateInput = {
    id?: string
    faturaId: string
    empresaId: string
    valor: Decimal | DecimalJsLike | number | string
  }

  export type ItemFaturaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fatura?: FaturaUpdateOneRequiredWithoutItensNestedInput
    empresa?: EmpresaUpdateOneRequiredWithoutItensFaturaNestedInput
  }

  export type ItemFaturaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ItemFaturaCreateManyInput = {
    id?: string
    faturaId: string
    empresaId: string
    valor: Decimal | DecimalJsLike | number | string
  }

  export type ItemFaturaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ItemFaturaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaId?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AuditLogCreateInput = {
    id?: string
    usuarioId?: string | null
    acao: string
    entidade: string
    entidadeId?: string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
    organizacao?: OrganizacaoCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    organizacaoId?: string | null
    usuarioId?: string | null
    acao: string
    entidade: string
    entidadeId?: string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: StringFieldUpdateOperationsInput | string
    entidade?: StringFieldUpdateOperationsInput | string
    entidadeId?: NullableStringFieldUpdateOperationsInput | string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: StringFieldUpdateOperationsInput | string
    entidade?: StringFieldUpdateOperationsInput | string
    entidadeId?: NullableStringFieldUpdateOperationsInput | string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    organizacaoId?: string | null
    usuarioId?: string | null
    acao: string
    entidade: string
    entidadeId?: string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: StringFieldUpdateOperationsInput | string
    entidade?: StringFieldUpdateOperationsInput | string
    entidadeId?: NullableStringFieldUpdateOperationsInput | string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: StringFieldUpdateOperationsInput | string
    entidade?: StringFieldUpdateOperationsInput | string
    entidadeId?: NullableStringFieldUpdateOperationsInput | string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EmpresaListRelationFilter = {
    every?: EmpresaWhereInput
    some?: EmpresaWhereInput
    none?: EmpresaWhereInput
  }

  export type RegraFiscalListRelationFilter = {
    every?: RegraFiscalWhereInput
    some?: RegraFiscalWhereInput
    none?: RegraFiscalWhereInput
  }

  export type UsuarioListRelationFilter = {
    every?: UsuarioWhereInput
    some?: UsuarioWhereInput
    none?: UsuarioWhereInput
  }

  export type FaturaListRelationFilter = {
    every?: FaturaWhereInput
    some?: FaturaWhereInput
    none?: FaturaWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type EmpresaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegraFiscalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FaturaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizacaoCountOrderByAggregateInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    emailContato?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type OrganizacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    emailContato?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type OrganizacaoMinOrderByAggregateInput = {
    id?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    emailContato?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPapelUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.PapelUsuario | EnumPapelUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.PapelUsuario[] | ListEnumPapelUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.PapelUsuario[] | ListEnumPapelUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumPapelUsuarioFilter<$PrismaModel> | $Enums.PapelUsuario
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrganizacaoNullableScalarRelationFilter = {
    is?: OrganizacaoWhereInput | null
    isNot?: OrganizacaoWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    papel?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    papel?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    papel?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPapelUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PapelUsuario | EnumPapelUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.PapelUsuario[] | ListEnumPapelUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.PapelUsuario[] | ListEnumPapelUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumPapelUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.PapelUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPapelUsuarioFilter<$PrismaModel>
    _max?: NestedEnumPapelUsuarioFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumAmbienteFiscalFilter<$PrismaModel = never> = {
    equals?: $Enums.AmbienteFiscal | EnumAmbienteFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.AmbienteFiscal[] | ListEnumAmbienteFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmbienteFiscal[] | ListEnumAmbienteFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumAmbienteFiscalFilter<$PrismaModel> | $Enums.AmbienteFiscal
  }

  export type EnumStatusEmpresaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusEmpresa | EnumStatusEmpresaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusEmpresa[] | ListEnumStatusEmpresaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusEmpresa[] | ListEnumStatusEmpresaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusEmpresaFilter<$PrismaModel> | $Enums.StatusEmpresa
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OrganizacaoScalarRelationFilter = {
    is?: OrganizacaoWhereInput
    isNot?: OrganizacaoWhereInput
  }

  export type CertificadoNullableScalarRelationFilter = {
    is?: CertificadoWhereInput | null
    isNot?: CertificadoWhereInput | null
  }

  export type DocumentoFiscalListRelationFilter = {
    every?: DocumentoFiscalWhereInput
    some?: DocumentoFiscalWhereInput
    none?: DocumentoFiscalWhereInput
  }

  export type ManifestacaoEventoListRelationFilter = {
    every?: ManifestacaoEventoWhereInput
    some?: ManifestacaoEventoWhereInput
    none?: ManifestacaoEventoWhereInput
  }

  export type ExportacaoTxtListRelationFilter = {
    every?: ExportacaoTxtWhereInput
    some?: ExportacaoTxtWhereInput
    none?: ExportacaoTxtWhereInput
  }

  export type ItemFaturaListRelationFilter = {
    every?: ItemFaturaWhereInput
    some?: ItemFaturaWhereInput
    none?: ItemFaturaWhereInput
  }

  export type NsuControleNullableScalarRelationFilter = {
    is?: NsuControleWhereInput | null
    isNot?: NsuControleWhereInput | null
  }

  export type DocumentoFiscalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ManifestacaoEventoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExportacaoTxtOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemFaturaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmpresaCountOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    cnpj?: SortOrder
    razaoSocial?: SortOrder
    uf?: SortOrder
    codigoUf?: SortOrder
    ambiente?: SortOrder
    status?: SortOrder
    ativadaEm?: SortOrder
    desativadaEm?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EmpresaAvgOrderByAggregateInput = {
    codigoUf?: SortOrder
  }

  export type EmpresaMaxOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    cnpj?: SortOrder
    razaoSocial?: SortOrder
    uf?: SortOrder
    codigoUf?: SortOrder
    ambiente?: SortOrder
    status?: SortOrder
    ativadaEm?: SortOrder
    desativadaEm?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EmpresaMinOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    cnpj?: SortOrder
    razaoSocial?: SortOrder
    uf?: SortOrder
    codigoUf?: SortOrder
    ambiente?: SortOrder
    status?: SortOrder
    ativadaEm?: SortOrder
    desativadaEm?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EmpresaSumOrderByAggregateInput = {
    codigoUf?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumAmbienteFiscalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AmbienteFiscal | EnumAmbienteFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.AmbienteFiscal[] | ListEnumAmbienteFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmbienteFiscal[] | ListEnumAmbienteFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumAmbienteFiscalWithAggregatesFilter<$PrismaModel> | $Enums.AmbienteFiscal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAmbienteFiscalFilter<$PrismaModel>
    _max?: NestedEnumAmbienteFiscalFilter<$PrismaModel>
  }

  export type EnumStatusEmpresaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusEmpresa | EnumStatusEmpresaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusEmpresa[] | ListEnumStatusEmpresaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusEmpresa[] | ListEnumStatusEmpresaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusEmpresaWithAggregatesFilter<$PrismaModel> | $Enums.StatusEmpresa
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusEmpresaFilter<$PrismaModel>
    _max?: NestedEnumStatusEmpresaFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type EmpresaScalarRelationFilter = {
    is?: EmpresaWhereInput
    isNot?: EmpresaWhereInput
  }

  export type NsuControleCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    ultimoNsu?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type NsuControleAvgOrderByAggregateInput = {
    ultimoNsu?: SortOrder
  }

  export type NsuControleMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    ultimoNsu?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type NsuControleMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    ultimoNsu?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type NsuControleSumOrderByAggregateInput = {
    ultimoNsu?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type CertificadoCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nomeArquivoOriginal?: SortOrder
    objetoStorage?: SortOrder
    senhaCriptografada?: SortOrder
    ivCriptografia?: SortOrder
    validoAte?: SortOrder
    alertaVencimentoEnviado?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CertificadoMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nomeArquivoOriginal?: SortOrder
    objetoStorage?: SortOrder
    senhaCriptografada?: SortOrder
    ivCriptografia?: SortOrder
    validoAte?: SortOrder
    alertaVencimentoEnviado?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CertificadoMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    nomeArquivoOriginal?: SortOrder
    objetoStorage?: SortOrder
    senhaCriptografada?: SortOrder
    ivCriptografia?: SortOrder
    validoAte?: SortOrder
    alertaVencimentoEnviado?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EnumTipoDocumentoFiscalFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDocumentoFiscal | EnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.TipoDocumentoFiscal[] | ListEnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoDocumentoFiscal[] | ListEnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoDocumentoFiscalFilter<$PrismaModel> | $Enums.TipoDocumentoFiscal
  }

  export type EnumDirecaoDocumentoFilter<$PrismaModel = never> = {
    equals?: $Enums.DirecaoDocumento | EnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    in?: $Enums.DirecaoDocumento[] | ListEnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.DirecaoDocumento[] | ListEnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    not?: NestedEnumDirecaoDocumentoFilter<$PrismaModel> | $Enums.DirecaoDocumento
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type EnumStatusDocumentoFiscalFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusDocumentoFiscal | EnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.StatusDocumentoFiscal[] | ListEnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusDocumentoFiscal[] | ListEnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusDocumentoFiscalFilter<$PrismaModel> | $Enums.StatusDocumentoFiscal
  }

  export type DocumentoFiscalCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    nsu?: SortOrder
    status?: SortOrder
    cfop?: SortOrder
    objetoStorageXml?: SortOrder
    emitidoEm?: SortOrder
    recebidoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type DocumentoFiscalAvgOrderByAggregateInput = {
    nsu?: SortOrder
  }

  export type DocumentoFiscalMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    nsu?: SortOrder
    status?: SortOrder
    cfop?: SortOrder
    objetoStorageXml?: SortOrder
    emitidoEm?: SortOrder
    recebidoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type DocumentoFiscalMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    chaveAcesso?: SortOrder
    tipo?: SortOrder
    direcao?: SortOrder
    nsu?: SortOrder
    status?: SortOrder
    cfop?: SortOrder
    objetoStorageXml?: SortOrder
    emitidoEm?: SortOrder
    recebidoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type DocumentoFiscalSumOrderByAggregateInput = {
    nsu?: SortOrder
  }

  export type EnumTipoDocumentoFiscalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDocumentoFiscal | EnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.TipoDocumentoFiscal[] | ListEnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoDocumentoFiscal[] | ListEnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoDocumentoFiscalWithAggregatesFilter<$PrismaModel> | $Enums.TipoDocumentoFiscal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoDocumentoFiscalFilter<$PrismaModel>
    _max?: NestedEnumTipoDocumentoFiscalFilter<$PrismaModel>
  }

  export type EnumDirecaoDocumentoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DirecaoDocumento | EnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    in?: $Enums.DirecaoDocumento[] | ListEnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.DirecaoDocumento[] | ListEnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    not?: NestedEnumDirecaoDocumentoWithAggregatesFilter<$PrismaModel> | $Enums.DirecaoDocumento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDirecaoDocumentoFilter<$PrismaModel>
    _max?: NestedEnumDirecaoDocumentoFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EnumStatusDocumentoFiscalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusDocumentoFiscal | EnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.StatusDocumentoFiscal[] | ListEnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusDocumentoFiscal[] | ListEnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusDocumentoFiscalWithAggregatesFilter<$PrismaModel> | $Enums.StatusDocumentoFiscal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusDocumentoFiscalFilter<$PrismaModel>
    _max?: NestedEnumStatusDocumentoFiscalFilter<$PrismaModel>
  }

  export type EnumTipoEventoManifestacaoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoEventoManifestacao | EnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoEventoManifestacao[] | ListEnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoEventoManifestacao[] | ListEnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoEventoManifestacaoFilter<$PrismaModel> | $Enums.TipoEventoManifestacao
  }

  export type EnumStatusManifestacaoFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusManifestacao | EnumStatusManifestacaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusManifestacao[] | ListEnumStatusManifestacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusManifestacao[] | ListEnumStatusManifestacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusManifestacaoFilter<$PrismaModel> | $Enums.StatusManifestacao
  }

  export type DocumentoFiscalScalarRelationFilter = {
    is?: DocumentoFiscalWhereInput
    isNot?: DocumentoFiscalWhereInput
  }

  export type ManifestacaoEventoCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    documentoFiscalId?: SortOrder
    tipoEvento?: SortOrder
    status?: SortOrder
    protocoloSefaz?: SortOrder
    motivoSefaz?: SortOrder
    enviadoEm?: SortOrder
    criadoEm?: SortOrder
  }

  export type ManifestacaoEventoMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    documentoFiscalId?: SortOrder
    tipoEvento?: SortOrder
    status?: SortOrder
    protocoloSefaz?: SortOrder
    motivoSefaz?: SortOrder
    enviadoEm?: SortOrder
    criadoEm?: SortOrder
  }

  export type ManifestacaoEventoMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    documentoFiscalId?: SortOrder
    tipoEvento?: SortOrder
    status?: SortOrder
    protocoloSefaz?: SortOrder
    motivoSefaz?: SortOrder
    enviadoEm?: SortOrder
    criadoEm?: SortOrder
  }

  export type EnumTipoEventoManifestacaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoEventoManifestacao | EnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoEventoManifestacao[] | ListEnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoEventoManifestacao[] | ListEnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoEventoManifestacaoWithAggregatesFilter<$PrismaModel> | $Enums.TipoEventoManifestacao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoEventoManifestacaoFilter<$PrismaModel>
    _max?: NestedEnumTipoEventoManifestacaoFilter<$PrismaModel>
  }

  export type EnumStatusManifestacaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusManifestacao | EnumStatusManifestacaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusManifestacao[] | ListEnumStatusManifestacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusManifestacao[] | ListEnumStatusManifestacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusManifestacaoWithAggregatesFilter<$PrismaModel> | $Enums.StatusManifestacao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusManifestacaoFilter<$PrismaModel>
    _max?: NestedEnumStatusManifestacaoFilter<$PrismaModel>
  }

  export type EmpresaNullableScalarRelationFilter = {
    is?: EmpresaWhereInput | null
    isNot?: EmpresaWhereInput | null
  }

  export type RegraFiscalCountOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    empresaId?: SortOrder
    cfopEntrada?: SortOrder
    descricao?: SortOrder
    observacao?: SortOrder
    acumulador?: SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type RegraFiscalMaxOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    empresaId?: SortOrder
    cfopEntrada?: SortOrder
    descricao?: SortOrder
    observacao?: SortOrder
    acumulador?: SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type RegraFiscalMinOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    empresaId?: SortOrder
    cfopEntrada?: SortOrder
    descricao?: SortOrder
    observacao?: SortOrder
    acumulador?: SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EnumStatusExportacaoTxtFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusExportacaoTxt | EnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    in?: $Enums.StatusExportacaoTxt[] | ListEnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusExportacaoTxt[] | ListEnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusExportacaoTxtFilter<$PrismaModel> | $Enums.StatusExportacaoTxt
  }

  export type ExportacaoTxtCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    periodoInicio?: SortOrder
    periodoFim?: SortOrder
    status?: SortOrder
    objetoStorageTxt?: SortOrder
    totalDocumentos?: SortOrder
    erro?: SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrder
  }

  export type ExportacaoTxtAvgOrderByAggregateInput = {
    totalDocumentos?: SortOrder
  }

  export type ExportacaoTxtMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    periodoInicio?: SortOrder
    periodoFim?: SortOrder
    status?: SortOrder
    objetoStorageTxt?: SortOrder
    totalDocumentos?: SortOrder
    erro?: SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrder
  }

  export type ExportacaoTxtMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    periodoInicio?: SortOrder
    periodoFim?: SortOrder
    status?: SortOrder
    objetoStorageTxt?: SortOrder
    totalDocumentos?: SortOrder
    erro?: SortOrder
    criadoEm?: SortOrder
    concluidoEm?: SortOrder
  }

  export type ExportacaoTxtSumOrderByAggregateInput = {
    totalDocumentos?: SortOrder
  }

  export type EnumStatusExportacaoTxtWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusExportacaoTxt | EnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    in?: $Enums.StatusExportacaoTxt[] | ListEnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusExportacaoTxt[] | ListEnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusExportacaoTxtWithAggregatesFilter<$PrismaModel> | $Enums.StatusExportacaoTxt
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusExportacaoTxtFilter<$PrismaModel>
    _max?: NestedEnumStatusExportacaoTxtFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumStatusFaturaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusFatura | EnumStatusFaturaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusFatura[] | ListEnumStatusFaturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusFatura[] | ListEnumStatusFaturaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFaturaFilter<$PrismaModel> | $Enums.StatusFatura
  }

  export type FaturaOrganizacaoIdReferenciaAnoReferenciaMesCompoundUniqueInput = {
    organizacaoId: string
    referenciaAno: number
    referenciaMes: number
  }

  export type FaturaCountOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    referenciaMes?: SortOrder
    referenciaAno?: SortOrder
    valorTotal?: SortOrder
    status?: SortOrder
    geradaEm?: SortOrder
    pagaEm?: SortOrder
  }

  export type FaturaAvgOrderByAggregateInput = {
    referenciaMes?: SortOrder
    referenciaAno?: SortOrder
    valorTotal?: SortOrder
  }

  export type FaturaMaxOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    referenciaMes?: SortOrder
    referenciaAno?: SortOrder
    valorTotal?: SortOrder
    status?: SortOrder
    geradaEm?: SortOrder
    pagaEm?: SortOrder
  }

  export type FaturaMinOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    referenciaMes?: SortOrder
    referenciaAno?: SortOrder
    valorTotal?: SortOrder
    status?: SortOrder
    geradaEm?: SortOrder
    pagaEm?: SortOrder
  }

  export type FaturaSumOrderByAggregateInput = {
    referenciaMes?: SortOrder
    referenciaAno?: SortOrder
    valorTotal?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumStatusFaturaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusFatura | EnumStatusFaturaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusFatura[] | ListEnumStatusFaturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusFatura[] | ListEnumStatusFaturaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFaturaWithAggregatesFilter<$PrismaModel> | $Enums.StatusFatura
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFaturaFilter<$PrismaModel>
    _max?: NestedEnumStatusFaturaFilter<$PrismaModel>
  }

  export type FaturaScalarRelationFilter = {
    is?: FaturaWhereInput
    isNot?: FaturaWhereInput
  }

  export type ItemFaturaCountOrderByAggregateInput = {
    id?: SortOrder
    faturaId?: SortOrder
    empresaId?: SortOrder
    valor?: SortOrder
  }

  export type ItemFaturaAvgOrderByAggregateInput = {
    valor?: SortOrder
  }

  export type ItemFaturaMaxOrderByAggregateInput = {
    id?: SortOrder
    faturaId?: SortOrder
    empresaId?: SortOrder
    valor?: SortOrder
  }

  export type ItemFaturaMinOrderByAggregateInput = {
    id?: SortOrder
    faturaId?: SortOrder
    empresaId?: SortOrder
    valor?: SortOrder
  }

  export type ItemFaturaSumOrderByAggregateInput = {
    valor?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    usuarioId?: SortOrder
    acao?: SortOrder
    entidade?: SortOrder
    entidadeId?: SortOrder
    detalhes?: SortOrder
    criadoEm?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    usuarioId?: SortOrder
    acao?: SortOrder
    entidade?: SortOrder
    entidadeId?: SortOrder
    criadoEm?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    organizacaoId?: SortOrder
    usuarioId?: SortOrder
    acao?: SortOrder
    entidade?: SortOrder
    entidadeId?: SortOrder
    criadoEm?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EmpresaCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<EmpresaCreateWithoutOrganizacaoInput, EmpresaUncheckedCreateWithoutOrganizacaoInput> | EmpresaCreateWithoutOrganizacaoInput[] | EmpresaUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutOrganizacaoInput | EmpresaCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: EmpresaCreateManyOrganizacaoInputEnvelope
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
  }

  export type RegraFiscalCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<RegraFiscalCreateWithoutOrganizacaoInput, RegraFiscalUncheckedCreateWithoutOrganizacaoInput> | RegraFiscalCreateWithoutOrganizacaoInput[] | RegraFiscalUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: RegraFiscalCreateOrConnectWithoutOrganizacaoInput | RegraFiscalCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: RegraFiscalCreateManyOrganizacaoInputEnvelope
    connect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
  }

  export type UsuarioCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<UsuarioCreateWithoutOrganizacaoInput, UsuarioUncheckedCreateWithoutOrganizacaoInput> | UsuarioCreateWithoutOrganizacaoInput[] | UsuarioUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutOrganizacaoInput | UsuarioCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: UsuarioCreateManyOrganizacaoInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type FaturaCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<FaturaCreateWithoutOrganizacaoInput, FaturaUncheckedCreateWithoutOrganizacaoInput> | FaturaCreateWithoutOrganizacaoInput[] | FaturaUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: FaturaCreateOrConnectWithoutOrganizacaoInput | FaturaCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: FaturaCreateManyOrganizacaoInputEnvelope
    connect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<AuditLogCreateWithoutOrganizacaoInput, AuditLogUncheckedCreateWithoutOrganizacaoInput> | AuditLogCreateWithoutOrganizacaoInput[] | AuditLogUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizacaoInput | AuditLogCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: AuditLogCreateManyOrganizacaoInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type EmpresaUncheckedCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<EmpresaCreateWithoutOrganizacaoInput, EmpresaUncheckedCreateWithoutOrganizacaoInput> | EmpresaCreateWithoutOrganizacaoInput[] | EmpresaUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutOrganizacaoInput | EmpresaCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: EmpresaCreateManyOrganizacaoInputEnvelope
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
  }

  export type RegraFiscalUncheckedCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<RegraFiscalCreateWithoutOrganizacaoInput, RegraFiscalUncheckedCreateWithoutOrganizacaoInput> | RegraFiscalCreateWithoutOrganizacaoInput[] | RegraFiscalUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: RegraFiscalCreateOrConnectWithoutOrganizacaoInput | RegraFiscalCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: RegraFiscalCreateManyOrganizacaoInputEnvelope
    connect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
  }

  export type UsuarioUncheckedCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<UsuarioCreateWithoutOrganizacaoInput, UsuarioUncheckedCreateWithoutOrganizacaoInput> | UsuarioCreateWithoutOrganizacaoInput[] | UsuarioUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutOrganizacaoInput | UsuarioCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: UsuarioCreateManyOrganizacaoInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type FaturaUncheckedCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<FaturaCreateWithoutOrganizacaoInput, FaturaUncheckedCreateWithoutOrganizacaoInput> | FaturaCreateWithoutOrganizacaoInput[] | FaturaUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: FaturaCreateOrConnectWithoutOrganizacaoInput | FaturaCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: FaturaCreateManyOrganizacaoInputEnvelope
    connect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutOrganizacaoInput = {
    create?: XOR<AuditLogCreateWithoutOrganizacaoInput, AuditLogUncheckedCreateWithoutOrganizacaoInput> | AuditLogCreateWithoutOrganizacaoInput[] | AuditLogUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizacaoInput | AuditLogCreateOrConnectWithoutOrganizacaoInput[]
    createMany?: AuditLogCreateManyOrganizacaoInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmpresaUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<EmpresaCreateWithoutOrganizacaoInput, EmpresaUncheckedCreateWithoutOrganizacaoInput> | EmpresaCreateWithoutOrganizacaoInput[] | EmpresaUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutOrganizacaoInput | EmpresaCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: EmpresaUpsertWithWhereUniqueWithoutOrganizacaoInput | EmpresaUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: EmpresaCreateManyOrganizacaoInputEnvelope
    set?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    disconnect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    delete?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    update?: EmpresaUpdateWithWhereUniqueWithoutOrganizacaoInput | EmpresaUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: EmpresaUpdateManyWithWhereWithoutOrganizacaoInput | EmpresaUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
  }

  export type RegraFiscalUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<RegraFiscalCreateWithoutOrganizacaoInput, RegraFiscalUncheckedCreateWithoutOrganizacaoInput> | RegraFiscalCreateWithoutOrganizacaoInput[] | RegraFiscalUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: RegraFiscalCreateOrConnectWithoutOrganizacaoInput | RegraFiscalCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: RegraFiscalUpsertWithWhereUniqueWithoutOrganizacaoInput | RegraFiscalUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: RegraFiscalCreateManyOrganizacaoInputEnvelope
    set?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    disconnect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    delete?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    connect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    update?: RegraFiscalUpdateWithWhereUniqueWithoutOrganizacaoInput | RegraFiscalUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: RegraFiscalUpdateManyWithWhereWithoutOrganizacaoInput | RegraFiscalUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: RegraFiscalScalarWhereInput | RegraFiscalScalarWhereInput[]
  }

  export type UsuarioUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<UsuarioCreateWithoutOrganizacaoInput, UsuarioUncheckedCreateWithoutOrganizacaoInput> | UsuarioCreateWithoutOrganizacaoInput[] | UsuarioUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutOrganizacaoInput | UsuarioCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutOrganizacaoInput | UsuarioUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: UsuarioCreateManyOrganizacaoInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutOrganizacaoInput | UsuarioUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutOrganizacaoInput | UsuarioUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type FaturaUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<FaturaCreateWithoutOrganizacaoInput, FaturaUncheckedCreateWithoutOrganizacaoInput> | FaturaCreateWithoutOrganizacaoInput[] | FaturaUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: FaturaCreateOrConnectWithoutOrganizacaoInput | FaturaCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: FaturaUpsertWithWhereUniqueWithoutOrganizacaoInput | FaturaUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: FaturaCreateManyOrganizacaoInputEnvelope
    set?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    disconnect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    delete?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    connect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    update?: FaturaUpdateWithWhereUniqueWithoutOrganizacaoInput | FaturaUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: FaturaUpdateManyWithWhereWithoutOrganizacaoInput | FaturaUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: FaturaScalarWhereInput | FaturaScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizacaoInput, AuditLogUncheckedCreateWithoutOrganizacaoInput> | AuditLogCreateWithoutOrganizacaoInput[] | AuditLogUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizacaoInput | AuditLogCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizacaoInput | AuditLogUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: AuditLogCreateManyOrganizacaoInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizacaoInput | AuditLogUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizacaoInput | AuditLogUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type EmpresaUncheckedUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<EmpresaCreateWithoutOrganizacaoInput, EmpresaUncheckedCreateWithoutOrganizacaoInput> | EmpresaCreateWithoutOrganizacaoInput[] | EmpresaUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: EmpresaCreateOrConnectWithoutOrganizacaoInput | EmpresaCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: EmpresaUpsertWithWhereUniqueWithoutOrganizacaoInput | EmpresaUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: EmpresaCreateManyOrganizacaoInputEnvelope
    set?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    disconnect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    delete?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    connect?: EmpresaWhereUniqueInput | EmpresaWhereUniqueInput[]
    update?: EmpresaUpdateWithWhereUniqueWithoutOrganizacaoInput | EmpresaUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: EmpresaUpdateManyWithWhereWithoutOrganizacaoInput | EmpresaUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
  }

  export type RegraFiscalUncheckedUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<RegraFiscalCreateWithoutOrganizacaoInput, RegraFiscalUncheckedCreateWithoutOrganizacaoInput> | RegraFiscalCreateWithoutOrganizacaoInput[] | RegraFiscalUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: RegraFiscalCreateOrConnectWithoutOrganizacaoInput | RegraFiscalCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: RegraFiscalUpsertWithWhereUniqueWithoutOrganizacaoInput | RegraFiscalUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: RegraFiscalCreateManyOrganizacaoInputEnvelope
    set?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    disconnect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    delete?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    connect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    update?: RegraFiscalUpdateWithWhereUniqueWithoutOrganizacaoInput | RegraFiscalUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: RegraFiscalUpdateManyWithWhereWithoutOrganizacaoInput | RegraFiscalUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: RegraFiscalScalarWhereInput | RegraFiscalScalarWhereInput[]
  }

  export type UsuarioUncheckedUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<UsuarioCreateWithoutOrganizacaoInput, UsuarioUncheckedCreateWithoutOrganizacaoInput> | UsuarioCreateWithoutOrganizacaoInput[] | UsuarioUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutOrganizacaoInput | UsuarioCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutOrganizacaoInput | UsuarioUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: UsuarioCreateManyOrganizacaoInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutOrganizacaoInput | UsuarioUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutOrganizacaoInput | UsuarioUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type FaturaUncheckedUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<FaturaCreateWithoutOrganizacaoInput, FaturaUncheckedCreateWithoutOrganizacaoInput> | FaturaCreateWithoutOrganizacaoInput[] | FaturaUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: FaturaCreateOrConnectWithoutOrganizacaoInput | FaturaCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: FaturaUpsertWithWhereUniqueWithoutOrganizacaoInput | FaturaUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: FaturaCreateManyOrganizacaoInputEnvelope
    set?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    disconnect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    delete?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    connect?: FaturaWhereUniqueInput | FaturaWhereUniqueInput[]
    update?: FaturaUpdateWithWhereUniqueWithoutOrganizacaoInput | FaturaUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: FaturaUpdateManyWithWhereWithoutOrganizacaoInput | FaturaUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: FaturaScalarWhereInput | FaturaScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizacaoNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizacaoInput, AuditLogUncheckedCreateWithoutOrganizacaoInput> | AuditLogCreateWithoutOrganizacaoInput[] | AuditLogUncheckedCreateWithoutOrganizacaoInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizacaoInput | AuditLogCreateOrConnectWithoutOrganizacaoInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizacaoInput | AuditLogUpsertWithWhereUniqueWithoutOrganizacaoInput[]
    createMany?: AuditLogCreateManyOrganizacaoInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizacaoInput | AuditLogUpdateWithWhereUniqueWithoutOrganizacaoInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizacaoInput | AuditLogUpdateManyWithWhereWithoutOrganizacaoInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type OrganizacaoCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<OrganizacaoCreateWithoutUsuariosInput, OrganizacaoUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutUsuariosInput
    connect?: OrganizacaoWhereUniqueInput
  }

  export type EnumPapelUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.PapelUsuario
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrganizacaoUpdateOneWithoutUsuariosNestedInput = {
    create?: XOR<OrganizacaoCreateWithoutUsuariosInput, OrganizacaoUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutUsuariosInput
    upsert?: OrganizacaoUpsertWithoutUsuariosInput
    disconnect?: OrganizacaoWhereInput | boolean
    delete?: OrganizacaoWhereInput | boolean
    connect?: OrganizacaoWhereUniqueInput
    update?: XOR<XOR<OrganizacaoUpdateToOneWithWhereWithoutUsuariosInput, OrganizacaoUpdateWithoutUsuariosInput>, OrganizacaoUncheckedUpdateWithoutUsuariosInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type OrganizacaoCreateNestedOneWithoutEmpresasInput = {
    create?: XOR<OrganizacaoCreateWithoutEmpresasInput, OrganizacaoUncheckedCreateWithoutEmpresasInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutEmpresasInput
    connect?: OrganizacaoWhereUniqueInput
  }

  export type CertificadoCreateNestedOneWithoutEmpresaInput = {
    create?: XOR<CertificadoCreateWithoutEmpresaInput, CertificadoUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: CertificadoCreateOrConnectWithoutEmpresaInput
    connect?: CertificadoWhereUniqueInput
  }

  export type DocumentoFiscalCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<DocumentoFiscalCreateWithoutEmpresaInput, DocumentoFiscalUncheckedCreateWithoutEmpresaInput> | DocumentoFiscalCreateWithoutEmpresaInput[] | DocumentoFiscalUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: DocumentoFiscalCreateOrConnectWithoutEmpresaInput | DocumentoFiscalCreateOrConnectWithoutEmpresaInput[]
    createMany?: DocumentoFiscalCreateManyEmpresaInputEnvelope
    connect?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
  }

  export type ManifestacaoEventoCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ManifestacaoEventoCreateWithoutEmpresaInput, ManifestacaoEventoUncheckedCreateWithoutEmpresaInput> | ManifestacaoEventoCreateWithoutEmpresaInput[] | ManifestacaoEventoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ManifestacaoEventoCreateOrConnectWithoutEmpresaInput | ManifestacaoEventoCreateOrConnectWithoutEmpresaInput[]
    createMany?: ManifestacaoEventoCreateManyEmpresaInputEnvelope
    connect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
  }

  export type ExportacaoTxtCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ExportacaoTxtCreateWithoutEmpresaInput, ExportacaoTxtUncheckedCreateWithoutEmpresaInput> | ExportacaoTxtCreateWithoutEmpresaInput[] | ExportacaoTxtUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ExportacaoTxtCreateOrConnectWithoutEmpresaInput | ExportacaoTxtCreateOrConnectWithoutEmpresaInput[]
    createMany?: ExportacaoTxtCreateManyEmpresaInputEnvelope
    connect?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
  }

  export type ItemFaturaCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ItemFaturaCreateWithoutEmpresaInput, ItemFaturaUncheckedCreateWithoutEmpresaInput> | ItemFaturaCreateWithoutEmpresaInput[] | ItemFaturaUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ItemFaturaCreateOrConnectWithoutEmpresaInput | ItemFaturaCreateOrConnectWithoutEmpresaInput[]
    createMany?: ItemFaturaCreateManyEmpresaInputEnvelope
    connect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
  }

  export type NsuControleCreateNestedOneWithoutEmpresaInput = {
    create?: XOR<NsuControleCreateWithoutEmpresaInput, NsuControleUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: NsuControleCreateOrConnectWithoutEmpresaInput
    connect?: NsuControleWhereUniqueInput
  }

  export type RegraFiscalCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<RegraFiscalCreateWithoutEmpresaInput, RegraFiscalUncheckedCreateWithoutEmpresaInput> | RegraFiscalCreateWithoutEmpresaInput[] | RegraFiscalUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: RegraFiscalCreateOrConnectWithoutEmpresaInput | RegraFiscalCreateOrConnectWithoutEmpresaInput[]
    createMany?: RegraFiscalCreateManyEmpresaInputEnvelope
    connect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
  }

  export type CertificadoUncheckedCreateNestedOneWithoutEmpresaInput = {
    create?: XOR<CertificadoCreateWithoutEmpresaInput, CertificadoUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: CertificadoCreateOrConnectWithoutEmpresaInput
    connect?: CertificadoWhereUniqueInput
  }

  export type DocumentoFiscalUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<DocumentoFiscalCreateWithoutEmpresaInput, DocumentoFiscalUncheckedCreateWithoutEmpresaInput> | DocumentoFiscalCreateWithoutEmpresaInput[] | DocumentoFiscalUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: DocumentoFiscalCreateOrConnectWithoutEmpresaInput | DocumentoFiscalCreateOrConnectWithoutEmpresaInput[]
    createMany?: DocumentoFiscalCreateManyEmpresaInputEnvelope
    connect?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
  }

  export type ManifestacaoEventoUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ManifestacaoEventoCreateWithoutEmpresaInput, ManifestacaoEventoUncheckedCreateWithoutEmpresaInput> | ManifestacaoEventoCreateWithoutEmpresaInput[] | ManifestacaoEventoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ManifestacaoEventoCreateOrConnectWithoutEmpresaInput | ManifestacaoEventoCreateOrConnectWithoutEmpresaInput[]
    createMany?: ManifestacaoEventoCreateManyEmpresaInputEnvelope
    connect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
  }

  export type ExportacaoTxtUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ExportacaoTxtCreateWithoutEmpresaInput, ExportacaoTxtUncheckedCreateWithoutEmpresaInput> | ExportacaoTxtCreateWithoutEmpresaInput[] | ExportacaoTxtUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ExportacaoTxtCreateOrConnectWithoutEmpresaInput | ExportacaoTxtCreateOrConnectWithoutEmpresaInput[]
    createMany?: ExportacaoTxtCreateManyEmpresaInputEnvelope
    connect?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
  }

  export type ItemFaturaUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ItemFaturaCreateWithoutEmpresaInput, ItemFaturaUncheckedCreateWithoutEmpresaInput> | ItemFaturaCreateWithoutEmpresaInput[] | ItemFaturaUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ItemFaturaCreateOrConnectWithoutEmpresaInput | ItemFaturaCreateOrConnectWithoutEmpresaInput[]
    createMany?: ItemFaturaCreateManyEmpresaInputEnvelope
    connect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
  }

  export type NsuControleUncheckedCreateNestedOneWithoutEmpresaInput = {
    create?: XOR<NsuControleCreateWithoutEmpresaInput, NsuControleUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: NsuControleCreateOrConnectWithoutEmpresaInput
    connect?: NsuControleWhereUniqueInput
  }

  export type RegraFiscalUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<RegraFiscalCreateWithoutEmpresaInput, RegraFiscalUncheckedCreateWithoutEmpresaInput> | RegraFiscalCreateWithoutEmpresaInput[] | RegraFiscalUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: RegraFiscalCreateOrConnectWithoutEmpresaInput | RegraFiscalCreateOrConnectWithoutEmpresaInput[]
    createMany?: RegraFiscalCreateManyEmpresaInputEnvelope
    connect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumAmbienteFiscalFieldUpdateOperationsInput = {
    set?: $Enums.AmbienteFiscal
  }

  export type EnumStatusEmpresaFieldUpdateOperationsInput = {
    set?: $Enums.StatusEmpresa
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrganizacaoUpdateOneRequiredWithoutEmpresasNestedInput = {
    create?: XOR<OrganizacaoCreateWithoutEmpresasInput, OrganizacaoUncheckedCreateWithoutEmpresasInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutEmpresasInput
    upsert?: OrganizacaoUpsertWithoutEmpresasInput
    connect?: OrganizacaoWhereUniqueInput
    update?: XOR<XOR<OrganizacaoUpdateToOneWithWhereWithoutEmpresasInput, OrganizacaoUpdateWithoutEmpresasInput>, OrganizacaoUncheckedUpdateWithoutEmpresasInput>
  }

  export type CertificadoUpdateOneWithoutEmpresaNestedInput = {
    create?: XOR<CertificadoCreateWithoutEmpresaInput, CertificadoUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: CertificadoCreateOrConnectWithoutEmpresaInput
    upsert?: CertificadoUpsertWithoutEmpresaInput
    disconnect?: CertificadoWhereInput | boolean
    delete?: CertificadoWhereInput | boolean
    connect?: CertificadoWhereUniqueInput
    update?: XOR<XOR<CertificadoUpdateToOneWithWhereWithoutEmpresaInput, CertificadoUpdateWithoutEmpresaInput>, CertificadoUncheckedUpdateWithoutEmpresaInput>
  }

  export type DocumentoFiscalUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<DocumentoFiscalCreateWithoutEmpresaInput, DocumentoFiscalUncheckedCreateWithoutEmpresaInput> | DocumentoFiscalCreateWithoutEmpresaInput[] | DocumentoFiscalUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: DocumentoFiscalCreateOrConnectWithoutEmpresaInput | DocumentoFiscalCreateOrConnectWithoutEmpresaInput[]
    upsert?: DocumentoFiscalUpsertWithWhereUniqueWithoutEmpresaInput | DocumentoFiscalUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: DocumentoFiscalCreateManyEmpresaInputEnvelope
    set?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
    disconnect?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
    delete?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
    connect?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
    update?: DocumentoFiscalUpdateWithWhereUniqueWithoutEmpresaInput | DocumentoFiscalUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: DocumentoFiscalUpdateManyWithWhereWithoutEmpresaInput | DocumentoFiscalUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: DocumentoFiscalScalarWhereInput | DocumentoFiscalScalarWhereInput[]
  }

  export type ManifestacaoEventoUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ManifestacaoEventoCreateWithoutEmpresaInput, ManifestacaoEventoUncheckedCreateWithoutEmpresaInput> | ManifestacaoEventoCreateWithoutEmpresaInput[] | ManifestacaoEventoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ManifestacaoEventoCreateOrConnectWithoutEmpresaInput | ManifestacaoEventoCreateOrConnectWithoutEmpresaInput[]
    upsert?: ManifestacaoEventoUpsertWithWhereUniqueWithoutEmpresaInput | ManifestacaoEventoUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ManifestacaoEventoCreateManyEmpresaInputEnvelope
    set?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    disconnect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    delete?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    connect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    update?: ManifestacaoEventoUpdateWithWhereUniqueWithoutEmpresaInput | ManifestacaoEventoUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ManifestacaoEventoUpdateManyWithWhereWithoutEmpresaInput | ManifestacaoEventoUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ManifestacaoEventoScalarWhereInput | ManifestacaoEventoScalarWhereInput[]
  }

  export type ExportacaoTxtUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ExportacaoTxtCreateWithoutEmpresaInput, ExportacaoTxtUncheckedCreateWithoutEmpresaInput> | ExportacaoTxtCreateWithoutEmpresaInput[] | ExportacaoTxtUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ExportacaoTxtCreateOrConnectWithoutEmpresaInput | ExportacaoTxtCreateOrConnectWithoutEmpresaInput[]
    upsert?: ExportacaoTxtUpsertWithWhereUniqueWithoutEmpresaInput | ExportacaoTxtUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ExportacaoTxtCreateManyEmpresaInputEnvelope
    set?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
    disconnect?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
    delete?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
    connect?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
    update?: ExportacaoTxtUpdateWithWhereUniqueWithoutEmpresaInput | ExportacaoTxtUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ExportacaoTxtUpdateManyWithWhereWithoutEmpresaInput | ExportacaoTxtUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ExportacaoTxtScalarWhereInput | ExportacaoTxtScalarWhereInput[]
  }

  export type ItemFaturaUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ItemFaturaCreateWithoutEmpresaInput, ItemFaturaUncheckedCreateWithoutEmpresaInput> | ItemFaturaCreateWithoutEmpresaInput[] | ItemFaturaUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ItemFaturaCreateOrConnectWithoutEmpresaInput | ItemFaturaCreateOrConnectWithoutEmpresaInput[]
    upsert?: ItemFaturaUpsertWithWhereUniqueWithoutEmpresaInput | ItemFaturaUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ItemFaturaCreateManyEmpresaInputEnvelope
    set?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    disconnect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    delete?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    connect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    update?: ItemFaturaUpdateWithWhereUniqueWithoutEmpresaInput | ItemFaturaUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ItemFaturaUpdateManyWithWhereWithoutEmpresaInput | ItemFaturaUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ItemFaturaScalarWhereInput | ItemFaturaScalarWhereInput[]
  }

  export type NsuControleUpdateOneWithoutEmpresaNestedInput = {
    create?: XOR<NsuControleCreateWithoutEmpresaInput, NsuControleUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: NsuControleCreateOrConnectWithoutEmpresaInput
    upsert?: NsuControleUpsertWithoutEmpresaInput
    disconnect?: NsuControleWhereInput | boolean
    delete?: NsuControleWhereInput | boolean
    connect?: NsuControleWhereUniqueInput
    update?: XOR<XOR<NsuControleUpdateToOneWithWhereWithoutEmpresaInput, NsuControleUpdateWithoutEmpresaInput>, NsuControleUncheckedUpdateWithoutEmpresaInput>
  }

  export type RegraFiscalUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<RegraFiscalCreateWithoutEmpresaInput, RegraFiscalUncheckedCreateWithoutEmpresaInput> | RegraFiscalCreateWithoutEmpresaInput[] | RegraFiscalUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: RegraFiscalCreateOrConnectWithoutEmpresaInput | RegraFiscalCreateOrConnectWithoutEmpresaInput[]
    upsert?: RegraFiscalUpsertWithWhereUniqueWithoutEmpresaInput | RegraFiscalUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: RegraFiscalCreateManyEmpresaInputEnvelope
    set?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    disconnect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    delete?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    connect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    update?: RegraFiscalUpdateWithWhereUniqueWithoutEmpresaInput | RegraFiscalUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: RegraFiscalUpdateManyWithWhereWithoutEmpresaInput | RegraFiscalUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: RegraFiscalScalarWhereInput | RegraFiscalScalarWhereInput[]
  }

  export type CertificadoUncheckedUpdateOneWithoutEmpresaNestedInput = {
    create?: XOR<CertificadoCreateWithoutEmpresaInput, CertificadoUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: CertificadoCreateOrConnectWithoutEmpresaInput
    upsert?: CertificadoUpsertWithoutEmpresaInput
    disconnect?: CertificadoWhereInput | boolean
    delete?: CertificadoWhereInput | boolean
    connect?: CertificadoWhereUniqueInput
    update?: XOR<XOR<CertificadoUpdateToOneWithWhereWithoutEmpresaInput, CertificadoUpdateWithoutEmpresaInput>, CertificadoUncheckedUpdateWithoutEmpresaInput>
  }

  export type DocumentoFiscalUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<DocumentoFiscalCreateWithoutEmpresaInput, DocumentoFiscalUncheckedCreateWithoutEmpresaInput> | DocumentoFiscalCreateWithoutEmpresaInput[] | DocumentoFiscalUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: DocumentoFiscalCreateOrConnectWithoutEmpresaInput | DocumentoFiscalCreateOrConnectWithoutEmpresaInput[]
    upsert?: DocumentoFiscalUpsertWithWhereUniqueWithoutEmpresaInput | DocumentoFiscalUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: DocumentoFiscalCreateManyEmpresaInputEnvelope
    set?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
    disconnect?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
    delete?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
    connect?: DocumentoFiscalWhereUniqueInput | DocumentoFiscalWhereUniqueInput[]
    update?: DocumentoFiscalUpdateWithWhereUniqueWithoutEmpresaInput | DocumentoFiscalUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: DocumentoFiscalUpdateManyWithWhereWithoutEmpresaInput | DocumentoFiscalUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: DocumentoFiscalScalarWhereInput | DocumentoFiscalScalarWhereInput[]
  }

  export type ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ManifestacaoEventoCreateWithoutEmpresaInput, ManifestacaoEventoUncheckedCreateWithoutEmpresaInput> | ManifestacaoEventoCreateWithoutEmpresaInput[] | ManifestacaoEventoUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ManifestacaoEventoCreateOrConnectWithoutEmpresaInput | ManifestacaoEventoCreateOrConnectWithoutEmpresaInput[]
    upsert?: ManifestacaoEventoUpsertWithWhereUniqueWithoutEmpresaInput | ManifestacaoEventoUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ManifestacaoEventoCreateManyEmpresaInputEnvelope
    set?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    disconnect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    delete?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    connect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    update?: ManifestacaoEventoUpdateWithWhereUniqueWithoutEmpresaInput | ManifestacaoEventoUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ManifestacaoEventoUpdateManyWithWhereWithoutEmpresaInput | ManifestacaoEventoUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ManifestacaoEventoScalarWhereInput | ManifestacaoEventoScalarWhereInput[]
  }

  export type ExportacaoTxtUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ExportacaoTxtCreateWithoutEmpresaInput, ExportacaoTxtUncheckedCreateWithoutEmpresaInput> | ExportacaoTxtCreateWithoutEmpresaInput[] | ExportacaoTxtUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ExportacaoTxtCreateOrConnectWithoutEmpresaInput | ExportacaoTxtCreateOrConnectWithoutEmpresaInput[]
    upsert?: ExportacaoTxtUpsertWithWhereUniqueWithoutEmpresaInput | ExportacaoTxtUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ExportacaoTxtCreateManyEmpresaInputEnvelope
    set?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
    disconnect?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
    delete?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
    connect?: ExportacaoTxtWhereUniqueInput | ExportacaoTxtWhereUniqueInput[]
    update?: ExportacaoTxtUpdateWithWhereUniqueWithoutEmpresaInput | ExportacaoTxtUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ExportacaoTxtUpdateManyWithWhereWithoutEmpresaInput | ExportacaoTxtUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ExportacaoTxtScalarWhereInput | ExportacaoTxtScalarWhereInput[]
  }

  export type ItemFaturaUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ItemFaturaCreateWithoutEmpresaInput, ItemFaturaUncheckedCreateWithoutEmpresaInput> | ItemFaturaCreateWithoutEmpresaInput[] | ItemFaturaUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ItemFaturaCreateOrConnectWithoutEmpresaInput | ItemFaturaCreateOrConnectWithoutEmpresaInput[]
    upsert?: ItemFaturaUpsertWithWhereUniqueWithoutEmpresaInput | ItemFaturaUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ItemFaturaCreateManyEmpresaInputEnvelope
    set?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    disconnect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    delete?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    connect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    update?: ItemFaturaUpdateWithWhereUniqueWithoutEmpresaInput | ItemFaturaUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ItemFaturaUpdateManyWithWhereWithoutEmpresaInput | ItemFaturaUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ItemFaturaScalarWhereInput | ItemFaturaScalarWhereInput[]
  }

  export type NsuControleUncheckedUpdateOneWithoutEmpresaNestedInput = {
    create?: XOR<NsuControleCreateWithoutEmpresaInput, NsuControleUncheckedCreateWithoutEmpresaInput>
    connectOrCreate?: NsuControleCreateOrConnectWithoutEmpresaInput
    upsert?: NsuControleUpsertWithoutEmpresaInput
    disconnect?: NsuControleWhereInput | boolean
    delete?: NsuControleWhereInput | boolean
    connect?: NsuControleWhereUniqueInput
    update?: XOR<XOR<NsuControleUpdateToOneWithWhereWithoutEmpresaInput, NsuControleUpdateWithoutEmpresaInput>, NsuControleUncheckedUpdateWithoutEmpresaInput>
  }

  export type RegraFiscalUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<RegraFiscalCreateWithoutEmpresaInput, RegraFiscalUncheckedCreateWithoutEmpresaInput> | RegraFiscalCreateWithoutEmpresaInput[] | RegraFiscalUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: RegraFiscalCreateOrConnectWithoutEmpresaInput | RegraFiscalCreateOrConnectWithoutEmpresaInput[]
    upsert?: RegraFiscalUpsertWithWhereUniqueWithoutEmpresaInput | RegraFiscalUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: RegraFiscalCreateManyEmpresaInputEnvelope
    set?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    disconnect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    delete?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    connect?: RegraFiscalWhereUniqueInput | RegraFiscalWhereUniqueInput[]
    update?: RegraFiscalUpdateWithWhereUniqueWithoutEmpresaInput | RegraFiscalUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: RegraFiscalUpdateManyWithWhereWithoutEmpresaInput | RegraFiscalUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: RegraFiscalScalarWhereInput | RegraFiscalScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutNsuControleInput = {
    create?: XOR<EmpresaCreateWithoutNsuControleInput, EmpresaUncheckedCreateWithoutNsuControleInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutNsuControleInput
    connect?: EmpresaWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EmpresaUpdateOneRequiredWithoutNsuControleNestedInput = {
    create?: XOR<EmpresaCreateWithoutNsuControleInput, EmpresaUncheckedCreateWithoutNsuControleInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutNsuControleInput
    upsert?: EmpresaUpsertWithoutNsuControleInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutNsuControleInput, EmpresaUpdateWithoutNsuControleInput>, EmpresaUncheckedUpdateWithoutNsuControleInput>
  }

  export type EmpresaCreateNestedOneWithoutCertificadoInput = {
    create?: XOR<EmpresaCreateWithoutCertificadoInput, EmpresaUncheckedCreateWithoutCertificadoInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutCertificadoInput
    connect?: EmpresaWhereUniqueInput
  }

  export type EmpresaUpdateOneRequiredWithoutCertificadoNestedInput = {
    create?: XOR<EmpresaCreateWithoutCertificadoInput, EmpresaUncheckedCreateWithoutCertificadoInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutCertificadoInput
    upsert?: EmpresaUpsertWithoutCertificadoInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutCertificadoInput, EmpresaUpdateWithoutCertificadoInput>, EmpresaUncheckedUpdateWithoutCertificadoInput>
  }

  export type EmpresaCreateNestedOneWithoutDocumentosFiscaisInput = {
    create?: XOR<EmpresaCreateWithoutDocumentosFiscaisInput, EmpresaUncheckedCreateWithoutDocumentosFiscaisInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutDocumentosFiscaisInput
    connect?: EmpresaWhereUniqueInput
  }

  export type ManifestacaoEventoCreateNestedManyWithoutDocumentoFiscalInput = {
    create?: XOR<ManifestacaoEventoCreateWithoutDocumentoFiscalInput, ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput> | ManifestacaoEventoCreateWithoutDocumentoFiscalInput[] | ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput[]
    connectOrCreate?: ManifestacaoEventoCreateOrConnectWithoutDocumentoFiscalInput | ManifestacaoEventoCreateOrConnectWithoutDocumentoFiscalInput[]
    createMany?: ManifestacaoEventoCreateManyDocumentoFiscalInputEnvelope
    connect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
  }

  export type ManifestacaoEventoUncheckedCreateNestedManyWithoutDocumentoFiscalInput = {
    create?: XOR<ManifestacaoEventoCreateWithoutDocumentoFiscalInput, ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput> | ManifestacaoEventoCreateWithoutDocumentoFiscalInput[] | ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput[]
    connectOrCreate?: ManifestacaoEventoCreateOrConnectWithoutDocumentoFiscalInput | ManifestacaoEventoCreateOrConnectWithoutDocumentoFiscalInput[]
    createMany?: ManifestacaoEventoCreateManyDocumentoFiscalInputEnvelope
    connect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
  }

  export type EnumTipoDocumentoFiscalFieldUpdateOperationsInput = {
    set?: $Enums.TipoDocumentoFiscal
  }

  export type EnumDirecaoDocumentoFieldUpdateOperationsInput = {
    set?: $Enums.DirecaoDocumento
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumStatusDocumentoFiscalFieldUpdateOperationsInput = {
    set?: $Enums.StatusDocumentoFiscal
  }

  export type EmpresaUpdateOneRequiredWithoutDocumentosFiscaisNestedInput = {
    create?: XOR<EmpresaCreateWithoutDocumentosFiscaisInput, EmpresaUncheckedCreateWithoutDocumentosFiscaisInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutDocumentosFiscaisInput
    upsert?: EmpresaUpsertWithoutDocumentosFiscaisInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutDocumentosFiscaisInput, EmpresaUpdateWithoutDocumentosFiscaisInput>, EmpresaUncheckedUpdateWithoutDocumentosFiscaisInput>
  }

  export type ManifestacaoEventoUpdateManyWithoutDocumentoFiscalNestedInput = {
    create?: XOR<ManifestacaoEventoCreateWithoutDocumentoFiscalInput, ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput> | ManifestacaoEventoCreateWithoutDocumentoFiscalInput[] | ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput[]
    connectOrCreate?: ManifestacaoEventoCreateOrConnectWithoutDocumentoFiscalInput | ManifestacaoEventoCreateOrConnectWithoutDocumentoFiscalInput[]
    upsert?: ManifestacaoEventoUpsertWithWhereUniqueWithoutDocumentoFiscalInput | ManifestacaoEventoUpsertWithWhereUniqueWithoutDocumentoFiscalInput[]
    createMany?: ManifestacaoEventoCreateManyDocumentoFiscalInputEnvelope
    set?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    disconnect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    delete?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    connect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    update?: ManifestacaoEventoUpdateWithWhereUniqueWithoutDocumentoFiscalInput | ManifestacaoEventoUpdateWithWhereUniqueWithoutDocumentoFiscalInput[]
    updateMany?: ManifestacaoEventoUpdateManyWithWhereWithoutDocumentoFiscalInput | ManifestacaoEventoUpdateManyWithWhereWithoutDocumentoFiscalInput[]
    deleteMany?: ManifestacaoEventoScalarWhereInput | ManifestacaoEventoScalarWhereInput[]
  }

  export type ManifestacaoEventoUncheckedUpdateManyWithoutDocumentoFiscalNestedInput = {
    create?: XOR<ManifestacaoEventoCreateWithoutDocumentoFiscalInput, ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput> | ManifestacaoEventoCreateWithoutDocumentoFiscalInput[] | ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput[]
    connectOrCreate?: ManifestacaoEventoCreateOrConnectWithoutDocumentoFiscalInput | ManifestacaoEventoCreateOrConnectWithoutDocumentoFiscalInput[]
    upsert?: ManifestacaoEventoUpsertWithWhereUniqueWithoutDocumentoFiscalInput | ManifestacaoEventoUpsertWithWhereUniqueWithoutDocumentoFiscalInput[]
    createMany?: ManifestacaoEventoCreateManyDocumentoFiscalInputEnvelope
    set?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    disconnect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    delete?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    connect?: ManifestacaoEventoWhereUniqueInput | ManifestacaoEventoWhereUniqueInput[]
    update?: ManifestacaoEventoUpdateWithWhereUniqueWithoutDocumentoFiscalInput | ManifestacaoEventoUpdateWithWhereUniqueWithoutDocumentoFiscalInput[]
    updateMany?: ManifestacaoEventoUpdateManyWithWhereWithoutDocumentoFiscalInput | ManifestacaoEventoUpdateManyWithWhereWithoutDocumentoFiscalInput[]
    deleteMany?: ManifestacaoEventoScalarWhereInput | ManifestacaoEventoScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutManifestacoesInput = {
    create?: XOR<EmpresaCreateWithoutManifestacoesInput, EmpresaUncheckedCreateWithoutManifestacoesInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutManifestacoesInput
    connect?: EmpresaWhereUniqueInput
  }

  export type DocumentoFiscalCreateNestedOneWithoutManifestacoesInput = {
    create?: XOR<DocumentoFiscalCreateWithoutManifestacoesInput, DocumentoFiscalUncheckedCreateWithoutManifestacoesInput>
    connectOrCreate?: DocumentoFiscalCreateOrConnectWithoutManifestacoesInput
    connect?: DocumentoFiscalWhereUniqueInput
  }

  export type EnumTipoEventoManifestacaoFieldUpdateOperationsInput = {
    set?: $Enums.TipoEventoManifestacao
  }

  export type EnumStatusManifestacaoFieldUpdateOperationsInput = {
    set?: $Enums.StatusManifestacao
  }

  export type EmpresaUpdateOneRequiredWithoutManifestacoesNestedInput = {
    create?: XOR<EmpresaCreateWithoutManifestacoesInput, EmpresaUncheckedCreateWithoutManifestacoesInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutManifestacoesInput
    upsert?: EmpresaUpsertWithoutManifestacoesInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutManifestacoesInput, EmpresaUpdateWithoutManifestacoesInput>, EmpresaUncheckedUpdateWithoutManifestacoesInput>
  }

  export type DocumentoFiscalUpdateOneRequiredWithoutManifestacoesNestedInput = {
    create?: XOR<DocumentoFiscalCreateWithoutManifestacoesInput, DocumentoFiscalUncheckedCreateWithoutManifestacoesInput>
    connectOrCreate?: DocumentoFiscalCreateOrConnectWithoutManifestacoesInput
    upsert?: DocumentoFiscalUpsertWithoutManifestacoesInput
    connect?: DocumentoFiscalWhereUniqueInput
    update?: XOR<XOR<DocumentoFiscalUpdateToOneWithWhereWithoutManifestacoesInput, DocumentoFiscalUpdateWithoutManifestacoesInput>, DocumentoFiscalUncheckedUpdateWithoutManifestacoesInput>
  }

  export type OrganizacaoCreateNestedOneWithoutRegrasFiscaisInput = {
    create?: XOR<OrganizacaoCreateWithoutRegrasFiscaisInput, OrganizacaoUncheckedCreateWithoutRegrasFiscaisInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutRegrasFiscaisInput
    connect?: OrganizacaoWhereUniqueInput
  }

  export type EmpresaCreateNestedOneWithoutRegrasFiscaisOverrideInput = {
    create?: XOR<EmpresaCreateWithoutRegrasFiscaisOverrideInput, EmpresaUncheckedCreateWithoutRegrasFiscaisOverrideInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutRegrasFiscaisOverrideInput
    connect?: EmpresaWhereUniqueInput
  }

  export type OrganizacaoUpdateOneRequiredWithoutRegrasFiscaisNestedInput = {
    create?: XOR<OrganizacaoCreateWithoutRegrasFiscaisInput, OrganizacaoUncheckedCreateWithoutRegrasFiscaisInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutRegrasFiscaisInput
    upsert?: OrganizacaoUpsertWithoutRegrasFiscaisInput
    connect?: OrganizacaoWhereUniqueInput
    update?: XOR<XOR<OrganizacaoUpdateToOneWithWhereWithoutRegrasFiscaisInput, OrganizacaoUpdateWithoutRegrasFiscaisInput>, OrganizacaoUncheckedUpdateWithoutRegrasFiscaisInput>
  }

  export type EmpresaUpdateOneWithoutRegrasFiscaisOverrideNestedInput = {
    create?: XOR<EmpresaCreateWithoutRegrasFiscaisOverrideInput, EmpresaUncheckedCreateWithoutRegrasFiscaisOverrideInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutRegrasFiscaisOverrideInput
    upsert?: EmpresaUpsertWithoutRegrasFiscaisOverrideInput
    disconnect?: EmpresaWhereInput | boolean
    delete?: EmpresaWhereInput | boolean
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutRegrasFiscaisOverrideInput, EmpresaUpdateWithoutRegrasFiscaisOverrideInput>, EmpresaUncheckedUpdateWithoutRegrasFiscaisOverrideInput>
  }

  export type EmpresaCreateNestedOneWithoutExportacoesTxtInput = {
    create?: XOR<EmpresaCreateWithoutExportacoesTxtInput, EmpresaUncheckedCreateWithoutExportacoesTxtInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutExportacoesTxtInput
    connect?: EmpresaWhereUniqueInput
  }

  export type EnumStatusExportacaoTxtFieldUpdateOperationsInput = {
    set?: $Enums.StatusExportacaoTxt
  }

  export type EmpresaUpdateOneRequiredWithoutExportacoesTxtNestedInput = {
    create?: XOR<EmpresaCreateWithoutExportacoesTxtInput, EmpresaUncheckedCreateWithoutExportacoesTxtInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutExportacoesTxtInput
    upsert?: EmpresaUpsertWithoutExportacoesTxtInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutExportacoesTxtInput, EmpresaUpdateWithoutExportacoesTxtInput>, EmpresaUncheckedUpdateWithoutExportacoesTxtInput>
  }

  export type OrganizacaoCreateNestedOneWithoutFaturasInput = {
    create?: XOR<OrganizacaoCreateWithoutFaturasInput, OrganizacaoUncheckedCreateWithoutFaturasInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutFaturasInput
    connect?: OrganizacaoWhereUniqueInput
  }

  export type ItemFaturaCreateNestedManyWithoutFaturaInput = {
    create?: XOR<ItemFaturaCreateWithoutFaturaInput, ItemFaturaUncheckedCreateWithoutFaturaInput> | ItemFaturaCreateWithoutFaturaInput[] | ItemFaturaUncheckedCreateWithoutFaturaInput[]
    connectOrCreate?: ItemFaturaCreateOrConnectWithoutFaturaInput | ItemFaturaCreateOrConnectWithoutFaturaInput[]
    createMany?: ItemFaturaCreateManyFaturaInputEnvelope
    connect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
  }

  export type ItemFaturaUncheckedCreateNestedManyWithoutFaturaInput = {
    create?: XOR<ItemFaturaCreateWithoutFaturaInput, ItemFaturaUncheckedCreateWithoutFaturaInput> | ItemFaturaCreateWithoutFaturaInput[] | ItemFaturaUncheckedCreateWithoutFaturaInput[]
    connectOrCreate?: ItemFaturaCreateOrConnectWithoutFaturaInput | ItemFaturaCreateOrConnectWithoutFaturaInput[]
    createMany?: ItemFaturaCreateManyFaturaInputEnvelope
    connect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumStatusFaturaFieldUpdateOperationsInput = {
    set?: $Enums.StatusFatura
  }

  export type OrganizacaoUpdateOneRequiredWithoutFaturasNestedInput = {
    create?: XOR<OrganizacaoCreateWithoutFaturasInput, OrganizacaoUncheckedCreateWithoutFaturasInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutFaturasInput
    upsert?: OrganizacaoUpsertWithoutFaturasInput
    connect?: OrganizacaoWhereUniqueInput
    update?: XOR<XOR<OrganizacaoUpdateToOneWithWhereWithoutFaturasInput, OrganizacaoUpdateWithoutFaturasInput>, OrganizacaoUncheckedUpdateWithoutFaturasInput>
  }

  export type ItemFaturaUpdateManyWithoutFaturaNestedInput = {
    create?: XOR<ItemFaturaCreateWithoutFaturaInput, ItemFaturaUncheckedCreateWithoutFaturaInput> | ItemFaturaCreateWithoutFaturaInput[] | ItemFaturaUncheckedCreateWithoutFaturaInput[]
    connectOrCreate?: ItemFaturaCreateOrConnectWithoutFaturaInput | ItemFaturaCreateOrConnectWithoutFaturaInput[]
    upsert?: ItemFaturaUpsertWithWhereUniqueWithoutFaturaInput | ItemFaturaUpsertWithWhereUniqueWithoutFaturaInput[]
    createMany?: ItemFaturaCreateManyFaturaInputEnvelope
    set?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    disconnect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    delete?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    connect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    update?: ItemFaturaUpdateWithWhereUniqueWithoutFaturaInput | ItemFaturaUpdateWithWhereUniqueWithoutFaturaInput[]
    updateMany?: ItemFaturaUpdateManyWithWhereWithoutFaturaInput | ItemFaturaUpdateManyWithWhereWithoutFaturaInput[]
    deleteMany?: ItemFaturaScalarWhereInput | ItemFaturaScalarWhereInput[]
  }

  export type ItemFaturaUncheckedUpdateManyWithoutFaturaNestedInput = {
    create?: XOR<ItemFaturaCreateWithoutFaturaInput, ItemFaturaUncheckedCreateWithoutFaturaInput> | ItemFaturaCreateWithoutFaturaInput[] | ItemFaturaUncheckedCreateWithoutFaturaInput[]
    connectOrCreate?: ItemFaturaCreateOrConnectWithoutFaturaInput | ItemFaturaCreateOrConnectWithoutFaturaInput[]
    upsert?: ItemFaturaUpsertWithWhereUniqueWithoutFaturaInput | ItemFaturaUpsertWithWhereUniqueWithoutFaturaInput[]
    createMany?: ItemFaturaCreateManyFaturaInputEnvelope
    set?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    disconnect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    delete?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    connect?: ItemFaturaWhereUniqueInput | ItemFaturaWhereUniqueInput[]
    update?: ItemFaturaUpdateWithWhereUniqueWithoutFaturaInput | ItemFaturaUpdateWithWhereUniqueWithoutFaturaInput[]
    updateMany?: ItemFaturaUpdateManyWithWhereWithoutFaturaInput | ItemFaturaUpdateManyWithWhereWithoutFaturaInput[]
    deleteMany?: ItemFaturaScalarWhereInput | ItemFaturaScalarWhereInput[]
  }

  export type FaturaCreateNestedOneWithoutItensInput = {
    create?: XOR<FaturaCreateWithoutItensInput, FaturaUncheckedCreateWithoutItensInput>
    connectOrCreate?: FaturaCreateOrConnectWithoutItensInput
    connect?: FaturaWhereUniqueInput
  }

  export type EmpresaCreateNestedOneWithoutItensFaturaInput = {
    create?: XOR<EmpresaCreateWithoutItensFaturaInput, EmpresaUncheckedCreateWithoutItensFaturaInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutItensFaturaInput
    connect?: EmpresaWhereUniqueInput
  }

  export type FaturaUpdateOneRequiredWithoutItensNestedInput = {
    create?: XOR<FaturaCreateWithoutItensInput, FaturaUncheckedCreateWithoutItensInput>
    connectOrCreate?: FaturaCreateOrConnectWithoutItensInput
    upsert?: FaturaUpsertWithoutItensInput
    connect?: FaturaWhereUniqueInput
    update?: XOR<XOR<FaturaUpdateToOneWithWhereWithoutItensInput, FaturaUpdateWithoutItensInput>, FaturaUncheckedUpdateWithoutItensInput>
  }

  export type EmpresaUpdateOneRequiredWithoutItensFaturaNestedInput = {
    create?: XOR<EmpresaCreateWithoutItensFaturaInput, EmpresaUncheckedCreateWithoutItensFaturaInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutItensFaturaInput
    upsert?: EmpresaUpsertWithoutItensFaturaInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutItensFaturaInput, EmpresaUpdateWithoutItensFaturaInput>, EmpresaUncheckedUpdateWithoutItensFaturaInput>
  }

  export type OrganizacaoCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<OrganizacaoCreateWithoutAuditLogsInput, OrganizacaoUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutAuditLogsInput
    connect?: OrganizacaoWhereUniqueInput
  }

  export type OrganizacaoUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<OrganizacaoCreateWithoutAuditLogsInput, OrganizacaoUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: OrganizacaoCreateOrConnectWithoutAuditLogsInput
    upsert?: OrganizacaoUpsertWithoutAuditLogsInput
    disconnect?: OrganizacaoWhereInput | boolean
    delete?: OrganizacaoWhereInput | boolean
    connect?: OrganizacaoWhereUniqueInput
    update?: XOR<XOR<OrganizacaoUpdateToOneWithWhereWithoutAuditLogsInput, OrganizacaoUpdateWithoutAuditLogsInput>, OrganizacaoUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPapelUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.PapelUsuario | EnumPapelUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.PapelUsuario[] | ListEnumPapelUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.PapelUsuario[] | ListEnumPapelUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumPapelUsuarioFilter<$PrismaModel> | $Enums.PapelUsuario
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPapelUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PapelUsuario | EnumPapelUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.PapelUsuario[] | ListEnumPapelUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.PapelUsuario[] | ListEnumPapelUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumPapelUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.PapelUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPapelUsuarioFilter<$PrismaModel>
    _max?: NestedEnumPapelUsuarioFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumAmbienteFiscalFilter<$PrismaModel = never> = {
    equals?: $Enums.AmbienteFiscal | EnumAmbienteFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.AmbienteFiscal[] | ListEnumAmbienteFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmbienteFiscal[] | ListEnumAmbienteFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumAmbienteFiscalFilter<$PrismaModel> | $Enums.AmbienteFiscal
  }

  export type NestedEnumStatusEmpresaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusEmpresa | EnumStatusEmpresaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusEmpresa[] | ListEnumStatusEmpresaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusEmpresa[] | ListEnumStatusEmpresaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusEmpresaFilter<$PrismaModel> | $Enums.StatusEmpresa
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumAmbienteFiscalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AmbienteFiscal | EnumAmbienteFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.AmbienteFiscal[] | ListEnumAmbienteFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmbienteFiscal[] | ListEnumAmbienteFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumAmbienteFiscalWithAggregatesFilter<$PrismaModel> | $Enums.AmbienteFiscal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAmbienteFiscalFilter<$PrismaModel>
    _max?: NestedEnumAmbienteFiscalFilter<$PrismaModel>
  }

  export type NestedEnumStatusEmpresaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusEmpresa | EnumStatusEmpresaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusEmpresa[] | ListEnumStatusEmpresaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusEmpresa[] | ListEnumStatusEmpresaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusEmpresaWithAggregatesFilter<$PrismaModel> | $Enums.StatusEmpresa
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusEmpresaFilter<$PrismaModel>
    _max?: NestedEnumStatusEmpresaFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumTipoDocumentoFiscalFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDocumentoFiscal | EnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.TipoDocumentoFiscal[] | ListEnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoDocumentoFiscal[] | ListEnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoDocumentoFiscalFilter<$PrismaModel> | $Enums.TipoDocumentoFiscal
  }

  export type NestedEnumDirecaoDocumentoFilter<$PrismaModel = never> = {
    equals?: $Enums.DirecaoDocumento | EnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    in?: $Enums.DirecaoDocumento[] | ListEnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.DirecaoDocumento[] | ListEnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    not?: NestedEnumDirecaoDocumentoFilter<$PrismaModel> | $Enums.DirecaoDocumento
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedEnumStatusDocumentoFiscalFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusDocumentoFiscal | EnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.StatusDocumentoFiscal[] | ListEnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusDocumentoFiscal[] | ListEnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusDocumentoFiscalFilter<$PrismaModel> | $Enums.StatusDocumentoFiscal
  }

  export type NestedEnumTipoDocumentoFiscalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoDocumentoFiscal | EnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.TipoDocumentoFiscal[] | ListEnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoDocumentoFiscal[] | ListEnumTipoDocumentoFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoDocumentoFiscalWithAggregatesFilter<$PrismaModel> | $Enums.TipoDocumentoFiscal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoDocumentoFiscalFilter<$PrismaModel>
    _max?: NestedEnumTipoDocumentoFiscalFilter<$PrismaModel>
  }

  export type NestedEnumDirecaoDocumentoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DirecaoDocumento | EnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    in?: $Enums.DirecaoDocumento[] | ListEnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.DirecaoDocumento[] | ListEnumDirecaoDocumentoFieldRefInput<$PrismaModel>
    not?: NestedEnumDirecaoDocumentoWithAggregatesFilter<$PrismaModel> | $Enums.DirecaoDocumento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDirecaoDocumentoFilter<$PrismaModel>
    _max?: NestedEnumDirecaoDocumentoFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumStatusDocumentoFiscalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusDocumentoFiscal | EnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    in?: $Enums.StatusDocumentoFiscal[] | ListEnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusDocumentoFiscal[] | ListEnumStatusDocumentoFiscalFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusDocumentoFiscalWithAggregatesFilter<$PrismaModel> | $Enums.StatusDocumentoFiscal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusDocumentoFiscalFilter<$PrismaModel>
    _max?: NestedEnumStatusDocumentoFiscalFilter<$PrismaModel>
  }

  export type NestedEnumTipoEventoManifestacaoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoEventoManifestacao | EnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoEventoManifestacao[] | ListEnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoEventoManifestacao[] | ListEnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoEventoManifestacaoFilter<$PrismaModel> | $Enums.TipoEventoManifestacao
  }

  export type NestedEnumStatusManifestacaoFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusManifestacao | EnumStatusManifestacaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusManifestacao[] | ListEnumStatusManifestacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusManifestacao[] | ListEnumStatusManifestacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusManifestacaoFilter<$PrismaModel> | $Enums.StatusManifestacao
  }

  export type NestedEnumTipoEventoManifestacaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoEventoManifestacao | EnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoEventoManifestacao[] | ListEnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoEventoManifestacao[] | ListEnumTipoEventoManifestacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoEventoManifestacaoWithAggregatesFilter<$PrismaModel> | $Enums.TipoEventoManifestacao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoEventoManifestacaoFilter<$PrismaModel>
    _max?: NestedEnumTipoEventoManifestacaoFilter<$PrismaModel>
  }

  export type NestedEnumStatusManifestacaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusManifestacao | EnumStatusManifestacaoFieldRefInput<$PrismaModel>
    in?: $Enums.StatusManifestacao[] | ListEnumStatusManifestacaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusManifestacao[] | ListEnumStatusManifestacaoFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusManifestacaoWithAggregatesFilter<$PrismaModel> | $Enums.StatusManifestacao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusManifestacaoFilter<$PrismaModel>
    _max?: NestedEnumStatusManifestacaoFilter<$PrismaModel>
  }

  export type NestedEnumStatusExportacaoTxtFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusExportacaoTxt | EnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    in?: $Enums.StatusExportacaoTxt[] | ListEnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusExportacaoTxt[] | ListEnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusExportacaoTxtFilter<$PrismaModel> | $Enums.StatusExportacaoTxt
  }

  export type NestedEnumStatusExportacaoTxtWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusExportacaoTxt | EnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    in?: $Enums.StatusExportacaoTxt[] | ListEnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusExportacaoTxt[] | ListEnumStatusExportacaoTxtFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusExportacaoTxtWithAggregatesFilter<$PrismaModel> | $Enums.StatusExportacaoTxt
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusExportacaoTxtFilter<$PrismaModel>
    _max?: NestedEnumStatusExportacaoTxtFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumStatusFaturaFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusFatura | EnumStatusFaturaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusFatura[] | ListEnumStatusFaturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusFatura[] | ListEnumStatusFaturaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFaturaFilter<$PrismaModel> | $Enums.StatusFatura
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumStatusFaturaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusFatura | EnumStatusFaturaFieldRefInput<$PrismaModel>
    in?: $Enums.StatusFatura[] | ListEnumStatusFaturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusFatura[] | ListEnumStatusFaturaFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFaturaWithAggregatesFilter<$PrismaModel> | $Enums.StatusFatura
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFaturaFilter<$PrismaModel>
    _max?: NestedEnumStatusFaturaFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EmpresaCreateWithoutOrganizacaoInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    certificado?: CertificadoCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutOrganizacaoInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    certificado?: CertificadoUncheckedCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalUncheckedCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtUncheckedCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaUncheckedCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleUncheckedCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutOrganizacaoInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutOrganizacaoInput, EmpresaUncheckedCreateWithoutOrganizacaoInput>
  }

  export type EmpresaCreateManyOrganizacaoInputEnvelope = {
    data: EmpresaCreateManyOrganizacaoInput | EmpresaCreateManyOrganizacaoInput[]
    skipDuplicates?: boolean
  }

  export type RegraFiscalCreateWithoutOrganizacaoInput = {
    id?: string
    cfopEntrada: string
    descricao: string
    observacao?: string | null
    acumulador?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresa?: EmpresaCreateNestedOneWithoutRegrasFiscaisOverrideInput
  }

  export type RegraFiscalUncheckedCreateWithoutOrganizacaoInput = {
    id?: string
    empresaId?: string | null
    cfopEntrada: string
    descricao: string
    observacao?: string | null
    acumulador?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type RegraFiscalCreateOrConnectWithoutOrganizacaoInput = {
    where: RegraFiscalWhereUniqueInput
    create: XOR<RegraFiscalCreateWithoutOrganizacaoInput, RegraFiscalUncheckedCreateWithoutOrganizacaoInput>
  }

  export type RegraFiscalCreateManyOrganizacaoInputEnvelope = {
    data: RegraFiscalCreateManyOrganizacaoInput | RegraFiscalCreateManyOrganizacaoInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioCreateWithoutOrganizacaoInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    papel?: $Enums.PapelUsuario
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type UsuarioUncheckedCreateWithoutOrganizacaoInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    papel?: $Enums.PapelUsuario
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type UsuarioCreateOrConnectWithoutOrganizacaoInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutOrganizacaoInput, UsuarioUncheckedCreateWithoutOrganizacaoInput>
  }

  export type UsuarioCreateManyOrganizacaoInputEnvelope = {
    data: UsuarioCreateManyOrganizacaoInput | UsuarioCreateManyOrganizacaoInput[]
    skipDuplicates?: boolean
  }

  export type FaturaCreateWithoutOrganizacaoInput = {
    id?: string
    referenciaMes: number
    referenciaAno: number
    valorTotal: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusFatura
    geradaEm?: Date | string
    pagaEm?: Date | string | null
    itens?: ItemFaturaCreateNestedManyWithoutFaturaInput
  }

  export type FaturaUncheckedCreateWithoutOrganizacaoInput = {
    id?: string
    referenciaMes: number
    referenciaAno: number
    valorTotal: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusFatura
    geradaEm?: Date | string
    pagaEm?: Date | string | null
    itens?: ItemFaturaUncheckedCreateNestedManyWithoutFaturaInput
  }

  export type FaturaCreateOrConnectWithoutOrganizacaoInput = {
    where: FaturaWhereUniqueInput
    create: XOR<FaturaCreateWithoutOrganizacaoInput, FaturaUncheckedCreateWithoutOrganizacaoInput>
  }

  export type FaturaCreateManyOrganizacaoInputEnvelope = {
    data: FaturaCreateManyOrganizacaoInput | FaturaCreateManyOrganizacaoInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutOrganizacaoInput = {
    id?: string
    usuarioId?: string | null
    acao: string
    entidade: string
    entidadeId?: string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutOrganizacaoInput = {
    id?: string
    usuarioId?: string | null
    acao: string
    entidade: string
    entidadeId?: string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutOrganizacaoInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutOrganizacaoInput, AuditLogUncheckedCreateWithoutOrganizacaoInput>
  }

  export type AuditLogCreateManyOrganizacaoInputEnvelope = {
    data: AuditLogCreateManyOrganizacaoInput | AuditLogCreateManyOrganizacaoInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaUpsertWithWhereUniqueWithoutOrganizacaoInput = {
    where: EmpresaWhereUniqueInput
    update: XOR<EmpresaUpdateWithoutOrganizacaoInput, EmpresaUncheckedUpdateWithoutOrganizacaoInput>
    create: XOR<EmpresaCreateWithoutOrganizacaoInput, EmpresaUncheckedCreateWithoutOrganizacaoInput>
  }

  export type EmpresaUpdateWithWhereUniqueWithoutOrganizacaoInput = {
    where: EmpresaWhereUniqueInput
    data: XOR<EmpresaUpdateWithoutOrganizacaoInput, EmpresaUncheckedUpdateWithoutOrganizacaoInput>
  }

  export type EmpresaUpdateManyWithWhereWithoutOrganizacaoInput = {
    where: EmpresaScalarWhereInput
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyWithoutOrganizacaoInput>
  }

  export type EmpresaScalarWhereInput = {
    AND?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
    OR?: EmpresaScalarWhereInput[]
    NOT?: EmpresaScalarWhereInput | EmpresaScalarWhereInput[]
    id?: StringFilter<"Empresa"> | string
    organizacaoId?: StringFilter<"Empresa"> | string
    cnpj?: StringFilter<"Empresa"> | string
    razaoSocial?: StringFilter<"Empresa"> | string
    uf?: StringFilter<"Empresa"> | string
    codigoUf?: IntFilter<"Empresa"> | number
    ambiente?: EnumAmbienteFiscalFilter<"Empresa"> | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFilter<"Empresa"> | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFilter<"Empresa"> | Date | string
    desativadaEm?: DateTimeNullableFilter<"Empresa"> | Date | string | null
    criadoEm?: DateTimeFilter<"Empresa"> | Date | string
    atualizadoEm?: DateTimeFilter<"Empresa"> | Date | string
  }

  export type RegraFiscalUpsertWithWhereUniqueWithoutOrganizacaoInput = {
    where: RegraFiscalWhereUniqueInput
    update: XOR<RegraFiscalUpdateWithoutOrganizacaoInput, RegraFiscalUncheckedUpdateWithoutOrganizacaoInput>
    create: XOR<RegraFiscalCreateWithoutOrganizacaoInput, RegraFiscalUncheckedCreateWithoutOrganizacaoInput>
  }

  export type RegraFiscalUpdateWithWhereUniqueWithoutOrganizacaoInput = {
    where: RegraFiscalWhereUniqueInput
    data: XOR<RegraFiscalUpdateWithoutOrganizacaoInput, RegraFiscalUncheckedUpdateWithoutOrganizacaoInput>
  }

  export type RegraFiscalUpdateManyWithWhereWithoutOrganizacaoInput = {
    where: RegraFiscalScalarWhereInput
    data: XOR<RegraFiscalUpdateManyMutationInput, RegraFiscalUncheckedUpdateManyWithoutOrganizacaoInput>
  }

  export type RegraFiscalScalarWhereInput = {
    AND?: RegraFiscalScalarWhereInput | RegraFiscalScalarWhereInput[]
    OR?: RegraFiscalScalarWhereInput[]
    NOT?: RegraFiscalScalarWhereInput | RegraFiscalScalarWhereInput[]
    id?: StringFilter<"RegraFiscal"> | string
    organizacaoId?: StringFilter<"RegraFiscal"> | string
    empresaId?: StringNullableFilter<"RegraFiscal"> | string | null
    cfopEntrada?: StringFilter<"RegraFiscal"> | string
    descricao?: StringFilter<"RegraFiscal"> | string
    observacao?: StringNullableFilter<"RegraFiscal"> | string | null
    acumulador?: StringNullableFilter<"RegraFiscal"> | string | null
    ativa?: BoolFilter<"RegraFiscal"> | boolean
    criadoEm?: DateTimeFilter<"RegraFiscal"> | Date | string
    atualizadoEm?: DateTimeFilter<"RegraFiscal"> | Date | string
  }

  export type UsuarioUpsertWithWhereUniqueWithoutOrganizacaoInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutOrganizacaoInput, UsuarioUncheckedUpdateWithoutOrganizacaoInput>
    create: XOR<UsuarioCreateWithoutOrganizacaoInput, UsuarioUncheckedCreateWithoutOrganizacaoInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutOrganizacaoInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutOrganizacaoInput, UsuarioUncheckedUpdateWithoutOrganizacaoInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutOrganizacaoInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutOrganizacaoInput>
  }

  export type UsuarioScalarWhereInput = {
    AND?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    OR?: UsuarioScalarWhereInput[]
    NOT?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    id?: StringFilter<"Usuario"> | string
    organizacaoId?: StringNullableFilter<"Usuario"> | string | null
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senhaHash?: StringFilter<"Usuario"> | string
    papel?: EnumPapelUsuarioFilter<"Usuario"> | $Enums.PapelUsuario
    ativo?: BoolFilter<"Usuario"> | boolean
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
  }

  export type FaturaUpsertWithWhereUniqueWithoutOrganizacaoInput = {
    where: FaturaWhereUniqueInput
    update: XOR<FaturaUpdateWithoutOrganizacaoInput, FaturaUncheckedUpdateWithoutOrganizacaoInput>
    create: XOR<FaturaCreateWithoutOrganizacaoInput, FaturaUncheckedCreateWithoutOrganizacaoInput>
  }

  export type FaturaUpdateWithWhereUniqueWithoutOrganizacaoInput = {
    where: FaturaWhereUniqueInput
    data: XOR<FaturaUpdateWithoutOrganizacaoInput, FaturaUncheckedUpdateWithoutOrganizacaoInput>
  }

  export type FaturaUpdateManyWithWhereWithoutOrganizacaoInput = {
    where: FaturaScalarWhereInput
    data: XOR<FaturaUpdateManyMutationInput, FaturaUncheckedUpdateManyWithoutOrganizacaoInput>
  }

  export type FaturaScalarWhereInput = {
    AND?: FaturaScalarWhereInput | FaturaScalarWhereInput[]
    OR?: FaturaScalarWhereInput[]
    NOT?: FaturaScalarWhereInput | FaturaScalarWhereInput[]
    id?: StringFilter<"Fatura"> | string
    organizacaoId?: StringFilter<"Fatura"> | string
    referenciaMes?: IntFilter<"Fatura"> | number
    referenciaAno?: IntFilter<"Fatura"> | number
    valorTotal?: DecimalFilter<"Fatura"> | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFilter<"Fatura"> | $Enums.StatusFatura
    geradaEm?: DateTimeFilter<"Fatura"> | Date | string
    pagaEm?: DateTimeNullableFilter<"Fatura"> | Date | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutOrganizacaoInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutOrganizacaoInput, AuditLogUncheckedUpdateWithoutOrganizacaoInput>
    create: XOR<AuditLogCreateWithoutOrganizacaoInput, AuditLogUncheckedCreateWithoutOrganizacaoInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutOrganizacaoInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutOrganizacaoInput, AuditLogUncheckedUpdateWithoutOrganizacaoInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutOrganizacaoInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutOrganizacaoInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    organizacaoId?: StringNullableFilter<"AuditLog"> | string | null
    usuarioId?: StringNullableFilter<"AuditLog"> | string | null
    acao?: StringFilter<"AuditLog"> | string
    entidade?: StringFilter<"AuditLog"> | string
    entidadeId?: StringNullableFilter<"AuditLog"> | string | null
    detalhes?: JsonNullableFilter<"AuditLog">
    criadoEm?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type OrganizacaoCreateWithoutUsuariosInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaCreateNestedManyWithoutOrganizacaoInput
    regrasFiscais?: RegraFiscalCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoUncheckedCreateWithoutUsuariosInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaUncheckedCreateNestedManyWithoutOrganizacaoInput
    regrasFiscais?: RegraFiscalUncheckedCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaUncheckedCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoCreateOrConnectWithoutUsuariosInput = {
    where: OrganizacaoWhereUniqueInput
    create: XOR<OrganizacaoCreateWithoutUsuariosInput, OrganizacaoUncheckedCreateWithoutUsuariosInput>
  }

  export type OrganizacaoUpsertWithoutUsuariosInput = {
    update: XOR<OrganizacaoUpdateWithoutUsuariosInput, OrganizacaoUncheckedUpdateWithoutUsuariosInput>
    create: XOR<OrganizacaoCreateWithoutUsuariosInput, OrganizacaoUncheckedCreateWithoutUsuariosInput>
    where?: OrganizacaoWhereInput
  }

  export type OrganizacaoUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: OrganizacaoWhereInput
    data: XOR<OrganizacaoUpdateWithoutUsuariosInput, OrganizacaoUncheckedUpdateWithoutUsuariosInput>
  }

  export type OrganizacaoUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUpdateManyWithoutOrganizacaoNestedInput
    regrasFiscais?: RegraFiscalUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoUncheckedUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUncheckedUpdateManyWithoutOrganizacaoNestedInput
    regrasFiscais?: RegraFiscalUncheckedUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUncheckedUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoCreateWithoutEmpresasInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    regrasFiscais?: RegraFiscalCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoUncheckedCreateWithoutEmpresasInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    regrasFiscais?: RegraFiscalUncheckedCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaUncheckedCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoCreateOrConnectWithoutEmpresasInput = {
    where: OrganizacaoWhereUniqueInput
    create: XOR<OrganizacaoCreateWithoutEmpresasInput, OrganizacaoUncheckedCreateWithoutEmpresasInput>
  }

  export type CertificadoCreateWithoutEmpresaInput = {
    id?: string
    nomeArquivoOriginal: string
    objetoStorage: string
    senhaCriptografada: string
    ivCriptografia: string
    validoAte: Date | string
    alertaVencimentoEnviado?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CertificadoUncheckedCreateWithoutEmpresaInput = {
    id?: string
    nomeArquivoOriginal: string
    objetoStorage: string
    senhaCriptografada: string
    ivCriptografia: string
    validoAte: Date | string
    alertaVencimentoEnviado?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CertificadoCreateOrConnectWithoutEmpresaInput = {
    where: CertificadoWhereUniqueInput
    create: XOR<CertificadoCreateWithoutEmpresaInput, CertificadoUncheckedCreateWithoutEmpresaInput>
  }

  export type DocumentoFiscalCreateWithoutEmpresaInput = {
    id?: string
    chaveAcesso: string
    tipo: $Enums.TipoDocumentoFiscal
    direcao: $Enums.DirecaoDocumento
    nsu?: bigint | number | null
    status?: $Enums.StatusDocumentoFiscal
    cfop?: string | null
    objetoStorageXml: string
    emitidoEm?: Date | string | null
    recebidoEm?: Date | string
    atualizadoEm?: Date | string
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutDocumentoFiscalInput
  }

  export type DocumentoFiscalUncheckedCreateWithoutEmpresaInput = {
    id?: string
    chaveAcesso: string
    tipo: $Enums.TipoDocumentoFiscal
    direcao: $Enums.DirecaoDocumento
    nsu?: bigint | number | null
    status?: $Enums.StatusDocumentoFiscal
    cfop?: string | null
    objetoStorageXml: string
    emitidoEm?: Date | string | null
    recebidoEm?: Date | string
    atualizadoEm?: Date | string
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutDocumentoFiscalInput
  }

  export type DocumentoFiscalCreateOrConnectWithoutEmpresaInput = {
    where: DocumentoFiscalWhereUniqueInput
    create: XOR<DocumentoFiscalCreateWithoutEmpresaInput, DocumentoFiscalUncheckedCreateWithoutEmpresaInput>
  }

  export type DocumentoFiscalCreateManyEmpresaInputEnvelope = {
    data: DocumentoFiscalCreateManyEmpresaInput | DocumentoFiscalCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type ManifestacaoEventoCreateWithoutEmpresaInput = {
    id?: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status?: $Enums.StatusManifestacao
    protocoloSefaz?: string | null
    motivoSefaz?: string | null
    enviadoEm?: Date | string | null
    criadoEm?: Date | string
    documentoFiscal: DocumentoFiscalCreateNestedOneWithoutManifestacoesInput
  }

  export type ManifestacaoEventoUncheckedCreateWithoutEmpresaInput = {
    id?: string
    documentoFiscalId: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status?: $Enums.StatusManifestacao
    protocoloSefaz?: string | null
    motivoSefaz?: string | null
    enviadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ManifestacaoEventoCreateOrConnectWithoutEmpresaInput = {
    where: ManifestacaoEventoWhereUniqueInput
    create: XOR<ManifestacaoEventoCreateWithoutEmpresaInput, ManifestacaoEventoUncheckedCreateWithoutEmpresaInput>
  }

  export type ManifestacaoEventoCreateManyEmpresaInputEnvelope = {
    data: ManifestacaoEventoCreateManyEmpresaInput | ManifestacaoEventoCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type ExportacaoTxtCreateWithoutEmpresaInput = {
    id?: string
    periodoInicio: Date | string
    periodoFim: Date | string
    status?: $Enums.StatusExportacaoTxt
    objetoStorageTxt?: string | null
    totalDocumentos?: number
    erro?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type ExportacaoTxtUncheckedCreateWithoutEmpresaInput = {
    id?: string
    periodoInicio: Date | string
    periodoFim: Date | string
    status?: $Enums.StatusExportacaoTxt
    objetoStorageTxt?: string | null
    totalDocumentos?: number
    erro?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type ExportacaoTxtCreateOrConnectWithoutEmpresaInput = {
    where: ExportacaoTxtWhereUniqueInput
    create: XOR<ExportacaoTxtCreateWithoutEmpresaInput, ExportacaoTxtUncheckedCreateWithoutEmpresaInput>
  }

  export type ExportacaoTxtCreateManyEmpresaInputEnvelope = {
    data: ExportacaoTxtCreateManyEmpresaInput | ExportacaoTxtCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type ItemFaturaCreateWithoutEmpresaInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    fatura: FaturaCreateNestedOneWithoutItensInput
  }

  export type ItemFaturaUncheckedCreateWithoutEmpresaInput = {
    id?: string
    faturaId: string
    valor: Decimal | DecimalJsLike | number | string
  }

  export type ItemFaturaCreateOrConnectWithoutEmpresaInput = {
    where: ItemFaturaWhereUniqueInput
    create: XOR<ItemFaturaCreateWithoutEmpresaInput, ItemFaturaUncheckedCreateWithoutEmpresaInput>
  }

  export type ItemFaturaCreateManyEmpresaInputEnvelope = {
    data: ItemFaturaCreateManyEmpresaInput | ItemFaturaCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type NsuControleCreateWithoutEmpresaInput = {
    id?: string
    ultimoNsu?: bigint | number
    atualizadoEm?: Date | string
  }

  export type NsuControleUncheckedCreateWithoutEmpresaInput = {
    id?: string
    ultimoNsu?: bigint | number
    atualizadoEm?: Date | string
  }

  export type NsuControleCreateOrConnectWithoutEmpresaInput = {
    where: NsuControleWhereUniqueInput
    create: XOR<NsuControleCreateWithoutEmpresaInput, NsuControleUncheckedCreateWithoutEmpresaInput>
  }

  export type RegraFiscalCreateWithoutEmpresaInput = {
    id?: string
    cfopEntrada: string
    descricao: string
    observacao?: string | null
    acumulador?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutRegrasFiscaisInput
  }

  export type RegraFiscalUncheckedCreateWithoutEmpresaInput = {
    id?: string
    organizacaoId: string
    cfopEntrada: string
    descricao: string
    observacao?: string | null
    acumulador?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type RegraFiscalCreateOrConnectWithoutEmpresaInput = {
    where: RegraFiscalWhereUniqueInput
    create: XOR<RegraFiscalCreateWithoutEmpresaInput, RegraFiscalUncheckedCreateWithoutEmpresaInput>
  }

  export type RegraFiscalCreateManyEmpresaInputEnvelope = {
    data: RegraFiscalCreateManyEmpresaInput | RegraFiscalCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type OrganizacaoUpsertWithoutEmpresasInput = {
    update: XOR<OrganizacaoUpdateWithoutEmpresasInput, OrganizacaoUncheckedUpdateWithoutEmpresasInput>
    create: XOR<OrganizacaoCreateWithoutEmpresasInput, OrganizacaoUncheckedCreateWithoutEmpresasInput>
    where?: OrganizacaoWhereInput
  }

  export type OrganizacaoUpdateToOneWithWhereWithoutEmpresasInput = {
    where?: OrganizacaoWhereInput
    data: XOR<OrganizacaoUpdateWithoutEmpresasInput, OrganizacaoUncheckedUpdateWithoutEmpresasInput>
  }

  export type OrganizacaoUpdateWithoutEmpresasInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    regrasFiscais?: RegraFiscalUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoUncheckedUpdateWithoutEmpresasInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    regrasFiscais?: RegraFiscalUncheckedUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUncheckedUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizacaoNestedInput
  }

  export type CertificadoUpsertWithoutEmpresaInput = {
    update: XOR<CertificadoUpdateWithoutEmpresaInput, CertificadoUncheckedUpdateWithoutEmpresaInput>
    create: XOR<CertificadoCreateWithoutEmpresaInput, CertificadoUncheckedCreateWithoutEmpresaInput>
    where?: CertificadoWhereInput
  }

  export type CertificadoUpdateToOneWithWhereWithoutEmpresaInput = {
    where?: CertificadoWhereInput
    data: XOR<CertificadoUpdateWithoutEmpresaInput, CertificadoUncheckedUpdateWithoutEmpresaInput>
  }

  export type CertificadoUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivoOriginal?: StringFieldUpdateOperationsInput | string
    objetoStorage?: StringFieldUpdateOperationsInput | string
    senhaCriptografada?: StringFieldUpdateOperationsInput | string
    ivCriptografia?: StringFieldUpdateOperationsInput | string
    validoAte?: DateTimeFieldUpdateOperationsInput | Date | string
    alertaVencimentoEnviado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificadoUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomeArquivoOriginal?: StringFieldUpdateOperationsInput | string
    objetoStorage?: StringFieldUpdateOperationsInput | string
    senhaCriptografada?: StringFieldUpdateOperationsInput | string
    ivCriptografia?: StringFieldUpdateOperationsInput | string
    validoAte?: DateTimeFieldUpdateOperationsInput | Date | string
    alertaVencimentoEnviado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentoFiscalUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: DocumentoFiscalWhereUniqueInput
    update: XOR<DocumentoFiscalUpdateWithoutEmpresaInput, DocumentoFiscalUncheckedUpdateWithoutEmpresaInput>
    create: XOR<DocumentoFiscalCreateWithoutEmpresaInput, DocumentoFiscalUncheckedCreateWithoutEmpresaInput>
  }

  export type DocumentoFiscalUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: DocumentoFiscalWhereUniqueInput
    data: XOR<DocumentoFiscalUpdateWithoutEmpresaInput, DocumentoFiscalUncheckedUpdateWithoutEmpresaInput>
  }

  export type DocumentoFiscalUpdateManyWithWhereWithoutEmpresaInput = {
    where: DocumentoFiscalScalarWhereInput
    data: XOR<DocumentoFiscalUpdateManyMutationInput, DocumentoFiscalUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type DocumentoFiscalScalarWhereInput = {
    AND?: DocumentoFiscalScalarWhereInput | DocumentoFiscalScalarWhereInput[]
    OR?: DocumentoFiscalScalarWhereInput[]
    NOT?: DocumentoFiscalScalarWhereInput | DocumentoFiscalScalarWhereInput[]
    id?: StringFilter<"DocumentoFiscal"> | string
    empresaId?: StringFilter<"DocumentoFiscal"> | string
    chaveAcesso?: StringFilter<"DocumentoFiscal"> | string
    tipo?: EnumTipoDocumentoFiscalFilter<"DocumentoFiscal"> | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFilter<"DocumentoFiscal"> | $Enums.DirecaoDocumento
    nsu?: BigIntNullableFilter<"DocumentoFiscal"> | bigint | number | null
    status?: EnumStatusDocumentoFiscalFilter<"DocumentoFiscal"> | $Enums.StatusDocumentoFiscal
    cfop?: StringNullableFilter<"DocumentoFiscal"> | string | null
    objetoStorageXml?: StringFilter<"DocumentoFiscal"> | string
    emitidoEm?: DateTimeNullableFilter<"DocumentoFiscal"> | Date | string | null
    recebidoEm?: DateTimeFilter<"DocumentoFiscal"> | Date | string
    atualizadoEm?: DateTimeFilter<"DocumentoFiscal"> | Date | string
  }

  export type ManifestacaoEventoUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: ManifestacaoEventoWhereUniqueInput
    update: XOR<ManifestacaoEventoUpdateWithoutEmpresaInput, ManifestacaoEventoUncheckedUpdateWithoutEmpresaInput>
    create: XOR<ManifestacaoEventoCreateWithoutEmpresaInput, ManifestacaoEventoUncheckedCreateWithoutEmpresaInput>
  }

  export type ManifestacaoEventoUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: ManifestacaoEventoWhereUniqueInput
    data: XOR<ManifestacaoEventoUpdateWithoutEmpresaInput, ManifestacaoEventoUncheckedUpdateWithoutEmpresaInput>
  }

  export type ManifestacaoEventoUpdateManyWithWhereWithoutEmpresaInput = {
    where: ManifestacaoEventoScalarWhereInput
    data: XOR<ManifestacaoEventoUpdateManyMutationInput, ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type ManifestacaoEventoScalarWhereInput = {
    AND?: ManifestacaoEventoScalarWhereInput | ManifestacaoEventoScalarWhereInput[]
    OR?: ManifestacaoEventoScalarWhereInput[]
    NOT?: ManifestacaoEventoScalarWhereInput | ManifestacaoEventoScalarWhereInput[]
    id?: StringFilter<"ManifestacaoEvento"> | string
    empresaId?: StringFilter<"ManifestacaoEvento"> | string
    documentoFiscalId?: StringFilter<"ManifestacaoEvento"> | string
    tipoEvento?: EnumTipoEventoManifestacaoFilter<"ManifestacaoEvento"> | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFilter<"ManifestacaoEvento"> | $Enums.StatusManifestacao
    protocoloSefaz?: StringNullableFilter<"ManifestacaoEvento"> | string | null
    motivoSefaz?: StringNullableFilter<"ManifestacaoEvento"> | string | null
    enviadoEm?: DateTimeNullableFilter<"ManifestacaoEvento"> | Date | string | null
    criadoEm?: DateTimeFilter<"ManifestacaoEvento"> | Date | string
  }

  export type ExportacaoTxtUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: ExportacaoTxtWhereUniqueInput
    update: XOR<ExportacaoTxtUpdateWithoutEmpresaInput, ExportacaoTxtUncheckedUpdateWithoutEmpresaInput>
    create: XOR<ExportacaoTxtCreateWithoutEmpresaInput, ExportacaoTxtUncheckedCreateWithoutEmpresaInput>
  }

  export type ExportacaoTxtUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: ExportacaoTxtWhereUniqueInput
    data: XOR<ExportacaoTxtUpdateWithoutEmpresaInput, ExportacaoTxtUncheckedUpdateWithoutEmpresaInput>
  }

  export type ExportacaoTxtUpdateManyWithWhereWithoutEmpresaInput = {
    where: ExportacaoTxtScalarWhereInput
    data: XOR<ExportacaoTxtUpdateManyMutationInput, ExportacaoTxtUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type ExportacaoTxtScalarWhereInput = {
    AND?: ExportacaoTxtScalarWhereInput | ExportacaoTxtScalarWhereInput[]
    OR?: ExportacaoTxtScalarWhereInput[]
    NOT?: ExportacaoTxtScalarWhereInput | ExportacaoTxtScalarWhereInput[]
    id?: StringFilter<"ExportacaoTxt"> | string
    empresaId?: StringFilter<"ExportacaoTxt"> | string
    periodoInicio?: DateTimeFilter<"ExportacaoTxt"> | Date | string
    periodoFim?: DateTimeFilter<"ExportacaoTxt"> | Date | string
    status?: EnumStatusExportacaoTxtFilter<"ExportacaoTxt"> | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: StringNullableFilter<"ExportacaoTxt"> | string | null
    totalDocumentos?: IntFilter<"ExportacaoTxt"> | number
    erro?: StringNullableFilter<"ExportacaoTxt"> | string | null
    criadoEm?: DateTimeFilter<"ExportacaoTxt"> | Date | string
    concluidoEm?: DateTimeNullableFilter<"ExportacaoTxt"> | Date | string | null
  }

  export type ItemFaturaUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: ItemFaturaWhereUniqueInput
    update: XOR<ItemFaturaUpdateWithoutEmpresaInput, ItemFaturaUncheckedUpdateWithoutEmpresaInput>
    create: XOR<ItemFaturaCreateWithoutEmpresaInput, ItemFaturaUncheckedCreateWithoutEmpresaInput>
  }

  export type ItemFaturaUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: ItemFaturaWhereUniqueInput
    data: XOR<ItemFaturaUpdateWithoutEmpresaInput, ItemFaturaUncheckedUpdateWithoutEmpresaInput>
  }

  export type ItemFaturaUpdateManyWithWhereWithoutEmpresaInput = {
    where: ItemFaturaScalarWhereInput
    data: XOR<ItemFaturaUpdateManyMutationInput, ItemFaturaUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type ItemFaturaScalarWhereInput = {
    AND?: ItemFaturaScalarWhereInput | ItemFaturaScalarWhereInput[]
    OR?: ItemFaturaScalarWhereInput[]
    NOT?: ItemFaturaScalarWhereInput | ItemFaturaScalarWhereInput[]
    id?: StringFilter<"ItemFatura"> | string
    faturaId?: StringFilter<"ItemFatura"> | string
    empresaId?: StringFilter<"ItemFatura"> | string
    valor?: DecimalFilter<"ItemFatura"> | Decimal | DecimalJsLike | number | string
  }

  export type NsuControleUpsertWithoutEmpresaInput = {
    update: XOR<NsuControleUpdateWithoutEmpresaInput, NsuControleUncheckedUpdateWithoutEmpresaInput>
    create: XOR<NsuControleCreateWithoutEmpresaInput, NsuControleUncheckedCreateWithoutEmpresaInput>
    where?: NsuControleWhereInput
  }

  export type NsuControleUpdateToOneWithWhereWithoutEmpresaInput = {
    where?: NsuControleWhereInput
    data: XOR<NsuControleUpdateWithoutEmpresaInput, NsuControleUncheckedUpdateWithoutEmpresaInput>
  }

  export type NsuControleUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    ultimoNsu?: BigIntFieldUpdateOperationsInput | bigint | number
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NsuControleUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    ultimoNsu?: BigIntFieldUpdateOperationsInput | bigint | number
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegraFiscalUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: RegraFiscalWhereUniqueInput
    update: XOR<RegraFiscalUpdateWithoutEmpresaInput, RegraFiscalUncheckedUpdateWithoutEmpresaInput>
    create: XOR<RegraFiscalCreateWithoutEmpresaInput, RegraFiscalUncheckedCreateWithoutEmpresaInput>
  }

  export type RegraFiscalUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: RegraFiscalWhereUniqueInput
    data: XOR<RegraFiscalUpdateWithoutEmpresaInput, RegraFiscalUncheckedUpdateWithoutEmpresaInput>
  }

  export type RegraFiscalUpdateManyWithWhereWithoutEmpresaInput = {
    where: RegraFiscalScalarWhereInput
    data: XOR<RegraFiscalUpdateManyMutationInput, RegraFiscalUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type EmpresaCreateWithoutNsuControleInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutEmpresasInput
    certificado?: CertificadoCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaCreateNestedManyWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutNsuControleInput = {
    id?: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    certificado?: CertificadoUncheckedCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalUncheckedCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtUncheckedCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaUncheckedCreateNestedManyWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutNsuControleInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutNsuControleInput, EmpresaUncheckedCreateWithoutNsuControleInput>
  }

  export type EmpresaUpsertWithoutNsuControleInput = {
    update: XOR<EmpresaUpdateWithoutNsuControleInput, EmpresaUncheckedUpdateWithoutNsuControleInput>
    create: XOR<EmpresaCreateWithoutNsuControleInput, EmpresaUncheckedCreateWithoutNsuControleInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutNsuControleInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutNsuControleInput, EmpresaUncheckedUpdateWithoutNsuControleInput>
  }

  export type EmpresaUpdateWithoutNsuControleInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutEmpresasNestedInput
    certificado?: CertificadoUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUpdateManyWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutNsuControleInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    certificado?: CertificadoUncheckedUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUncheckedUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUncheckedUpdateManyWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaCreateWithoutCertificadoInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutEmpresasInput
    documentosFiscais?: DocumentoFiscalCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutCertificadoInput = {
    id?: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    documentosFiscais?: DocumentoFiscalUncheckedCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtUncheckedCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaUncheckedCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleUncheckedCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutCertificadoInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutCertificadoInput, EmpresaUncheckedCreateWithoutCertificadoInput>
  }

  export type EmpresaUpsertWithoutCertificadoInput = {
    update: XOR<EmpresaUpdateWithoutCertificadoInput, EmpresaUncheckedUpdateWithoutCertificadoInput>
    create: XOR<EmpresaCreateWithoutCertificadoInput, EmpresaUncheckedCreateWithoutCertificadoInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutCertificadoInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutCertificadoInput, EmpresaUncheckedUpdateWithoutCertificadoInput>
  }

  export type EmpresaUpdateWithoutCertificadoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutEmpresasNestedInput
    documentosFiscais?: DocumentoFiscalUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutCertificadoInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    documentosFiscais?: DocumentoFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUncheckedUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUncheckedUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUncheckedUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaCreateWithoutDocumentosFiscaisInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutEmpresasInput
    certificado?: CertificadoCreateNestedOneWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutDocumentosFiscaisInput = {
    id?: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    certificado?: CertificadoUncheckedCreateNestedOneWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtUncheckedCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaUncheckedCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleUncheckedCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutDocumentosFiscaisInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutDocumentosFiscaisInput, EmpresaUncheckedCreateWithoutDocumentosFiscaisInput>
  }

  export type ManifestacaoEventoCreateWithoutDocumentoFiscalInput = {
    id?: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status?: $Enums.StatusManifestacao
    protocoloSefaz?: string | null
    motivoSefaz?: string | null
    enviadoEm?: Date | string | null
    criadoEm?: Date | string
    empresa: EmpresaCreateNestedOneWithoutManifestacoesInput
  }

  export type ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput = {
    id?: string
    empresaId: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status?: $Enums.StatusManifestacao
    protocoloSefaz?: string | null
    motivoSefaz?: string | null
    enviadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ManifestacaoEventoCreateOrConnectWithoutDocumentoFiscalInput = {
    where: ManifestacaoEventoWhereUniqueInput
    create: XOR<ManifestacaoEventoCreateWithoutDocumentoFiscalInput, ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput>
  }

  export type ManifestacaoEventoCreateManyDocumentoFiscalInputEnvelope = {
    data: ManifestacaoEventoCreateManyDocumentoFiscalInput | ManifestacaoEventoCreateManyDocumentoFiscalInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaUpsertWithoutDocumentosFiscaisInput = {
    update: XOR<EmpresaUpdateWithoutDocumentosFiscaisInput, EmpresaUncheckedUpdateWithoutDocumentosFiscaisInput>
    create: XOR<EmpresaCreateWithoutDocumentosFiscaisInput, EmpresaUncheckedCreateWithoutDocumentosFiscaisInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutDocumentosFiscaisInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutDocumentosFiscaisInput, EmpresaUncheckedUpdateWithoutDocumentosFiscaisInput>
  }

  export type EmpresaUpdateWithoutDocumentosFiscaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutEmpresasNestedInput
    certificado?: CertificadoUpdateOneWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutDocumentosFiscaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    certificado?: CertificadoUncheckedUpdateOneWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUncheckedUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUncheckedUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUncheckedUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type ManifestacaoEventoUpsertWithWhereUniqueWithoutDocumentoFiscalInput = {
    where: ManifestacaoEventoWhereUniqueInput
    update: XOR<ManifestacaoEventoUpdateWithoutDocumentoFiscalInput, ManifestacaoEventoUncheckedUpdateWithoutDocumentoFiscalInput>
    create: XOR<ManifestacaoEventoCreateWithoutDocumentoFiscalInput, ManifestacaoEventoUncheckedCreateWithoutDocumentoFiscalInput>
  }

  export type ManifestacaoEventoUpdateWithWhereUniqueWithoutDocumentoFiscalInput = {
    where: ManifestacaoEventoWhereUniqueInput
    data: XOR<ManifestacaoEventoUpdateWithoutDocumentoFiscalInput, ManifestacaoEventoUncheckedUpdateWithoutDocumentoFiscalInput>
  }

  export type ManifestacaoEventoUpdateManyWithWhereWithoutDocumentoFiscalInput = {
    where: ManifestacaoEventoScalarWhereInput
    data: XOR<ManifestacaoEventoUpdateManyMutationInput, ManifestacaoEventoUncheckedUpdateManyWithoutDocumentoFiscalInput>
  }

  export type EmpresaCreateWithoutManifestacoesInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutEmpresasInput
    certificado?: CertificadoCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutManifestacoesInput = {
    id?: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    certificado?: CertificadoUncheckedCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalUncheckedCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtUncheckedCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaUncheckedCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleUncheckedCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutManifestacoesInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutManifestacoesInput, EmpresaUncheckedCreateWithoutManifestacoesInput>
  }

  export type DocumentoFiscalCreateWithoutManifestacoesInput = {
    id?: string
    chaveAcesso: string
    tipo: $Enums.TipoDocumentoFiscal
    direcao: $Enums.DirecaoDocumento
    nsu?: bigint | number | null
    status?: $Enums.StatusDocumentoFiscal
    cfop?: string | null
    objetoStorageXml: string
    emitidoEm?: Date | string | null
    recebidoEm?: Date | string
    atualizadoEm?: Date | string
    empresa: EmpresaCreateNestedOneWithoutDocumentosFiscaisInput
  }

  export type DocumentoFiscalUncheckedCreateWithoutManifestacoesInput = {
    id?: string
    empresaId: string
    chaveAcesso: string
    tipo: $Enums.TipoDocumentoFiscal
    direcao: $Enums.DirecaoDocumento
    nsu?: bigint | number | null
    status?: $Enums.StatusDocumentoFiscal
    cfop?: string | null
    objetoStorageXml: string
    emitidoEm?: Date | string | null
    recebidoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type DocumentoFiscalCreateOrConnectWithoutManifestacoesInput = {
    where: DocumentoFiscalWhereUniqueInput
    create: XOR<DocumentoFiscalCreateWithoutManifestacoesInput, DocumentoFiscalUncheckedCreateWithoutManifestacoesInput>
  }

  export type EmpresaUpsertWithoutManifestacoesInput = {
    update: XOR<EmpresaUpdateWithoutManifestacoesInput, EmpresaUncheckedUpdateWithoutManifestacoesInput>
    create: XOR<EmpresaCreateWithoutManifestacoesInput, EmpresaUncheckedCreateWithoutManifestacoesInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutManifestacoesInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutManifestacoesInput, EmpresaUncheckedUpdateWithoutManifestacoesInput>
  }

  export type EmpresaUpdateWithoutManifestacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutEmpresasNestedInput
    certificado?: CertificadoUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutManifestacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    certificado?: CertificadoUncheckedUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUncheckedUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUncheckedUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUncheckedUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type DocumentoFiscalUpsertWithoutManifestacoesInput = {
    update: XOR<DocumentoFiscalUpdateWithoutManifestacoesInput, DocumentoFiscalUncheckedUpdateWithoutManifestacoesInput>
    create: XOR<DocumentoFiscalCreateWithoutManifestacoesInput, DocumentoFiscalUncheckedCreateWithoutManifestacoesInput>
    where?: DocumentoFiscalWhereInput
  }

  export type DocumentoFiscalUpdateToOneWithWhereWithoutManifestacoesInput = {
    where?: DocumentoFiscalWhereInput
    data: XOR<DocumentoFiscalUpdateWithoutManifestacoesInput, DocumentoFiscalUncheckedUpdateWithoutManifestacoesInput>
  }

  export type DocumentoFiscalUpdateWithoutManifestacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDocumentoFiscalFieldUpdateOperationsInput | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFieldUpdateOperationsInput | $Enums.DirecaoDocumento
    nsu?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumStatusDocumentoFiscalFieldUpdateOperationsInput | $Enums.StatusDocumentoFiscal
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    objetoStorageXml?: StringFieldUpdateOperationsInput | string
    emitidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recebidoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutDocumentosFiscaisNestedInput
  }

  export type DocumentoFiscalUncheckedUpdateWithoutManifestacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDocumentoFiscalFieldUpdateOperationsInput | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFieldUpdateOperationsInput | $Enums.DirecaoDocumento
    nsu?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumStatusDocumentoFiscalFieldUpdateOperationsInput | $Enums.StatusDocumentoFiscal
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    objetoStorageXml?: StringFieldUpdateOperationsInput | string
    emitidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recebidoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizacaoCreateWithoutRegrasFiscaisInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoUncheckedCreateWithoutRegrasFiscaisInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaUncheckedCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaUncheckedCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoCreateOrConnectWithoutRegrasFiscaisInput = {
    where: OrganizacaoWhereUniqueInput
    create: XOR<OrganizacaoCreateWithoutRegrasFiscaisInput, OrganizacaoUncheckedCreateWithoutRegrasFiscaisInput>
  }

  export type EmpresaCreateWithoutRegrasFiscaisOverrideInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutEmpresasInput
    certificado?: CertificadoCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutRegrasFiscaisOverrideInput = {
    id?: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    certificado?: CertificadoUncheckedCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalUncheckedCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtUncheckedCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaUncheckedCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleUncheckedCreateNestedOneWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutRegrasFiscaisOverrideInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutRegrasFiscaisOverrideInput, EmpresaUncheckedCreateWithoutRegrasFiscaisOverrideInput>
  }

  export type OrganizacaoUpsertWithoutRegrasFiscaisInput = {
    update: XOR<OrganizacaoUpdateWithoutRegrasFiscaisInput, OrganizacaoUncheckedUpdateWithoutRegrasFiscaisInput>
    create: XOR<OrganizacaoCreateWithoutRegrasFiscaisInput, OrganizacaoUncheckedCreateWithoutRegrasFiscaisInput>
    where?: OrganizacaoWhereInput
  }

  export type OrganizacaoUpdateToOneWithWhereWithoutRegrasFiscaisInput = {
    where?: OrganizacaoWhereInput
    data: XOR<OrganizacaoUpdateWithoutRegrasFiscaisInput, OrganizacaoUncheckedUpdateWithoutRegrasFiscaisInput>
  }

  export type OrganizacaoUpdateWithoutRegrasFiscaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoUncheckedUpdateWithoutRegrasFiscaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUncheckedUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUncheckedUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizacaoNestedInput
  }

  export type EmpresaUpsertWithoutRegrasFiscaisOverrideInput = {
    update: XOR<EmpresaUpdateWithoutRegrasFiscaisOverrideInput, EmpresaUncheckedUpdateWithoutRegrasFiscaisOverrideInput>
    create: XOR<EmpresaCreateWithoutRegrasFiscaisOverrideInput, EmpresaUncheckedCreateWithoutRegrasFiscaisOverrideInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutRegrasFiscaisOverrideInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutRegrasFiscaisOverrideInput, EmpresaUncheckedUpdateWithoutRegrasFiscaisOverrideInput>
  }

  export type EmpresaUpdateWithoutRegrasFiscaisOverrideInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutEmpresasNestedInput
    certificado?: CertificadoUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutRegrasFiscaisOverrideInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    certificado?: CertificadoUncheckedUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUncheckedUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUncheckedUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUncheckedUpdateOneWithoutEmpresaNestedInput
  }

  export type EmpresaCreateWithoutExportacoesTxtInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutEmpresasInput
    certificado?: CertificadoCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutExportacoesTxtInput = {
    id?: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    certificado?: CertificadoUncheckedCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalUncheckedCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutEmpresaInput
    itensFatura?: ItemFaturaUncheckedCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleUncheckedCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutExportacoesTxtInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutExportacoesTxtInput, EmpresaUncheckedCreateWithoutExportacoesTxtInput>
  }

  export type EmpresaUpsertWithoutExportacoesTxtInput = {
    update: XOR<EmpresaUpdateWithoutExportacoesTxtInput, EmpresaUncheckedUpdateWithoutExportacoesTxtInput>
    create: XOR<EmpresaCreateWithoutExportacoesTxtInput, EmpresaUncheckedCreateWithoutExportacoesTxtInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutExportacoesTxtInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutExportacoesTxtInput, EmpresaUncheckedUpdateWithoutExportacoesTxtInput>
  }

  export type EmpresaUpdateWithoutExportacoesTxtInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutEmpresasNestedInput
    certificado?: CertificadoUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutExportacoesTxtInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    certificado?: CertificadoUncheckedUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUncheckedUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUncheckedUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type OrganizacaoCreateWithoutFaturasInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaCreateNestedManyWithoutOrganizacaoInput
    regrasFiscais?: RegraFiscalCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoUncheckedCreateWithoutFaturasInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaUncheckedCreateNestedManyWithoutOrganizacaoInput
    regrasFiscais?: RegraFiscalUncheckedCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutOrganizacaoInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoCreateOrConnectWithoutFaturasInput = {
    where: OrganizacaoWhereUniqueInput
    create: XOR<OrganizacaoCreateWithoutFaturasInput, OrganizacaoUncheckedCreateWithoutFaturasInput>
  }

  export type ItemFaturaCreateWithoutFaturaInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    empresa: EmpresaCreateNestedOneWithoutItensFaturaInput
  }

  export type ItemFaturaUncheckedCreateWithoutFaturaInput = {
    id?: string
    empresaId: string
    valor: Decimal | DecimalJsLike | number | string
  }

  export type ItemFaturaCreateOrConnectWithoutFaturaInput = {
    where: ItemFaturaWhereUniqueInput
    create: XOR<ItemFaturaCreateWithoutFaturaInput, ItemFaturaUncheckedCreateWithoutFaturaInput>
  }

  export type ItemFaturaCreateManyFaturaInputEnvelope = {
    data: ItemFaturaCreateManyFaturaInput | ItemFaturaCreateManyFaturaInput[]
    skipDuplicates?: boolean
  }

  export type OrganizacaoUpsertWithoutFaturasInput = {
    update: XOR<OrganizacaoUpdateWithoutFaturasInput, OrganizacaoUncheckedUpdateWithoutFaturasInput>
    create: XOR<OrganizacaoCreateWithoutFaturasInput, OrganizacaoUncheckedCreateWithoutFaturasInput>
    where?: OrganizacaoWhereInput
  }

  export type OrganizacaoUpdateToOneWithWhereWithoutFaturasInput = {
    where?: OrganizacaoWhereInput
    data: XOR<OrganizacaoUpdateWithoutFaturasInput, OrganizacaoUncheckedUpdateWithoutFaturasInput>
  }

  export type OrganizacaoUpdateWithoutFaturasInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUpdateManyWithoutOrganizacaoNestedInput
    regrasFiscais?: RegraFiscalUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoUncheckedUpdateWithoutFaturasInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUncheckedUpdateManyWithoutOrganizacaoNestedInput
    regrasFiscais?: RegraFiscalUncheckedUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutOrganizacaoNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizacaoNestedInput
  }

  export type ItemFaturaUpsertWithWhereUniqueWithoutFaturaInput = {
    where: ItemFaturaWhereUniqueInput
    update: XOR<ItemFaturaUpdateWithoutFaturaInput, ItemFaturaUncheckedUpdateWithoutFaturaInput>
    create: XOR<ItemFaturaCreateWithoutFaturaInput, ItemFaturaUncheckedCreateWithoutFaturaInput>
  }

  export type ItemFaturaUpdateWithWhereUniqueWithoutFaturaInput = {
    where: ItemFaturaWhereUniqueInput
    data: XOR<ItemFaturaUpdateWithoutFaturaInput, ItemFaturaUncheckedUpdateWithoutFaturaInput>
  }

  export type ItemFaturaUpdateManyWithWhereWithoutFaturaInput = {
    where: ItemFaturaScalarWhereInput
    data: XOR<ItemFaturaUpdateManyMutationInput, ItemFaturaUncheckedUpdateManyWithoutFaturaInput>
  }

  export type FaturaCreateWithoutItensInput = {
    id?: string
    referenciaMes: number
    referenciaAno: number
    valorTotal: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusFatura
    geradaEm?: Date | string
    pagaEm?: Date | string | null
    organizacao: OrganizacaoCreateNestedOneWithoutFaturasInput
  }

  export type FaturaUncheckedCreateWithoutItensInput = {
    id?: string
    organizacaoId: string
    referenciaMes: number
    referenciaAno: number
    valorTotal: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusFatura
    geradaEm?: Date | string
    pagaEm?: Date | string | null
  }

  export type FaturaCreateOrConnectWithoutItensInput = {
    where: FaturaWhereUniqueInput
    create: XOR<FaturaCreateWithoutItensInput, FaturaUncheckedCreateWithoutItensInput>
  }

  export type EmpresaCreateWithoutItensFaturaInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    organizacao: OrganizacaoCreateNestedOneWithoutEmpresasInput
    certificado?: CertificadoCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutItensFaturaInput = {
    id?: string
    organizacaoId: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    certificado?: CertificadoUncheckedCreateNestedOneWithoutEmpresaInput
    documentosFiscais?: DocumentoFiscalUncheckedCreateNestedManyWithoutEmpresaInput
    manifestacoes?: ManifestacaoEventoUncheckedCreateNestedManyWithoutEmpresaInput
    exportacoesTxt?: ExportacaoTxtUncheckedCreateNestedManyWithoutEmpresaInput
    nsuControle?: NsuControleUncheckedCreateNestedOneWithoutEmpresaInput
    regrasFiscaisOverride?: RegraFiscalUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutItensFaturaInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutItensFaturaInput, EmpresaUncheckedCreateWithoutItensFaturaInput>
  }

  export type FaturaUpsertWithoutItensInput = {
    update: XOR<FaturaUpdateWithoutItensInput, FaturaUncheckedUpdateWithoutItensInput>
    create: XOR<FaturaCreateWithoutItensInput, FaturaUncheckedCreateWithoutItensInput>
    where?: FaturaWhereInput
  }

  export type FaturaUpdateToOneWithWhereWithoutItensInput = {
    where?: FaturaWhereInput
    data: XOR<FaturaUpdateWithoutItensInput, FaturaUncheckedUpdateWithoutItensInput>
  }

  export type FaturaUpdateWithoutItensInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenciaMes?: IntFieldUpdateOperationsInput | number
    referenciaAno?: IntFieldUpdateOperationsInput | number
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFieldUpdateOperationsInput | $Enums.StatusFatura
    geradaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    pagaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizacao?: OrganizacaoUpdateOneRequiredWithoutFaturasNestedInput
  }

  export type FaturaUncheckedUpdateWithoutItensInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    referenciaMes?: IntFieldUpdateOperationsInput | number
    referenciaAno?: IntFieldUpdateOperationsInput | number
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFieldUpdateOperationsInput | $Enums.StatusFatura
    geradaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    pagaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EmpresaUpsertWithoutItensFaturaInput = {
    update: XOR<EmpresaUpdateWithoutItensFaturaInput, EmpresaUncheckedUpdateWithoutItensFaturaInput>
    create: XOR<EmpresaCreateWithoutItensFaturaInput, EmpresaUncheckedCreateWithoutItensFaturaInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutItensFaturaInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutItensFaturaInput, EmpresaUncheckedUpdateWithoutItensFaturaInput>
  }

  export type EmpresaUpdateWithoutItensFaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutEmpresasNestedInput
    certificado?: CertificadoUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutItensFaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    certificado?: CertificadoUncheckedUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUncheckedUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUncheckedUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type OrganizacaoCreateWithoutAuditLogsInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaCreateNestedManyWithoutOrganizacaoInput
    regrasFiscais?: RegraFiscalCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    razaoSocial: string
    cnpj: string
    emailContato: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    empresas?: EmpresaUncheckedCreateNestedManyWithoutOrganizacaoInput
    regrasFiscais?: RegraFiscalUncheckedCreateNestedManyWithoutOrganizacaoInput
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutOrganizacaoInput
    faturas?: FaturaUncheckedCreateNestedManyWithoutOrganizacaoInput
  }

  export type OrganizacaoCreateOrConnectWithoutAuditLogsInput = {
    where: OrganizacaoWhereUniqueInput
    create: XOR<OrganizacaoCreateWithoutAuditLogsInput, OrganizacaoUncheckedCreateWithoutAuditLogsInput>
  }

  export type OrganizacaoUpsertWithoutAuditLogsInput = {
    update: XOR<OrganizacaoUpdateWithoutAuditLogsInput, OrganizacaoUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<OrganizacaoCreateWithoutAuditLogsInput, OrganizacaoUncheckedCreateWithoutAuditLogsInput>
    where?: OrganizacaoWhereInput
  }

  export type OrganizacaoUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: OrganizacaoWhereInput
    data: XOR<OrganizacaoUpdateWithoutAuditLogsInput, OrganizacaoUncheckedUpdateWithoutAuditLogsInput>
  }

  export type OrganizacaoUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUpdateManyWithoutOrganizacaoNestedInput
    regrasFiscais?: RegraFiscalUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUpdateManyWithoutOrganizacaoNestedInput
  }

  export type OrganizacaoUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    emailContato?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresas?: EmpresaUncheckedUpdateManyWithoutOrganizacaoNestedInput
    regrasFiscais?: RegraFiscalUncheckedUpdateManyWithoutOrganizacaoNestedInput
    usuarios?: UsuarioUncheckedUpdateManyWithoutOrganizacaoNestedInput
    faturas?: FaturaUncheckedUpdateManyWithoutOrganizacaoNestedInput
  }

  export type EmpresaCreateManyOrganizacaoInput = {
    id?: string
    cnpj: string
    razaoSocial: string
    uf: string
    codigoUf: number
    ambiente?: $Enums.AmbienteFiscal
    status?: $Enums.StatusEmpresa
    ativadaEm?: Date | string
    desativadaEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type RegraFiscalCreateManyOrganizacaoInput = {
    id?: string
    empresaId?: string | null
    cfopEntrada: string
    descricao: string
    observacao?: string | null
    acumulador?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type UsuarioCreateManyOrganizacaoInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    papel?: $Enums.PapelUsuario
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type FaturaCreateManyOrganizacaoInput = {
    id?: string
    referenciaMes: number
    referenciaAno: number
    valorTotal: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusFatura
    geradaEm?: Date | string
    pagaEm?: Date | string | null
  }

  export type AuditLogCreateManyOrganizacaoInput = {
    id?: string
    usuarioId?: string | null
    acao: string
    entidade: string
    entidadeId?: string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type EmpresaUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    certificado?: CertificadoUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    certificado?: CertificadoUncheckedUpdateOneWithoutEmpresaNestedInput
    documentosFiscais?: DocumentoFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaNestedInput
    exportacoesTxt?: ExportacaoTxtUncheckedUpdateManyWithoutEmpresaNestedInput
    itensFatura?: ItemFaturaUncheckedUpdateManyWithoutEmpresaNestedInput
    nsuControle?: NsuControleUncheckedUpdateOneWithoutEmpresaNestedInput
    regrasFiscaisOverride?: RegraFiscalUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateManyWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cnpj?: StringFieldUpdateOperationsInput | string
    razaoSocial?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    codigoUf?: IntFieldUpdateOperationsInput | number
    ambiente?: EnumAmbienteFiscalFieldUpdateOperationsInput | $Enums.AmbienteFiscal
    status?: EnumStatusEmpresaFieldUpdateOperationsInput | $Enums.StatusEmpresa
    ativadaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    desativadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegraFiscalUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneWithoutRegrasFiscaisOverrideNestedInput
  }

  export type RegraFiscalUncheckedUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegraFiscalUncheckedUpdateManyWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    papel?: EnumPapelUsuarioFieldUpdateOperationsInput | $Enums.PapelUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    papel?: EnumPapelUsuarioFieldUpdateOperationsInput | $Enums.PapelUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    papel?: EnumPapelUsuarioFieldUpdateOperationsInput | $Enums.PapelUsuario
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FaturaUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenciaMes?: IntFieldUpdateOperationsInput | number
    referenciaAno?: IntFieldUpdateOperationsInput | number
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFieldUpdateOperationsInput | $Enums.StatusFatura
    geradaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    pagaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: ItemFaturaUpdateManyWithoutFaturaNestedInput
  }

  export type FaturaUncheckedUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenciaMes?: IntFieldUpdateOperationsInput | number
    referenciaAno?: IntFieldUpdateOperationsInput | number
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFieldUpdateOperationsInput | $Enums.StatusFatura
    geradaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    pagaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    itens?: ItemFaturaUncheckedUpdateManyWithoutFaturaNestedInput
  }

  export type FaturaUncheckedUpdateManyWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenciaMes?: IntFieldUpdateOperationsInput | number
    referenciaAno?: IntFieldUpdateOperationsInput | number
    valorTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusFaturaFieldUpdateOperationsInput | $Enums.StatusFatura
    geradaEm?: DateTimeFieldUpdateOperationsInput | Date | string
    pagaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: StringFieldUpdateOperationsInput | string
    entidade?: StringFieldUpdateOperationsInput | string
    entidadeId?: NullableStringFieldUpdateOperationsInput | string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: StringFieldUpdateOperationsInput | string
    entidade?: StringFieldUpdateOperationsInput | string
    entidadeId?: NullableStringFieldUpdateOperationsInput | string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: NullableStringFieldUpdateOperationsInput | string | null
    acao?: StringFieldUpdateOperationsInput | string
    entidade?: StringFieldUpdateOperationsInput | string
    entidadeId?: NullableStringFieldUpdateOperationsInput | string | null
    detalhes?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentoFiscalCreateManyEmpresaInput = {
    id?: string
    chaveAcesso: string
    tipo: $Enums.TipoDocumentoFiscal
    direcao: $Enums.DirecaoDocumento
    nsu?: bigint | number | null
    status?: $Enums.StatusDocumentoFiscal
    cfop?: string | null
    objetoStorageXml: string
    emitidoEm?: Date | string | null
    recebidoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ManifestacaoEventoCreateManyEmpresaInput = {
    id?: string
    documentoFiscalId: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status?: $Enums.StatusManifestacao
    protocoloSefaz?: string | null
    motivoSefaz?: string | null
    enviadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ExportacaoTxtCreateManyEmpresaInput = {
    id?: string
    periodoInicio: Date | string
    periodoFim: Date | string
    status?: $Enums.StatusExportacaoTxt
    objetoStorageTxt?: string | null
    totalDocumentos?: number
    erro?: string | null
    criadoEm?: Date | string
    concluidoEm?: Date | string | null
  }

  export type ItemFaturaCreateManyEmpresaInput = {
    id?: string
    faturaId: string
    valor: Decimal | DecimalJsLike | number | string
  }

  export type RegraFiscalCreateManyEmpresaInput = {
    id?: string
    organizacaoId: string
    cfopEntrada: string
    descricao: string
    observacao?: string | null
    acumulador?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type DocumentoFiscalUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDocumentoFiscalFieldUpdateOperationsInput | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFieldUpdateOperationsInput | $Enums.DirecaoDocumento
    nsu?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumStatusDocumentoFiscalFieldUpdateOperationsInput | $Enums.StatusDocumentoFiscal
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    objetoStorageXml?: StringFieldUpdateOperationsInput | string
    emitidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recebidoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    manifestacoes?: ManifestacaoEventoUpdateManyWithoutDocumentoFiscalNestedInput
  }

  export type DocumentoFiscalUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDocumentoFiscalFieldUpdateOperationsInput | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFieldUpdateOperationsInput | $Enums.DirecaoDocumento
    nsu?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumStatusDocumentoFiscalFieldUpdateOperationsInput | $Enums.StatusDocumentoFiscal
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    objetoStorageXml?: StringFieldUpdateOperationsInput | string
    emitidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recebidoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    manifestacoes?: ManifestacaoEventoUncheckedUpdateManyWithoutDocumentoFiscalNestedInput
  }

  export type DocumentoFiscalUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    chaveAcesso?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoDocumentoFiscalFieldUpdateOperationsInput | $Enums.TipoDocumentoFiscal
    direcao?: EnumDirecaoDocumentoFieldUpdateOperationsInput | $Enums.DirecaoDocumento
    nsu?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumStatusDocumentoFiscalFieldUpdateOperationsInput | $Enums.StatusDocumentoFiscal
    cfop?: NullableStringFieldUpdateOperationsInput | string | null
    objetoStorageXml?: StringFieldUpdateOperationsInput | string
    emitidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recebidoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManifestacaoEventoUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    documentoFiscal?: DocumentoFiscalUpdateOneRequiredWithoutManifestacoesNestedInput
  }

  export type ManifestacaoEventoUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentoFiscalId?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManifestacaoEventoUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentoFiscalId?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExportacaoTxtUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodoInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    periodoFim?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusExportacaoTxtFieldUpdateOperationsInput | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: NullableStringFieldUpdateOperationsInput | string | null
    totalDocumentos?: IntFieldUpdateOperationsInput | number
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExportacaoTxtUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodoInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    periodoFim?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusExportacaoTxtFieldUpdateOperationsInput | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: NullableStringFieldUpdateOperationsInput | string | null
    totalDocumentos?: IntFieldUpdateOperationsInput | number
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExportacaoTxtUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    periodoInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    periodoFim?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStatusExportacaoTxtFieldUpdateOperationsInput | $Enums.StatusExportacaoTxt
    objetoStorageTxt?: NullableStringFieldUpdateOperationsInput | string | null
    totalDocumentos?: IntFieldUpdateOperationsInput | number
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    concluidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFaturaUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fatura?: FaturaUpdateOneRequiredWithoutItensNestedInput
  }

  export type ItemFaturaUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaId?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ItemFaturaUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    faturaId?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type RegraFiscalUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    organizacao?: OrganizacaoUpdateOneRequiredWithoutRegrasFiscaisNestedInput
  }

  export type RegraFiscalUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegraFiscalUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizacaoId?: StringFieldUpdateOperationsInput | string
    cfopEntrada?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    acumulador?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManifestacaoEventoCreateManyDocumentoFiscalInput = {
    id?: string
    empresaId: string
    tipoEvento: $Enums.TipoEventoManifestacao
    status?: $Enums.StatusManifestacao
    protocoloSefaz?: string | null
    motivoSefaz?: string | null
    enviadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ManifestacaoEventoUpdateWithoutDocumentoFiscalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutManifestacoesNestedInput
  }

  export type ManifestacaoEventoUncheckedUpdateWithoutDocumentoFiscalInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManifestacaoEventoUncheckedUpdateManyWithoutDocumentoFiscalInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    tipoEvento?: EnumTipoEventoManifestacaoFieldUpdateOperationsInput | $Enums.TipoEventoManifestacao
    status?: EnumStatusManifestacaoFieldUpdateOperationsInput | $Enums.StatusManifestacao
    protocoloSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    motivoSefaz?: NullableStringFieldUpdateOperationsInput | string | null
    enviadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemFaturaCreateManyFaturaInput = {
    id?: string
    empresaId: string
    valor: Decimal | DecimalJsLike | number | string
  }

  export type ItemFaturaUpdateWithoutFaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    empresa?: EmpresaUpdateOneRequiredWithoutItensFaturaNestedInput
  }

  export type ItemFaturaUncheckedUpdateWithoutFaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ItemFaturaUncheckedUpdateManyWithoutFaturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}