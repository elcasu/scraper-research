const moment = require('moment')
const faker = require('faker')
const list = {}

function getDates(index) {
  if (index < 10) return [
    moment('2018-07-10 15:00'),
    moment('2018-07-11 20:00'),
    moment('2018-07-12 18:00')
  ]
  if (index < 20) return [
    moment('2018-07-11 18:00'),
    moment('2018-07-13 20:00'),
    moment('2018-07-14 20:00')
  ]
  if (index < 30) return [
    moment('2018-07-12 16:00'),
    moment('2018-07-14 18:00')
  ]
  if (index < 40) return [
    moment('2018-07-13 18:00')
  ]
  if (index < 50) return [
    moment('2018-07-14 15:00')
  ]
}

const titles = {
  es: 'Título de la peli',
  en: 'Movie title'
}

const sinopsis = {
  es: 'Esta es la sinapsis',
  en: 'Movie sinapsis goes here'
}

for (let lang of ['es', 'en']) {
  list[lang] = []
  for (let i = 0; i < 50; i++) {
    const dates = getDates(i)
    list[lang].push({
      id: i,
      title: `${titles[lang]} ${i}`,
      image: `http://www.mardelplatafilmfest.com/media/movies/image-${i}.jpg`,
      sinopsis: `${sinopsis[lang]} - ${i}`,
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
      duration: '90min',
      country: `${faker.address.country()}`,
      events: dates.map(date => ({
        fullDate: date.format('YYYY-MM-DD'),
        day: date.format('DD'),
        month: date.format('MMM'),
        year: date.format('YYYY'),
        time: date.format('HH:mm'),
        place: `Ambassador, sala ${i}`
      }))
    })
  }
}

module.exports = list
