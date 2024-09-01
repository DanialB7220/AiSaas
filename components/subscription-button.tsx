// "use client";

// import { Zap } from "lucide-react";
// import { Button } from "./ui/button";
// import axios from "axios";
// import { useState } from "react";


// interface SubscriptionButtonProps {
//     isPro: boolean;
// }

// export const SubscriptionButton = ({
//     isPro = false
// }:SubscriptionButtonProps) => {
//     const [loading, setLoading] = useState(false);

//     const onClick = async() => {

//         try{
   
//             setLoading(true);
//             const response = await axios.get("/api/stripe");

//             window.location.href = response.data.url;
            
//         }catch(error){
//             console.error("BILLING_ERROR",error);
//         } finally {
//             setLoading(false);
//         }
//     }
//     return(
       
//         <Button type="submit" disabled={loading} variant={isPro ? "default":"premium"} onClick={onClick}>
//             {isPro ? "Manage Subscription" : "Upgrade to Liberator"}
//             {!isPro && <Zap className="w-4 h-4 ml-2 fill-slate-100"/>}
//         </Button>
      
//     )
// }

"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({
    isPro = false
}: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            console.error("BILLING_ERROR", error);
            toast.error("Something went wrong!");
           
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
            {isPro ? "Manage Subscription" : "Upgrade to Liberator"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-slate-100" />}
        </Button>
    );
};
