import express from"express";
const app = express();
import summary from "../containers/textsummary.js"
app.post('/text',summary.textSummary);
export default app;