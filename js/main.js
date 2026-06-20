(function () {
  "use strict";

  var STEP_COUNT = 4;
  var step = 0;

  var overlay = document.getElementById("signupOverlay");
  var stepperEl = document.getElementById("signupStepper");
  var footerEl = document.getElementById("signupFooter");
  var panels = Array.prototype.slice.call(document.querySelectorAll(".signup-panel[data-panel]"));
  var stepIndicators = Array.prototype.slice.call(document.querySelectorAll(".signup-step"));
  var stepLines = Array.prototype.slice.call(document.querySelectorAll(".signup-step__line"));

  var backBtn = document.getElementById("suBack");
  var skipBtn = document.getElementById("suSkip");
  var nextBtn = document.getElementById("suNext");
  var nextLabel = document.getElementById("suNextLabel");

  var nomeInput = document.getElementById("suNome");
  var emailInput = document.getElementById("suEmail");
  var senhaInput = document.getElementById("suSenha");
  var cursoInput = document.getElementById("suCurso");

  var periodosEl = document.getElementById("suPeriodos");
  var diasEl = document.getElementById("suDias");
  var discContainer = document.getElementById("suDisciplinas");
  var addDiscBtn = document.getElementById("suAddDisciplina");

  var horasInput = document.getElementById("suHoras");
  var horasLabel = document.getElementById("suHorasLabel");
  var horasInline = document.getElementById("suHorasInline");
  var diasAtivosEl = document.getElementById("suDiasAtivos");
  var totalHorasEl = document.getElementById("suTotalHoras");

  function panelFor(key) {
    return panels.filter(function (p) { return p.dataset.panel === String(key); })[0];
  }

  /* ---------- Modal open/close ---------- */

  function openSignup() {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    showDone(false);
    goToStep(0);
  }

  function closeSignup() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-open-signup]")) {
      e.preventDefault();
      openSignup();
    } else if (e.target.closest("[data-close-signup]")) {
      e.preventDefault();
      closeSignup();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closeSignup();
  });

  /* ---------- Wizard navigation ---------- */

  function showDone(isDone) {
    stepperEl.hidden = isDone;
    footerEl.hidden = isDone;
    panelFor("done").hidden = !isDone;
    if (isDone) {
      for (var i = 0; i < STEP_COUNT; i++) panelFor(i).hidden = true;
      populateDone();
    }
  }

  function goToStep(n) {
    step = n;
    for (var i = 0; i < STEP_COUNT; i++) panelFor(i).hidden = i !== step;

    stepIndicators.forEach(function (el) {
      var i = Number(el.dataset.stepIndicator);
      el.classList.toggle("is-done", i < step);
      el.classList.toggle("is-active", i === step);
    });
    stepLines.forEach(function (line, i) {
      line.classList.toggle("is-done", i < step);
    });

    backBtn.classList.toggle("is-invisible", step === 0);
    skipBtn.hidden = !(step > 0 && step < STEP_COUNT - 1);
    nextLabel.textContent = step === STEP_COUNT - 1 ? "Gerar meu plano" : "Continuar";
    validateStep();
  }

  function validateStep() {
    var ok = true;
    if (step === 0) {
      ok = !!nomeInput.value.trim() && !!emailInput.value.trim() && senhaInput.value.length >= 6;
    }
    nextBtn.disabled = !ok;
  }

  function advance() {
    if (nextBtn.disabled) return;
    if (step < STEP_COUNT - 1) goToStep(step + 1);
    else showDone(true);
  }

  [nomeInput, emailInput, senhaInput].forEach(function (input) {
    input.addEventListener("input", validateStep);
  });

  backBtn.addEventListener("click", function () {
    if (step > 0) goToStep(step - 1);
  });
  skipBtn.addEventListener("click", advance);
  nextBtn.addEventListener("click", advance);

  /* ---------- Período pills (single-select) ---------- */

  periodosEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".su-pill");
    if (!btn) return;
    periodosEl.querySelectorAll(".su-pill").forEach(function (p) { p.classList.remove("is-active"); });
    btn.classList.add("is-active");
  });

  /* ---------- Dias (multi-toggle) ---------- */

  diasEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".su-day");
    if (!btn) return;
    btn.classList.toggle("is-active");
    updateSummary();
  });

  /* ---------- Horas (range) ---------- */

  horasInput.addEventListener("input", function () {
    horasLabel.textContent = horasInput.value;
    horasInline.textContent = horasInput.value;
    updateSummary();
  });

  function updateSummary() {
    var diasAtivos = diasEl.querySelectorAll(".su-day.is-active").length;
    var horas = Number(horasInput.value);
    diasAtivosEl.textContent = diasAtivos + " dias";
    totalHorasEl.textContent = (diasAtivos * horas).toFixed(1) + "h/semana";
  }

  /* ---------- Disciplinas (dynamic rows) ---------- */

  function renumberDisciplinas() {
    var rows = discContainer.querySelectorAll(".su-disc-row");
    rows.forEach(function (row, i) {
      row.querySelector(".su-disc-row__num").textContent = String(i + 1).padStart(2, "0");
      row.querySelector("input").placeholder = "Disciplina " + (i + 1);
      row.querySelector(".su-disc-row__remove").hidden = rows.length <= 1;
    });
  }

  function addDisciplinaRow() {
    var row = document.createElement("div");
    row.className = "su-disc-row";
    row.innerHTML =
      '<div class="su-disc-row__num"></div>' +
      '<input type="text" />' +
      '<button type="button" class="su-disc-row__remove" aria-label="Remover disciplina">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>' +
      "</button>";
    discContainer.appendChild(row);
    renumberDisciplinas();
  }

  addDiscBtn.addEventListener("click", addDisciplinaRow);

  discContainer.addEventListener("click", function (e) {
    var btn = e.target.closest(".su-disc-row__remove");
    if (!btn) return;
    if (discContainer.querySelectorAll(".su-disc-row").length <= 1) return;
    btn.closest(".su-disc-row").remove();
    renumberDisciplinas();
  });

  addDisciplinaRow();
  addDisciplinaRow();
  addDisciplinaRow();

  /* ---------- Done screen ---------- */

  function populateDone() {
    var primeiroNome = nomeInput.value.trim().split(" ")[0];
    var diasAtivos = diasEl.querySelectorAll(".su-day.is-active").length;
    var horas = Number(horasInput.value);
    var disciplinas = Array.prototype.slice
      .call(discContainer.querySelectorAll(".su-disc-row input"))
      .map(function (input) { return input.value.trim(); })
      .filter(Boolean);

    document.getElementById("suDoneMsg").textContent =
      (primeiroNome ? primeiroNome + ", " : "") +
      "seu teste de 14 dias começou. A IA já está montando seu primeiro plano semanal.";
    document.getElementById("suResumoCurso").textContent = cursoInput.value.trim() || "—";
    document.getElementById("suResumoDisciplinas").textContent = disciplinas.length ? String(disciplinas.length) : "definir depois";
    document.getElementById("suResumoRotina").textContent = (diasAtivos * horas).toFixed(1) + "h/semana";
  }

  updateSummary();
  goToStep(0);
})();
