const checkBox = document.getElementById("checkbox");

async function loadState() {
  const { active = true } = await browser.storage.sync.get("active");

  checkBox.checked = active;
}

checkBox.addEventListener("change", async () => {
  try {
    const active = checkBox.checked;

    await browser.storage.sync.set({
      active,
    });

    const tabs = await browser.tabs.query({
      url: ["*://www.youtube.com/*"],
    });

    await Promise.allSettled(
      tabs.map((tab) => {
        browser.tabs.reload(tab.id);
      }),
    );
  } catch (error) {
    console.error(error);
  }
});

loadState();
