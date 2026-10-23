const ACCOUNTS_STORAGE_KEY = "gestao-financeira-nl-accounts";
const RECYCLE_STORAGE_KEY = "gestao-financeira-nl-accounts-recycle";
const STATEMENTS_STORAGE_KEY = "gestao-financeira-nl-statements";
const ACTIVITY_STORAGE_KEY = "gestao-financeira-nl-activity-log";
const EXPORT_DIRECTORY_DB = "gestao-financeira-nl-file-handles";
const EXPORT_DIRECTORY_STORE = "handles";
const EXPORT_DIRECTORY_KEY = "export-directory";
const EXPORT_REMINDER_STORAGE_KEY = "gestao-financeira-nl-export-reminder";
const EXPORT_REMINDER_DELAY = 5 * 60 * 1000;
const INTERNAL_MOVEMENTS_STORAGE_KEY = "gestao-financeira-nl-internal-keywords";
const BACKUP_PIN_STORAGE_KEY = "gestao-financeira-nl-pin";
const INTERNAL_MOVEMENT_DEFAULT_TERMS = [
  "constit",
  "reforco",
  "subscricao ppr",
  "trf p/o Joana Monteiro",
];

const detailSymbol = document.querySelector("#detail-symbol");
const detailBankName = document.querySelector("#detail-bank-name");
const detailBalance = document.querySelector("#detail-balance");
const detailBalanceVariation = document.querySelector("#detail-balance-variation");
const detailBalanceVariationHint = document.querySelector("#detail-balance-variation-hint");
const relatedAccountsList = document.querySelector("#related-accounts-list");
const yearSelect = document.querySelector("#year-select");
const monthChips = Array.from(document.querySelectorAll(".month-chip"));
const statementMenuToggle = document.querySelector("#statement-menu-toggle");
const statementMenu = document.querySelector("#statement-menu");
const pasteStatementFromClipboardButton = document.querySelector("#paste-statement-from-clipboard");
const openStatementTextButton = document.querySelector("#open-statement-text");
const openMovementSearchButton = document.querySelector("#open-movement-search");
const openStatementHelpButton = document.querySelector("#open-statement-help");
const openMovementAnalysisButton = document.querySelector("#open-movement-analysis");
const openMonthlyPdfReportButton = document.querySelector("#open-monthly-pdf-report");
const openTrackingPanelModalButton = document.querySelector("#open-tracking-panel-modal");
const deleteStatementDataButton = document.querySelector("#delete-statement-data");
const statementTextModal = document.querySelector("#statement-text-modal");
const closeStatementTextModal = document.querySelector("#close-statement-text-modal");
const statementText = document.querySelector("#statement-text");
const importTextButton = document.querySelector("#import-text-button");
const saveStatementTextButton = document.querySelector("#save-statement-text-button");
const statementFeedback = document.querySelector("#statement-feedback");
const statementToast = document.querySelector("#statement-toast");
const totalExpenses = document.querySelector("#total-expenses");
const totalCredits = document.querySelector("#total-credits");
const statementFinalBalance = document.querySelector("#statement-final-balance");
const movementsList = document.querySelector("#movements-list");
const movementsEmptyState = document.querySelector("#movements-empty-state");
const movementsToggle = document.querySelector("#movements-toggle");
const movementsMoreIndicator = document.querySelector("#movements-more-indicator");
const movementSearchModal = document.querySelector("#movement-search-modal");
const closeMovementSearchModal = document.querySelector("#close-movement-search-modal");
const movementSearchQuery = document.querySelector("#movement-search-query");
const movementSearchMode = document.querySelector("#movement-search-mode");
const movementSearchStartDate = document.querySelector("#movement-search-start-date");
const movementSearchEndDate = document.querySelector("#movement-search-end-date");
const movementSearchDateFields = Array.from(document.querySelectorAll(".movement-search-date-field"));
const movementSearchCount = document.querySelector("#movement-search-count");
const movementSearchCredits = document.querySelector("#movement-search-credits");
const movementSearchDebits = document.querySelector("#movement-search-debits");
const movementSearchNet = document.querySelector("#movement-search-net");
const movementSearchResults = document.querySelector("#movement-search-results");
const movementSearchEmpty = document.querySelector("#movement-search-empty");
const statementHelpModal = document.querySelector("#statement-help-modal");
const closeStatementHelpModal = document.querySelector("#close-statement-help-modal");
const trackingList = document.querySelector("#tracking-list");
const trackingEmptyState = document.querySelector("#tracking-empty-state");
const trackingFeedback = document.querySelector("#tracking-feedback");
const trackingMoreIndicator = document.querySelector("#tracking-more-indicator");
const trackingForecast = document.querySelector("#tracking-forecast");
const trackingForecastAvailable = document.querySelector("#tracking-forecast-available");
const trackingForecastAvailableMeta = document.querySelector("#tracking-forecast-available-meta");
const trackingForecastPending = document.querySelector("#tracking-forecast-pending");
const trackingForecastProjected = document.querySelector("#tracking-forecast-projected");
const trackingForecastMeta = document.querySelector("#tracking-forecast-meta");
const trackingForecastList = document.querySelector("#tracking-forecast-list");
const trackingForecastEmpty = document.querySelector("#tracking-forecast-empty");
const trackingCopyPreviousButton = document.querySelector("#tracking-copy-previous");
const trackingMenuToggle = document.querySelector("#tracking-menu-toggle");
const trackingMenu = document.querySelector("#tracking-menu");
const openRecurringDetectionModalButton = document.querySelector("#open-recurring-detection-modal");
const deleteSelectedTrackingEntryButton = document.querySelector("#delete-selected-tracking-entry");
const accountTrendYearLabel = document.querySelector("#account-trend-year-label");
const accountTrendChart = document.querySelector("#account-trend-chart");
const financialProductToggle = document.querySelector("#financial-product-toggle");
const financialProductMenu = document.querySelector("#financial-product-menu");
const openFinancialProductModalButton = document.querySelector("#open-financial-product-modal");
const copyFinancialProductsButton = document.querySelector("#copy-financial-products");
const financialProductModal = document.querySelector("#financial-product-modal");
const closeFinancialProductModal = document.querySelector("#close-financial-product-modal");
const financialProductForm = document.querySelector("#financial-product-form");
const financialProductIdField = document.querySelector("#financial-product-id");
const financialProductKindField = document.querySelector("#financial-product-kind");
const financialProductNameField = document.querySelector("#financial-product-name");
const financialProductValueField = document.querySelector("#financial-product-value");
const financialProductSubmitLabel = document.querySelector("#financial-product-submit-label");
const financialProductsList = document.querySelector("#financial-products-list");
const financialProductsRegularList = document.querySelector("#financial-products-regular-list");
const financialProductsFundsList = document.querySelector("#financial-products-funds-list");
const financialProductsPprList = document.querySelector("#financial-products-ppr-list");
const financialProductsEmptyState = document.querySelector("#financial-products-empty-state");
const financialProductsTotal = document.querySelector("#financial-products-total");
const financialProductsFeedback = document.querySelector("#financial-products-feedback");
const financialProductChartModal = document.querySelector("#financial-product-chart-modal");
const closeFinancialProductChartModal = document.querySelector("#close-financial-product-chart-modal");
const financialProductChartKicker = document.querySelector("#financial-product-chart-kicker");
const financialProductChartTitle = document.querySelector("#financial-product-chart-title");
const financialProductChartSubtitle = document.querySelector("#financial-product-chart-subtitle");
const financialProductChartCurrentValue = document.querySelector("#financial-product-chart-current-value");
const financialProductChartDeltaValue = document.querySelector("#financial-product-chart-delta-value");
const financialProductChartCount = document.querySelector("#financial-product-chart-count");
const financialProductChartSurface = document.querySelector("#financial-product-chart-surface");
const undoButton = document.querySelector("#undo-button");
const redoButton = document.querySelector("#redo-button");
const undoToast = document.querySelector("#undo-toast");
const undoToastMessage = document.querySelector("#undo-toast-message");
const undoToastButton = document.querySelector("#undo-toast-button");
const movementRulesModal = document.querySelector("#movement-rules-modal");
const closeMovementRulesModal = document.querySelector("#close-movement-rules-modal");
const movementRuleForm = document.querySelector("#movement-rule-form");
const movementRuleIdField = document.querySelector("#movement-rule-id");
const movementRuleMatchField = document.querySelector("#movement-rule-match");
const movementRuleLabelField = document.querySelector("#movement-rule-label");
const movementRuleAmountMatchField = document.querySelector("#movement-rule-amount-match");
const movementRuleExcludeFromPendingField = document.querySelector("#movement-rule-exclude-from-pending");
const movementRuleDueDayWrap = document.querySelector("#movement-rule-due-day-wrap");
const movementRuleDueDayField = document.querySelector("#movement-rule-due-day");
const movementRuleSubmit = document.querySelector("#movement-rule-submit");
const movementRulesList = document.querySelector("#movement-rules-list");
const movementRulesEmpty = document.querySelector("#movement-rules-empty");
const movementRuleSuggestions = document.querySelector("#movement-rule-suggestions");
const movementRuleSuggestionsEmpty = document.querySelector("#movement-rule-suggestions-empty");
const movementRulesFeedback = document.querySelector("#movement-rules-feedback");
const movementRuleCopyPreviousButton = document.querySelector("#movement-rule-copy-previous");
const movementRulesDropzone = document.querySelector("#movement-rules-dropzone");
const recurringDetectionModal = document.querySelector("#recurring-detection-modal");
const closeRecurringDetectionModal = document.querySelector("#close-recurring-detection-modal");
const recurringDetectionWindow = document.querySelector("#recurring-detection-window");
const recurringDetectionCount = document.querySelector("#recurring-detection-count");
const recurringDetectionRange = document.querySelector("#recurring-detection-range");
const recurringDetectionTop = document.querySelector("#recurring-detection-top");
const recurringDetectionList = document.querySelector("#recurring-detection-list");
const recurringDetectionEmpty = document.querySelector("#recurring-detection-empty");
const recurringDetectionFeedback = document.querySelector("#recurring-detection-feedback");
const exportDataButton = document.querySelector("#export-data-button");
const importDataButton = document.querySelector("#import-data-button");
const importDataFile = document.querySelector("#import-data-file");
const dataTransferFeedback = document.querySelector("#data-transfer-feedback");
const annualReportButton = document.querySelector("#annual-report-button");
const annualReportModal = document.querySelector("#annual-report-modal");
const printAnnualReportButton = document.querySelector("#print-annual-report-button");
const closeAnnualReportModal = document.querySelector("#close-annual-report-modal");
const annualReportSubtitle = document.querySelector("#annual-report-subtitle");
const annualReportCredits = document.querySelector("#annual-report-credits");
const annualReportExpenses = document.querySelector("#annual-report-expenses");
const annualReportNet = document.querySelector("#annual-report-net");
const annualReportRecurring = document.querySelector("#annual-report-recurring");
const annualReportTopRecurring = document.querySelector("#annual-report-top-recurring");
const annualReportRecurringShare = document.querySelector("#annual-report-recurring-share");
const annualReportRecurringCoverage = document.querySelector("#annual-report-recurring-coverage");
const annualReportMonths = document.querySelector("#annual-report-months");
const annualReportMonthsEmpty = document.querySelector("#annual-report-months-empty");
const annualReportRecurringList = document.querySelector("#annual-report-recurring-list");
const annualReportRecurringEmpty = document.querySelector("#annual-report-recurring-empty");
const movementAnalysisModal = document.querySelector("#movement-analysis-modal");
const closeMovementAnalysisModal = document.querySelector("#close-movement-analysis-modal");
const movementAnalysisSubtitle = document.querySelector("#movement-analysis-subtitle");
const movementAnalysisCreditsTotal = document.querySelector("#movement-analysis-credits-total");
const movementAnalysisDebitsTotal = document.querySelector("#movement-analysis-debits-total");
const movementAnalysisCreditsExcluded = document.querySelector("#movement-analysis-credits-excluded");
const movementAnalysisDebitsExcluded = document.querySelector("#movement-analysis-debits-excluded");
const movementAnalysisCreditsAccounting = document.querySelector("#movement-analysis-credits-accounting");
const movementAnalysisDebitsAccounting = document.querySelector("#movement-analysis-debits-accounting");
const movementAnalysisCreditsCount = document.querySelector("#movement-analysis-credits-count");
const movementAnalysisDebitsCount = document.querySelector("#movement-analysis-debits-count");
const movementAnalysisCreditsList = document.querySelector("#movement-analysis-credits-list");
const movementAnalysisDebitsList = document.querySelector("#movement-analysis-debits-list");

const currencyFormatter = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

function addActivityEntry(entry) {
  const currentLog = loadJson(ACTIVITY_STORAGE_KEY);
  const activityLog = Array.isArray(currentLog) ? currentLog : [];
  const nextLog = [
    {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...entry,
    },
    ...activityLog,
  ].slice(0, 120);

  saveJson(ACTIVITY_STORAGE_KEY, nextLog);
}

const urlParams = new URLSearchParams(window.location.search);
const hasExplicitYearParam = Boolean(sanitizeYear(urlParams.get("year")));
const hasExplicitMonthParam = Boolean(sanitizeMonth(urlParams.get("month")));
const hasExplicitPeriodParam = hasExplicitYearParam || hasExplicitMonthParam;
const accountId = urlParams.get("id");
const ACCOUNT_HISTORY_STORAGE_KEY = `gestao-financeira-nl-account-history-${accountId || "unknown"}`;
let accounts = loadJson(ACCOUNTS_STORAGE_KEY);
const statementsByAccount = loadStatementsStore();
const account = accounts.find((item) => item.id === accountId);
const currentYear = String(new Date().getFullYear());
let availableYears = [];
let editingFinancialProductId = null;
let pendingUndoAction = null;
let undoToastTimer = null;
let undoStack = [];
let redoStack = [];
let isMovementsExpanded = false;
let statementToastTimer = null;
let exportReminderTimer = null;
let exportReminderInterval = null;
let exportReminderStartedAt = 0;
let exportReminderDeadline = 0;
let dataTransferFeedbackTimer = null;
let editingMovementRuleId = null;
let expandedTrackingEntryId = null;
let isTrackingExpanded = false;
let isTrackingDeleteMode = false;
let draggingMovementRuleId = null;
let activeFinancialProductChartId = null;
let turmaScrollTopButton = null;
let expandedMovementSuggestionKey = "";
let recurringDetectionLookbackMonths = 6;
let recurringDetectionDrafts = {};
let selectedYear =
  sanitizeYear(urlParams.get("year")) ||
  currentYear;
let selectedMonth =
  sanitizeMonth(urlParams.get("month")) ||
  String(new Date().getMonth() + 1).padStart(2, "0");

loadPersistedHistory();
restoreExportReminderState();
initTurmaScrollTopButton();

window.addEventListener("pageshow", () => {
  syncExportReminderState();
  syncAccountsState();
  collapseTrackingExpandedState();
});
window.addEventListener("focus", () => {
  syncExportReminderState();
  syncAccountsState();
  collapseTrackingExpandedState();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    syncExportReminderState();
    syncAccountsState();
    collapseTrackingExpandedState();
  }
});
window.addEventListener("storage", (event) => {
  if (event.key === EXPORT_REMINDER_STORAGE_KEY) {
    syncExportReminderState();
  }

  if (event.key === ACCOUNTS_STORAGE_KEY) {
    syncAccountsState();
  }
});

if (!account) {
  detailBankName.textContent = "Conta não encontrada";
  statementFeedback.textContent = "Não foi possível abrir esta conta.";
  yearSelect.disabled = true;
  statementMenuToggle.disabled = true;
  financialProductToggle.disabled = true;
} else {
  ensureFinancialProducts();
  ensureMovementRules();
  renderAccount();
  setupDateSelectors();
  renderMonth();
  renderTrackingPanel();
  renderFinancialProducts();
  renderAccountTrendChart();
  renderRelatedAccountsDock();
}
updateHistoryButtons();

statementMenuToggle.addEventListener("click", () => {
  const isHidden = statementMenu.classList.contains("hidden");
  closeAllThreeDotMenus();

  if (isHidden) {
    statementMenu.classList.remove("hidden");
    statementMenuToggle.setAttribute("aria-expanded", "true");
  }
});
pasteStatementFromClipboardButton?.addEventListener("click", importStatementFromClipboard);
openStatementTextButton.addEventListener("click", () => {
  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");
  statementText.value = getEditableStatementText(getSelectedPeriod());
  statementTextModal.classList.remove("hidden");
  setPageScrollLock(true);
});
openMovementSearchButton?.addEventListener("click", openMovementSearchModalEntry);
openStatementHelpButton?.addEventListener("click", openStatementHelpModalEntry);
openMovementAnalysisButton?.addEventListener("click", openMovementAnalysisModalEntry);
openMonthlyPdfReportButton?.addEventListener("click", openMonthlyPdfReport);
trackingMenuToggle?.addEventListener("click", () => {
  const isHidden = trackingMenu?.classList.contains("hidden");
  closeAllThreeDotMenus();

  if (isHidden) {
    trackingMenu?.classList.remove("hidden");
    trackingMenuToggle.setAttribute("aria-expanded", "true");
  }
});
openTrackingPanelModalButton?.addEventListener("click", () => {
  trackingMenu?.classList.add("hidden");
  trackingMenuToggle?.setAttribute("aria-expanded", "false");
  if (expandedTrackingEntryId) {
    openEditMovementRule(expandedTrackingEntryId);
  }
  openMovementRulesModal();
});
openRecurringDetectionModalButton?.addEventListener("click", openRecurringDetectionModal);
deleteSelectedTrackingEntryButton?.addEventListener("click", deleteExpandedTrackingEntry);
trackingMoreIndicator?.addEventListener("click", (event) => {
  event.stopPropagation();
  isTrackingExpanded = !isTrackingExpanded;
  renderTrackingPanel();
});
deleteStatementDataButton.addEventListener("click", deleteStatementForSelectedPeriod);
closeStatementTextModal.addEventListener("click", closeStatementTextEntry);
undoButton?.addEventListener("click", executeUndo);
redoButton?.addEventListener("click", executeRedo);
exportDataButton?.addEventListener("click", exportAllData);
importDataButton?.addEventListener("click", () => {
  importDataFile?.click();
});
importDataFile?.addEventListener("change", importAllData);
annualReportButton?.addEventListener("click", openAnnualReportModal);
printAnnualReportButton?.addEventListener("click", openAnnualPdfReport);
closeAnnualReportModal?.addEventListener("click", closeAnnualReportModalEntry);
closeMovementAnalysisModal?.addEventListener("click", closeMovementAnalysisModalEntry);
statementTextModal.addEventListener("click", (event) => {
  if (event.target.dataset.closeStatementText === "true") {
    closeStatementTextEntry();
  }
});
movementAnalysisModal?.addEventListener("click", (event) => {
  if (event.target.dataset.closeMovementAnalysis === "true") {
    closeMovementAnalysisModalEntry();
  }
});
closeMovementSearchModal?.addEventListener("click", closeMovementSearchModalEntry);
movementSearchModal?.addEventListener("click", (event) => {
  if (event.target.dataset.closeMovementSearch === "true") {
    closeMovementSearchModalEntry();
  }
});
closeStatementHelpModal?.addEventListener("click", closeStatementHelpModalEntry);
statementHelpModal?.addEventListener("click", (event) => {
  if (event.target.dataset.closeStatementHelp === "true") {
    closeStatementHelpModalEntry();
  }
});
movementSearchQuery?.addEventListener("input", renderMovementSearch);
movementSearchMode?.addEventListener("change", () => {
  updateMovementSearchMode();
  renderMovementSearch();
});
movementSearchStartDate?.addEventListener("change", renderMovementSearch);
movementSearchEndDate?.addEventListener("change", renderMovementSearch);
financialProductToggle.addEventListener("click", () => {
  const isHidden = financialProductMenu.classList.contains("hidden");
  closeAllThreeDotMenus();

  if (isHidden) {
    financialProductMenu.classList.remove("hidden");
    financialProductToggle.setAttribute("aria-expanded", "true");
  }
});
openFinancialProductModalButton.addEventListener("click", () => {
  financialProductMenu.classList.add("hidden");
  financialProductToggle.setAttribute("aria-expanded", "false");
  openFinancialProductModal();
});
copyFinancialProductsButton.addEventListener("click", copyFinancialProductsFromPreviousMonth);
closeFinancialProductModal.addEventListener("click", closeFinancialProductEntry);
closeFinancialProductChartModal?.addEventListener("click", closeFinancialProductChartModalEntry);
undoToastButton?.addEventListener("click", runUndoAction);
financialProductModal.addEventListener("click", (event) => {
  if (event.target.dataset.closeFinancialProduct === "true") {
    closeFinancialProductEntry();
  }
});
financialProductChartModal?.addEventListener("click", (event) => {
  if (event.target.dataset.closeFinancialProductChart === "true") {
    closeFinancialProductChartModalEntry();
  }
});
closeMovementRulesModal?.addEventListener("click", closeMovementRulesModalEntry);
movementRulesModal?.addEventListener("click", (event) => {
  if (event.target.dataset.closeMovementRules === "true") {
    closeMovementRulesModalEntry();
  }
});
closeRecurringDetectionModal?.addEventListener("click", closeRecurringDetectionModalEntry);
recurringDetectionModal?.addEventListener("click", (event) => {
  if (event.target.dataset.closeRecurringDetection === "true") {
    closeRecurringDetectionModalEntry();
  }
});
annualReportModal?.addEventListener("click", (event) => {
  if (event.target.dataset.closeAnnualReport === "true") {
    closeAnnualReportModalEntry();
  }
});
movementRuleForm?.addEventListener("submit", handleMovementRuleSubmit);
movementRuleCopyPreviousButton?.addEventListener("click", copyTrackedEntriesFromPreviousMonth);
recurringDetectionWindow?.addEventListener("change", (event) => {
  recurringDetectionLookbackMonths = Number(event.target.value) || 6;
  renderRecurringDetectionModal();
});
financialProductForm.addEventListener("submit", handleFinancialProductSubmit);
movementsToggle?.addEventListener("click", () => {
  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");
  isMovementsExpanded = !isMovementsExpanded;
  renderMonth();
});
document.addEventListener("click", (event) => {
  if (
    event.target.closest(".mini-action-button")
    || event.target.closest(".statement-menu")
    || event.target.closest(".financial-product-menu-wrap")
    || event.target.closest(".financial-product-menu")
  ) {
    return;
  }

  closeAllThreeDotMenus();

  if (isTrackingExpanded && !event.target.closest(".tracking-panel")) {
    collapseTrackingExpandedState();
  }

  if (isTrackingDeleteMode && !event.target.closest(".tracking-panel")) {
    cancelTrackingDeleteMode();
  }
});

monthChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    selectedMonth = chip.dataset.month;
    isMovementsExpanded = false;
    isTrackingExpanded = false;
    expandedTrackingEntryId = null;
    isTrackingDeleteMode = false;
    updateMonthSelection();
    financialProductsFeedback.textContent = "";
    renderAccount();
    renderMonth();
    renderTrackingPanel();
    renderFinancialProducts();
    renderAccountTrendChart();
  });
});
financialProductsList.addEventListener("click", (event) => {
  const menuToggle = event.target.closest("[data-financial-product-menu-toggle]");
  const editButton = event.target.closest("[data-edit-financial-product-id]");
  const deleteButton = event.target.closest("[data-delete-financial-product-id]");
  const chartButton = event.target.closest("[data-view-financial-product-chart-id]");

  if (menuToggle) {
    toggleFinancialProductMenu(menuToggle.dataset.financialProductMenuToggle);
    return;
  }

  if (editButton) {
    openEditFinancialProduct(editButton.dataset.editFinancialProductId);
    return;
  }

  if (deleteButton) {
    deleteFinancialProduct(deleteButton.dataset.deleteFinancialProductId);
    return;
  }

  if (chartButton) {
    openFinancialProductChartModalEntry(chartButton.dataset.viewFinancialProductChartId);
    return;
  }

  if (!event.target.closest(".financial-product-menu")) {
    closeFinancialProductMenus();
  }
});
movementRulesList?.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-movement-rule-id]");
  const deleteButton = event.target.closest("[data-delete-movement-rule-id]");

  if (editButton) {
    openEditMovementRule(editButton.dataset.editMovementRuleId);
    return;
  }

  if (deleteButton) {
    deleteMovementRule(deleteButton.dataset.deleteMovementRuleId);
  }
});
movementRulesList?.addEventListener("dragstart", handleMovementRuleListDragStart);
movementRulesList?.addEventListener("dragover", handleMovementRuleListDragOver);
movementRulesList?.addEventListener("drop", handleMovementRuleListDrop);
movementRulesList?.addEventListener("dragend", handleMovementRuleListDragEnd);
trackingList?.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("[data-tracking-toggle-id]");
  const inlineDeleteButton = event.target.closest("[data-tracking-inline-delete-id]");

  if (inlineDeleteButton) {
    event.stopPropagation();
    deleteMovementRule(inlineDeleteButton.dataset.trackingInlineDeleteId);
    return;
  }

  if (toggleButton) {
    event.stopPropagation();
    const nextId = toggleButton.dataset.trackingToggleId;
    expandedTrackingEntryId = expandedTrackingEntryId === nextId ? null : nextId;
    renderTrackingPanel();
    return;
  }
});
movementRuleSuggestions?.addEventListener("click", (event) => {
  const previewToggle = event.target.closest("[data-rule-suggestion-preview-toggle]");
  const useButton = event.target.closest("[data-rule-suggestion-use]");
  const suggestionButton = event.target.closest("[data-rule-suggestion-description]");

  if (previewToggle) {
    event.stopPropagation();
    const nextKey = previewToggle.dataset.ruleSuggestionPreviewToggle || "";
    expandedMovementSuggestionKey = expandedMovementSuggestionKey === nextKey ? "" : nextKey;
    renderMovementRules();
    return;
  }

  if (useButton) {
    const parentSuggestion = useButton.closest("[data-rule-suggestion-description]");

    if (!parentSuggestion) {
      return;
    }

    if (parentSuggestion.dataset.ruleSuggestionOverlap === "true") {
      setMovementRulesFeedback("Movimentos repetidos: esta sugestão já está abrangida por outra regra.", true);
      return;
    }

    loadSuggestionIntoMovementRuleForm(parentSuggestion);
    return;
  }

  if (!suggestionButton) {
    return;
  }

  event.stopPropagation();
  const nextKey = suggestionButton.dataset.ruleSuggestionKey || "";
  expandedMovementSuggestionKey = expandedMovementSuggestionKey === nextKey ? "" : nextKey;
  renderMovementRules();
});
recurringDetectionList?.addEventListener("input", (event) => {
  const field = event.target.closest("[data-recurring-draft-field]");

  if (!field) {
    return;
  }

  const suggestionKey = field.dataset.recurringSuggestionKey || "";
  const fieldName = field.dataset.recurringDraftField || "";

  if (!suggestionKey || !fieldName) {
    return;
  }

  recurringDetectionDrafts[suggestionKey] = {
    ...(recurringDetectionDrafts[suggestionKey] || {}),
    [fieldName]: field.value,
  };
});
recurringDetectionList?.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-recurring-suggestion-key]");

  if (!addButton) {
    return;
  }

  addRecurringSuggestion(addButton.dataset.addRecurringSuggestionKey || "");
});
movementRuleSuggestions?.addEventListener("dragstart", handleSuggestionDragStart);
movementRuleSuggestions?.addEventListener("dragend", handleSuggestionDragEnd);
movementRulesDropzone?.addEventListener("dragover", handleMovementRuleDropzoneDragOver);
movementRulesDropzone?.addEventListener("dragleave", handleMovementRuleDropzoneDragLeave);
movementRulesDropzone?.addEventListener("drop", handleMovementRuleDrop);
movementRuleMatchField?.addEventListener("input", () => {
  if (!movementRulesModal?.classList.contains("hidden")) {
    renderMovementRules();
  }
});
movementRuleAmountMatchField?.addEventListener("input", () => {
  if (!movementRulesModal?.classList.contains("hidden")) {
    renderMovementRules();
  }
});
movementRuleAmountMatchField?.addEventListener("change", () => {
  if (!movementRulesModal?.classList.contains("hidden")) {
    renderMovementRules();
  }
});
trackingCopyPreviousButton?.addEventListener("click", copyTrackedEntriesFromPreviousMonth);
importTextButton.addEventListener("click", copyStatementTextToClipboard);
saveStatementTextButton?.addEventListener("click", saveEditedStatementText);
yearSelect.addEventListener("change", (event) => {
  selectedYear = event.target.value;
  isMovementsExpanded = false;
  isTrackingExpanded = false;
  expandedTrackingEntryId = null;
  financialProductsFeedback.textContent = "";
  updateMonthSelection();
  renderAccount();
  renderMonth();
  renderTrackingPanel();
  renderFinancialProducts();
  renderAccountTrendChart();
  renderRelatedAccountsDock();
});
window.addEventListener("resize", () => {
  if (!account) {
    return;
  }

  renderAccountTrendChart();
});

