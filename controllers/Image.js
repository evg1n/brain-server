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
  getImage: getImage
}