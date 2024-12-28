# Project: Text Summarization API

## Overview
The **Text Summarization API** is a Node.js application that leverages the Hugging Face summarization model to generate concise summaries from provided text. The application provides the summarized content as a downloadable PDF and stores the original and summarized text in a MySQL database.

## Features
- Accepts text input via API requests.
- Summarizes text using the Hugging Face `facebook/bart-large-cnn` model.
- Generates a PDF containing the original text and its summary.
- Stores the text and its summary in a MySQL database.
- Handles errors and validates user input.

## Technologies Used
- **Node.js**: Backend framework.
- **Express.js**: Web framework for handling API routes.
- **Hugging Face Inference API**: Used for text summarization.
- **MySQL**: Database for storing text and summaries.
- **PDFKit**: Library for PDF generation.
- **dotenv**: For managing environment variables.

## Installation and Setup

### Prerequisites
- **Node.js** (v16 or above)
- **MySQL** server
- API key from [Hugging Face](https://huggingface.co/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/text-summarization.git
   cd text-summarization
   Here are the endpoints for your deployed project:

### Deployed API Endpoints
Base URL
https://aitextsummarizationapi.onrender.com

## 1. Summarize Text
POST /api/text

## Description
Generates a summary for the provided text and returns a downloadable PDF.

Request Body
json
Copy code
{
  "text": "Your input text to be summarized"
}
Response
Success: Downloads a PDF containing the original text and the summary.
Error: Returns a JSON object with an error message.
## Example Error Response
json
{
  "error": "Invalid or missing text"
}
