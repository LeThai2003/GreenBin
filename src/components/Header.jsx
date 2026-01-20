import { useState } from "react";
import { Bell } from "lucide-react";
import { fakeUser } from "../data/fakeUser";
import { fakeNotifications } from "../data/fakeNotifications";
import UserModal from "./UserModal";
import NotificationModal from "./NotificationModal";
import { useUserStore } from "../stores/useUserStore";

const Header = () => {
  const user = useUserStore((s) => s.user);

  const [showUser, setShowUser] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [selectedNotify, setSelectedNotify] = useState(null);

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white/90 px-4 py-3 shadow backdrop-blur">
        {/* USER */}
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => setShowUser(true)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-white">
            BN
          </div>

          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                🌱 <b className="text-green-600">{user.greenPoints}</b> điểm
                xanh
              </span>

              <span className="flex items-center gap-1">
                ⭐ <b className="text-blue-600">{user.trainingPoints}</b> điểm
                rèn luyện
              </span>
            </div>
          </div>
        </div>

        {/* NOTIFICATION */}
        <div className="relative">
          <button
            onClick={() => setShowNotify(!showNotify)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {showNotify && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-2xl border border-slate-100">
              {fakeNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    setSelectedNotify(n);
                    setShowNotify(false);
                  }}
                  className="cursor-pointer border-b border-slate-100 px-3 py-2 text-sm hover:bg-gray-100 last:border-b-0"
                >
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.short}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* MODALS */}
      {showUser && <UserModal user={user} onClose={() => setShowUser(false)} />}

      {selectedNotify && (
        <NotificationModal
          notification={selectedNotify}
          onClose={() => setSelectedNotify(null)}
        />
      )}
    </>
  );
};

export default Header;
