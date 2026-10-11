# Página de descarga FURYA

Sitio estático para Vercel. El APK se aloja como archivo de una GitHub Release; no se agrega a este repositorio ni al deployment de Vercel.

## Repositorio y deploy

El repositorio público configurado es `e8727143-cell/FURYAGAME`. Sube **el contenido de esta carpeta** como raíz del repositorio, sin subir el resto del proyecto del juego. No necesita framework ni comando de build; la raíz contiene `index.html`.

Después importa `e8727143-cell/FURYAGAME` en Vercel y deja vacíos los comandos de build. Vercel publicará el sitio estático desde la raíz.

## Publicar una versión

Desde la carpeta del juego, usa `PublicarVersion.bat`. El script exporta el preset Android, incrementa el código de versión y crea una GitHub Release con el APK en `e8727143-cell/FURYAGAME`. Necesitas Godot 4.7.2, GitHub CLI autenticado (`gh auth login`) y permisos de escritura en ese repositorio. La exportación release debe estar configurada para firmar el APK en Godot.

La página muestra la versión nueva en cuanto GitHub publica la Release; no hay que volver a desplegar Vercel.
