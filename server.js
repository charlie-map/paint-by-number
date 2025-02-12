// All this for __dirname...
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from "express";
import mustache from 'mustache-express';

import { generate } from './generator.js';
import sql from './sql.js';

const app = express();

const imageRouter = express.Router();
imageRouter.use(express.json({ limit: '10Mb' }));
imageRouter.post('/generate', async (req, res) => {
    const [generatedImage] = await Promise.all([
        // sql.insert.image(req.body.image),
        generate(req.body.image)
    ]);

    res.json(generatedImage);
});

app.use('/image', imageRouter);

app.use(express.static(__dirname + "/public"));
app.use(express.json({ limit: '1Mb' }));

app.set('views', __dirname + "/views");
app.set('view engine', 'mustache');
app.engine('mustache', mustache());

app.get("/", (_req, res) => {
    res.render('home');
});

app.listen("2025", () => {
    console.log("server go vroom: 2025");
});
