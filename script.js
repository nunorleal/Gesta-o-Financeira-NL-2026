const STORAGE_KEY = "gestao-financeira-nl-accounts";
const RECYCLE_STORAGE_KEY = "gestao-financeira-nl-accounts-recycle";
const STATEMENTS_STORAGE_KEY = "gestao-financeira-nl-statements";
const ACTIVITY_STORAGE_KEY = "gestao-financeira-nl-activity-log";
const MAIN_HISTORY_STORAGE_KEY = "gestao-financeira-nl-main-history";
const INTERNAL_MOVEMENTS_STORAGE_KEY = "gestao-financeira-nl-internal-keywords";
const BACKUP_PIN_STORAGE_KEY = "gestao-financeira-nl-pin";
const EXPORT_DIRECTORY_DB = "gestao-financeira-nl-file-handles";
const EXPORT_DIRECTORY_STORE = "handles";
const EXPORT_DIRECTORY_KEY = "export-directory";
const EXPORT_REMINDER_STORAGE_KEY = "gestao-financeira-nl-export-reminder";
const EXPORT_REMINDER_DELAY = 5 * 60 * 1000;

const form = document.querySelector("#account-form");
const accountsList = document.querySelector("#accounts-list");
const archivedAccountsList = document.querySelector("#archived-accounts-list");
const archivedAccountsPanel = document.querySelector("#archived-accounts-panel");
const emptyState = document.querySelector("#empty-state");
const accountCount = document.querySelector("#account-count");
const totalBalance = document.querySelector("#total-balance");
const analyticsCurrentYear = document.querySelector("#analytics-current-year");
const analyticsYearSelect = document.querySelector("#analytics-year-select");
const balanceTrendChart = document.querySelector("#balance-trend-chart");
const flowTrendChart = document.querySelector("#flow-trend-chart");
const financialProductsTrendChart = document.querySelector("#financial-products-trend-chart");
const pprTrendChart = document.querySelector("#ppr-trend-chart");
const activityList = document.querySelector("#activity-list");
const activityEmptyState = document.querySelector("#activity-empty-state");
const activityToggle = document.querySelector("#activity-toggle");
const activityMoreIndicator = document.querySelector("#activity-more-indicator");
const recycleList = document.querySelector("#recycle-list");
const recycleEmptyState = document.querySelector("#recycle-empty-state");
const recycleCount = document.querySelector("#recycle-count");
const recyclePanel = document.querySelector("#recycle-panel");
const toggleRecycleButton = document.querySelector("#toggle-recycle");
const modal = document.querySelector("#account-modal");
const modalTitle = document.querySelector("#modal-title");
const openModalButton = document.querySelector("#open-account-modal");
const openAccountSelectionModalButton = document.querySelector("#open-account-selection-modal");
const openInternalMovementsPageButton = document.querySelector("#open-internal-movements-page");
const openAllPdfReportsButton = document.querySelector("#open-all-pdf-reports");
const changePinButton = document.querySelector("#change-pin-button");
const accountsPanelToggle = document.querySelector("#accounts-panel-toggle");
const accountsPanelMenu = document.querySelector("#accounts-panel-menu");
const storedDataTotal = document.querySelector("#stored-data-total");
const storedDataUpdated = document.querySelector("#stored-data-updated");
const storedDataGrid = document.querySelector("#stored-data-grid");
const closeModalButton = document.querySelector("#close-account-modal");
const submitButtonLabel = document.querySelector("#submit-button-label");
const accountSelectionModal = document.querySelector("#account-selection-modal");
const closeAccountSelectionModalButton = document.querySelector("#close-account-selection-modal");
const accountSelectionList = document.querySelector("#account-selection-list");
const accountSelectionFeedback = document.querySelector("#account-selection-feedback");
const exportDataButton = document.querySelector("#export-data-button");
const importDataButton = document.querySelector("#import-data-button");
const importDataFile = document.querySelector("#import-data-file");
const dataTransferFeedback = document.querySelector("#data-transfer-feedback");
const undoButton = document.querySelector("#undo-button");
const redoButton = document.querySelector("#redo-button");
const undoToast = document.querySelector("#undo-toast");
const undoToastMessage = document.querySelector("#undo-toast-message");
const undoToastButton = document.querySelector("#undo-toast-button");
const metricTotalWealth = document.querySelector("#metric-total-wealth");
const metricBankBalance = document.querySelector("#metric-bank-balance");
const metricFinancialProducts = document.querySelector("#metric-financial-products");
const metricPpr = document.querySelector("#metric-ppr");
const metricMonthVariation = document.querySelector("#metric-month-variation");
const metricMonthVariationHint = document.querySelector("#metric-month-variation-hint");

const currencyFormatter = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

let accounts = loadAccounts();
let recycledAccounts = loadRecycledAccounts();
let statementsByAccount = loadStatements();
let activityLog = loadActivityLog();
let editingAccountId = null;
let draggedAccountId = null;
let selectedAnalyticsYear = new Date().getFullYear();
let pendingUndoAction = null;
let undoToastTimer = null;
let undoStack = [];
let redoStack = [];
let isActivityExpanded = false;
let exportReminderTimer = null;
let exportReminderInterval = null;
let exportReminderStartedAt = 0;
let exportReminderDeadline = 0;
let dataTransferFeedbackTimer = null;
let lastKnownDataSignature = getMainDataSignature();
let turmaScrollTopButton = null;

loadPersistedHistory();
accounts = migrateAccounts(accounts);
renderAccounts();
renderRecycleBin();
updateHistoryButtons();
initTurmaScrollTopButton();

window.addEventListener("pageshow", refreshMainPageData);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    refreshMainPageData();
  }
});

openModalButton.addEventListener("click", openModal);
openAccountSelectionModalButton?.addEventListener("click", openAccountSelectionModal);
openInternalMovementsPageButton?.addEventListener("click", () => {
  closeAllMenus();
  window.location.href = "./internal-movements.html";
});
openAllPdfReportsButton?.addEventListener("click", openAllPdfReports);
changePinButton?.addEventListener("click", () => {
  closeAllMenus();
  window.gestaoFinanceiraPin?.openChangePinDialog?.();
});
closeModalButton.addEventListener("click", closeModal);
closeAccountSelectionModalButton?.addEventListener("click", closeAccountSelectionModal);
accountsPanelToggle.addEventListener("click", () => {
  const isHidden = accountsPanelMenu.classList.contains("hidden");
  closeAllMenus();
  accountsPanelMenu.classList.toggle("hidden", !isHidden);
  accountsPanelToggle.setAttribute("aria-expanded", String(isHidden));
});
exportDataButton.addEventListener("click", exportAllData);
importDataButton.addEventListener("click", () => {
  importDataFile.click();
});
importDataFile.addEventListener("change", importAllData);
analyticsYearSelect.addEventListener("change", (event) => {
  selectedAnalyticsYear = Number(event.target.value);
  renderAnnualCharts();
});
activityToggle?.addEventListener("click", () => {
  isActivityExpanded = !isActivityExpanded;
  renderActivityLog();
});
activityMoreIndicator?.addEventListener("click", () => {
  isActivityExpanded = true;
  renderActivityLog();
});
toggleRecycleButton.addEventListener("click", () => {
  recyclePanel.classList.toggle("hidden");
});
undoToastButton?.addEventListener("click", runUndoAction);
undoButton?.addEventListener("click", executeUndo);
redoButton?.addEventListener("click", executeRedo);
modal.addEventListener("click", (event) => {
  if (event.target.dataset.closeModal === "true") {
    closeModal();
  }
});
accountSelectionModal?.addEventListener("click", (event) => {
  if (event.target.dataset.closeAccountSelection === "true") {
    closeAccountSelectionModal();
  }
});
accountSelectionList?.addEventListener("change", handleAccountSelectionChange);
document.addEventListener("click", (event) => {
  if (!event.target.closest(".panel-actions") && !event.target.closest(".account-card")) {
    closeAllMenus();
  }

  if (isActivityExpanded && !event.target.closest(".activity-panel")) {
    isActivityExpanded = false;
    renderActivityLog();
  }
});

restoreExportReminderState();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const previousAccount = editingAccountId
    ? accounts.find((item) => item.id === editingAccountId)
    : null;
  const account = await createAccountFromForm(formData, editingAccountId);

  if (editingAccountId) {
    accounts = accounts.map((item) => (item.id === editingAccountId ? account : item));
    addActivityEntry({
      title: "Conta editada",
      description: previousAccount && previousAccount.bankName !== account.bankName
        ? `${previousAccount.bankName} foi atualizada para ${account.bankName}.`
        : `Os dados visuais da conta ${account.bankName} foram atualizados.`,
    });
  } else {
    accounts = [account, ...accounts];
    addActivityEntry({
      title: "Conta criada",
      description: `${account.bankName} foi adicionada à página principal.`,
    });
  }

  saveAccounts();
  renderAccounts();
  form.reset();
  closeModal();
});

function handleAccountCardClick(event) {
  const archiveButton = event.target.closest("[data-archive-id]");
  if (archiveButton) {
    const targetAccount = accounts.find((item) => item.id === archiveButton.dataset.archiveId);
    if (!targetAccount) return;
    const action = {
      type: "archive-account",
      accountId: targetAccount.id,
      before: targetAccount.archived === true,
      after: targetAccount.archived !== true,
    };
    applyMainHistoryAction(action, "redo");
    pushHistoryAction(action);
    return;
  }
  const menuToggle = event.target.closest("[data-menu-toggle]");
  const deleteButton = event.target.closest("[data-delete-id]");
  const editButton = event.target.closest("[data-edit-id]");

  if (menuToggle) {
    toggleAccountMenu(menuToggle.dataset.menuToggle);
    return;
  }

  if (editButton) {
    startEditAccount(editButton.dataset.editId);
    return;
  }

  if (!deleteButton) {
    if (!event.target.closest(".account-menu")) {
      closeAllMenus();
    }
    return;
  }

  deleteAccount(deleteButton.dataset.deleteId);
}

accountsList.addEventListener("click", handleAccountCardClick);
archivedAccountsList.addEventListener("click", handleAccountCardClick);

accountsList.addEventListener("dragstart", (event) => {
  const card = event.target.closest(".account-card");

  if (!card || event.target.closest(".menu-button") || event.target.closest(".account-menu")) {
    event.preventDefault();
    return;
  }

  draggedAccountId = card.dataset.accountId;
  card.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
});

accountsList.addEventListener("dragover", (event) => {
  event.preventDefault();

  const draggedCard = accountsList.querySelector(".account-card.is-dragging");

  if (!draggedCard) {
    return;
  }

  const afterElement = getDragAfterElement(accountsList, event.clientY);

  if (!afterElement) {
    accountsList.appendChild(draggedCard);
    return;
  }

  if (afterElement !== draggedCard) {
    accountsList.insertBefore(draggedCard, afterElement);
  }
});

accountsList.addEventListener("dragend", () => {
  const draggedCard = accountsList.querySelector(".account-card.is-dragging");

  if (draggedCard) {
    draggedCard.classList.remove("is-dragging");
  }

  if (!draggedAccountId) {
    return;
  }

  persistAccountOrder();
  draggedAccountId = null;
});

recycleList.addEventListener("click", (event) => {
  const restoreButton = event.target.closest("[data-restore-id]");
  const purgeButton = event.target.closest("[data-purge-id]");

  if (purgeButton) {
    permanentlyDeleteAccount(purgeButton.dataset.purgeId);
    return;
  }

  if (!restoreButton) {
    return;
  }

  restoreAccount(restoreButton.dataset.restoreId);
});

