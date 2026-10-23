const PIN_STORAGE_KEY = "gestao-financeira-nl-pin";
const SESSION_UNLOCK_KEY = "gestao-financeira-nl-pin-session-unlocked";
const MASTER_PIN = "1915";

function readSavedPin() {
  try {
    return window.localStorage.getItem(PIN_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function savePin(pin) {
  try {
    window.localStorage.setItem(PIN_STORAGE_KEY, pin);
    return true;
  } catch {
    return false;
  }
}

function sanitizePin(value) {
  return String(value || "").replace(/\D/g, "");
}

function isSessionUnlocked() {
  try {
    return window.sessionStorage.getItem(SESSION_UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

function setSessionUnlocked() {
  try {
    window.sessionStorage.setItem(SESSION_UNLOCK_KEY, "1");
  } catch {
    // no-op
  }
}

function removeChangePinDialog() {
  document.querySelector("#pin-change-modal")?.remove();
}

function openChangePinDialog() {
  removeChangePinDialog();

  const modal = document.createElement("div");
  modal.id = "pin-change-modal";
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-backdrop" data-close-pin-change="true"></div>
    <div class="modal-card">
      <button type="button" class="modal-close" aria-label="Fechar" data-close-pin-change="true">×</button>
      <div class="panel-heading">
        <p class="section-kicker">Segurança</p>
        <h2>Alterar PIN</h2>
        <p>Atualiza o teu PIN de acesso à aplicação.</p>
      </div>
      <form id="pin-change-form" class="account-form">
        <label>
          PIN atual
          <input id="pin-change-current" type="password" inputmode="numeric" autocomplete="one-time-code" maxlength="8" required />
        </label>
        <label>
          Novo PIN
          <input id="pin-change-next" type="password" inputmode="numeric" autocomplete="one-time-code" maxlength="8" required />
        </label>
        <label>
          Confirmar novo PIN
          <input id="pin-change-confirm" type="password" inputmode="numeric" autocomplete="one-time-code" maxlength="8" required />
        </label>
        <button type="submit" class="primary-button">Guardar PIN</button>
      </form>
      <p id="pin-change-feedback" class="app-lock-feedback" aria-live="polite"></p>
    </div>
  `;

  document.body.appendChild(modal);

  const form = modal.querySelector("#pin-change-form");
  const currentInput = modal.querySelector("#pin-change-current");
  const nextInput = modal.querySelector("#pin-change-next");
  const confirmInput = modal.querySelector("#pin-change-confirm");
  const feedback = modal.querySelector("#pin-change-feedback");

  function closeDialog() {
    removeChangePinDialog();
  }

  modal.addEventListener("click", (event) => {
    if (event.target.dataset.closePinChange === "true") {
      closeDialog();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentPin = sanitizePin(currentInput.value);
    const nextPin = sanitizePin(nextInput.value);
    const confirmPin = sanitizePin(confirmInput.value);
    const savedPin = readSavedPin();

    if (!savedPin) {
      feedback.textContent = "Ainda não existe PIN definido.";
      return;
    }

    if (currentPin !== savedPin && currentPin !== MASTER_PIN) {
      feedback.textContent = "PIN atual inválido.";
      return;
    }

    if (nextPin.length < 4) {
      feedback.textContent = "O novo PIN deve ter pelo menos 4 dígitos.";
      return;
    }

    if (nextPin !== confirmPin) {
      feedback.textContent = "Os PINs não coincidem.";
      return;
    }

    if (!savePin(nextPin)) {
      feedback.textContent = "Não foi possível atualizar o PIN.";
      return;
    }

    setSessionUnlocked();
    feedback.textContent = "PIN atualizado com sucesso.";
    window.setTimeout(closeDialog, 700);
  });

  currentInput.focus();
}

function createLockMarkup() {
  const wrapper = document.createElement("div");
  wrapper.id = "app-lock-screen";
  wrapper.className = "app-lock-screen";
  wrapper.innerHTML = `
    <div class="app-lock-backdrop"></div>
    <section class="app-lock-card" role="dialog" aria-modal="true" aria-labelledby="app-lock-title">
      <p class="section-kicker">Segurança</p>
      <h2 id="app-lock-title">Desbloquear aplicação</h2>
      <p id="app-lock-description" class="app-lock-description"></p>
      <form id="app-lock-form" class="app-lock-form">
        <label id="app-lock-pin-wrap">
          PIN
          <input id="app-lock-pin" type="password" inputmode="numeric" autocomplete="one-time-code" maxlength="8" required />
        </label>
        <label id="app-lock-confirm-wrap" class="hidden">
          Confirmar PIN
          <input id="app-lock-confirm" type="password" inputmode="numeric" autocomplete="one-time-code" maxlength="8" />
        </label>
        <button type="submit" class="primary-button" id="app-lock-submit">Desbloquear</button>
      </form>
      <p id="app-lock-feedback" class="app-lock-feedback" aria-live="polite"></p>
    </section>
  `;

  return wrapper;
}

function setupLock() {
  const savedPin = readSavedPin();

  if (savedPin && isSessionUnlocked()) {
    return;
  }

  const lockRoot = createLockMarkup();
  document.body.appendChild(lockRoot);
  document.body.classList.add("is-locked");

  const description = lockRoot.querySelector("#app-lock-description");
  const form = lockRoot.querySelector("#app-lock-form");
  const pinInput = lockRoot.querySelector("#app-lock-pin");
  const confirmWrap = lockRoot.querySelector("#app-lock-confirm-wrap");
  const confirmInput = lockRoot.querySelector("#app-lock-confirm");
  const submitButton = lockRoot.querySelector("#app-lock-submit");
  const feedback = lockRoot.querySelector("#app-lock-feedback");

  let activePin = savedPin;
  let isSetupMode = activePin === "";

  function renderMode() {
    if (isSetupMode) {
      description.textContent = "Define o teu PIN pessoal para proteger a aplicação.";
      submitButton.textContent = "Guardar PIN";
      confirmWrap.classList.remove("hidden");
      confirmInput.required = true;
      pinInput.value = "";
      confirmInput.value = "";
      feedback.textContent = "";
      pinInput.focus();
      return;
    }

    description.textContent = "Introduz o teu PIN para desbloquear a aplicação.";
    submitButton.textContent = "Desbloquear";
    confirmWrap.classList.add("hidden");
    confirmInput.required = false;
    confirmInput.value = "";
    pinInput.value = "";
    feedback.textContent = "";
    pinInput.focus();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const typedPin = sanitizePin(pinInput.value);

    if (typedPin.length < 4) {
      feedback.textContent = "O PIN deve ter pelo menos 4 dígitos.";
      return;
    }

    if (isSetupMode) {
      if (typedPin === MASTER_PIN) {
        setSessionUnlocked();
        document.body.classList.remove("is-locked");
        lockRoot.remove();
        return;
      }

      const typedConfirm = sanitizePin(confirmInput.value);

      if (typedPin !== typedConfirm) {
        feedback.textContent = "Os PINs não coincidem.";
        return;
      }

      if (!savePin(typedPin)) {
        feedback.textContent = "Não foi possível guardar o PIN neste dispositivo.";
        return;
      }

      activePin = typedPin;
      isSetupMode = false;
      renderMode();
      feedback.textContent = "PIN guardado com sucesso.";
      return;
    }

    if (typedPin === activePin || typedPin === MASTER_PIN) {
      setSessionUnlocked();
      document.body.classList.remove("is-locked");
      lockRoot.remove();
      return;
    }

    feedback.textContent = "PIN inválido.";
  });

  renderMode();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupLock);
} else {
  setupLock();
}

window.gestaoFinanceiraPin = {
  openChangePinDialog,
};
