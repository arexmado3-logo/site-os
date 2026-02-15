const SITE_KEY = "siteOsSites";

const siteForm = document.getElementById("siteForm");
const importForm = document.getElementById("importForm");
const siteList = document.getElementById("siteList");
const statusEl = document.getElementById("status");
const template = document.getElementById("siteItemTemplate");
const refreshBtn = document.getElementById("refreshBtn");

siteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("siteName").value.trim();
  const html = document.getElementById("siteHtml").value.trim();
  const css = document.getElementById("siteCss").value.trim();
  const js = document.getElementById("siteJs").value.trim();

  if (!name || !html) {
    setStatus("사이트 이름과 HTML을 입력해주세요.", true);
    return;
  }

  const sites = await getSites();
  sites.unshift({
    id: crypto.randomUUID(),
    name,
    html,
    css,
    js,
    updatedAt: new Date().toISOString(),
  });

  await saveSites(sites);
  siteForm.reset();
  setStatus("사이트를 저장했습니다.");
  renderSites(sites);
});

importForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const code = document.getElementById("shareCode").value.trim();

  try {
    const imported = decodeShareCode(code);
    const sites = await getSites();
    sites.unshift({
      ...imported,
      id: crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
    });
    await saveSites(sites);
    importForm.reset();
    setStatus(`'${imported.name}' 사이트를 가져왔습니다.`);
    renderSites(sites);
  } catch {
    setStatus("잘못된 공유 코드입니다.", true);
  }
});

refreshBtn.addEventListener("click", async () => {
  renderSites(await getSites());
});

siteList.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("button[data-action]");
  if (!actionButton) return;

  const { action, id } = actionButton.dataset;
  const sites = await getSites();
  const site = sites.find((entry) => entry.id === id);
  if (!site) return;

  if (action === "delete") {
    const next = sites.filter((entry) => entry.id !== id);
    await saveSites(next);
    renderSites(next);
    setStatus("사이트를 삭제했습니다.");
    return;
  }

  if (action === "share") {
    const shareCode = encodeShareCode(site);
    await navigator.clipboard.writeText(shareCode);
    setStatus("공유 코드를 클립보드에 복사했습니다.");
    return;
  }

  if (action === "preview") {
    const shareCode = encodeShareCode(site);
    const url = `viewer.html#${encodeURIComponent(shareCode)}`;
    window.open(url, "_blank");
  }
});

init();

async function init() {
  renderSites(await getSites());
}

function renderSites(sites) {
  siteList.innerHTML = "";

  if (sites.length === 0) {
    const li = document.createElement("li");
    li.textContent = "아직 만든 사이트가 없습니다.";
    siteList.append(li);
    return;
  }

  for (const site of sites) {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector(".site-title").textContent = site.name;
    node.querySelector(".site-updated").textContent = `수정: ${formatDate(site.updatedAt)}`;

    const actionButtons = node.querySelectorAll("button[data-action]");
    actionButtons.forEach((button) => {
      button.dataset.id = site.id;
    });

    siteList.append(node);
  }
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#dc2626" : "#2563eb";
}

function formatDate(isoDate) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(isoDate));
}

async function getSites() {
  const result = await chrome.storage.sync.get(SITE_KEY);
  return Array.isArray(result[SITE_KEY]) ? result[SITE_KEY] : [];
}

function saveSites(sites) {
  return chrome.storage.sync.set({ [SITE_KEY]: sites });
}

function normalizeSite(site) {
  return {
    name: site.name,
    html: site.html ?? site.content ?? "",
    css: site.css ?? "",
    js: site.js ?? "",
  };
}

function encodeShareCode(site) {
  const payload = normalizeSite(site);
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function decodeShareCode(code) {
  const text = decodeURIComponent(escape(atob(code)));
  const data = JSON.parse(text);
  const normalized = normalizeSite(data);
  if (!normalized.name || !normalized.html) {
    throw new Error("Invalid payload");
  }
  return normalized;
}
