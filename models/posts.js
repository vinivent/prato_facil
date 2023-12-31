import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  recipe: {
    type: String,
    required: [true, "Recipe link is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
