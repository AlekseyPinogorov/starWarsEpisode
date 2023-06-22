import { createApp } from './main.js';

export function render(data) {
  let episodeCount = 1

  const container = document.createElement('div')
  container.classList.add(
    'container',
    'py-4'
  );
  const swList = document.createElement('ul')
  swList.classList.add('list-group')

  for (const dataObj of data.results) {
    const swItem = document.createElement('li')
    const swLink = document.createElement('a')

    swItem.classList.add('list-group-item', 'list-group-item-action')
    swLink.classList.add('list-group-item-action', 'stretched-link', 'js-link')

    swLink.textContent = `Episode № ${dataObj.episode_id}: ${dataObj.title}`
    swLink.href = `?filmId=${episodeCount}`

    swLink.addEventListener('click', e => {
      e.preventDefault()
      history.pushState(null, '', swLink.href)
      createApp()
    })

    swItem.append(swLink);
    swList.append(swItem);

    episodeCount += 1;
  }

  container.append(swList)

  return container;
}
