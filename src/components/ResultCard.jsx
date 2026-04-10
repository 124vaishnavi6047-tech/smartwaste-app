const ResultCard = ({ severity }) => {
  const getColor = () => {
    if (severity === "High") return "text-red-500";
    if (severity === "Medium") return "text-yellow-500";
    if (severity === "Low") return "text-green-500";
    return "text-gray-500";
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Result</h2>

      <p className="text-lg">
        Severity:
        <span className={`ml-2 font-bold ${getColor()}`}>
          {severity || "Not calculated"}
        </span>
      </p>
    </div>
  );
};

export default ResultCard;