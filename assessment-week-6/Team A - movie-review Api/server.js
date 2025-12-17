const app = require('./app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Movie API running on http://localhost:${PORT}`);
});