import { useState } from "react";

const PhotoCapture = ({ onCapture }) => {
  const [photo, setPhoto] = useState(null);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;

          setPhoto(file);
          onCapture(file);
        }}
      />

      {photo && (
        <img
          src={URL.createObjectURL(photo)}
          alt="Ảnh rác"
          className="mt-2 rounded-lg w-full max-w-xs"
        />
      )}
    </div>
  );
};

export default PhotoCapture;
