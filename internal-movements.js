const INTERNAL_MOVEMENTS_STORAGE_KEY = "gestao-financeira-nl-internal-keywords";
const STATEMENTS_STORAGE_KEY = "gestao-financeira-nl-statements";
const ACCOUNTS_STORAGE_KEY = "gestao-financeira-nl-accounts";

const INTERNAL_DEFAULT_KEYWORDS = [
  { id: createId(), term: "constit" },
  { id: createId(), term: "reforco" },
  { id: createId(), term: "subscricao ppr" },
  { id: createId(), term: "trf p/o Joana Monteiro" },
];

const activeList = document.querySelector("#internal-active-list");
const affectedList = document.querySelector("#internal-affected-list");
const internalAffectedTitle = document.querySelector("#internal-affected-title");
const internalAffectedSubtitle = document.querySelector("#internal-affected-subtitle");
const internalAffectedCount = document.querySelector("#internal-affected-count");
const internalAffectedTotal = document.querySelector("#internal-affected-total");
const addInternalKeywordButton = document.querySelector("#add-internal-keyword");
const internalFeedback = document.querySelector("#internal-movements-feedback");
const internalMovementsModal = document.querySelector("#internal-movements-modal");
const closeInternalMovementsModalButton = document.querySelector("#close-internal-movements-modal");
const internalKeywordFormPanel = document.querySelector("#internal-keyword-form-panel");
const internalKeywordForm = document.querySelector("#internal-keyword-form");
const internalKeywordInput = document.querySelector("#internal-keyword-input");
const cancelInternalKeywordButton = document.querySelector("#cancel-internal-keyword");
const internalAnalysisPanel = document.querySelector("#internal-analysis-panel");
const internalAnalysisTitle = document.querySelector("#internal-analysis-title");
const internalAnalysisSubtitle = document.querySelector("#internal-analysis-subtitle");
const internalAnalysisCount = document.querySelector("#internal-analysis-count");
const internalAnalysisTotal = document.querySelector("#internal-analysis-total");
const internalAnalysisRedundancy = document.querySelector("#internal-analysis-redundancy");
const internalAnalysisExamples = document.querySelector("#internal-analysis-examples");
const internalAnalysisToggle = document.querySelector("#internal-analysis-toggle");
const applyInternalKeywordButton = document.querySelector("#apply-internal-keyword");
const dismissInternalAnalysisButton = document.querySelector("#dismiss-internal-analysis");

let internalKeywords = loadInternalKeywords();
let pendingKeywordAnalysis = null;
let selectedKeywordId = internalKeywords[0]?.id || "";
let turmaScrollTopButton = null;
let isInternalAnalysisExpanded = false;

if (activeList) {
  renderInternalMovementsPage();
}

initTurmaScrollTopButton();

addInternalKeywordButton?.addEventListener("click", () => {
  internalKeywordFormPanel?.classList.remove("hidden");
  internalKeywordInput?.focus();
});

closeInternalMovementsModalButton?.addEventListener("click", closeInternalMovementsModal);
internalMovementsModal?.addEventListener("click", (event) => {
  if (event.target.dataset.closeInternalMovements === "true") {
    closeInternalMovementsModal();
  }
});

cancelInternalKeywordButton?.addEventListener("click", () => {
  closeKeywordForm();
});

dismissInternalAnalysisButton?.addEventListener("click", () => {
  clearPendingAnalysis();
});

applyInternalKeywordButton?.addEventListener("click", applyPendingKeywordAnalysis);
internalAnalysisToggle?.addEventListener("click", () => {
  isInternalAnalysisExpanded = !isInternalAnalysisExpanded;
  renderPendingAnalysis();
});

internalKeywordForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const keyword = internalKeywordInput?.value.trim() || "";

  if (!keyword) {
    showInternalFeedback("Indica uma palavra-chave válida.", "error");
    return;
  }

  const normalizedKeyword = normalizeKeyword(keyword);
  const hasDuplicate = internalKeywords.some((entry) => normalizeKeyword(entry.term) === normalizedKeyword);

  if (hasDuplicate) {
    showInternalFeedback("Essa palavra-chave já existe.", "error");
    return;
  }

  pendingKeywordAnalysis = analyzeKeywordImpact(keyword);
  renderPendingAnalysis();
});

