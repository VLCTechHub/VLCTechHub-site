# VLCTechHub

La asociación VLCTechHub promociona las comunidades tecnológicas locales, fomenta el empleo de calidad y (co)organiza eventos para ayudar a mejorar la diversidad, la cooperación y la compartición de conocimiento tecnológico. Organiza el evento [VLCTechFest](https://vlctechfest.org) una vez al año.

Este repositorio es el sitio web https://vlctechhub.org, construido con el generador estático Metalsmith consumiendo [la API de VLCTechHub](https://github.com/VLCTechHub/VLCTechHub-api) en su fase de contrucción.

## 🚀 Cómo levantar el sitio

1. Instala prerequesitos. Para levantar el sitio en local se necesitan tener instalados [yarn](https://yarnpkg.com/en/docs/instal) y tener corriendo la [API de VLCTechHub](https://github.com/VLCTechHub/VLCTechHub-api) en local.

2. Clona el repositorio
```
git clone git@github.com:VLCTechHub/VLCTechHub-site.git
```

3. Construye el proyecto
```
cd VLCTechHub-site/
yarn install
yarn run build
```

4. Levanta un servidor web para ver el sitio en `http://localhost:8080`
```
  cd dist/
  python3 -m http.server 8080
```

Para más detalles, puede ver la sección de [construcción del sitio](https://github.com/VLCTechHub/VLCTechHub-site/blob/master/CONTRIBUTING.md#-construyendo-el-sitio-web) en la guía de colaboración.

## 🤝 Cómo contribuir

Preguntas, propuestas, issues y pull request son bienvenidos! 
Echa un vistazo a la [guía de colaboración](./CONTRIBUTING.md) para más información.

## :memo: License

Licensed under the [MIT License](./LICENSE).
