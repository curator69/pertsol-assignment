import { useRef } from "react";

const TimeRangePicker = ({ filterState, handleFilterState }) => {
  const ref = useRef();

  const handleClick = () => {
    const [_, from, to] = ref.current.children;

    handleFilterState({
      ...filterState,
      sms: {
        from: from.value ? from.value : null,
        to: to.value ? to.value : null,
      },
    });
  };

  return (
    <div
      className="absolute bottom-16 right-4 text-black bg-white p-2 rounded-lg flex items-center gap-2"
      ref={ref}
    >
      <p>SMS</p>
      <input
        type="time"
        className="p-2 border-2 border-solid border-black rounded-lg"
      />
      <input
        type="time"
        className="p-2 border-2 border-solid border-black rounded-lg"
      />
      <button
        className="bg-black text-white p-2 rounded-lg"
        onClick={handleClick}
      >
        filter
      </button>
    </div>
  );
};

export default TimeRangePicker;
