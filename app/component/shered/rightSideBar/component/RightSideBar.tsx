import Follow from "../../follow/Follow"

function RightSideBar() {
  return (
    <div className="sticky top-0 right-0 rounded-lg bg-gray-950/45 shadow-lg p-6 w-2/6 h-screen text-white text-xl">
      <div className="flex h-[50%] flex-col justify-start ">
        <Follow></Follow>
        </div>
    </div>
  )
}

export default RightSideBar