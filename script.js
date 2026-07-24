const GITHUB_USER = "hhuang235";
const gistGrid = document.querySelector("#gist-grid");

const escapeHtml = (value) => {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

async function loadGists() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/gists?per_page=3`,
    );
    if (!response.ok) throw new Error("GitHub request failed");

    const gists = await response.json();
    if (gists.length === 0) {
      gistGrid.innerHTML = `
        <p class="gist-status">
          No public gists yet.
          <a href="https://gist.github.com/${GITHUB_USER}">The first note can start here ↗</a>
        </p>`;
      return;
    }

    gistGrid.innerHTML = gists
      .map((gist) => {
        const firstFile = Object.values(gist.files)[0];
        const title = gist.description || firstFile?.filename || "Untitled note";
        const language = firstFile?.language || "Plain text";
        return `
          <a class="gist-card" href="${gist.html_url}">
            <span class="gist-card-meta">${escapeHtml(language)} · ${formatDate(gist.updated_at)}</span>
            <h3>${escapeHtml(title)}</h3>
            <span class="gist-card-link">Open on GitHub ↗</span>
          </a>`;
      })
      .join("");
  } catch {
    gistGrid.innerHTML = `
      <p class="gist-status">
        Notes are temporarily unavailable.
        <a href="https://gist.github.com/${GITHUB_USER}">View on GitHub ↗</a>
      </p>`;
  }
}

loadGists();
