const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { getListPage } = require('./helpers')
const routes = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))

routes.get('/:lang/programacion', function(req, res) {
  res.status(200).send(getListPage(req.params.lang))
})

routes.post('/:lang/programacion', function(req, res) {
  res.status(200).send(getListPage(req.params.lang, req.body.day))
})

app.use('/', routes)

let port = process.env.PORT || 9000;
let server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test'){
    //eslint-disable-next-line no-console
    console.log("Server running on port " + port);
  }
})
