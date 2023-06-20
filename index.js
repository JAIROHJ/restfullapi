const express = require('express');
const mongoose  = require('mongoose');
const createError = require('http-errors');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// mongoose.connect('mongodb://localhost:27017/restFullApi',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
// .then(()=>{
//     console.log(`mongodb connection successfully`)
// })

mongoose
.connect(
    'mongodb+srv://jairohj:<password>@cluster0.ks2jlfr.mongodb.net/',
    {
        dbName:'restfullapi',
        user:'jairohj',
        pass:'3sctU6xFZsFMJkMI',
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    )
    .then(()=>{
        console.log('Monogodb connected...')
    })
    .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });

    
    const ItemRoute = require('./Routes/Item.route');
    app.use('/items',ItemRoute);
 // 404 error handing

 app.use((req,res,next)=>{
    
//   const err = new Error('Not found');
//   err.status = 404;
//   next(err);
  
  // You can use the above code if your not using the http-errors module
  next(createError(404, 'Not found'));

});
    // Error handler

    app.use((err,req,res,next)=>{
        res.status(err.status || 500);
        res.send({
            error:{
                status:error.status ||500,
                message:err.message
            }
        });
    });


app.listen(PORT,()=>{
    console.log(`Server is listen on port ${PORT} `)
})