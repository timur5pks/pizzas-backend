import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import Pizza from './models/pizza.js';

const db = mongoose.connect(
  'mongodb+srv://Timur:Pizzas16pizzas@pizzas.gkw2zqo.mongodb.net/pizzas-db?retryWrites=true&w=majority',
);

const PORT = process.env.PORT || 80;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors);

app.get('/pizzas', (req, res) => {
  const filter = req.query.filterBy ? { category: req.query.filterBy } : {};
  const sortBy = req.query.sortBy === 'price' ? 'sizes.price' : req.query.sortBy;
  const limit = req.query.limit;
  const page = req.query.page;
  console.log(filter);
  console.log(sortBy);
  console.log(limit);
  console.log(page);
  Pizza.paginate(
    filter,
    {
      filter: filter,
      limit: 4,
      sort: sortBy,
      page,
    },
    async function (err, { docs: pizzas, totalPages }) {
      res.send({ pizzas, totalPages });
    },
  );
});

app.get('/:category', (req, res) => {
  Pizza.find(req.params)
    .sort({ price: 1 })
    .then((pizzas) => res.send(pizzas))
    .catch(() =>
      res.status(500).send({
        message: 'Произошла ошибка при чтении карточек',
      }),
    );
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