activeList?.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-internal-keyword]");
  const keywordCard = event.target.closest("[data-internal-keyword-id]");

  if (!deleteButton) {
    if (!keywordCard) {
      return;
    }

    selectedKeywordId = keywordCard.dataset.internalKeywordId || "";
    renderInternalKeywords();
    renderAffectedMovements();
    return;
  }

  deleteInternalKeyword(deleteButton.dataset.deleteInternalKeyword);
});

activeList?.addEventListener("keydown", (event) => {
  const keywordCard = event.target.closest("[data-internal-keyword-id]");

  if (!keywordCard || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }

  event.preventDefault();
  selectedKeywordId = keywordCard.dataset.internalKeywordId || "";
  renderInternalKeywords();
  renderAffectedMovements();
});

function renderInternalMovementsPage() {
  renderInternalKeywords();
  renderAffectedMovements();
  renderPendingAnalysis();
}

function openInternalMovementsModal() {
  if (!internalMovementsModal) {
    return;
  }

  internalMovementsModal.classList.remove("hidden");
  syncInternalMovementsScrollLock();

  try {
    renderInternalMovementsPage();
  } catch (error) {
    showInternalFeedback("Não foi possível carregar os movimentos internos.", "error");
    console.error(error);
  }
}

function closeInternalMovementsModal() {
  if (!internalMovementsModal) {
    return;
  }

  internalMovementsModal.classList.add("hidden");
  clearPendingAnalysis();
  closeKeywordForm();
  syncInternalMovementsScrollLock();
}

function renderInternalKeywords() {
  if (!activeList) {
    return;
  }

  if (internalKeywords.length === 0) {
    activeList.innerHTML = `
      <div class="empty-state internal-empty-state">
        <strong>Sem palavras-chave definidas.</strong>
        <p>Usa “Adicionar palavra” para começares a construir esta lista.</p>
      </div>
    `;
    return;
  }

  ensureSelectedKeyword();

  activeList.innerHTML = internalKeywords
    .map((entry) => `
      <article
        class="internal-chip-card ${entry.id === selectedKeywordId ? "is-selected" : ""}"
        data-internal-keyword-id="${escapeHtml(entry.id)}"
        role="button"
        tabindex="0"
        aria-pressed="${entry.id === selectedKeywordId ? "true" : "false"}"
      >
        <div class="internal-chip-card-top">
          <div>
            <span class="card-label">Regra ativa</span>
            <strong>${escapeHtml(entry.term)}</strong>
          </div>

          <button
            type="button"
            class="internal-remove-button"
            data-delete-internal-keyword="${escapeHtml(entry.id)}"
            aria-label="Remover palavra-chave"
            title="Remover palavra-chave"
          >
            ×
          </button>
        </div>
      </article>
    `)
    .join("");
}

function renderAffectedMovements() {
  if (!affectedList) {
    return;
  }

  ensureSelectedKeyword();
  const selectedKeyword = getSelectedKeyword();
  const allAffectedMovements = getStoredInternalMovements();
  const affectedMovements = selectedKeyword
    ? allAffectedMovements.filter((movement) => normalizeKeyword(movement.internalKeywordMatch || "") === normalizeKeyword(selectedKeyword.term))
    : allAffectedMovements;
  const previewMovements = affectedMovements.slice(0, 8);
  const totalAmount = affectedMovements.reduce((sum, movement) => sum + Number(movement.amount || 0), 0);

  if (internalAffectedTitle) {
    internalAffectedTitle.textContent = selectedKeyword
      ? `Movimentos excluídos por “${selectedKeyword.term}”`
      : "Movimentos internos já marcados";
  }

  if (internalAffectedSubtitle) {
    internalAffectedSubtitle.textContent = selectedKeyword
      ? "Aqui aparecem os movimentos que esta palavra está atualmente a excluir da contabilidade."
      : "Aqui aparecem os últimos movimentos que já ficaram excluídos da contabilidade geral.";
  }

  if (internalAffectedCount) {
    internalAffectedCount.textContent = affectedMovements.length.toString();
  }

  if (internalAffectedTotal) {
    internalAffectedTotal.textContent = formatCurrency(totalAmount);
  }

  if (previewMovements.length === 0) {
    affectedList.innerHTML = `
      <div class="empty-state internal-empty-state">
        <strong>${selectedKeyword ? "Sem movimentos encontrados para esta palavra." : "Ainda não existem movimentos internos aplicados."}</strong>
        <p>${selectedKeyword ? "Seleciona outra palavra ou importa novos extratos para veres resultados aqui." : "Analisa uma nova palavra-chave para veres logo os movimentos já afetados."}</p>
      </div>
    `;
    return;
  }

  affectedList.innerHTML = previewMovements.map((movement) => `
    <article class="internal-affected-card">
      <div class="internal-affected-copy">
        <span class="card-label">${escapeHtml(formatMovementMeta(movement))}</span>
        <strong>${escapeHtml(movement.description || "Movimento")}</strong>
        <p>${escapeHtml(movement.accountName)} · ${escapeHtml(formatPeriodLabel(movement.periodKey))}${movement.internalKeywordMatch ? ` · Regra: ${escapeHtml(movement.internalKeywordMatch)}` : ""}</p>
      </div>
      <strong class="money-figure">${formatCurrency(Number(movement.amount || 0))}</strong>
    </article>
  `).join("");
}

