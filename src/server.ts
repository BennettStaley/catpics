import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import next from 'next';

import { defaultImages } from './images';

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const express = require('express');
const port = parseInt(process.env.PORT || '8080', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
});
const handle = app.getRequestHandler();

let images = defaultImages;

let lastid = images.length - 1;

const sendRejection = (res: NextApiResponse, status: number) => {
  res.status(status);
  res.end(
    JSON.stringify({
      id: lastid,
      base64: 'error',
      name: 'error',
      size: 1234,
    }),
  );
};

const handleUpload = (
  req: NextApiRequest & { files?: any },
  res: NextApiResponse,
) => {
  const image = req.files.image;
  if (
    image &&
    // only these types
    (image.mimetype === 'image/jpeg' || image.mimetype === 'image/png')
  ) {
    if (image.size < 10485760) {
      try {
        const stream = image.data;
        // stream the data to base64
        const base64 = stream.toString('base64');
        // new id
        lastid++;
        const newImage = {
          id: lastid,
          // we append this for src() on img tags
          base64: `data:image/jpeg;base64,${base64}`,
          name: image.name,
          size: image.size,
        };
        images.push(newImage);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.end(JSON.stringify(newImage));
      } catch (err) {
        sendRejection(res, 500);
      }
    } else {
      sendRejection(res, 406);
    }
  } else {
    sendRejection(res, 406);
  }
};

const handleDelete = (
  req: NextApiRequest & { params?: any },
  res: NextApiResponse,
) => {
  if (req.params.id) {
    let deletedImage = {};
    images = images.reduce(
      (acc: GalleryImageType[], image: GalleryImageType) => {
        if (`${image.id}` === req.params.id) {
          deletedImage = image;
        } else {
          acc.push(image);
        }
        return acc;
      },
      [],
    );
    res.status(200);
    res.end(JSON.stringify(deletedImage));
  } else {
    sendRejection(res, 400);
  }
};

app.prepare().then(() => {
  const server = express();
  server.use(
    bodyParser.json({
      extended: true,
      limit: '10mb',
    }),
  );

  server.use(
    fileUpload({
      limits: { fileSize: 10 * 1024 * 1024 }, // 10mb
    }),
  );

  server.get('/images', (_: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(images));
  });

  server.get('*', (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url!, true);
    handle(req as NextApiRequest, res as NextApiResponse, parsedUrl);
  });

  server.post('/images', (req: IncomingMessage, res: ServerResponse) => {
    handleUpload(req as NextApiRequest, res as NextApiResponse);
  });

  server.post('/delete/:id', (req: IncomingMessage, res: ServerResponse) => {
    handleDelete(req as NextApiRequest, res as NextApiResponse);
  });

  server.listen(port, (err: ErrorEvent) => {
    if (err) throw err;
    console.log(
      `Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`,
    );
  });
});
