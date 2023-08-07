import { NextApiRequest,NextApiResponse } from "next";
import { Platform, getServerSession } from "@roq/nextjs";

const roq = new Platform({
    host:process.env.ROQ_PLATFORM_URL!,
    apiKey:process.env.ROQ_API_KEY!,
    environmentId:process.env.ROQ_ENVIRONMENT_ID!
})


export default async function handler(req:NextApiRequest,res:NextApiResponse){
   const userId = getServerSession(req)?.roqUserId
   if(userId){
    await roq.asSuperAdmin().notify({
           notification: {
             key: 'twilio-sms',
             recipients: {
               userIds: [userId],
             },
            
           },
         });
   }
  
}