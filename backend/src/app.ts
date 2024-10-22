import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from "./routes/index"
import { createNodeMiddleware } from "octokit";
import { setupWebhookListeners } from './controllers/webhook.controller';
import octokit from './services/octokit';
import cors from 'cors';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());

// Setup webhook listeners
setupWebhookListeners(octokit);
app.use(createNodeMiddleware(octokit));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
