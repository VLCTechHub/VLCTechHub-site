# VLCTechHub site

## 🚀 Cómo levantar el sitio en local

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

  Cuando ejecutas el comando `build` el sitio se contruye dentro del directorio *dist*.

  ```sh
    yarn run build
  ```

  Cuando se construye el site, se usa la API de vlctechhub. Por defecto, usa la dirección local de desarrollo `localhost:5000` para hacer llamadas a la API y enviar los formularios de creación.

  Para construir el sitio contra producción u otra dirección donde se encuentre la API de vlctechhub hay que pasarsela por variable de entorno cuando se construye:

  ```sh
   API_ROOT=url/to/api/ yarn run build
  ```

5. **Levanta un servidor para ver el sitio**

  Ya tienes construido el sitio estático! Puedes levantar un sencillo servidor con python desde la linea de comandos.

  ```sh
    cd dist/
    python -m SimpleHTTPServer --port=8080
  ```

  Ahora el sitio esta corriendo en `http://localhost:8080`.


## 🎓 Aprendiendo MetalSmith y Nunjucks

  La documentación de MetalSmith se encuentra en [su web](https://metalsmith.io).

  El sistema de plantillas que usa este repo es [Nunjucks](https://mozilla.github.io/nunjucks/), un lenguaje de plantillas sencillo y potente desarrollado por Mozilla.

  La jerarquia de plantillas de Nunjucks esta basada en un artículo sobre [patrones de disenyo orientados a componentes](https://css-tricks.com/component-led-design-patterns-nunjucks-grunt/) sobre Nunjucks.

  La estructura usada en la parte sass sigue los consejos de ["Sass Guidelines"](https://sass-guidelin.es/es/).

## 🤝 Cómo contribuir

 Estamos empezando a desarrollar este proyecto, donde la web tendrá un nuevo disenyo e iremos incluyendo poco a poco nuevas funcionalidades.  Si quieres ayudar a desarrollar el proyecto nos encantaría tenerte como parte de la comunidad de VLCTechHub! :muscle::purple_heart:. Nos encontrarás en el canal #vlctechhub del slack de [VLCTechHub](https://slack.vlctechhub.org/)

## :memo: License

Licensed under the [MIT License](./LICENSE).
