import express from "express";
import { google } from "googleapis";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_CREDENTIALS, "base64").toString("utf-8")
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = "1funwdM7sR_KtBZF6ApRnpxPD77asoWMGEfQWJsNSX6Q";

// **Fetch Data from Google Sheets**
app.get("/sheets", async (req, res) => {
  try {
    const client = await auth.getClient();
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A1:C10",
    });

    res.json(response.data.values);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send(error.message);
  }
});

// **Update Google Sheets Data**
app.post("/update-sheet", async (req, res) => {
  try {
    const { row, values } = req.body;
    const client = await auth.getClient();

    await sheets.spreadsheets.values.update({
      auth: client,
      spreadsheetId: SPREADSHEET_ID,
      range: `Sheet1!A${row}:C${row}`,
      valueInputOption: "USER_ENTERED",
      resource: { values: [values] },
    });

    res.json({ message: "✅ Sheet updated successfully" });
  } catch (error) {
    console.error("❌ Error updating Google Sheet:", error);
    res.status(500).send(error.message);
  }
});

// **Add a New Event**
app.post("/add-event", async (req, res) => {
  try {
    const { values } = req.body;
    const client = await auth.getClient();

    await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:C",
      valueInputOption: "USER_ENTERED",
      resource: { values: [values] },
    });

    res.json({ message: "✅ Event added successfully" });
  } catch (error) {
    console.error("❌ Error adding event:", error);
    res.status(500).send(error.message);
  }
});

// **Delete an Event**
app.post("/delete-event", async (req, res) => {
  try {
    const { row } = req.body;
    const client = await auth.getClient();

    await sheets.spreadsheets.values.clear({
      auth: client,
      spreadsheetId: SPREADSHEET_ID,
      range: `Sheet1!A${row}:C${row}`,
    });

    res.json({ message: "✅ Event deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting event:", error);
    res.status(500).send(error.message);
  }
});

// **Start Server**
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
