const express = require('express')
const connectDB = require('./config/connectDB')
const morgan = require('morgan')
const productRoutes = require('./routes/productsRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const path = require('path')


const {notFound,errorHandler} =require('./middleware/errorMiddleware')
const dotenv = require('dotenv')
dotenv.config()

connectDB()
const app = express();

if (process.env.NODE_ENV =='development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)


// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(path.resolve(), '/frontend/build')))
  app.get('*', (req,res)=> res.sendFile(path.resolve(path.resolve(),'frontend', 'build', 'index.html')))
  
} else {
    app.get('/', (req,res)=>{
    res.send('API is running on 5000 ...')
})
}





app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`the server is running in ${process.env.NODE_ENV} on ${port}`);
});