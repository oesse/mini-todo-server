import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { CREATED } from 'http-status-codes';
import _debug from 'debug';

const debug = _debug('request');

const items = [];

const api = Router();

api.get('/items', (req, res) => {
  debug('get items');
  res.json(items);
});

api.put('/items', (req, res) => {
  const { name, status } = req.body;
  const newItem = { name, status };

  const itemIndex = items.findIndex(i => i.name === name);
  if (itemIndex === -1) {
    debug('put new item', newItem);
    items.push(newItem);
    res.status(CREATED);
  } else {
    debug('put existing item', newItem);
    items[itemIndex] = newItem;
  }

  res.json(newItem);
});

export default () => ({
  start() {
    const app = express();

    app.use(bodyParser.json());

    app.get('/', (req, res) => {
      res.send('Welcome to doing things\n');
    });

    app.use('/api', api);

    app.listen(8080);
  },
});
