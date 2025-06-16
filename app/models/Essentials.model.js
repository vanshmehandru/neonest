import mongoose from "mongoose";

const essentialsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "diapering",
      "feeding",
      "clothing",
      "health",
      "playtime",
      "bathing",
      "sleeping",
      "travel",
      "traditional",
      "cleaning",
      "others",
    ],
    default: "diapering",
  },
  currentStock: {
    type: Number,
    required: true,
    min: 0,
  },
  minThreshold: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    enum: ["pieces", "bottles", "packs", "boxes", "oz", "lbs"],
    default: "pieces",
  },
  notes: {
    type: String,
    default: "",
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Essentials =
  mongoose.models.Essentials || mongoose.model("Essentials", essentialsSchema);

export default Essentials;