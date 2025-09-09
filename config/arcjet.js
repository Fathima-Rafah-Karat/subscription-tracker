 import arject, { shield,detectBot,tokenBucket} from "@arcjet/node";
 import { ARCJET_KEY } from "./env.js";
 const aj = arject({
  key:ARCJET_KEY,
  characteristics:["ip.src"],
  rules: [
  
    shield({ mode: "LIVE" }),
 
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only

      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
             ],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});
export default aj;




