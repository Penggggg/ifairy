import * as Mongoose from 'mongoose';
import { ClassifySchema } from './classify.schema';

export default Mongoose.model( 'Classify', ClassifySchema ) as any