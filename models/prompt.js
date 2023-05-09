const { Schema, model, models } = require("mongoose");

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required!"],
    },
  prompt: {
    type: String,
    required: [true, "Prompt is required!"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

PromptSchema.index({'prompt': 'text', 'tag': 'text'});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
Prompt.createIndexes();

export default Prompt;
