// Middleware to check userId and hasPremiumPlan

import { clerkClient } from "@clerk/express";

export const auth = async(req, res, next)=>{
    try{
      const {userId, has}= await req.auth();
      const hasPremiumPlan = await has({plan:'premium'})

      const user = await clerkClient.users.getUser(userId);

      if(!hasPremiumPlan && user.privateMetadata.free_usase){
        req.free_usase = user.privateMetadata.free_usase
      }
      else{
        await ClearkClient.users.updateUserMetadata(userId, {
           privateMetadata:{
            free_usase:0
           }
        })
        req.free_usase = 0;

      }
      req.plan = hasPremiumPlan ? 'premium' : 'free';
      next()
    }
    catch(error){
       res.json({success: false, message: error.message})
    }
}