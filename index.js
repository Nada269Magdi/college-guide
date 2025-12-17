require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const sendCodeRoute = require("./routes/sendCode");
const verifyCodeRoute = require("./routes/verifyCode");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", sendCodeRoute.router);
app.use("/api", verifyCodeRoute);

app.use('/api/auth', authRoutes);

app.get('/api/test', (req, res) => {
  res.send('API is running...');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
