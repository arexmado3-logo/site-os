const titleEl = document.getElementById("title");

const frameEl = document.getElementById("siteFrame");

const contentEl = document.getElementById("content");

const errorEl = document.getElementById("error");

try {
  const hash = location.hash.replace(/^#/, "");
  if (!hash) {
    throw new Error("공유 코드가 없습니다.");
  }


  const code = decodeURIComponent(hash);
  const text = decodeURIComponent(escape(atob(code)));
  const data = JSON.parse(text);
  const site = normalizeSite(data);

  if (!site.name || !site.html) {

  const code = decodeURIComponent(hash);
  const text = decodeURIComponent(escape(atob(code)));
  const site = JSON.parse(text);

  if (!site.name || !site.content) {

    throw new Error("유효하지 않은 공유 데이터입니다.");
  }

  titleEl.textContent = site.name;

  frameEl.srcdoc = buildSrcDoc(site);
} catch (error) {
  titleEl.textContent = "불러오기 실패";
  frameEl.remove();
  errorEl.textContent = error.message;
}

function normalizeSite(site) {
  return {
    name: site.name,
    html: site.html ?? site.content ?? "",
    css: site.css ?? "",
    js: site.js ?? "",
  };
}

function buildSrcDoc(site) {
  const safeCss = site.css || "";
  const safeJs = site.js || "";

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html, body {
        background: transparent;
      }
      body {
        margin: 0;
      }
      ${safeCss}
    </style>
  </head>
  <body>
    ${site.html}
    <script>
      ${safeJs}
    <\/script>
  </body>
</html>`;
}

  contentEl.textContent = site.content;
} catch (error) {
  titleEl.textContent = "불러오기 실패";
  contentEl.textContent = "";
  errorEl.textContent = error.message;
}

