import express from 'express';
import { Request, Response } from 'express';

const app = express();
const port = process.env.API_SERVER_PORT || 3000;
const env = process.env.NODE_ENV || 'development';

// Expose static files in development environment
if (env === 'development') {
  app.use(express.static('build/dev/frontend'));
}

// API Endpoints
app.get('/api/v1/hello', (req: Request, res: Response) => {
  return res.json({ msg: "Hello World!" });
});

app.listen(port, () => console.log(`App is listening on http://localhost:${port}`));
