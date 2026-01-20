const NotificationModal = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-96 rounded-xl bg-white p-5 shadow-lg">
        <h2 className="text-lg font-semibold">{notification.title}</h2>
        <p className="mt-1 text-xs text-gray-500">{notification.date}</p>

        <p className="mt-3 text-sm text-gray-700">{notification.content}</p>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
