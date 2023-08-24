import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Modal({ setAdd, hotelId }) {
  const [rooms, setRooms] = useState([]);
  const [action, setAction] = useState("select");
  useEffect(() => {
    getRooms();
  }, []);
  function getRooms() {
    try {
      fetch(`http://localhost:5000/place/getRooms/${hotelId}`)
        .then((res) => res.json())
        .then((data) => setRooms(data));
    } catch (error) {}
  }

  return createPortal(
    <div className="">
      <div
        onClick={() => setAdd(false)}
        className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-40"
      />
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 bg-white rounded-md shadow-md w-[600px]">
        <div className="flex gap-5 min-w-full">
          <button onClick={() => setAction("select")}>Select Rooms</button>
          <button onClick={() => setAction("add")}>Add Rooms</button>
        </div>
        {action === "select" ? (
          <div className="flex flex-col mt-5">
            {rooms?.map((room) => (
              <div className="flex justify-between">
                <div className="">
                  <h1 className="text-2xl">{room.title}</h1>
                  <p className="text-xl">{room.desc}</p>
                  <div className="mt-1">
                    Max people: <span>{room.maxPeople}</span>
                  </div>
                  <div className="">
                    Price: <span>{room.price}</span>
                  </div>
                </div>
                <div className="flex gap-5">
                  {room?.roomNumbers?.map((rNum) => (
                    <div className="flex flex-col">
                      <input type="checkbox" />
                      <span>{rNum.number}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="self-start bg-red-400 text-white p-2 rounded-md cursor-pointer mt-5 font-bold">Reserve</button>
          </div>
        ) : (
          <div>add</div>
        )}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