function renderAccount() {
  const selectedPeriodKey = getSelectedPeriod();
  const displayBalanceInfo = getDisplayBalanceInfoForPeriod(selectedPeriodKey);
  const displayedBalance = displayBalanceInfo.balance;
  const previousBalance = getCurrentBalanceForPeriod(getPreviousPeriodKey(selectedPeriodKey));
  const hasPreviousReference = previousBalance !== null;
  const monthVariation = hasPreviousReference ? displayedBalance - previousBalance : 0;

  detailBankName.textContent = account.bankName;
  detailBalance.textContent = formatCurrency(displayedBalance);
  detailBalanceVariation?.classList.remove("executive-metric-positive", "executive-metric-negative");
  if (detailBalanceVariation) {
    detailBalanceVariation.textContent = formatCurrency(monthVariation);

    if (monthVariation > 0.0001) {
      detailBalanceVariation.classList.add("executive-metric-positive");
    } else if (monthVariation < -0.0001) {
      detailBalanceVariation.classList.add("executive-metric-negative");
    }
  }

  if (detailBalanceVariationHint) {
    if (displayBalanceInfo.isProvisional && displayBalanceInfo.referencePeriodKey) {
      detailBalanceVariationHint.textContent = `Saldo provisório com base em ${formatPeriodLabel(displayBalanceInfo.referencePeriodKey)}.`;
    } else if (!hasPreviousReference) {
      detailBalanceVariationHint.textContent = "Sem referência anterior.";
    } else if (monthVariation > 0.0001) {
      detailBalanceVariationHint.textContent = "Subiu face ao mês anterior.";
    } else if (monthVariation < -0.0001) {
      detailBalanceVariationHint.textContent = "Desceu face ao mês anterior.";
    } else {
      detailBalanceVariationHint.textContent = "Sem variação face ao mês anterior.";
    }
  }

  detailSymbol.outerHTML = account.symbol
    ? `<img id="detail-symbol" class="account-symbol" src="${account.symbol}" alt="Símbolo de ${escapeHtml(account.bankName)}" />`
    : `<div id="detail-symbol" class="account-symbol-placeholder">${escapeHtml(account.bankName.slice(0, 2).toUpperCase())}</div>`;

  applyAccountThemeFromSymbol();
}

function renderRelatedAccountsDock() {
  if (!relatedAccountsList) {
    return;
  }

  const orderedAccounts = (accounts || [])
    .filter((item) => item?.id && item.archived !== true);

  if (orderedAccounts.length === 0) {
    relatedAccountsList.innerHTML = `
      <p class="related-accounts-empty">Não existem outras contas.</p>
    `;
    return;
  }

  relatedAccountsList.innerHTML = orderedAccounts.map((item) => {
    const isCurrentAccount = item.id === account?.id;
    const isExcludedFromTotals = item.includeInTotals === false;
    const symbolClass = "related-account-symbol";
    const link = `./account.html?id=${encodeURIComponent(item.id)}&year=${encodeURIComponent(selectedYear)}&month=${encodeURIComponent(selectedMonth)}`;
    const symbol = item.symbol
      ? `<img class="${symbolClass} account-symbol" src="${item.symbol}" alt="Símbolo de ${escapeHtml(item.bankName)}" />`
      : `<div class="${symbolClass} account-symbol-placeholder">${escapeHtml(String(item.bankName || "").slice(0, 2).toUpperCase())}</div>`;

    return `
      <a
        class="related-account-link${isCurrentAccount ? " is-current-account" : ""}${isExcludedFromTotals ? " related-account-link-excluded" : ""}"
        href="${link}"
        aria-label="Abrir ${escapeHtml(item.bankName)} em ${formatPeriodLabel(getSelectedPeriod())}"
        ${isCurrentAccount ? 'aria-current="page"' : ""}
        title="${escapeHtmlAttribute(item.bankName)}"
      >
        ${symbol}
        <span class="related-account-name">${escapeHtml(item.shortName || item.bankName || "Conta")}</span>
      </a>
    `;
  }).join("");
}

function getCompactAccountName(name) {
  const normalizedName = String(name || "").replace(/\s+/g, " ").trim();

  if (!normalizedName) {
    return "";
  }

  const lowerName = normalizedName.toLowerCase();

  if (lowerName === "activobank") {
    return "AB";
  }

  if (lowerName.startsWith("novo banco")) {
    const remainder = normalizedName.slice("Novo Banco".length).trim();
    return remainder ? `NB ${remainder}` : "NB";
  }

  const words = normalizedName.split(" ");

  if (words.length >= 2 && normalizedName.length > 14) {
    const initials = words
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    const remainder = words.slice(2).join(" ");
    return remainder ? `${initials} ${remainder}` : initials;
  }

  const upperCaseInitials = normalizedName.match(/[A-ZÀ-Ý]/g);

  if (upperCaseInitials && upperCaseInitials.length >= 2 && normalizedName.length > 10) {
    return upperCaseInitials.slice(0, 2).join("");
  }

  return normalizedName;
}

function applyAccountThemeFromSymbol() {
  if (!document.body) {
    return;
  }

  if (!account?.symbol) {
    resetAccountTheme();
    return;
  }

  const symbolImage = document.querySelector("#detail-symbol.account-symbol");

  if (!(symbolImage instanceof HTMLImageElement)) {
    resetAccountTheme();
    return;
  }

  const applyTheme = () => {
    const dominantColor = extractDominantColorFromImage(symbolImage);

    if (!dominantColor) {
      resetAccountTheme();
      return;
    }

    document.body.style.setProperty("--account-theme-rgb", dominantColor.join(", "));
    document.body.classList.add("account-theme-active");
  };

  if (symbolImage.complete && symbolImage.naturalWidth > 0) {
    applyTheme();
    return;
  }

  symbolImage.addEventListener("load", applyTheme, { once: true });
  symbolImage.addEventListener("error", resetAccountTheme, { once: true });
}

function resetAccountTheme() {
  document.body.classList.remove("account-theme-active");
  document.body.style.removeProperty("--account-theme-rgb");
}

function extractDominantColorFromImage(image) {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      return null;
    }

    const sampleSize = 24;
    canvas.width = sampleSize;
    canvas.height = sampleSize;
    context.drawImage(image, 0, 0, sampleSize, sampleSize);

    const { data } = context.getImageData(0, 0, sampleSize, sampleSize);
    let red = 0;
    let green = 0;
    let blue = 0;
    let count = 0;

    for (let index = 0; index < data.length; index += 4) {
      const alpha = data[index + 3];

      if (alpha < 140) {
        continue;
      }

      const currentRed = data[index];
      const currentGreen = data[index + 1];
      const currentBlue = data[index + 2];
      const maxChannel = Math.max(currentRed, currentGreen, currentBlue);

      if (maxChannel < 35) {
        continue;
      }

      red += currentRed;
      green += currentGreen;
      blue += currentBlue;
      count += 1;
    }

    if (count === 0) {
      return null;
    }

    return [
      Math.round(red / count),
      Math.round(green / count),
      Math.round(blue / count),
    ];
  } catch {
    return null;
  }
}

function openMovementRulesModal() {
  editingMovementRuleId = null;
  movementRuleForm?.reset();
  movementRuleIdField.value = "";
  if (movementRuleDueDayField) {
    movementRuleDueDayField.value = "";
  }
  if (movementRuleExcludeFromPendingField) {
    movementRuleExcludeFromPendingField.checked = false;
  }
  updateMovementRuleFormVisibility();
  movementRuleSubmit.textContent = "Guardar entrada";
  setMovementRulesFeedback("");
  renderMovementRules();
  movementRulesModal?.classList.remove("hidden");
  setPageScrollLock(true);
}

function closeMovementRulesModalEntry() {
  editingMovementRuleId = null;
  movementRuleForm?.reset();
  movementRuleIdField.value = "";
  if (movementRuleDueDayField) {
    movementRuleDueDayField.value = "";
  }
  if (movementRuleExcludeFromPendingField) {
    movementRuleExcludeFromPendingField.checked = false;
  }
  updateMovementRuleFormVisibility();
  movementRuleSubmit.textContent = "Guardar entrada";
  setMovementRulesFeedback("");
  movementRulesModal?.classList.add("hidden");
  setPageScrollLock(false);
}

function openRecurringDetectionModal() {
  trackingMenu?.classList.add("hidden");
  trackingMenuToggle?.setAttribute("aria-expanded", "false");
  recurringDetectionLookbackMonths = Number(recurringDetectionWindow?.value || recurringDetectionLookbackMonths || 6);
  recurringDetectionDrafts = {};
  recurringDetectionFeedback.textContent = "";
  recurringDetectionFeedback.classList.remove("is-error");
  recurringDetectionModal?.classList.remove("hidden");
  renderRecurringDetectionModal();
  setPageScrollLock(true);
}

function closeRecurringDetectionModalEntry() {
  recurringDetectionDrafts = {};
  recurringDetectionFeedback.textContent = "";
  recurringDetectionFeedback.classList.remove("is-error");
  recurringDetectionModal?.classList.add("hidden");
  setPageScrollLock(false);
}

function openAnnualReportModal() {
  closeAllThreeDotMenus();
  annualReportModal?.classList.remove("hidden");

  try {
    renderAnnualReport();
  } catch (error) {
    console.error("Falha ao abrir o relatório anual.", error);

    if (annualReportSubtitle) {
      annualReportSubtitle.textContent = "Não foi possível gerar o relatório anual neste momento.";
    }

    if (annualReportMonths) {
      annualReportMonths.innerHTML = "";
    }

    if (annualReportRecurringList) {
      annualReportRecurringList.innerHTML = "";
    }

    annualReportCredits && (annualReportCredits.textContent = formatCurrency(0));
    annualReportExpenses && (annualReportExpenses.textContent = formatCurrency(0));
    annualReportNet && (annualReportNet.textContent = formatCurrency(0));
    annualReportRecurring && (annualReportRecurring.textContent = formatCurrency(0));
    annualReportMonthsEmpty?.classList.remove("hidden");
    annualReportRecurringEmpty?.classList.remove("hidden");
  } finally {
    setPageScrollLock(true);
  }
}

