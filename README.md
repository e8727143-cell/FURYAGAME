# Página de descarga FURYA

Página pública: https://furyagame.vercel.app  
Repositorio público: `e8727143-cell/FURYAGAME`  
Proyecto de Vercel: `furyagame`

La página obtiene la versión y el APK desde la GitHub Release más reciente, cuyo asset debe llamarse `FURYA.apk`. El APK se guarda en GitHub Releases; no se sube al deployment de Vercel ni se mezcla con los archivos del juego.

## Publicar una versión

Desde la raíz del proyecto del juego, ejecuta `PublicarVersion.bat`. El script exporta el APK Android, incrementa las versiones y crea una Release en `e8727143-cell/FURYAGAME`.

Después de cada APK, vuelve a desplegar esta carpeta a producción en el proyecto Vercel `furyagame` y comprueba que `https://furyagame.vercel.app` responde y que GitHub `releases/latest` contiene `FURYA.apk`. La conexión automática GitHub-Vercel no quedó configurada; el deploy se realiza mediante Vercel MCP.

La Release pública actual es `v1.0`.
