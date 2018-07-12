const fs = require('fs')
const movies = require('./list')

module.exports.getListPage = (lang, day) => {
  const mainHtml = fs.readFileSync('./list.html').toString()
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
  list.forEach(movie => {
    let aux = itemHtml.replace('{title}', movie.title)
    aux = aux.replace('{imgUrl}', movie.image)
    htmlItems.push(aux)
  })
  return mainHtml.replace('{movieList}', htmlItems.join("\n"))
}
