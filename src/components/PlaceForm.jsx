import { useState, useEffect } from "react";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FiUploadCloud } from "react-icons/fi";
import { MdPets } from "react-icons/md";
import { ImEnter } from "react-icons/im";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineWifi, AiFillCar } from "react-icons/ai";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";

const PlaceForm = ({ setSelection }) => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    title: "",
    address: "",
    photos: [],
    imgUrl: "",
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: 0,
    checkOut: 0,
    maxGuests: 0,
  });
  const [perks, setPerks] = useState([
    {
      name: "Wifi",
      icon: AiOutlineWifi,
      selected: false,
    },
    {
      name: "Free Parking Spot",
      icon: AiFillCar,
      selected: false,
    },
    {
      name: "TV",
      icon: PiTelevisionSimpleFill,
      selected: false,
    },
    {
      name: "Radio",
      icon: MdPets,
      selected: false,
    },
    {
      name: "Pets",
      icon: MdPets,
      selected: false,
    },
    {
      name: "Private Enterance",
      icon: ImEnter,
      selected: false,
    },
  ]);
  useEffect(() => {
    setDetails((prev) => ({
      ...prev,
      perks: [...perks.filter((perk) => perk.selected).map((p) => p.name)],
    }));
  }, [perks]);

  function addPhotos() {
    setDetails((prev) => ({
      ...prev,
      photos: [...prev.photos, details.imgUrl],
    }));
    setDetails((prev) => ({ ...prev, imgUrl: "" }));
  }

  async function submitPlace() {
    let { imageUrl, ...others } = details;
    if (id === undefined) {
      let response = await axios.post(
        "http://localhost:5000/place/addplace",
        others,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } else {
      let response = await axios.put(
        `http://localhost:5000/place/editone/${id}`,
        others,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }
    if (response.status === 201) {
      navigate("/account/accomodations");
    }
    // console.log(response);
  }
  console.log(id);

  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`http://localhost:5000/place/getOnePlace/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              let { data } = res;
              setDetails((prev) => ({
                ...prev,
                title: data.title,
                address: data.address,
                photos: data.photos,
                description: data.description,
                perks: data.perks,
                extraInfo: data.extraInfo,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                maxGuests: data.maxGuests,
              }));
            }
          });
        // console.log(response)
      } catch (error) {}
    }
  }, [id]);

  return (
    <div>
      <div className="flex  max-w-3xl mx-auto flex-col gap-5 mt-6">
        <div className="flex flex-col">
          <span className="text-xl">Title</span>
          <input
            className="rounded-2xl outline-none border border-gray-300 p-2"
            type="text"
            placeholder="enter property title"
            value={details.title}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col ">
          <span className="text-xl">Address</span>
          <input
            className="rounded-2xl outline-none border border-gray-300 p-2"
            type="text"
            placeholder="enter property address"
            value={details.address}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-xl">Photos</span>
          <div className="flex gap-2">
            <input
              className="rounded-2xl outline-none border border-gray-300 grow p-2"
              type="text"
              placeholder="add using link..."
              value={details.imgUrl}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, imgUrl: e.target.value }))
              }
            />
            <button
              onClick={addPhotos}
              className="flex items-center gap-2 rounded-md bg-gray-200 p-2"
            >
              Add Photo
            </button>
          </div>
          <div className="grid lg:grid-cols-6 gap-3 md:grid-cols-4 grid-cols-3">
            {details?.photos?.map((photo, index) => (
              <div className="relative">
                <img
                  className="rounded-xl w-full h-40 object-cover "
                  alt=""
                  style={{
                    background: `linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)), url(${photo}), center`,
                    backgroundSize: "cover",
                  }}
                />
                <BsFillTrashFill
                  onClick={() =>
                    setDetails((prev) => ({
                      ...prev,
                      photos: prev.photos.filter((_, i) => index !== i),
                    }))
                  }
                  className="text-red-400 cursor-pointer absolute top-3 right-3"
                />
              </div>
            ))}
          </div>
          {/* <div className="border flex items-center gap-1 bg-transparent rounded-2xl p-4 text-xl text-gray-600">
        <input type="file" className="hidden" onChange={uploadPhotos} />
        <FiUploadCloud className="h-6 w-6" />
        Upload
      </div> */}
          <div className="flex flex-col ">
            <span className="text-xl">Description of the place</span>
            <textarea
              className="w-full border my-1 py-2 px-3 rounded-2xl"
              type="text"
              placeholder="enter property address"
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col ">
            <span className="text-xl">Perks</span>
            <div className="grid grid-cols-4 gap-2">
              {perks?.map((perk) => (
                <div
                  onClick={() =>
                    setPerks((prev) =>
                      prev.map((p) =>
                        p.name === perk.name
                          ? { ...p, selected: !p.selected }
                          : p
                      )
                    )
                  }
                  className={`flex cursor-pointer justify-center items-center gap-2 p-2 py-4 border border-gray-400 rounded-xl ${
                    perk.selected && "bg-red-500 text-white"
                  }`}
                >
                  <perk.icon />
                  {perk.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl">Extra Info</span>
            <textarea
              className="w-full border my-1 py-2 px-3 rounded-2xl"
              type="text"
              placeholder="enter extra info"
              value={details.extraInfo}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, extraInfo: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              {/* <div className="">
                <span>Check in time</span>
                <input
                  className="rounded-2xl outline-none border border-gray-300 p-2"
                  value={details.checkIn}
                  onChange={(e) =>
                    setDetails((prev) => ({ ...prev, checkIn: e.target.value }))
                  }
                />
              </div>
              <div className="">
                <span>Check out time</span>
                <input
                  className="rounded-2xl outline-none border border-gray-300 p-2"
                  value={details.checkOut}
                  onChange={(e) =>
                    setDetails((prev) => ({
                      ...prev,
                      checkOut: e.target.value,
                    }))
                  }
                />
              </div> */}
              {/* <div className="">
                <span>Number of guests</span>
                <input
                  className="rounded-2xl outline-none border border-gray-300 p-2"
                  value={details.maxGuests}
                  onChange={(e) =>
                    setDetails((prev) => ({
                      ...prev,
                      maxGuests: e.target.value,
                    }))
                  }
                />
              </div> */}
            </div>
          </div>
        </div>
        <button
          onClick={submitPlace}
          className=" rounded-3xl bg-red-500 text-white p-2"
        >
          {id === undefined ? "Add Details" : "Edit Details"}
        </button>
      </div>
    </div>
  );
};

export default PlaceForm;
