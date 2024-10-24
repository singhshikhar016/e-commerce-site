import React, { useEffect, useState } from "react";
import "../css/EditProfile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function EditProfile({ setCurrUser, setShowUserDetails }) {
  let { userid } = useParams();
  const [editedData, setEditedData] = useState({
    username: "",
    email: "",
    profilephoto: {},
    locations: [],
    gender: "",
  });

  const [newLocations, setNewLocations] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      toast.loading(<b>Loading...</b>);
      axios
        .get(`https://trendify-ecommerce-backend.onrender.com/user/${userid}/fetchProfileData`)
        .then((res) => {
          toast.dismiss();
          if (res?.data?.msg === "Fetched User Data Successfully") {
            setEditedData({
              username: res?.data?.userData?.username,
              email: res?.data?.userData?.email,
              profilephoto: res?.data?.userData?.profilephoto,
              locations: res?.data?.userData?.locations,
              gender: res?.data?.userData?.gender,
            });
            setNewLocations(res?.data?.userData?.locations);
          }
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Something Went Wrong!!");
        });
    }
    fetchUserData();
    setShowUserDetails(false);
  }, [userid, setShowUserDetails]);

  let options = document.getElementsByClassName("gender-options");
  function selectedOption() {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === editedData.gender) {
        options[i].selected = "selected";
      }
    }
  }

  selectedOption();

  function editProfileChangeHandler(e) {
    console.log(e.target.value);
    setEditedData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  }

  function previewProfilePhoto(e) {
    const profilephoto = document.querySelector(".edit-profilePhoto");
    const editPhoto = document.getElementById("editPhoto");

    const file = editPhoto.files;
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        profilephoto.setAttribute("src", event.target.result);
      };
      fileReader.readAsDataURL(file[0]);
    }

    setEditedData((pre) => {
      return { ...pre, profilephoto: e.target.files[0] };
    });
  }

  function addLocationHandler() {
    let block = document.createElement("div");
    block.setAttribute("class", "new-loc-block");

    let inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.setAttribute("name", "locations");
    inp.setAttribute("placeholder", "Add new location");

    let btn = document.createElement("button");
    btn.innerHTML = "ADD";

    block.appendChild(inp);
    block.appendChild(btn);

    document.getElementById("loc-item").appendChild(block);

    btn.addEventListener("click", (e) => {
      addLocationBtnClickHandler(e, btn, inp);
    });
  }

  function addLocationBtnClickHandler(e, btn, inp) {
    e.preventDefault();

    btn.style.display = "none";
    inp.style.color = "#b1b1b1";
    inp.readOnly = true;

    let loc = inp.value;
    setNewLocations((pre) => [...pre, loc]);
  
    document.querySelector(".submit-edit-btn").style.backgroundColor = "red";

    toast.success(<b>Click on Make Changes to apply changes</b>, {
      duration: 5000,
      style: {
        textAlign: "center",
      },
    });
  }

  function saveEditedData(e) {
    e.preventDefault();
    toast.loading(<b>Loading...</b>);

    editedData.locations = newLocations;

    let username = editedData.username;
    let email = editedData.email;
    let locations = editedData.locations;
    let gender = editedData.gender;
    let profilephoto = editedData.profilephoto;
    axios
      .post(
        `http://localhost:8000/user/${userid}/editprofile`,
        { username, email, locations, gender, profilephoto },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res?.data?.msg === "User Edited Successfully") {
          toast.dismiss();
          setCurrUser(res?.data?.user);
          localStorage.setItem("currUser", JSON.stringify(res?.data?.user));
          toast.success(<b>User Updated Successfully!!</b>, {
            duration: 5000,
          });
        }
      })
      .catch((err) => {
        console.log(err?.response?.data);
        toast.dismiss();
        toast.error("Something Went Wrong!!");
      });
  }

  function locationRemoveHandler(e, location) {
    let newLoc = newLocations.filter((loc) => loc !== location);
    setNewLocations(newLoc);

    e.target.style.display = "none";
    document.querySelector(".submit-edit-btn").style.backgroundColor = "red";

    toast.success(<b>Click on Make Changes to apply changes</b>, {
      duration: 5000,
      style: {
        textAlign: "center",
      },
    });
    console.log(newLoc);
  }

  return (
    <div className="edit-profile">
      <form
        className="edit-profile-form flex"
        method="post"
        onSubmit={saveEditedData}
        encType="multipart/form-data"
      >
        <div className="flex edit-profilePhoto-container">
          <img
            className="edit-profilePhoto"
            src={editedData?.profilephoto?.url}
            alt="profile..."
          />
          <input
            type="file"
            className="edit-profilePhoto-btn"
            style={{
              opacity: "-1",
              zIndex: "2",
              width: "23px",
              cursor: "pointer",
            }}
            name="profilephoto"
            id="editPhoto"
            onChange={previewProfilePhoto}
          />
          <FiEdit className="edit-profilePhoto-btn" />
        </div>
        <input
          className="editProfile-username"
          type="text"
          onChange={editProfileChangeHandler}
          name="username"
          defaultValue={editedData?.username}
          required
        />
        <div className="flex gap-m edit-profile-other-inp">
          <div className="flex edit-profile-item">
            <label htmlFor="edit-email">Email</label>
            <input
              type="email"
              onChange={editProfileChangeHandler}
              name="email"
              id="edit-email"
              defaultValue={editedData?.email}
              required
            />
          </div>
          <div className="flex edit-profile-item">
            <label htmlFor="edit-gender">Gender</label>
            <select
              name="gender"
              id="edit-gender"
              onChange={editProfileChangeHandler}
            >
              <option className="gender-options" value="Male">
                Male
              </option>
              <option className="gender-options" value="Female">
                Female
              </option>
              <option className="gender-options" value="Others">
                Others
              </option>
              <option className="gender-options" value="">
                Not Selected
              </option>
            </select>
          </div>
          <div className="flex edit-profile-item" id="loc-item">
            <div className="flex gap-m">
              <label htmlFor="locations">Locations</label>
              <abbr
                className="flex "
                title="Add new location"
                onClick={addLocationHandler}
              >
                <FaPlus fontSize="1.2em" cursor="pointer" />
              </abbr>
            </div>

            {editedData?.locations?.map((location, index) => (
              <div
                className="flex gap-m already-loc"
                style={{ width: "100%" }}
                key={index}
              >
                <input type="text" name="locations" value={location} readOnly />
                <MdDelete
                  className="already-loc-delete-btn"
                  onClick={(e) => locationRemoveHandler(e, location)}
                />
              </div>
            ))}
            <div className="new-loc-block">
              <input
                type="text"
                name="locations"
                id="first-loc"
                placeholder="Add new location"
              />
              <button
                onClick={(e) =>
                  addLocationBtnClickHandler(
                    e,
                    e.target,
                    document.getElementById("first-loc")
                  )
                }
              >
                ADD
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="submit-edit-btn">
          Make Changes
        </button>
      </form>
    </div>
  );
}
