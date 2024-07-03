import { useState } from "react";
import { Search, MoreVertical, Send, Smile, Paperclip } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const placeholderChats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: "12:45 PM",
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Let's catch up later.",
    timestamp: "11:30 AM",
    unreadCount: 0,
  },
  // Add more placeholder chats as needed
];

const placeholderMessages = [
  {
    id: 1,
    sender: "John Doe",
    content: "Hey, how are you?",
    timestamp: "12:45 PM",
    sent: false,
  },
  {
    id: 2,
    sender: "You",
    content: "I'm good, thanks! How about you?",
    timestamp: "12:46 PM",
    sent: true,
  },
  // Add more placeholder messages as needed
];

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // Add the new message to the placeholderMessages array
      placeholderMessages.push({
        id: placeholderMessages.length + 1,
        sender: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString(),
        sent: true,
      });
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" className="mx-auto object-cover w-10 h-10" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="font-semibold">WhatsApp Clone</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <Input placeholder="Search or start new chat" className="pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {placeholderChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between p-4 border-b cursor-pointer hover:bg-muted"
              onClick={() => handleChatClick(chat)}
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={chat.name} className="mx-auto object-cover w-10 h-10" />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{chat.name}</div>
                  <div className="text-sm text-muted-foreground">{chat.lastMessage}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{chat.timestamp}</div>
                {chat.unreadCount > 0 && (
                  <div className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={selectedChat.name} className="mx-auto object-cover w-10 h-10" />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{selectedChat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4 space-y-4">
              {placeholderMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-lg ${
                      msg.sent ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div>{msg.content}</div>
                    <div className="text-xs text-muted-foreground text-right">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button variant="primary" size="icon" onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <span className="text-muted-foreground">Select a chat to start messaging</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;