import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
