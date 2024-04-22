const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerorderRouter = require('./customerorderRouter');
const orderItemsRouter = require('./orderItemsRouter');
const userRouter = require('./userRouter');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.json());

// middlewares
app.use('/customerorder', customerorderRouter);
app.use('/orderitems', orderItemsRouter);
app.use('/users', userRouter);

app.get("/", (req, res) => {
    res.json("hello from backend");
  });

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
