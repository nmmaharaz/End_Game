import LeftSideRoute from "./LeftSideRoute"
// import UserInfo from "./UserInfo"

function LeftSideBar() {
  return (
    <div className="sticky bg-gray-950/45 shadow-lg rounded-lg overflow-hidden w-2/6 h-screen top-0 left-0">
      <div className="">
        <div>
            {/* <UserInfo></UserInfo> */}
        </div>
        <div>
            <LeftSideRoute></LeftSideRoute>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar