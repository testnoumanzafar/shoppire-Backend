const express= require('express')
const cors= require('cors')
const dbconnect = require('./config/db')
const userRouter = require('./routes/usersRoute')
// const { PORT } = require('./config')
const { connectCloudinary } = require('./config/cloudinary')
const ProductRoute = require('./routes/ProductRoute')
const cartRouter = require('./routes/cartRouter')
const    orderRouter  = require('./routes/order')

const PORT = process.env.PORT || 3000; 
// app config
const app= express()
// middleware
app.use(express.json())
app.use(cors())
dbconnect()
connectCloudinary()

app.use('/api/user', userRouter)
app.use('/api/product' , ProductRoute)
// app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req,res)=>{
    res.send('workin code')
})

app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
    
})

