const app = require('./app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Book API running on Port ${PORT}`);
});
