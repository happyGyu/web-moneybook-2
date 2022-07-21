import app from './app';
import config from './config';

app.listen(config.PORT, () => {
  console.log(`App listening on Config.PORT:${config.PORT}`);
});
