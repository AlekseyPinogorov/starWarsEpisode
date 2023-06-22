const cssPromises = {};

function loadResource(src) {
  // JavaScript module
  if (src.endsWith('js')) {
    return import(src);
  }
  // CSS файл
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link)
    }
    return cssPromises[src];
  }
  // Данные сервера
  return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app')

function renderPage(moduleName, apiUrl, css) {
  loadVisualisation(appContainer)
  Promise.all([moduleName, apiUrl, css,].map(src => loadResource(src)))
    .then(([pageModule, data]) => {
      if (data.planets) {
        const promisePlanets = data.planets.map(src => loadResource(src))
        const promiseSpecies = data.species.map(src => loadResource(src))

        const promP = Promise.all(promisePlanets).then()
        const promS = Promise.all(promiseSpecies).then()
        Promise.all([promP, promS]).then(lists => {
          appContainer.innerHTML = ''
          appContainer.append(pageModule.render(data, lists))
        })
      } else {
        appContainer.innerHTML = ''
        appContainer.append(pageModule.render(data))
      }
    })
}

export function createApp() {
  const searchParams = new URLSearchParams(location.search)
  const filmId = searchParams.get('filmId')

  const EPISODE = './starwar-episode.js'
  const LIST = './starwar-list.js'
  const API_DATA = `https://swapi.dev/api/films/${filmId ? filmId : ''}`
  const BOOTSTRAP = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'

  renderPage(
    `${filmId ? EPISODE : LIST}`,
    API_DATA,
    BOOTSTRAP,
  )
}

createApp()

window.addEventListener('popstate', () => {
  createApp()
})

function loadVisualisation(container) {
  container.innerHTML = ''
  const loader = document.createElement('div')
  const svg = document.createElement('img')
  loader.classList.add('loader')
  svg.src = './load.svg'
  loadResource('./style.css')
  loader.append(svg)
  container.append(loader)
}
