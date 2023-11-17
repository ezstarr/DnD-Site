import mongoose, {Schema} from "mongoose"

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const userSchema = new Schema({
  uuid: int,
  name: String,
  password: String,
},
{
  timestasmp: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;