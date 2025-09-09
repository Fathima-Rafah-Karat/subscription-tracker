import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail=async ({to,type,subscription})=>{
   console.log("email"); 
    if(!to || !type) throw new Error("missing required parameters");
    // const  template = emailTemplates.find((t)=>t.label===type);
    // if(!template)throw new Error("invalid email type");
    // const mailInfo={
    //     userName:subscription.user.name,
    //     subscriptionName:subscription.name,
    //     renewalDate:dayjs(subscription.renewalDate).format("MMM D,YYYY"),
    //     planName:subscription.name,
    //     price:`${subscription.currency} ${subscription.price} ${subscription.frequency}`,
    //     paymentMethod:subscription.paymentMethod,
    // }
   
    
    // const message=template.generateBody(mailInfo);
    // const subject=template.generateSubject(mailInfo);
    const mailOptions={
        from:accountEmail,
        to:to,
        subject: "hello",   
        text: "hi rafah"    
    }


    transporter.sendMail(mailOptions,(error,info)=>{
     if(error) return console.log(error,"Error sending email");
     console.log("email sent:"+info.response);

     
    })
}
 

















//  await sendMail(
//       newUser.email,
//       "Welcome to MyApp 🎉",
//       `<h1>Hi ${newUser.name},</h1>
//        <p>Thanks for signing up! You can now log in using your credentials.</p>`
//     );