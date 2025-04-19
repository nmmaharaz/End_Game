function LeftSideRoute() {
  return (
    <div>
        <div className="border-t border-gray-400 p-4">
        <ul className="space-y-2 text-white">
          {[
            { label: "Home", icon: "🏠" },
            { label: "My Network", icon: "🙎" },
            { label: "Community", icon: "🧑‍🤝‍🧑" },
            { label: "Notifications", icon: "🔔" },
            { label: "Message", icon: "💬" },
            { label: "Settings", icon: "⚙️" },
          ].map((item, index) => (
            <li key={index} className="flex items-center space-x-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-white text-sm font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-400 p-4 text-center">
        <button className="text-blue-600 font-semibold text-sm">View Profile</button>
      </div>
    </div>
  )
}

export default LeftSideRoute