import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import fs from "fs";
import PDFDocument from "pdfkit";

dotenv.config();
import database from "../database.js"; 

const accestoken = process.env.HF_API_KEY;
const hf = new HfInference(accestoken);

const generatePdf = (text, summary, outputPath = "summary.pdf") => {
  const pdf = new PDFDocument();
  pdf.pipe(fs.createWriteStream(outputPath));

  pdf.fontSize(14).text("Original Text:", { underline: true });
  pdf.fontSize(12).text(text, {
    width: 410,
    align: "left",
    paragraphGap: 10,
  });

  pdf.moveDown();
  pdf.fontSize(14).text("Summary:", { underline: true });
  pdf.fontSize(12).text(summary, {
    width: 410,
    align: "left",
    paragraphGap: 10,
  });

  pdf.end();
};

export const textSummary = async (req, res) => {
  const text = req.body.text;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid or missing text" });
  }

  try {
  
    const completion = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: text,
      parameters: { max_length: 100 },
    });

    const summary = completion?.summary_text || "No summary available";

    const insertQuery =
      "INSERT INTO TextSummarization(detailText, summaryText) VALUES(?, ?)";
    const values = [text, summary];

    database.query(insertQuery, values, (err) => {
      if (err) {
        return res.status(500).json({
          error: "Database error",
          details: err.message,
        });
      }

      const pdfPath = "summary.pdf"; // Path for the generated PDF
      generatePdf(text,summary, pdfPath);


      res.download(pdfPath, "summary.pdf", (downloadErr) => {
        if (downloadErr) {
          return res.status(500).json({ error: "Error in downloading PDF" });
        }

     
        fs.unlink(pdfPath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting PDF file:", unlinkErr);
          }
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: "Summarization failed",
      details: error.message,
    });
  }
};
export default{textSummary};