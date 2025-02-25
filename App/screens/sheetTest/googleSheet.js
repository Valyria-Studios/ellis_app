import express from "express";
import { google } from "googleapis";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url"; // Required for __dirname in ESM

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sheets = google.sheets("v4");
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "test-for-writing-to-sheet-dc20eeb8c2e8.json"), // Corrected path handling
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SPREADSHEET_ID = "1funwdM7sR_KtBZF6ApRnpxPD77asoWMGEfQWJsNSX6Q";

// **Fetch Data from Google Sheets**
app.get("/sheets", async (req, res) => {
  try {
    const client = await auth.getClient();
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A1:C10", // Adjust range as needed
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
    const { row, values } = req.body; // Expecting { row: 2, values: ["Updated Event", "3/5", 20] }
    const client = await auth.getClient();

    sheets.spreadsheets.values.update({
      auth: client,
      spreadsheetId: SPREADSHEET_ID,
      range: `Sheet1!A${row}:C${row}`, // Update specific row
      valueInputOption: "USER_ENTERED",
      resource: { values: [values] },
    });

    res.json({ message: "✅ Sheet updated successfully" });
  } catch (error) {
    console.error("❌ Error updating Google Sheet:", error);
    res.status(500).send(error.message);
  }
});

app.post("/add-event", async (req, res) => {
  try {
    const { values } = req.body; // Expecting ["New Event", "3/5", 20]
    const client = await auth.getClient();

    await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:C", // Append to the end of columns A to C
      valueInputOption: "USER_ENTERED",
      resource: { values: [values] },
    });

    res.json({ message: "✅ Event added successfully" });
  } catch (error) {
    console.error("❌ Error adding event:", error);
    res.status(500).send(error.message);
  }
});

app.post("/delete-event", async (req, res) => {
  try {
    const { row } = req.body; // Expecting { row: 3 } to delete row 3
    const client = await auth.getClient();

    // Clear the row (does not shift others up)
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

app.listen(3000, () => console.log("Server running on port 3000"));
