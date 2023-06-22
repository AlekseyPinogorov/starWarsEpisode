import { createApp } from './main.js';

export function render(data, lists) {
  document.title = `${data.title}`
  const container = document.createElement('div')
  const episodeTitle = document.createElement('h1')
  const episodeBtn = document.createElement('a')
  const episodeDescr = document.createElement('p')
  const episodePlanetTitle = document.createElement('h2')
  const episodePlanetList = document.createElement('ul')
  const episodeSpeciesTitle = document.createElement('h2')
  const episodeSpeciesList = document.createElement('ul')

  container.classList.add('container', 'py-4')
  episodeTitle.classList.add('h1', 'mb-3')
  episodeBtn.classList.add('btn', 'btn-primary', 'mb-3')
  episodeDescr.classList.add('lead')
  episodePlanetTitle.classList.add('h2')
  episodeSpeciesTitle.classList.add('h2')
  episodePlanetList.classList.add('list-group', 'mb-3')
  episodeSpeciesList.classList.add('list-group', 'mb-3')
  episodeTitle.textContent = `${data.title}`
  episodeBtn.textContent = 'Back to episodes'
  episodeBtn.href = '../index.html'
  episodeDescr.textContent = `${data.opening_crawl}`
  episodePlanetTitle.textContent = 'Planets'
  episodeSpeciesTitle.textContent = 'Species'

  function createListPlanet(arrIndex, toList) {
    for (const dataObj of arrIndex) {
      const listItem = document.createElement('li')
      const itemTitle = document.createElement('h3')
      const itemDescr = document.createElement('p')

      listItem.classList.add('list-group-item')
      itemTitle.classList.add('h3')

      itemTitle.textContent = `${dataObj.name}`
      itemDescr.innerHTML = `Diameter: ${dataObj.diameter} miles <br> Population: ${dataObj.population} residents`

      listItem.append(itemTitle)
      listItem.append(itemDescr)
      toList.append(listItem)
    }
  }
  createListPlanet(lists[0], episodePlanetList)
  function createListSpacies(arrIndex, toList) {
    for (const dataObj of arrIndex) {
      const listItem = document.createElement('li')
      const itemTitle = document.createElement('h3')
      const itemDescr = document.createElement('p')

      listItem.classList.add('list-group-item')
      itemTitle.classList.add('h3')

      itemTitle.textContent = `${dataObj.name}`
      itemDescr.innerHTML = `Classification: ${dataObj.classification} <br> Language: ${dataObj.language}`

      listItem.append(itemTitle)
      listItem.append(itemDescr)
      toList.append(listItem)
    }
  }
  createListSpacies(lists[1], episodeSpeciesList)

  container.append(episodeTitle)
  container.append(episodeBtn)
  container.append(episodeDescr)
  container.append(episodePlanetTitle)
  container.append(episodePlanetList)
  container.append(episodeSpeciesTitle)
  container.append(episodeSpeciesList)

  episodeBtn.addEventListener('click', e => {
    e.preventDefault()
    history.pushState({'page_id': '../index.html'}, '', '../index.html')
    createApp()
  })

  return container
}

