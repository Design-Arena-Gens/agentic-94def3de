'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ChatWindow from '@/components/ChatWindow'
import { Contact, Message } from '@/types'

export default function Home() {
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'John Doe',
      avatar: '👨‍💼',
      lastMessage: 'Hey, how are you?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Sarah Smith',
      avatar: '👩‍💻',
      lastMessage: 'See you tomorrow!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: '👨‍🎨',
      lastMessage: 'Thanks for your help',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: '👩‍🔬',
      lastMessage: 'Can we schedule a meeting?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unread: 5,
      online: false
    },
    {
      id: 5,
      name: 'David Brown',
      avatar: '👨‍🏫',
      lastMessage: 'Great work on the project!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      unread: 0,
      online: true
    }
  ])

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({
    1: [
      { id: 1, text: 'Hey, how are you?', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
      { id: 2, text: "I'm doing great! How about you?", sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 4) },
      { id: 3, text: 'Pretty good! Working on some new projects', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 3) }
    ],
    2: [
      { id: 1, text: 'Did you finish the report?', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
      { id: 2, text: 'Yes, I sent it over this morning', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 45) },
      { id: 3, text: 'Perfect! See you tomorrow!', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 30) }
    ],
    3: [
      { id: 1, text: 'Can you help me with this issue?', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
      { id: 2, text: 'Sure, what do you need?', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5) },
      { id: 3, text: 'Thanks for your help', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) }
    ]
  })

  const handleSendMessage = (text: string) => {
    if (!selectedContact) return

    const newMessage: Message = {
      id: (messages[selectedContact.id]?.length || 0) + 1,
      text,
      sender: 'me',
      timestamp: new Date()
    }

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }))

    // Simulate response after 1-2 seconds
    setTimeout(() => {
      const responses = [
        "That's interesting!",
        "I see what you mean",
        "Sounds good to me",
        "Thanks for letting me know",
        "Got it!",
        "Absolutely!",
        "Sure thing!"
      ]
      const responseText = responses[Math.floor(Math.random() * responses.length)]

      const responseMessage: Message = {
        id: (messages[selectedContact.id]?.length || 0) + 2,
        text: responseText,
        sender: 'them',
        timestamp: new Date()
      }

      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), responseMessage]
      }))
    }, 1000 + Math.random() * 1000)
  }

  return (
    <div className="flex h-screen bg-[#111B21]">
      <Sidebar
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={setSelectedContact}
      />
      <ChatWindow
        contact={selectedContact}
        messages={selectedContact ? messages[selectedContact.id] || [] : []}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}
