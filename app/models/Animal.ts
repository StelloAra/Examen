import mongoose, { Schema, model, models } from 'mongoose';

// Detta schema måste matcha strukturen i din IAnimal-typ
const AnimalSchema = new Schema({
  attributeValues: {
    title: { value: { type: String, required: true } },
    description: { value: { type: String, required: true } },
    image: { 
      value: { 
        downloadLink: { type: String, required: true } 
      } 
    },
    link: { value: { type: String } }
  }
}, { timestamps: true });

// Vi kontrollerar om modellen redan finns för att undvika fel vid "hot reload"
const Animal = models.Animal || model('Animal', AnimalSchema);

export default Animal;