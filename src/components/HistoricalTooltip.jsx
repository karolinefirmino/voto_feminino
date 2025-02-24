const HistoricalTooltip = ({ facts, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-72 border border-gray-200">
      <h3 className="font-bold text-lg text-[#1e2b6b] mb-3">Marcos Históricos</h3>
      {facts.map((fact, index) => (
        <div key={index} className="mb-3 last:mb-0 flex items-start">
          <span className="text-2xl mr-2">{fact.icon}</span>
          <div>
            <h4 className="font-medium text-[#832161]">{fact.title}</h4>
            <p className="text-sm text-gray-600">{fact.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoricalTooltip;