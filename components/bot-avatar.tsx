import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {    
    return (
        <Avatar className="h-11 w-11">
            <AvatarImage className="p-1" src="/bot.png"/>
        </Avatar>
    );
}; 