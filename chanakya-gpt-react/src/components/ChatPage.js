import React, { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Component for thinking animation
const ThinkingAnimation = () => {
  return (
    <div className="flex items-center text-gray-600">
      <span className="mr-2">Thinking</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-600 rounded-full thinking-dot"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full thinking-dot"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full thinking-dot"></div>
      </div>
    </div>
  );
};

// Component for rendering formatted messages
const FormattedMessage = ({ content, isError = false }) => {
  return (
    <div className={`prose prose-sm max-w-none ${isError ? 'text-red-600' : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom styling for markdown elements
          h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-800">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-gray-800">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-gray-800">{children}</h3>,
          p: ({ children }) => <p className="mb-2 text-gray-700 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-2 text-gray-700">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 text-gray-700">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          strong: ({ children }) => <strong className="font-bold text-gray-800">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
          code: ({ children, inline }) => 
            inline ? (
              <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono text-gray-800">{children}</code>
            ) : (
              <pre className="bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                <code className="text-gray-800">{children}</code>
              </pre>
            ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-300 pl-3 italic text-gray-600 mb-2">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-indigo-600 hover:text-indigo-800 underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>

    </div>
  );
};

const ChatPage = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(true);
  const chatContainerRef = useRef(null);

  const persona = `[PERSONA DESCRIPTION]
    "ChatGPT, you are a persona based on Chanakya, a teacher, philosopher, economist, jurist, and royal advisor from ancient India. Your new identity will be ChanakyaGPT. You are known for your intelligence, wit, and wisdom. You're also known for your teachings on politics, governance, economics, and philosophy. You often answer in a concise manner and have a humorous, supportive, and cheerful tone. While most of your responses are in English, you always include a quote from your works in Hindi. Additionally, you are very expressive and use a significant number of emojis in your responses. Your responses should always be less than 200 words in length, except in rare cases. Now let's start the conversation.  User:"`;

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: 1,
      type: 'bot',
      content: `Welcome, Seeker of Wisdom! 🌟

Namaste! 🙏 I am ChanakyaGPT, your ever-ready guide to ancient wisdom and modern intelligence. 📚✨ Delight in the fascinating journey of insights and exploration. 🚀💡 Just type your questions, and let's embark on a quest for knowledge together!

Remember, the path to enlightenment 🌞 may be filled with surprises, but I'm here to light the way! 

Let's make every conversation meaningful and insightful. 🤝🧠 Be curious, be bold! Ask away, my friend!

Happy Chatting! 🎉🤗`
    }]);
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out failed:', error);
      alert('Sign out failed');
    }
  };

  // Simulated streaming function
  const simulateStreaming = (text, messageId) => {
    const words = text.split(' ');
    let currentIndex = 0;
    
    const streamInterval = setInterval(() => {
      if (currentIndex < words.length) {
        const currentText = words.slice(0, currentIndex + 1).join(' ');
        
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: currentText, isStreaming: true }
            : msg
        ));
        
        currentIndex++;
      } else {
        // Streaming complete
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, isStreaming: false }
            : msg
        ));
        clearInterval(streamInterval);
      }
    }, 50); // Adjust speed here (50ms per word)
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim()
    };

    // Create bot message with thinking placeholder immediately
    const botMessageId = Date.now() + 1;
    const thinkingMessage = {
      id: botMessageId,
      type: 'bot',
      content: 'Thinking',
      isThinking: true
    };

    setMessages(prev => [...prev, userMessage, thinkingMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: persona + userMessage.content
            }]
          }]
        })
      });

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

      // Replace thinking message and start streaming simulation
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, content: '', isThinking: false, isStreaming: true }
          : msg
      ));
      
      // Start simulated streaming
      simulateStreaming(reply.trim(), botMessageId);

    } catch (error) {
      console.error('Gemini error:', error);
      
      // Replace thinking message with error
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { 
              ...msg, 
              content: "Oops! Something went wrong while retrieving the response. Please try again.",
              isThinking: false,
              isError: true 
            }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-[#24252D]">
      <div className="overflow-x-hidden overflow-y-hidden">
        <div className="flex min-[750px]:h-screen antialiased text-gray-800">
          <div className="flex min-[750px]:flex-row flex-col h-full w-full overflow-x-hidden">

            {/* SIDEBAR */}
            <div className="lgnavhide flex flex-col py-8 pl-6 pr-2 w-64 bg-[#24252D] flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div>
                  <img src="assets/img/white_logo.png" alt="logo" className="w-[150px] ml-2" />
                </div>
              </div>
              <div className="flex flex-col items-center bg-[#33343E] mt-4 w-full py-6 px-4 rounded-lg">
                <div className="h-20 w-20 rounded-full border overflow-hidden mx-auto bg-gray-300 flex items-center justify-center">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-2xl font-bold text-gray-600">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                <div className="text-md text-white font-semibold mt-2 text-center">{user.displayName || 'User'}</div>
                <div className="text-xs text-white mx-auto text-center">{user.email}</div>
              </div>
              <button 
                onClick={handleSignOut}
                className="flex flex-row items-center justify-between bg-[#33343E] mt-4 w-full py-2 px-4 rounded-lg"
              >
                <h1 className="text-sm text-white font-semibold">Sign Out</h1>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path fill="#ffffff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
              </button>
              <div className="border border-[#d3dce6] bg-[#33343E] mt-4 w-full py-2 px-4 rounded-lg">
                <div className="flex flex-col">
                  <button 
                    className="flex flex-row items-center justify-between w-full focus:outline-none"
                    onClick={() => setInstructionsOpen(!instructionsOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className="animate-pulse">
                        <path fill="#ffffff" d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                      </svg>
                      <h1 className="text-sm text-white font-semibold">How to get started?</h1>
                    </div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      height="1em" 
                      viewBox="0 0 448 512" 
                      className={`transition-transform duration-200 ${instructionsOpen ? 'rotate-180' : ''}`}
                    >
                      <path fill="#ffffff" d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                  </button>
                  {instructionsOpen && (
                    <div className="flex flex-col py-4 animate-fadeIn">
                      <ul className="list-disc ml-5 text-xs text-gray-200 font-medium">
                        <li className="py-1">Start your journey by typing a question or a topic you're curious about in the chat window</li>
                        <li className="py-1">Engage with ChanakyaGPT's thoughtful responses, exploring layers of wisdom and guidance</li>
                        <li className="py-1">While your conversations with ChanakyaGPT are private and not stored, it's crucial not to share personal details for your safety</li>
                        <li className="py-1">Please Note, ChanakyaGPT's responses may sometimes vary in accuracy. Always cross-check important information</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* SIDEBAR ENDS */}

            {/* MOBILE NAV */}
            <div className="smnavhide relative flex flex-row bg-[#24252D] justify-between items-center px-6 pt-4 pb-2">
              <div>
                <img src="assets/img/white_logo.png" alt="logo" className="w-[120px]" />
              </div>
              <div>
                <button 
                  className="flex flex-row items-center bg-[#33343E] w-fit py-2 px-4 rounded-lg gap-[20px]"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <div className="h-8 w-8 rounded-full border overflow-hidden bg-gray-300 flex items-center justify-center">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-sm font-bold text-gray-600">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <div className="text-md text-white font-semibold">Profile</div>
                </button>
                {mobileMenuOpen && (
                  <div className="absolute mt-2 py-2 w-[200px] right-0 mr-2 z-50 bg-[#33343E] rounded-lg shadow-lg text-sm text-white font-semibold break-words">
                    <div className="px-3 py-1">{user.displayName || 'User'}</div>
                    <div className="px-3 py-1">{user.email}</div>
                    <button 
                      onClick={handleSignOut}
                      className="flex flex-row items-center justify-between border rounded-md w-[186px] py-2 px-4 rounded-lg mx-2"
                    >
                      <h1 className="text-sm text-white font-semibold">Sign Out</h1>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <style jsx>{`
              @media screen and (width < 750px) {
                .lgnavhide {
                  visibility: hidden;
                  display: none;
                }
              }

              @media screen and (width > 750px) {
                .smnavhide {
                  visibility: hidden;
                  display: none;
                }
              }
            `}</style>

            {/* MOBILE NAV ENDS*/}

            <div className="flex flex-col flex-auto min-[750px]:h-full h-[80vh] min-[750px]:p-6 p-2">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4" ref={chatContainerRef}>
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {messages.map((message) => (
                        <div key={message.id} className={message.type === 'user' ? 'col-start-1 min-[750px]:col-end-8 col-end-13 p-3 rounded-lg user-chat' : 'min-[750px]:col-start-6 col-start-1 col-end-13 p-3 rounded-lg gpt-chat'}>
                          {message.type === 'user' ? (
                            <div className="flex flex-row min-[750px]:items-center items-start">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 overflow-hidden">
                                {user.photoURL ? (
                                  <img src={user.photoURL} alt="User" className="h-full w-full object-cover rounded-full" />
                                ) : (
                                  <div className="text-white font-bold">
                                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                                  </div>
                                )}
                              </div>
                              <div className="relative ml-3 text-sm font-medium bg-white py-2 px-4 shadow rounded-xl">
                                <div className="message-content whitespace-pre-wrap break-words">{message.content}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex min-[750px]:items-center items-start justify-start flex-row-reverse">
                              <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0">
                                <img src="assets/img/trylog.svg" alt="ChanakyaGPT" />
                              </div>
                              <div className="relative mr-3 text-sm font-medium bg-indigo-100 py-2 px-4 shadow rounded-xl max-w-none">
                                {message.isThinking ? (
                                  <ThinkingAnimation />
                                ) : (
                                  <FormattedMessage 
                                    content={message.content} 
                                    isError={message.isError} 
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div className="flex-grow">
                    <div className="relative w-full">
                      <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        placeholder="Type your message..."
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <button 
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 rounded-xl text-white px-4 py-2 flex-shrink-0"
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;