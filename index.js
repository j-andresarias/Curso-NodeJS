const express = require('express');
const routerApi = require('./routes')

const {errorHandler, logErrors, boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/ruta1', (req, res) => {
  res.send('Ruta 1');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/students', (req, res) => {
  res.json([
    {
      name: "Andres",
      edad: 25
    },
    {
      name:"Jorge",
      edad: 30
    }
  ]);
});

app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: "Andress ",
    edad: 25
  });
});

app.get('/users', (req, res) => {
  const {limit, offset} = req.query;
  if(limit && offset)
  {
    res.json({
      limit,
      offset
    })
  }
  else{
    res.send("No hay parametros");
  }
});


app.listen(port, () => {
  console.log('Corriendo en puerto ' + port);
});
