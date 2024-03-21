import { personsData } from "../../data";

const Table = () => {
  return (
    <div className="p-2">
      <div className="bg-black text-white p-2 rounded-md flex flex-col gap-4">
        <h1 className="text-center">Table view</h1>

        <li className="list-none flex items-start gap-4">
          <p className="min-w-[100px] ml-4">Name:</p>
          <div className="flex flex-col gap-4">
            <p>Tasks:</p>
            <div className="flex gap-4">
              <p className="w-[265px]">Call records</p>
              <p className="w-[265px]">SMS</p>
              <p className="w-[265px]">Data</p>
            </div>
          </div>
        </li>
        {personsData.map(({ id, name, tasks: { call, sms, data } }) => (
          <li
            key={id}
            className="list-none flex gap-4 p-4 rounded-md"
            style={{ border: "1px solid white" }}
          >
            <h2 className="min-w-[100px]">{name}</h2>

            <div className="flex flex-col gap-2">
              {call.callRecords.map(
                ({ duration, location: { lat, lng }, time, to }, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-2 rounded-md w-[265px]"
                    style={{ border: "1px solid white" }}
                  >
                    <p>Call: {i + 1}</p>
                    <p>To: {to}</p>
                    <p>Duration: {duration / 60} mins</p>
                    <p>Time: {time}</p>
                    <p>
                      Location: Lat: {lat} Lng: {lng}
                    </p>
                  </div>
                )
              )}
            </div>

            <div className="flex flex-col gap-2">
              {sms.map(({ location: { lat, lng }, time, to }, i) => (
                <div
                  key={i}
                  className="flex flex-col p-2 rounded-md w-[265px]"
                  style={{ border: "1px solid white" }}
                >
                  <p>To: {to}</p>
                  <p>Time: {time}</p>
                  <p>
                    Location: Lat: {lat} Lng: {lng}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col p-2 rounded-md w-[265px] h-fit"
              style={{ border: "1px solid white" }}
            >
              <p>Time: {data.time}</p>
              <p>Upload: {data.upload}</p>
              <p>Download: {data.download}</p>
              <p>
                Location: Lat: {data.location.lat} Lng: {data.location.lng}
              </p>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Table;
