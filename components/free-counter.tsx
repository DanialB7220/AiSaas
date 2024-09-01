"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModel } from "@/hooks/view-pro-model";


interface FreeCounterProps {
    userApiUsage: number;
    isPro: boolean;
}  


export const FreeCounter = ({
    userApiUsage = 0,
    isPro = false,
}: FreeCounterProps) => {

    const proModal = useProModel();
    const [mounted, setMounted] = useState(false); 

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted){
        return null;
    }

    if(isPro){
        return null;
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {userApiUsage} / {MAX_FREE_COUNTS} Free generations
                        </p>
                        <Progress 
                         className="h-4"
                         value={userApiUsage/MAX_FREE_COUNTS * 100}
                        />
                    </div>
                    <Button onClick={proModal.onOpen} className="w-full" variant={"premium"}>
                        Level Up
                        <Zap className="w-4 h-4 ml-2 fill-pink-100"/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
    
};