function loadAccounts() {
  const storedAccounts = window.localStorage.getItem(STORAGE_KEY);

  if (!storedAccounts) {
    return [];
  }

  try {
    return JSON.parse(storedAccounts);
  } catch {
    return [];
  }
}

function migrateAccounts(items) {
  let hasChanged = false;
  const migrated = (Array.isArray(items) ? items : []).map((account) => {
    if (typeof account?.includeInTotals === "boolean") {
      return account;
    }

    hasChanged = true;
    return {
      ...account,
      includeInTotals: true,
    };
  });

  if (hasChanged) {
    accounts = migrated;
    saveAccounts();
  }

  return migrated;
}

function saveAccounts() {
  const serializedAccounts = JSON.stringify(accounts);
  const previousValue = window.localStorage.getItem(STORAGE_KEY);
  const hasChanged = previousValue !== serializedAccounts;
  window.localStorage.setItem(STORAGE_KEY, serializedAccounts);
  lastKnownDataSignature = getMainDataSignature();

  if (hasChanged) {
    scheduleExportReminder();
  }
}

function loadRecycledAccounts() {
  const storedAccounts = window.localStorage.getItem(RECYCLE_STORAGE_KEY);

  if (!storedAccounts) {
    return [];
  }

  try {
    return JSON.parse(storedAccounts);
  } catch {
    return [];
  }
}

function saveRecycledAccounts() {
  const serializedRecycle = JSON.stringify(recycledAccounts);
  const previousValue = window.localStorage.getItem(RECYCLE_STORAGE_KEY);
  const hasChanged = previousValue !== serializedRecycle;
  window.localStorage.setItem(RECYCLE_STORAGE_KEY, serializedRecycle);
  lastKnownDataSignature = getMainDataSignature();

  if (hasChanged) {
    scheduleExportReminder();
  }
}

function loadStatements() {
  const storedStatements = window.localStorage.getItem(STATEMENTS_STORAGE_KEY);

  if (!storedStatements) {
    return {};
  }

  try {
    return migrateStatementsStore(JSON.parse(storedStatements));
  } catch {
    return {};
  }
}

function loadActivityLog() {
  const storedActivity = window.localStorage.getItem(ACTIVITY_STORAGE_KEY);

  if (!storedActivity) {
    return [];
  }

  try {
    const parsedActivity = JSON.parse(storedActivity);
    return Array.isArray(parsedActivity) ? parsedActivity : [];
  } catch {
    return [];
  }
}

function saveStatements() {
  const serializedStatements = JSON.stringify(statementsByAccount);
  const previousValue = window.localStorage.getItem(STATEMENTS_STORAGE_KEY);
  const hasChanged = previousValue !== serializedStatements;
  window.localStorage.setItem(STATEMENTS_STORAGE_KEY, serializedStatements);
  lastKnownDataSignature = getMainDataSignature();

  if (hasChanged) {
    scheduleExportReminder();
  }
}

function saveActivityLog() {
  window.localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activityLog));
}

function addActivityEntry(entry) {
  activityLog = [
    {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...entry,
    },
    ...activityLog,
  ].slice(0, 120);

  saveActivityLog();
}

function persistExportReminderState() {
  try {
    if (!exportReminderDeadline) {
      window.sessionStorage.removeItem(EXPORT_REMINDER_STORAGE_KEY);
      return;
    }

    window.sessionStorage.setItem(
      EXPORT_REMINDER_STORAGE_KEY,
      JSON.stringify({
        startedAt: exportReminderStartedAt,
        deadline: exportReminderDeadline,
      }),
    );
  } catch {
    // Ignorar falhas de persistência em sessão.
  }
}

function runExportReminderAlarm() {
  exportReminderTimer = null;
  stopExportReminderAnimation();
  updateExportReminderVisualState(1, true);
  window.setTimeout(() => {
    const shouldExport = window.confirm(
      "Já passaram 5 minutos desde a última alteração aos dados. Queres exportar um ficheiro agora?",
    );

    if (shouldExport) {
      exportAllData();
      return;
    }

    clearExportReminder();
  }, 80);
}

function restoreExportReminderState() {
  try {
    const saved = window.sessionStorage.getItem(EXPORT_REMINDER_STORAGE_KEY);

    if (!saved) {
      return;
    }

    const parsed = JSON.parse(saved);
    const startedAt = Number(parsed?.startedAt);
    const deadline = Number(parsed?.deadline);

    if (!Number.isFinite(startedAt) || !Number.isFinite(deadline)) {
      window.sessionStorage.removeItem(EXPORT_REMINDER_STORAGE_KEY);
      return;
    }

    if (deadline <= Date.now()) {
      window.sessionStorage.removeItem(EXPORT_REMINDER_STORAGE_KEY);
      return;
    }

    exportReminderStartedAt = startedAt;
    exportReminderDeadline = deadline;
    tickExportReminderAnimation();
    exportReminderInterval = window.setInterval(tickExportReminderAnimation, 100);
    exportReminderTimer = window.setTimeout(
      runExportReminderAlarm,
      Math.max(0, deadline - Date.now()),
    );
  } catch {
    try {
      window.sessionStorage.removeItem(EXPORT_REMINDER_STORAGE_KEY);
    } catch {
      // Ignorar falhas de persistência em sessão.
    }
  }
}

function updateExportReminderVisualState(progress = 0, isReady = false) {
  if (!exportDataButton) {
    return;
  }

  const normalizedProgress = Math.max(0, Math.min(progress, 1));
  const isActive = normalizedProgress > 0 && normalizedProgress < 1;
  const visibleProgress = isActive ? Math.max(normalizedProgress, 0.035) : normalizedProgress;
  const remainingMs = Math.max(0, exportReminderDeadline - Date.now());
  const remainingMinutes = Math.ceil(remainingMs / 60000);
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const exportReminderBadge = document.querySelector("#export-reminder-badge");

  exportDataButton.style.setProperty("--export-reminder-progress", visibleProgress.toFixed(4));
  exportDataButton.classList.toggle("is-export-reminder-active", isActive);
  exportDataButton.classList.toggle("is-export-reminder-ready", isReady);

  if (exportReminderBadge) {
    exportReminderBadge.textContent = isReady
      ? "!"
      : isActive
        ? `${Math.max(1, remainingSeconds)}s`
        : "";
  }

  exportDataButton.title = isReady
    ? "Exportar agora"
    : isActive
      ? `Exportar (${remainingMinutes} min para o lembrete)`
      : "Exportar dados";
}

function stopExportReminderAnimation() {
  window.clearInterval(exportReminderInterval);
  exportReminderInterval = null;
}

function tickExportReminderAnimation() {
  if (!exportReminderDeadline) {
    updateExportReminderVisualState();
    return;
  }

  const now = Date.now();
  const totalDuration = Math.max(1, exportReminderDeadline - exportReminderStartedAt);
  const elapsed = Math.min(totalDuration, Math.max(0, now - exportReminderStartedAt));
  const progress = elapsed / totalDuration;
  updateExportReminderVisualState(progress, progress >= 1);
}

function clearExportReminder() {
  window.clearTimeout(exportReminderTimer);
  exportReminderTimer = null;
  stopExportReminderAnimation();
  exportReminderStartedAt = 0;
  exportReminderDeadline = 0;
  persistExportReminderState();
  updateExportReminderVisualState();
}

function scheduleExportReminder() {
  if (exportReminderDeadline && exportReminderDeadline > Date.now()) {
    tickExportReminderAnimation();
    persistExportReminderState();
    return;
  }

  clearExportReminder();
  exportReminderStartedAt = Date.now();
  exportReminderDeadline = exportReminderStartedAt + EXPORT_REMINDER_DELAY;
  persistExportReminderState();
  tickExportReminderAnimation();
  exportReminderInterval = window.setInterval(tickExportReminderAnimation, 100);
  exportReminderTimer = window.setTimeout(runExportReminderAlarm, EXPORT_REMINDER_DELAY);
}

function showDataTransferFeedback(message) {
  if (!dataTransferFeedback) {
    return;
  }

  dataTransferFeedback.textContent = message;
  dataTransferFeedback.classList.remove("hidden");
  window.clearTimeout(dataTransferFeedbackTimer);
  dataTransferFeedbackTimer = window.setTimeout(() => {
    dataTransferFeedback.textContent = "";
    dataTransferFeedback.classList.add("hidden");
  }, 3200);
}

function openAllPdfReports() {
  closeAllMenus();

  try {
    const dossier = buildAllPdfReportsData();

    if (dossier.sections.length === 0) {
      showDataTransferFeedback("Ainda não existem meses com dados para gerar relatórios PDF.");
      return;
    }

    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
      showDataTransferFeedback("Não foi possível abrir os relatórios PDF.");
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(createAllPdfReportsMarkup(dossier));
    reportWindow.document.close();
    showDataTransferFeedback(
      dossier.skippedSections > 0
        ? `Relatórios PDF gerados com ${dossier.skippedSections} ${dossier.skippedSections === 1 ? "secção ignorada" : "secções ignoradas"} por dados inválidos.`
        : "Relatórios PDF gerados com sucesso.",
    );
  } catch (error) {
    console.error("Falha ao gerar os relatórios PDF em lote.", error);
    showDataTransferFeedback(`Não foi possível gerar os relatórios PDF. ${error?.message || ""}`.trim());
  }
}

function loadPersistedHistory() {
  const rawHistory = window.localStorage.getItem(MAIN_HISTORY_STORAGE_KEY);

  if (!rawHistory) {
    undoStack = [];
    redoStack = [];
    return;
  }

  try {
    const parsedHistory = JSON.parse(rawHistory);
    undoStack = Array.isArray(parsedHistory?.undo) ? parsedHistory.undo : [];
    redoStack = Array.isArray(parsedHistory?.redo) ? parsedHistory.redo : [];
  } catch {
    undoStack = [];
    redoStack = [];
  }
}

function savePersistedHistory() {
  window.localStorage.setItem(MAIN_HISTORY_STORAGE_KEY, JSON.stringify({
    undo: undoStack.slice(-20),
    redo: redoStack.slice(-20),
  }));
}

function updateHistoryButtons() {
  if (undoButton) {
    undoButton.disabled = undoStack.length === 0;
  }

  if (redoButton) {
    redoButton.disabled = redoStack.length === 0;
  }
}

function pushHistoryAction(action) {
  undoStack = [...undoStack, action].slice(-20);
  redoStack = [];
  savePersistedHistory();
  updateHistoryButtons();
}

function executeUndo() {
  const action = undoStack.pop();

  if (!action) {
    updateHistoryButtons();
    return;
  }

  applyMainHistoryAction(action, "undo");
  redoStack.push(action);
  savePersistedHistory();
  updateHistoryButtons();
}

function executeRedo() {
  const action = redoStack.pop();

  if (!action) {
    updateHistoryButtons();
    return;
  }

  applyMainHistoryAction(action, "redo");
  undoStack.push(action);
  savePersistedHistory();
  updateHistoryButtons();
}

