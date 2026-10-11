(() => {
	const config = window.FURYA_DOWNLOAD_CONFIG || {};
	const versionEl = document.querySelector("#version");
	const downloadEl = document.querySelector("#download");
	const metaEl = document.querySelector("#download-meta");
	const publishedEl = document.querySelector("#published");
	const statusEl = document.querySelector("#status");
	document.querySelector("#year").textContent = new Date().getFullYear();

	const repo = String(config.githubRepo || "").trim();
	const assetName = String(config.assetName || "FURYA.apk").trim();
	const validRepo = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo) && !repo.startsWith("OWNER/");
	if (!validRepo) {
		versionEl.textContent = "Próximamente";
		metaEl.textContent = "Versión actual no configurada";
		statusEl.textContent = "La página necesita conectarse al repositorio público de FURYA.";
		return;
	}

	const releasesUrl = `https://github.com/${repo}/releases`;
	const apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;
	fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" }, cache: "no-store" })
		.then((response) => {
			if (!response.ok) throw new Error(response.status === 404 ? "Todavía no hay una versión publicada." : "No se pudo consultar la última versión.");
			return response.json();
		})
		.then((release) => {
			const asset = (release.assets || []).find((item) => item.name === assetName);
			if (!asset) throw new Error("La última versión todavía no contiene el APK.");
			versionEl.textContent = release.name || release.tag_name;
			metaEl.textContent = `${formatBytes(asset.size)} · Android APK`;
			publishedEl.textContent = `Publicada el ${new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date(release.published_at))}.`;
			downloadEl.href = asset.browser_download_url;
			downloadEl.classList.remove("is-disabled");
			downloadEl.removeAttribute("aria-disabled");
			downloadEl.setAttribute("download", asset.name);
			statusEl.textContent = "";
		})
		.catch((error) => {
			versionEl.textContent = "Descarga no disponible";
			metaEl.textContent = "Consulta las versiones publicadas";
			statusEl.textContent = error.message;
			downloadEl.href = releasesUrl;
			downloadEl.classList.remove("is-disabled");
			downloadEl.removeAttribute("aria-disabled");
			downloadEl.querySelector("b").textContent = "VER VERSIONES";
		});

	function formatBytes(bytes) {
		if (!Number.isFinite(bytes) || bytes <= 0) return "APK";
		return `${(bytes / (1024 ** 2)).toFixed(0)} MB`;
	}
})();
