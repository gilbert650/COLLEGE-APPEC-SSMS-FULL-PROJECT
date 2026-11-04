const app = require('./src/app');
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`[OK] Express Gateway running on port ${port}`);
});Defaults;