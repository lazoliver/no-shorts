async function initialState() {
  await browser.storage.sync.set({ active: true });
}

initialState();
