import express from"express";
import summaryRoutes from"./models/textsummary.js";
const PORT = 9090;
const app = express();
app.use(express.json());
app.use('/api',summaryRoutes);

app.listen(PORT,()=>{
      console.log(`Server started on http://localhost:${PORT}`);
});