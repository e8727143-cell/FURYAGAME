# Página de descarga FURYA

Página pública: https://furyagame.vercel.app  
Repositorio público: `e8727143-cell/FURYAGAME`  
Proyecto de Vercel: `furyagame`

La página obtiene la versión y los instaladores desde la GitHub Release más reciente. Los assets esperados son `FURYA.apk` para Android y `FURYA.exe` para Windows x64. Los instaladores se guardan como assets de GitHub Releases; no se suben al deployment de Vercel ni se mezclan con los archivos del juego.

## Publicar una versión

Desde la raíz del proyecto del juego, ejecuta `PublicarVersion.bat` para publicar Android. La versión de PC se exporta como `FURYA.exe` y se adjunta a la misma Release de GitHub, para que ambos botones muestren la versión actual.

Después de publicar los instaladores, vuelve a desplegar esta carpeta a producción en el proyecto Vercel `furyagame` y comprueba que `https://furyagame.vercel.app` responde y que GitHub `releases/latest` contiene `FURYA.apk` y `FURYA.exe`. La conexión automática GitHub-Vercel no quedó configurada; el deploy se realiza mediante Vercel MCP.

La Release pública actual es `v1.0`.