function renderPendingAnalysis() {
  if (!internalAnalysisPanel) {
    return;
  }

  if (!pendingKeywordAnalysis) {
    internalAnalysisPanel.classList.add("hidden");
    return;
  }

  internalAnalysisPanel.classList.remove("hidden");
  internalAnalysisTitle.textContent = pendingKeywordAnalysis.keyword;
  internalAnalysisSubtitle.textContent = pendingKeywordAnalysis.matchCount > 0
    ? `${pendingKeywordAnalysis.matchCount} movimentos seriam marcados como internos com esta nova regra.`
    : "Nenhum movimento existente foi encontrado, mas podes guardar a regra para importações futuras.";
  internalAnalysisCount.textContent = pendingKeywordAnalysis.matchCount.toString();
  internalAnalysisTotal.textContent = formatCurrency(pendingKeywordAnalysis.totalAmount);
  if (internalAnalysisRedundancy) {
    if (pendingKeywordAnalysis.redundantMatchCount > 0) {
      internalAnalysisRedundancy.textContent = pendingKeywordAnalysis.redundantMatchCount === pendingKeywordAnalysis.matchCount
        ? `Regra redundante: todos os ${pendingKeywordAnalysis.redundantMatchCount} movimentos já estão cobertos por regras existentes.`
        : `Atenção: ${pendingKeywordAnalysis.redundantMatchCount} dos ${pendingKeywordAnalysis.matchCount} movimentos já estão cobertos por regras existentes.`;
      internalAnalysisRedundancy.classList.remove("hidden");
    } else {
      internalAnalysisRedundancy.textContent = "";
      internalAnalysisRedundancy.classList.add("hidden");
    }
  }
  applyInternalKeywordButton.textContent = pendingKeywordAnalysis.matchCount > 0
    ? "Aplicar regra aos movimentos encontrados"
    : "Guardar regra";

  const visibleExamples = isInternalAnalysisExpanded
    ? pendingKeywordAnalysis.matches
    : pendingKeywordAnalysis.examples;

  internalAnalysisExamples.innerHTML = visibleExamples.length > 0
    ? visibleExamples.map((movement) => `
      <article class="internal-analysis-example-card ${movement.coveredByExistingRule ? "is-redundant" : ""}">
        <div class="internal-analysis-example-copy">
          <span class="card-label">${escapeHtml(formatMovementMeta(movement))}</span>
          <strong>${escapeHtml(movement.description || "Movimento")}</strong>
          <p>${escapeHtml(movement.accountName)} · ${escapeHtml(formatPeriodLabel(movement.periodKey))}</p>
        </div>
        <strong class="money-figure">${formatCurrency(Number(movement.amount || 0))}</strong>
      </article>
    `).join("")
    : `
      <div class="empty-state internal-empty-state">
        <strong>Sem movimentos existentes encontrados.</strong>
        <p>Podes guardar a palavra para que passe a ser aplicada nas próximas importações.</p>
      </div>
    `;

  if (internalAnalysisToggle) {
    const hasMoreExamples = pendingKeywordAnalysis.matches.length > pendingKeywordAnalysis.examples.length;
    internalAnalysisToggle.classList.toggle("hidden", !hasMoreExamples);
    internalAnalysisToggle.textContent = isInternalAnalysisExpanded ? "Ver menos" : "Ver tudo";
  }
}

