const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://MarwaHamoud:Marwa2304@clusterweb.hnfso7d.mongodb.net/pro20')
.then(()=>{console.log('MongoDB connected')})
.catch((err)=>{console.log(err)});

const UserSchema=new mongoose.Schema({
    username:String,
    email:String,
    phone:String,
    password:String,
    favoriteNews: [String]
  

});

const User =mongoose.model("User",UserSchema);

module.exports={
    User
}

