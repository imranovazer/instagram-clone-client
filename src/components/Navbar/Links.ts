import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineExplore } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { IconType } from "react-icons";
interface navbarLinkType {
  icon: IconType;
  name: string;
  route: string;
}

export const navbarLinks: navbarLinkType[] = [
  {
    icon: GrHomeRounded,
    name: "Home",
    route: "/",
  },
  {
    icon: MdOutlineExplore,
    name: "Explore",
    route: "/explore",
  },
  {
    icon: FiHeart,
    name: "Notifications",
    route: "/notifications",
  },
  {
    icon: FiMessageCircle,
    name: "Messages",
    route: "/messages",
  },
];