function analyzeKeywordImpact(keyword) {
  const normalizedKeyword = normalizeComparable(keyword);
  const statements = loadStatementsStore();
  const accountsById = getAccountsById();
  const activeKeywords = getActiveKeywordTerms();
  const matches = [];
  let redundantMatchCount = 0;
  let redundantTotalAmount = 0;

  Object.entries(statements).forEach(([accountId, record]) => {
    Object.entries(record?.periods || {}).forEach(([periodKey, movements]) => {
      (Array.isArray(movements) ? movements : []).forEach((movement, movementIndex) => {
        const normalizedDescription = normalizeComparable(movement?.description || "");

        if (!normalizedKeyword || !normalizedDescription.includes(normalizedKeyword)) {
          return;
        }

        const coveredByExistingRule = findMatchingKeywordForDescription(
          movement?.description || "",
          activeKeywords,
        );

        if (coveredByExistingRule) {
          redundantMatchCount += 1;
          redundantTotalAmount += Number(movement.amount || 0);
        }

        matches.push({
          accountId,
          accountName: accountsById.get(accountId)?.bankName || "Conta",
          periodKey,
          movementIndex,
          description: movement.description || "Movimento",
          amount: Number(movement.amount || 0),
          balance: Number(movement.balance || 0),
          date: movement.date || "",
          coveredByExistingRule,
        });
      });
    });
  });

  const sortedMatches = matches
    .sort((left, right) => `${right.date}-${right.accountId}-${right.movementIndex}`.localeCompare(`${left.date}-${left.accountId}-${left.movementIndex}`));

  return {
    keyword,
    normalizedKeyword,
    matches: sortedMatches,
    matchCount: sortedMatches.length,
    totalAmount: sortedMatches.reduce((sum, movement) => sum + Number(movement.amount || 0), 0),
    redundantMatchCount,
    redundantTotalAmount,
    examples: sortedMatches.slice(0, 6),
  };
}

function applyPendingKeywordAnalysis() {
  if (!pendingKeywordAnalysis) {
    return;
  }

  const statements = loadStatementsStore();
  const matchCount = pendingKeywordAnalysis.matchCount;
  const keywordTerm = pendingKeywordAnalysis.keyword;
  const keywordEntry = {
    id: createId(),
    term: keywordTerm,
  };

  internalKeywords = [keywordEntry, ...internalKeywords];
  saveInternalKeywords();
  reprocessAllInternalMovements({ showFeedback: false, statements });
  clearPendingAnalysis();
  renderInternalMovementsPage();
  closeKeywordForm();
  showInternalFeedback(
    keywordEntry.term
      ? `Regra aplicada: ${keywordEntry.term}. ${matchCount} movimentos ficaram marcados como internos.`
      : "Regra aplicada.",
  );
}

function clearPendingAnalysis() {
  pendingKeywordAnalysis = null;
  isInternalAnalysisExpanded = false;
  renderPendingAnalysis();
}

function deleteInternalKeyword(keywordId) {
  const keyword = internalKeywords.find((entry) => entry.id === keywordId);

  if (!keyword) {
    return;
  }

  internalKeywords = internalKeywords.filter((entry) => entry.id !== keywordId);
  if (selectedKeywordId === keywordId) {
    selectedKeywordId = internalKeywords[0]?.id || "";
  }
  saveInternalKeywords();
  reprocessAllInternalMovements({ showFeedback: false });
  renderInternalKeywords();
  renderAffectedMovements();
  showInternalFeedback(`Palavra-chave removida: ${keyword.term}. Movimentos atualizados.`);
}

function getStoredInternalMovements() {
  const statements = loadStatementsStore();
  const accountsById = getAccountsById();
  const affectedMovements = [];

  Object.entries(statements).forEach(([accountId, record]) => {
    Object.entries(record?.periods || {}).forEach(([periodKey, movements]) => {
      (Array.isArray(movements) ? movements : []).forEach((movement, movementIndex) => {
        if (!movement?.excludedFromAccounting) {
          return;
        }

        affectedMovements.push({
          accountId,
          accountName: accountsById.get(accountId)?.bankName || "Conta",
          periodKey,
          movementIndex,
          description: movement.description || "Movimento",
          amount: Number(movement.amount || 0),
          date: movement.date || "",
          internalKeywordMatch: movement.internalKeywordMatch || "",
        });
      });
    });
  });

  return affectedMovements
    .sort((left, right) => `${right.date}-${right.accountId}-${right.movementIndex}`.localeCompare(`${left.date}-${left.accountId}-${left.movementIndex}`));
}

