const { Router } = require('express');
const path = require('path');

const imagesRouter = Router();

imagesRouter.get('/:image', (req, res) => {
  const { image } = req.params;

  const imagePath = path.join('./public/images', image);

  res.sendFile(imagePath, { root: '.' });
});

module.exports = imagesRouter;
