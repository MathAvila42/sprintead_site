/* Sprint EaD — Landing Page */
const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================
   DEFAULTS (tweakable)
   ========================================================= */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showCoordinatorSection": false,
  "priceBasic": 9,
  "priceStandard": 19,
  "pricePremium": 29
} /*EDITMODE-END*/;

/* =========================================================
   Small pieces
   ========================================================= */

function Logo({ size = 32, dark = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative grid place-items-center rounded-[10px] bg-orange"
        style={{ width: size, height: size, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.12)" }}>
        
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M14 3 5 14h6l-1 7 9-11h-6l1-7z" fill="#fff" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="leading-none">
        <div className={`font-extrabold tracking-tight text-[17px] ${dark ? "text-white" : "text-ink"}`}>
          Sprint<span className="text-orange">EaD</span>
        </div>
      </div>
    </div>);

}

function Tag({ children, tone = "default" }) {
  const tones = {
    default: "bg-white/70 text-ink border-line",
    orange: "bg-orange/10 text-orange border-orange/20",
    dark: "bg-ink/5 text-ink border-ink/10"
  };
  return <span className={`tag border ${tones[tone]}`}>{children}</span>;
}

function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

}

function Check({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

}

function PrimaryBtn({ children, size = "md", className = "", onClick }) {
  const sizes = {
    md: "px-5 py-3 text-[14px]",
    lg: "px-7 py-4 text-[15px]"
  };
  const handle = onClick || (() => window.__openSignup && window.__openSignup());
  return (
    <button
      onClick={handle}
      className={`group inline-flex items-center gap-2 rounded-xl bg-orange hover:bg-orange-deep text-white font-semibold btn-shadow transition-all ${sizes[size]} ${className}`}>
      
      <span>{children}</span>
      <ArrowRight size={16} />
    </button>);

}

function GhostBtn({ children, size = "md", dark = false, className = "" }) {
  const sizes = {
    md: "px-5 py-3 text-[14px]",
    lg: "px-7 py-4 text-[15px]"
  };
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-xl border font-semibold transition-colors ${sizes[size]} ${
      dark ?
      "border-white/20 text-white hover:bg-white/5" :
      "border-ink/15 text-ink hover:bg-ink/5"} ${
      className}`}>
      
      {children}
    </button>);

}

/* =========================================================
   NAV
   ========================================================= */

function Nav() {
  return (
    <header className="sticky top-0 z-30 bg-paper/80 backdrop-blur border-b border-line">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-[14px] text-ink-soft font-medium">
          <a href="#problema" className="hover:text-ink">Problema</a>
          <a href="#como-funciona" className="hover:text-ink">Como funciona</a>
          <a href="#recursos" className="hover:text-ink">Recursos</a>
          <a href="#precos" className="hover:text-ink">Planos</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a className="hidden sm:inline text-[14px] font-medium text-ink-soft hover:text-ink px-3 py-2" href="#">Entrar</a>
          <PrimaryBtn size="md">Teste grátis</PrimaryBtn>
        </div>
      </div>
    </header>);

}

/* =========================================================
   HERO
   ========================================================= */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 grid-paper opacity-70 pointer-events-none" />
      <div className="hero-orb" style={{ width: 520, height: 520, background: "rgba(255,106,31,0.18)", top: -120, right: -120 }} />
      <div className="hero-orb" style={{ width: 360, height: 360, background: "rgba(42,18,96,0.12)", bottom: -120, left: -80 }} />

      <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Left: copy */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-2 mb-6">
              <Tag tone="orange">
                <span className="w-1.5 h-1.5 rounded-full bg-orange pulse-dot" />
                Semestre 2026/1
              </Tag>
              <Tag>PT-BR</Tag>
            </div>

            <h1 className="font-extrabold tracking-tight text-[52px] md:text-[76px] leading-[0.95] text-ink">
              Abra. Veja. Estude.
            </h1>

            <p className="mt-7 text-[18px] md:text-[19px] leading-relaxed text-ink-soft max-w-[560px]">
              O Sprint EaD mostra <b className="text-ink">o que estudar em cada dia</b>, com base nas suas disciplinas e no tempo que você tem disponível.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PrimaryBtn size="lg">Começar teste grátis</PrimaryBtn>
            </div>

            <div className="mt-7 flex items-center gap-5 text-[13px] text-ink-mute">
              <div className="flex items-center gap-2"><Check size={14} /> Cancele quando quiser</div>
            </div>
          </div>

          {/* Right: dashboard preview (user's screenshot framed) */}
          <div className="md:col-span-5">
            <HeroPreview />
          </div>
        </div>

        {/* Under-hero stat row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 border border-line rounded-2xl bg-white/60 overflow-hidden">
          {[
          ["57%", "dos alunos EaD abandonam nos primeiros 6 meses"],
          ["Menos de 5min", "tempo médio pra montar o plano semanal"],
          ["0", "abas do LMS que você precisa abrir pra saber o que fazer hoje"]].
          map(([big, small], i) =>
          <div key={i} className={`p-5 md:p-6 ${i !== 0 ? "border-t md:border-t-0 md:border-l border-line" : ""}`}>
              <div className="font-extrabold text-[30px] tracking-tight text-ink">{big}</div>
              <div className="text-[12.5px] text-ink-soft mt-1 leading-snug">{small}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function HeroPreview() {
  return (
    <div className="relative">
      {/* Floating annotation chips */}
      <div className="absolute -left-4 top-24 z-10 hidden md:block">
        <div className="bg-white rounded-xl border border-line px-3 py-2 card-elev">
          <div className="font-mono text-[10px] text-ink-mute uppercase tracking-wider">IA · plano da semana</div>
          <div className="text-[13px] font-semibold text-ink mt-0.5">Gerado em 8s</div>
        </div>
      </div>
      <div className="absolute -right-2 top-80 z-10 hidden md:block">
        <div className="bg-ink text-white rounded-xl px-3 py-2 card-elev">
          <div className="font-mono text-[10px] text-white/60 uppercase tracking-wider">Foco</div>
          <div className="text-[13px] font-semibold mt-0.5 flex items-center gap-1.5">
            1 passo por vez
          </div>
        </div>
      </div>

      {/* Frame */}
      <div className="relative rounded-[20px] border border-ink/10 bg-white p-2 card-elev">
        <div className="rounded-[14px] overflow-hidden border border-ink/5">
          <img
            src="assets/dashboard.png"
            alt="Dashboard do Sprint EaD"
            className="w-full h-auto block" />
          
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-ink/20" />
          <div className="w-2 h-2 rounded-full bg-ink/20" />
          <div className="w-2 h-2 rounded-full bg-orange" />
        </div>
      </div>

      <div className="mt-3 font-mono text-[11px] text-ink-mute flex items-center justify-between">
        <span></span>
        <span></span>
      </div>
    </div>);
}

/* =========================================================
   LOGOS / trust marquee
   ========================================================= */

function TrustStrip() {
  const items = [
  "Universidades parceiras",
  "Pedagogia",
  "Administração",
  "Direito",
  "Engenharia de Produção",
  "Ciências Contábeis",
  "Psicologia",
  "Sistemas de Informação"];

  return (
    <section className="border-b border-line bg-paper-2">
      <div className="max-w-[1280px] mx-auto px-6 py-6 flex items-center gap-6">
        <div className="font-mono text-[11px] uppercase tracking-wider text-ink-mute shrink-0">
          Feito para graduação EaD
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="marquee-track flex gap-10 whitespace-nowrap text-[14px] font-semibold text-ink-soft">
            {[...items, ...items].map((t, i) =>
            <span key={i} className="flex items-center gap-10">
                <span>{t}</span>
                <span className="text-ink/20">◆</span>
              </span>
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--bg-2)] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--bg-2)] to-transparent" />
        </div>
      </div>
    </section>);

}

/* =========================================================
   PROBLEMA
   ========================================================= */

function Problem() {
  const pains = [
  {
    k: "01",
    title: "Plano da disciplina que não vira rotina",
    body: "Você recebe o plano da disciplina, mas ele não guia o dia a dia. As semanas passam e você perde a sequência do conteúdo.",
    badge: "Plano da disciplina → ???"
  },
  {
    k: "02",
    title: "Decisão todo dia",
    body: "Você abre a plataforma de estudo e precisa escolher por onde começar. Isso se repete todos os dias e atrasa o início dos estudos.",
    badge: "\"o que estudar agora?\""
  },
  {
    k: "03",
    title: "Prazo é surpresa",
    body: "As avaliações estão na plataforma, mas não fazem parte da sua rotina. Quando percebe, o prazo está próximo.",
    badge: "calendário fantasma"
  },
  {
    k: "04",
    title: "Falta acompanhamento",
    body: "No presencial, há interação constante. Na EaD, é fácil ficar dias sem estudar e não perceber o impacto.",
    badge: "57% desistem"
  }];


  return (
    <section id="problema" className="relative border-b border-line bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Tag tone="dark">Problema</Tag>
            <h2 className="mt-4 font-extrabold tracking-tight text-[42px] md:text-[56px] leading-[0.98]" style={{ color: "#2563eb" }}>
              O EaD entrega o conteúdo.<br />
              A rotina fica por sua conta.
            </h2>
            <p className="mt-6 text-[17px] text-ink-soft leading-relaxed max-w-[460px]">
              A plataforma de estudo funciona bem para <i>armazenar</i> as aulas, mas não ajuda a <b className="text-ink">organizar os seus estudos</b>. O Sprint EaD resolve exatamente isso — a camada de execução que falta entre o currículo e você.
            </p>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
            {pains.map((p) =>
            <div key={p.k} className="rounded-2xl border border-line bg-white p-6 card-elev">
                <div className="flex items-start justify-between">
                  <div className="font-mono text-[12px] text-ink-mute">{p.k}</div>
                  <Tag tone="orange">{p.badge}</Tag>
                </div>
                <h3 className="mt-4 font-bold text-[20px] text-ink tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">{p.body}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   COMO FUNCIONA — pipeline
   ========================================================= */

function HowItWorks() {
  const steps = [
  {
    k: "01",
    label: "Cadastro",
    title: "Cadastro",
    body: "O aluno faz o cadastro e informa curso, universidade, disciplinas, módulos e avaliações. Caso não saiba alguma informação, pode cadastrar depois e mesmo assim gerar o plano.",
    sample:
    <div className="font-mono text-[11px] leading-relaxed">
          <div className="text-ink-mute">// detectado</div>
          <div>6 disciplinas · 39 módulos</div>
          <div>3 avaliações · 2 TCCs</div>
          <div className="text-orange mt-1">✓ plano gerável</div>
        </div>

  },
  {
    k: "02",
    label: "Plano",
    title: "IA monta sua semana",
    body: "Você diz quanto tempo por dia pode estudar. O Sprint distribui os módulos, respeita prazos e deixa folga para revisão.",
    sample:
    <div className="font-mono text-[11px] space-y-1">
          {["SEG · 45min · Comunic. M4", "TER · 45min · Filos. M3", "QUA · DESCANSO", "QUI · 60min · AP1 review", "SEX · 45min · Didática M2"].map((s, i) =>
      <div key={i} className="flex gap-2"><span className="text-ink-mute">{String(i + 1).padStart(2, "0")}</span><span>{s}</span></div>
      )}
        </div>

  },
  {
    k: "03",
    label: "Execução",
    title: "Você só executa",
    body: "Abre o app, vê UMA coisa pra estudar hoje. Marca concluído. Streak. Próximo. Sem decisões.",
    sample:
    <div>
          <div className="font-mono text-[11px] text-ink-mute mb-2">AGORA</div>
          <div className="bg-ink text-white rounded-xl p-3">
            <div className="text-[11px] text-white/60 font-mono">MÓDULO 4 · 45MIN</div>
            <div className="text-[15px] font-semibold mt-1">Comunicação e Linguagem</div>
            <div className="mt-2 bg-orange text-white rounded-md text-[12px] font-semibold text-center py-1.5">Começar ▶</div>
          </div>
        </div>

  }];



  return (
    <section id="como-funciona" className="relative border-b border-line bg-paper-2">
      <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-[560px]">
            <Tag tone="dark">Como funciona</Tag>
            <h2 className="mt-4 font-extrabold tracking-tight text-[42px] md:text-[56px] leading-[0.98] text-ink">
              Currículo entra,<br />rotina sai.
            </h2>
          </div>
          <p className="text-[16px] text-ink-soft max-w-[420px] leading-relaxed"></p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-[68px] dotted-rule" />
          <div className="grid md:grid-cols-3 gap-6 relative">
            {steps.map((s, i) =>
            <div key={s.k} className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-ink text-white grid place-items-center font-mono text-[13px] font-semibold shrink-0">
                    {s.k}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-ink-mute">
                    {s.label}
                  </div>
                </div>
                <h3 className="font-bold text-[22px] tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[14.5px] text-ink-soft leading-relaxed">{s.body}</p>
                <div className="mt-5 rounded-xl bg-white border border-line p-4 card-elev flex-1">
                  {s.sample}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   FEATURES
   ========================================================= */

function Features() {
  return (
    <section id="recursos" className="relative border-b border-line bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-[760px]">
          <Tag tone="dark">O que você ganha</Tag>
          <h2 className="mt-4 font-extrabold tracking-tight text-[42px] md:text-[56px] leading-[0.98] text-ink">
            Tudo que a plataforma de conteúdo não resolve.
          </h2>
          <p className="mt-6 text-[17px] text-ink-soft max-w-[560px] leading-relaxed">
            O Sprint EaD não substitui a plataforma de estudo. Ele organiza como você usa o conteúdo ao longo do semestre — em uma tela, com uma resposta clara: <b className="text-ink">o que estudar agora</b>.
          </p>
        </div>

        {/* Hero: dashboard screenshot */}
        <div className="mt-14 relative rounded-[24px] overflow-hidden bg-purple-deep text-white border border-black/20 card-elev">
          <div className="absolute inset-0 grid-paper-dark opacity-60 pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,106,31,0.25), transparent 70%)" }} />

          <div className="relative grid md:grid-cols-12 gap-10 items-center p-8 md:p-12">
            <div className="md:col-span-5">
              <Tag>Tela "Hoje"</Tag>
              <h3 className="mt-4 font-extrabold tracking-tight text-[34px] md:text-[44px] leading-[1.02]">
                Uma tela.<br />
                <span className="text-orange">Uma resposta:</span><br />
                o que estudar agora.
              </h3>
              <p className="mt-5 text-[15.5px] text-white/70 leading-relaxed max-w-[420px]">
                Acabou a paralisia de abrir 8 abas. A tela "Hoje" consolida módulo ativo, progresso no semestre, plano da IA e alertas de atraso. Você não abre mais nada.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                "Módulo ativo com 1 clique pra começar",
                "Barra de progresso real do semestre",
                "Plano semanal da IA, editável",
                "Alerta honesto de atraso (sem pânico)",
                "Prazos claros das avaliações"].
                map((t, i) =>
                <li key={i} className="flex items-start gap-3 text-[14.5px] text-white/85">
                    <span className="w-5 h-5 rounded-full bg-orange grid place-items-center shrink-0 mt-0.5 text-white"><Check size={12} /></span>
                    {t}
                  </li>
                )}
              </ul>
            </div>

            <div className="md:col-span-7">
              <div className="relative rounded-[20px] border border-white/10 bg-white/5 backdrop-blur p-2">
                <div className="rounded-[14px] overflow-hidden border border-white/10">
                  <img src="assets/dashboard.png" alt="Sprint EaD dashboard" className="w-full h-auto block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   COORDINATOR (toggleable)
   ========================================================= */

function CoordinatorSection() {
  return (
    <section className="relative border-b border-line bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <Tag tone="dark">Para coordenadores</Tag>
            <h2 className="mt-4 font-extrabold tracking-tight text-[40px] md:text-[52px] leading-[0.98] text-ink">
              Evasão não avisa.<br />
              <span className="text-orange">O Sprint EaD avisa.</span>
            </h2>
            <p className="mt-6 text-[16.5px] text-ink-soft leading-relaxed">
              Você enxerga ritmo, continuidade e risco de atraso por aluno e por turma. Intervém na semana 3, não na semana 14. Pipeline é direto:
            </p>
            <div className="mt-6 font-mono text-[12px] text-ink-soft p-4 rounded-lg bg-paper-2 border border-line leading-relaxed">
              currículo → plano → execução → <span className="text-orange">dados</span> → análise institucional
            </div>
            <div className="mt-8 flex gap-3">
              <GhostBtn>Agendar demo institucional</GhostBtn>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-2xl border border-line bg-white p-6 md:p-8 card-elev">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="font-mono text-[11px] uppercase text-ink-mute">Turma · Pedagogia 2026/1</div>
                  <div className="font-bold text-[20px] text-ink tracking-tight mt-0.5">42 alunos ativos</div>
                </div>
                <div className="flex items-center gap-4 text-[12px]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> em dia</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange" /> atrasado</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> risco</span>
                </div>
              </div>

              {/* Heatmap */}
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 items-center">
                {[
                ["AM", [1, 2, 1, 0, 1, 2, 1, 1, 0, 1, 2, 2]],
                ["MS", [2, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1, 2]],
                ["CS", [1, 1, 0, 1, 2, 2, 3, 3, 2, 1, 1, 0]],
                ["JS", [3, 3, 2, 1, 1, 0, 1, 1, 2, 3, 3, 2]],
                ["RT", [0, 1, 1, 2, 1, 1, 0, 1, 1, 2, 1, 1]],
                ["LP", [1, 0, 1, 1, 2, 3, 3, 3, 2, 2, 1, 1]],
                ["PV", [2, 1, 1, 0, 1, 1, 1, 2, 2, 1, 0, 1]],
                ["KD", [1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 2, 1]]].
                map(([name, row], ri) =>
                <React.Fragment key={ri}>
                    <div className="font-mono text-[10px] text-ink-mute">{name}</div>
                    <div className="flex gap-1">
                      {row.map((v, i) =>
                    <div
                      key={i}
                      className="flex-1 h-5 rounded-sm"
                      style={{
                        background: v === 0 ? "#e5e7eb" : v === 1 ? "rgba(16,185,129,0.85)" : v === 2 ? "rgba(255,106,31,0.85)" : "rgba(244,63,94,0.85)"
                      }}
                      title={["sem dado", "em dia", "atrasado", "risco"][v]} />

                    )}
                    </div>
                  </React.Fragment>
                )}
              </div>
              <div className="mt-4 font-mono text-[10px] text-ink-mute flex justify-between">
                <span>últimas 12 semanas →</span>
                <span>6 alunos em risco · 2 intervenções sugeridas</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                ["73%", "engajamento semanal"],
                ["−34%", "evasão vs. 2025/2"],
                ["12", "intervenções feitas"]].
                map(([big, small], i) =>
                <div key={i} className="rounded-lg bg-paper-2 border border-line p-3">
                    <div className="font-extrabold text-[22px] tracking-tight text-ink">{big}</div>
                    <div className="text-[11.5px] text-ink-soft">{small}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* =========================================================
   PRICING
   ========================================================= */

function Pricing({ priceBasic, priceStandard, pricePremium }) {
  const plans = [
  {
    name: "Básico",
    price: priceBasic,
    pitch: "Pra testar o hábito.",
    features: [
    "Um plano semanal por IA sem ajustes",
    "3 disciplinas",
    "Streak e progresso"],

    highlight: false,
    cta: "Começar agora"
  },
  {
    name: "Padrão",
    price: priceStandard,
    pitch: "Pra levar o semestre inteiro.",
    features: [
    "Tudo do Básico",
    "Plano da IA (semanal)",
    "Recuperação automática",
    "Alertas de prazo por AP",
    "Até 2 semestres ativos"],

    highlight: true,
    cta: "Começar teste grátis",
    badge: "Mais escolhido"
  },
  {
    name: "Premium",
    price: pricePremium,
    pitch: "Pra quem não pode reprovar.",
    features: [
    "Tudo do Padrão",
    "IA com reajuste diário",
    "Tutor-IA por disciplina",
    "Revisão pré-prova guiada",
    "Semestres ilimitados",
    "Suporte prioritário"],

    highlight: false,
    cta: "Começar teste grátis"
  }];


  return (
    <section id="precos" className="relative border-b border-line bg-paper-2">
      <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-[760px]">
          <Tag tone="dark">Planos e valores</Tag>
          <h2 className="mt-4 font-extrabold tracking-tight text-[42px] md:text-[56px] leading-[0.98] text-ink">
            Escolha como quer estudar.
          </h2>
          <p className="mt-6 text-[17px] text-ink-soft max-w-[520px] leading-relaxed">
            Comece com 14 dias grátis em qualquer plano. Sem cartão, cancele quando quiser.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {plans.map((p) =>
          <div
            key={p.name}
            className={`relative rounded-2xl border p-8 card-elev flex flex-col ${
            p.highlight ?
            "bg-ink text-white border-ink" :
            "bg-white text-ink border-line"}`
            }>
            
              {p.badge &&
            <div className="absolute -top-3 left-6 bg-orange text-white font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {p.badge}
                </div>
            }
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold text-[22px] tracking-tight">{p.name}</h3>
              </div>
              <p className={`mt-1 text-[13.5px] ${p.highlight ? "text-white/60" : "text-ink-soft"}`}>{p.pitch}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className={`font-mono text-[14px] ${p.highlight ? "text-white/50" : "text-ink-mute"}`}>R$</span>
                <span className="font-extrabold text-[56px] tracking-tight leading-none">{p.price}</span>
                <span className={`text-[13px] ${p.highlight ? "text-white/60" : "text-ink-soft"}`}>/mês</span>
              </div>
              <div className={`mt-1 font-mono text-[11px] ${p.highlight ? "text-white/50" : "text-ink-mute"}`}>
                
              </div>

              <ul className="mt-7 space-y-2.5 flex-1">
                {p.features.map((f, i) =>
              <li key={i} className="flex items-start gap-2 text-[14px]">
                    <span className={`mt-0.5 shrink-0 ${p.highlight ? "text-orange" : "text-orange"}`}><Check size={14} /></span>
                    <span>{f}</span>
                  </li>
              )}
              </ul>

              <button
              onClick={() => window.__openSignup && window.__openSignup()}
              className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl font-semibold py-3.5 text-[14px] transition-colors ${
              p.highlight ?
              "bg-orange hover:bg-orange-deep text-white" :
              "bg-ink hover:bg-ink/90 text-white"}`
              }>
              
                {p.cta} <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>

        <p className="mt-10 text-center text-[13px] text-ink-mute">
          Instituição de ensino? <a className="underline decoration-orange underline-offset-4 hover:text-ink font-medium" href="#">Fale com a gente</a> para plano institucional.
        </p>
      </div>
    </section>);

}

