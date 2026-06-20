/* Sprint EaD — Cadastro em etapas (modal) */
const { useState: useSignupState, useEffect: useSignupEffect, useRef: useSignupRef } = React;

function SignupArrow({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);
}

function SignupCheck({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);
}

const SU_STEPS = [
  { key: "conta", label: "Conta" },
  { key: "curso", label: "Curso" },
  { key: "disciplinas", label: "Disciplinas" },
  { key: "rotina", label: "Rotina" }];

function SUField({ label, children, hint }) {
  return (
    <label className="block">
      <div className="text-[12px] font-mono uppercase tracking-wider text-ink-mute mb-1.5">{label}</div>
      {children}
      {hint ? <div className="text-[11.5px] text-ink-mute mt-1.5">{hint}</div> : null}
    </label>);
}

const SU_INPUT =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-mute focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition";

function SignupModal() {
  const [open, setOpen] = useSignupState(false);
  const [step, setStep] = useSignupState(0);
  const [done, setDone] = useSignupState(false);

  const [data, setData] = useSignupState({
    nome: "", email: "", senha: "",
    universidade: "", curso: "", periodo: "1º",
    disciplinas: ["", "", ""],
    dias: { SEG: true, TER: true, QUA: false, QUI: true, SEX: true, SAB: false, DOM: false },
    horas: 1.5
  });

  useSignupEffect(() => {
    window.__openSignup = () => { setOpen(true); setStep(0); setDone(false); };
    return () => { delete window.__openSignup; };
  }, []);

  useSignupEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const set = (patch) => setData((d) => ({ ...d, ...patch }));
  const setDisc = (i, v) => setData((d) => {
    const next = [...d.disciplinas]; next[i] = v; return { ...d, disciplinas: next };
  });
  const addDisc = () => setData((d) => ({ ...d, disciplinas: [...d.disciplinas, ""] }));
  const removeDisc = (i) => setData((d) => ({ ...d, disciplinas: d.disciplinas.filter((_, j) => j !== i) }));
  const toggleDay = (k) => setData((d) => ({ ...d, dias: { ...d.dias, [k]: !d.dias[k] } }));

  const canNext = () => {
    if (step === 0) return data.nome.trim() && data.email.trim() && data.senha.length >= 6;
    return true; // demais etapas têm campos opcionais (pode preencher depois)
  };

  const next = () => {
    if (step < SU_STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  };
  const back = () => { if (step > 0) setStep(step - 1); };

  const diasAtivos = Object.values(data.dias).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={() => setOpen(false)} />

      {/* Card */}
      <div className="relative w-full sm:max-w-[560px] sm:my-8 bg-paper sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-screen sm:max-h-[90vh]">
        {/* Header */}
        <div className="shrink-0 px-6 sm:px-8 pt-6 pb-5 border-b border-line bg-paper">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative grid place-items-center rounded-[9px] bg-orange" style={{ width: 30, height: 30, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.12)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 3 5 14h6l-1 7 9-11h-6l1-7z" fill="#fff" stroke="#fff" strokeWidth="1" strokeLinejoin="round" /></svg>
              </div>
              <div className="font-extrabold tracking-tight text-[16px] text-ink">Criar conta gratuita</div>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full grid place-items-center text-ink-soft hover:bg-ink/5 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>

          {/* Stepper */}
          {!done &&
          <div className="mt-5 flex items-center gap-2">
              {SU_STEPS.map((s, i) =>
            <div key={s.key} className="flex items-center gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full grid place-items-center font-mono text-[12px] font-semibold shrink-0 transition ${
                  i < step ? "bg-orange text-white" :
                  i === step ? "bg-ink text-white" :
                  "bg-ink/8 text-ink-mute"}`}>
                      {i < step ? <SignupCheck size={13} /> : i + 1}
                    </div>
                    <span className={`text-[12.5px] font-medium hidden sm:inline ${i === step ? "text-ink" : "text-ink-mute"}`}>{s.label}</span>
                  </div>
                  {i < SU_STEPS.length - 1 &&
              <div className={`flex-1 h-[2px] rounded ${i < step ? "bg-orange" : "bg-ink/8"}`} />
              }
                </div>
            )}
            </div>
          }
        </div>

        {/* Body */}
        <div className="grow overflow-y-auto px-6 sm:px-8 py-7">
          {done ?
          <SignupDone data={data} diasAtivos={diasAtivos} onClose={() => setOpen(false)} /> :
          <>
              {step === 0 &&
            <div className="space-y-5">
                  <div>
                    <h3 className="font-bold text-[22px] tracking-tight text-ink">Vamos começar.</h3>
                    <p className="text-[14px] text-ink-soft mt-1">Crie sua conta. Leva menos de um minuto.</p>
                  </div>
                  <SUField label="Nome completo">
                    <input className={SU_INPUT} placeholder="Maria Silva" value={data.nome} onChange={(e) => set({ nome: e.target.value })} />
                  </SUField>
                  <SUField label="E-mail">
                    <input type="email" className={SU_INPUT} placeholder="voce@email.com" value={data.email} onChange={(e) => set({ email: e.target.value })} />
                  </SUField>
                  <SUField label="Senha" hint="Mínimo de 6 caracteres.">
                    <input type="password" className={SU_INPUT} placeholder="••••••••" value={data.senha} onChange={(e) => set({ senha: e.target.value })} />
                  </SUField>
                </div>
            }

              {step === 1 &&
            <div className="space-y-5">
                  <div>
                    <h3 className="font-bold text-[22px] tracking-tight text-ink">Sobre o seu curso.</h3>
                    <p className="text-[14px] text-ink-soft mt-1">Não sabe alguma informação? Pule e preencha depois.</p>
                  </div>
                  <SUField label="Universidade">
                    <input className={SU_INPUT} placeholder="Ex: UNINTER, Estácio, UNOPAR…" value={data.universidade} onChange={(e) => set({ universidade: e.target.value })} />
                  </SUField>
                  <SUField label="Curso">
                    <input className={SU_INPUT} placeholder="Ex: Pedagogia" value={data.curso} onChange={(e) => set({ curso: e.target.value })} />
                  </SUField>
                  <SUField label="Período atual">
                    <div className="flex flex-wrap gap-2">
                      {["1º", "2º", "3º", "4º", "5º", "6º+"].map((p) =>
                  <button key={p} onClick={() => set({ periodo: p })} className={`px-4 py-2.5 rounded-xl border text-[14px] font-semibold transition ${
                    data.periodo === p ? "bg-ink text-white border-ink" : "bg-white text-ink-soft border-line hover:border-ink/30"}`}>
                          {p}
                        </button>
                  )}
                    </div>
                  </SUField>
                </div>
            }

              {step === 2 &&
            <div className="space-y-5">
                  <div>
                    <h3 className="font-bold text-[22px] tracking-tight text-ink">Suas disciplinas.</h3>
                    <p className="text-[14px] text-ink-soft mt-1">Adicione as do semestre atual. Pode editar a qualquer momento.</p>
                  </div>
                  <div className="space-y-2.5">
                    {data.disciplinas.map((d, i) =>
                <div key={i} className="flex items-center gap-2">
                        <div className="font-mono text-[11px] text-ink-mute w-5">{String(i + 1).padStart(2, "0")}</div>
                        <input className={SU_INPUT} placeholder={`Disciplina ${i + 1}`} value={d} onChange={(e) => setDisc(i, e.target.value)} />
                        {data.disciplinas.length > 1 &&
                  <button onClick={() => removeDisc(i)} className="w-9 h-9 rounded-lg grid place-items-center text-ink-mute hover:bg-ink/5 hover:text-ink transition shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                          </button>
                  }
                      </div>
                )}
                  </div>
                  <button onClick={addDisc} className="inline-flex items-center gap-2 text-[14px] font-semibold text-orange hover:text-orange-deep transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    Adicionar disciplina
                  </button>
                </div>
            }

              {step === 3 &&
            <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[22px] tracking-tight text-ink">Sua rotina de estudo.</h3>
                    <p className="text-[14px] text-ink-soft mt-1">É com isso que a IA monta seu plano semanal.</p>
                  </div>
                  <SUField label="Dias disponíveis">
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(data.dias).map((k) =>
                  <button key={k} onClick={() => toggleDay(k)} className={`w-12 h-11 rounded-xl border text-[13px] font-bold font-mono transition ${
                    data.dias[k] ? "bg-orange text-white border-orange" : "bg-white text-ink-mute border-line hover:border-ink/30"}`}>
                          {k}
                        </button>
                  )}
                    </div>
                  </SUField>
                  <SUField label={`Horas por dia · ${data.horas}h`}>
                    <input type="range" min="0.5" max="6" step="0.5" value={data.horas}
                  onChange={(e) => set({ horas: Number(e.target.value) })}
                  className="w-full accent-orange" />
                    <div className="flex justify-between font-mono text-[10px] text-ink-mute mt-1">
                      <span>30min</span><span>6h</span>
                    </div>
                  </SUField>
                  <div className="rounded-xl bg-ink text-white p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange/20 text-orange grid place-items-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" fill="currentColor" /></svg>
                    </div>
                    <div className="text-[13px] leading-snug">
                      <b>{diasAtivos} dias</b> × {data.horas}h ={" "}
                      <b>{(diasAtivos * data.horas).toFixed(1)}h/semana</b> de estudo planejado.
                    </div>
                  </div>
                </div>
            }
            </>
          }
        </div>

        {/* Footer */}
        {!done &&
        <div className="shrink-0 px-6 sm:px-8 py-5 border-t border-line bg-paper flex items-center justify-between gap-3">
            <button onClick={back} disabled={step === 0}
          className={`text-[14px] font-semibold px-3 py-2 rounded-lg transition ${step === 0 ? "opacity-0 pointer-events-none" : "text-ink-soft hover:bg-ink/5"}`}>
              ← Voltar
            </button>
            <div className="flex items-center gap-3">
              {step > 0 && step < 3 &&
            <button onClick={next} className="text-[13.5px] font-medium text-ink-mute hover:text-ink transition">
                  Preencher depois
                </button>
            }
              <button onClick={next} disabled={!canNext()}
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold transition ${
            canNext() ? "bg-orange hover:bg-orange-deep text-white btn-shadow" : "bg-ink/10 text-ink-mute cursor-not-allowed"}`}>
                {step === SU_STEPS.length - 1 ? "Gerar meu plano" : "Continuar"}
                <SignupArrow size={15} />
              </button>
            </div>
          </div>
        }
      </div>
    </div>);
}

