(function () {
  const ACCOUNTS_STORAGE_KEY = "gestao-financeira-nl-accounts";
  const STATEMENTS_STORAGE_KEY = "gestao-financeira-nl-statements";
  const STOP_WORDS = new Set([
    "a", "ao", "aos", "as", "da", "das", "de", "do", "dos", "e", "em", "entre",
    "foi", "me", "mes", "mês", "mostra", "mostra-me", "movimento", "movimentos",
    "na", "nas", "no", "nos", "o", "os", "pagamento", "pagamentos", "paguei",
    "pago", "para", "por", "quando", "que", "qual", "quais", "referencia",
    "referência", "ultima", "última", "um", "uma", "ver",
  ]);

  const openButton = document.querySelector("#open-finance-chat");
  const modal = document.querySelector("#finance-chat-modal");
  const closeButton = document.querySelector("#close-finance-chat-modal");
  const form = document.querySelector("#finance-chat-form");
  const questionField = document.querySelector("#finance-chat-question");
  const answer = document.querySelector("#finance-chat-answer");
  const scopeField = document.querySelector("#finance-chat-scope");
  const accountField = document.querySelector("#finance-chat-account");
  const startDateField = document.querySelector("#finance-chat-start-date");
  const endDateField = document.querySelector("#finance-chat-end-date");
  const dateFields = Array.from(document.querySelectorAll(".finance-chat-date-field"));
  const countElement = document.querySelector("#finance-chat-count");
  const creditsElement = document.querySelector("#finance-chat-credits");
  const debitsElement = document.querySelector("#finance-chat-debits");
  const netElement = document.querySelector("#finance-chat-net");
  const resultsElement = document.querySelector("#finance-chat-results");
  const emptyElement = document.querySelector("#finance-chat-empty");

  let currentQuery = "";

  if (!openButton || !modal) {
    return;
  }

  const currencyFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });

  openButton.addEventListener("click", () => {
    openFinanceChat();
  });

  closeButton?.addEventListener("click", closeFinanceChat);
  modal.addEventListener("click", (event) => {
    if (event.target?.dataset?.closeFinanceChat === "true") {
      closeFinanceChat();
    }
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    currentQuery = questionField?.value?.trim() || "";
    renderFinanceChatResults();
  });

  [scopeField, accountField, startDateField, endDateField].forEach((field) => {
    field?.addEventListener("input", renderFinanceChatResults);
    field?.addEventListener("change", renderFinanceChatResults);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeFinanceChat();
    }
  });

  function openFinanceChat() {
    populateAccountFilter();
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    renderFinanceChatResults();
    window.setTimeout(() => questionField?.focus(), 50);
  }

  function closeFinanceChat() {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }

  function populateAccountFilter() {
    if (!accountField) {
      return;
    }

    const currentValue = accountField.value || "all";
    const accounts = loadAccounts();
    accountField.innerHTML = [
      `<option value="all">Todas as contas</option>`,
      ...accounts.map((account) => (
        `<option value="${escapeHtmlAttribute(account.id)}">${escapeHtml(account.bankName || "Conta")}</option>`
      )),
    ].join("");

    accountField.value = accounts.some((account) => account.id === currentValue) ? currentValue : "all";
  }

  function renderFinanceChatResults() {
    const queryText = currentQuery || questionField?.value?.trim() || "";
    const searchTerms = extractSearchTerms(queryText);
    const scope = scopeField?.value || "all";
    const results = searchTerms.length > 0
      ? getAllSearchableMovements()
        .filter((item) => matchesTerms(item, searchTerms))
        .filter((item) => isInSelectedScope(item, scope))
        .filter((item) => accountField?.value === "all" || item.accountId === accountField?.value)
      : [];

    const credits = results
      .filter((item) => Number(item.amount || 0) > 0)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const debits = results
      .filter((item) => Number(item.amount || 0) < 0)
      .reduce((sum, item) => sum + Math.abs(Number(item.amount || 0)), 0);

    toggleDateFields(scope === "range");
    countElement && (countElement.textContent = String(results.length));
    creditsElement && (creditsElement.textContent = formatCurrency(credits));
    debitsElement && (debitsElement.textContent = formatCurrency(debits));
    netElement && (netElement.textContent = formatCurrency(credits - debits));

    if (!queryText) {
      answer && (answer.textContent = "Pergunta por um movimento, entidade, referência ou valor. Ex.: “mostra-me os pagamentos da Vodafone”.");
      resultsElement && (resultsElement.innerHTML = "");
      emptyElement && (emptyElement.textContent = "Ainda não há resultados.");
      emptyElement?.classList.remove("hidden");
      return;
    }

    if (searchTerms.length === 0) {
      answer && (answer.textContent = "Preciso de uma palavra, número ou referência para pesquisar nos movimentos.");
      resultsElement && (resultsElement.innerHTML = "");
      emptyElement && (emptyElement.textContent = "Tenta escrever uma entidade, como Vodafone, PayPal ou Via Verde.");
      emptyElement?.classList.remove("hidden");
      return;
    }

    answer && (answer.textContent = createAnswerText(results, searchTerms));
    resultsElement && (resultsElement.innerHTML = results.map(createResultCard).join(""));
    emptyElement && (emptyElement.textContent = "Não encontrei movimentos com essa pesquisa e filtros.");
    emptyElement?.classList.toggle("hidden", results.length > 0);
  }

  function toggleDateFields(shouldShow) {
    dateFields.forEach((field) => field.classList.toggle("hidden", !shouldShow));
  }

  function createAnswerText(results, searchTerms) {
    const readableQuery = searchTerms.join(" ");

    if (results.length === 0) {
      return `Não encontrei movimentos para “${readableQuery}” com os filtros atuais.`;
    }

    const lastMovement = results[0];
    const totalDebits = results
      .filter((item) => Number(item.amount || 0) < 0)
      .reduce((sum, item) => sum + Math.abs(Number(item.amount || 0)), 0);
    const debitNote = totalDebits > 0 ? ` Débitos encontrados: ${formatCurrency(totalDebits)}.` : "";

    return `Encontrei ${results.length} ${results.length === 1 ? "movimento" : "movimentos"} para “${readableQuery}”. O mais recente é de ${formatDate(lastMovement.date)}, em ${lastMovement.accountName}.${debitNote}`;
  }

  function getAllSearchableMovements() {
    const accounts = loadAccounts();
    const accountNames = new Map(accounts.map((account) => [account.id, account.bankName || "Conta"]));
    const statements = loadStatements();

    return Object.entries(statements)
      .flatMap(([accountId, record]) => {
        const normalizedRecord = normalizeStatementRecord(record);

        return Object.entries(normalizedRecord.periods || {}).flatMap(([periodKey, movements]) => (
          Array.isArray(movements)
            ? movements.map((movement) => ({
              accountId,
              accountName: accountNames.get(accountId) || "Conta removida",
              periodKey,
              date: movement?.date || "",
              description: movement?.description || "",
              amount: Number(movement?.amount || 0),
              balance: Number(movement?.balance || 0),
              excludedFromAccounting: !!movement?.excludedFromAccounting,
            }))
            : []
        ));
      })
      .filter((item) => item.date && item.description)
      .sort((left, right) => String(right.date).localeCompare(String(left.date)));
  }

  function matchesTerms(item, searchTerms) {
    const haystack = normalizeText([
      item.accountName,
      item.description,
      item.periodKey,
      formatCurrency(item.amount),
      String(item.amount).replace(".", ","),
      String(Math.abs(item.amount)).replace(".", ","),
    ].join(" "));

    return searchTerms.every((term) => haystack.includes(normalizeText(term)));
  }

  function isInSelectedScope(item, scope) {
    if (scope === "month") {
      return item.periodKey === getCurrentPeriodKey();
    }

    if (scope === "year") {
      return item.periodKey.startsWith(`${new Date().getFullYear()}-`);
    }

    if (scope !== "range") {
      return true;
    }

    const startDate = startDateField?.value || "";
    const endDate = endDateField?.value || "";

    return (!startDate || item.date >= startDate) && (!endDate || item.date <= endDate);
  }

  function createResultCard(item) {
    const amountType = item.amount >= 0 ? "credit" : "debit";
    const internalBadge = item.excludedFromAccounting
      ? `<span class="movement-meta-badge">Movimento interno · excluído da contabilidade</span>`
      : "";

    return `
      <article class="movement-search-result finance-chat-result">
        <div class="movement-search-result-copy">
          <span class="card-label">${escapeHtml(formatDate(item.date))} · ${escapeHtml(formatPeriodLabel(item.periodKey))} · ${escapeHtml(item.accountName)}</span>
          <strong>${escapeHtml(item.description || "Movimento")}</strong>
          <p>Saldo após movimento: ${escapeHtml(formatCurrency(item.balance))}</p>
          ${internalBadge}
        </div>
        <strong class="money-figure movement-analysis-amount movement-analysis-amount-${amountType}">
          ${escapeHtml(formatCurrency(item.amount))}
        </strong>
      </article>
    `;
  }

  function extractSearchTerms(question) {
    const normalizedQuestion = normalizeText(question);
    const tokens = normalizedQuestion
      .split(/\s+/)
      .map((token) => token.trim())
      .filter(Boolean)
      .filter((token) => !STOP_WORDS.has(token));

    if (tokens.length === 0) {
      return [];
    }

    const numericTokens = tokens.filter((token) => /\d/.test(token));

    if (numericTokens.length > 0) {
      return numericTokens;
    }

    return tokens.slice(-4);
  }

  function loadAccounts() {
    return loadJson(ACCOUNTS_STORAGE_KEY, []);
  }

  function loadStatements() {
    return migrateStatementsStore(loadJson(STATEMENTS_STORAGE_KEY, {}));
  }

  function loadJson(key, fallback) {
    try {
      const rawValue = window.localStorage.getItem(key);
      return rawValue ? JSON.parse(rawValue) : fallback;
    } catch {
      return fallback;
    }
  }

  function normalizeStatementRecord(record) {
    if (!record || typeof record !== "object") {
      return { periods: {}, statementTexts: {}, lastImportedPeriod: "" };
    }

    if ("periods" in record) {
      return {
        periods: record.periods && typeof record.periods === "object" ? record.periods : {},
        statementTexts: record.statementTexts && typeof record.statementTexts === "object" ? record.statementTexts : {},
        lastImportedPeriod: record.lastImportedPeriod || "",
      };
    }

    return {
      periods: record,
      statementTexts: {},
      lastImportedPeriod: Object.keys(record).sort().reverse()[0] || "",
    };
  }

  function migrateStatementsStore(store) {
    return Object.fromEntries(
      Object.entries(store || {}).map(([id, value]) => [id, normalizeStatementRecord(value)]),
    );
  }

  function getCurrentPeriodKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  function formatCurrency(value) {
    return currencyFormatter.format(Number(value || 0)).replace(/\s/g, " ");
  }

  function formatDate(value) {
    if (!value) {
      return "";
    }

    return new Intl.DateTimeFormat("pt-PT").format(new Date(`${value}T00:00:00`));
  }

  function formatPeriodLabel(periodKey) {
    const [year, month] = String(periodKey || "").split("-");

    if (!year || !month) {
      return "";
    }

    return new Intl.DateTimeFormat("pt-PT", {
      month: "long",
      year: "numeric",
    }).format(new Date(`${year}-${month}-01T00:00:00`));
  }

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N},.-]+/gu, " ")
      .toLowerCase()
      .trim();
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeHtmlAttribute(value) {
    return escapeHtml(value);
  }
}());
