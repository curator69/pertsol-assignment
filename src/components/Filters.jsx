const Filters = ({ filterState, handleFilterState }) => {
  const handleChange = (event, value) => {
    const { checked } = event.target;
    if (checked) {
      handleFilterState({
        ...filterState,
        tasks: [...filterState.tasks, value],
      });
    } else {
      handleFilterState({
        ...filterState,
        tasks: filterState.tasks.filter((el) => el !== value),
      });
    }
  };

  return (
    <div className="absolute top-16 right-4 text-white bg-black p-2 rounded-lg flex flex-col items-start gap-2 w-[100px]">
      <p>Filters</p>
      <ul>
        <li className="flex items-center gap-2">
          <input type="checkbox" onChange={(e) => handleChange(e, "Call")} />
          <p>Call</p>
        </li>
        <li className="flex items-center gap-2">
          <input type="checkbox" onChange={(e) => handleChange(e, "SMS")} />
          <p>SMS</p>
        </li>
        <li className="flex items-center gap-2">
          <input type="checkbox" onChange={(e) => handleChange(e, "Data")} />
          <p>Data</p>
        </li>
      </ul>
    </div>
  );
};

export default Filters;
