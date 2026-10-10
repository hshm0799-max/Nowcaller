require('dotenv').config();
const express=require('express'),mongoose=require('mongoose'),cors=require('cors'),helmet=require('helmet'),rateLimit=require('express-rate-limit');
const authRoutes=require('./routes/auth'),staffRoutes=require('./routes/staff'),numberRoutes=require('./routes/numbers'),reportRoutes=require('./routes/reports');
const errorHandler=require('./middleware/errorHandler'),notFound=require('./middleware/notFound');
const app=express();app.use(helmet());app.use(cors());app.use(express.json());app.use(rateLimit({windowMs:15*60*1000,max:300}));
app.use('/api/auth',authRoutes);app.use('/api/staff',staffRoutes);app.use('/api/numbers',numberRoutes);app.use('/api/reports',reportRoutes);
app.get('/',(req,res)=>res.json({name:'NowCaller',status:'ok',version:'1.0'}));app.use(notFound);app.use(errorHandler);
mongoose.connect(process.env.MONGO_URI).then(()=>app.listen(process.env.PORT||5000,()=>console.log('NowCaller API running'))).catch(e=>console.error('DB Error',e));
