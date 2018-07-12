const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { getListPage, getDetailsPage } = require('./helpers')
const routes = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))

/**
 * Get movie list (all of them)
 */
routes.get('/:lang/programacion', function(req, res) {
  res.status(200).send(getListPage(req.params.lang))
})

/**
 * Get movie list filtered by day
 */
routes.post('/:lang/programacion', function(req, res) {
  res.status(200).send(getListPage(req.params.lang, req.body.day))
})

/**
 * Get movie details
 */
routes.get('/:lang/pelicula/:slug/:index', function(req, res) {
  res.status(200).send(getDetailsPage(req.params.lang, req.params.slug, req.params.index))
})

app.use('/', routes)

let port = process.env.PORT || 9000;
let server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test'){
    //eslint-disable-next-line no-console
    console.log("Server running on port " + port);
  }
})
