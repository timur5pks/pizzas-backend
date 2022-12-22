import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const PizzaSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  types: [String],
  sizes: [
    {
      String,
      Number,
    },
  ],
  rating: {
    type: Number,
  },
  category: {
    type: String,
  },
});

PizzaSchema.plugin(mongoosePaginate);

export default mongoose.model('pizza', PizzaSchema);