function applyMainHistoryAction(action, mode) {
  if (!action) {
    return;
  }

  if (action.type === "archive-account") {
    const targetAccount = accounts.find((item) => item.id === action.accountId);
    if (!targetAccount) return;
    targetAccount.archived = mode === "undo" ? action.before : action.after;
    addActivityEntry({
      title: targetAccount.archived ? "Conta arquivada" : "Conta reativada",
      description: `${targetAccount.bankName} ${targetAccount.archived ? "foi movida para Contas arquivadas" : "voltou à lista principal"}.`,
    });
    closeAllMenus();
    saveAccounts();
    renderAccounts();
    return;
  }

  if (action.type === "delete-account") {
    const { account, originalIndex } = action;

    if (mode === "undo") {
      recycledAccounts = recycledAccounts.filter((item) => item.id !== account.id);
      accounts = accounts.filter((item) => item.id !== account.id);
      accounts.splice(Math.max(originalIndex, 0), 0, account);
      saveAccounts();
      saveRecycledAccounts();
      addActivityEntry({
        title: "Ação desfeita",
        description: `${account.bankName} foi reposta na lista principal.`,
      });
      renderAccounts();
      renderRecycleBin();
      return;
    }

    accounts = accounts.filter((item) => item.id !== account.id);
    recycledAccounts = [
      account,
      ...recycledAccounts.filter((item) => item.id !== account.id),
    ];
    addActivityEntry({
      title: "Conta enviada para a reciclagem",
      description: `${account.bankName} foi removida da lista principal.`,
    });
    closeAllMenus();
    saveAccounts();
    saveRecycledAccounts();
    renderAccounts();
    renderRecycleBin();
  }
}

function showUndoToast(message, onUndo) {
  if (!undoToast || !undoToastMessage || !undoToastButton) {
    return;
  }

  pendingUndoAction = onUndo;
  undoToastMessage.textContent = message;
  undoToast.classList.remove("hidden");

  window.clearTimeout(undoToastTimer);
  undoToastTimer = window.setTimeout(hideUndoToast, 8000);
}

function hideUndoToast() {
  pendingUndoAction = null;
  window.clearTimeout(undoToastTimer);
  undoToastTimer = null;
  undoToast?.classList.add("hidden");
}

function runUndoAction() {
  if (!pendingUndoAction) {
    return;
  }

  const action = pendingUndoAction;
  hideUndoToast();
  action();
}

function renderAccounts() {
  statementsByAccount = loadStatements();
  activityLog = loadActivityLog();
  const executiveMetrics = buildExecutiveMetrics();
  const activeAccounts = accounts.filter((item) => item.archived !== true);
  const archivedAccounts = accounts.filter((item) => item.archived === true);
  accountCount.textContent = activeAccounts.length.toString();
  emptyState.classList.toggle("hidden", activeAccounts.length > 0);
  accountsList.innerHTML = activeAccounts.map(createAccountCard).join("");
  archivedAccountsPanel.classList.toggle("hidden", archivedAccounts.length === 0);
  document.querySelector("#archived-accounts-count").textContent = archivedAccounts.length.toString();
  archivedAccountsList.innerHTML = archivedAccounts.map(createAccountCard).join("");
  totalBalance.textContent = formatBalance(executiveMetrics.totalWealth);
  renderExecutiveMetrics(executiveMetrics);
  renderAnnualCharts();
  renderActivityLog();
  renderStoredDataSummary();
}

function renderStoredDataSummary() {
  if (!storedDataTotal || !storedDataUpdated || !storedDataGrid) {
    return;
  }

  const summary = buildStoredDataSummary();
  storedDataTotal.textContent = `${summary.total} ${summary.total === 1 ? "registo" : "registos"}`;
  storedDataUpdated.textContent = summary.lastChangedAt
    ? `Última alteração: ${formatDateTime(summary.lastChangedAt)}`
    : "Última alteração: sem registos";
  storedDataGrid.innerHTML = summary.items
    .map((item) => `
      <article class="stored-data-stat">
        <span>${escapeHtml(item.label)}</span>
        <strong>${item.value}</strong>
      </article>
    `)
    .join("");
}

function buildStoredDataSummary() {
  const statementPeriods = Object.values(statementsByAccount || {})
    .reduce((total, record) => total + Object.keys(record?.periods || {}).length, 0);
  const movements = Object.values(statementsByAccount || {})
    .reduce((total, record) => {
      return total + Object.values(record?.periods || {})
        .reduce((movementTotal, periodMovements) => movementTotal + (Array.isArray(periodMovements) ? periodMovements.length : 0), 0);
    }, 0);
  const products = accounts.reduce((total, account) => {
    return total + Object.values(account?.financialProductsByPeriod || {})
      .reduce((productTotal, periodProducts) => productTotal + (Array.isArray(periodProducts) ? periodProducts.length : 0), 0);
  }, 0);
  const recurringRules = accounts.reduce((total, account) => {
    return total + Object.values(account?.movementRulesByPeriod || {})
      .reduce((ruleTotal, periodRules) => ruleTotal + (Array.isArray(periodRules) ? periodRules.length : 0), 0);
  }, 0);
  const internalRules = loadStoredInternalMovementRules().length;
  const recycled = recycledAccounts.length;
  const activity = activityLog.length;
  const total = accounts.length
    + recycled
    + statementPeriods
    + movements
    + products
    + recurringRules
    + internalRules
    + activity;

  return {
    total,
    lastChangedAt: activityLog[0]?.timestamp || "",
    items: [
      { label: "Contas", value: accounts.length },
      { label: "Extratos", value: statementPeriods },
      { label: "Movimentos", value: movements },
      { label: "Produtos", value: products },
      { label: "Recorrentes", value: recurringRules },
      { label: "Exclusões", value: internalRules },
      { label: "Reciclagem", value: recycled },
      { label: "Atividade", value: activity },
    ],
  };
}

function formatDateTime(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "sem registos";
  }

  return new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function renderExecutiveMetrics(metrics = buildExecutiveMetrics()) {
  if (metricTotalWealth) {
    metricTotalWealth.textContent = formatBalance(metrics.totalWealth);
  }

  if (metricBankBalance) {
    metricBankBalance.textContent = formatBalance(metrics.totalBankBalance);
  }

  if (metricFinancialProducts) {
    metricFinancialProducts.textContent = formatBalance(metrics.totalFinancialProducts);
  }

  if (metricPpr) {
    metricPpr.textContent = formatBalance(metrics.totalPpr);
  }

  if (metricMonthVariation) {
    metricMonthVariation.textContent = formatBalance(metrics.monthVariation);
    metricMonthVariation.classList.remove("executive-metric-positive", "executive-metric-negative");

    if (metrics.monthVariation > 0.0001) {
      metricMonthVariation.classList.add("executive-metric-positive");
    } else if (metrics.monthVariation < -0.0001) {
      metricMonthVariation.classList.add("executive-metric-negative");
    }
  }

  if (metricMonthVariationHint) {
    if (!metrics.hasPreviousReference) {
      metricMonthVariationHint.textContent = "Sem referência anterior.";
      return;
    }

    if (metrics.monthVariation > 0.0001) {
      metricMonthVariationHint.textContent = "Subiu face ao mês anterior.";
      return;
    }

    if (metrics.monthVariation < -0.0001) {
      metricMonthVariationHint.textContent = "Desceu face ao mês anterior.";
      return;
    }

    metricMonthVariationHint.textContent = "Sem variação face ao mês anterior.";
  }
}

function buildExecutiveMetrics() {
  const now = new Date();
  const currentPeriodKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const previousDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousPeriodKey = `${previousDate.getFullYear()}-${String(previousDate.getMonth() + 1).padStart(2, "0")}`;
  let totalBankBalance = 0;
  let totalFinancialProducts = 0;
  let totalPpr = 0;
  let currentPeriodTotal = 0;
  let previousPeriodTotal = 0;
  let hasPreviousReference = false;

  getAccountsIncludedInTotals().forEach((account) => {
    const currentSnapshot = getAccountExecutiveSnapshotForPeriod(account, currentPeriodKey);
    const previousSnapshot = getAccountExecutiveSnapshotForPeriod(account, previousPeriodKey);

    totalBankBalance += currentSnapshot.bankBalance;
    totalFinancialProducts += currentSnapshot.financialTotal;
    totalPpr += currentSnapshot.pprTotal;
    currentPeriodTotal += currentSnapshot.total;
    previousPeriodTotal += previousSnapshot.total;
    hasPreviousReference = hasPreviousReference || previousSnapshot.hasReference;
  });

  return {
    totalWealth: totalBankBalance + totalFinancialProducts + totalPpr,
    totalBankBalance,
    totalFinancialProducts,
    totalPpr,
    monthVariation: currentPeriodTotal - previousPeriodTotal,
    hasPreviousReference,
  };
}

function renderRecycleBin() {
  recycleCount.textContent = recycledAccounts.length.toString();
  recycleEmptyState.classList.toggle("hidden", recycledAccounts.length > 0);
  recycleList.innerHTML = recycledAccounts.map(createRecycleCard).join("");
}

function refreshMainPageData() {
  const previousSignature = lastKnownDataSignature;
  accounts = migrateAccounts(loadAccounts());
  recycledAccounts = loadRecycledAccounts();
  statementsByAccount = loadStatements();
  activityLog = loadActivityLog();
  const currentSignature = getMainDataSignature();

  if (previousSignature && currentSignature !== previousSignature) {
    scheduleExportReminder();
  }

  lastKnownDataSignature = currentSignature;
  loadPersistedHistory();
  renderAccounts();
  renderRecycleBin();
  updateHistoryButtons();
}

function getMainDataSignature() {
  return [
    window.localStorage.getItem(STORAGE_KEY) || "",
    window.localStorage.getItem(RECYCLE_STORAGE_KEY) || "",
    window.localStorage.getItem(STATEMENTS_STORAGE_KEY) || "",
  ].join("||");
}

function renderActivityLog() {
  if (!activityList || !activityEmptyState) {
    return;
  }

  const visibleEntries = isActivityExpanded ? activityLog : activityLog.slice(0, 3);
  const hasMoreEntries = activityLog.length > 3;

  activityEmptyState.classList.toggle("hidden", activityLog.length > 0);
  activityList.innerHTML = visibleEntries
    .map((entry) => `
      <article class="activity-card">
        <div class="activity-time">${formatActivityTimestamp(entry.timestamp)}</div>
        <div class="activity-copy">
          <strong>${escapeHtml(entry.title || "Atividade")}</strong>
          <p>${escapeHtml(entry.description || "")}</p>
        </div>
      </article>
    `)
    .join("");

  if (activityToggle) {
    activityToggle.classList.toggle("hidden", !hasMoreEntries);
    activityToggle.textContent = isActivityExpanded ? "Ver menos" : "Ver tudo";
  }

  if (activityMoreIndicator) {
    activityMoreIndicator.classList.toggle("hidden", !hasMoreEntries || isActivityExpanded);
    activityMoreIndicator.setAttribute("aria-hidden", String(!hasMoreEntries || isActivityExpanded));
  }
}

function renderAnnualCharts() {
  const availableYears = getAnalyticsYears();
  const fallbackYear = availableYears[0] || new Date().getFullYear();

  if (!availableYears.includes(selectedAnalyticsYear)) {
    selectedAnalyticsYear = fallbackYear;
  }

  analyticsYearSelect.innerHTML = availableYears
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");
  analyticsYearSelect.value = String(selectedAnalyticsYear);

  const year = selectedAnalyticsYear;
  const analytics = buildYearAnalytics(year);

  analyticsCurrentYear.textContent = String(year);
  renderBarChart(balanceTrendChart, analytics.monthLabels, analytics.balanceTotals, {
    emptyMessage: "Ainda não há dados suficientes para mostrar a evolução do saldo.",
    barClass: "chart-bar-balance",
  });
  renderDualBarChart(flowTrendChart, analytics.monthLabels, analytics.creditTotals, analytics.expenseTotals, {
    emptyMessage: "Importa extratos para acompanhar créditos e despesas ao longo do ano.",
  });
  renderLineChart(financialProductsTrendChart, analytics.monthLabels, analytics.financialProductTotals, {
    emptyMessage: "Adiciona produtos financeiros para acompanhar a evolução ao longo do ano.",
  });
  renderLineChart(pprTrendChart, analytics.monthLabels, analytics.pprTotals, {
    emptyMessage: "Adiciona PPRs para acompanhar a evolução ao longo do ano.",
  });
}

