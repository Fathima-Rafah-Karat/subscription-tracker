//  await sendMail(
//       newUser.email,
//       "Welcome to MyApp 🎉",
//       `<h1>Hi ${newUser.name},</h1>
//        <p>Thanks for signing up! You can now log in using your credentials.</p>`
//     );
    
// export const generateEmailTemplate=({
//    userName,
//    subscriptionName,
//    renewalDate,
//    planName,
//    price,
//    paymentMethod,
//    accountSettingsLink,
//    supportLink,
//    daysLeft,
// });
export const emailTemplates=[
   {
    label:"7 days before remainder",
   generateSubject: (data)=>
     `reminder: your ${data.subscriptionName} Subscription renews in 7 days !`,
   generateBody:(data)=>generateEmailTemplate()
},
 {
    label:"5 days before remainder",
   generateSubject: (data)=>
     `reminder: your ${data.subscriptionName} Subscription renews in 5 days !`,
   generateBody:(data)=>generateEmailTemplate()
},
 {
    label:"2 days before remainder",
   generateSubject: (data)=>
     `reminder: your ${data.subscriptionName} Subscription renews in 2 days !`,
   generateBody:(data)=>generateEmailTemplate()
},
 {
    label:"1 days before remainder",
   generateSubject: (data)=>
     `reminder: your ${data.subscriptionName} Subscription renews in 1 days !`,
   generateBody:(data)=>generateEmailTemplate()
},
 {
    label:"final day  remainder",
   generateSubject: (data)=>
     `reminder: your ${data.subscriptionName} renews today -you're all set!`,
   generateBody:(data)=>generateEmailTemplate()
},
];