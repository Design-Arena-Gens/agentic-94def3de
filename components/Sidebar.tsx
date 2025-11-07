import { Contact } from '@/types'
import { format, isToday, isYesterday } from 'date-fns'

interface SidebarProps {
  contacts: Contact[]
  selectedContact: Contact | null
  onSelectContact: (contact: Contact) => void
}

export default function Sidebar({ contacts, selectedContact, onSelectContact }: SidebarProps) {
  const formatTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'HH:mm')
    } else if (isYesterday(date)) {
      return 'Yesterday'
    } else {
      return format(date, 'dd/MM/yyyy')
    }
  }

  return (
    <div className="w-[400px] bg-[#111B21] border-r border-[#2A3942] flex flex-col">
      {/* Header */}
      <div className="bg-[#202C33] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#6B7C85] flex items-center justify-center text-xl">
            👤
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-[#8696A0] hover:text-white transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#111B21] p-2">
        <div className="bg-[#202C33] rounded-lg flex items-center px-4 py-2">
          <svg className="w-5 h-5 text-[#8696A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent border-none outline-none text-white text-sm ml-3 flex-1 placeholder-[#8696A0]"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map(contact => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`p-4 flex items-center space-x-3 cursor-pointer transition ${
              selectedContact?.id === contact.id ? 'bg-[#2A3942]' : 'hover:bg-[#202C33]'
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#6B7C85] flex items-center justify-center text-2xl">
                {contact.avatar}
              </div>
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111B21]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-medium truncate">{contact.name}</h3>
                <span className="text-xs text-[#8696A0]">{formatTime(contact.lastMessageTime)}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#8696A0] truncate">{contact.lastMessage}</p>
                {contact.unread > 0 && (
                  <span className="ml-2 bg-[#25D366] text-black text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
