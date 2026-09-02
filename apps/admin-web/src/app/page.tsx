import Link from "next/link";
import { RevelarAoRolar } from "@/components/RevelarAoRolar";
import { TituloCortina } from "@/components/TituloCortina";

const EMAIL_CONTATO = "contato@dnotas.com.br";

const FICHA_LINHAS = [
  {
    chave: "3126 0512 3445 6700 0112 5500 1000 4521 8834 1123 2",
    emitente: "Distribuidora Bom Preço Ltda",
    classificacao: "1102 · compra p/ revenda",
  },
  {
    chave: "3126 0876 1290 4400 0187 5500 1000 7734 4471 9902 8",
    emitente: "Comercial Estrela do Sul Ltda",
    classificacao: "2101 · compra insumo",
  },
  {
    chave: "3126 0349 8821 1100 0245 5500 1000 2298 1105 3341 5",
    emitente: "Atacado Vale Verde Ltda",
    classificacao: "1403 · compra p/ substituição",
  },
  {
    chave: "3126 0765 4432 8800 0398 5500 1000 6612 8834 7720 1",
    emitente: "Indústria Nova Aurora S/A",
    classificacao: "1101 · compra p/ industrialização",
  },
];

function IconeCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L19 7" />
    </svg>
  );
}

function CartaoEtapa({ numero, titulo, corpo }: { numero: string; titulo: string; corpo: string }) {
  return (
    <div className="space-y-3">
      <p className="etapa-numero">{numero}</p>
      <h3 className="font-display text-xl" style={{ color: "var(--paper)" }}>
        {titulo}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {corpo}
      </p>
    </div>
  );
}

