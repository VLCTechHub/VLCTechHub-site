# Preguntas

Esta es la web de http://vlctechhub.org. Si tienes alguna pregunta puedes contactar con el equipo en el canal #vlctchhub de https://slack.vlctechhub.org

# Bugs y petición de funcionalidades

Crees que has encontrado un bug o tienes una nueva funcionalidad que proponer? Háznoslo saber!

## :bug: Cómo reportar un bug

1. Actualiza al commit mas reciente de master. Es posible que el bug ya esté arreglado.

2. Busca issues similares, es posible que alguien haya encontrado este bug antes.

3. [Abre una issue](https://github.com/VLCTechHub/VLCTechHub-site/issues/new). Contra más información proveas, más fácil es para nosotros validar que se trata de un bug y así actuaremos lo más rápido posible.

## :heavy_plus_sign: Petición de funcionalidad

1. Proporciona una explicación clara y detallada de la funcionalidad que quieres y por qué es importante anyadirla. Ten en cuenta que queremos funcionalidades que resulten útiles a la mayoría de usuarios en lugar de un pequenyo conjunto de estos.
2. Después de comentar la funcionalidad es posible que [pruebes a crear un Pull Request](https://help.github.com/en/articles/creating-a-pull-request). Si puedes, empieza escribiendo algo de código. Siempre tenemos más cosas que hacer que tiempo disponible para hacerlas. Si puedes escribir algo de código esto acelerará el proceso.

# 🚀 Construyendo el sitio web

La web de VLCTechHub está desarrollada como un sitio estático con el generador metalsmith.

1. **Instala yarn**

   Yarn es un gestor de dependencias de proyectos en node. Para instalarlo en tu sistema sigue [sus instrucciones](https://yarnpkg.com/en/docs/install).

2. **Clona este repo en tu máquina**

```sh
  git clone git@github.com:VLCTechHub/VLCTechHub-site.git
```

3. **Instala las dependencias con yarn**

Entra en el directorio creado e instala las dependencias.

```sh
  cd VLCTechHub-site/
  yarn install
```

4. **Construye el sitio**

Cuando ejecutas el comando `build` el sitio se contruye dentro del directorio _dist_.

```sh
  yarn run build
```

Cuando se construye el site, se usa la API de vlctechhub. Por defecto, usa la dirección local de desarrollo `localhost:5000` para hacer llamadas a la API y enviar los formularios de creación.

Para construir el sitio contra producción hay que construir el sitio con la variable de entorno `NODE_ENV` con el valor `production`:

```sh
 NODE_ENV=production yarn run build
```

5. **Levanta un servidor para ver el sitio**

Ya tienes construido el sitio estático! Puedes levantar un sencillo servidor con Python desde la linea de comandos.

Con Python 2:

```sh
  cd dist/
  python -m SimpleHTTPServer --port=8080
```

Con Python 3:

```sh
  cd dist/
  python3 -m http.server 8080
```

Ahora el sitio esta corriendo en `http://localhost:8080`.

# :gift: Contribuyendo con pull requests

Nos encantan los pull requests! Aquí tienes una breve guía de como contribuir:

1. Forkea el repositorio

2. Introduce tus cambios siguiendo la guía de estilos de sintaxis:

- Dos espacios, no tabs
- Sigue las convenciones que vas en el código

3. Commitea tus cambios

4. Pushea a tu fork y crea un pull request. Proporciona alguna explicación de por qué has hecho esos cambios.

## 🎓 Aprendiendo MetalSmith y Nunjucks

La documentación de MetalSmith se encuentra en [su web](https://metalsmith.io).

El sistema de plantillas que usa este repo es [Nunjucks](https://mozilla.github.io/nunjucks/), un lenguaje de plantillas sencillo y potente desarrollado por Mozilla.

La jerarquia de plantillas de Nunjucks esta basada en un artículo sobre [patrones de disenyo orientados a componentes](https://css-tricks.com/component-led-design-patterns-nunjucks-grunt/) sobre Nunjucks.

## :woman_technologist: Creando una página nueva

Para crear una página nueva se necesitan dos cosas: una plantilla y unos datos.
Por ejemplo: todos los eventos comparten la misma plantilla `templates/event.njk`, cada página de evento son los datos de un evento con la plantilla anterior.

Si ya existe una plantilla para la página que quieres crear, tan solo deberas inclucir el fichero de los datos de la página. Normalmente sera un fichero markdown con extension `.md` dentro de la carpeta `data`. Ten en cuenta que la estructura que elijas determinará la url final.

Si la plantilla no existe, puedes crearla dentro de `templates` y luego usarla siguiendo los pasos anteriores.

Para modificar/anyadir css, javascript y/o imagenes usa la carpeta `assets`
