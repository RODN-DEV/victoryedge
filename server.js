const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Schema
const deviceSchema = new mongoose.Schema({
  deviceId: String,
  plan: String,
  trialStart: Date,
  joined: String,
  updatedAt: { type: Date, default: Date.now }
});

const Device = mongoose.model('Device', deviceSchema);

// API Routes
app.post('/api/sync', async (req, res) => {
  try {
    const { deviceId, devices, tips, history } = req.body;
    
    // Save to MongoDB
    await Device.updateOne(
      { deviceId },
      {
        ...devices[deviceId],
        updatedAt: new Date()
      },
      { upsert: true }
    );
    
    res.json({ success: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const { deviceId } = req.query;
    const device = await Device.findOne({ deviceId });
    res.json({ devices: { [deviceId]: device } });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