function CartaoSeguranca({ titulo, corpo }: { titulo: string; corpo: string }) {
  return (
    <div
      className="space-y-2 rounded-lg border p-6"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <h3 className="text-sm font-medium" style={{ color: "var(--paper)" }}>
        {titulo}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {corpo}
      </p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <div className="landing-faixa flex items-center justify-between py-4">
          <span className="font-display text-lg italic" style={{ color: "var(--paper)" }}>
            Fechamento Fiscal Fácil
          </span>
          <nav className="hidden items-center gap-7 sm:flex">
            <a
              href="#como-funciona"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              Como funciona
            </a>
            <a
              href="#seguranca"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              Segurança
            </a>
            <a
              href="#preco"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              Preço
            </a>
            <Link
              href="/login"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
              style={{ color: "var(--paper)" }}
            >
              Entrar →
            </Link>
          </nav>
          <Link
            href="/login"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] sm:hidden"
            style={{ color: "var(--paper)" }}
          >
            Entrar →
          </Link>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="fundo-editorial">
        <div className="landing-faixa grid gap-14 py-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-16">
          <div className="entra relative z-10">
            <p className="landing-olho">Para escritórios de contabilidade</p>
            <TituloCortina as="h1" className="landing-titulo mt-4 text-[2.5rem] sm:text-[3.25rem]">
              O fechamento fiscal <em className="italic">se fecha sozinho.</em>
            </TituloCortina>
            <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              Busca as notas de entrada direto na SEFAZ, classifica por CFOP e gera o TXT pro
              Domínio Sistemas — todo dia, pra cada CNPJ da carteira, sem ninguém abrir o
              portal.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href={`mailto:${EMAIL_CONTATO}?subject=Quero conhecer o Fechamento Fiscal Fácil`}
                className="botao-principal"
                style={{ width: "auto", paddingInline: "1.75rem" }}
              >
                Pedir acesso
              </a>
              <a
                href="#como-funciona"
                className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: "var(--muted)" }}
              >
                Como funciona ↓
              </a>
            </div>
          </div>

          <div className="entra relative z-10" style={{ animationDelay: "120ms" }}>
            <div className="ficha">
              {FICHA_LINHAS.map((linha, i) => (
                <div key={linha.chave} className="ficha-linha">
                  <div>
                    <p className="ficha-chave">{linha.chave}</p>
                    <p className="ficha-emitente">{linha.emitente}</p>
                  </div>
                  <div className="ficha-status" style={{ ["--atraso" as string]: `${i * -2.3}s` }}>
                    <span className="s1">Recebida</span>
                    <span className="s2">{linha.classificacao}</span>
                    <span className="s3">
                      <IconeCheck />
                      Exportada
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.12em]" style={{ color: "var(--muted-2)" }}>
              exemplo ilustrativo
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Dor atual ---------- */}
      <section>
        <div className="landing-faixa">
          <RevelarAoRolar>
            <p className="landing-olho">Como é hoje, na mão</p>
            <TituloCortina className="landing-titulo mt-3 text-3xl sm:text-4xl">
              A mesma maratona, todo mês.
            </TituloCortina>
          </RevelarAoRolar>

          <div className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {[
              "Entrar no portal da SEFAZ, CNPJ por CNPJ.",
              "Baixar XML nota por nota, torcendo pra não perder nenhuma.",
              "Decidir CFOP, observação e acumulador de cabeça, nota por nota.",
              "Digitar tudo, de novo, no Domínio Sistemas.",
              "No fim, torcer pra não ter passado do prazo.",
            ].map((item, i) => (
              <RevelarAoRolar key={item} atraso={i * 60}>
                <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item}
                </p>
              </RevelarAoRolar>
            ))}
          </div>

          <RevelarAoRolar atraso={280}>
            <p className="mt-8 font-display text-xl italic" style={{ color: "var(--paper)" }}>
              Multiplica isso por cada cliente da carteira.
            </p>
          </RevelarAoRolar>
        </div>
      </section>

      {/* ---------- Como funciona ---------- */}
      <section id="como-funciona" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="landing-faixa">
          <RevelarAoRolar>
            <p className="landing-olho">Como funciona</p>
            <TituloCortina className="landing-titulo mt-3 text-3xl sm:text-4xl">
              Três etapas. Nenhuma na mão.
            </TituloCortina>
          </RevelarAoRolar>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            <RevelarAoRolar>
              <CartaoEtapa
                numero="01"
                titulo="Busca automática"
                corpo="Todo dia, o sistema entra na SEFAZ com o certificado digital de cada CNPJ, faz a Manifestação do Destinatário e traz as notas novas."
              />
            </RevelarAoRolar>
            <RevelarAoRolar atraso={100}>
              <CartaoEtapa
                numero="02"
                titulo="Classificação automática"
                corpo="Cada CFOP já sai com a observação e o acumulador certos — a regra é definida uma vez pelo escritório, ou só pra um cliente específico, se for o caso."
              />
            </RevelarAoRolar>
            <RevelarAoRolar atraso={200}>
              <CartaoEtapa
                numero="03"
                titulo="Exportação pro Domínio"
                corpo="Gera o TXT no leiaute que o Domínio Sistemas espera. É importar e fechou."
              />
            </RevelarAoRolar>
          </div>
        </div>
      </section>

      {/* ---------- Pra quem é ---------- */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="landing-faixa grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <RevelarAoRolar>
            <p className="landing-olho">Pra quem é</p>
            <TituloCortina className="landing-titulo mt-3 text-3xl sm:text-4xl">
              Um escritório. Todos os clientes, num painel só.
            </TituloCortina>
          </RevelarAoRolar>
          <RevelarAoRolar atraso={100}>
            <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              Cadastra cada CNPJ da carteira com o certificado digital dele. Acompanha o
              fechamento de todos, empresa por empresa, sem misturar dado de um cliente com o
              de outro.
            </p>
          </RevelarAoRolar>
        </div>
      </section>

      {/* ---------- Segurança ---------- */}
      <section id="seguranca" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="landing-faixa">
          <RevelarAoRolar>
            <p className="landing-olho">Segurança</p>
            <TituloCortina className="landing-titulo mt-3 text-3xl sm:text-4xl">
              O certificado digital nunca fica exposto.
            </TituloCortina>
          </RevelarAoRolar>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <RevelarAoRolar>
              <CartaoSeguranca
                titulo="Criptografado, sempre"
                corpo="Certificado e senha ficam guardados com criptografia — nunca em texto puro, em lugar nenhum."
              />
            </RevelarAoRolar>
            <RevelarAoRolar atraso={100}>
              <CartaoSeguranca
                titulo="Cliente não vê cliente"
                corpo="O dado de cada CNPJ é isolado dos outros — nenhum cliente do escritório enxerga o de outro."
              />
            </RevelarAoRolar>
            <RevelarAoRolar atraso={200}>
              <CartaoSeguranca
                titulo="Infraestrutura dedicada"
                corpo="Servidor só pra esse produto, sem dividir espaço com outros sistemas."
              />
            </RevelarAoRolar>
          </div>
        </div>
      </section>

      {/* ---------- Preço ---------- */}
      <section id="preco" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="landing-faixa">
          <RevelarAoRolar>
            <p className="landing-olho">Preço</p>
            <TituloCortina className="landing-titulo mt-3 text-3xl sm:text-4xl">
              Simples: por CNPJ ativo.
            </TituloCortina>
          </RevelarAoRolar>

          <RevelarAoRolar atraso={100}>
            <div className="cartao-preco mt-10 max-w-md">
              <p className="font-display text-5xl" style={{ color: "var(--paper)" }}>
                R$49,90
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                por CNPJ ativo, por mês
              </p>
              <a
                href={`mailto:${EMAIL_CONTATO}?subject=Quero conhecer o Fechamento Fiscal Fácil`}
                className="botao-principal mt-7"
                style={{ width: "auto", paddingInline: "1.75rem" }}
              >
                Pedir acesso
              </a>
            </div>
          </RevelarAoRolar>
        </div>
      </section>

      {/* ---------- CTA final ---------- */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="landing-faixa text-center">
          <RevelarAoRolar>
            <TituloCortina className="landing-titulo mx-auto max-w-2xl text-3xl sm:text-4xl">
              Pronto pra fechar o mês sem abrir o portal da SEFAZ?
            </TituloCortina>
            <a
              href={`mailto:${EMAIL_CONTATO}?subject=Quero conhecer o Fechamento Fiscal Fácil`}
              className="botao-principal mx-auto mt-8"
              style={{ width: "auto", paddingInline: "2rem" }}
            >
              Pedir acesso
            </a>
          </RevelarAoRolar>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="landing-faixa flex flex-col items-center gap-3 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <span className="font-display text-sm italic" style={{ color: "var(--muted)" }}>
            Fechamento Fiscal Fácil
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${EMAIL_CONTATO}`}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              {EMAIL_CONTATO}
            </a>
            <Link
              href="/login"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              Já é cliente? Entrar
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
