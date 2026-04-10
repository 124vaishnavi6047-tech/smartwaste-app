const StatsCard = ({ title, value }) => {
  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;