function getAnalyticsYears() {
  const currentYear = new Date().getFullYear();
  const years = new Set(
    Array.from({ length: 6 }, (_, index) => currentYear - index),
  );

  Object.values(statementsByAccount).forEach((record) => {
    const normalizedRecord = record?.periods ? record : { periods: record || {} };
    Object.keys(normalizedRecord.periods || {}).forEach((periodKey) => {
      years.add(Number(periodKey.slice(0, 4)));
    });
  });

  accounts.forEach((account) => {
    Object.keys(account.financialProductsByPeriod || {}).forEach((periodKey) => {
      years.add(Number(periodKey.slice(0, 4)));
    });
  });

  return Array.from(years)
    .filter((year) => Number.isFinite(year))
    .sort((a, b) => b - a);
}

function buildYearAnalytics(year) {
  const allMonthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const currentDate = new Date();
  const maxMonth = year === currentDate.getFullYear() ? currentDate.getMonth() + 1 : 12;
  const monthLabels = [];
  const balanceTotals = [];
  const creditTotals = [];
  const expenseTotals = [];
  const financialProductTotals = [];
  const pprTotals = [];

  for (let month = 1; month <= maxMonth; month += 1) {
    const periodKey = `${year}-${String(month).padStart(2, "0")}`;
    let monthlyBalance = 0;
    let monthlyCredits = 0;
    let monthlyExpenses = 0;
    let monthlyFinancialProducts = 0;
    let monthlyPprs = 0;
    let hasMonthData = false;

    getAccountsIncludedInTotals().forEach((account) => {
      const record = getAccountStatementRecord(account.id);
      const latestPeriodKey = getLatestPeriodKeyUpTo(record, periodKey);
      const activePeriodKey = latestPeriodKey || periodKey;
      const activeMovements = latestPeriodKey ? record.periods[latestPeriodKey] || [] : [];
      const monthMovements = record.periods[periodKey] || [];
      const accountingMonthMovements = getAccountingMovements(monthMovements);
      const monthBalanceMovement = getMonthlyFinalBalanceMovement(activeMovements);
      const monthFinancialProducts = getFinancialProductsTotalForPeriod(account, periodKey, "non-ppr");
      const monthPprs = getFinancialProductsTotalForPeriod(account, periodKey, "ppr");

      if (monthBalanceMovement) {
        monthlyBalance += Number(monthBalanceMovement.balance || 0);
      }

      monthlyCredits += accountingMonthMovements
        .filter((movement) => movement.amount > 0)
        .reduce((total, movement) => total + movement.amount, 0);

      monthlyExpenses += accountingMonthMovements
        .filter((movement) => movement.amount < 0)
        .reduce((total, movement) => total + Math.abs(movement.amount), 0);

      monthlyFinancialProducts += monthFinancialProducts;
      monthlyPprs += monthPprs;

      if (monthMovements.length > 0 || monthFinancialProducts > 0 || monthPprs > 0) {
        hasMonthData = true;
      }
    });

    if (hasMonthData) {
      monthLabels.push(allMonthLabels[month - 1]);
      balanceTotals.push(monthlyBalance + monthlyFinancialProducts + monthlyPprs);
      creditTotals.push(monthlyCredits);
      expenseTotals.push(monthlyExpenses);
      financialProductTotals.push(monthlyFinancialProducts);
      pprTotals.push(monthlyPprs);
    }
  }

  return {
    monthLabels,
    balanceTotals,
    creditTotals,
    expenseTotals,
    financialProductTotals,
    pprTotals,
  };
}

function getAccountsIncludedInTotals() {
  return accounts.filter((account) => account.includeInTotals !== false);
}

function openAccountSelectionModal() {
  closeAllMenus();
  renderAccountSelectionList();
  accountSelectionFeedback.textContent = "";
  accountSelectionModal?.classList.remove("hidden");
}

function closeAccountSelectionModal() {
  accountSelectionFeedback.textContent = "";
  accountSelectionModal?.classList.add("hidden");
}

function renderAccountSelectionList() {
  if (!accountSelectionList) {
    return;
  }

  if (accounts.length === 0) {
    accountSelectionList.innerHTML = `
      <div class="empty-state">
        <strong>Nenhuma conta disponível.</strong>
        <p>Cria a primeira conta para poderes escolher o que entra nos totais.</p>
      </div>
    `;
    return;
  }

  accountSelectionList.innerHTML = accounts.map((account) => `
    <label class="account-selection-item">
      <input
        type="checkbox"
        data-account-selection-id="${account.id}"
        ${account.includeInTotals !== false ? "checked" : ""}
      />
      <span class="account-selection-copy">
        <strong>${escapeHtml(account.bankName)}</strong>
        <span>${account.includeInTotals !== false ? "Incluída nos somatórios globais" : "Mantida fora dos somatórios globais"}</span>
      </span>
    </label>
  `).join("");
}

function handleAccountSelectionChange(event) {
  const checkbox = event.target.closest("[data-account-selection-id]");

  if (!checkbox) {
    return;
  }

  const account = accounts.find((item) => item.id === checkbox.dataset.accountSelectionId);

  if (!account) {
    return;
  }

  account.includeInTotals = checkbox.checked;
  saveAccounts();
  renderAccounts();
  renderAccountSelectionList();
  accountSelectionFeedback.textContent = checkbox.checked
    ? `${account.bankName} passou a entrar nos somatórios globais.`
    : `${account.bankName} deixou de entrar nos somatórios globais.`;
}

function renderLineChart(container, labels, values, options = {}) {
  if (!container) {
    return;
  }

  const hasData = values.some((value) => Math.abs(value) > 0.0001);

  if (!hasData) {
    container.innerHTML = `<div class="chart-empty">${options.emptyMessage || "Sem dados."}</div>`;
    return;
  }

  const width = 640;
  const height = 220;
  const padding = { top: 18, right: 18, bottom: 30, left: 18 };
  const rawMinValue = Math.min(...values);
  const rawMaxValue = Math.max(...values);
  const hasZeroOrNegative = rawMinValue <= 0;
  const minValue = hasZeroOrNegative
    ? Math.min(0, rawMinValue)
    : Math.max(0, rawMinValue * 0.94);
  const maxValue = rawMaxValue <= 0
    ? rawMaxValue * 0.94
    : rawMaxValue * 1.04;
  const range = maxValue - minValue || 1;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const points = values.map((value, index) => {
    const x = padding.left + (index * innerWidth) / Math.max(values.length - 1, 1);
    const normalized = (value - minValue) / range;
    const y = padding.top + innerHeight - normalized * innerHeight;
    return { x, y, value };
  });
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  container.innerHTML = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">
      ${[0, 0.5, 1].map((step) => {
        const y = padding.top + innerHeight - step * innerHeight;
        return `<line class="chart-grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}"></line>`;
      }).join("")}
      <text class="chart-value-label" x="${padding.left}" y="${padding.top - 2}" text-anchor="start">${formatCompactEuro(rawMaxValue)}</text>
      <text class="chart-value-label" x="${padding.left}" y="${height - padding.bottom - 6}" text-anchor="start">${formatCompactEuro(rawMinValue)}</text>
      <path class="chart-area" d="${areaPath}"></path>
      <path class="chart-line" d="${linePath}"></path>
      ${points.map((point) => `<circle class="chart-point" cx="${point.x}" cy="${point.y}" r="4"></circle>`).join("")}
      ${points.map((point, index) => {
        const labelY = Math.max(padding.top + 12, point.y - 10);
        return `<text class="chart-point-label" x="${point.x}" y="${labelY}" text-anchor="middle">${formatCompactEuro(point.value)}</text>`;
      }).join("")}
      ${labels.map((label, index) => {
        const x = padding.left + (index * innerWidth) / Math.max(labels.length - 1, 1);
        return `<text class="chart-axis-label" x="${x}" y="${height - 8}" text-anchor="middle">${label}</text>`;
      }).join("")}
    </svg>
  `;
}

function formatCompactEuro(value) {
  return new Intl.NumberFormat("pt-PT", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value) + "€";
}

function formatActivityTimestamp(value) {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

async function exportToPreferredDirectory(fileName, blob) {
  if (
    typeof window.showDirectoryPicker !== "function"
    || typeof window.indexedDB === "undefined"
  ) {
    return null;
  }

  let directoryHandle = await loadExportDirectoryHandle();
  let usedSavedDirectory = true;

  if (!directoryHandle) {
    directoryHandle = await window.showDirectoryPicker({
      id: "gestao-financeira-nl-backups",
      mode: "readwrite",
    });
    await saveExportDirectoryHandle(directoryHandle);
    usedSavedDirectory = false;
  }

  let permission = await directoryHandle.queryPermission({ mode: "readwrite" });

  if (permission !== "granted") {
    permission = await directoryHandle.requestPermission({ mode: "readwrite" });
  }

  if (permission !== "granted") {
    throw new Error("Permissão recusada.");
  }

  const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(blob);
  await writable.close();

  return usedSavedDirectory;
}

function openExportDirectoryDb() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(EXPORT_DIRECTORY_DB, 1);

    request.addEventListener("upgradeneeded", () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(EXPORT_DIRECTORY_STORE)) {
        db.createObjectStore(EXPORT_DIRECTORY_STORE);
      }
    });
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error || new Error("Falha na base local.")));
  });
}

async function saveExportDirectoryHandle(directoryHandle) {
  const db = await openExportDirectoryDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXPORT_DIRECTORY_STORE, "readwrite");
    const store = transaction.objectStore(EXPORT_DIRECTORY_STORE);
    const request = store.put(directoryHandle, EXPORT_DIRECTORY_KEY);

    transaction.addEventListener("complete", () => {
      db.close();
      resolve();
    });
    transaction.addEventListener("error", () => {
      db.close();
      reject(transaction.error || new Error("Falha a memorizar a pasta."));
    });
    request.addEventListener("error", () => {
      db.close();
      reject(request.error || new Error("Falha a memorizar a pasta."));
    });
  });
}

async function loadExportDirectoryHandle() {
  const db = await openExportDirectoryDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXPORT_DIRECTORY_STORE, "readonly");
    const store = transaction.objectStore(EXPORT_DIRECTORY_STORE);
    const request = store.get(EXPORT_DIRECTORY_KEY);

    request.addEventListener("success", () => {
      db.close();
      resolve(request.result || null);
    });
    request.addEventListener("error", () => {
      db.close();
      reject(request.error || new Error("Falha a ler a pasta memorizada."));
    });
  });
}

function renderBarChart(container, labels, values, options = {}) {
  if (!container) {
    return;
  }

  const hasData = values.some((value) => Math.abs(value) > 0.0001);

  if (!hasData) {
    container.innerHTML = `<div class="chart-empty">${options.emptyMessage || "Sem dados."}</div>`;
    return;
  }

  const width = 640;
  const height = 220;
  const padding = { top: 18, right: 18, bottom: 30, left: 18 };
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const range = maxValue - minValue || 1;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const slotWidth = innerWidth / values.length;
  const barWidth = Math.max(18, slotWidth * 0.52);
  const barClass = options.barClass || "chart-bar-investment";
  const baselineY = padding.top + innerHeight - ((0 - minValue) / range) * innerHeight;

  container.innerHTML = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">
      ${[0, 0.5, 1].map((step) => {
        const y = padding.top + innerHeight - step * innerHeight;
        return `<line class="chart-grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}"></line>`;
      }).join("")}
      <line class="chart-grid-line" x1="${padding.left}" y1="${baselineY}" x2="${width - padding.right}" y2="${baselineY}"></line>
      <text class="chart-value-label" x="${padding.left}" y="${padding.top - 2}" text-anchor="start">${formatCompactEuro(maxValue)}</text>
      <text class="chart-value-label" x="${padding.left}" y="${height - padding.bottom - 6}" text-anchor="start">${formatCompactEuro(minValue)}</text>
      ${values.map((value, index) => {
        const barHeight = (Math.abs(value) / range) * innerHeight;
        const x = padding.left + index * slotWidth + (slotWidth - barWidth) / 2;
        const y = value >= 0 ? baselineY - barHeight : baselineY;
        const labelY = value >= 0 ? Math.max(padding.top + 12, y - 8) : Math.min(height - padding.bottom - 10, y + barHeight + 14);
        return `
          <rect class="${barClass}" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="10"></rect>
          <text class="chart-point-label" x="${x + barWidth / 2}" y="${labelY}" text-anchor="middle">${formatCompactEuro(value)}</text>
        `;
      }).join("")}
      ${labels.map((label, index) => {
        const x = padding.left + index * slotWidth + slotWidth / 2;
        return `<text class="chart-axis-label" x="${x}" y="${height - 8}" text-anchor="middle">${label}</text>`;
      }).join("")}
    </svg>
  `;
}

