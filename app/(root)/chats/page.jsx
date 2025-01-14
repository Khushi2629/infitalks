import ChatList from "@components/ChatList"
import VideoCall from "@components/VideoCall"

const Chats = () => {
  return (
    <div className="main-container">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
        <ChatList />
      </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
        <VideoCall />
      </div>
    </div>
  )
}

export default Chats