const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const errorEl = document.getElementById("error");

try {
  const hash = location.hash.replace(/^#/, "");
  if (!hash) {
    throw new Error("공유 코드가 없습니다.");
  }
  const code = decodeURIComponent(hash);
  const text = decodeURIComponent(escape(atob(code)));
  const site = JSON.parse(text);

  if (!site.name || !site.content) {
    throw new Error("유효하지 않은 공유 데이터입니다.");
  }

  titleEl.textContent = site.name;
  contentEl.textContent = site.content;
} catch (error) {
  titleEl.textContent = "불러오기 실패";
  contentEl.textContent = "";
  errorEl.textContent = error.message;
}
