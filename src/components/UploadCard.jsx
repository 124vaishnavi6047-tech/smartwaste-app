import { useState } from "react";

const UploadCard = ({ setImage }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">
        Upload Waste Image
      </h2>

      <input type="file" onChange={handleChange} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-4 w-64 rounded"
        />
      )}
    </div>
  );
};

export default UploadCard;