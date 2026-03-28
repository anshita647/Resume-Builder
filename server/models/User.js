import mongoose from "mongoose";
import bcryt from "bcrypt";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);
UserSchema.methods.comparePassword = function (password) {
  return bcryt.compareSync(password, this.password);
};
const User = mongoose.model("User", UserSchema);
export default User;
 