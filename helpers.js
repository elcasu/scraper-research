const fs = require('fs')
const movies = require('./list')

module.exports.getListPage = (lang, day) => {
  let mainHtml = fs.readFileSync('./list.html').toString()
  const itemHtml = fs.readFileSync('./list-item.html').toString()
  let htmlItems = []
  let list
  if (day) {
    const eventDay = parseInt(day) + 9
    list = movies[lang].filter(movie => {
      const events = movie.events.find(e => {
        return e.day == eventDay
      })
      return !!events
    })
  }
  else {
    list = movies[lang]
  }
  list.forEach((movie, i) => {
    let aux = itemHtml.replace('{title}', movie.title)
    aux = aux.replace('{imgUrl}', movie.image)
    aux = aux.replace('{itemTitle}', movie.title.replace(/\s+/g, '-'))
    aux = aux.replace('{itemId}', movie.id)
    htmlItems.push(aux)
  })
  mainHtml = mainHtml.replace('{movieList}', htmlItems.join("\n"))
  return mainHtml.replace(/{host}/g, process.env.HOST)
}

module.exports.getDetailsPage = (lang, slug, index) => {
  const movie = movies[lang][index]
  if (!movie) {
    return ''
  }
  let detailsHtml = fs.readFileSync('./details.html').toString()
  let eventHtml = fs.readFileSync('./event-item.html').toString()

  // replace main data
  detailsHtml = detailsHtml.replace('{title}', movie.title)
  detailsHtml = detailsHtml.replace('{image}', movie.image)
  detailsHtml = detailsHtml.replace('{author}', movie.author)
  detailsHtml = detailsHtml.replace('{duration}', movie.duration)
  detailsHtml = detailsHtml.replace('{country}', movie.country)
  detailsHtml = detailsHtml.replace('{sinopsis}', movie.sinopsis)

  // add events info
  let htmlEvents = []
  movie.events.forEach(event => {
    let aux = eventHtml.replace('{eventDay}', event.day)
    aux = aux.replace('{eventMonth}', event.month)
    aux = aux.replace('{eventYear}', event.year)
    aux = aux.replace(/{eventTime}/g, event.time)
    aux = aux.replace('{duration}', movie.duration)
    aux = aux.replace('{eventPlace}', event.place)
    htmlEvents.push(aux)
  })
  return detailsHtml.replace('{eventList}', htmlEvents.join("\n"))
}
