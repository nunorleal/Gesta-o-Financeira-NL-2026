(function () {
  const APP_VERSION = "1.4";
  const APP_VERSION_UPDATED_AT = "2026-09-27";

  window.FINANCE_APP_VERSION = APP_VERSION;
  window.FINANCE_APP_VERSION_UPDATED_AT = APP_VERSION_UPDATED_AT;

  function renderAppVersion() {
    document.querySelectorAll("[data-app-version]").forEach((element) => {
      element.textContent = APP_VERSION;
    });

    document.querySelectorAll("[data-app-version-label]").forEach((element) => {
      element.textContent = `Versão ${APP_VERSION}`;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAppVersion, { once: true });
  } else {
    renderAppVersion();
  }
}());
