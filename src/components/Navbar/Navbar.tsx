import InstagramIcon from "../../assets/logo.png";
import { FaInstagram } from "react-icons/fa6";
import { LuGrip } from "react-icons/lu";
import { logoutUser } from "../../redux/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { navbarLinks } from "./Links";
import { CgAddR } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosInstance from "../../axios";
import userOutsideClick from "../../hooks/useOutsideClick";
import CreatePostModal from "./components/CreatePostModal";
function Navbar() {
  const moreRef = useRef();

  const outsideClick = userOutsideClick(moreRef, () => {
    setMore(false);
  });
  const User = useAppSelector((Item) => Item.user.user);
  const dispatch = useAppDispatch();
  const [more, setMore] = useState(false);
  const [createPostModal, setCreatePostModal] = useState(false);

  const handleLogOut = async () => {
    try {
      const res = await axiosInstance.get("/auth/logout");
      dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <aside className="w-[72px] xl:w-[244px]  items-center  h-screen border  border-r-slate-300 flex flex-col">
      <Link to="/" className=" p-5 w-full  flex justify-center">
        <img
          src={InstagramIcon}
          alt="logo"
          width={120}
          className="hidden xl:block"
        />
        <div className="text-[25px] xl:hidden">
          <FaInstagram />
        </div>
      </Link>
      <ul className="flex w-full h-full flex-col gap-1  transition-all p-2">
        {navbarLinks.map((item, key) => (
          <li key={key}>
            <Link
              to={item.route}
              className="group hover:bg-[#f2f2f2] p-2 w-full justify-center xl:justify-start  rounded-xl gap-3 text-[21px]  cursor-pointer flex flex-row items-center"
            >
              <div className="group-hover:scale-110 transition-all ">
                {<item.icon />}
              </div>
              <p className="hidden xl:block ">{item.name}</p>
            </Link>
          </li>
        ))}
        <li
          onClick={() => setCreatePostModal(true)}
          className="group p-2 hover:bg-[#f2f2f2]  w-full  rounded-xl gap-3 text-[21px] justify-center xl:justify-start  cursor-pointer flex flex-row items-center"
        >
          <div className="group-hover:scale-110 transition-all">
            <CgAddR />
          </div>
          <p className="hidden xl:block">Create</p>
        </li>
        <li className="hover:bg-[#f2f2f2]">
          <Link
            className="group p-2 w-full  rounded-xl gap-3 text-[21px]  cursor-pointer flex flex-row  justify-center xl:justify-start items-center"
            to="/profile"
          >
            <div className="group-hover:scale-110 transition-all">
              <img
                src={`${import.meta.env.VITE_USER_IMG + User.photo}`}
                alt="user"
                className="w-[25px] rounded-full"
              />
            </div>
            <p className="hidden xl:block">Profile</p>
          </Link>
        </li>

        <li className="mt-auto relative" onClick={() => setMore(true)}>
          {more && (
            <ul
              //@ts-ignore
              ref={moreRef}
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              className="absolute z-40 w-[250px] bg-white    rounded-xl p-2 -top-[70px]"
            >
              <li
                onClick={handleLogOut}
                className="py-3 px-2 cursor-pointer rounded-lg hover:bg-gray-200"
              >
                Log out
              </li>
            </ul>
          )}
          <div className="group hover:bg-[#f2f2f2] p-2 w-full justify-center xl:justify-start  rounded-xl gap-3 text-[21px]  cursor-pointer flex flex-row items-center">
            <div className="group-hover:scale-110 transition-all text-[30px]">
              <LuGrip />
            </div>
            <p className="hidden xl:block ">More</p>
          </div>
        </li>
      </ul>
      {createPostModal ? (
        <CreatePostModal
          active={createPostModal}
          setActive={setCreatePostModal}
        />
      ) : null}
    </aside>
  );
}

export default Navbar;