function renderDualBarChart(container, labels, credits, expenses, options = {}) {
  if (!container) {
    return;
  }

  const hasData = [...credits, ...expenses].some((value) => Math.abs(value) > 0.0001);

  if (!hasData) {
    container.innerHTML = `<div class="chart-empty">${options.emptyMessage || "Sem dados."}</div>`;
    return;
  }

  const width = 640;
  const height = 220;
  const padding = { top: 18, right: 18, bottom: 30, left: 18 };
  const maxValue = Math.max(...credits, ...expenses, 1);
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const slotWidth = innerWidth / labels.length;
  const barWidth = Math.max(10, slotWidth * 0.28);

  container.innerHTML = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">
      ${[0, 0.5, 1].map((step) => {
        const y = padding.top + innerHeight - step * innerHeight;
        return `<line class="chart-grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}"></line>`;
      }).join("")}
      ${labels.map((label, index) => {
        const baseX = padding.left + index * slotWidth + slotWidth / 2;
        const creditHeight = (credits[index] / maxValue) * innerHeight;
        const expenseHeight = (expenses[index] / maxValue) * innerHeight;
        return `
          <rect class="chart-bar-credit" x="${baseX - barWidth - 3}" y="${padding.top + innerHeight - creditHeight}" width="${barWidth}" height="${creditHeight}" rx="8"></rect>
          <rect class="chart-bar-expense" x="${baseX + 3}" y="${padding.top + innerHeight - expenseHeight}" width="${barWidth}" height="${expenseHeight}" rx="8"></rect>
          <text class="chart-axis-label" x="${baseX}" y="${height - 8}" text-anchor="middle">${label}</text>
        `;
      }).join("")}
    </svg>
  `;
}

async function exportAllData() {
  clearExportReminder();
  const now = new Date();
  const exportPayload = {
    exportedAt: now.toISOString(),
    appVersion: window.FINANCE_APP_VERSION || "1.3",
    version: 1,
    accounts,
    recycledAccounts,
    statementsByAccount,
    activityLog,
    internalMovementRules: loadStoredInternalMovementRules(),
    pin: window.localStorage.getItem(BACKUP_PIN_STORAGE_KEY) || "",
  };
  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    "-",
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");
  const fileName = `GestãofinanceiraNL-${timestamp}.json`;

  try {
    const usedSavedDirectory = await exportToPreferredDirectory(fileName, blob);

    if (usedSavedDirectory !== null) {
      URL.revokeObjectURL(url);
      addActivityEntry({
        title: "Backup exportado",
        description: usedSavedDirectory
          ? `Dados exportados para a pasta memorizada como ${fileName}.`
          : `Pasta de backup escolhida e memorizada com o ficheiro ${fileName}.`,
      });
      showDataTransferFeedback(
        usedSavedDirectory
          ? "Backup exportado para a pasta memorizada."
          : "Pasta de backup escolhida e memorizada com sucesso.",
      );
      return;
    }
  } catch {
    showDataTransferFeedback("Não foi possível usar a pasta memorizada. Foi usado o download normal.");
  }

  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.click();
  URL.revokeObjectURL(url);
  addActivityEntry({
    title: "Backup exportado",
    description: `Dados exportados com o ficheiro ${fileName}.`,
  });
  showDataTransferFeedback("Backup exportado com sucesso.");
}

async function importAllData(event) {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  try {
    const content = await file.text();
    const importedData = JSON.parse(content);
    applyImportedBackup(importedData);
    showDataTransferFeedback("Dados importados com sucesso.");
  } catch {
    showDataTransferFeedback("Não foi possível importar este ficheiro.");
  } finally {
    importDataFile.value = "";
  }
}

function applyImportedBackup(importedData) {
  if (!isValidBackup(importedData)) {
    throw new Error("Formato inválido.");
  }

  accounts = Array.isArray(importedData.accounts) ? importedData.accounts : [];
  recycledAccounts = Array.isArray(importedData.recycledAccounts) ? importedData.recycledAccounts : [];
  statementsByAccount = migrateStatementsStore(importedData.statementsByAccount || {});
  activityLog = Array.isArray(importedData.activityLog) ? importedData.activityLog : [];
  saveStoredInternalMovementRules(importedData.internalMovementRules);
  window.localStorage.setItem(BACKUP_PIN_STORAGE_KEY, typeof importedData.pin === "string" ? importedData.pin : "");

  saveAccounts();
  saveRecycledAccounts();
  saveStatements();
  saveActivityLog();
  addActivityEntry({
    title: "Backup importado",
    description: "Os dados da aplicação foram repostos a partir de um ficheiro de backup.",
  });

  renderAccounts();
  renderRecycleBin();
}

function createAccountCard(account) {
  const displayedBalance = getAccountDisplayBalance(account);
  const availableBalance = getAccountBankBalance(account);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const accountUrl = `./account.html?id=${account.id}&year=${currentYear}&month=${currentMonth}`;
  const symbol = account.symbol
    ? `<img class="account-symbol" src="${account.symbol}" alt="Símbolo de ${escapeHtml(account.bankName)}" />`
    : `<div class="account-symbol-placeholder">${escapeHtml(account.bankName.slice(0, 2).toUpperCase())}</div>`;

  return `
    <article class="account-card ${account.includeInTotals === false ? "account-card-excluded" : ""}" data-account-id="${account.id}" draggable="${account.archived !== true}">
      <a class="account-card-overlay" href="${accountUrl}" aria-label="Abrir conta ${escapeHtml(account.bankName)}"></a>

      <div class="account-card-topbar">
        <button class="menu-button" type="button" aria-label="Abrir menu" data-menu-toggle="${account.id}">
          ...
        </button>
      </div>

      <div class="account-menu hidden" data-menu-id="${account.id}">
        <button class="menu-item menu-item-neutral" type="button" data-edit-id="${account.id}">
          <span class="menu-item-icon" aria-hidden="true">📝</span>
          <span>Editar nome e imagem</span>
        </button>
        <button class="menu-item menu-item-neutral" type="button" data-archive-id="${account.id}">
          <span class="menu-item-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8h16v12H4zM3 4h18v4H3zM9 12h6"/></svg></span>
          <span>${account.archived ? "Reativar conta" : "Arquivar conta"}</span>
        </button>
        <button class="menu-item" type="button" data-delete-id="${account.id}">
          <span class="menu-item-icon" aria-hidden="true">🗑</span>
          <span>Apagar conta</span>
        </button>
      </div>

      <div class="account-card-header">
        <div class="account-card-title">
          <div class="account-card-link">
            ${symbol}
          </div>
          <div>
            <span class="card-label">${account.archived ? "Conta arquivada" : "Banco"}</span>
            <strong><span class="account-name-link">${escapeHtml(account.bankName)}</span></strong>
          </div>
        </div>

        <div class="balance">${formatBalance(displayedBalance)}</div>
      </div>

      <div class="account-card-footer">
        <span class="account-chip">Saldo atual</span>
        <div class="account-card-actions">
          <span>${formatBalance(availableBalance)}</span>
        </div>
      </div>
    </article>
  `;
}

function createRecycleCard(account) {
  const symbol = account.symbol
    ? `<img class="account-symbol" src="${account.symbol}" alt="Símbolo de ${escapeHtml(account.bankName)}" />`
    : `<div class="account-symbol-placeholder">${escapeHtml(account.bankName.slice(0, 2).toUpperCase())}</div>`;

  return `
    <article class="account-card">
      <div class="account-card-header">
        <div class="account-card-title">
          ${symbol}
          <div>
            <span class="card-label">Banco</span>
            <strong>${escapeHtml(account.bankName)}</strong>
          </div>
        </div>

        <div class="balance">${formatBalance(account.balance)}</div>
      </div>

      <div class="account-card-footer">
        <span class="account-chip">Na reciclagem</span>
        <div class="account-card-actions">
          <button class="secondary-button" type="button" data-restore-id="${account.id}">
            Restaurar
          </button>
          <button class="menu-item recycle-delete-button" type="button" data-purge-id="${account.id}">
            Eliminar
          </button>
        </div>
      </div>
    </article>
  `;
}

function formatBalance(value) {
  return currencyFormatter.format(value);
}

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function sumBalances(items) {
  return items.reduce((total, item) => total + getAccountBankBalance(item), 0);
}

function getAccountDisplayBalance(account) {
  const accountStatements = getAccountStatementRecord(account.id);
  const latestPeriodKey = getMostRecentPeriodKey(accountStatements);
  const latestPeriodMovements = latestPeriodKey
    ? accountStatements.periods[latestPeriodKey] || []
    : [];
  const finalBalanceMovement = latestPeriodMovements.length > 0
    ? getMonthlyFinalBalanceMovement(latestPeriodMovements)
    : getMonthlyFinalBalanceMovement(Object.values(accountStatements.periods).flat());

  if (finalBalanceMovement) {
    return Number(finalBalanceMovement.balance || 0) + getFinancialProductsTotal(account);
  }

  return Number(account.balance || 0) + getFinancialProductsTotal(account);
}

function getAccountBankBalance(account) {
  const accountStatements = getAccountStatementRecord(account.id);
  const latestPeriodKey = getMostRecentPeriodKey(accountStatements);
  const latestPeriodMovements = latestPeriodKey
    ? accountStatements.periods[latestPeriodKey] || []
    : [];
  const finalBalanceMovement = latestPeriodMovements.length > 0
    ? getMonthlyFinalBalanceMovement(latestPeriodMovements)
    : getMonthlyFinalBalanceMovement(Object.values(accountStatements.periods).flat());

  if (finalBalanceMovement) {
    return Number(finalBalanceMovement.balance || 0);
  }

  return Number(account.balance || 0);
}

function getAccountDisplayBalanceForPeriod(account, periodKey) {
  const accountStatements = getAccountStatementRecord(account.id);
  const latestPeriodKey = getLatestPeriodKeyUpTo(accountStatements, periodKey);
  const bankBalanceMovement = latestPeriodKey
    ? getMonthlyFinalBalanceMovement(accountStatements.periods[latestPeriodKey] || [])
    : null;
  const bankBalance = bankBalanceMovement
    ? Number(bankBalanceMovement.balance || 0)
    : Number(account.balance || 0);
  const financialTotal = getFinancialProductsTotalForPeriod(account, periodKey, "financial");
  const pprTotal = getFinancialProductsTotalForPeriod(account, periodKey, "ppr");

  return bankBalance + financialTotal + pprTotal;
}

function getAccountAvailableBalanceForPeriod(account, periodKey) {
  const accountStatements = getAccountStatementRecord(account.id);
  const periodMovements = accountStatements.periods[periodKey] || [];
  const finalBalanceMovement = getMonthlyFinalBalanceMovement(periodMovements);

  if (finalBalanceMovement) {
    return Number(finalBalanceMovement.balance || 0);
  }

  return Number(account.balance || 0);
}

function hasAccountReferenceForPeriod(account, periodKey) {
  const accountStatements = getAccountStatementRecord(account.id);
  const latestPeriodKey = getLatestPeriodKeyUpTo(accountStatements, periodKey);
  const hasMovements = latestPeriodKey
    ? (accountStatements.periods[latestPeriodKey] || []).length > 0
    : false;
  const hasProducts = getFinancialProductsTotalForPeriod(account, periodKey, "financial") > 0.0001
    || getFinancialProductsTotalForPeriod(account, periodKey, "ppr") > 0.0001;

  return hasMovements || hasProducts;
}

function getAccountExecutiveSnapshotForPeriod(account, periodKey) {
  const accountStatements = getAccountStatementRecord(account.id);
  const latestStatementPeriodKey = getLatestPeriodKeyUpTo(accountStatements, periodKey);
  const latestFinancialPeriodKey = getLatestFinancialPeriodKeyUpTo(account, periodKey);
  const bankPeriodKey = latestStatementPeriodKey;
  const bankMovements = bankPeriodKey ? accountStatements.periods[bankPeriodKey] || [] : [];
  const bankBalanceMovement = getMonthlyFinalBalanceMovement(bankMovements);
  const bankBalance = bankBalanceMovement
    ? Number(bankBalanceMovement.balance || 0)
    : Number(account.balance || 0);
  const financialTotal = getFinancialProductsTotalForPeriod(account, latestFinancialPeriodKey, "non-ppr");
  const pprTotal = getFinancialProductsTotalForPeriod(account, latestFinancialPeriodKey, "ppr");
  const hasReference = Boolean(bankPeriodKey || latestFinancialPeriodKey);

  return {
    bankBalance,
    financialTotal,
    pprTotal,
    total: bankBalance + financialTotal + pprTotal,
    hasReference,
  };
}

function findFinalBalanceMovement(movements) {
  if (movements.length === 0) {
    return null;
  }

  return movements.reduce((latest, movement) => {
    if (!latest) {
      return movement;
    }

    if (movement.date > latest.date) {
      return movement;
    }

    return latest;
  }, null);
}

function getMonthlyFinalBalanceMovement(movements) {
  return movements.length > 0 ? movements[0] : null;
}

function getFinancialProductsTotal(account) {
  if (account.financialProductsByPeriod && typeof account.financialProductsByPeriod === "object") {
    const targetPeriodKey = getLatestFinancialPeriodKeyUpTo(account, "9999-12");

    return (account.financialProductsByPeriod[targetPeriodKey] || []).reduce(
      (total, product) => total + Number(product.value || 0),
      0,
    );
  }

  return (account.financialProducts || []).reduce((total, product) => total + Number(product.value || 0), 0);
}

function getFinancialProductsTotalByKind(account, kind) {
  const normalizedKind = normalizeFinancialProductKind(kind);

  if (!account.financialProductsByPeriod || typeof account.financialProductsByPeriod !== "object") {
    return (account.financialProducts || [])
      .filter((product) => doesFinancialProductKindMatch(product.kind, normalizedKind))
      .reduce((total, product) => total + Number(product.value || 0), 0);
  }

  const targetPeriodKey = Object.keys(account.financialProductsByPeriod)
    .sort()
    .reverse()
    .find((periodKey) => (
      account.financialProductsByPeriod[periodKey] || []
    ).some((product) => doesFinancialProductKindMatch(product.kind, normalizedKind))) || "";

  if (!targetPeriodKey) {
    return 0;
  }

  return getFinancialProductsTotalForPeriod(account, targetPeriodKey, normalizedKind);
}

function getFinancialProductsTotalForPeriod(account, periodKey, kind = "") {
  if (!periodKey) {
    return 0;
  }

  const normalizedKind = normalizeFinancialProductKind(kind);

  if (account.financialProductsByPeriod && typeof account.financialProductsByPeriod === "object") {
    return (account.financialProductsByPeriod[periodKey] || [])
      .filter((product) => doesFinancialProductKindMatch(product.kind, normalizedKind))
      .reduce(
      (total, product) => total + Number(product.value || 0),
      0,
    );
  }

  return (account.financialProducts || [])
    .filter((product) => doesFinancialProductKindMatch(product.kind, normalizedKind))
    .reduce((total, product) => total + Number(product.value || 0), 0);
}

function getLatestFinancialPeriodKeyUpTo(account, targetPeriodKey) {
  if (!account?.financialProductsByPeriod || typeof account.financialProductsByPeriod !== "object") {
    return "";
  }

  const candidatePeriods = Object.keys(account.financialProductsByPeriod)
    .filter((periodKey) => periodKey <= targetPeriodKey)
    .sort()
    .reverse();

  return candidatePeriods.find((periodKey) => (account.financialProductsByPeriod[periodKey] || []).length > 0) || "";
}

function normalizeFinancialProductKind(kind) {
  if (kind === "") {
    return "";
  }

  const normalized = String(kind || "financial").trim().toLowerCase();

  if (["ppr", "pprs"].includes(normalized)) {
    return "ppr";
  }

  if (["fund", "funds", "fundo", "fundos", "investment-fund"].includes(normalized)) {
    return "fund";
  }

  if (["non-ppr", "nonppr", "savings-and-funds"].includes(normalized)) {
    return "non-ppr";
  }

  return "financial";
}

function doesFinancialProductKindMatch(productKind, normalizedKind) {
  if (!normalizedKind) {
    return true;
  }

  const normalizedProductKind = normalizeFinancialProductKind(productKind);

  if (normalizedKind === "non-ppr") {
    return normalizedProductKind !== "ppr";
  }

  return normalizedProductKind === normalizedKind;
}

function getLatestPeriodKeyUpTo(record, targetPeriodKey) {
  const sortedPeriods = Object.keys(record.periods)
    .filter((periodKey) => periodKey <= targetPeriodKey)
    .sort()
    .reverse();

  return sortedPeriods[0] || "";
}

function getAccountStatementRecord(accountId) {
  if (!accountId) {
    return { periods: {}, lastImportedPeriod: "" };
  }

  const record = statementsByAccount[accountId];

  if (!record) {
    return { periods: {}, lastImportedPeriod: "" };
  }

  if (record.periods) {
    return record;
  }

  const periods = record && typeof record === "object" ? record : {};

  return {
    periods,
    lastImportedPeriod: Object.keys(periods).sort().reverse()[0] || "",
  };
}

function buildAllPdfReportsData() {
  const generatedAt = new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());
  const sections = [];
  let skippedSections = 0;

  accounts.forEach((account) => {
    getReportPeriodsForAccount(account).forEach((periodKey) => {
      try {
        const section = buildPdfReportSection(account, periodKey);

        if (section) {
          sections.push(section);
        }
      } catch (error) {
        skippedSections += 1;
        console.warn("Secção ignorada ao gerar dossier PDF.", {
          accountId: account?.id,
          bankName: account?.bankName,
          periodKey,
          error,
        });
      }
    });
  });

  sections.sort((left, right) => {
    const bankOrder = String(left.bankName).localeCompare(String(right.bankName), "pt-PT");
    if (bankOrder !== 0) {
      return bankOrder;
    }

    return String(left.periodKey).localeCompare(String(right.periodKey));
  });

  return {
    generatedAt,
    sections,
    skippedSections,
  };
}

function getReportPeriodsForAccount(account) {
  const statementPeriods = Object.keys(getAccountStatementRecord(account.id).periods || {});
  const productPeriods = Object.keys(account.financialProductsByPeriod || {});
  const recurringPeriods = Object.keys(account.movementRulesByPeriod || {});

  return Array.from(new Set([
    ...statementPeriods,
    ...productPeriods,
    ...recurringPeriods,
  ]))
    .filter((periodKey) => isValidPeriodKey(periodKey))
    .sort();
}

function buildPdfReportSection(account, periodKey) {
  const record = getAccountStatementRecord(account.id);
  const movements = Array.isArray(record.periods?.[periodKey]) ? record.periods[periodKey] : [];
  const accountingMovements = getAccountingMovements(movements);
  const availableBalance = getAccountAvailableBalanceForPeriod(account, periodKey);
  const totalBalance = getAccountDisplayBalanceForPeriod(account, periodKey);
  const regularProducts = getFinancialProductsForAccountPeriod(account, periodKey, "financial");
  const fundProducts = getFinancialProductsForAccountPeriod(account, periodKey, "fund");
  const pprProducts = getFinancialProductsForAccountPeriod(account, periodKey, "ppr");
  const regularProductsTotal = regularProducts.reduce((sum, product) => sum + Number(product.value || 0), 0);
  const fundProductsTotal = fundProducts.reduce((sum, product) => sum + Number(product.value || 0), 0);
  const pprProductsTotal = pprProducts.reduce((sum, product) => sum + Number(product.value || 0), 0);
  const credits = accountingMovements
    .filter((movement) => Number(movement.amount || 0) > 0)
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const debits = accountingMovements
    .filter((movement) => Number(movement.amount || 0) < 0)
    .reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0);
  const excludedCredits = movements
    .filter((movement) => isMovementExcludedFromAccounting(movement) && Number(movement.amount || 0) > 0)
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const excludedDebits = movements
    .filter((movement) => isMovementExcludedFromAccounting(movement) && Number(movement.amount || 0) < 0)
    .reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0);
  const recurringRows = getRecurringRowsForAccountPeriod(account, periodKey);

  if (
    movements.length === 0
    && regularProducts.length === 0
    && fundProducts.length === 0
    && pprProducts.length === 0
    && recurringRows.length === 0
  ) {
    return null;
  }

  return {
    bankName: account.bankName || "Conta bancária",
    symbol: account.symbol || "",
    periodKey,
    periodLabel: formatPeriodLabel(periodKey),
    totalBalance,
    availableBalance,
    credits,
    debits,
    excludedCredits,
    excludedDebits,
    regularProducts,
    fundProducts,
    pprProducts,
    regularProductsTotal,
    fundProductsTotal,
    pprProductsTotal,
    recurringRows,
    movements,
  };
}

function getFinancialProductsForAccountPeriod(account, periodKey, kind = "") {
  const normalizedKind = normalizeFinancialProductKind(kind);
  const products = account?.financialProductsByPeriod?.[periodKey];

  return (Array.isArray(products) ? products : [])
    .filter((product) => doesFinancialProductKindMatch(product.kind, normalizedKind));
}

function getRecurringRowsForAccountPeriod(account, periodKey) {
  const rawEntries = account?.movementRulesByPeriod?.[periodKey];
  const entries = Array.isArray(rawEntries) ? rawEntries : [];

  return entries.map((entry) => {
    const matchedMovements = getTrackedMovementsForAccountPeriod(account, entry, periodKey)
      .filter((movement) => Number(movement.amount || 0) < 0);

    return {
      label: entry?.label || "Despesa recorrente",
      keyword: entry?.matchText || "",
      count: matchedMovements.length,
      total: matchedMovements.reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0),
    };
  });
}

function getTrackedMovementsForAccountPeriod(account, entry, periodKey) {
  const normalizedMatch = normalizeAccountingComparableText(entry?.matchText || "");
  const accountingMovements = getAccountingMovements(getAccountStatementRecord(account.id).periods?.[periodKey] || []);

  if (!normalizedMatch) {
    return [];
  }

  const exactMatches = accountingMovements
    .filter((movement) => normalizeAccountingComparableText(movement.description || "").includes(normalizedMatch));

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  const normalizedRecurringMatch = normalizeRecurringComparableText(entry?.matchText || "");

  if (!normalizedRecurringMatch) {
    return exactMatches;
  }

  return accountingMovements
    .filter((movement) => normalizeRecurringComparableText(movement.description || "").includes(normalizedRecurringMatch));
}

function normalizeRecurringComparableText(value) {
  return normalizeAccountingComparableText(value)
    .replace(/\bn[ou]m?e?r?o?\b/g, " ")
    .replace(/\bno\b/g, " ")
    .replace(/\bnr\b/g, " ")
    .replace(/\bprocesso\b/g, " ")
    .replace(/\d+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createAllPdfReportsMarkup(dossier) {
  const sectionsMarkup = dossier.sections.map((section, index) => createPdfReportSectionMarkup(section, index === dossier.sections.length - 1)).join("");

  return `
    <!doctype html>
    <html lang="pt-PT">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Relatórios PDF · Gestão Financeira NL</title>
        <style>
          :root {
            color-scheme: light;
            --ink: #102033;
            --muted: #5d6f86;
            --line: #d8e0eb;
            --line-strong: #c2cede;
            --blue: #1e4d8f;
            --blue-soft: #eef4fc;
            --green: #1f8b4d;
            --red: #b84646;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 24px;
            font-family: "Avenir Next", "Segoe UI", Arial, sans-serif;
            color: var(--ink);
            background: white;
          }
          .pdf-dossier-shell {
            max-width: 1120px;
            margin: 0 auto;
          }
          .pdf-dossier-cover {
            padding: 20px 0 30px;
            border-bottom: 2px solid var(--line-strong);
            margin-bottom: 28px;
          }
          .pdf-dossier-kicker {
            margin: 0 0 8px;
            color: var(--blue);
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.12em;
          }
          .pdf-dossier-cover h1 {
            margin: 0;
            font-size: 2.1rem;
          }
          .pdf-dossier-cover p {
            margin: 10px 0 0;
            color: var(--muted);
          }
          .pdf-report-page {
            page-break-after: always;
            break-after: page;
            padding-bottom: 20px;
          }
          .pdf-report-page.is-last {
            page-break-after: auto;
            break-after: auto;
          }
          .pdf-report-header {
            display: flex;
            justify-content: space-between;
            gap: 24px;
            align-items: flex-start;
            padding-bottom: 20px;
            border-bottom: 2px solid var(--line-strong);
          }
          .pdf-report-brand {
            display: flex;
            gap: 18px;
            align-items: center;
          }
          .pdf-report-symbol {
            width: 82px;
            height: 82px;
            border-radius: 24px;
            object-fit: cover;
            border: 1px solid #dbe5f2;
          }
          .pdf-report-symbol-fallback {
            display: grid;
            place-items: center;
            font-weight: 800;
            letter-spacing: 0.08em;
            background: var(--blue-soft);
            color: var(--blue);
          }
          .pdf-report-header h2 {
            margin: 0;
            font-size: 1.95rem;
            line-height: 1.05;
          }
          .pdf-report-kicker {
            margin: 0 0 8px;
            color: var(--blue);
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.12em;
          }
          .pdf-report-subtitle,
          .pdf-report-meta {
            margin: 6px 0 0;
            color: var(--muted);
          }
          .pdf-report-summary {
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            gap: 14px;
            margin-top: 22px;
          }
          .pdf-report-card {
            padding: 16px;
            border: 1px solid var(--line);
            border-radius: 18px;
            background: #fbfdff;
          }
          .pdf-report-card-label {
            display: block;
            color: var(--muted);
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .pdf-report-card strong {
            display: block;
            margin-top: 10px;
            font-size: 1.35rem;
            line-height: 1.15;
            font-family: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
            font-variant-numeric: tabular-nums;
          }
          .pdf-report-card-note {
            margin-top: 8px;
            color: var(--muted);
            font-size: 0.84rem;
          }
          .pdf-report-sections {
            display: grid;
            gap: 22px;
            margin-top: 22px;
          }
          .pdf-report-grid-two {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 22px;
          }
          .pdf-report-grid-three {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
          }
          .pdf-report-section h3 {
            margin: 0 0 12px;
            font-size: 1.1rem;
          }
          .pdf-report-table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid var(--line);
            border-radius: 18px;
            overflow: hidden;
          }
          .pdf-report-table th,
          .pdf-report-table td {
            padding: 12px 14px;
            border-bottom: 1px solid var(--line);
            vertical-align: top;
            text-align: left;
            font-size: 0.95rem;
          }
          .pdf-report-table thead th {
            background: var(--blue-soft);
            color: var(--blue);
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .pdf-report-table tbody tr:last-child td {
            border-bottom: none;
          }
          .pdf-report-number {
            text-align: right !important;
            white-space: nowrap;
            font-family: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
            font-variant-numeric: tabular-nums;
          }
          .pdf-report-empty-cell {
            color: var(--muted);
            text-align: center !important;
          }
          .pdf-report-movement-name {
            font-weight: 700;
            line-height: 1.35;
          }
          .pdf-report-movement-note {
            margin-top: 4px;
            color: var(--muted);
            font-size: 0.8rem;
          }
          .is-positive { color: var(--green); }
          .is-negative { color: var(--red); }
          @media print {
            body { padding: 14px; }
            .pdf-dossier-shell { max-width: none; }
          }
        </style>
      </head>
      <body>
        <main class="pdf-dossier-shell">
          <section class="pdf-dossier-cover">
            <p class="pdf-dossier-kicker">Gestão Financeira NL</p>
            <h1>Relatórios mensais completos</h1>
            <p>${dossier.sections.length} ${dossier.sections.length === 1 ? "relatório preparado" : "relatórios preparados"} em ${escapeHtml(dossier.generatedAt)}.</p>
          </section>
          ${sectionsMarkup}
        </main>
        <script>
          window.addEventListener("load", () => {
            setTimeout(() => window.print(), 250);
          });
        </script>
      </body>
    </html>
  `;
}

function createPdfReportSectionMarkup(section, isLast = false) {
  const symbolMarkup = section.symbol
    ? `<img class="pdf-report-symbol" src="${escapeHtmlAttribute(section.symbol)}" alt="Símbolo de ${escapeHtmlAttribute(section.bankName)}" />`
    : `<div class="pdf-report-symbol pdf-report-symbol-fallback">${escapeHtml(String(section.bankName || "").slice(0, 2).toUpperCase())}</div>`;
  const regularProductsMarkup = section.regularProducts.length > 0
    ? section.regularProducts.map((product) => `
        <tr>
          <td>${escapeHtml(product.name || "Produto")}</td>
          <td class="pdf-report-number">${escapeHtml(formatCurrency(product.value || 0))}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="2" class="pdf-report-empty-cell">Sem poupanças neste mês.</td></tr>`;
  const fundProductsMarkup = section.fundProducts.length > 0
    ? section.fundProducts.map((product) => `
        <tr>
          <td>${escapeHtml(product.name || "Fundo")}</td>
          <td class="pdf-report-number">${escapeHtml(formatCurrency(product.value || 0))}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="2" class="pdf-report-empty-cell">Sem fundos de investimento neste mês.</td></tr>`;
  const pprProductsMarkup = section.pprProducts.length > 0
    ? section.pprProducts.map((product) => `
        <tr>
          <td>${escapeHtml(product.name || "PPR")}</td>
          <td class="pdf-report-number">${escapeHtml(formatCurrency(product.value || 0))}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="2" class="pdf-report-empty-cell">Sem PPRs neste mês.</td></tr>`;
  const recurringMarkup = section.recurringRows.length > 0
    ? `
      <section class="pdf-report-section">
        <h3>Despesas recorrentes</h3>
        <table class="pdf-report-table">
          <thead>
            <tr>
              <th>Despesa</th>
              <th>Palavra-chave</th>
              <th>Movimentos</th>
              <th>Total do mês</th>
            </tr>
          </thead>
          <tbody>
            ${section.recurringRows.map((entry) => `
              <tr>
                <td>${escapeHtml(entry.label)}</td>
                <td>${escapeHtml(entry.keyword)}</td>
                <td>${entry.count}</td>
                <td class="pdf-report-number">${escapeHtml(formatCurrency(entry.total))}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `
    : "";
  const movementsMarkup = section.movements.length > 0
    ? section.movements.map((movement) => `
      <tr>
        <td>${escapeHtml(formatDate(movement.date))}</td>
        <td>
          <div class="pdf-report-movement-name">${escapeHtml(movement.description || "Movimento")}</div>
          ${movement.excludedFromAccounting ? '<div class="pdf-report-movement-note">Movimento interno · excluído da contabilidade</div>' : ""}
        </td>
        <td class="pdf-report-number ${Number(movement.amount || 0) >= 0 ? "is-positive" : "is-negative"}">${escapeHtml(formatCurrency(Number(movement.amount || 0)))}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(Number(movement.balance || 0)))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" class="pdf-report-empty-cell">Ainda não existe extrato importado para este mês.</td></tr>`;

  return `
    <section class="pdf-report-page ${isLast ? "is-last" : ""}">
      <header class="pdf-report-header">
        <div class="pdf-report-brand">
          ${symbolMarkup}
          <div>
            <p class="pdf-report-kicker">Relatório mensal</p>
            <h2>${escapeHtml(section.bankName)}</h2>
            <p class="pdf-report-subtitle">${escapeHtml(section.periodLabel)}</p>
          </div>
        </div>
      </header>

      <section class="pdf-report-summary">
        <article class="pdf-report-card">
          <span class="pdf-report-card-label">Saldo total</span>
          <strong>${escapeHtml(formatCurrency(section.totalBalance))}</strong>
          <div class="pdf-report-card-note">Inclui poupanças, fundos e PPR</div>
        </article>
        <article class="pdf-report-card">
          <span class="pdf-report-card-label">Saldo disponível</span>
          <strong>${escapeHtml(formatCurrency(section.availableBalance))}</strong>
          <div class="pdf-report-card-note">Sem carteira associada</div>
        </article>
        <article class="pdf-report-card">
          <span class="pdf-report-card-label">Créditos</span>
          <strong>${escapeHtml(formatCurrency(section.credits))}</strong>
          <div class="pdf-report-card-note">Excluídos: ${escapeHtml(formatCurrency(section.excludedCredits))}</div>
        </article>
        <article class="pdf-report-card">
          <span class="pdf-report-card-label">Débitos</span>
          <strong>${escapeHtml(formatCurrency(section.debits))}</strong>
          <div class="pdf-report-card-note">Excluídos: ${escapeHtml(formatCurrency(section.excludedDebits))}</div>
        </article>
        <article class="pdf-report-card">
          <span class="pdf-report-card-label">Poupanças</span>
          <strong>${escapeHtml(formatCurrency(section.regularProductsTotal))}</strong>
          <div class="pdf-report-card-note">${section.regularProducts.length} ${section.regularProducts.length === 1 ? "linha" : "linhas"}</div>
        </article>
        <article class="pdf-report-card">
          <span class="pdf-report-card-label">Fundos</span>
          <strong>${escapeHtml(formatCurrency(section.fundProductsTotal))}</strong>
          <div class="pdf-report-card-note">${section.fundProducts.length} ${section.fundProducts.length === 1 ? "linha" : "linhas"}</div>
        </article>
        <article class="pdf-report-card">
          <span class="pdf-report-card-label">PPR</span>
          <strong>${escapeHtml(formatCurrency(section.pprProductsTotal))}</strong>
          <div class="pdf-report-card-note">${section.pprProducts.length} ${section.pprProducts.length === 1 ? "linha" : "linhas"}</div>
        </article>
      </section>

      <div class="pdf-report-sections">
        <div class="pdf-report-grid-three">
          <section class="pdf-report-section">
            <h3>Poupanças</h3>
            <table class="pdf-report-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>${regularProductsMarkup}</tbody>
            </table>
          </section>

          <section class="pdf-report-section">
            <h3>Fundos de investimento</h3>
            <table class="pdf-report-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>${fundProductsMarkup}</tbody>
            </table>
          </section>

          <section class="pdf-report-section">
            <h3>PPR</h3>
            <table class="pdf-report-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>${pprProductsMarkup}</tbody>
            </table>
          </section>
        </div>

        ${recurringMarkup}

        <section class="pdf-report-section">
          <h3>Movimentos do extrato</h3>
          <table class="pdf-report-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>${movementsMarkup}</tbody>
          </table>
        </section>
      </div>
    </section>
  `;
}

function formatDate(date) {
  const safeDate = createSafeDate(date);

  if (!safeDate) {
    return String(date || "Sem data");
  }

  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(safeDate);
}

function formatPeriodLabel(periodKey) {
  if (!isValidPeriodKey(periodKey)) {
    return String(periodKey || "Período sem data");
  }

  const [year, month] = String(periodKey || "").split("-");
  const safeDate = createSafeDate(`${year}-${month}-01`);

  if (!safeDate) {
    return String(periodKey || "Período sem data");
  }

  return new Intl.DateTimeFormat("pt-PT", {
    month: "long",
    year: "numeric",
  }).format(safeDate);
}

function getAccountingMovements(movements) {
  return (Array.isArray(movements) ? movements : []).filter((movement) => !isMovementExcludedFromAccounting(movement));
}

function isMovementExcludedFromAccounting(movement) {
  if (!movement || typeof movement !== "object") {
    return false;
  }

  if (movement.internalClassificationSource === "manual") {
    return true;
  }

  return Boolean(getInternalMovementMatch(movement.description || ""));
}

function getInternalMovementMatch(description) {
  const normalizedDescription = normalizeAccountingComparableText(description);

  if (!normalizedDescription) {
    return "";
  }

  return getInternalMovementRules()
    .map((rule) => rule.term.trim())
    .find((term) => normalizedDescription.includes(normalizeAccountingComparableText(term))) || "";
}

function getInternalMovementRules() {
  const raw = window.localStorage.getItem("gestao-financeira-nl-internal-keywords");

  try {
    const parsed = raw ? JSON.parse(raw) : [
      { term: "constit" },
      { term: "reforco" },
      { term: "subscricao ppr" },
      { term: "trf p/o Joana Monteiro" },
    ];

    return Array.isArray(parsed)
      ? parsed.filter((rule) => rule && typeof rule.term === "string" && rule.term.trim())
      : [];
  } catch {
    return [];
  }
}

function normalizeAccountingComparableText(value) {
  return String(value || "")
    .toLocaleLowerCase("pt-PT")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,;:!?()[\]{}"'/\\_*+=~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getMostRecentPeriodKey(record) {
  return Object.keys(record.periods).sort().reverse()[0] || "";
}

function migrateStatementsStore(store) {
  return Object.fromEntries(
    Object.entries(store).map(([id, value]) => {
      if (Array.isArray(value)) {
        return [id, { periods: {}, lastImportedPeriod: "" }];
      }

      if (value && typeof value === "object" && "periods" in value) {
        return [id, value];
      }

      const periods = value && typeof value === "object" ? value : {};

      return [
        id,
        {
          periods,
          lastImportedPeriod: Object.keys(periods).sort().reverse()[0] || "",
        },
      ];
    }),
  );
}

function isValidBackup(data) {
  return Boolean(
    data
    && typeof data === "object"
    && Array.isArray(data.accounts)
    && Array.isArray(data.recycledAccounts)
    && data.statementsByAccount
    && typeof data.statementsByAccount === "object",
  );
}

function loadStoredInternalMovementRules() {
  try {
    return JSON.parse(window.localStorage.getItem(INTERNAL_MOVEMENTS_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveStoredInternalMovementRules(rules) {
  const nextRules = Array.isArray(rules) ? rules : [];
  window.localStorage.setItem(INTERNAL_MOVEMENTS_STORAGE_KEY, JSON.stringify(nextRules));
}

async function createAccountFromForm(formData, accountId) {
  const symbolFile = formData.get("symbol");
  const currentAccount = accounts.find((item) => item.id === accountId);
  const nextSymbol = symbolFile instanceof File && symbolFile.size > 0
    ? await fileToDataUrl(symbolFile)
    : currentAccount?.symbol || "";
  const nextBankName = formData.get("bankName").toString().trim();
  const nextShortName = formData.get("shortName").toString().trim();

  return {
    ...(currentAccount || {}),
    id: accountId || crypto.randomUUID(),
    bankName: nextBankName,
    shortName: nextShortName,
    balance: currentAccount?.balance || 0,
    symbol: nextSymbol,
    includeInTotals: currentAccount?.includeInTotals ?? true,
  };
}

function deleteAccount(accountId) {
  const account = accounts.find((item) => item.id === accountId);

  if (!account) {
    return;
  }

  const originalIndex = accounts.findIndex((item) => item.id === accountId);
  const action = {
    type: "delete-account",
    account,
    originalIndex,
  };

  applyMainHistoryAction(action, "redo");
  pushHistoryAction(action);
  showUndoToast(`Conta ${account.bankName} enviada para a reciclagem.`, executeUndo);
}

function persistAccountOrder() {
  const previousOrder = accounts.map((account) => account.id).join("|");
  const orderedIds = Array.from(accountsList.querySelectorAll(".account-card"))
    .map((card) => card.dataset.accountId);

  const orderedActiveAccounts = orderedIds
    .map((id) => accounts.find((account) => account.id === id))
    .filter(Boolean);
  let activeIndex = 0;
  accounts = accounts.map((account) => account.archived === true
    ? account
    : orderedActiveAccounts[activeIndex++]);

  if (accounts.map((account) => account.id).join("|") !== previousOrder) {
    addActivityEntry({
      title: "Ordem das contas atualizada",
      description: "A posição dos banners das contas foi alterada.",
    });
  }

  saveAccounts();
  renderAccounts();
}

function restoreAccount(accountId) {
  const account = recycledAccounts.find((item) => item.id === accountId);

  if (!account) {
    return;
  }

  recycledAccounts = recycledAccounts.filter((item) => item.id !== accountId);
  accounts = [account, ...accounts];
  addActivityEntry({
    title: "Conta restaurada",
    description: `${account.bankName} voltou da reciclagem para a lista principal.`,
  });
  saveAccounts();
  saveRecycledAccounts();
  renderAccounts();
  renderRecycleBin();
  recyclePanel.classList.add("hidden");
}

function permanentlyDeleteAccount(accountId) {
  const account = recycledAccounts.find((item) => item.id === accountId);

  if (!account) {
    return;
  }

  recycledAccounts = recycledAccounts.filter((item) => item.id !== accountId);
  delete statementsByAccount[accountId];
  addActivityEntry({
    title: "Conta eliminada em definitivo",
    description: `${account.bankName} e os respetivos extratos foram apagados em definitivo.`,
  });
  saveRecycledAccounts();
  saveStatements();
  renderRecycleBin();
  renderAccounts();
}

function openModal() {
  accountsPanelMenu.classList.add("hidden");
  accountsPanelToggle.setAttribute("aria-expanded", "false");
  editingAccountId = null;
  modalTitle.textContent = "Adicionar conta bancária";
  submitButtonLabel.textContent = "Guardar conta";
  form.reset();
  form.accountId.value = "";
  form.shortName.value = "";
  modal.classList.remove("hidden");
}

function closeModal() {
  editingAccountId = null;
  form.reset();
  form.accountId.value = "";
  modalTitle.textContent = "Adicionar conta bancária";
  submitButtonLabel.textContent = "Guardar conta";
  modal.classList.add("hidden");
}

function toggleAccountMenu(accountId) {
  const menu = document.querySelector(`[data-menu-id="${accountId}"]`);
  const isHidden = menu.classList.contains("hidden");

  closeAllMenus();

  if (isHidden) {
    menu.classList.remove("hidden");
  }
}

function closeAllMenus() {
  accountsPanelMenu.classList.add("hidden");
  accountsPanelToggle.setAttribute("aria-expanded", "false");
  document.querySelectorAll("[data-menu-id]").forEach((menu) => {
    menu.classList.add("hidden");
  });
}

function startEditAccount(accountId) {
  const account = accounts.find((item) => item.id === accountId);

  if (!account) {
    return;
  }

  editingAccountId = accountId;
  form.accountId.value = account.id;
  form.bankName.value = account.bankName;
  form.shortName.value = account.shortName || "";
  modalTitle.textContent = "Editar conta bancária";
  submitButtonLabel.textContent = "Guardar alterações";
  closeAllMenus();
  modal.classList.remove("hidden");
}

function fileToDataUrl(file) {
  if (!(file instanceof File) || file.size === 0) {
    return Promise.resolve("");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(new Error("Falha a ler a imagem.")));
    reader.readAsDataURL(file);
  });
}

function getDragAfterElement(container, y) {
  const draggableCards = [...container.querySelectorAll(".account-card:not(.is-dragging)")];

  return draggableCards.reduce((closest, card) => {
    const box = card.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset, element: card };
    }

    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeHtmlAttribute(value) {
  return escapeHtml(String(value || ""));
}

function createSafeDate(value) {
  if (!value) {
    return null;
  }

  const nextDate = new Date(value);
  return Number.isNaN(nextDate.getTime()) ? null : nextDate;
}

function isValidPeriodKey(periodKey) {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(String(periodKey || "").trim());
}

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
      ".page-shell, .history-toolbar, .data-transfer-dock, .recycle-dock, .turma-scroll-top-button, .modal, .app-lock-screen, .undo-toast, button, a, input, select, textarea, label",
    )
  ) {
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
