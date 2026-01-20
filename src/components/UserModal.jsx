const UserModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-80 rounded-xl bg-white p-5 shadow-lg">
        <h2 className="mb-3 text-lg font-semibold">👤 Thông tin sinh viên</h2>

        <div className="space-y-2 text-sm">
          <p>
            <b>Họ tên:</b> {user.name}
          </p>
          <p>
            <b>MSSV:</b> {user.studentId}
          </p>
          <p>
            <b>Khoa:</b> {user.faculty}
          </p>
          <p>
            🌱 <b>{user.greenPoints}</b> điểm xanh
          </p>
          <p>
            ⭐ <b>{user.trainingPoints}</b> điểm rèn luyện
          </p>
          <p>🎯 Chiến dịch đã tham gia: {user.campaignsJoined}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-green-500 py-2 text-white hover:bg-green-600"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default UserModal;
