import dayjs from "dayjs";
import subscription from "../models/subscription.model.js";
import {createRequire} from "module";
import { sendReminderEmail } from "../utils/send-email.js";
const REMINDERS =[7,5,2,1];
const require=createRequire(import.meta.url);

const {serve} =require("@upstash/workflow/express");
 export const sendRemainders =serve(async (context)=>{
    const {subscriptionId}=context.requestPayload;
    const subscription=await fetchSubscription(context,subscriptionId);
    if(!subscription || subscription.status !="active")return;
    // dayjs -current date and time
    const renewalDate= dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`renewal date has passed for subscription ${subscriptionId}.Stopping workflow`);
            return;
        
    }


    for(const daysBefore of REMINDERS){
        const reminderDate=renewalDate.subtract(daysBefore,"day");
        if(!reminderDate.isAfter(dayjs())){
          await sleepUntilRemainder(context,`Remainder ${daysBefore} days before`,reminderDate);
        }
        await triggerRemainder(context,` ${daysBefore} days before remainder`,subscription);
    }
    });
    const fetchSubscription=async(context,subscriptionId)=>{
        return await context.run('get subscription',async()=>{
            return subscription.findById(subscriptionId).populate("user","name email");
        })
    }
    const sleepUntilRemainder =async(context,label,date)=>{
        console.log(`sleeping until ${label} remainder at ${date}`);
        await context.sleepUntil(label,date.toDate());
    }
    const triggerRemainder =async(context,label,subscription)=>{
        return await context.run(label,async()=>{
            console.log(`triggering ${label} reminder`);
            // send email,sms,push notification....
            await sendReminderEmail({
                to:subscription.user.email,
                type:label,
                subscription:subscription,
            });
        })
    }