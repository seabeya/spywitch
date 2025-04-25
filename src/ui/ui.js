/*
 * Wrapped the entire code in an IIFE to prevent global variable leakage.
 */

// Navigation:
(() => {
  const SYSTEM_PAGES = new Set(["#setup", "#spy", "#watch", "#about"]);
  const DEFAULT_PAGE = "#spy";

  let activePageElement = null;
  let activeHash = null;

  const ACTIVATOR = "active";

  const navigateToPage = () => {
    const currentHash = location.hash;
    const requestedPageHash = SYSTEM_PAGES.has(currentHash)
      ? currentHash
      : DEFAULT_PAGE;

    // Deactivate the current page and navigation button:
    activePageElement?.classList.remove(ACTIVATOR);
    document.getElementById(activeHash)?.classList.remove(ACTIVATOR);

    // Get the page element collection and look for the requested page:
    const pageCollection = document.getElementsByClassName("page");
    for (const pageElement of pageCollection) {
      if (pageElement.getAttribute("page") === requestedPageHash) {
        pageElement.classList.add(ACTIVATOR);
        // Activate button:
        document.getElementById(requestedPageHash)?.classList.add(ACTIVATOR);
        activePageElement = pageElement;
        activeHash = requestedPageHash;
        break;
      }
    }
  };

  const handlePageLoad = () => {
    navigateToPage();
    window.removeEventListener("load", handlePageLoad);
  };

  // Listeners:
  window.addEventListener("load", handlePageLoad);
  window.addEventListener("hashchange", navigateToPage);
})();

// -------------------------

// Search Mode:
(() => {
  const searchModeBtn = document.getElementById("s-search-mode");
  const autoDescElement = document.getElementById("search-mode-auto-desc");
  const autoDesc2Element = document.getElementById("search-mode-auto-desc-2");
  const manualDescElement = document.getElementById("search-mode-manual-desc");

  const channelsLabelElement = document.getElementById("channels-label");
  const channelsTextareaElement = document.getElementById("channels");

  const ACTIVATOR = "active";

  const switchSearchMode = (targetMode) => {
    switch (targetMode) {
      case "auto":
        manualDescElement.classList.remove(ACTIVATOR);
        channelsLabelElement.classList.remove(ACTIVATOR);
        channelsTextareaElement.classList.remove(ACTIVATOR);

        autoDescElement.classList.add(ACTIVATOR);
        autoDesc2Element.classList.add(ACTIVATOR);
        break;

      case "manual":
        autoDescElement.classList.remove(ACTIVATOR);
        autoDesc2Element.classList.remove(ACTIVATOR);

        manualDescElement.classList.add(ACTIVATOR);
        channelsLabelElement.classList.add(ACTIVATOR);
        channelsTextareaElement.classList.add(ACTIVATOR);
        break;

      default:
        console.error("Invalid search mode.");
        break;
    }
  };

  const handleSearchModeClick = (event) => {
    const targetModeBtn = event.target;
    if (targetModeBtn.tagName === "INPUT") {
      const targetMode = targetModeBtn.id;
      switchSearchMode(targetMode);
    }
  };

  // Listeners:
  searchModeBtn.addEventListener("click", handleSearchModeClick);
})();

// -------------------------

// Spy Toggle:
(() => {
  const spyToggle = async (event) => {
    const currSpyStatus = event.target.getAttribute("status");

    try {
      const { spy } = await import("../worker/spy.js");
      spy(currSpyStatus);
    } catch (error) {
      console.error('Failed to import "spy" module.');
    }
  };

  // Listeners:
  document.getElementById("spy-btn").addEventListener("click", spyToggle);
})();

// -------------------------

// Watch Tabs Switch:
(() => {
  // Current state:
  let activeTabBtn = null;
  let activeTab = null;

  const ACTIVATOR = "active";

  const activateTab = (tabBtn, tab) => {
    // Close current tabs:
    activeTabBtn?.classList.remove(ACTIVATOR);
    activeTab?.classList.remove(ACTIVATOR);

    // Alert remove:
    tabBtn.classList.remove("alert");

    // Activate tabs:
    tabBtn.classList.add(ACTIVATOR);
    tab.classList.add(ACTIVATOR);

    // Save current state:
    activeTabBtn = tabBtn;
    activeTab = tab;
  };

  const handleActivateTab = (event) => {
    const tabBtn = event.target;
    if (tabBtn.tagName === "SPAN") {
      // Get target information:
      const username = tabBtn.getAttribute("id").slice(2);
      const tab = document.getElementById(`c_${username}`);

      // from:
      document.getElementById("from").innerText = username;

      activateTab(tabBtn, tab);
    }
  };

  // Listeners:
  document.getElementById("users").addEventListener("click", handleActivateTab);
})();
