export interface Contact {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unread: number
  online: boolean
}

export interface Message {
  id: number
  text: string
  sender: 'me' | 'them'
  timestamp: Date
}
