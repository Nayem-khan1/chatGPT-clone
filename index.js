//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

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-UZfzOLGK0fZxFURPdtNgdriI",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

//create a simple express api that calls the function above

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5000;

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(message, "message");
  const response = await openai.createCompletion({
    model: `${currentModel}`, //"text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log();
  console.log("console");
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data,
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
