import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Heart, Fish, Wand, Medal, Star } from 'lucide-react';
import liiliiAvatar from '@/assets/liilii-avatar.png';
import { useUser } from '@/hooks/user.hook';
import { useChat } from '@/hooks/chat.hook';

interface Message {
  id: string;
  text: string;
  thinking: string;
}

const LiiLiiChatInterface = () => {

  const { user } = useUser();
  const { sendMessage, changeThought, chatSeason } = useChat();
  console.log(user)

  const [inputValue, setInputValue] = useState('');
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatSeason.chatHistory]);

  // useEffect(() => {

  // }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: chatSeason.id,
      text: inputValue,
      thinking: chatSeason.animalData.animalThinking
    };
    console.log(chatSeason, userMessage)

    await sendMessage(userMessage);

    // setInputValue('');
  };

  const _changeThought = async () => {
    await changeThought(user.telegramId);

  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cat-cream via-cat-pink-soft to-cat-blue-soft flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-4 right-4 z-10 flex flex-row gap-2">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2 shadow-lg">
          <Medal className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold text-foreground">{user.medals || 0}</span>
        </div>
        {/* <div className="bg-cat-pink/80 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2 shadow-lg animate-pulse-cozy">
          <span className="text-xs font-medium text-foreground">{streakDays}-Day Friend Streak 🐾</span>
        </div> */}
      </div>

      {/* Header Section */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-b-3xl shadow-lg relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={liiliiAvatar} 
              alt="LiiLii Avatar" 
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg animate-bounce-gentle"
            />
            <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse-cozy"></div>
          </div>
          
          <div className="flex-1">
            <div className="bg-cat-pink rounded-2xl p-3 relative shadow-md">
              <p className="text-sm font-medium text-foreground">{chatSeason?.animalData?.animalThinking}</p>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-cat-pink"></div>
            </div>
            
            <Button
              onClick={_changeThought}
              variant="ghost"
              size="sm"
              className="mt-2 h-6 px-2 text-xs hover:bg-cat-blue-soft"
            >
              <Wand className="w-3 h-3 mr-1" />
              Change Thought
            </Button>
          </div>
        </div>

        {/* Happiness Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Happiness</span>
            <span className="text-sm font-bold text-primary">{chatSeason.animalData.happiness}%</span>
          </div>
          <Progress value={chatSeason.animalData.happiness} className="h-2" />
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatAreaRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto h-96"
      >
        {chatSeason.chatHistory.map(({ message, index }: any) => (
          <div
            key={index}
            className={`flex ${message?.role == "user" ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl shadow-md ${
                message?.role == "user"
                  ? 'bg-cat-blue text-foreground rounded-br-md'
                  : 'bg-cat-pink text-foreground rounded-bl-md relative'
              }`}
            >
              {message?.role == "bot" && (
                <div className="absolute -left-1 bottom-2 text-cat-pink">
                  🐾
                </div>
              )}
              <p className="text-sm">{message?.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {/* {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-t-3xl shadow-lg">
        <div className="flex gap-2 items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Say something to LiiLii…"
            className="flex-1 rounded-full border-2 border-cat-pink/30 bg-white/90 focus:border-cat-pink focus:ring-cat-pink/20 placeholder:text-muted-foreground/60"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="rounded-full w-12 h-12 bg-cat-pink hover:bg-cat-pink/80 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Heart className="w-5 h-5 fill-current animate-pulse-cozy" />
          </Button>
        </div>
        
        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground hover:bg-cat-blue-soft rounded-full"
          >
            🎭 Emoji • 🎯 Stickers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiiLiiChatInterface;