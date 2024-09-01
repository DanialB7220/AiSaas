// models/ApiUsage.ts
import mongoose from 'mongoose';

const apiUsageSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  requestCount: { type: Number, default: 0 },
  lastRequest: { type: Date, default: Date.now }
});

const ApiUsage = mongoose.models.ApiUsage || mongoose.model('ApiUsage', apiUsageSchema);

export default ApiUsage;
