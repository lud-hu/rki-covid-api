const express = require('express')
const { CronJob } = require('cron');
const { updateDataset } = require('./cronjobs/updateDataset');
const { general } = require('./api/general');
const { states } = require('./api/states');
const { statesMap } = require('./api/states-map');
const { districts } = require('./api/districts');
const { districtsMap } = require('./api/districts-map');
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/general', async (req, res) => {
  general().then((response) => {
    res.statusCode = response.statusCode;
    res.send(response.body);
  }).catch((error) => {
    res.statusCode = error.statusCode;
    res.send(error.body);
  })
})

app.get('/states', states)
app.get('/states-map', statesMap)
app.get('/districts', districts)
app.get('/districts-map', districtsMap)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

var job = new CronJob('0 */10 * * * *', updateDataset);
job.start();