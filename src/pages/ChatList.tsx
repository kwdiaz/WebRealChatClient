import React from 'react';

const ChatList = ({ chats, onSelectChat }: { chats: { username: string; lastMessage: string }[]; onSelectChat: (username: string) => void; }) => {
  return (
    <div className="flex flex-col h-full bg-white shadow-md">
      <div className="bg-green-500 text-white text-lg font-semibold py-3 text-center">Online Users</div>
      <div className="overflow-y-auto h-full">
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <div
              key={index}
              className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSelectChat(chat.username)} // Selects the username
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                {chat.username.charAt(0).toUpperCase()} {/* Shows the user's initial */}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-800">{chat.username}</div>
                
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-600">No users online.</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
