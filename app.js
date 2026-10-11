(() => {
	const config = window.FURYA_DOWNLOAD_CONFIG || {};
	const versionEl = document.querySelector("#version");
	const androidDownloadEl = document.querySelector("#download-android");
	const windowsDownloadEl = document.querySelector("#download-windows");
	const androidMetaEl = document.querySelector("#android-meta");
	const windowsMetaEl = document.querySelector("#windows-meta");
	const publishedEl = document.querySelector("#published");
	const statusEl = document.querySelector("#status");
	document.querySelector("#year").textContent = new Date().getFullYear();

	const repo = String(config.githubRepo || "").trim();
	const assets = config.assets || {};
	const androidAssetName = String(assets.android || "FURYA.apk").trim();
	const windowsAssetName = String(assets.windows || "FURYA.exe").trim();
	const validRepo = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo) && !repo.startsWith("OWNER/");
	if (!validRepo) {
		versionEl.textContent = "Próximamente";
		androidMetaEl.textContent = "Versión actual no configurada";
		windowsMetaEl.textContent = "Versión actual no configurada";
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
			const releaseAssets = release.assets || [];
			const androidAsset = releaseAssets.find((item) => item.name === androidAssetName);
			const windowsAsset = releaseAssets.find((item) => item.name === windowsAssetName);
			versionEl.textContent = release.name || release.tag_name;
			publishedEl.textContent = `Publicada el ${new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date(release.published_at))}.`;
			configureDownload(androidDownloadEl, androidMetaEl, androidAsset, "Android APK", androidAssetName);
			configureDownload(windowsDownloadEl, windowsMetaEl, windowsAsset, "Windows x64 · EXE", windowsAssetName);
			statusEl.textContent = androidAsset || windowsAsset ? "" : "Esta publicación todavía no tiene archivos descargables.";
		})
		.catch((error) => {
			versionEl.textContent = "Descarga no disponible";
			androidMetaEl.textContent = "Consulta las versiones publicadas";
			windowsMetaEl.textContent = "Consulta las versiones publicadas";
			statusEl.textContent = error.message;
			for (const link of [androidDownloadEl, windowsDownloadEl]) {
				link.href = releasesUrl;
				link.classList.remove("is-disabled");
				link.removeAttribute("aria-disabled");
				link.querySelector("b").textContent = "VER VERSIONES";
			}
		});

	function configureDownload(link, meta, asset, platform, expectedName) {
		if (!asset) {
			meta.textContent = "Aún no publicada";
			link.href = releasesUrl;
			link.classList.add("is-disabled");
			link.setAttribute("aria-disabled", "true");
			return;
		}
		meta.textContent = `${formatBytes(asset.size)} · ${platform}`;
		link.href = asset.browser_download_url;
		link.classList.remove("is-disabled");
		link.removeAttribute("aria-disabled");
		link.setAttribute("download", asset.name || expectedName);
	}

	function formatBytes(bytes) {
		if (!Number.isFinite(bytes) || bytes <= 0) return "Archivo";
		return `${(bytes / (1024 ** 2)).toFixed(0)} MB`;
	}
})();

