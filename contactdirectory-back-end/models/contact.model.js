import mongoose from "mongoose";

const schema = mongoose.Schema;

let Contact = new schema({
  contact_name: String,
  contact_number: Number,
});

export default mongoose.model("Contact", Contact);
