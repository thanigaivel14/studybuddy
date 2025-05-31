import mongoose, { Schema } from "mongoose";

const postSchema=new Schema({
    title:{type:String,require:true},
    content:{type:String,require:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]

}
,{ timestamps: true })
export default mongoose.model("Post",postSchema)