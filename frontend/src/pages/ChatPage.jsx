import React, { useEffect } from 'react';
import axios from 'axios';

function ChatPage() {
  
const fetchChat = async () => {
  try {
    const { data } = await axios.get('/api/chat');
    console.log('data', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



  useEffect(() => {
    fetchChat()
  }, [])
  return <div>Welcome to the Chat Page</div>;
}

export default ChatPage;