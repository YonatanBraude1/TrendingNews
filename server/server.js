const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const {User}=require('./mongodb');
const mongoose=require('mongoose');
const axios = require('axios');

const app=express();
const port=3001;
const corsOptions={
    origin:"http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


// Serve static files from the "public" directory
app.use(express.static('public'));


app.post('/ForgotPassword', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }
        user.password = newPassword;
        await user.save();

       return  res.status(200).json({ message: 'Password reset success' });

    } catch (err) {
        console.error(err);
       return res.status(500).json({ message: 'Server error' });
    }
});
app.post('/Login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare plain-text password
        if (user.password === password) {
            return res.status(200).json({ _id: user._id, message: 'Login success' });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post('/Register',async(req,res)=>{
    const {username,email,phone,password,confirmPassword}=req.body;//منعبي النتةنيم 
    try{ 
        const check=await User.findOne({username:username});
        if(check){//user found 
            return res.status(400).json({message:'faild'})
        }else{//user not found 
            const data={
                username:username,
                email:email,
                phone:phone,
                password:password
            };
            await User.insertMany([data]);
            return res.status(200).json({message:'registration success'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'faild'})
    }
});

//add

 
  // הוספת חדשות מועדפות למשתמש
app.post('/favorites/add', async (req, res) => {
    const { userId, newsUrl } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // הוספת חדשות מועדפות למערך החדשות המועדפות של המשתמש
        if (!user.favoriteNews.includes(newsUrl)) {
            user.favoriteNews.push(newsUrl);
            await user.save();
        }

        return res.status(200).json({ message: 'News added to favorites' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

  // הסרת חדשות מועדפות ממשתמש
app.post('/favorites/remove', async (req, res) => {
    const { userId, newsUrl } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // הסרת חדשות מועדפות ממערך החדשות המועדפות של המשתמש
        user.favoriteNews = user.favoriteNews.filter(url => url !== newsUrl);
        await user.save();

        return res.status(200).json({ message: 'News removed from favorites' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});



app.get('/favorites/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({ favorites: user.favoriteNews });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal Server Error');
    }
});

  
app.listen(port,(req,res)=>{
    console.log('server start at port 3001');
})