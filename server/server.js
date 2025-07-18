import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware()) 

app.get('/',(req, res)=>{
    res.send("Server is live!")
})
app.use(requireAuth())
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is runnin on port",PORT)
});