function SignupDone({ data, diasAtivos, onClose }) {
  return (
    <div className="text-center py-4">
      <div className="mx-auto w-16 h-16 rounded-full bg-orange grid place-items-center text-white" style={{ boxShadow: "0 12px 32px -8px rgba(255,106,31,0.6)" }}>
        <SignupCheck size={30} />
      </div>
      <h3 className="mt-5 font-extrabold text-[26px] tracking-tight text-ink">Conta criada!</h3>
      <p className="mt-2 text-[14.5px] text-ink-soft max-w-[380px] mx-auto leading-relaxed">
        {data.nome ? `${data.nome.split(" ")[0]}, ` : ""}seu teste de 14 dias começou. A IA já está montando seu primeiro plano semanal.
      </p>

      <div className="mt-7 rounded-xl border border-line bg-white p-5 text-left">
        <div className="font-mono text-[11px] uppercase tracking-wider text-ink-mute mb-3">Resumo</div>
        <div className="space-y-2 text-[13.5px]">
          <div className="flex justify-between"><span className="text-ink-soft">Curso</span><span className="text-ink font-medium">{data.curso || "—"}</span></div>
          <div className="flex justify-between"><span className="text-ink-soft">Disciplinas</span><span className="text-ink font-medium">{data.disciplinas.filter((d) => d.trim()).length || "definir depois"}</span></div>
          <div className="flex justify-between"><span className="text-ink-soft">Rotina</span><span className="text-ink font-medium">{(diasAtivos * data.horas).toFixed(1)}h/semana</span></div>
        </div>
      </div>

      <button onClick={onClose} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink hover:bg-ink/90 text-white font-semibold py-3.5 text-[14px] transition">
        Ir para meu painel <SignupArrow size={15} />
      </button>
    </div>);
}

window.SignupModal = SignupModal;