function getSelectedKeyword() {
  return internalKeywords.find((entry) => entry.id === selectedKeywordId) || null;
}

function ensureSelectedKeyword() {
  if (!internalKeywords.length) {
    selectedKeywordId = "";
    return;
  }

  if (!internalKeywords.some((entry) => entry.id === selectedKeywordId)) {
    selectedKeywordId = internalKeywords[0].id;
  }
}

function reprocessAllInternalMovements(options = {}) {
  const { showFeedback = true } = options;
  const statements = options.statements || loadStatementsStore();
  const activeKeywords = getActiveKeywordTerms();
  let affectedCount = 0;
  let changedCount = 0;

  Object.values(statements).forEach((record) => {
    Object.values(record?.periods || {}).forEach((movements) => {
      (Array.isArray(movements) ? movements : []).forEach((movement) => {
        const matchedKeyword = findMatchingKeywordForDescription(movement?.description || "", activeKeywords);
        const previousState = JSON.stringify([
          Boolean(movement?.internalMovement),
          Boolean(movement?.excludedFromAccounting),
          movement?.internalKeywordMatch || "",
          movement?.internalClassificationSource || "",
        ]);

        applyInternalClassificationToMovement(movement, matchedKeyword);

        if (movement?.excludedFromAccounting) {
          affectedCount += 1;
        }

        const nextState = JSON.stringify([
          Boolean(movement?.internalMovement),
          Boolean(movement?.excludedFromAccounting),
          movement?.internalKeywordMatch || "",
          movement?.internalClassificationSource || "",
        ]);

        if (previousState !== nextState) {
          changedCount += 1;
        }
      });
    });
  });

  saveStatementsStore(statements);
  renderAffectedMovements();
  if (showFeedback) {
    showInternalFeedback(`Movimentos atualizados automaticamente. ${changedCount} alterações e ${affectedCount} movimentos internos ativos.`);
  }

  return {
    changedCount,
    affectedCount,
  };
}

function getActiveKeywordTerms() {
  return internalKeywords
    .filter((entry) => entry?.term)
    .map((entry) => entry.term.trim())
    .filter(Boolean);
}

function findMatchingKeywordForDescription(description, keywords = getActiveKeywordTerms()) {
  const normalizedDescription = normalizeComparable(description);

  if (!normalizedDescription) {
    return "";
  }

  return keywords.find((keyword) => normalizedDescription.includes(normalizeComparable(keyword))) || "";
}

function applyInternalClassificationToMovement(movement, matchedKeyword) {
  if (!movement || typeof movement !== "object") {
    return;
  }

  if (matchedKeyword) {
    movement.internalMovement = true;
    movement.excludedFromAccounting = true;
    movement.internalKeywordMatch = matchedKeyword;
    movement.internalClassificationSource = "rule";
    return;
  }

  if (movement.internalClassificationSource === "manual") {
    movement.internalMovement = true;
    movement.excludedFromAccounting = true;
    movement.internalKeywordMatch = movement.internalKeywordMatch || "";
    return;
  }

  movement.internalMovement = false;
  movement.excludedFromAccounting = false;
  movement.internalKeywordMatch = "";
  movement.internalClassificationSource = "";
}

function loadInternalKeywords() {
  try {
    const rawValue = window.localStorage.getItem(INTERNAL_MOVEMENTS_STORAGE_KEY);

    if (!rawValue) {
      window.localStorage.setItem(
        INTERNAL_MOVEMENTS_STORAGE_KEY,
        JSON.stringify(INTERNAL_DEFAULT_KEYWORDS),
      );
      return [...INTERNAL_DEFAULT_KEYWORDS];
    }

    const parsed = JSON.parse(rawValue);

    if (!Array.isArray(parsed)) {
      return [...INTERNAL_DEFAULT_KEYWORDS];
    }

    const sanitized = parsed
      .map((entry) => ({
        id: typeof entry?.id === "string" && entry.id ? entry.id : createId(),
        term: typeof entry?.term === "string" ? entry.term.trim() : "",
      }))
      .filter((entry) => entry.term);

    if (sanitized.length === 0) {
      return [...INTERNAL_DEFAULT_KEYWORDS];
    }

    return sanitized;
  } catch (error) {
    return [...INTERNAL_DEFAULT_KEYWORDS];
  }
}

