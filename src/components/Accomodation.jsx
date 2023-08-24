import React, { useEffect, useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineWifi,
  AiFillCar,
  AiFillCaretLeft,
  AiFillCaretRight,
} from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import { FiEdit2, FiUploadCloud } from "react-icons/fi";
import { BsFillTrashFill, BsThreeDotsVertical } from "react-icons/bs";
import PlaceForm from "./PlaceForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { useRef } from "react";
import Modal from "./Modal";

const Accomodation = () => {
  //   const [selection, setSelection] = useState("");
  //   let content;
  //   if (selection === "new") {
  //     content = <PlaceForm setSelection={setSelection} />;
  //   }
  const [accomodations, setAccomodations] = useState(null);
  const [options, setOptions] = useState(false);
  const { user } = useUserContext();
  useEffect(() => {
    getAccomodations();
  }, []);
  const getAccomodations = async () => {
    try {
      let response = await axios.get(
        "http://localhost:5000/place/getAllPlaces"
      );
      setAccomodations(response.data);
    } catch (error) {}
  };

  async function deleteAccomodation(id) {
    try {
      let response = await axios.delete(
        `http://localhost:5000/place/deleteplace/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 200) getAccomodations();
    } catch (error) {}
  }

  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="flex flex-col items-center">
        <button
          onClick={() => navigate("/account/accomodations/new")}
          className="flex items-center gap-2 rounded-3xl bg-red-500 text-white p-2"
        >
          <AiOutlinePlus />
          Add new place
        </button>
        <div className="mt-4 w-full flex flex-col gap-6">
          {accomodations?.map((accomodation) => (
            <SingleAccomodation
              {...accomodation}
              deleteAccomodation={deleteAccomodation}
              accomodation={accomodation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function SingleAccomodation({
  photos,
  title,
  name,
  createdAt,
  description,
  perks,
  deleteAccomodation,
  accomodation,
}) {
  const [index, setIndex] = useState(0);
  const [add, setAdd] = useState(false);
  const [hotelId, setHotelId] = useState("");

  return (
    <>
      {add && <Modal setAdd={setAdd} hotelId={hotelId} />}
      <div className="flex bg-gray-200 p-4 relative max-h-[250px] overflow-hidden  gap-4 rounded-2xl">
        <div className="w-[200px] h-[200px] bg-gray-300 shrink-0 group flex overflow-hidden relative">
          <div className="bg-black opacity-40 group h-full w-full group-hover:flex hidden  absolute"></div>
          <div
            onClick={() =>
              setIndex((prev) => {
                if (prev === 0) {
                  return photos.length - 1;
                }
                return prev - 1;
              })
            }
            className="absolute h-6 w-6 rounded-full group-hover:flex hidden bg-white items-center z-10 justify-center top-[50%] translate-y-[-50%] left-2"
          >
            <AiFillCaretLeft />
          </div>
          {photos?.map((photo, imageIndex) => (
            <ImageSlider image={photo} index={index} imageIndex={imageIndex} />
          ))}
          <div
            onClick={() =>
              setIndex((prev) => {
                if (prev === photos.length - 1) {
                  return 0;
                }
                return prev + 1;
              })
            }
            className="absolute group-hover:flex hidden  h-6 w-6 rounded-full bg-white  items-center z-10 justify-center top-[50%] translate-y-[-50%] right-2"
          >
            <AiFillCaretRight />
          </div>
        </div>
        <div className="grow flex flex-col">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <h1 className="text-lg font-lg">
            <span>Created By:</span>
            {name}
          </h1>
          <h1>{createdAt}</h1>
          <div>
            {description.length > 200 ? (
              <p>
                {description.substr(0, 200)}
                <br />
                <span className="cursor-pointer text-blue-600 font-bold">
                  read more...
                </span>
              </p>
            ) : (
              <p>{description}</p>
            )}
          </div>
          <div className="flex gap-4">
            {perks?.map((perk) => (
              <div className="py-1 rounded-md bg-red-500 text-white px-4">
                {perk}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-[30px] ">
          <MoreOptoins
            deleteAccomodation={deleteAccomodation}
            accomodation={accomodation}
            setAdd={setAdd}
            setHotelId={setHotelId}
          />
        </div>
      </div>
    </>
  );
}

function ImageSlider({ image, index, imageIndex }) {
  console.log(index, imageIndex);
  return (
    <img
      className={`${
        index === imageIndex ? "flex" : "hidden"
      } aspect-square object-cover`}
      src={image}
    />
  );
}

function MoreOptoins({ deleteAccomodation, accomodation, setAdd, setHotelId }) {
  const [option, setOption] = useState(false);
  const navigate = useNavigate();
  const searchResultsRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setOption(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div ref={searchResultsRef} className="">
      <BsThreeDotsVertical
        className="cursor-pointer"
        onClick={() => setOption(!option)}
      />
      {option && (
        <div className="p-4 right-[2px] top-[25px] min-w-[150px] absolute bg-white rounded-lg">
          <div
            onClick={() => deleteAccomodation(accomodation._id)}
            className="flex items-center hover:border-b-2 border-b-blue-600 cursor-pointer gap-2"
          >
            <BsFillTrashFill /> Delete
          </div>
          <div
            onClick={() =>
              navigate(`/account/accomodations/edit/${accomodation._id}`)
            }
            className="flex items-center hover:border-b-2 border-b-blue-600 cursor-pointer gap-2"
          >
            <FiEdit2 /> Edit
          </div>
          <div
            onClick={() => {
              setAdd(true);
              setHotelId(accomodation._id);
            }}
            className="flex items-center hover:border-b-2 border-b-blue-600 cursor-pointer gap-2"
          >
            <FaBed /> Check/Add Rooms
          </div>
        </div>
      )}
    </div>
  );
}

export default Accomodation;