/* =========================================================
   FAQ
   ========================================================= */

function FAQ() {
  const items = [
  {
    q: "Sprint substitui o Moodle / AVA / Canvas da minha faculdade?",
    a: "Não. Sprint EaD é a camada de execução que organiza o que o LMS já contém. Você continua entregando atividades, assistindo aulas e fazendo prova no ambiente da sua instituição — o Sprint só te diz o que fazer, quando, e mantém o ritmo."
  },
  {
    q: "Como vocês pegam o conteúdo da minha grade?",
    a: "Você cola o PDF das ementas (ou tira print). A IA extrai módulos, avaliações, pesos e datas. Leva uns 15 a 20 minutos na primeira vez e depois é automático a cada semestre."
  },
  {
    q: "E se eu perder a semana?",
    a: "A IA reorganiza o plano na segunda de manhã, redistribuindo o atraso sem te sobrecarregar. Você não começa do zero nem 'fica devendo' pra sempre — ela só recalcula."
  },
  {
    q: "Funciona pra qualquer curso de graduação EaD?",
    a: "Sim. Qualquer graduação com módulos, avaliações e prazos definidos. Já rodou em Pedagogia, Administração, Direito, Engenharia de Produção e Psicologia no beta."
  },
  {
    q: "Meus dados ficam expostos pra coordenação da faculdade?",
    a: "Só se você estudar por uma conta institucional (plano B2B contratado pela sua instituição). Contas pessoais são privadas — nem a coordenação nem ninguém além de você enxerga nada."
  },
  {
    q: "Posso cancelar o teste antes de ser cobrado?",
    a: "Pode, a qualquer momento, sem ligar pra ninguém. Não pedimos cartão pros 14 dias grátis, então não tem nem o que cancelar — a assinatura só começa se você optar."
  }];

  return (
    <section id="faq" className="relative border-b border-line bg-paper">
      <div className="max-w-[1024px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-[640px]">
          <Tag tone="dark">FAQ</Tag>
          <h2 className="mt-4 font-extrabold tracking-tight text-[42px] md:text-[56px] leading-[0.98] text-ink">
            Perguntas honestas,<br />respostas honestas.
          </h2>
        </div>

        <div className="mt-12 border-t border-line">
          {items.map((it, i) =>
          <details key={i} className="group border-b border-line py-5">
              <summary className="flex items-start gap-6 justify-between">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-[12px] text-ink-mute mt-1.5">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-bold text-[18px] md:text-[20px] text-ink tracking-tight">{it.q}</h3>
                </div>
                <div className="chev w-8 h-8 rounded-full border border-ink/15 grid place-items-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
              </summary>
              <div className="pl-10 pr-10 mt-3 text-[15px] text-ink-soft leading-relaxed">
                {it.a}
              </div>
            </details>
          )}
        </div>
      </div>
    </section>);

}

