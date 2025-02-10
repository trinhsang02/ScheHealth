import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const MedicalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'Chào mừng bạn đến với ScheHealth!\nLàm thế nào tôi có thể giúp bạn?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    { keyword: 'đau đầu', department: 'Khoa Thần kinh' },
    { keyword: 'đau bụng', department: 'Khoa Tiêu hóa' },
    { keyword: 'đau ngực', department: 'Khoa Tim mạch' },
    // Add more departments as needed
  ];

  const validateResponse = (response: string): boolean => {
    const forbiddenKeywords = ['chết', 'nguy hiểm', 'không chữa được'];
    
    for (const keyword of forbiddenKeywords) {
      if (response.toLowerCase().includes(keyword)) {
        return false;
      }
    }
    
    return response.length <= 500;
  };

  const suggestDepartment = (userMessage: string): string => {
    for (const dept of departments) {
      if (userMessage.toLowerCase().includes(dept.keyword)) {
        return `Đề xuất: Bạn có thể đến ${dept.department} để được tư vấn chi tiết. Vui lòng đi thăm khám sớm nhất có thể để đảm bảo sức khỏe của bạn.`;
      }
    }
    return 'Xin lỗi, tôi không thể đưa ra tư vấn cho vấn đề này. Vui lòng liên hệ trực tiếp với bác sĩ để được tư vấn chi tiết và đi thăm khám sớm nhất có thể để đảm bảo sức khỏe của bạn.';
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': 'AIzaSyDK68zJiBPI5Gp2_WkDf-g3pQQwzcguDBg'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Bạn là trợ lý y tế. Hãy trả lời câu hỏi sau một cách chuyên nghiệp: ${userMessage}`
            }]
          }]
        })
      });

      const data = await response.json();
      let botResponse = data.candidates[0].content.parts[0].text;

      if (!validateResponse(botResponse)) {
        botResponse = suggestDepartment(userMessage);
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.'
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="flex h-[500px] w-[350px] flex-col rounded-lg bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#00855D] p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-[#00855D]" />
              </div>
              <span className="text-white font-medium">Chatbot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'bot' && (
                  <div className="h-8 w-8 rounded-full bg-[#00855D] flex items-center justify-center mr-2">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-[#00855D] text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="h-8 w-8 rounded-full bg-[#00855D] flex items-center justify-center mr-2">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200">
                  <p className="text-sm">Đang nhập...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 rounded-full text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="rounded-full bg-[#00855D] p-2 h-10 w-10"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-[#00855D] p-3 text-white shadow-lg hover:bg-[#006847]"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default MedicalChatbot;