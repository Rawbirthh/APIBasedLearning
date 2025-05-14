import mongoose, {Document, Schema} from "mongoose";


export interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    watchHistory: {
      movieId: number;
      watchedAt: Date;
      rating?: number;
    }[];
    preferences: {
      favoriteGenres: number[];
    };
}


const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchHistory: [{
      movieId: { type: Number, required: true },
      watchedAt: { type: Date, default: Date.now },
      rating: { type: Number, min: 1, max: 5 },
    }],
    preferences: {
      favoriteGenres: [{ type: Number }],
    },
  });

  export default mongoose.model<IUser>("User", UserSchema);