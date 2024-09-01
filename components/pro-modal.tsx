"use client";

import { use, useState } from "react";
import { Check, Code, ImageIcon, MessageSquare, Music, Settings, VideoIcon, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "./ui/dialog";
import { useProModel } from "@/hooks/view-pro-model";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { checkSubscription } from "@/lib/subscription";
import toast from "react-hot-toast";


const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color:"text-red-400",
        bgColor:"bg-red-400/10",
    },
    {
      label: "Image Generation Station",
      icon: ImageIcon,
      color:"text-rose-600",
      bgColor:"bg-rose-600/10",
  
    },
    {
      label: "Video Generation Office",
      icon: VideoIcon,
      color:"text-fuchsia-300",
      bgColor:"bg-fuchsia-300/10",
    },
    {
      label: "Music Studio",
      icon: Music,
      color:"text-cyan-500",
      bgColor:"bg-cyan-500/10",
    },
    {
      label: "ChatPPT",
      icon: Code,
      color:"text-emerald-500",
      bgColor:"bg-emerald-500/10",
    },
  
  ]

export const ProModal = () => {
    const proModal = useProModel();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        try{
            setLoading(true);
            const response = axios.get("/api/stripe");

            window.location.href = (await response).data.url;
        } catch(error) {
            console.error("[STRIPE_CLIENT_ERROR]", error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade To Liberator
                            <Badge className="uppercase text-sm py-1" variant="premium">
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-slate-900 font-medium">
                        {tools.map((tool) => (
                            <Card 
                             key={tool.label}
                             className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                     disabled = {loading}
                     onClick={onSubscribe}
                     size="lg"
                     variant="premium"
                     className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-slate-100" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};