function saveInternalKeywords() {
  window.localStorage.setItem(
    INTERNAL_MOVEMENTS_STORAGE_KEY,
    JSON.stringify(internalKeywords),
  );
}

function loadStatementsStore() {
  try {
    const rawValue = window.localStorage.getItem(STATEMENTS_STORAGE_KEY);
    const parsed = rawValue ? JSON.parse(rawValue) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function saveStatementsStore(statements) {
  window.localStorage.setItem(STATEMENTS_STORAGE_KEY, JSON.stringify(statements));
}

function getAccountsById() {
  try {
    const rawValue = window.localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    const parsed = rawValue ? JSON.parse(rawValue) : [];

    return new Map(
      (Array.isArray(parsed) ? parsed : []).map((account) => [account.id, account]),
    );
  } catch (error) {
    return new Map();
  }
}

function closeKeywordForm() {
  internalKeywordForm?.reset();
  internalKeywordFormPanel?.classList.add("hidden");
}

function syncInternalMovementsScrollLock() {
  if (!internalMovementsModal) {
    return;
  }

  const hasOpenModal = document.querySelector(".modal:not(.hidden)");
  document.body.classList.toggle("is-locked", Boolean(hasOpenModal));
}

function normalizeKeyword(value) {
  return normalizeComparable(value);
}

function normalizeComparable(value) {
  return String(value || "")
    .toLocaleLowerCase("pt-PT")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,;:!?()[\]{}"'/\\_*+=~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatMovementMeta(movement) {
  if (!movement?.date) {
    return formatPeriodLabel(movement?.periodKey);
  }

  const parsedDate = new Date(movement.date);

  if (Number.isNaN(parsedDate.getTime())) {
    return formatPeriodLabel(movement?.periodKey);
  }

  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function formatPeriodLabel(periodKey) {
  if (!periodKey) {
    return "Período";
  }

  const [year, month] = periodKey.split("-");
  const labels = {
    "01": "janeiro",
    "02": "fevereiro",
    "03": "março",
    "04": "abril",
    "05": "maio",
    "06": "junho",
    "07": "julho",
    "08": "agosto",
    "09": "setembro",
    "10": "outubro",
    "11": "novembro",
    "12": "dezembro",
  };

  return `${labels[month] || month} ${year}`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value || 0));
}

function showInternalFeedback(message, tone = "success") {
  if (!internalFeedback) {
    return;
  }

  internalFeedback.textContent = message;
  internalFeedback.classList.remove("hidden", "internal-feedback-error");
  internalFeedback.classList.toggle("internal-feedback-error", tone === "error");

  window.clearTimeout(showInternalFeedback.timeoutId);
  showInternalFeedback.timeoutId = window.setTimeout(() => {
    internalFeedback.classList.add("hidden");
    internalFeedback.classList.remove("internal-feedback-error");
  }, 3000);
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `internal-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

window.internalMovementsModal = {
  open: openInternalMovementsModal,
  close: closeInternalMovementsModal,
};

function updateTurmaScrollTopButtonVisibility() {
  if (!turmaScrollTopButton) {
    return;
  }

  const isPastThreshold = window.scrollY > 420;
  turmaScrollTopButton.classList.toggle("is-visible", isPastThreshold);
}

function initTurmaScrollTopButton() {
  if (!document.body || turmaScrollTopButton) {
    return;
  }

  const button = document.createElement("button");
  button.className = "turma-scroll-top-button";
  button.type = "button";
  button.setAttribute("aria-label", "Voltar ao topo");
  button.title = "Voltar ao topo";
  button.innerHTML = `
    <svg class="history-controls__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 18V7" />
      <path d="m8 11 4-4 4 4" />
      <path d="M7 5h10" />
    </svg>
  `;

  document.body.appendChild(button);
  turmaScrollTopButton = button;

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", updateTurmaScrollTopButtonVisibility, {
    passive: true,
  });
  document.addEventListener("click", handleBackgroundScrollTopClick);
  updateTurmaScrollTopButtonVisibility();
}

function handleBackgroundScrollTopClick(event) {
  if (!turmaScrollTopButton?.classList.contains("is-visible")) {
    return;
  }

  if (
    event.defaultPrevented
    || event.button !== 0
    || event.target.closest(
      ".page-shell, .history-toolbar, .data-transfer-dock, .turma-scroll-top-button, .modal, .app-lock-screen, .undo-toast, button, a, input, select, textarea, label",
    )
  ) {
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
