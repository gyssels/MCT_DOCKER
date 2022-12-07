import { model, Schema, Document } from 'mongoose';
import { Cat } from '../interfaces/cats.interface';

const catSchema: Schema = new Schema({
  race: {
    type: String,
    required: true,
    unique: true
  },
  origine: {
    type: String,
    required: true,
  },
  comportement: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true
   
  },
});

const catModel = model<Cat & Document>('Cat', catSchema);

export default catModel;
