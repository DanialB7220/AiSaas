"use client";

import { _iterSSEMessages } from "openai/streaming.mjs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name:"Harvey Specter",
        Avatar:"HS",
        title:"Senior Partner",
        description:"As someone who needs speed and accuracy, I can say that this is the best tool I have ever used!"
    },
    {
        name:"Bill Gates",
        Avatar:"BG",
        title:"Founder of Microsoft",
        description:"Everyone in my team uses this highly reccomend!"
    },
    {
        name:"Shah Ruk Khan",
        Avatar:"SK",
        title:"Bollywood Actor and Producer",
        description:"Great tool for when I'm in a cretaive slump!"
    },
    {
        name:"Zayn Malik",
        Avatar:"ZM",
        title:"Singer and Songwriter",
        description:"I use this tool to write my songs, it's amazing!"
    },
]

export const LandingContent = () => {
    return(
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white  font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0 ">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}