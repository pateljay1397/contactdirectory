import mongoose from "mongoose";

const schema = mongoose.Schema;

let Contact = new schema({
  contact_id: {
    required: true,
    type: Number,
    unique: true,
  },
  contact_name: {
    required: true,
    type: String,
  },
  contact_number: {
    required: true,
    type: Number,
  },
  contact_email: {
    required: true,
    type: String,
    unique: true,
  },
  contact_isfavorite: {
    required: true,
    type: Boolean,
  },
});

export default mongoose.model("Contact", Contact);