function closeAnnualReportModalEntry() {
  annualReportModal?.classList.add("hidden");
  setPageScrollLock(false);
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

function showDataTransferFeedback(message) {
  if (dataTransferFeedback) {
    dataTransferFeedback.textContent = message;
    dataTransferFeedback.classList.remove("hidden");
    window.clearTimeout(dataTransferFeedbackTimer);
    dataTransferFeedbackTimer = window.setTimeout(() => {
      dataTransferFeedback.textContent = "";
      dataTransferFeedback.classList.add("hidden");
    }, 3200);
  }
}

function loadPersistedHistory() {
  const historyState = loadJson(ACCOUNT_HISTORY_STORAGE_KEY);
  undoStack = Array.isArray(historyState?.undo) ? historyState.undo : [];
  redoStack = Array.isArray(historyState?.redo) ? historyState.redo : [];
}

function savePersistedHistory() {
  saveJson(ACCOUNT_HISTORY_STORAGE_KEY, {
    undo: undoStack.slice(-20),
    redo: redoStack.slice(-20),
  });
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

function executeUndo() {
  const action = undoStack.pop();

  if (!action) {
    updateHistoryButtons();
    return;
  }

  applyAccountHistoryAction(action, "undo");
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

  applyAccountHistoryAction(action, "redo");
  undoStack.push(action);
  savePersistedHistory();
  updateHistoryButtons();
}

function applyAccountHistoryAction(action, mode) {
  if (!action || action.accountId !== account?.id) {
    return;
  }

  if (action.type === "delete-statement") {
    const periodKey = action.periodKey;
    const accountStatements = getAccountStatementRecord(account.id);

    if (mode === "undo") {
      accountStatements.periods[periodKey] = action.deletedMovements || [];
      accountStatements.statementTexts[periodKey] = action.deletedStatementText || "";
      accountStatements.lastImportedPeriod = action.previousLastImportedPeriod || periodKey;
      statementsByAccount[account.id] = accountStatements;
      saveStatementsStore();
      account.balance = Number(action.previousBalance || 0);
      saveAccountsSnapshot();
      addActivityEntry({
        title: "Ação desfeita",
        description: `${account.bankName}: o extrato de ${formatPeriodLabel(periodKey)} foi reposto.`,
      });
      renderMovementRules();
      renderTrackingPanel();
      renderAccount();
      renderMonth();
      renderAccountTrendChart();
      return;
    }

    delete accountStatements.periods[periodKey];
    delete accountStatements.statementTexts[periodKey];

    if (accountStatements.lastImportedPeriod === periodKey) {
      accountStatements.lastImportedPeriod = getMostRecentPeriodKey(accountStatements);
    }

    statementsByAccount[account.id] = accountStatements;
    saveStatementsStore();
    const mostRecentBalanceMovement = getMostRecentBalanceMovement();
    account.balance = Number(mostRecentBalanceMovement?.balance || 0);
    saveAccountsSnapshot();
    statementMenu.classList.add("hidden");
    statementMenuToggle.setAttribute("aria-expanded", "false");
    showStatementFeedback("Extrato mensal apagado.", true);
    addActivityEntry({
      title: "Extrato apagado",
      description: `${account.bankName}: os dados de ${formatPeriodLabel(periodKey)} foram removidos.`,
    });
    renderMovementRules();
    renderTrackingPanel();
    renderAccount();
    renderMonth();
    renderAccountTrendChart();
    return;
  }

  if (action.type === "delete-product") {
    const periodKey = action.periodKey;
    const removedProduct = action.removedProduct;

    if (mode === "undo") {
      const products = account.financialProductsByPeriod[periodKey] || [];
      const nextProducts = [...products];
      nextProducts.splice(Math.max(action.removedIndex, 0), 0, removedProduct);
      account.financialProductsByPeriod[periodKey] = nextProducts;
      saveAccountsSnapshot();
      addActivityEntry({
        title: "Ação desfeita",
        description: `${account.bankName}: ${removedProduct?.name || "Produto"} foi reposto em ${formatPeriodLabel(periodKey)}.`,
      });
      renderFinancialProducts();
      renderAccount();
      renderMonth();
      renderAccountTrendChart();
      return;
    }

    account.financialProductsByPeriod[periodKey] = (account.financialProductsByPeriod[periodKey] || [])
      .filter((product) => product.id !== removedProduct.id);
    saveAccountsSnapshot();
    financialProductsFeedback.textContent = "Produto removido.";
    addActivityEntry({
      title: "Produto financeiro apagado",
      description: `${account.bankName}: ${removedProduct?.name || "Produto"} foi removido de ${formatPeriodLabel(periodKey)}.`,
    });
    closeFinancialProductMenus();
    renderFinancialProducts();
    renderAccount();
    renderMonth();
    renderAccountTrendChart();
    return;
  }

  if (action.type === "delete-tracking-entry") {
    const periodKey = action.periodKey;
    const removedEntry = action.removedEntry;

    if (mode === "undo") {
      const entries = getMovementRules(periodKey);
      const nextEntries = [...entries];
      nextEntries.splice(Math.max(action.removedIndex, 0), 0, removedEntry);
      account.movementRulesByPeriod[periodKey] = nextEntries;
      saveAccountsSnapshot();
      addActivityEntry({
        title: "Ação desfeita",
        description: `${account.bankName}: ${removedEntry?.label || "Linha"} foi reposta em ${formatPeriodLabel(periodKey)}.`,
      });
      renderMovementRules();
      renderTrackingPanel();
      renderMonth();
      return;
    }

    account.movementRulesByPeriod[periodKey] = (account.movementRulesByPeriod[periodKey] || [])
      .filter((entry) => entry.id !== removedEntry.id);
    saveAccountsSnapshot();
    addActivityEntry({
      title: "Despesa recorrente apagada",
      description: `${account.bankName}: ${removedEntry?.label || "Linha"} foi removida de ${formatPeriodLabel(periodKey)}.`,
    });
    renderMovementRules();
    renderTrackingPanel();
    renderMonth();
    return;
  }

  if (action.type === "copy-tracking-entries") {
    const periodKey = action.periodKey;
    const addedEntries = action.addedEntries || [];
    const previousEntriesSnapshot = Array.isArray(action.previousEntriesSnapshot)
      ? action.previousEntriesSnapshot
      : null;
    const nextEntriesSnapshot = Array.isArray(action.nextEntriesSnapshot)
      ? action.nextEntriesSnapshot
      : null;

    if (mode === "undo") {
      if (previousEntriesSnapshot) {
        account.movementRulesByPeriod[periodKey] = previousEntriesSnapshot;
      } else {
        const addedIds = new Set(addedEntries.map((entry) => entry.id));
        account.movementRulesByPeriod[periodKey] = (account.movementRulesByPeriod[periodKey] || [])
          .filter((entry) => !addedIds.has(entry.id));
      }
      saveAccountsSnapshot();
      addActivityEntry({
        title: "Ação desfeita",
        description: `${account.bankName}: a cópia de despesas recorrentes em ${formatPeriodLabel(periodKey)} foi revertida.`,
      });
      renderMovementRules();
      renderTrackingPanel();
      renderMonth();
      return;
    }

    account.movementRulesByPeriod[periodKey] = nextEntriesSnapshot || [
      ...(account.movementRulesByPeriod[periodKey] || []),
      ...addedEntries,
    ];
    saveAccountsSnapshot();
    addActivityEntry({
      title: "Ação refeita",
      description: `${account.bankName}: a cópia de despesas recorrentes em ${formatPeriodLabel(periodKey)} foi reaplicada.`,
    });
    renderMovementRules();
    renderTrackingPanel();
    renderMonth();
  }
}

function setupDateSelectors() {
  availableYears = getAvailableYears();
  const currentPeriod = `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const accountStatements = getAccountStatementRecord(account?.id);
  const availablePeriods = Object.keys(accountStatements.periods).sort().reverse();

  if (hasExplicitPeriodParam) {
    if (!availableYears.includes(selectedYear)) {
      selectedYear = availableYears.includes(currentYear) ? currentYear : availableYears[0];
    }
  } else if (hasVisualContextForPeriod(currentPeriod)) {
    [selectedYear, selectedMonth] = currentPeriod.split("-");
  } else if (accountStatements.lastImportedPeriod) {
    [selectedYear, selectedMonth] = accountStatements.lastImportedPeriod.split("-");
  } else if (availablePeriods.length > 0) {
    [selectedYear, selectedMonth] = availablePeriods[0].split("-");
  } else if (!availableYears.includes(selectedYear)) {
    selectedYear = availableYears.includes(currentYear) ? currentYear : availableYears[0];
  }

  renderYearSelector();
  updateMonthSelection();
}

async function copyStatementTextToClipboard() {
  if (!account) {
    return;
  }

  const content = statementText.value.trim();

  if (!content) {
    showStatementFeedback("Não existe texto guardado para copiar neste mês.", true, "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(content);
    showStatementFeedback("Extrato copiado para o clipboard.", true);
  } catch (error) {
    showStatementFeedback("Não foi possível copiar o extrato.", true, "error");
  }
}

function saveEditedStatementText() {
  if (!account) {
    return;
  }

  const content = statementText.value.trim();

  if (!content) {
    showStatementFeedback("Não existe texto para gravar neste mês.", true, "error");
    return;
  }

  if (parseStatement(content).length === 0) {
    showStatementFeedback("Dados inválidos.", true, "error");
    return;
  }

  importStatementContent(content, {
    activityTitle: "Extrato editado",
    successMessage: `Extrato gravado com sucesso para ${formatPeriodLabel(getSelectedPeriod())}.`,
  });
}

async function importStatementFromClipboard() {
  if (!account) {
    return;
  }

  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");

  try {
    const content = (await navigator.clipboard.readText()).trim();

    if (!content || parseStatement(content).length === 0) {
      showStatementFeedback("Dados inválidos.", true, "error");
      return;
    }

    statementText.value = content;
    importStatementContent(content);
  } catch (error) {
    showStatementFeedback("Dados inválidos.", true, "error");
  }
}

function importStatementContent(content, options = {}) {
  const parsedMovements = parseStatement(content);

  if (parsedMovements.length === 0) {
    showStatementFeedback("Dados inválidos.", true, "error");
    return;
  }

  const periodKey = getSelectedPeriod();
  const accountStatements = getAccountStatementRecord(account.id);

  accountStatements.periods[periodKey] = parsedMovements;
  accountStatements.statementTexts[periodKey] = content.trim();
  accountStatements.lastImportedPeriod = periodKey;
  statementsByAccount[account.id] = accountStatements;
  saveStatementsStore();

  const mostRecentBalanceMovement = getMostRecentBalanceMovement();

  if (mostRecentBalanceMovement) {
    account.balance = Number(mostRecentBalanceMovement.balance || 0);
    saveAccountsSnapshot();
  }

  addActivityEntry({
    title: options.activityTitle || "Extrato importado",
    description: `${account.bankName}: ${parsedMovements.length} movimentos importados para ${formatPeriodLabel(periodKey)}.`,
  });
  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");
  closeStatementTextEntry();
  renderMovementRules();
  renderTrackingPanel();
  renderAccount();
  renderMonth();
  renderAccountTrendChart();
  showStatementFeedback(
    options.successMessage || `${parsedMovements.length} movimentos importados com sucesso para ${formatPeriodLabel(periodKey)}.`,
    true,
  );
}

function renderMonth() {
  if (!account) {
    return;
  }

  const selectedPeriod = getSelectedPeriod();
  const movements = getMovementsForPeriod(selectedPeriod);
  const accountingMovements = getAccountingMovements(movements);
  const finalBalanceInfo = getDisplayFinalBalanceInfoForPeriod(selectedPeriod);

  const credits = accountingMovements
    .filter((movement) => movement.amount > 0)
    .reduce((total, movement) => total + movement.amount, 0);

  const expenses = accountingMovements
    .filter((movement) => movement.amount < 0)
    .reduce((total, movement) => total + Math.abs(movement.amount), 0);

  totalCredits.textContent = formatCurrency(credits);
  totalExpenses.textContent = formatCurrency(expenses);
  statementFinalBalance.textContent = formatCurrency(finalBalanceInfo.balance);
  const visibleMovements = isMovementsExpanded ? movements : movements.slice(0, 3);
  const hasMoreMovements = movements.length > 3;

  if (!hasMoreMovements) {
    isMovementsExpanded = false;
  }

  movementsEmptyState.classList.toggle("hidden", movements.length > 0);
  movementsList.innerHTML = visibleMovements.map(createMovementCard).join("");
  movementsToggle?.classList.toggle("hidden", !hasMoreMovements || movements.length === 0);
  if (movementsToggle) {
    movementsToggle.innerHTML = `
      <span class="menu-item-icon" aria-hidden="true">📚</span>
      <span>${isMovementsExpanded ? "Ver menos" : "Ver tudo"}</span>
    `;
  }
  if (movementsMoreIndicator) {
    movementsMoreIndicator.classList.toggle("hidden", !hasMoreMovements || isMovementsExpanded || movements.length === 0);
  }

  statementFeedback.textContent = movements.length > 0
    ? ""
    : "Ainda não existe extrato importado para este mês.";
  statementFeedback.classList.toggle("hidden", movements.length > 0);
}

function openMovementAnalysisModalEntry() {
  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");
  movementAnalysisModal?.classList.remove("hidden");
  setPageScrollLock(true);

  try {
    renderMovementAnalysisModal();
  } catch (error) {
    console.error("Falha ao abrir a análise de movimentos.", error);

    if (movementAnalysisSubtitle) {
      movementAnalysisSubtitle.textContent = "Não foi possível gerar a análise deste mês.";
    }

    if (movementAnalysisCreditsTotal) {
      movementAnalysisCreditsTotal.textContent = formatCurrency(0);
    }

    if (movementAnalysisDebitsTotal) {
      movementAnalysisDebitsTotal.textContent = formatCurrency(0);
    }

    if (movementAnalysisCreditsExcluded) {
      movementAnalysisCreditsExcluded.textContent = `Excluídos: ${formatCurrency(0)}`;
    }

    if (movementAnalysisDebitsExcluded) {
      movementAnalysisDebitsExcluded.textContent = `Excluídos: ${formatCurrency(0)}`;
    }

    if (movementAnalysisCreditsAccounting) {
      movementAnalysisCreditsAccounting.textContent = `Contabilizado: ${formatCurrency(0)}`;
    }

    if (movementAnalysisDebitsAccounting) {
      movementAnalysisDebitsAccounting.textContent = `Contabilizado: ${formatCurrency(0)}`;
    }

    if (movementAnalysisCreditsCount) {
      movementAnalysisCreditsCount.textContent = "0";
    }

    if (movementAnalysisDebitsCount) {
      movementAnalysisDebitsCount.textContent = "0";
    }

    if (movementAnalysisCreditsList) {
      movementAnalysisCreditsList.innerHTML = createMovementAnalysisEmptyState("Não foi possível carregar os créditos.");
    }

    if (movementAnalysisDebitsList) {
      movementAnalysisDebitsList.innerHTML = createMovementAnalysisEmptyState("Não foi possível carregar os débitos.");
    }
  }
}

function closeMovementAnalysisModalEntry() {
  movementAnalysisModal?.classList.add("hidden");
  setPageScrollLock(false);
}

function openStatementHelpModalEntry() {
  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");
  statementHelpModal?.classList.remove("hidden");
  setPageScrollLock(true);
}

function closeStatementHelpModalEntry() {
  statementHelpModal?.classList.add("hidden");
  setPageScrollLock(false);
}

function openMonthlyPdfReport() {
  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");

  try {
    const report = buildMonthlyPdfReportData(getSelectedPeriod());
    const reportWindow = window.open("about:blank", "_blank");

    if (!reportWindow) {
      showStatementFeedback("Não foi possível abrir o relatório PDF.", true, "error");
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(createMonthlyPdfReportMarkup(report));
    reportWindow.document.close();
  } catch (error) {
    console.error("Falha ao gerar o relatório PDF do mês.", error);
    showStatementFeedback("O relatório PDF não pôde ser gerado.", true, "error");
  }
}

function openAnnualPdfReport() {
  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");

  try {
    const report = buildAnnualPdfReportData(Number(selectedMonth));
    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
      showStatementFeedback("Não foi possível abrir o relatório anual em PDF.", true, "error");
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(createAnnualPdfReportMarkup(report));
    reportWindow.document.close();
  } catch (error) {
    console.error("Falha ao gerar o relatório anual PDF.", error);
    showStatementFeedback("O relatório anual em PDF não pôde ser gerado.", true, "error");
  }
}

function openMovementSearchModalEntry() {
  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");
  movementSearchModal?.classList.remove("hidden");
  updateMovementSearchMode();
  renderMovementSearch();
  setPageScrollLock(true);
  window.setTimeout(() => movementSearchQuery?.focus(), 0);
}

function closeMovementSearchModalEntry() {
  movementSearchModal?.classList.add("hidden");
  setPageScrollLock(false);
}

function updateMovementSearchMode() {
  const isDateRange = movementSearchMode?.value === "range";
  movementSearchDateFields.forEach((field) => field.classList.toggle("hidden", !isDateRange));
}

function renderMovementSearch() {
  const query = normalizeDescription(movementSearchQuery?.value || "");
  const mode = movementSearchMode?.value || "all";
  const allResults = getSearchableMovements();
  const scopedResults = allResults.filter((item) => isMovementSearchItemInScope(item, mode));
  const results = query
    ? scopedResults.filter((item) => normalizeDescription(item.movement.description || "").includes(query))
    : [];

  const credits = results
    .filter((item) => Number(item.movement.amount || 0) > 0)
    .reduce((sum, item) => sum + Number(item.movement.amount || 0), 0);
  const debits = results
    .filter((item) => Number(item.movement.amount || 0) < 0)
    .reduce((sum, item) => sum + Math.abs(Number(item.movement.amount || 0)), 0);

  movementSearchCount.textContent = `${results.length}`;
  movementSearchCredits.textContent = formatCurrency(credits);
  movementSearchDebits.textContent = formatCurrency(debits);
  movementSearchNet.textContent = formatCurrency(credits - debits);

  movementSearchResults.innerHTML = results.map(createMovementSearchResultCard).join("");

  if (!query) {
    movementSearchEmpty.textContent = "Escreve uma palavra para começar a pesquisa.";
  } else if (results.length === 0) {
    movementSearchEmpty.textContent = "Não foram encontrados movimentos com essa pesquisa.";
  }

  movementSearchEmpty.classList.toggle("hidden", query && results.length > 0);
}

function getSearchableMovements() {
  const accountStatements = getAccountStatementRecord(account?.id);

  return Object.entries(accountStatements.periods || {})
    .flatMap(([periodKey, movements]) => (Array.isArray(movements) ? movements : [])
      .map((movement) => ({ periodKey, movement })))
    .filter((item) => item.movement?.date)
    .sort((left, right) => {
      const dateDiff = String(right.movement.date).localeCompare(String(left.movement.date));
      return dateDiff || String(right.periodKey).localeCompare(String(left.periodKey));
    });
}

function isMovementSearchItemInScope(item, mode) {
  if (mode === "monthly") {
    return item.periodKey === getSelectedPeriod();
  }

  if (mode === "year") {
    return item.periodKey.startsWith(`${selectedYear}-`);
  }

  if (mode !== "range") {
    return true;
  }

  const startDate = movementSearchStartDate?.value || "";
  const endDate = movementSearchEndDate?.value || "";
  const movementDate = item.movement?.date || "";

  return (!startDate || movementDate >= startDate) && (!endDate || movementDate <= endDate);
}

function createMovementSearchResultCard(item) {
  const movement = item.movement || {};
  const amount = Number(movement.amount || 0);
  const amountType = amount >= 0 ? "credit" : "debit";
  const internalBadge = movement.excludedFromAccounting ? `
    <span class="movement-meta-badge">Movimento interno · excluído da contabilidade</span>
  ` : "";

  return `
    <article class="movement-search-result">
      <div class="movement-search-result-copy">
        <span class="card-label">${escapeHtml(formatDate(movement.date))} · ${escapeHtml(formatPeriodLabel(item.periodKey))}</span>
        <strong>${escapeHtml(movement.description || "Movimento")}</strong>
        ${internalBadge}
      </div>
      <strong class="money-figure movement-analysis-amount movement-analysis-amount-${amountType}">
        ${escapeHtml(formatCurrency(amount))}
      </strong>
    </article>
  `;
}

function renderMovementAnalysisModal() {
  const movements = Array.isArray(getMovementsForPeriod(getSelectedPeriod()))
    ? getMovementsForPeriod(getSelectedPeriod())
    : [];
  const credits = movements
    .filter((movement) => movement && Number(movement.amount || 0) > 0)
    .sort((left, right) => Number(right.amount || 0) - Number(left.amount || 0));
  const debits = movements
    .filter((movement) => movement && Number(movement.amount || 0) < 0)
    .sort((left, right) => Math.abs(Number(right.amount || 0)) - Math.abs(Number(left.amount || 0)));

  const creditsTotal = credits.reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const debitsTotal = debits.reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0);
  const excludedCredits = credits
    .filter((movement) => movement.excludedFromAccounting)
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const excludedDebits = debits
    .filter((movement) => movement.excludedFromAccounting)
    .reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0);
  const accountingCredits = creditsTotal - excludedCredits;
  const accountingDebits = debitsTotal - excludedDebits;

  if (movementAnalysisSubtitle) {
    movementAnalysisSubtitle.textContent = `Leitura rápida de ${formatPeriodLabel(getSelectedPeriod())}, ordenada do valor mais alto para o mais baixo.`;
  }

  if (movementAnalysisCreditsTotal) {
    movementAnalysisCreditsTotal.textContent = formatCurrency(creditsTotal);
  }

  if (movementAnalysisDebitsTotal) {
    movementAnalysisDebitsTotal.textContent = formatCurrency(debitsTotal);
  }

  if (movementAnalysisCreditsExcluded) {
    movementAnalysisCreditsExcluded.textContent = `Excluídos: ${formatCurrency(excludedCredits)}`;
  }

  if (movementAnalysisDebitsExcluded) {
    movementAnalysisDebitsExcluded.textContent = `Excluídos: ${formatCurrency(excludedDebits)}`;
  }

  if (movementAnalysisCreditsAccounting) {
    movementAnalysisCreditsAccounting.textContent = `Contabilizado: ${formatCurrency(accountingCredits)}`;
  }

  if (movementAnalysisDebitsAccounting) {
    movementAnalysisDebitsAccounting.textContent = `Contabilizado: ${formatCurrency(accountingDebits)}`;
  }

  if (movementAnalysisCreditsCount) {
    movementAnalysisCreditsCount.textContent = `${credits.length}`;
  }

  if (movementAnalysisDebitsCount) {
    movementAnalysisDebitsCount.textContent = `${debits.length}`;
  }

  if (movementAnalysisCreditsList) {
    movementAnalysisCreditsList.innerHTML = credits.length > 0
      ? credits.map((movement) => createMovementAnalysisCard(movement, "credit")).join("")
      : createMovementAnalysisEmptyState("Sem créditos neste mês.");
  }

  if (movementAnalysisDebitsList) {
    movementAnalysisDebitsList.innerHTML = debits.length > 0
      ? debits.map((movement) => createMovementAnalysisCard(movement, "debit")).join("")
      : createMovementAnalysisEmptyState("Sem débitos neste mês.");
  }
}

function buildMonthlyPdfReportData(periodKey) {
  const movements = Array.isArray(getMovementsForPeriod(periodKey))
    ? getMovementsForPeriod(periodKey)
    : [];
  const accountingMovements = getAccountingMovements(movements);
  const finalBalanceMovement = getMonthlyFinalBalanceMovement(movements);
  const availableBalance = Number(finalBalanceMovement?.balance || 0);
  const totalBalance = getCurrentBalanceForPeriod(periodKey) ?? availableBalance;
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
  const products = account?.financialProductsByPeriod?.[periodKey] || [];
  const regularProducts = products.filter((product) => normalizeFinancialProductKind(product.kind) === "financial");
  const fundProducts = products.filter((product) => normalizeFinancialProductKind(product.kind) === "fund");
  const pprProducts = products.filter((product) => normalizeFinancialProductKind(product.kind) === "ppr");
  const recurringRows = getMovementRules(periodKey)
    .map((entry) => {
      const matchedMovements = getTrackedMovements(entry, periodKey)
        .filter((movement) => Number(movement.amount || 0) < 0);

      return {
        label: entry.label || "Despesa recorrente",
        keyword: entry.matchText || "",
        count: matchedMovements.length,
        total: matchedMovements.reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0),
      };
    });

  return {
    bankName: account?.bankName || "Conta bancária",
    periodKey,
    periodLabel: formatPeriodLabel(periodKey),
    generatedAt: new Intl.DateTimeFormat("pt-PT", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date()),
    symbol: account?.symbol || "",
    totalBalance,
    availableBalance,
    statementFinalBalance: availableBalance,
    credits,
    debits,
    net: credits - debits,
    excludedCredits,
    excludedDebits,
    regularProducts,
    fundProducts,
    pprProducts,
    regularProductsTotal: regularProducts.reduce((sum, product) => sum + Number(product.value || 0), 0),
    fundProductsTotal: fundProducts.reduce((sum, product) => sum + Number(product.value || 0), 0),
    pprProductsTotal: pprProducts.reduce((sum, product) => sum + Number(product.value || 0), 0),
    recurringRows,
    movements,
  };
}

function buildAnnualPdfReportData(cutoffMonth) {
  const reportSummary = createAnnualReportSummary(cutoffMonth);
  const recurringTotals = getAnnualRecurringTotals(cutoffMonth);
  const totalRecurringValue = recurringTotals.reduce((sum, item) => sum + item.total, 0);
  const selectedPeriodKey = `${selectedYear}-${selectedMonth}`;
  const currentProducts = account?.financialProductsByPeriod?.[selectedPeriodKey] || [];
  const regularProducts = currentProducts.filter((product) => normalizeFinancialProductKind(product.kind) === "financial");
  const fundProducts = currentProducts.filter((product) => normalizeFinancialProductKind(product.kind) === "fund");
  const pprProducts = currentProducts.filter((product) => normalizeFinancialProductKind(product.kind) === "ppr");
  const months = Array.from({ length: cutoffMonth }, (_, index) => index + 1).map((monthNumber) => {
    const periodKey = `${selectedYear}-${String(monthNumber).padStart(2, "0")}`;
    const movements = getAccountingMovements(getMovementsForPeriod(periodKey));
    const credits = movements
      .filter((movement) => movement.amount > 0)
      .reduce((sum, movement) => sum + movement.amount, 0);
    const debits = movements
      .filter((movement) => movement.amount < 0)
      .reduce((sum, movement) => sum + Math.abs(movement.amount), 0);
    const availableBalance = Number(getMonthlyFinalBalanceMovement(getMovementsForPeriod(periodKey))?.balance || 0);
    const totalBalance = getCurrentBalanceForPeriod(periodKey) ?? availableBalance;

    return {
      periodKey,
      monthLabel: formatMonthShort(String(monthNumber).padStart(2, "0")),
      credits,
      debits,
      net: credits - debits,
      availableBalance,
      totalBalance,
    };
  });

  return {
    bankName: account?.bankName || "Conta bancária",
    year: selectedYear,
    cutoffMonth,
    cutoffLabel: formatMonthShort(selectedMonth),
    generatedAt: new Intl.DateTimeFormat("pt-PT", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date()),
    symbol: account?.symbol || "",
    credits: reportSummary.credits,
    expenses: reportSummary.expenses,
    net: reportSummary.credits - reportSummary.expenses,
    recurringTotal: totalRecurringValue,
    topRecurring: recurringTotals[0] || null,
    recurringShare: reportSummary.expenses > 0 ? Math.round((totalRecurringValue / reportSummary.expenses) * 100) : 0,
    recurringCoverage: recurringTotals.length,
    regularProducts,
    fundProducts,
    pprProducts,
    regularProductsTotal: regularProducts.reduce((sum, product) => sum + Number(product.value || 0), 0),
    fundProductsTotal: fundProducts.reduce((sum, product) => sum + Number(product.value || 0), 0),
    pprProductsTotal: pprProducts.reduce((sum, product) => sum + Number(product.value || 0), 0),
    months,
    recurringTotals,
  };
}

function createMonthlyPdfReportMarkup(report) {
  const symbolMarkup = report.symbol
    ? `<img class="pdf-report-symbol" src="${escapeHtmlAttribute(report.symbol)}" alt="Símbolo de ${escapeHtmlAttribute(report.bankName)}" />`
    : `<div class="pdf-report-symbol pdf-report-symbol-fallback">${escapeHtml(report.bankName.slice(0, 2).toUpperCase())}</div>`;
  const recurringMarkup = report.recurringRows.length > 0
    ? `
      <section class="pdf-report-section">
        <h2>Despesas recorrentes</h2>
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
            ${report.recurringRows.map((entry) => `
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
  const regularProductsMarkup = report.regularProducts.length > 0
    ? report.regularProducts.map((product) => `
        <tr>
          <td>${escapeHtml(product.name)}</td>
          <td class="pdf-report-number">${escapeHtml(formatCurrency(product.value || 0))}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="2" class="pdf-report-empty-cell">Sem poupanças neste mês.</td></tr>`;
  const fundProductsMarkup = report.fundProducts.length > 0
    ? report.fundProducts.map((product) => `
        <tr>
          <td>${escapeHtml(product.name)}</td>
          <td class="pdf-report-number">${escapeHtml(formatCurrency(product.value || 0))}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="2" class="pdf-report-empty-cell">Sem fundos de investimento neste mês.</td></tr>`;
  const pprProductsMarkup = report.pprProducts.length > 0
    ? report.pprProducts.map((product) => `
        <tr>
          <td>${escapeHtml(product.name)}</td>
          <td class="pdf-report-number">${escapeHtml(formatCurrency(product.value || 0))}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="2" class="pdf-report-empty-cell">Sem PPRs neste mês.</td></tr>`;
  const movementsMarkup = report.movements.length > 0
    ? report.movements.map((movement) => `
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
    <!doctype html>
    <html lang="pt-PT">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Relatório ${escapeHtml(report.bankName)} · ${escapeHtml(report.periodLabel)}</title>
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
            padding: 32px;
            font-family: "Avenir Next", "Segoe UI", Arial, sans-serif;
            color: var(--ink);
            background: white;
          }
          .pdf-report-shell {
            max-width: 1120px;
            margin: 0 auto;
          }
          .pdf-report-header {
            display: flex;
            justify-content: space-between;
            gap: 24px;
            align-items: flex-start;
            padding-bottom: 24px;
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
          .pdf-report-header h1 {
            margin: 0;
            font-size: 2rem;
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
            margin-top: 24px;
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
            gap: 24px;
            margin-top: 24px;
          }
          .pdf-report-grid-two {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .pdf-report-grid-three {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
          }
          .pdf-report-section h2 {
            margin: 0 0 12px;
            font-size: 1.12rem;
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
          .pdf-report-footer {
            margin-top: 28px;
            padding-top: 18px;
            border-top: 1px solid var(--line);
            color: var(--muted);
            font-size: 0.84rem;
          }
          @media print {
            body { padding: 16px; }
            .pdf-report-shell { max-width: none; }
          }
        </style>
      </head>
      <body>
        <main class="pdf-report-shell">
          <header class="pdf-report-header">
            <div class="pdf-report-brand">
              ${symbolMarkup}
              <div>
                <p class="pdf-report-kicker">Gestão Financeira NL</p>
                <h1>${escapeHtml(report.bankName)}</h1>
                <p class="pdf-report-subtitle">Relatório mensal de ${escapeHtml(report.periodLabel)}</p>
                <p class="pdf-report-meta">Gerado em ${escapeHtml(report.generatedAt)}</p>
              </div>
            </div>
          </header>

          <section class="pdf-report-summary">
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Saldo total</span>
              <strong>${escapeHtml(formatCurrency(report.totalBalance))}</strong>
              <div class="pdf-report-card-note">Inclui poupanças, fundos e PPR</div>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Saldo disponível</span>
              <strong>${escapeHtml(formatCurrency(report.availableBalance))}</strong>
              <div class="pdf-report-card-note">Sem carteira associada</div>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Créditos</span>
              <strong>${escapeHtml(formatCurrency(report.credits))}</strong>
              <div class="pdf-report-card-note">Excluídos: ${escapeHtml(formatCurrency(report.excludedCredits))}</div>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Débitos</span>
              <strong>${escapeHtml(formatCurrency(report.debits))}</strong>
              <div class="pdf-report-card-note">Excluídos: ${escapeHtml(formatCurrency(report.excludedDebits))}</div>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Poupanças</span>
              <strong>${escapeHtml(formatCurrency(report.regularProductsTotal))}</strong>
              <div class="pdf-report-card-note">${report.regularProducts.length} ${report.regularProducts.length === 1 ? "linha" : "linhas"}</div>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Fundos</span>
              <strong>${escapeHtml(formatCurrency(report.fundProductsTotal))}</strong>
              <div class="pdf-report-card-note">${report.fundProducts.length} ${report.fundProducts.length === 1 ? "linha" : "linhas"}</div>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">PPR</span>
              <strong>${escapeHtml(formatCurrency(report.pprProductsTotal))}</strong>
              <div class="pdf-report-card-note">${report.pprProducts.length} ${report.pprProducts.length === 1 ? "linha" : "linhas"}</div>
            </article>
          </section>

          <div class="pdf-report-sections">
            <div class="pdf-report-grid-three">
              <section class="pdf-report-section">
                <h2>Poupanças</h2>
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
                <h2>Fundos de investimento</h2>
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
                <h2>PPR</h2>
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
              <h2>Movimentos do extrato</h2>
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

          <footer class="pdf-report-footer">
            Relatório preparado para impressão ou guardar em PDF a partir da janela do navegador.
          </footer>
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

function createAnnualPdfReportMarkup(report) {
  const symbolMarkup = report.symbol
    ? `<img class="pdf-report-symbol" src="${escapeHtmlAttribute(report.symbol)}" alt="Símbolo de ${escapeHtmlAttribute(report.bankName)}" />`
    : `<div class="pdf-report-symbol pdf-report-symbol-fallback">${escapeHtml(report.bankName.slice(0, 2).toUpperCase())}</div>`;
  const monthsMarkup = report.months.length > 0
    ? report.months.map((item) => `
      <tr>
        <td>${escapeHtml(item.monthLabel)}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(item.credits))}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(item.debits))}</td>
        <td class="pdf-report-number ${item.net >= 0 ? "is-positive" : "is-negative"}">${escapeHtml(formatCurrency(item.net))}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(item.availableBalance))}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(item.totalBalance))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="6" class="pdf-report-empty-cell">Sem meses com dados neste ano.</td></tr>`;
  const recurringMarkup = report.recurringTotals.length > 0
    ? report.recurringTotals.map((item) => `
      <tr>
        <td>${escapeHtml(item.label)}</td>
        <td>${item.occurrences}</td>
        <td>${item.count}/${item.selectedCount}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(item.currentMonthTotal))}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(item.averageMonthly))}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(item.total))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="6" class="pdf-report-empty-cell">Sem despesas recorrentes acumuladas neste ano.</td></tr>`;
  const regularProductsMarkup = report.regularProducts.length > 0
    ? report.regularProducts.map((product) => `
      <tr>
        <td>${escapeHtml(product.name)}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(product.value || 0))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="2" class="pdf-report-empty-cell">Sem poupanças no mês selecionado.</td></tr>`;
  const fundProductsMarkup = report.fundProducts.length > 0
    ? report.fundProducts.map((product) => `
      <tr>
        <td>${escapeHtml(product.name)}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(product.value || 0))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="2" class="pdf-report-empty-cell">Sem fundos de investimento no mês selecionado.</td></tr>`;
  const pprProductsMarkup = report.pprProducts.length > 0
    ? report.pprProducts.map((product) => `
      <tr>
        <td>${escapeHtml(product.name)}</td>
        <td class="pdf-report-number">${escapeHtml(formatCurrency(product.value || 0))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="2" class="pdf-report-empty-cell">Sem PPRs no mês selecionado.</td></tr>`;

  return `
    <!doctype html>
    <html lang="pt-PT">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Relatório anual ${escapeHtml(report.bankName)} · ${escapeHtml(report.year)}</title>
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
            padding: 32px;
            font-family: "Avenir Next", "Segoe UI", Arial, sans-serif;
            color: var(--ink);
            background: white;
          }
          .pdf-report-shell { max-width: 1120px; margin: 0 auto; }
          .pdf-report-header {
            display: flex;
            justify-content: space-between;
            gap: 24px;
            align-items: flex-start;
            padding-bottom: 24px;
            border-bottom: 2px solid var(--line-strong);
          }
          .pdf-report-brand { display: flex; gap: 18px; align-items: center; }
          .pdf-report-symbol {
            width: 82px; height: 82px; border-radius: 24px; object-fit: cover; border: 1px solid #dbe5f2;
          }
          .pdf-report-symbol-fallback {
            display: grid; place-items: center; font-weight: 800; letter-spacing: 0.08em; background: var(--blue-soft); color: var(--blue);
          }
          .pdf-report-kicker {
            margin: 0 0 8px; color: var(--blue); font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em;
          }
          .pdf-report-header h1 { margin: 0; font-size: 2rem; line-height: 1.05; }
          .pdf-report-subtitle, .pdf-report-meta { margin: 6px 0 0; color: var(--muted); }
          .pdf-report-summary {
            display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 24px;
          }
          .pdf-report-card {
            padding: 16px; border: 1px solid var(--line); border-radius: 18px; background: #fbfdff;
            min-height: 132px;
          }
          .pdf-report-card-label {
            display: block; color: var(--muted); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; line-height: 1.28;
          }
          .pdf-report-card strong {
            display: block; margin-top: 12px; font-size: 1.18rem; line-height: 1.18; font-family: "Manrope", "Avenir Next", "Segoe UI", sans-serif; font-variant-numeric: tabular-nums; overflow-wrap: anywhere;
          }
          .pdf-report-card-note { margin-top: 8px; color: var(--muted); font-size: 0.84rem; }
          .pdf-report-sections { display: grid; gap: 24px; margin-top: 24px; }
          .pdf-report-grid-two { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
          .pdf-report-grid-three { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
          .pdf-report-section h2 { margin: 0 0 12px; font-size: 1.12rem; }
          .pdf-report-table {
            width: 100%; border-collapse: collapse; border: 1px solid var(--line); border-radius: 18px; overflow: hidden;
          }
          .pdf-report-table th, .pdf-report-table td {
            padding: 12px 14px; border-bottom: 1px solid var(--line); vertical-align: top; text-align: left; font-size: 0.95rem;
          }
          .pdf-report-table thead th {
            background: var(--blue-soft); color: var(--blue); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          }
          .pdf-report-table tbody tr:last-child td { border-bottom: none; }
          .pdf-report-number {
            text-align: right !important; white-space: nowrap; font-family: "Manrope", "Avenir Next", "Segoe UI", sans-serif; font-variant-numeric: tabular-nums;
          }
          .pdf-report-empty-cell { color: var(--muted); text-align: center !important; }
          .is-positive { color: var(--green); }
          .is-negative { color: var(--red); }
          @media print {
            body { padding: 16px; }
            .pdf-report-shell { max-width: none; }
          }
        </style>
      </head>
      <body>
        <main class="pdf-report-shell">
          <header class="pdf-report-header">
            <div class="pdf-report-brand">
              ${symbolMarkup}
              <div>
                <p class="pdf-report-kicker">Gestão Financeira NL</p>
                <h1>${escapeHtml(report.bankName)}</h1>
                <p class="pdf-report-subtitle">Relatório anual de ${escapeHtml(report.year)} até ${escapeHtml(report.cutoffLabel)}</p>
                <p class="pdf-report-meta">Gerado em ${escapeHtml(report.generatedAt)}</p>
              </div>
            </div>
          </header>

          <section class="pdf-report-summary">
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Créditos acumulados</span>
              <strong>${escapeHtml(formatCurrency(report.credits))}</strong>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Débitos acumulados</span>
              <strong>${escapeHtml(formatCurrency(report.expenses))}</strong>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Saldo líquido</span>
              <strong class="${report.net >= 0 ? "is-positive" : "is-negative"}">${escapeHtml(formatCurrency(report.net))}</strong>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Despesas recorrentes</span>
              <strong>${escapeHtml(formatCurrency(report.recurringTotal))}</strong>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Peso nos débitos</span>
              <strong>${report.recurringShare}%</strong>
            </article>
            <article class="pdf-report-card">
              <span class="pdf-report-card-label">Linhas acompanhadas</span>
              <strong>${report.recurringCoverage}</strong>
              <div class="pdf-report-card-note">${report.topRecurring ? escapeHtml(`${report.topRecurring.label} · ${formatCurrency(report.topRecurring.total)}`) : "Sem dados"}</div>
            </article>
          </section>

          <div class="pdf-report-sections">
            <section class="pdf-report-section">
              <h2>Evolução mês a mês</h2>
              <table class="pdf-report-table">
                <thead>
                  <tr>
                    <th>Mês</th>
                    <th>Créditos</th>
                    <th>Débitos</th>
                    <th>Saldo líquido</th>
                    <th>Saldo disponível</th>
                    <th>Saldo total</th>
                  </tr>
                </thead>
                <tbody>${monthsMarkup}</tbody>
              </table>
            </section>

            <div class="pdf-report-grid-three">
              <section class="pdf-report-section">
                <h2>Poupanças do mês selecionado</h2>
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
                <h2>Fundos de investimento do mês selecionado</h2>
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
                <h2>PPR do mês selecionado</h2>
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

            <section class="pdf-report-section">
              <h2>Despesas recorrentes acumuladas</h2>
              <table class="pdf-report-table">
                <thead>
                  <tr>
                    <th>Despesa</th>
                    <th>Movimentos</th>
                    <th>Meses</th>
                    <th>Este mês</th>
                    <th>Média</th>
                    <th>Acumulado</th>
                  </tr>
                </thead>
                <tbody>${recurringMarkup}</tbody>
              </table>
            </section>
          </div>

          <script>
            window.addEventListener("load", () => {
              setTimeout(() => window.print(), 250);
            });
          </script>
        </main>
      </body>
    </html>
  `;
}

function createMovementAnalysisCard(movement, type) {
  const safeMovement = movement || {};
  const meta = typeof formatMovementMeta === "function"
    ? formatMovementMeta(safeMovement)
    : "";
  const internalBadge = safeMovement.excludedFromAccounting ? `
    <span class="movement-meta-badge">Movimento interno · excluído da contabilidade</span>
  ` : "";

  return `
    <article class="movement-analysis-item">
      <div class="movement-analysis-item-copy">
        <span class="card-label">${escapeHtml(meta)}</span>
        <strong>${escapeHtml(safeMovement.description || "Movimento")}</strong>
        ${internalBadge}
        <p>Saldo: ${escapeHtml(formatCurrency(Number(safeMovement.balance || 0)))}</p>
      </div>
      <strong class="money-figure movement-analysis-amount movement-analysis-amount-${type}">
        ${escapeHtml(formatCurrency(Number(safeMovement.amount || 0)))}
      </strong>
    </article>
  `;
}

function createMovementAnalysisEmptyState(message) {
  return `
    <div class="empty-state movement-analysis-empty-state">
      <strong>${escapeHtml(message)}</strong>
    </div>
  `;
}

function showStatementFeedback(message, autoHide = false, tone = "success") {
  if (!statementToast) {
    return;
  }

  if (statementToastTimer) {
    window.clearTimeout(statementToastTimer);
    statementToastTimer = null;
  }

  statementToast.textContent = message;
  statementToast.classList.remove("hidden", "is-success", "is-error");
  statementToast.classList.add(tone === "error" ? "is-error" : "is-success");

  if (autoHide) {
    statementToastTimer = window.setTimeout(() => {
      statementToastTimer = null;
      statementToast.classList.add("hidden");
      statementToast.classList.remove("is-success", "is-error");
    }, 3000);
  }
}

function deleteStatementForSelectedPeriod() {
  if (!account) {
    return;
  }

  const periodKey = getSelectedPeriod();
  const accountStatements = getAccountStatementRecord(account.id);
  const deletedMovements = [...(accountStatements.periods[periodKey] || [])];
  const deletedStatementText = accountStatements.statementTexts?.[periodKey] || "";
  const previousLastImportedPeriod = accountStatements.lastImportedPeriod;
  const previousBalance = Number(account.balance || 0);

  const action = {
    type: "delete-statement",
    accountId: account.id,
    periodKey,
    deletedMovements,
    deletedStatementText,
    previousLastImportedPeriod,
    previousBalance,
  };

  applyAccountHistoryAction(action, "redo");
  pushHistoryAction(action);
  showUndoToast(`Extrato de ${formatPeriodLabel(periodKey)} apagado.`, executeUndo);
}

function createMovementCard(movement) {
  const amountClass = movement.amount >= 0 ? "movement-positive" : "movement-negative";
  const internalBadge = movement.excludedFromAccounting ? `
    <span class="movement-meta-badge">Movimento interno · excluído da contabilidade</span>
  ` : "";

  return `
    <article class="movement-card">
      <div>
        <span class="card-label">${formatDate(movement.date)}</span>
        <strong>${escapeHtml(movement.description)}</strong>
        ${internalBadge}
      </div>
      <div class="movement-values">
        <span class="money-figure ${amountClass}">${formatCurrency(movement.amount)}</span>
        <span class="movement-balance">Saldo: ${formatCurrency(movement.balance)}</span>
      </div>
    </article>
  `;
}

function renderFinancialProducts() {
  const products = getFinancialProductsForSelectedPeriod();
  const savingsProducts = products.filter((product) => normalizeFinancialProductKind(product.kind) === "financial");
  const fundProducts = products.filter((product) => normalizeFinancialProductKind(product.kind) === "fund");
  const pprProducts = products.filter((product) => normalizeFinancialProductKind(product.kind) === "ppr");
  const total = getFinancialProductsTotal();

  financialProductsEmptyState.classList.toggle("hidden", products.length > 0);
  financialProductsList.classList.toggle("hidden", products.length === 0);
  financialProductsRegularList.innerHTML = savingsProducts.length > 0
    ? savingsProducts.map((product) => createFinancialProductRow(product)).join("")
    : `<p class="financial-products-group-empty">Sem poupanças neste mês.</p>`;
  if (financialProductsFundsList) {
    financialProductsFundsList.innerHTML = fundProducts.length > 0
      ? fundProducts.map((product) => createFinancialProductRow(product)).join("")
      : `<p class="financial-products-group-empty">Sem fundos de investimento neste mês.</p>`;
  }
  financialProductsPprList.innerHTML = pprProducts.length > 0
    ? pprProducts.map((product) => createFinancialProductRow(product)).join("")
    : `<p class="financial-products-group-empty">Sem PPRs neste mês.</p>`;
  financialProductsTotal.textContent = formatCurrency(total);
}

function renderAccountTrendChart() {
  if (!accountTrendChart) {
    return;
  }

  const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const values = monthLabels.map((_, index) => {
    const periodKey = `${selectedYear}-${String(index + 1).padStart(2, "0")}`;
    return getCurrentBalanceForPeriod(periodKey);
  });

  accountTrendYearLabel.textContent = selectedYear;
  renderAccountLineChart(accountTrendChart, monthLabels, values, selectedMonth);
}

function openFinancialProductModal() {
  editingFinancialProductId = null;
  financialProductForm.reset();
  financialProductIdField.value = "";
  financialProductKindField.value = "financial";
  financialProductSubmitLabel.textContent = "Guardar produto";
  financialProductsFeedback.textContent = "";
  financialProductModal.classList.remove("hidden");
  setPageScrollLock(true);
}

function closeFinancialProductEntry() {
  editingFinancialProductId = null;
  financialProductForm.reset();
  financialProductIdField.value = "";
  financialProductSubmitLabel.textContent = "Guardar produto";
  financialProductModal.classList.add("hidden");
  setPageScrollLock(false);
}

function handleFinancialProductSubmit(event) {
  event.preventDefault();

  if (!account) {
    return;
  }

  const formData = new FormData(financialProductForm);
  const productId = formData.get("financialProductId").toString().trim();
  const kind = normalizeFinancialProductKind(formData.get("financialProductKind").toString());
  const name = formData.get("financialProductName").toString().trim();
  const value = parseMoney(formData.get("financialProductValue").toString());

  if (!name) {
    return;
  }

  const periodKey = getSelectedPeriod();
  const currentProducts = getFinancialProductsForSelectedPeriod();
  const existingProduct = currentProducts.find((product) => product.id === productId);

  account.financialProductsByPeriod[periodKey] = productId
    ? currentProducts.map((product) => (product.id === productId ? {
      ...product,
      kind,
      name,
      value,
    } : product))
    : [
      ...currentProducts,
      {
        id: crypto.randomUUID(),
        kind,
        name,
        value,
      },
    ];

  saveAccountsSnapshot();
  financialProductsFeedback.textContent = "";
  closeFinancialProductEntry();
  addActivityEntry({
    title: productId ? "Produto financeiro editado" : "Produto financeiro criado",
    description: productId
      ? `${account.bankName}: ${existingProduct?.name || name} foi atualizado em ${formatPeriodLabel(periodKey)}.`
      : `${account.bankName}: ${name} foi criado em ${formatPeriodLabel(periodKey)}.`,
  });
  renderFinancialProducts();
  renderAccount();
  renderMonth();
  renderAccountTrendChart();
}

function createFinancialProductRow(product) {
  return `
    <article class="financial-product-row">
      <div class="financial-product-copy">
        <strong>${escapeHtml(product.name)}</strong>
      </div>
      <div class="financial-product-actions">
        <span class="money-figure">${formatCurrency(product.value)}</span>
        <div class="financial-product-menu-wrap">
          <button
            type="button"
            class="menu-button financial-row-menu-button"
            data-financial-product-menu-toggle="${product.id}"
            aria-label="Abrir menu do produto"
          >
            ...
          </button>
          <div class="financial-product-menu hidden" data-financial-product-menu-id="${product.id}">
            <button
              type="button"
              class="menu-item menu-item-neutral"
              data-view-financial-product-chart-id="${product.id}"
            >
              <span class="menu-item-icon" aria-hidden="true">📈</span>
              <span>Gráfico</span>
            </button>
            <button
              type="button"
              class="menu-item menu-item-neutral"
              data-edit-financial-product-id="${product.id}"
            >
              <span class="menu-item-icon" aria-hidden="true">📝</span>
              <span>Editar</span>
            </button>
            <button
              type="button"
              class="menu-item"
              data-delete-financial-product-id="${product.id}"
            >
              <span class="menu-item-icon" aria-hidden="true">🗑</span>
              <span>Apagar</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderAccountLineChart(container, labels, values, activeMonth) {
  const availablePoints = values
    .map((value, index) => ({ value, index }))
    .filter((point) => point.value !== null);

  if (availablePoints.length === 0) {
    container.innerHTML = `<div class="chart-empty">Ainda não há extratos neste ano para desenhar a evolução da conta.</div>`;
    return;
  }

  const width = Math.max(Math.round(container.clientWidth || 0), 680);
  const height = 220;
  const padding = { top: 18, right: 22, bottom: 30, left: 22 };
  const minValue = Math.min(...availablePoints.map((point) => point.value));
  const maxValue = Math.max(...availablePoints.map((point) => point.value));
  const chartMin = minValue <= 0 ? Math.min(0, minValue) : minValue * 0.94;
  const chartMax = maxValue <= 0 ? maxValue * 0.94 : maxValue * 1.04;
  const range = chartMax - chartMin || 1;
  const innerHeight = height - padding.top - padding.bottom;
  const monthPositions = getMonthAxisPositions(container, width, labels.length, padding);
  const points = values.map((value, index) => {
    const x = monthPositions[index];

    if (value === null) {
      return { x, y: null, value };
    }

    const normalized = (value - chartMin) / range;
    const y = padding.top + innerHeight - normalized * innerHeight;
    return { x, y, value };
  });

  const pathParts = [];
  let segment = [];

  points.forEach((point) => {
    if (point.y === null) {
      if (segment.length > 0) {
        pathParts.push(segment);
        segment = [];
      }
      return;
    }

    segment.push(point);
  });

  if (segment.length > 0) {
    pathParts.push(segment);
  }

  const linePaths = pathParts
    .map((part) => part.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" "))
    .join(" ");

  container.innerHTML = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">
      ${[0, 0.5, 1].map((step) => {
        const y = padding.top + innerHeight - step * innerHeight;
        return `<line class="chart-grid-line" x1="${points[0].x}" y1="${y}" x2="${points[points.length - 1].x}" y2="${y}"></line>`;
      }).join("")}
      <text class="chart-value-label" x="${points[0].x}" y="${padding.top - 2}" text-anchor="start">${formatCompactEuro(maxValue)}</text>
      <text class="chart-value-label" x="${points[0].x}" y="${height - padding.bottom - 6}" text-anchor="start">${formatCompactEuro(minValue)}</text>
      <path class="chart-line" d="${linePaths}"></path>
      ${points.map((point, index) => {
        if (point.y === null) {
          return "";
        }

        const isActive = String(index + 1).padStart(2, "0") === activeMonth;
        const pointClass = isActive ? "chart-point chart-point-active" : "chart-point";
        return `<circle class="${pointClass}" cx="${point.x}" cy="${point.y}" r="${isActive ? 5 : 4}"></circle>`;
      }).join("")}
      ${labels.map((label, index) => {
        const x = monthPositions[index];
        const labelClass = String(index + 1).padStart(2, "0") === activeMonth
          ? "chart-axis-label chart-axis-label-active"
          : "chart-axis-label";
        return `<text class="${labelClass}" x="${x}" y="${height - 8}" text-anchor="middle">${label}</text>`;
      }).join("")}
    </svg>
  `;
}

function renderFinancialProductHistoryChart(container, labels, values) {
  const availablePoints = values
    .map((value, index) => ({ value, index }))
    .filter((point) => point.value !== null);

  if (availablePoints.length === 0) {
    container.innerHTML = `<div class="chart-empty">Ainda não existem meses suficientes para desenhar a evolução desta aplicação.</div>`;
    return;
  }

  const width = Math.max(Math.round(container.clientWidth || 0), 820);
  const height = 260;
  const padding = { top: 22, right: 16, bottom: 38, left: 16 };
  const minValue = Math.min(...availablePoints.map((point) => point.value));
  const maxValue = Math.max(...availablePoints.map((point) => point.value));
  const chartMin = minValue <= 0 ? Math.min(0, minValue) : minValue * 0.94;
  const chartMax = maxValue <= 0 ? maxValue * 0.94 : maxValue * 1.04;
  const range = chartMax - chartMin || 1;
  const innerHeight = height - padding.top - padding.bottom;
  const innerWidth = width - padding.left - padding.right;
  const stepX = labels.length > 1 ? innerWidth / (labels.length - 1) : 0;
  const points = values.map((value, index) => {
    const x = padding.left + stepX * index;
    const normalized = (value - chartMin) / range;
    const y = padding.top + innerHeight - normalized * innerHeight;

    return { x, y, value };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  container.innerHTML = `
    <svg class="chart-svg financial-product-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">
      ${[0, 0.5, 1].map((step) => {
        const y = padding.top + innerHeight - step * innerHeight;
        return `<line class="chart-grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}"></line>`;
      }).join("")}
      <text class="chart-value-label" x="${padding.left}" y="${padding.top - 6}" text-anchor="start">${formatCompactEuro(maxValue)}</text>
      <text class="chart-value-label" x="${padding.left}" y="${height - padding.bottom - 8}" text-anchor="start">${formatCompactEuro(minValue)}</text>
      <path class="chart-line" d="${linePath}"></path>
      ${points.map((point, index) => {
        const pointClass = index === points.length - 1 ? "chart-point chart-point-active" : "chart-point";
        return `<circle class="${pointClass}" cx="${point.x}" cy="${point.y}" r="${index === points.length - 1 ? 5 : 4}"></circle>`;
      }).join("")}
      ${labels.map((label, index) => `
        <text class="chart-axis-label ${index === labels.length - 1 ? "chart-axis-label-active" : ""}" x="${points[index].x}" y="${height - 10}" text-anchor="middle">${label}</text>
      `).join("")}
    </svg>
  `;
}

function copyFinancialProductsFromPreviousMonth() {
  if (!account) {
    return;
  }

  const previousPeriodKey = getPreviousPeriodKey(getSelectedPeriod());
  const previousProducts = account.financialProductsByPeriod[previousPeriodKey] || [];

  financialProductMenu.classList.add("hidden");
  financialProductToggle.setAttribute("aria-expanded", "false");

  if (previousProducts.length === 0) {
    financialProductsFeedback.textContent = "Não existem produtos no mês anterior para copiar.";
    return;
  }

  account.financialProductsByPeriod[getSelectedPeriod()] = previousProducts.map((product) => ({
    ...product,
    id: crypto.randomUUID(),
  }));
  saveAccountsSnapshot();
  financialProductsFeedback.textContent = "Produtos copiados do mês anterior.";
  addActivityEntry({
    title: "Produtos copiados",
    description: `${account.bankName}: os produtos de ${formatPeriodLabel(previousPeriodKey)} foram copiados para ${formatPeriodLabel(getSelectedPeriod())}.`,
  });
  renderFinancialProducts();
  renderAccount();
  renderMonth();
  renderAccountTrendChart();
}

function openEditFinancialProduct(productId) {
  const product = getFinancialProductsForSelectedPeriod().find((item) => item.id === productId);

  if (!product) {
    return;
  }

  editingFinancialProductId = productId;
  financialProductIdField.value = product.id;
  financialProductKindField.value = normalizeFinancialProductKind(product.kind);
  financialProductNameField.value = product.name;
  financialProductValueField.value = formatPlainMoney(product.value);
  financialProductSubmitLabel.textContent = "Guardar alterações";
  financialProductsFeedback.textContent = "";
  closeFinancialProductMenus();
  financialProductModal.classList.remove("hidden");
}

function openFinancialProductChartModalEntry(productId) {
  const product = getFinancialProductsForSelectedPeriod().find((item) => item.id === productId);

  if (!product) {
    return;
  }

  const history = getFinancialProductHistory(product);
  const delta = history.length > 1
    ? Number(history[history.length - 1].value || 0) - Number(history[0].value || 0)
    : 0;

  activeFinancialProductChartId = productId;
  financialProductChartKicker.textContent = `Evolução · ${getFinancialProductKindLabel(product.kind)}`;
  financialProductChartTitle.textContent = product.name;
  financialProductChartSubtitle.textContent = history.length > 0
    ? `Leitura dos ${history.length} ${history.length === 1 ? "mês com registo" : "meses com registo"} desta aplicação.`
    : "Ainda não existem meses com registo para esta aplicação.";
  financialProductChartCurrentValue.textContent = formatCurrency(product.value || 0);
  financialProductChartDeltaValue.textContent = history.length > 1 ? formatSignedCurrency(delta) : formatCurrency(0);
  financialProductChartCount.textContent = `${history.length}`;
  financialProductChartDeltaValue.classList.remove("financial-product-chart-positive", "financial-product-chart-negative");

  if (delta > 0.0001) {
    financialProductChartDeltaValue.classList.add("financial-product-chart-positive");
  } else if (delta < -0.0001) {
    financialProductChartDeltaValue.classList.add("financial-product-chart-negative");
  }

  renderFinancialProductHistoryChart(
    financialProductChartSurface,
    history.map((item) => item.label),
    history.map((item) => item.value),
  );

  closeFinancialProductMenus();
  financialProductChartModal?.classList.remove("hidden");
  setPageScrollLock(true);
}

function closeFinancialProductChartModalEntry() {
  activeFinancialProductChartId = null;
  financialProductChartModal?.classList.add("hidden");
  setPageScrollLock(false);
}

function deleteFinancialProduct(productId) {
  const periodKey = getSelectedPeriod();
  const currentProducts = getFinancialProductsForSelectedPeriod();
  const removedProduct = currentProducts.find((product) => product.id === productId);
  const removedIndex = currentProducts.findIndex((product) => product.id === productId);

  if (!removedProduct) {
    return;
  }

  const action = {
    type: "delete-product",
    accountId: account.id,
    periodKey,
    removedProduct,
    removedIndex,
  };

  applyAccountHistoryAction(action, "redo");
  pushHistoryAction(action);
  showUndoToast(`Produto removido de ${formatPeriodLabel(periodKey)}.`, executeUndo);
}

function toggleFinancialProductMenu(productId) {
  const menu = document.querySelector(`[data-financial-product-menu-id="${productId}"]`);

  if (!menu) {
    return;
  }

  const isHidden = menu.classList.contains("hidden");
  closeFinancialProductMenus();

  if (isHidden) {
    menu.classList.remove("hidden");
  }
}

function closeFinancialProductMenus() {
  document.querySelectorAll("[data-financial-product-menu-id]").forEach((menu) => {
    menu.classList.add("hidden");
  });
}

function closeAllThreeDotMenus() {
  statementMenu.classList.add("hidden");
  statementMenuToggle.setAttribute("aria-expanded", "false");
  trackingMenu?.classList.add("hidden");
  trackingMenuToggle?.setAttribute("aria-expanded", "false");
  financialProductMenu.classList.add("hidden");
  financialProductToggle.setAttribute("aria-expanded", "false");
  closeFinancialProductMenus();
}

function parseStatement(content) {
  const rows = content
    .split(/\r?\n/)
    .map((line) => line.replace(/\r/g, "").trim())
    .filter(Boolean);

  if (rows.length === 0) {
    return [];
  }

  if (looksLikeHeaderlessStatement(rows[0])) {
    return parseHeaderlessStatement(rows);
  }

  const separator = detectSeparator(rows[0]);
  const headers = rows[0].split(separator).map(normalizeHeader);
  const dateIndex = findHeaderIndex(headers, ["data", "date"]);
  const descriptionIndex = findHeaderIndex(headers, ["descricao", "descrição", "movimento", "descricao movimento", "description", "details"]);
  const amountIndex = findHeaderIndex(headers, ["valor", "montante", "amount"]);
  const balanceIndex = findHeaderIndex(headers, ["saldo", "balance"]);

  return rows.slice(1).map((row) => {
    const columns = row.split(separator).map((column) => column.trim());
    return classifyImportedMovement({
      date: normalizeDate(columns[dateIndex] || ""),
      description: columns[descriptionIndex] || "Movimento",
      amount: parseMoney(columns[amountIndex] || "0"),
      balance: parseMoney(columns[balanceIndex] || "0"),
    });
  }).filter((movement) => movement.date);
}

function parseHeaderlessStatement(rows) {
  return rows
    .map((row) => {
      const columns = row.split("\t").map((column) => column.trim()).filter((column) => column !== "");
      const date = normalizeDate(columns[0] || "");
      const hasSecondDate = Boolean(normalizeDate(columns[1] || ""));
      const descriptionStartIndex = hasSecondDate ? 2 : 1;
      const minimumColumnCount = hasSecondDate ? 5 : 4;

      if (!date || columns.length < minimumColumnCount) {
        return null;
      }

      const amountIndex = columns.length - 2;
      const balanceIndex = columns.length - 1;
      const description = columns
        .slice(descriptionStartIndex, amountIndex)
        .join(" ")
        .trim();

      return classifyImportedMovement({
        date,
        description: description || "Movimento",
        amount: parseMoney(columns[amountIndex] || "0"),
        balance: parseMoney(columns[balanceIndex] || "0"),
      });
    })
    .filter((movement) => movement?.date);
}

function classifyImportedMovement(movement) {
  const matchedKeyword = getInternalMovementMatch(movement.description || "");

  return {
    ...movement,
    internalMovement: Boolean(matchedKeyword),
    excludedFromAccounting: Boolean(matchedKeyword),
    internalKeywordMatch: matchedKeyword || "",
    internalClassificationSource: matchedKeyword ? "rule" : "",
  };
}

function looksLikeHeaderlessStatement(firstRow) {
  const columns = firstRow.split("\t").map((column) => column.trim()).filter((column) => column !== "");
  const hasFirstDate = Boolean(normalizeDate(columns[0] || ""));
  const hasSecondDate = Boolean(normalizeDate(columns[1] || ""));

  if (!hasFirstDate) {
    return false;
  }

  if (hasSecondDate) {
    return columns.length >= 5;
  }

  return columns.length >= 4;
}

function detectSeparator(sample) {
  if (sample.includes(";")) {
    return ";";
  }

  if (sample.includes("\t")) {
    return "\t";
  }

  return ",";
}

function findHeaderIndex(headers, candidates) {
  return headers.findIndex((header) => candidates.includes(header));
}

function normalizeHeader(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function normalizeDate(value) {
  const cleaned = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    return cleaned;
  }

  const match = cleaned.match(/^(\d{2})[/-](\d{2})[/-](\d{2}|\d{4})$/);

  if (!match) {
    return "";
  }

  const [, day, month, year] = match;
  const normalizedYear = year.length === 2 ? `20${year}` : year;
  return `${normalizedYear}-${month}-${day}`;
}

function parseMoney(value) {
  const cleaned = value.trim();
  const isNegative = cleaned.includes("(") && cleaned.includes(")");
  const normalized = cleaned
    .replace(/\s/g, "")
    .replace(/[€$()+]/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");

  const amount = Number(normalized);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return isNegative ? -Math.abs(amount) : amount;
}

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function formatPlainMoney(value) {
  return Number(value || 0).toFixed(2).replace(".", ",");
}

function formatCompactEuro(value) {
  return new Intl.NumberFormat("pt-PT", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value) + "€";
}

function getMonthAxisPositions(container, viewBoxWidth, monthCount, padding) {
  const containerRect = container.getBoundingClientRect();
  const shouldFollowMonthChips = !window.matchMedia("(min-width: 1100px)").matches;

  if (shouldFollowMonthChips && containerRect.width > 0 && monthChips.length >= monthCount) {
    return monthChips.slice(0, monthCount).map((chip) => {
      const chipRect = chip.getBoundingClientRect();
      const center = chipRect.left + chipRect.width / 2 - containerRect.left;
      const scaledCenter = (center / containerRect.width) * viewBoxWidth;
      return clamp(scaledCenter, padding.left + 18, viewBoxWidth - padding.right - 18);
    });
  }

  const innerWidth = viewBoxWidth - padding.left - padding.right;
  const step = innerWidth / Math.max(monthCount - 1, 1);

  return Array.from({ length: monthCount }, (_, index) => padding.left + index * step);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
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

function getAvailableYears() {
  const movementYears = Object.keys(getAccountStatementRecord(account?.id).periods)
    .map((period) => Number(period.slice(0, 4)))
    .filter((year) => Number.isFinite(year));
  const baseYear = Number(currentYear);
  const generatedYears = Array.from({ length: 12 }, (_, index) => String(baseYear - index));

  return Array.from(
    new Set([
      ...generatedYears,
      ...movementYears.map((year) => String(year)),
    ]),
  ).sort((a, b) => Number(b) - Number(a));
}

function updateMonthSelection() {
  monthChips.forEach((chip) => {
    const periodKey = `${selectedYear}-${chip.dataset.month}`;
    const hasData = hasVisualContextForPeriod(periodKey);

    chip.classList.toggle("is-active", chip.dataset.month === selectedMonth);
    chip.classList.toggle("is-empty-month", !hasData);
  });
}

function hasVisualContextForPeriod(periodKey) {
  const [year, month] = String(periodKey || "").split("-").map(Number);

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return false;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year === currentYear && month === currentMonth) {
    return true;
  }

  const isFuturePeriod = year > currentYear || (year === currentYear && month > currentMonth);

  if (isFuturePeriod) {
    return false;
  }

  return hasStatementsForPeriod(periodKey)
    || (account?.financialProductsByPeriod?.[periodKey] || []).length > 0
    || getMovementRules(periodKey).length > 0;
}

function renderYearSelector() {
  yearSelect.innerHTML = availableYears
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");
  yearSelect.value = selectedYear;
}

function closeStatementTextEntry() {
  if (statementText) {
    statementText.value = "";
  }
  statementTextModal.classList.add("hidden");
  setPageScrollLock(false);
}

function setPageScrollLock(shouldLock) {
  const hasOpenModal = shouldLock
    || !statementTextModal?.classList.contains("hidden")
    || !movementSearchModal?.classList.contains("hidden")
    || !statementHelpModal?.classList.contains("hidden")
    || !movementAnalysisModal?.classList.contains("hidden")
    || !financialProductModal?.classList.contains("hidden")
    || !financialProductChartModal?.classList.contains("hidden")
    || !movementRulesModal?.classList.contains("hidden")
    || !recurringDetectionModal?.classList.contains("hidden")
    || !annualReportModal?.classList.contains("hidden");
  document.body.classList.toggle("is-locked", hasOpenModal);
}

function handleMovementRuleSubmit(event) {
  event.preventDefault();

  if (!account) {
    return;
  }

  const formData = new FormData(movementRuleForm);
  const ruleId = formData.get("movementRuleId")?.toString().trim();
  const matchText = formData.get("movementRuleMatch")?.toString().trim();
  const label = formData.get("movementRuleLabel")?.toString().trim();
  const amountMatchText = normalizeRecurringAmountSearchInput(formData.get("movementRuleAmountMatch"));
  const amountMatch = isExactRecurringAmountSearch(amountMatchText) ? parseRecurringAmountMatchInput(amountMatchText) : null;
  const excludeFromPending = Boolean(formData.get("movementRuleExcludeFromPending"));
  const manualDueDay = normalizeRecurringManualDueDay(formData.get("movementRuleDueDay"));
  const forecastMode = manualDueDay ? "predictable" : "variable";
  const dueDayMode = manualDueDay ? "manual" : "auto";

  if (!matchText || !label) {
    return;
  }

  const periodKey = getSelectedPeriod();
  const currentEntries = getMovementRules(periodKey);
  const duplicateEntry = findDuplicateMovementRule({
    entries: currentEntries,
    matchText,
    label,
    amountMatchText,
    amountMatch,
    excludedId: ruleId,
  });

  if (duplicateEntry) {
    setMovementRulesFeedback("Já existe uma regra igual ou com o mesmo nome neste mês.", true);
    return;
  }

  const overlappingRule = findOverlappingMovementRule({
    entries: currentEntries,
    matchText,
    label,
    amountMatchText,
    amountMatch,
    excludedId: ruleId,
  });

  if (overlappingRule) {
    setMovementRulesFeedback(createOverlappingMovementRuleMessage(overlappingRule), true);
    return;
  }

  account.movementRulesByPeriod[periodKey] = ruleId
    ? currentEntries.map((rule) => (rule.id === ruleId ? {
      ...rule,
      matchText,
      label,
      amountMatchText,
      amountMatch,
      normalizedMatchText: normalizeDescription(matchText),
      excludeFromPending,
      forecastMode,
      dueDayMode,
      manualDueDay,
    } : rule))
    : [
      ...currentEntries,
      {
        id: crypto.randomUUID(),
        matchText,
        label,
        amountMatchText,
        amountMatch,
        normalizedMatchText: normalizeDescription(matchText),
        excludeFromPending,
        forecastMode,
        dueDayMode,
        manualDueDay,
      },
    ];

  saveAccountsSnapshot();
  addActivityEntry({
    title: ruleId ? "Entrada de acompanhamento editada" : "Entrada de acompanhamento criada",
    description: `${account.bankName}: ${label} ficou configurado nos somatórios de ${formatPeriodLabel(periodKey)}.`,
  });
  setMovementRulesFeedback(ruleId
    ? "Linha atualizada com sucesso."
    : "Linha criada com sucesso.");
  editingMovementRuleId = null;
  movementRuleForm.reset();
  movementRuleIdField.value = "";
  if (movementRuleDueDayField) {
    movementRuleDueDayField.value = "";
  }
  if (movementRuleExcludeFromPendingField) {
    movementRuleExcludeFromPendingField.checked = false;
  }
  movementRuleSubmit.textContent = "Guardar entrada";
  refreshRecurringTrackingUi();
}

function loadJson(key, fallback = []) {
  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));

  if (
    key === ACCOUNTS_STORAGE_KEY
    || key === RECYCLE_STORAGE_KEY
    || key === STATEMENTS_STORAGE_KEY
  ) {
    scheduleExportReminder();
  }
}

function loadStatementsStore() {
  return migrateStatementsStore(loadJson(STATEMENTS_STORAGE_KEY, {}));
}

function saveStatementsStore() {
  saveJson(STATEMENTS_STORAGE_KEY, statementsByAccount);
}

function saveAccountsSnapshot() {
  saveJson(ACCOUNTS_STORAGE_KEY, accounts);
}

function setMovementRulesFeedback(message, isError = false) {
  if (!movementRulesFeedback) {
    return;
  }

  movementRulesFeedback.textContent = message;
  movementRulesFeedback.classList.toggle("is-error", Boolean(isError));
}

function getMovementRules(periodKey = getSelectedPeriod()) {
  return Array.isArray(account?.movementRulesByPeriod?.[periodKey])
    ? account.movementRulesByPeriod[periodKey]
    : [];
}

function findDuplicateMovementRule({
  entries,
  matchText,
  label,
  amountMatchText = "",
  amountMatch = null,
  excludedId = "",
}) {
  const normalizedMatchText = normalizeDescription(matchText);
  const normalizedLabel = normalizeDescription(label);
  const normalizedAmountMatchText = normalizeRecurringAmountSearchInput(amountMatchText);
  const normalizedAmountMatch = normalizeRecurringAmountMatch(amountMatch);

  return (entries || []).find((entry) => {
    if (!entry || (excludedId && entry.id === excludedId)) {
      return false;
    }

    const entryMatch = normalizeDescription(entry.matchText || "");
    const entryLabel = normalizeDescription(entry.label || "");
    const entryAmountMatchText = normalizeRecurringAmountSearchInput(entry.amountMatchText);
    const entryAmountMatch = normalizeRecurringAmountMatch(entry.amountMatch);

    return (
      ((normalizedMatchText && entryMatch === normalizedMatchText) && areRecurringAmountFiltersEquivalent(normalizedAmountMatchText, normalizedAmountMatch, entryAmountMatchText, entryAmountMatch))
      || ((normalizedLabel && entryLabel === normalizedLabel) && areRecurringAmountFiltersEquivalent(normalizedAmountMatchText, normalizedAmountMatch, entryAmountMatchText, entryAmountMatch))
    );
  }) || null;
}

function findMergeableMovementRules({
  entries,
  matchText,
  label,
  amountMatchText = "",
  amountMatch = null,
  excludedId = "",
}) {
  const candidateEntry = {
    id: "__candidate__",
    matchText,
    label,
    amountMatchText,
    amountMatch,
  };
  const candidateMovements = getTrackedMovements(candidateEntry);
  const candidateMovementIds = new Set(candidateMovements.map(createMovementIdentity));

  return (entries || []).filter((entry) => {
    if (!entry || (excludedId && entry.id === excludedId)) {
      return false;
    }

    const exactDuplicate = Boolean(findDuplicateMovementRule({
      entries: [entry],
      matchText,
      label,
      amountMatchText,
      amountMatch,
      excludedId,
    }));

    if (exactDuplicate) {
      return true;
    }

    if (doMovementRuleTextsOverlap(candidateEntry, entry)) {
      return true;
    }

    if (candidateMovementIds.size === 0) {
      return false;
    }

    return getTrackedMovements(entry)
      .some((movement) => candidateMovementIds.has(createMovementIdentity(movement)));
  });
}

function createTrackingEntryIdentity(entry) {
  const normalizedLabel = normalizeDescription(entry?.label || "");
  const normalizedMatchText = normalizeDescription(entry?.matchText || "");
  const normalizedAmountMatchText = normalizeRecurringAmountSearchInput(entry?.amountMatchText || "");
  const normalizedAmountMatch = normalizeRecurringAmountMatch(entry?.amountMatch);

  return [
    normalizedLabel || normalizedMatchText,
    normalizedAmountMatchText || (normalizedAmountMatch !== null ? formatPlainMoney(normalizedAmountMatch) : ""),
  ].filter(Boolean).join("|");
}

function normalizeMovementRule(rule) {
  if (!rule || (!rule.matchText && !rule.label)) {
    return null;
  }

  const amountMatchText = normalizeRecurringAmountSearchInput(
    rule.amountMatchText ?? (rule.amountMatch !== null && rule.amountMatch !== undefined ? formatPlainMoney(rule.amountMatch) : ""),
  );

  return {
    id: rule.id || crypto.randomUUID(),
    matchText: rule.matchText || "",
    label: rule.label || rule.matchText || "",
    amountMatchText,
    amountMatch: normalizeRecurringAmountMatch(rule.amountMatch),
    normalizedMatchText: normalizeDescription(rule.normalizedMatchText || rule.matchText || ""),
    excludeFromPending: Boolean(rule.excludeFromPending),
    forecastMode: normalizeRecurringForecastMode(rule.forecastMode),
    dueDayMode: normalizeRecurringDueDayMode(rule.dueDayMode),
    manualDueDay: normalizeRecurringManualDueDay(rule.manualDueDay),
  };
}

function normalizeRecurringForecastMode(value) {
  return value === "predictable" || value === "variable" ? value : "auto";
}

function normalizeRecurringDueDayMode(value) {
  return value === "manual" ? "manual" : "auto";
}

function shouldExcludeRecurringFromPending(rule) {
  return Boolean(rule?.excludeFromPending);
}

function normalizeRecurringManualDueDay(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return null;
  }

  const rounded = Math.round(numeric);

  if (rounded < 1 || rounded > 31) {
    return null;
  }

  return rounded;
}

function refreshRecurringTrackingUi() {
  renderMovementRules();
  renderTrackingPanel();
  renderMonth();
}

function updateMovementRuleFormVisibility() {
  movementRuleDueDayWrap?.classList.remove("hidden");
}

function parseRecurringAmountMatchInput(value) {
  const trimmed = String(value ?? "").trim();

  if (!trimmed) {
    return null;
  }

  return normalizeRecurringAmountMatch(parseMoney(trimmed));
}

function isExactRecurringAmountSearch(value) {
  return /^\d+(,\d{2})$/.test(normalizeRecurringAmountSearchInput(value));
}

function normalizeRecurringAmountSearchInput(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s/g, "")
    .replace(/[€$]/g, "")
    .replace(/\./g, ",");
}

function normalizeRecurringAmountMatch(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric) || Math.abs(numeric) < 0.0001) {
    return null;
  }

  return Number(Math.abs(numeric).toFixed(2));
}

function areRecurringAmountsEquivalent(leftValue, rightValue) {
  const left = normalizeRecurringAmountMatch(leftValue);
  const right = normalizeRecurringAmountMatch(rightValue);

  if (left === null && right === null) {
    return true;
  }

  if (left === null || right === null) {
    return false;
  }

  return Math.abs(left - right) < 0.005;
}

function areRecurringAmountFiltersEquivalent(leftText = "", leftValue = null, rightText = "", rightValue = null) {
  const normalizedLeftText = normalizeRecurringAmountSearchInput(leftText);
  const normalizedRightText = normalizeRecurringAmountSearchInput(rightText);

  if (normalizedLeftText || normalizedRightText) {
    return normalizedLeftText === normalizedRightText;
  }

  return areRecurringAmountsEquivalent(leftValue, rightValue);
}

function doesRecurringAmountMatchSearch(value, searchInput = "") {
  const normalizedSearch = normalizeRecurringAmountSearchInput(searchInput);

  if (!normalizedSearch) {
    return true;
  }

  const normalizedValue = formatPlainMoney(Math.abs(Number(value || 0)));

  return normalizedValue.startsWith(normalizedSearch);
}

function normalizeDescription(value) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeRecurringDescription(value) {
  return normalizeDescription(value)
    .replace(/\b(n|nr|no|nº|num|numero)\s*\d+\b/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeRuleComparableText(value) {
  return normalizeDescription(value)
    .replace(/[.,;:!?()[\]{}"'/\\_*+=~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function ensureMovementRules() {
  let hasChanges = false;

  if (!account?.movementRulesByPeriod || typeof account.movementRulesByPeriod !== "object") {
    account.movementRulesByPeriod = {};
    hasChanges = true;
  }

  const legacyRules = Array.isArray(account?.movementRules) ? account.movementRules : [];
  const currentPeriod = getSelectedPeriod();

  if (legacyRules.length > 0 && !Array.isArray(account.movementRulesByPeriod[currentPeriod])) {
    account.movementRulesByPeriod[currentPeriod] = legacyRules;
    delete account.movementRules;
    hasChanges = true;
  }

  Object.keys(account.movementRulesByPeriod).forEach((periodKey) => {
    const normalizedEntries = (account.movementRulesByPeriod[periodKey] || [])
      .map(normalizeMovementRule)
      .filter(Boolean);
    const dedupedEntries = [];

    normalizedEntries.forEach((rule) => {
      const isDuplicate = findDuplicateMovementRule({
        entries: dedupedEntries,
        matchText: rule.matchText,
        label: rule.label,
      });

      if (!isDuplicate) {
        dedupedEntries.push(rule);
      }
    });

    if (
      dedupedEntries.length !== (account.movementRulesByPeriod[periodKey] || []).length
      || JSON.stringify(dedupedEntries) !== JSON.stringify(account.movementRulesByPeriod[periodKey] || [])
    ) {
      hasChanges = true;
    }

    account.movementRulesByPeriod[periodKey] = dedupedEntries;
  });

  if (hasChanges) {
    saveAccountsSnapshot();
  }
}

function renderMovementRules() {
  const rules = getMovementRules();
  const filterQuery = normalizeDescription(movementRuleMatchField?.value || "");
  const amountSearch = normalizeRecurringAmountSearchInput(movementRuleAmountMatchField?.value || "");
  const amountFilter = parseRecurringAmountMatchInput(movementRuleAmountMatchField?.value || "");
  const suggestions = getRecurringMovementSuggestions(filterQuery, amountSearch);
  const otherSuggestions = getOtherMovementSuggestions(suggestions, filterQuery, amountSearch);

  movementRulesList.innerHTML = rules.map((rule) => `
    <article class="movement-rule-card" draggable="true" data-movement-rule-id="${rule.id}">
      <div class="movement-rule-copy">
        <strong>${escapeHtml(rule.label)}</strong>
        <p>Palavra-chave: ${escapeHtml(rule.matchText)}${rule.amountMatchText ? ` · Valor ${escapeHtml(rule.amountMatchText)}` : rule.amountMatch ? ` · Valor ${escapeHtml(formatCurrency(rule.amountMatch))}` : ""} · ${escapeHtml(getRecurringEntryDayInfo(rule).longLabel)}${shouldExcludeRecurringFromPending(rule) ? " · Excluído do valor por pagar" : ""}</p>
      </div>
      <div class="movement-rule-actions">
        <button
          type="button"
          class="movement-rule-edit-button"
          data-edit-movement-rule-id="${rule.id}"
          aria-label="Editar ${escapeHtmlAttribute(rule.label)}"
        >
          📝
        </button>
        <button
          type="button"
          class="movement-rule-delete-button"
          data-delete-movement-rule-id="${rule.id}"
          aria-label="Apagar ${escapeHtmlAttribute(rule.label)}"
        >
          ×
        </button>
      </div>
    </article>
  `).join("");

  movementRulesEmpty.classList.toggle("hidden", rules.length > 0);

  movementRuleSuggestions.innerHTML = [
    suggestions.length > 0 ? `
      <div class="movement-rule-section-label">Mais recorrentes</div>
      ${suggestions.map((suggestion) => createMovementSuggestionCard(suggestion, filterQuery, amountFilter)).join("")}
    ` : "",
    otherSuggestions.length > 0 ? `
      <div class="movement-rule-section-label movement-rule-section-label-secondary">Outros movimentos</div>
      ${otherSuggestions.map((suggestion) => createMovementSuggestionCard(suggestion, filterQuery, amountFilter)).join("")}
    ` : "",
  ].filter(Boolean).join("");

  movementRuleSuggestionsEmpty.classList.toggle("hidden", suggestions.length > 0 || otherSuggestions.length > 0);
}

function getAccountingMovements(movements) {
  return movements.filter((movement) => !isMovementExcludedFromAccounting(movement));
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

function getInternalMovementRules() {
  const rules = loadJson(INTERNAL_MOVEMENTS_STORAGE_KEY, INTERNAL_MOVEMENT_DEFAULT_TERMS.map((term) => ({
    term,
  })));

  return Array.isArray(rules)
    ? rules.filter((rule) => rule && typeof rule.term === "string" && rule.term.trim())
    : [];
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

function normalizeAccountingComparableText(value) {
  return String(value || "")
    .toLocaleLowerCase("pt-PT")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,;:!?()[\]{}"'/\\_*+=~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getRecurringMovementSuggestions(filterQuery = "", amountSearch = "") {
  const frequencies = new Map();
  const covered = new Set(getMovementRules().map((rule) => normalizeDescription(rule.matchText)));
  const shouldHideCovered = !filterQuery;

  getMovementsForPeriod(getSelectedPeriod()).forEach((movement) => {
    const description = (movement.description || "").trim();
    const normalized = normalizeDescription(description);
    const movementAmount = Math.abs(Number(movement.amount || 0));

    if (
      !description
      || !normalized
      || (shouldHideCovered && covered.has(normalized))
      || (filterQuery && !normalized.includes(filterQuery))
    ) {
      return;
    }

    const current = frequencies.get(normalized) || { description, count: 0, totalCount: 0, movements: [] };
    current.totalCount += 1;

    if (doesRecurringAmountMatchSearch(movementAmount, amountSearch)) {
      current.count += 1;
      current.movements.push(movement);
    }

    frequencies.set(normalized, current);
  });

  return Array.from(frequencies.values())
    .filter((item) => item.count >= 2)
    .sort((a, b) => b.count - a.count || a.description.localeCompare(b.description, "pt"))
    .slice(0, 8);
}

function getOtherMovementSuggestions(recurringSuggestions = [], filterQuery = "", amountSearch = "") {
  const recurringSet = new Set(recurringSuggestions.map((item) => normalizeDescription(item.description)));
  const covered = new Set(getMovementRules().map((rule) => normalizeDescription(rule.matchText)));
  const shouldHideCovered = !filterQuery;
  const frequencies = new Map();

  getMovementsForPeriod(getSelectedPeriod()).forEach((movement) => {
    const description = (movement.description || "").trim();
    const normalized = normalizeDescription(description);
    const movementAmount = Math.abs(Number(movement.amount || 0));

    if (
      !description
      || !normalized
      || (shouldHideCovered && covered.has(normalized))
      || recurringSet.has(normalized)
      || (filterQuery && !normalized.includes(filterQuery))
    ) {
      return;
    }

    const current = frequencies.get(normalized) || { description, count: 0, totalCount: 0, movements: [] };
    current.totalCount += 1;

    if (doesRecurringAmountMatchSearch(movementAmount, amountSearch)) {
      current.count += 1;
      current.movements.push(movement);
    }

    frequencies.set(normalized, current);
  });

  return Array.from(frequencies.values())
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count || a.description.localeCompare(b.description, "pt"))
    .slice(0, 40);
}

function createMovementSuggestionCard(suggestion, filterQuery = "", amountFilter = null) {
  const typedKeyword = movementRuleMatchField?.value?.trim() || "";
  const overlapMatchText = typedKeyword || suggestion.description;
  const suggestionKey = createMovementSuggestionKey(suggestion.description, amountFilter);
  const isExpanded = expandedMovementSuggestionKey === suggestionKey;
  const overlap = findOverlappingMovementRule({
    entries: getMovementRules(),
    matchText: overlapMatchText,
    label: prettifySuggestionLabel(suggestion.description),
    amountMatch: amountFilter,
    excludedId: editingMovementRuleId || "",
  });
  const hasOverlap = Boolean(overlap);
  const previewMovements = Array.isArray(suggestion.movements) ? suggestion.movements : [];
  const resolvedAmountMatch = resolveSuggestionAmountMatch(previewMovements, amountFilter);

  return `
    <article
      class="movement-rule-suggestion ${hasOverlap ? "has-repeated-movements" : ""}"
      draggable="true"
      data-rule-suggestion-key="${escapeHtmlAttribute(suggestionKey)}"
      data-rule-suggestion-description="${escapeHtmlAttribute(suggestion.description)}"
      data-rule-suggestion-match="${escapeHtmlAttribute(overlapMatchText)}"
      data-rule-suggestion-overlap="${hasOverlap ? "true" : "false"}"
      data-rule-suggestion-count="${suggestion.count}"
      data-rule-suggestion-amount-match="${resolvedAmountMatch !== null ? escapeHtmlAttribute(formatPlainMoney(resolvedAmountMatch)) : ""}"
      title="${hasOverlap ? "Este movimento já está associado a outra regra." : ""}"
    >
      <div class="movement-rule-suggestion-head">
        <strong>${escapeHtml(prettifySuggestionLabel(suggestion.description))}</strong>
        <div class="movement-rule-suggestion-meta">
          <em>${amountFilter !== null && suggestion.totalCount > suggestion.count ? `${suggestion.totalCount}x total · ${suggestion.count}x valor` : `${suggestion.count}x`}</em>
          <button
            type="button"
            class="movement-rule-preview-button"
            data-rule-suggestion-preview-toggle="${escapeHtmlAttribute(suggestionKey)}"
            aria-expanded="${isExpanded ? "true" : "false"}"
          >
            ${isExpanded ? "Ocultar" : "Ver"}
          </button>
        </div>
      </div>
      <span>${escapeHtml(suggestion.description)}</span>
      <small>${amountFilter !== null && suggestion.totalCount > suggestion.count
        ? `${suggestion.totalCount} repetições no mês · ${suggestion.count} com valor ${escapeHtml(formatCurrency(amountFilter))}`
        : `${suggestion.count} ${suggestion.count === 1 ? "repetição" : "repetições"} neste mês${amountFilter !== null ? ` com valor ${escapeHtml(formatCurrency(amountFilter))}` : ""}`}</small>
      ${hasOverlap ? `
        <small class="movement-rule-repeated-warning">
          Movimentos repetidos com ${escapeHtml(overlap.labels.slice(0, 2).join(", "))}: ${overlap.count}
        </small>
      ` : ""}
      ${isExpanded ? `
        <div class="movement-rule-suggestion-preview">
          ${previewMovements.map((movement) => `
            <div
              class="movement-rule-suggestion-preview-item"
              draggable="true"
              data-rule-suggestion-preview-description="${escapeHtmlAttribute(suggestion.description)}"
              data-rule-suggestion-preview-match="${escapeHtmlAttribute(overlapMatchText)}"
              data-rule-suggestion-preview-amount="${escapeHtmlAttribute(formatPlainMoney(Math.abs(Number(movement.amount || 0))))}"
              data-rule-suggestion-preview-label="${escapeHtmlAttribute(prettifySuggestionLabel(suggestion.description))}"
            >
              <span>${escapeHtml(formatDate(movement.date))} · ${escapeHtml(movement.description || "")}</span>
              <strong class="${Number(movement.amount || 0) >= 0 ? "movement-positive" : "movement-negative"}">${escapeHtml(formatCurrency(Number(movement.amount || 0)))}</strong>
            </div>
          `).join("")}
          <div class="movement-rule-suggestion-preview-actions">
            <button
              type="button"
              class="movement-rule-use-button"
              data-rule-suggestion-use="true"
              ${hasOverlap ? "disabled" : ""}
            >
              ${hasOverlap ? "Já associado" : "Usar esta sugestão"}
            </button>
          </div>
        </div>
      ` : ""}
    </article>
  `;
}

function createMovementSuggestionKey(description, amountFilter = null) {
  return `${normalizeDescription(description)}|${amountFilter !== null ? formatPlainMoney(amountFilter) : "all"}`;
}

function resolveSuggestionAmountMatch(movements = [], amountFilter = null) {
  const normalizedAmount = normalizeRecurringAmountMatch(amountFilter);

  if (normalizedAmount !== null) {
    const exactMatchExists = movements.some((movement) => (
      areRecurringAmountsEquivalent(Math.abs(Number(movement?.amount || 0)), normalizedAmount)
    ));

    if (exactMatchExists) {
      return normalizedAmount;
    }
  }

  const uniqueAmounts = Array.from(new Set(
    movements
      .map((movement) => normalizeRecurringAmountMatch(Math.abs(Number(movement?.amount || 0))))
      .filter((value) => value !== null),
  ));

  return uniqueAmounts.length === 1 ? uniqueAmounts[0] : null;
}

function loadSuggestionIntoMovementRuleForm(suggestionButton) {
  movementRuleMatchField.value = suggestionButton.dataset.ruleSuggestionMatch || suggestionButton.dataset.ruleSuggestionDescription || "";
  movementRuleLabelField.value = prettifySuggestionLabel(suggestionButton.dataset.ruleSuggestionDescription || "");

  if (movementRuleAmountMatchField) {
    movementRuleAmountMatchField.value = suggestionButton.dataset.ruleSuggestionAmountMatch || "";
  }

  setMovementRulesFeedback("Sugestão carregada. Podes ajustar o nome antes de guardar.");
  movementRuleLabelField.focus();
}

function handleMovementRuleListDragStart(event) {
  const card = event.target.closest("[data-movement-rule-id]");

  if (!card || !event.dataTransfer) {
    return;
  }

  draggingMovementRuleId = card.dataset.movementRuleId;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("application/x-gf-movement-rule-id", draggingMovementRuleId || "");
  card.classList.add("is-dragging");
}

function handleMovementRuleListDragOver(event) {
  const targetCard = event.target.closest("[data-movement-rule-id]");

  if (!draggingMovementRuleId || !targetCard) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  movementRulesList?.querySelectorAll(".movement-rule-card.is-drop-target").forEach((card) => {
    card.classList.remove("is-drop-target");
  });

  if (targetCard.dataset.movementRuleId !== draggingMovementRuleId) {
    targetCard.classList.add("is-drop-target");
  }
}

function handleMovementRuleListDrop(event) {
  const targetCard = event.target.closest("[data-movement-rule-id]");

  if (!draggingMovementRuleId || !targetCard) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  const targetId = targetCard.dataset.movementRuleId;

  if (!targetId || targetId === draggingMovementRuleId) {
    clearMovementRuleDragState();
    return;
  }

  reorderMovementRules(draggingMovementRuleId, targetId);
  clearMovementRuleDragState();
}

function handleMovementRuleListDragEnd() {
  clearMovementRuleDragState();
}

function clearMovementRuleDragState() {
  draggingMovementRuleId = null;
  movementRulesList?.querySelectorAll(".movement-rule-card.is-dragging, .movement-rule-card.is-drop-target").forEach((card) => {
    card.classList.remove("is-dragging", "is-drop-target");
  });
}

function reorderMovementRules(sourceId, targetId) {
  const periodKey = getSelectedPeriod();
  const entries = [...getMovementRules(periodKey)];
  const sourceIndex = entries.findIndex((entry) => entry.id === sourceId);
  const targetIndex = entries.findIndex((entry) => entry.id === targetId);

  if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) {
    return;
  }

  const [movedEntry] = entries.splice(sourceIndex, 1);
  entries.splice(targetIndex, 0, movedEntry);
  account.movementRulesByPeriod[periodKey] = entries;
  saveAccountsSnapshot();
  setMovementRulesFeedback("Ordem atualizada.");
  renderMovementRules();
  renderTrackingPanel();
}

function prettifySuggestionLabel(description) {
  return description
    .toLowerCase()
    .split(/\s+/)
    .slice(0, 4)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

function handleSuggestionDragStart(event) {
  const suggestionCard = event.target.closest("[data-rule-suggestion-description]");

  if (!suggestionCard || !event.dataTransfer) {
    return;
  }

  if (suggestionCard.dataset.ruleSuggestionOverlap === "true") {
    event.preventDefault();
    setMovementRulesFeedback("Movimentos repetidos: esta sugestão já está abrangida por outra regra.", true);
    return;
  }

  const description = suggestionCard.dataset.ruleSuggestionDescription || "";
  const matchText = suggestionCard.dataset.ruleSuggestionMatch || description;
  const label = prettifySuggestionLabel(description);
  event.dataTransfer.effectAllowed = "copy";
  event.dataTransfer.setData("application/x-gf-rule-description", matchText);
  event.dataTransfer.setData("application/x-gf-rule-label", label);
  movementRulesDropzone?.classList.add("is-drag-target");
  suggestionCard.classList.add("is-dragging");
}

function handleSuggestionDragEnd(event) {
  event.target.closest("[data-rule-suggestion-description]")?.classList.remove("is-dragging");
  movementRulesDropzone?.classList.remove("is-drag-target");
}

function handleMovementRuleDropzoneDragOver(event) {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "copy";
  }
  movementRulesDropzone?.classList.add("is-drag-target");
}

function handleMovementRuleDropzoneDragLeave(event) {
  if (event.currentTarget !== event.target && event.currentTarget.contains(event.relatedTarget)) {
    return;
  }

  movementRulesDropzone?.classList.remove("is-drag-target");
}

function handleMovementRuleDrop(event) {
  event.preventDefault();
  movementRulesDropzone?.classList.remove("is-drag-target");

  const description = event.dataTransfer?.getData("application/x-gf-rule-description") || "";
  const label = event.dataTransfer?.getData("application/x-gf-rule-label") || prettifySuggestionLabel(description);

  if (!description) {
    return;
  }

  saveTrackingEntryFromSuggestion(description, label);
}

function saveTrackingEntryFromSuggestion(matchText, label) {
  if (!account) {
    return;
  }

  const currentEntries = getMovementRules(getSelectedPeriod());
  const normalizedMatchText = normalizeDescription(matchText);
  const alreadyExists = findDuplicateMovementRule({
    entries: currentEntries,
    matchText,
    label,
    amountMatchText: "",
    amountMatch: null,
  });

  if (alreadyExists) {
    setMovementRulesFeedback("Essa entrada já existe na seleção deste mês.", true);
    return;
  }

  const overlappingRule = findOverlappingMovementRule({
    entries: currentEntries,
    matchText,
    label,
    amountMatchText: "",
    amountMatch: null,
  });

  if (overlappingRule) {
    setMovementRulesFeedback(createOverlappingMovementRuleMessage(overlappingRule), true);
    return;
  }

  const periodKey = getSelectedPeriod();
  account.movementRulesByPeriod[periodKey] = [
    ...currentEntries,
    {
      id: crypto.randomUUID(),
      matchText,
      label,
      amountMatchText: "",
      amountMatch: null,
      normalizedMatchText,
      excludeFromPending: false,
      forecastMode: "auto",
      dueDayMode: "auto",
      manualDueDay: null,
    },
  ];

  saveAccountsSnapshot();
  setMovementRulesFeedback("Entrada adicionada por arrasto.");
  addActivityEntry({
    title: "Despesa recorrente criada",
    description: `${account.bankName}: ${label} foi adicionado a ${formatPeriodLabel(periodKey)}.`,
  });
  refreshRecurringTrackingUi();
}

function openEditMovementRule(ruleId) {
  const rule = getMovementRules().find((item) => item.id === ruleId);

  if (!rule) {
    return;
  }

  editingMovementRuleId = ruleId;
  movementRuleIdField.value = rule.id;
  movementRuleMatchField.value = rule.matchText;
  movementRuleLabelField.value = rule.label;
  if (movementRuleAmountMatchField) {
    movementRuleAmountMatchField.value = rule.amountMatchText
      || (rule.amountMatch !== null && rule.amountMatch !== undefined
        ? formatPlainMoney(rule.amountMatch)
        : "");
  }
  if (movementRuleExcludeFromPendingField) {
    movementRuleExcludeFromPendingField.checked = shouldExcludeRecurringFromPending(rule);
  }
  if (movementRuleDueDayField) {
    movementRuleDueDayField.value = rule.manualDueDay ?? "";
  }
  updateMovementRuleFormVisibility();
  movementRuleSubmit.textContent = "Guardar alterações";
  setMovementRulesFeedback("");
  movementRuleLabelField.focus();
  movementRuleLabelField.select();
}

function deleteMovementRule(ruleId) {
  const periodKey = getSelectedPeriod();
  const currentEntries = getMovementRules(periodKey);
  const rule = currentEntries.find((item) => item.id === ruleId);
  const removedIndex = currentEntries.findIndex((item) => item.id === ruleId);

  if (!rule) {
    return;
  }

  const action = {
    type: "delete-tracking-entry",
    accountId: account.id,
    periodKey,
    removedEntry: rule,
    removedIndex,
  };

  applyAccountHistoryAction(action, "redo");
  pushHistoryAction(action);
  setMovementRulesFeedback("Linha apagada com sucesso.");
  if (expandedTrackingEntryId === ruleId) {
    expandedTrackingEntryId = null;
  }
  if (currentEntries.length <= 1) {
    isTrackingDeleteMode = false;
  }
  showUndoToast(`Despesa recorrente removida de ${formatPeriodLabel(periodKey)}.`, executeUndo);
  renderTrackingPanel();
}

function renderTrackingPanel() {
  if (!trackingList || !trackingEmptyState || !trackingFeedback) {
    return;
  }

  const entries = getMovementRules();
  const paidEntries = entries
    .map((entry) => ({
      entry,
      paidMovements: getPaidTrackedMovements(entry),
    }))
    .filter((item) => item.paidMovements.length > 0);
  const hasMoreEntries = paidEntries.length > 3;
  const visibleEntries = isTrackingExpanded ? paidEntries : paidEntries.slice(0, 3);

  if (!hasMoreEntries) {
    isTrackingExpanded = false;
  }

  trackingEmptyState.classList.toggle("hidden", entries.length > 0);
  trackingList.innerHTML = paidEntries.length > 0 ? `
    <div class="tracking-group-card">
      ${visibleEntries.map(({ entry, paidMovements }) => createTrackingEntryRow(entry, paidMovements)).join("")}
    </div>
  ` : "";
  trackingMoreIndicator?.classList.toggle("hidden", !hasMoreEntries || isTrackingExpanded || paidEntries.length === 0);
  trackingFeedback.textContent = entries.length === 0
    ? "Sem despesas recorrentes configuradas para este mês."
    : paidEntries.length === 0
      ? "As despesas recorrentes deste mês ainda não foram cobradas."
      : "";
  renderTrackingForecast(entries);
  updateTrackingMenuState();
}

function getPaidTrackedMovements(entry, periodKey = getSelectedPeriod()) {
  return getTrackedMovements(entry, periodKey)
    .filter((movement) => Number(movement?.amount || 0) < 0);
}

function shouldShowRecurringEntryInLowerList(entry, selectedPeriodKey = getSelectedPeriod(), currentPeriodKey = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`) {
  const recurringHistory = getRecurringHistoryForEntry(entry, 6, false);
  recurringHistory.forecastMode = entry?.forecastMode;
  recurringHistory.amountMatch = entry?.amountMatch;
  recurringHistory.excludeFromPending = entry?.excludeFromPending;
  const recurringProfile = getRecurringForecastProfile(recurringHistory);

  if (!recurringProfile.isPredictable) {
    return true;
  }

  if (!recurringProfile.excludedFromPending) {
    return false;
  }

  if (selectedPeriodKey > currentPeriodKey) {
    return false;
  }

  if (selectedPeriodKey < currentPeriodKey) {
    return true;
  }

  const dayInfo = getRecurringEntryDayInfo(entry, recurringHistory);
  const today = new Date().getDate();
  const dueDay = Number(dayInfo.typicalDay || 0);

  return Number.isFinite(dueDay) && dueDay > 0 && today > dueDay;
}

function createTrackingEntryRow(entry, paidMovements = getPaidTrackedMovements(entry)) {
  const previousMatchedMovements = getTrackedMovements(entry, getPreviousPeriodKey(getSelectedPeriod()))
    .filter((movement) => movement.amount < 0);
  const expenseTotal = paidMovements
    .reduce((sum, movement) => sum + Math.abs(movement.amount), 0);
  const isPaid = true;
  const previousExpenseTotal = previousMatchedMovements
    .reduce((sum, movement) => sum + Math.abs(movement.amount), 0);
  const deltaFromPreviousMonth = expenseTotal - previousExpenseTotal;
  const hasPreviousMonthHistory = previousMatchedMovements.length > 0;
  const isExpanded = expandedTrackingEntryId === entry.id;
  const recurringHistory = getRecurringHistoryForEntry(entry, 6, false);
  recurringHistory.forecastMode = entry?.forecastMode;
  recurringHistory.amountMatch = entry?.amountMatch;
  recurringHistory.excludeFromPending = entry?.excludeFromPending;
  const recurringProfile = getRecurringForecastProfile(recurringHistory);
  const recurringDayInfo = getRecurringEntryDayInfo(entry, recurringHistory);
  const delayedPaymentInfo = getRecurringDelayedPaymentInfo(entry, getSelectedPeriod());
  const delayedPaymentLabel = delayedPaymentInfo
    ? ` · pago ${delayedPaymentInfo.delayDays} ${delayedPaymentInfo.delayDays === 1 ? "dia" : "dias"} depois`
    : "";

  return `
    <article class="tracking-row ${isExpanded ? "is-active" : ""} ${isPaid ? "is-paid" : ""}">
      <div class="tracking-row-main">
        <button type="button" class="tracking-card-toggle" data-tracking-toggle-id="${entry.id}">
          <div class="tracking-card-copy">
            <strong>${escapeHtml(entry.label)}</strong>
            <p>${paidMovements.length} ${paidMovements.length === 1 ? "movimento encontrado" : "movimentos encontrados"} · ${escapeHtml(recurringDayInfo.longLabel)}${escapeHtml(delayedPaymentLabel)}</p>
          </div>
          <div class="tracking-card-summary">
            <span class="money-figure tracking-expense">${formatCurrency(expenseTotal)}</span>
            <div class="tracking-card-breakdown">
              <span class="tracking-delta ${hasPreviousMonthHistory ? getAnnualRecurringDeltaClass(deltaFromPreviousMonth) : "is-neutral"}">Desvio ${hasPreviousMonthHistory ? formatSignedCurrency(deltaFromPreviousMonth) : "Sem dados"}</span>
            </div>
          </div>
        </button>
        ${isTrackingDeleteMode ? `
          <button
            type="button"
            class="tracking-delete-inline"
            data-tracking-inline-delete-id="${entry.id}"
            aria-label="Apagar ${escapeHtmlAttribute(entry.label)}"
          >
            ×
          </button>
        ` : ""}
      </div>
      ${isExpanded ? `
        <div class="tracking-card-movements">
          ${paidMovements.length > 0
            ? paidMovements.map((movement) => `
              <div class="tracking-card-movement">
                <span>${formatDate(movement.date)} · ${escapeHtml(movement.description)}</span>
                <strong class="${movement.amount >= 0 ? "movement-positive" : "movement-negative"}">${formatCurrency(movement.amount)}</strong>
              </div>
            `).join("")
            : `<p class="tracking-card-empty">Sem movimentos encontrados neste mês para esta linha.</p>`}
        </div>
      ` : ""}
    </article>
  `;
}

function getForecastCalendarPriority(typicalDay) {
  const selectedPeriod = getSelectedPeriod();
  const now = new Date();
  const currentPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const dayValue = Number(typicalDay || 1);

  if (selectedPeriod !== currentPeriod) {
    return dayValue;
  }

  const today = now.getDate();

  return dayValue >= today ? dayValue : dayValue + 100;
}

function getRawTrackedMovements(entry, periodKey = getSelectedPeriod()) {
  const normalizedMatch = normalizeDescription(entry.matchText);
  const amountMatchText = normalizeRecurringAmountSearchInput(entry?.amountMatchText);
  const amountMatch = normalizeRecurringAmountMatch(entry?.amountMatch);
  const byAmount = (movement) => (
    amountMatchText
      ? doesRecurringAmountMatchSearch(Math.abs(Number(movement?.amount || 0)), amountMatchText)
      : amountMatch === null
        ? true
        : areRecurringAmountsEquivalent(Math.abs(Number(movement?.amount || 0)), amountMatch)
  );
  const exactMatches = getAccountingMovements(getMovementsForPeriod(periodKey))
    .filter((movement) => normalizeDescription(movement.description || "").includes(normalizedMatch))
    .filter(byAmount);

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  const normalizedRecurringMatch = normalizeRecurringDescription(entry.matchText);

  if (!normalizedRecurringMatch) {
    return exactMatches;
  }

  return getAccountingMovements(getMovementsForPeriod(periodKey))
    .filter((movement) => normalizeRecurringDescription(movement.description || "").includes(normalizedRecurringMatch))
    .filter(byAmount);
}

function getTrackedMovements(entry, periodKey = getSelectedPeriod()) {
  return getRawTrackedMovements(entry, periodKey);
}

function shouldUseRecurringDelayNotice(entry) {
  const manualDueDay = normalizeRecurringManualDueDay(entry?.manualDueDay);

  if (manualDueDay && manualDueDay > 26) {
    return true;
  }

  if (normalizeRecurringForecastMode(entry?.forecastMode) === "variable") {
    return false;
  }

  const rawHistory = getRecurringRawHistoryForEntry(entry, 6, false);
  const typicalDay = rawHistory.typicalDay;

  return Number.isFinite(typicalDay) && typicalDay > 26;
}

function getRecurringDelayedPaymentInfo(entry, periodKey = getSelectedPeriod()) {
  if (!shouldUseRecurringDelayNotice(entry)) {
    return null;
  }

  const currentMatches = getRawTrackedMovements(entry, periodKey)
    .filter((movement) => movement.amount < 0);

  if (currentMatches.length > 0) {
    return null;
  }

  const nextPeriodMatches = getRawTrackedMovements(entry, getNextPeriodKey(periodKey))
    .filter((movement) => movement.amount < 0)
    .filter((movement) => {
      const day = getMovementDayOfMonth(movement.date);
      return Number.isFinite(day) && day >= 1 && day <= 5;
    });

  if (nextPeriodMatches.length === 0) {
    return null;
  }

  const firstNextMatch = nextPeriodMatches
    .slice()
    .sort((left, right) => (
      new Date(left.date || 0).getTime() - new Date(right.date || 0).getTime()
    ))[0];
  const delayDays = getMovementDayOfMonth(firstNextMatch?.date);

  if (!Number.isFinite(delayDays) || delayDays <= 0) {
    return null;
  }

  return {
    delayDays,
    movementDate: firstNextMatch.date,
  };
}

function createMovementIdentity(movement) {
  return [
    movement?.date || "",
    normalizeDescription(movement?.description || ""),
    Number(movement?.amount || 0).toFixed(2),
    Number(movement?.balance || 0).toFixed(2),
  ].join("|");
}

function doMovementRuleTextsOverlap(candidate, entry) {
  if (
    normalizeRecurringAmountSearchInput(candidate?.amountMatchText)
    || normalizeRecurringAmountSearchInput(entry?.amountMatchText)
    || 
    normalizeRecurringAmountMatch(candidate?.amountMatch) !== null
    || normalizeRecurringAmountMatch(entry?.amountMatch) !== null
  ) {
    return false;
  }

  const candidateMatchText = normalizeRuleComparableText(candidate?.matchText || "");
  const entryMatchText = normalizeRuleComparableText(entry?.matchText || "");

  if (!candidateMatchText || !entryMatchText) {
    return false;
  }

  const candidateReferences = extractMovementRuleReferenceTokens(candidateMatchText);
  const entryReferences = extractMovementRuleReferenceTokens(entryMatchText);

  if (candidateReferences.length > 0 || entryReferences.length > 0) {
    return candidateReferences.some((reference) => entryReferences.includes(reference));
  }

  return (
    candidateMatchText.length >= 6
    && entryMatchText.length >= 6
    && (candidateMatchText.includes(entryMatchText) || entryMatchText.includes(candidateMatchText))
  );
}

function extractMovementRuleReferenceTokens(value) {
  return Array.from(new Set(
    String(value || "").match(/\b\d{4,}\b/g) || [],
  ));
}

function appendUniqueOverlapMovements(currentOverlap, movements, label) {
  const nextMovements = [...currentOverlap.movements];

  movements.forEach((movement) => {
    const movementId = createMovementIdentity(movement);

    if (!currentOverlap.movementIds.has(movementId)) {
      currentOverlap.movementIds.add(movementId);
      nextMovements.push(movement);
    }
  });

  return {
    count: nextMovements.length,
    amount: nextMovements.reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0),
    labels: Array.from(new Set([...currentOverlap.labels, label])),
    movementIds: currentOverlap.movementIds,
    movements: nextMovements,
  };
}

function findOverlappingMovementRule({
  entries,
  matchText,
  label,
  amountMatchText = "",
  amountMatch = null,
  excludedId = "",
}) {
  const candidateEntry = {
    id: "__candidate__",
    matchText,
    label,
    amountMatchText,
    amountMatch,
  };
  const candidateMovements = getTrackedMovements(candidateEntry);

  if (candidateMovements.length === 0) {
    return null;
  }

  const candidateMovementIds = new Set(candidateMovements.map(createMovementIdentity));

  const overlap = (entries || []).reduce((currentOverlap, entry) => {
    if (!entry || (excludedId && entry.id === excludedId)) {
      return currentOverlap;
    }

    const entryLabel = entry.label || entry.matchText || "Outra regra";
    const matchedMovements = getTrackedMovements(entry)
      .filter((movement) => candidateMovementIds.has(createMovementIdentity(movement)));

    if (matchedMovements.length > 0) {
      return appendUniqueOverlapMovements(currentOverlap, matchedMovements, entryLabel);
    }

    if (doMovementRuleTextsOverlap(candidateEntry, entry)) {
      return appendUniqueOverlapMovements(currentOverlap, candidateMovements, entryLabel);
    }

    return currentOverlap;
  }, {
    count: 0,
    amount: 0,
    labels: [],
    movementIds: new Set(),
    movements: [],
  });

  return overlap.count > 0 ? overlap : null;
}

function createOverlappingMovementRuleMessage(overlap) {
  if (!overlap || overlap.count === 0) {
    return "";
  }

  const labels = overlap.labels.slice(0, 3).join(", ");
  const suffix = overlap.labels.length > 3 ? "..." : "";

  return `Movimentos repetidos: esta keyword apanha ${overlap.count} movimentos já associados a ${labels}${suffix} (${formatCurrency(overlap.amount)}). Ajusta a palavra-chave para evitar duplicar somatórios.`;
}

function renderTrackingForecast(entries = getMovementRules()) {
  if (
    !trackingForecast
    || !trackingForecastAvailable
    || !trackingForecastPending
    || !trackingForecastProjected
    || !trackingForecastMeta
    || !trackingForecastList
    || !trackingForecastEmpty
  ) {
    return;
  }

  const forecast = getRecurringForecast(entries);
  const shouldShowForecast = entries.length > 0;

  trackingForecast.classList.toggle("hidden", !shouldShowForecast);

  if (!shouldShowForecast) {
    return;
  }

  trackingForecastAvailable.textContent = formatCurrency(forecast.availableBalance);
  trackingForecastAvailable.classList.toggle("is-estimated", !!forecast.availableBalanceIsEstimated);
  if (trackingForecastAvailableMeta) {
    trackingForecastAvailableMeta.textContent = forecast.availableBalanceIsEstimated
      ? `Referência de ${formatPeriodLabel(forecast.availableBalanceSourcePeriod)}`
      : "";
    trackingForecastAvailableMeta.classList.toggle("hidden", !forecast.availableBalanceIsEstimated);
  }
  trackingForecastPending.textContent = formatCurrency(forecast.pendingTotal);
  trackingForecastProjected.textContent = formatCurrency(forecast.projectedBalance);
  trackingForecastProjected.classList.remove("executive-metric-positive", "executive-metric-negative");

  if (forecast.projectedBalance > 0.0001) {
    trackingForecastProjected.classList.add("executive-metric-positive");
  } else if (forecast.projectedBalance < -0.0001) {
    trackingForecastProjected.classList.add("executive-metric-negative");
  }

  trackingForecastMeta.textContent = forecast.outstandingCount > 0
    ? `${forecast.outstandingCount} ${forecast.outstandingCount === 1 ? "despesa prevista em falta" : "despesas previstas em falta"} neste mês.${forecast.variableCount > 0 ? ` ${forecast.variableCount} recorrente${forecast.variableCount === 1 ? "" : "s"} variável${forecast.variableCount === 1 ? "" : "eis"} não entra${forecast.variableCount === 1 ? "" : "m"} na previsão.` : ""}${forecast.excludedCount > 0 ? ` ${forecast.excludedCount} recorrente${forecast.excludedCount === 1 ? "" : "s"} foi${forecast.excludedCount === 1 ? "" : "ram"} excluída${forecast.excludedCount === 1 ? "" : "s"} do valor por pagar.` : ""}`
    : forecast.variableCount > 0
      ? `${forecast.variableCount} recorrente${forecast.variableCount === 1 ? "" : "s"} variável${forecast.variableCount === 1 ? "" : "eis"} sem valor previsível este mês.${forecast.excludedCount > 0 ? ` ${forecast.excludedCount} recorrente${forecast.excludedCount === 1 ? "" : "s"} foi${forecast.excludedCount === 1 ? "" : "ram"} excluída${forecast.excludedCount === 1 ? "" : "s"} do valor por pagar.` : ""}`
      : forecast.excludedCount > 0
        ? `${forecast.excludedCount} recorrente${forecast.excludedCount === 1 ? "" : "s"} foi${forecast.excludedCount === 1 ? "" : "ram"} excluída${forecast.excludedCount === 1 ? "" : "s"} do valor por pagar.`
      : "Sem despesas recorrentes previstas em falta.";

  trackingForecastList.innerHTML = forecast.pendingItems.map((item) => `
    <article class="tracking-forecast-item">
      <div class="tracking-forecast-copy">
        <strong>${escapeHtml(item.label)}</strong>
        <p>${item.dayLabel} · média ${formatCurrency(item.averageAmount)} · ${escapeHtml(item.profile.forecastLabel)}</p>
      </div>
      <strong class="tracking-expense">${formatCurrency(item.expectedAmount)}</strong>
    </article>
  `).join("");

  trackingForecastEmpty.classList.toggle("hidden", forecast.pendingItems.length > 0);
}

function getRecurringForecast(entries = getMovementRules()) {
  const forecastItems = entries
    .map((entry) => buildRecurringPendingForecastItem(entry))
    .filter(Boolean);
  const availableBalanceInfo = getRecurringForecastAvailableBalanceInfo(getSelectedPeriod());
  const availableBalance = availableBalanceInfo.balance;
  const pendingItems = forecastItems;
  const countedPendingItems = pendingItems
    .filter((item) => item.profile.isPredictable && !item.profile.excludedFromPending);
  const excludedItems = forecastItems
    .filter((item) => item.profile.excludedFromPending);
  const variableItems = forecastItems
    .filter((item) => !item.profile.isPredictable && !item.profile.excludedFromPending);
  const pendingTotal = countedPendingItems.reduce((sum, item) => sum + item.expectedAmount, 0);

  return {
    availableBalance,
    availableBalanceIsEstimated: availableBalanceInfo.isEstimated,
    availableBalanceSourcePeriod: availableBalanceInfo.sourcePeriod,
    pendingItems,
    outstandingCount: pendingItems.length,
    excludedCount: excludedItems.length,
    variableCount: variableItems.length,
    pendingTotal,
    projectedBalance: availableBalance - pendingTotal,
  };
}

function getRecurringForecastAvailableBalanceInfo(periodKey) {
  const directFinalBalanceMovement = getMonthlyFinalBalanceMovement(getMovementsForPeriod(periodKey));

  if (directFinalBalanceMovement) {
    return {
      balance: Number(directFinalBalanceMovement.balance || 0),
      isEstimated: false,
      sourcePeriod: periodKey,
    };
  }

  let cursorPeriodKey = getPreviousPeriodKey(periodKey);

  while (cursorPeriodKey && cursorPeriodKey >= "2000-01") {
    const previousFinalBalanceMovement = getMonthlyFinalBalanceMovement(getMovementsForPeriod(cursorPeriodKey));

    if (previousFinalBalanceMovement) {
      return {
        balance: Number(previousFinalBalanceMovement.balance || 0),
        isEstimated: true,
        sourcePeriod: cursorPeriodKey,
      };
    }

    cursorPeriodKey = getPreviousPeriodKey(cursorPeriodKey);
  }

  return {
    balance: 0,
    isEstimated: false,
    sourcePeriod: periodKey,
  };
}

function buildRecurringPendingForecastItem(entry) {
  const currentMonthMovements = getTrackedMovements(entry, getSelectedPeriod())
    .filter((movement) => movement.amount < 0);

  if (currentMonthMovements.length > 0) {
    return null;
  }

  if (getRecurringDelayedPaymentInfo(entry, getSelectedPeriod())) {
    return null;
  }

  const history = getRecurringHistoryForEntry(entry, 6, false);
  history.forecastMode = entry?.forecastMode;
  history.amountMatch = entry?.amountMatch;
  history.excludeFromPending = entry?.excludeFromPending;
  const profile = getRecurringForecastProfile(history);

  if (history.monthCount === 0 || history.averageAmount <= 0) {
    return null;
  }

  const dayInfo = getRecurringEntryDayInfo(entry, history);

  return {
    label: entry.label,
    expectedAmount: normalizeRecurringAmountMatch(entry?.amountMatch) ?? (history.lastAmount > 0 ? history.lastAmount : history.averageAmount),
    averageAmount: history.averageAmount,
    typicalDay: dayInfo.typicalDay || 1,
    dayLabel: dayInfo.longLabel,
    profile,
  };
}

function renderRecurringDetectionModal() {
  if (
    !recurringDetectionWindow
    || !recurringDetectionCount
    || !recurringDetectionRange
    || !recurringDetectionTop
    || !recurringDetectionList
    || !recurringDetectionEmpty
  ) {
    return;
  }

  recurringDetectionWindow.value = String(recurringDetectionLookbackMonths);
  const suggestions = detectRecurringExpenseSuggestions(recurringDetectionLookbackMonths);

  recurringDetectionCount.textContent = String(suggestions.length);
  recurringDetectionRange.textContent = String(Math.min(recurringDetectionLookbackMonths, getRecentPeriods(recurringDetectionLookbackMonths).length));
  recurringDetectionTop.textContent = suggestions[0]
    ? `${suggestions[0].label} · ${suggestions[0].monthCount}m`
    : "Sem dados";

  recurringDetectionList.innerHTML = suggestions.map((suggestion) => {
    const draft = recurringDetectionDrafts[suggestion.key] || {};
    const currentLabel = draft.label ?? suggestion.label;
    const currentMatchText = draft.matchText ?? suggestion.matchText;
    const mergeableEntries = findMergeableMovementRules({
      entries: getMovementRules(),
      matchText: currentMatchText,
      label: currentLabel,
    });
    const mergeTarget = mergeableEntries.length === 1 ? mergeableEntries[0] : null;
    const hasConflicts = mergeableEntries.length > 1;

    return `
      <article class="recurring-detection-card">
        <div class="recurring-detection-card-head">
          <div>
            <strong>${escapeHtml(currentLabel)}</strong>
            <p>${suggestion.monthCount} ${suggestion.monthCount === 1 ? "mês" : "meses"} · ${suggestion.occurrences} ${suggestion.occurrences === 1 ? "movimento" : "movimentos"}</p>
          </div>
          <span class="recurring-detection-badge">${escapeHtml(suggestion.daySummary.shortLabel)}</span>
        </div>

        <div class="recurring-detection-meta">
          <span>Média ${formatCurrency(suggestion.averageAmount)}</span>
          <span>Último ${formatCurrency(suggestion.lastAmount)}</span>
          <span>${escapeHtml(suggestion.daySummary.longLabel)}</span>
          <span>${escapeHtml(suggestion.samplePeriodLabel)}</span>
          <span class="recurring-detection-type recurring-detection-type-${suggestion.profile.status}">${escapeHtml(suggestion.profile.detectionLabel)}</span>
        </div>

        <div class="movement-rule-fields recurring-detection-fields">
          <label>
            Nome apresentado
            <input
              type="text"
              value="${escapeHtmlAttribute(currentLabel)}"
              data-recurring-draft-field="label"
              data-recurring-suggestion-key="${escapeHtmlAttribute(suggestion.key)}"
            />
          </label>
          <label>
            Palavra-chave
            <input
              type="text"
              value="${escapeHtmlAttribute(currentMatchText)}"
              data-recurring-draft-field="matchText"
              data-recurring-suggestion-key="${escapeHtmlAttribute(suggestion.key)}"
            />
          </label>
        </div>

        <div class="recurring-detection-actions">
          <p class="recurring-detection-description">${escapeHtml(suggestion.sampleDescription)}</p>
          <button
            type="button"
            class="secondary-button"
            data-add-recurring-suggestion-key="${escapeHtmlAttribute(suggestion.key)}"
            ${hasConflicts ? "disabled" : ""}
          >
            ${hasConflicts ? "Conflito com várias linhas" : mergeTarget ? "Atualizar existente" : "Adicionar à lista"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  recurringDetectionEmpty.classList.toggle("hidden", suggestions.length > 0);
}

function detectRecurringExpenseSuggestions(monthCount) {
  const periods = getRecentPeriods(monthCount);
  const grouped = new Map();

  periods.forEach((periodKey) => {
    const monthMovements = getAccountingMovements(getMovementsForPeriod(periodKey))
      .filter((movement) => Number(movement.amount || 0) < 0);

    monthMovements.forEach((movement) => {
      const description = String(movement.description || "").trim();
      const normalizedKey = normalizeRecurringDescription(description);

      if (!description || !normalizedKey) {
        return;
      }

      const current = grouped.get(normalizedKey) || {
        key: normalizedKey,
        movements: [],
        periods: new Set(),
        descriptions: new Map(),
      };

      current.movements.push({ ...movement, periodKey });
      current.periods.add(periodKey);
      current.descriptions.set(description, (current.descriptions.get(description) || 0) + 1);
      grouped.set(normalizedKey, current);
    });
  });

  return mergeRecurringSuggestionGroups(Array.from(grouped.values()))
    .map((group) => createRecurringSuggestionFromGroup(group))
    .filter((suggestion) => suggestion && suggestion.monthCount >= 2)
    .sort((left, right) => right.monthCount - left.monthCount || right.occurrences - left.occurrences || right.averageAmount - left.averageAmount);
}

function createRecurringSuggestionFromGroup(group) {
  if (!group || !Array.isArray(group.movements) || group.movements.length === 0) {
    return null;
  }

  const sortedDescriptions = Array.from(group.descriptions.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "pt-PT"));
  const sampleDescription = sortedDescriptions[0]?.[0] || group.movements[0].description || "";
  const monthCount = group.periods.size;
  const occurrences = group.movements.length;
  const averageAmount = group.movements.reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0) / Math.max(occurrences, 1);
  const lastMovement = [...group.movements]
    .sort((left, right) => `${right.periodKey}|${right.date}`.localeCompare(`${left.periodKey}|${left.date}`))[0];
  const dayValues = group.movements
    .map((movement) => getMovementDayOfMonth(movement.date))
    .filter((value) => Number.isFinite(value));
  const daySummary = getRecurringDaySummary(dayValues);
  const history = {
    monthCount,
    averageAmount,
    lastAmount: Math.abs(Number(lastMovement?.amount || 0)),
    dayValues,
    typicalDay: daySummary.typicalDay,
    monthTotals: collectRecurringMonthTotals(group.movements),
  };
  const profile = getRecurringForecastProfile(history);

  return {
    key: group.key,
    monthCount,
    occurrences,
    label: prettifySuggestionLabel(sampleDescription),
    matchText: buildRecurringSuggestedMatchText(sampleDescription),
    sampleDescription,
    averageAmount,
    lastAmount: Math.abs(Number(lastMovement?.amount || 0)),
    typicalDay: daySummary.typicalDay,
    daySummary,
    samplePeriodLabel: lastMovement?.periodKey ? formatPeriodLabel(lastMovement.periodKey) : "Sem histórico",
    profile,
  };
}

function addRecurringSuggestion(suggestionKey) {
  const suggestion = detectRecurringExpenseSuggestions(recurringDetectionLookbackMonths)
    .find((item) => item.key === suggestionKey);

  if (!suggestion) {
    return;
  }

  const draft = recurringDetectionDrafts[suggestion.key] || {};
  const label = String(draft.label ?? suggestion.label ?? "").trim();
  const matchText = String(draft.matchText ?? suggestion.matchText ?? "").trim();

  if (!label || !matchText) {
    recurringDetectionFeedback.textContent = "Preenche o nome e a palavra-chave antes de adicionar.";
    recurringDetectionFeedback.classList.add("is-error");
    return;
  }

  const periodKey = getSelectedPeriod();
  const currentEntries = getMovementRules(periodKey);
  const mergeableEntries = findMergeableMovementRules({
    entries: currentEntries,
    matchText,
    label,
    amountMatchText: "",
  });

  if (mergeableEntries.length > 1) {
    const overlappingRule = findOverlappingMovementRule({
      entries: currentEntries,
      matchText,
      label,
    });

    recurringDetectionFeedback.textContent = overlappingRule
      ? createOverlappingMovementRuleMessage(overlappingRule)
      : "Esta sugestão coincide com várias linhas já existentes. Ajusta o nome ou a palavra-chave antes de adicionar.";
    recurringDetectionFeedback.classList.add("is-error");
    return;
  }

  const mergeTarget = mergeableEntries[0] || null;

  account.movementRulesByPeriod[periodKey] = mergeTarget
    ? currentEntries.map((rule) => (rule.id === mergeTarget.id ? {
      ...rule,
      matchText,
      label: label || rule.label,
      amountMatchText: rule.amountMatchText || "",
      normalizedMatchText: normalizeDescription(matchText),
      forecastMode: normalizeRecurringForecastMode(rule.forecastMode),
      dueDayMode: normalizeRecurringDueDayMode(rule.dueDayMode),
      manualDueDay: normalizeRecurringManualDueDay(rule.manualDueDay),
    } : rule))
    : [
      ...currentEntries,
      {
        id: crypto.randomUUID(),
        matchText,
        label,
        amountMatchText: "",
        normalizedMatchText: normalizeDescription(matchText),
        forecastMode: "auto",
        dueDayMode: "auto",
        manualDueDay: null,
      },
    ];

  saveAccountsSnapshot();
  addActivityEntry({
    title: mergeTarget ? "Recorrência atualizada" : "Recorrência adicionada",
    description: mergeTarget
      ? `${account.bankName}: ${mergeTarget.label || label} foi atualizada por deteção automática em ${formatPeriodLabel(periodKey)}.`
      : `${account.bankName}: ${label} foi adicionada por deteção automática em ${formatPeriodLabel(periodKey)}.`,
  });
  recurringDetectionFeedback.textContent = mergeTarget
    ? `${mergeTarget.label || label} já existia e foi atualizada sem duplicar a linha.`
    : `${label} foi adicionada às despesas recorrentes.`;
  recurringDetectionFeedback.classList.remove("is-error");
  refreshRecurringTrackingUi();
  renderRecurringDetectionModal();
}

function getRecurringHistoryForEntry(entry, monthCount = 6, includeCurrentMonth = false) {
  const periods = getRecentPeriods(monthCount, includeCurrentMonth ? 0 : 1);
  const monthTotals = [];
  const dayValues = [];
  let lastAmount = 0;
  let hasMostRecentAmount = false;

  periods.forEach((periodKey) => {
    const matchedMovements = getTrackedMovements(entry, periodKey)
      .filter((movement) => movement.amount < 0);

    if (matchedMovements.length === 0) {
      return;
    }

    const total = matchedMovements.reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0);
    monthTotals.push(total);
    if (!hasMostRecentAmount) {
      lastAmount = total;
      hasMostRecentAmount = true;
    }
    matchedMovements.forEach((movement) => {
      const day = getMovementDayOfMonth(movement.date);

      if (Number.isFinite(day)) {
        dayValues.push(day);
      }
    });
  });

  return {
    monthCount: monthTotals.length,
    averageAmount: monthTotals.length > 0
      ? monthTotals.reduce((sum, value) => sum + value, 0) / monthTotals.length
      : 0,
    lastAmount,
    dayValues,
    typicalDay: getMostCommonNumber(dayValues),
    monthTotals,
  };
}

function getRecurringRawHistoryForEntry(entry, monthCount = 6, includeCurrentMonth = false) {
  const periods = getRecentPeriods(monthCount, includeCurrentMonth ? 0 : 1);
  const monthTotals = [];
  const dayValues = [];
  let lastAmount = 0;
  let hasMostRecentAmount = false;

  periods.forEach((periodKey) => {
    const matchedMovements = getRawTrackedMovements(entry, periodKey)
      .filter((movement) => movement.amount < 0);

    if (matchedMovements.length === 0) {
      return;
    }

    const total = matchedMovements.reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0);
    monthTotals.push(total);
    if (!hasMostRecentAmount) {
      lastAmount = total;
      hasMostRecentAmount = true;
    }
    matchedMovements.forEach((movement) => {
      const day = getMovementDayOfMonth(movement.date);

      if (Number.isFinite(day)) {
        dayValues.push(day);
      }
    });
  });

  return {
    monthCount: monthTotals.length,
    averageAmount: monthTotals.length > 0
      ? monthTotals.reduce((sum, value) => sum + value, 0) / monthTotals.length
      : 0,
    lastAmount,
    dayValues,
    typicalDay: getMostCommonNumber(dayValues),
    monthTotals,
  };
}

function collectRecurringMonthTotals(movements = []) {
  const totalsByPeriod = new Map();

  movements.forEach((movement) => {
    const periodKey = movement?.periodKey;

    if (!periodKey) {
      return;
    }

    totalsByPeriod.set(
      periodKey,
      (totalsByPeriod.get(periodKey) || 0) + Math.abs(Number(movement.amount || 0)),
    );
  });

  return Array.from(totalsByPeriod.values());
}

function getRecurringForecastProfile(history) {
  const forcedMode = normalizeRecurringForecastMode(history?.forecastMode);
  const amountMatch = normalizeRecurringAmountMatch(history?.amountMatch);
  const monthTotals = Array.isArray(history?.monthTotals) ? history.monthTotals.filter((value) => Number.isFinite(value) && value > 0) : [];
  const monthCount = Number(history?.monthCount || monthTotals.length || 0);
  const averageAmount = Number(history?.averageAmount || 0);

  if (forcedMode === "predictable") {
    return {
      status: "predictable",
      isPredictable: true,
      excludedFromPending: shouldExcludeRecurringFromPending(history),
      detectionLabel: "Previsível (manual)",
      forecastLabel: shouldExcludeRecurringFromPending(history) ? "excluído do valor por pagar" : "entra no valor por pagar",
      listLabel: "previsível",
    };
  }

  if (forcedMode === "variable") {
    return {
      status: "variable",
      isPredictable: false,
      excludedFromPending: false,
      detectionLabel: "Variável (manual)",
      forecastLabel: "não entra na previsão",
      listLabel: "variável",
    };
  }

  if (amountMatch !== null && monthCount >= 1) {
    return {
      status: "predictable",
      isPredictable: true,
      excludedFromPending: shouldExcludeRecurringFromPending(history),
      detectionLabel: "Previsível por valor",
      forecastLabel: shouldExcludeRecurringFromPending(history) ? "excluído do valor por pagar" : "entra no valor por pagar",
      listLabel: "previsível",
    };
  }

  if (monthCount < 2 || averageAmount <= 0 || monthTotals.length < 2) {
    return {
      status: "insufficient",
      isPredictable: false,
      excludedFromPending: false,
      detectionLabel: "Histórico curto",
      forecastLabel: "Sem previsão automática",
      listLabel: "sem previsão",
    };
  }

  const maxAmount = Math.max(...monthTotals);
  const minAmount = Math.min(...monthTotals);
  const spread = maxAmount - minAmount;
  const variance = monthTotals.reduce((sum, value) => sum + ((value - averageAmount) ** 2), 0) / monthTotals.length;
  const deviation = Math.sqrt(variance);
  const spreadLimit = Math.max(8, averageAmount * 0.18);
  const deviationLimit = Math.max(4, averageAmount * 0.12);
  const isPredictable = spread <= spreadLimit && deviation <= deviationLimit;

  if (isPredictable) {
    return {
      status: "predictable",
      isPredictable: true,
      excludedFromPending: shouldExcludeRecurringFromPending(history),
      detectionLabel: "Previsível",
      forecastLabel: shouldExcludeRecurringFromPending(history) ? "excluído do valor por pagar" : "entra no valor por pagar",
      listLabel: "previsível",
    };
  }

  return {
    status: "variable",
    isPredictable: false,
    excludedFromPending: false,
    detectionLabel: "Variável",
    forecastLabel: "não entra na previsão",
    listLabel: "variável",
  };
}

function getRecurringEntryDayInfo(entry, history = null) {
  const sourceHistory = history || getRecurringHistoryForEntry(entry, 6, false);
  const dueDayMode = normalizeRecurringDueDayMode(entry?.dueDayMode);
  const manualDueDay = normalizeRecurringManualDueDay(entry?.manualDueDay);

  if (dueDayMode === "manual" && manualDueDay) {
    const value = String(manualDueDay).padStart(2, "0");
    return {
      typicalDay: manualDueDay,
      shortLabel: `Dia ${value}`,
      longLabel: `Dia previsto ${value}`,
    };
  }

  return getRecurringDaySummary(sourceHistory?.dayValues || []);
}

function getRecentPeriods(monthCount, offsetFromCurrent = 0) {
  const periods = [];
  const baseDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, 1);

  for (let index = offsetFromCurrent; index < offsetFromCurrent + monthCount; index += 1) {
    const periodDate = new Date(baseDate.getFullYear(), baseDate.getMonth() - index, 1);
    periods.push(`${periodDate.getFullYear()}-${String(periodDate.getMonth() + 1).padStart(2, "0")}`);
  }

  return periods;
}

function getMovementDayOfMonth(dateValue) {
  const match = String(dateValue || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  return Number(match[3]);
}

function getMostCommonNumber(values) {
  const counts = new Map();

  values.forEach((value) => {
    counts.set(value, (counts.get(value) || 0) + 1);
  });

  return Array.from(counts.entries())
    .sort((left, right) => right[1] - left[1] || left[0] - right[0])[0]?.[0] || null;
}

function buildRecurringSuggestedMatchText(description) {
  const compact = String(description || "")
    .replace(/\b\d{4,}\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return compact || String(description || "").trim();
}

function mergeRecurringSuggestionGroups(groups) {
  const mergedGroups = [];

  groups.forEach((group) => {
    const targetGroup = mergedGroups.find((candidate) => shouldMergeRecurringSuggestionGroups(candidate, group));

    if (!targetGroup) {
      mergedGroups.push({
        ...group,
        movements: [...group.movements],
        periods: new Set(group.periods),
        descriptions: new Map(group.descriptions),
      });
      return;
    }

    group.movements.forEach((movement) => {
      targetGroup.movements.push(movement);
    });
    group.periods.forEach((periodKey) => {
      targetGroup.periods.add(periodKey);
    });
    group.descriptions.forEach((count, description) => {
      targetGroup.descriptions.set(description, (targetGroup.descriptions.get(description) || 0) + count);
    });
  });

  return mergedGroups;
}

function shouldMergeRecurringSuggestionGroups(leftGroup, rightGroup) {
  const leftDescription = getGroupPrimaryRecurringDescription(leftGroup);
  const rightDescription = getGroupPrimaryRecurringDescription(rightGroup);
  const leftTokens = getRecurringComparableTokens(leftDescription);
  const rightTokens = getRecurringComparableTokens(rightDescription);
  const sharedTokens = leftTokens.filter((token) => rightTokens.includes(token));
  const leftAverage = getRecurringAverageAmount(leftGroup.movements);
  const rightAverage = getRecurringAverageAmount(rightGroup.movements);
  const amountRatio = Math.min(leftAverage, rightAverage) / Math.max(leftAverage, rightAverage, 1);

  return sharedTokens.length >= 2 && amountRatio >= 0.55;
}

function getGroupPrimaryRecurringDescription(group) {
  return Array.from(group?.descriptions?.entries?.() || [])
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "pt-PT"))[0]?.[0] || "";
}

function getRecurringAverageAmount(movements) {
  const items = Array.isArray(movements) ? movements : [];

  if (items.length === 0) {
    return 0;
  }

  return items.reduce((sum, movement) => sum + Math.abs(Number(movement.amount || 0)), 0) / items.length;
}

function getRecurringComparableTokens(description) {
  return normalizeRecurringDescription(description)
    .replace(/[.,;:!?()[\]{}"'/\\_*+=~-]/g, " ")
    .replace(/^(dd|cobranca sdd|cobranca|pagamento|pag prestacao|prestacao|trf imediata c cartao mbway app propria p)\s+/g, "")
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !/^\d+$/.test(token) && !["adc", "cartao", "online", "propria", "app"].includes(token))
    .slice(0, 6);
}

function getRecurringDaySummary(dayValues) {
  const validDays = (dayValues || []).filter((value) => Number.isFinite(value));
  const uniqueDays = Array.from(new Set(validDays)).sort((left, right) => left - right);
  const typicalDay = getMostCommonNumber(validDays);

  if (uniqueDays.length === 0) {
    return {
      typicalDay: null,
      shortLabel: "Dia variável",
      longLabel: "Dia variável",
    };
  }

  if (uniqueDays.length === 1) {
    const value = String(uniqueDays[0]).padStart(2, "0");
    return {
      typicalDay: uniqueDays[0],
      shortLabel: `Dia ${value}`,
      longLabel: `Dia habitual ${value}`,
    };
  }

  const minDay = uniqueDays[0];
  const maxDay = uniqueDays[uniqueDays.length - 1];

  if (maxDay - minDay <= 2) {
    return {
      typicalDay,
      shortLabel: `${String(minDay).padStart(2, "0")}-${String(maxDay).padStart(2, "0")}`,
      longLabel: `Entre os dias ${String(minDay).padStart(2, "0")} e ${String(maxDay).padStart(2, "0")}`,
    };
  }

  return {
    typicalDay,
    shortLabel: `~${String(typicalDay || minDay).padStart(2, "0")}`,
    longLabel: `Por volta do dia ${String(typicalDay || minDay).padStart(2, "0")}`,
  };
}

function copyTrackedEntriesFromPreviousMonth() {
  if (!account) {
    return;
  }

  const periodKey = getSelectedPeriod();
  const previousPeriodKey = getPreviousPeriodKey(periodKey);
  const previousEntries = getMovementRules(previousPeriodKey);
  const currentEntries = getMovementRules(periodKey);

  if (previousEntries.length === 0) {
    setMovementRulesFeedback("Não existem linhas no mês anterior para copiar.");
    trackingFeedback.textContent = "Não existem linhas no mês anterior para copiar.";
    return;
  }

  const nextEntries = previousEntries.map((previousEntry) => ({
    ...previousEntry,
    id: crypto.randomUUID(),
  }));

  if (
    JSON.stringify(currentEntries.map((entry) => ({
      matchText: entry.matchText,
      label: entry.label,
      amountMatch: normalizeRecurringAmountMatch(entry.amountMatch),
      excludeFromPending: shouldExcludeRecurringFromPending(entry),
      forecastMode: normalizeRecurringForecastMode(entry.forecastMode),
      dueDayMode: normalizeRecurringDueDayMode(entry.dueDayMode),
      manualDueDay: normalizeRecurringManualDueDay(entry.manualDueDay),
    })))
    === JSON.stringify(nextEntries.map((entry) => ({
      matchText: entry.matchText,
      label: entry.label,
      amountMatch: normalizeRecurringAmountMatch(entry.amountMatch),
      excludeFromPending: shouldExcludeRecurringFromPending(entry),
      forecastMode: normalizeRecurringForecastMode(entry.forecastMode),
      dueDayMode: normalizeRecurringDueDayMode(entry.dueDayMode),
      manualDueDay: normalizeRecurringManualDueDay(entry.manualDueDay),
    })))
  ) {
    setMovementRulesFeedback("O mês atual já está igual ao mês anterior.");
    trackingFeedback.textContent = "O mês atual já está igual ao mês anterior.";
    trackingMenu?.classList.add("hidden");
    trackingMenuToggle?.setAttribute("aria-expanded", "false");
    return;
  }

  account.movementRulesByPeriod[periodKey] = nextEntries;
  const action = {
    type: "copy-tracking-entries",
    accountId: account.id,
    periodKey,
    addedEntries: nextEntries,
    previousEntriesSnapshot: currentEntries,
    nextEntriesSnapshot: nextEntries,
  };

  saveAccountsSnapshot();
  pushHistoryAction(action);
  addActivityEntry({
    title: "Acompanhamento copiado",
    description: `${account.bankName}: as despesas recorrentes de ${formatPeriodLabel(periodKey)} foram substituídas por ${formatPeriodLabel(previousPeriodKey)}.`,
  });
  const copyFeedback = `${nextEntries.length} regras copiadas do mês anterior, substituindo o conteúdo atual.`;
  setMovementRulesFeedback(copyFeedback);
  trackingFeedback.textContent = copyFeedback;
  trackingMenu?.classList.add("hidden");
  trackingMenuToggle?.setAttribute("aria-expanded", "false");
  isTrackingDeleteMode = false;
  showUndoToast(`Despesas recorrentes alinhadas com ${formatPeriodLabel(previousPeriodKey)}.`, executeUndo);
  refreshRecurringTrackingUi();
}

function updateTrackingMenuState() {
  if (!deleteSelectedTrackingEntryButton) {
    return;
  }

  deleteSelectedTrackingEntryButton.disabled = getMovementRules().length === 0;
}

function deleteExpandedTrackingEntry() {
  if (getMovementRules().length === 0) {
    trackingFeedback.textContent = "Não existem despesas recorrentes para apagar.";
    return;
  }

  trackingMenu?.classList.add("hidden");
  trackingMenuToggle?.setAttribute("aria-expanded", "false");
  isTrackingDeleteMode = !isTrackingDeleteMode;
  trackingFeedback.textContent = isTrackingDeleteMode ? "Escolhe o x da linha que queres apagar." : "";
  renderTrackingPanel();
}

function cancelTrackingDeleteMode() {
  isTrackingDeleteMode = false;
  trackingFeedback.textContent = "";
  renderTrackingPanel();
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
  clearExportReminder(false);

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

function syncExportReminderState() {
  restoreExportReminderState();
}

function syncAccountsState() {
  const storedAccounts = loadAccounts();

  if (!Array.isArray(storedAccounts) || storedAccounts.length === 0) {
    return;
  }

  accounts = storedAccounts;
  renderRelatedAccountsDock();
}

function collapseTrackingExpandedState() {
  if (!isTrackingExpanded && !expandedTrackingEntryId) {
    return;
  }

  isTrackingExpanded = false;
  expandedTrackingEntryId = null;
  renderTrackingPanel();
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

function clearExportReminder(shouldPersist = true) {
  window.clearTimeout(exportReminderTimer);
  exportReminderTimer = null;
  stopExportReminderAnimation();
  exportReminderStartedAt = 0;
  exportReminderDeadline = 0;
  if (shouldPersist) {
    persistExportReminderState();
  }
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

async function exportAllData() {
  clearExportReminder();
  const now = new Date();
  const exportPayload = {
    exportedAt: now.toISOString(),
    appVersion: window.FINANCE_APP_VERSION || "1.3",
    version: 1,
    accounts: loadJson(ACCOUNTS_STORAGE_KEY),
    recycledAccounts: loadJson(RECYCLE_STORAGE_KEY),
    statementsByAccount: loadStatementsStore(),
    activityLog: loadJson(ACTIVITY_STORAGE_KEY),
    internalMovementRules: loadJson(INTERNAL_MOVEMENTS_STORAGE_KEY, []),
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

function isValidBackup(data) {
  return Boolean(
    data
    && typeof data === "object"
    && Array.isArray(data.accounts)
    && typeof data.statementsByAccount === "object",
  );
}

async function importAllData(event) {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  try {
    const content = await file.text();
    const importedData = JSON.parse(content);

    if (!isValidBackup(importedData)) {
      throw new Error("Formato inválido.");
    }

    saveJson(ACCOUNTS_STORAGE_KEY, Array.isArray(importedData.accounts) ? importedData.accounts : []);
    saveJson(RECYCLE_STORAGE_KEY, Array.isArray(importedData.recycledAccounts) ? importedData.recycledAccounts : []);
    saveJson(STATEMENTS_STORAGE_KEY, migrateStatementsStore(importedData.statementsByAccount || {}));
    saveJson(ACTIVITY_STORAGE_KEY, Array.isArray(importedData.activityLog) ? importedData.activityLog : []);
    saveJson(INTERNAL_MOVEMENTS_STORAGE_KEY, Array.isArray(importedData.internalMovementRules) ? importedData.internalMovementRules : []);
    window.localStorage.setItem(BACKUP_PIN_STORAGE_KEY, typeof importedData.pin === "string" ? importedData.pin : "");
    addActivityEntry({
      title: "Backup importado",
      description: "Os dados da aplicação foram repostos a partir de um ficheiro de backup.",
    });
    showDataTransferFeedback("Dados importados com sucesso.");
    window.location.reload();
  } catch {
    showDataTransferFeedback("Não foi possível importar este ficheiro.");
  } finally {
    if (importDataFile) {
      importDataFile.value = "";
    }
  }
}

function getSelectedPeriod() {
  return `${selectedYear}-${selectedMonth}`;
}

function getMovementsForPeriod(periodKey) {
  return getAccountStatementRecord(account.id).periods[periodKey] || [];
}

function getEditableStatementText(periodKey) {
  const accountStatements = getAccountStatementRecord(account.id);
  const savedText = accountStatements.statementTexts?.[periodKey];

  if (typeof savedText === "string" && savedText.trim()) {
    return savedText;
  }

  return serializeMovementsToStatementText(accountStatements.periods?.[periodKey] || []);
}

function serializeMovementsToStatementText(movements) {
  return (Array.isArray(movements) ? movements : [])
    .map((movement) => [
      formatStatementDate(movement.date),
      formatStatementDate(movement.date),
      movement.description || "Movimento",
      formatStatementMoney(movement.amount),
      formatStatementMoney(movement.balance),
    ].join("\t"))
    .join("\n");
}

function formatStatementDate(value) {
  if (!value) {
    return "";
  }

  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return String(value);
  }

  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

function formatStatementMoney(value) {
  const amount = Number(value || 0);

  if (!Number.isFinite(amount)) {
    return "0";
  }

  return amount.toFixed(2).replace(".", ",");
}

function hasStatementsForPeriod(periodKey) {
  return getMovementsForPeriod(periodKey).length > 0;
}

function getAllAccountMovements() {
  return Object.values(getAccountStatementRecord(account.id).periods).flat();
}

function getMostRecentBalanceMovement() {
  const accountStatements = getAccountStatementRecord(account.id);
  const latestPeriodKey = getMostRecentPeriodKey(accountStatements);

  if (!latestPeriodKey) {
    return getMonthlyFinalBalanceMovement(getAllAccountMovements());
  }

  return getMonthlyFinalBalanceMovement(accountStatements.periods[latestPeriodKey] || []);
}

function getFinancialProductsTotal() {
  return getFinancialProductsForSelectedPeriod().reduce((total, product) => total + Number(product.value || 0), 0);
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

  return "financial";
}

function getFinancialProductKindLabel(kind) {
  const normalizedKind = normalizeFinancialProductKind(kind);

  if (normalizedKind === "ppr") {
    return "PPR";
  }

  if (normalizedKind === "fund") {
    return "Fundo de investimento";
  }

  return "Poupança";
}

function getFinancialProductsTotalForPeriod(periodKey) {
  return (account?.financialProductsByPeriod?.[periodKey] || [])
    .reduce((total, product) => total + Number(product.value || 0), 0);
}

function getCurrentBalanceForPeriod(periodKey) {
  const finalBalanceMovement = getMonthlyFinalBalanceMovement(getMovementsForPeriod(periodKey));
  const financialProductsTotal = getFinancialProductsTotalForPeriod(periodKey);

  if (finalBalanceMovement) {
    return Number(finalBalanceMovement.balance || 0) + financialProductsTotal;
  }

  if (financialProductsTotal !== 0) {
    return financialProductsTotal;
  }

  return null;
}

function getDisplayFinalBalanceInfoForPeriod(periodKey) {
  const directFinalBalanceMovement = getMonthlyFinalBalanceMovement(getMovementsForPeriod(periodKey));

  if (directFinalBalanceMovement) {
    return {
      balance: Number(directFinalBalanceMovement.balance || 0),
      isProvisional: false,
      referencePeriodKey: periodKey,
    };
  }

  let cursorPeriodKey = getPreviousPeriodKey(periodKey);

  while (cursorPeriodKey && cursorPeriodKey >= "2000-01") {
    const previousFinalBalanceMovement = getMonthlyFinalBalanceMovement(getMovementsForPeriod(cursorPeriodKey));

    if (previousFinalBalanceMovement) {
      return {
        balance: Number(previousFinalBalanceMovement.balance || 0),
        isProvisional: true,
        referencePeriodKey: cursorPeriodKey,
      };
    }

    cursorPeriodKey = getPreviousPeriodKey(cursorPeriodKey);
  }

  return {
    balance: 0,
    isProvisional: false,
    referencePeriodKey: periodKey,
  };
}

function getDisplayBalanceInfoForPeriod(periodKey) {
  const directBalance = getCurrentBalanceForPeriod(periodKey);

  if (directBalance !== null) {
    return {
      balance: directBalance,
      isProvisional: false,
      referencePeriodKey: null,
    };
  }

  const previousPeriodKey = getPreviousPeriodKey(periodKey);
  const previousPeriodBalance = previousPeriodKey
    ? getCurrentBalanceForPeriod(previousPeriodKey)
    : null;

  if (previousPeriodBalance !== null) {
    return {
      balance: previousPeriodBalance,
      isProvisional: true,
      referencePeriodKey: previousPeriodKey,
    };
  }

  return {
    balance: getMostRecentCurrentBalance(),
    isProvisional: false,
    referencePeriodKey: null,
  };
}

function getMostRecentCurrentBalance() {
  const allPeriods = new Set([
    ...Object.keys(getAccountStatementRecord(account.id).periods),
    ...Object.keys(account?.financialProductsByPeriod || {}),
  ]);

  const mostRecentPeriod = Array.from(allPeriods).sort().reverse()[0];

  if (mostRecentPeriod) {
    const periodBalance = getCurrentBalanceForPeriod(mostRecentPeriod);

    if (periodBalance !== null) {
      return periodBalance;
    }
  }

  return Number(account.balance || 0);
}

function renderAnnualReport() {
  if (
    !annualReportSubtitle
    || !annualReportCredits
    || !annualReportExpenses
    || !annualReportNet
    || !annualReportRecurring
    || !annualReportTopRecurring
    || !annualReportRecurringShare
    || !annualReportRecurringCoverage
    || !annualReportRecurringList
  ) {
    return;
  }

  const cutoffMonth = Number(selectedMonth);
  const reportSummary = createAnnualReportSummary(cutoffMonth);
  const recurringTotals = getAnnualRecurringTotals(cutoffMonth);

  const totalCreditsValue = reportSummary.credits;
  const totalExpensesValue = reportSummary.expenses;
  const totalRecurringValue = recurringTotals.reduce((sum, item) => sum + item.total, 0);
  const netValue = totalCreditsValue - totalExpensesValue;

  annualReportSubtitle.textContent = `Visão acumulada de ${selectedYear} até ${formatMonthShort(selectedMonth)}.`;
  annualReportCredits.textContent = formatCurrency(totalCreditsValue);
  annualReportExpenses.textContent = formatCurrency(totalExpensesValue);
  annualReportNet.textContent = formatCurrency(netValue);
  annualReportNet.classList.remove("annual-report-net-positive", "annual-report-net-negative");
  if (netValue > 0.0001) {
    annualReportNet.classList.add("annual-report-net-positive");
  } else if (netValue < -0.0001) {
    annualReportNet.classList.add("annual-report-net-negative");
  }
  annualReportRecurring.textContent = formatCurrency(totalRecurringValue);
  annualReportTopRecurring.textContent = recurringTotals[0]
    ? `${recurringTotals[0].label} · ${formatCurrency(recurringTotals[0].total)}`
    : "Sem dados";
  annualReportRecurringShare.textContent = totalExpensesValue > 0
    ? `${Math.round((totalRecurringValue / totalExpensesValue) * 100)}%`
    : "0%";
  annualReportRecurringCoverage.textContent = recurringTotals.length.toString();

  annualReportRecurringList.innerHTML = recurringTotals.map((item) => `
    <article class="annual-report-recurring-row">
      <div class="annual-report-recurring-name">
        <strong>${escapeHtml(item.label)}</strong>
        <p>${item.occurrences} ${item.occurrences === 1 ? "movimento" : "movimentos"}</p>
      </div>
      <span class="annual-report-recurring-count">${item.count}/${item.selectedCount}</span>
      <span class="money-figure annual-report-recurring-value">${formatCurrency(item.currentMonthTotal)}</span>
      <span class="money-figure annual-report-recurring-value">${formatCurrency(item.averageMonthly)}</span>
      <span class="money-figure annual-report-recurring-value annual-report-recurring-value-accent tracking-expense">${formatCurrency(item.total)}</span>
    </article>
  `).join("");
  annualReportRecurringEmpty?.classList.toggle("hidden", recurringTotals.length > 0);
}

function createAnnualReportSummary(cutoffMonth) {
  let credits = 0;
  let expenses = 0;

  Array.from({ length: cutoffMonth }, (_, index) => index + 1).forEach((monthNumber) => {
    const periodKey = `${selectedYear}-${String(monthNumber).padStart(2, "0")}`;
    const movements = getAccountingMovements(getMovementsForPeriod(periodKey));
    credits += movements
      .filter((movement) => movement.amount > 0)
      .reduce((sum, movement) => sum + movement.amount, 0);
    expenses += movements
      .filter((movement) => movement.amount < 0)
      .reduce((sum, movement) => sum + Math.abs(movement.amount), 0);
  });

  return {
    credits,
    expenses,
    finalBalance: Number(getMonthlyFinalBalanceMovement(getMovementsForPeriod(getSelectedPeriod()))?.balance || 0),
  };
}

function getAnnualRecurringTotals(cutoffMonth) {
  const selectedEntries = getSelectedRecurringEntriesUntil(cutoffMonth);

  return selectedEntries
    .map((entry) => {
      let total = 0;
      let count = 0;
      let occurrences = 0;

      Array.from({ length: cutoffMonth }, (_, index) => index + 1).forEach((monthNumber) => {
        const periodKey = `${selectedYear}-${String(monthNumber).padStart(2, "0")}`;
        const matchedMovements = getTrackedMovements(entry, periodKey)
          .filter((movement) => movement.amount < 0);
        const expenseTotal = matchedMovements
          .reduce((sum, movement) => sum + Math.abs(movement.amount), 0);

        total += expenseTotal;
        occurrences += matchedMovements.length;

        if (expenseTotal > 0) {
          count += 1;
        }
      });

      const currentMonthTotal = getTrackedMovements(entry, getSelectedPeriod())
        .filter((movement) => movement.amount < 0)
        .reduce((sum, movement) => sum + Math.abs(movement.amount), 0);

      return {
        label: entry.label,
        total,
        count,
        occurrences,
        selectedCount: entry.selectedCount,
        currentMonthTotal,
        averageMonthly: count > 0 ? total / count : 0,
      };
    })
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label, "pt-PT"));
}

function getSelectedRecurringEntriesUntil(cutoffMonth) {
  const entriesByIdentity = new Map();

  Array.from({ length: cutoffMonth }, (_, index) => index + 1).forEach((monthNumber) => {
    const periodKey = `${selectedYear}-${String(monthNumber).padStart(2, "0")}`;
    getMovementRules(periodKey).forEach((entry) => {
      const identity = createTrackingEntryIdentity(entry);

      if (!identity) {
        return;
      }

      if (!entriesByIdentity.has(identity)) {
        entriesByIdentity.set(identity, {
          label: entry.label,
          matchText: entry.matchText,
          amountMatchText: entry.amountMatchText || "",
          amountMatch: normalizeRecurringAmountMatch(entry.amountMatch),
          forecastMode: normalizeRecurringForecastMode(entry.forecastMode),
          dueDayMode: normalizeRecurringDueDayMode(entry.dueDayMode),
          manualDueDay: normalizeRecurringManualDueDay(entry.manualDueDay),
          excludeFromPending: shouldExcludeRecurringFromPending(entry),
          selectedMonths: new Set([monthNumber]),
        });
        return;
      }

      const current = entriesByIdentity.get(identity);
      current.label = entry.label || current.label;
      current.matchText = entry.matchText || current.matchText;
      current.amountMatchText = entry.amountMatchText || current.amountMatchText || "";
      current.amountMatch = normalizeRecurringAmountMatch(entry.amountMatch) ?? current.amountMatch ?? null;
      current.forecastMode = normalizeRecurringForecastMode(entry.forecastMode || current.forecastMode);
      current.dueDayMode = normalizeRecurringDueDayMode(entry.dueDayMode || current.dueDayMode);
      current.manualDueDay = normalizeRecurringManualDueDay(entry.manualDueDay) ?? current.manualDueDay ?? null;
      current.excludeFromPending = shouldExcludeRecurringFromPending(entry) || current.excludeFromPending;
      current.selectedMonths.add(monthNumber);
    });
  });

  return Array.from(entriesByIdentity.values()).map((entry) => ({
    label: entry.label,
    matchText: entry.matchText,
    amountMatchText: entry.amountMatchText || "",
    amountMatch: normalizeRecurringAmountMatch(entry.amountMatch),
    forecastMode: normalizeRecurringForecastMode(entry.forecastMode),
    dueDayMode: normalizeRecurringDueDayMode(entry.dueDayMode),
    manualDueDay: normalizeRecurringManualDueDay(entry.manualDueDay),
    excludeFromPending: Boolean(entry.excludeFromPending),
    selectedCount: entry.selectedMonths.size,
  }));
}

function formatMonthShort(month) {
  return new Intl.DateTimeFormat("pt-PT", { month: "long" })
    .format(new Date(`${selectedYear}-${month}-01`));
}

function formatSignedCurrency(value) {
  const amount = Number(value || 0);

  if (amount === 0) {
    return formatCurrency(0);
  }

  return `${amount > 0 ? "+" : "-"}${formatCurrency(Math.abs(amount))}`;
}

function getAnnualRecurringDeltaClass(value) {
  if (value > 0) {
    return "is-up";
  }

  if (value < 0) {
    return "is-down";
  }

  return "is-neutral";
}

function ensureFinancialProducts() {
  let hasChanges = false;

  if (!account.financialProductsByPeriod || typeof account.financialProductsByPeriod !== "object") {
    const fallbackPeriod = getMostRecentPeriodKey(getAccountStatementRecord(account.id)) || getSelectedPeriod();
    account.financialProductsByPeriod = {};

    if (Array.isArray(account.financialProducts) && account.financialProducts.length > 0) {
      account.financialProductsByPeriod[fallbackPeriod] = account.financialProducts;
    }

    delete account.financialProducts;
    hasChanges = true;
  }

  Object.keys(account.financialProductsByPeriod).forEach((periodKey) => {
    account.financialProductsByPeriod[periodKey] = account.financialProductsByPeriod[periodKey].map((product) => {
      const nextProduct = {
        ...product,
        kind: normalizeFinancialProductKind(product.kind),
        name: sanitizeFinancialProductName(product.name || ""),
      };

      if (nextProduct.kind !== product.kind || nextProduct.name !== product.name) {
        hasChanges = true;
      }

      return nextProduct;
    });

    account.financialProductsByPeriod[periodKey].forEach((product) => {
      const cleanedName = sanitizeFinancialProductName(product.name || "");

      if (cleanedName !== (product.name || "")) {
        product.name = cleanedName;
        hasChanges = true;
      }

      const normalizedKind = normalizeFinancialProductKind(product.kind);

      if (product.kind !== normalizedKind) {
        product.kind = normalizedKind;
        hasChanges = true;
      }
    });
  });

  if (hasChanges) {
    saveAccountsSnapshot();
  }
}

function getFinancialProductsForSelectedPeriod() {
  return account?.financialProductsByPeriod?.[getSelectedPeriod()] || [];
}

function sanitizeFinancialProductName(name) {
  const rawName = String(name || "");
  const compactName = rawName.replace(/\s+/g, " ").trim();

  if (!compactName) {
    return "";
  }

  const segments = rawName
    .split(/(?:\t|\u00a0| {3,})+/)
    .map((segment) => segment.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  if (segments.length <= 1) {
    return compactName;
  }

  const uniqueSegments = [];
  const seen = new Set();

  segments.forEach((segment) => {
    const normalized = normalizeDescription(segment);

    if (!normalized || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    uniqueSegments.push(segment);
  });

  if (uniqueSegments.length === 1) {
    return uniqueSegments[0];
  }

  return compactName;
}

function getFinancialProductHistory(product) {
  const targetName = normalizeDescription(product.name || "");

  return Object.keys(account?.financialProductsByPeriod || {})
    .sort()
    .map((periodKey) => {
      const matchingProducts = (account.financialProductsByPeriod[periodKey] || [])
        .filter((item) => (
          normalizeFinancialProductKind(item.kind) === normalizeFinancialProductKind(product.kind)
          && normalizeDescription(item.name || "") === targetName
        ));

      if (matchingProducts.length === 0) {
        return null;
      }

      return {
        periodKey,
        label: formatPeriodChartLabel(periodKey),
        value: matchingProducts.reduce((sum, item) => sum + Number(item.value || 0), 0),
      };
    })
    .filter(Boolean);
}

function getPreviousPeriodKey(periodKey) {
  const [year, month] = periodKey.split("-").map(Number);
  const previousDate = new Date(year, month - 2, 1);
  const previousYear = previousDate.getFullYear();
  const previousMonth = String(previousDate.getMonth() + 1).padStart(2, "0");

  return `${previousYear}-${previousMonth}`;
}

function getNextPeriodKey(periodKey) {
  const [year, month] = periodKey.split("-").map(Number);
  const nextDate = new Date(year, month, 1);
  const nextYear = nextDate.getFullYear();
  const nextMonth = String(nextDate.getMonth() + 1).padStart(2, "0");

  return `${nextYear}-${nextMonth}`;
}

function getMonthlyFinalBalanceMovement(movements) {
  return movements.length > 0 ? movements[0] : null;
}

function formatPeriodLabel(periodKey) {
  const [year, month] = periodKey.split("-");
  return new Intl.DateTimeFormat("pt-PT", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${year}-${month}-01`));
}

function formatPeriodChartLabel(periodKey) {
  const [year, month] = periodKey.split("-");
  const shortMonth = new Intl.DateTimeFormat("pt-PT", { month: "short" })
    .format(new Date(`${year}-${month}-01`))
    .replace(".", "");

  return `${shortMonth.charAt(0).toUpperCase()}${shortMonth.slice(1)} ${year}`;
}

function getAccountStatementRecord(id) {
  if (!id) {
    return { periods: {}, statementTexts: {}, lastImportedPeriod: "" };
  }

  const record = statementsByAccount[id];

  if (!record) {
    return { periods: {}, statementTexts: {}, lastImportedPeriod: "" };
  }

  if (record.periods) {
    if (!record.statementTexts || typeof record.statementTexts !== "object") {
      record.statementTexts = {};
    }
    return record;
  }

  return {
    periods: record,
    statementTexts: {},
    lastImportedPeriod: Object.keys(record).sort().reverse()[0] || "",
  };
}

function getMostRecentPeriodKey(record) {
  return Object.keys(record.periods).sort().reverse()[0] || "";
}

function migrateStatementsStore(store) {
  return Object.fromEntries(
    Object.entries(store).map(([id, value]) => {
      if (Array.isArray(value)) {
        return [id, { periods: {}, statementTexts: {}, lastImportedPeriod: "" }];
      }

      if (value && typeof value === "object" && "periods" in value) {
        return [id, {
          periods: value.periods && typeof value.periods === "object" ? value.periods : {},
          statementTexts: value.statementTexts && typeof value.statementTexts === "object" ? value.statementTexts : {},
          lastImportedPeriod: value.lastImportedPeriod || Object.keys(value.periods || {}).sort().reverse()[0] || "",
        }];
      }

      const periods = value && typeof value === "object" ? value : {};
      return [
        id,
        {
          periods,
          statementTexts: {},
          lastImportedPeriod: Object.keys(periods).sort().reverse()[0] || "",
        },
      ];
    }),
  );
}

function sanitizeYear(value) {
  return /^\d{4}$/.test(value || "") ? value : "";
}

function sanitizeMonth(value) {
  return /^(0[1-9]|1[0-2])$/.test(value || "") ? value : "";
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
      ".page-shell, .month-navigation, .related-accounts-dock, .history-toolbar, .data-transfer-dock, .turma-scroll-top-button, .modal, .app-lock-screen, .undo-toast, .statement-toast, button, a, input, select, textarea, label",
    )
  ) {
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