/* =========================================================
   CTA FINAL
   ========================================================= */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-orange text-white">
      <div className="absolute inset-0 grid-paper-dark opacity-40 pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto px-6 py-24 md:py-32 text-center">
        <Tag tone="dark">
          <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot" />
          Beta aberto
        </Tag>
        <h2 className="mt-6 font-extrabold tracking-tight text-[56px] md:text-[96px] leading-[0.92]">
          Seu semestre<br />
          começa segunda.<br />
          <span className="italic font-serif" style={{ fontFamily: "'JetBrains Mono', monospace", fontStyle: "normal" }}>— você já tem plano?</span>
        </h2>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <button onClick={() => window.__openSignup && window.__openSignup()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink hover:bg-ink/90 text-white font-semibold px-8 py-4 text-[15px]">
            Começar teste grátis <ArrowRight size={16} />
          </button>
        </div>

        <p className="mt-6 text-[13px] text-white/80 font-mono">
          14 dias grátis · sem cartão · cancele no clique
        </p>
      </div>
    </section>);

}

/* =========================================================
   FOOTER
   ========================================================= */

function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo dark />
            <p className="mt-5 text-[14px] text-white/60 max-w-[360px] leading-relaxed">
              A camada de execução do seu EaD. Transforma ementa em rotina semanal guiada por IA.
            </p>
          </div>
          {[
          { t: "Produto", l: ["Recursos", "Planos", "Roadmap", "Mudanças"] },
          { t: "Institucional", l: ["Para coordenadores", "Casos de uso", "Segurança", "Agendar demo"] },
          { t: "Empresa", l: ["Sobre", "Blog", "Contato", "Carreiras"] }].
          map((col, i) =>
          <div key={i} className="md:col-span-2">
              <div className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-4">{col.t}</div>
              <ul className="space-y-2.5 text-[14px]">
                {col.l.map((li) => <li key={li}><a className="text-white/80 hover:text-white" href="#">{li}</a></li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[12px] text-white/50">
            © 2026 Sprint EaD · feito pra quem estuda em casa.
          </div>
          <div className="flex gap-6 text-[13px] text-white/60">
            <a href="#" className="hover:text-white">Termos</a>
            <a href="#" className="hover:text-white">Privacidade</a>
            <a href="#" className="hover:text-white">LGPD</a>
          </div>
        </div>
      </div>
    </footer>);

}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const SignupModal = window.SignupModal;
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <>
      <Nav />
      <Hero />
      <TrustStrip />
      <Problem />
      <HowItWorks />
      <Features />
      {tweaks.showCoordinatorSection && <CoordinatorSection />}
      <Pricing
        priceBasic={tweaks.priceBasic}
        priceStandard={tweaks.priceStandard}
        pricePremium={tweaks.pricePremium} />
      
      <FAQ />
      <FinalCTA />
      <Footer />

      <SignupModal />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Seções">
          <TweakToggle
            label="Mostrar seção de coordenadores"
            value={tweaks.showCoordinatorSection}
            onChange={(v) => setTweak("showCoordinatorSection", v)} />
          
        </TweakSection>
        <TweakSection label="Preços (R$/mês)">
          <TweakNumber
            label="Básico"
            value={tweaks.priceBasic}
            onChange={(v) => setTweak("priceBasic", Number(v))}
            min={0} max={999} step={1} />
          
          <TweakNumber
            label="Padrão"
            value={tweaks.priceStandard}
            onChange={(v) => setTweak("priceStandard", Number(v))}
            min={0} max={999} step={1} />
          
          <TweakNumber
            label="Premium"
            value={tweaks.pricePremium}
            onChange={(v) => setTweak("pricePremium", Number(v))}
            min={0} max={999} step={1} />
          
        </TweakSection>
      </TweaksPanel>
    </>);

}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);