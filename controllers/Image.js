const clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: '67209dcc98bb42f0923b7df1e0b61583'
});


const callAPI = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    console.log('data', data);
    res.json(data)
  })
  .catch(err => res.status(400).json('error!', err))
}
const getImage = (req, res, database) => {
    const { id } = req.body;
    database('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {res.send(entries[0])})
        .catch(err => res.staturs(400).json('error'))
}

module.exports = {
  getImage: getImage,
  callAPI: callAPI
}