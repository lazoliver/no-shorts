const selectors = [
  "ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer",
  "grid-shelf-view-model.ytGridShelfViewModelHost.ytd-item-section-renderer.grid-shelf-with-top-margin",
  "ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer",
];

async function init() {
  let active;

  try {
    const state = await browser.storage.sync.get("active");
    active = state.active ?? true;
  } catch (error) {
    console.warn("Não foi possível acessar o storage:", error);
    return;
  }

  if (!active) return;

  function block() {
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.style.setProperty("display", "none", "important");
      });
    });
  }

  block();

  const observer = new MutationObserver(block);

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

init();
