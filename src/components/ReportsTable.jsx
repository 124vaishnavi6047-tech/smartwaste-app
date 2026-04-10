const ReportsTable = ({ reports }) => {
    

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>ID</th>
            <th>Location</th>
            <th>Severity</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((item) => (
            <tr key={item.id} className="border-b">
              <td>{item.id}</td>
              <td>{item.location}</td>
              <td>{item.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;