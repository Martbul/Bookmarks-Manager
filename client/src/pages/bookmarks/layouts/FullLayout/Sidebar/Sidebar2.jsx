import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

import GoogleIcon from "@mui/icons-material/Google";
import { SiTiktok } from "react-icons/si";
import { GrSpotify } from "react-icons/gr";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import NotesTwoToneIcon from "@mui/icons-material/NotesTwoTone";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import WorkIcon from "@mui/icons-material/Work";
import GitHubIcon from "@mui/icons-material/GitHub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

import onenote from "../../../../../assets/img/microsoft-onenote.svg";
import GitHub from "@mui/icons-material/GitHub";
const items = [
  {
    key: "connections",
    label: "Connections",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-paperclip"
        viewBox="0 0 16 16"
      >
        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
      </svg>
    ),
    href: "/bookmarks/connections",
  },
  {
    type: "divider",
  },
  {
    type: "divider",
  },
  {
    type: "divider",
  },

  {
    key: "youtube",
    label: "YouTube",
    icon: <YouTubeIcon />,
    href: "/bookmarks/youtube",
  },
  {
    type: "divider",
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: <SiTiktok />,
    href: "/bookmarks/tiktok",
  },
  {
    type: "divider",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: <InstagramIcon />,
    href: "/bookmarks/instagram",
  },
  {
    type: "divider",
  },
  {
    key: "x",
    label: "X",
    icon: <XIcon />,
    href: "/bookmarks/X",
  },
  {
    type: "divider",
  },
  {
    key: "spotify",
    label: "Spotify",
    icon: <GrSpotify />,
    href: "/bookmarks/spotify",
  },
  {
    type: "divider",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: <FacebookSharpIcon />,
    href: "/bookmarks/facebook",
  },
  {
    type: "divider",
  },
  {
    key: "reddit",
    label: "Reddit",
    icon: <RedditIcon />,
    href: "/bookmarks/reddit",
  },
  {
    type: "divider",
  },
  {
    key: "onenote",
    label: "One Note",
    icon: <NotesTwoToneIcon />,
    href: "/bookmarks/onenote",
  },
  {
    type: "divider",
  },
  {
    key: "github",
    label: "GitHub",
    icon: <GitHubIcon />,
    href: "/bookmarks/github",
  },
  {
    type: "divider",
  },
  // {
  //   key: "socialmedia",
  //   label: "Social Media",
  //   icon: <LanguageIcon />,
  //   children: [
  //     {
  //       key: "youtube",
  //       label: "YouTube",
  //       icon: <YouTubeIcon />,
  //       href: "/bookmarks/youtube",
  //     },
  //     {
  //       key: "tiktok",
  //       label: "TikTok",
  //       icon: <SiTiktok />,
  //       href: "/bookmarks/tiktok",
  //     },
  //     {
  //       key: "instagram",
  //       label: "Instagram",
  //       icon: <InstagramIcon />,
  //       href: "/bookmarks/instagram",
  //     },
  //     {
  //       key: "x",
  //       label: "X",
  //       icon: <XIcon />,
  //       href: "/bookmarks/X",
  //     },
  //     {
  //       key: "spotify",
  //       label: "Spotify",
  //       icon: <GrSpotify />,
  //       href: "/bookmarks/spotify",
  //     },
  //     {
  //       key: "facebook",
  //       label: "Facebook",
  //       icon: <FacebookSharpIcon />,
  //       href: "/bookmarks/facebook",
  //     },
  //     {
  //       key: "reddit",
  //       label: "Reddit",
  //       icon: <RedditIcon />,
  //       href: "/bookmarks/reddit",
  //     },
  //   ],
  // },
  // {
  //   type: "divider",
  // },

  // {
  //   key: "notes",
  //   label: "Notes",
  //   icon: <NotesTwoToneIcon />,
  //   children: [
  //     {
  //       key: "notion",
  //       label: "Notion",
  //     },
  //     {
  //       key: "googlenotes",
  //       label: "Google Notes",
  //     },
  //     {
  //       key: "applenotes",
  //       label: "Apple Notes",
  //     },
  //     {
  //       key: "onenote",
  //       label: "One Note",
  //       icon: <NotesTwoToneIcon />,
  //       href: "/bookmarks/onenote",
  //     },
  //   ],
  // },
  // {
  //   type: "divider",
  // },
  // {
  //   key: "tasks",
  //   label: "Tasks",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="16"
  //       height="16"
  //       fill="currentColor"
  //       className="bi bi-card-checklist"
  //       viewBox="0 0 16 16"
  //     >
  //       <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
  //       <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
  //     </svg>
  //   ),
  //   children: [
  //     {
  //       key: "9",
  //       label: "Option 9",
  //     },
  //     {
  //       key: "10",
  //       label: "Option 10",
  //     },
  //     {
  //       key: "11",
  //       label: "Option 11",
  //     },
  //     {
  //       key: "12",
  //       label: "Option 12",
  //     },
  //   ],
  // },
  // {
  //   type: "divider",
  // },
  // {
  //   key: "onlinestores",
  //   label: "Online Stores",
  //   icon: <LocalMallIcon />,
  //   children: [
  //     {
  //       key: "amazon",
  //       label: "Amazon",
  //       icon: (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="16"
  //           height="16"
  //           fill="currentColor"
  //           className="bi bi-amazon"
  //           viewBox="0 0 16 16"
  //         >
  //           <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
  //           <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
  //         </svg>
  //       ),
  //     },

  //     {
  //       key: "ebay",
  //       label: "eBay",
  //       icon:
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           x="0px"
  //           y="0px"
  //           width="100"
  //           height="100"
  //           viewBox="0,0,256,256"
  //         >
  //           <g transform="translate(.32,88.32) scale(0.31,0.31)">

  //               <g transform="scale(10.66667,10.66667)">
  //                 <path d="M6.02734,6.5625v4.87109c-0.14453,-0.96094 -0.72656,-2.37109 -2.92578,-2.37109c-3,0 -3.11719,2.39844 -3.10156,3.02344c0,0 -0.14844,2.8125 3.02734,2.8125c2.34766,0 2.77344,-1.30469 2.84766,-1.66797h-1.27344c-0.09766,0.23828 -0.46484,0.87891 -1.57422,0.85938c-1.51562,-0.03125 -1.76172,-1.34375 -1.80078,-1.69531h4.80078v2.5h1.17188v-0.75391c0,0 0.60156,0.75391 2.20312,0.75391c1.35938,0 2.46875,-0.75 2.79688,-2.13281c0.05859,-0.24609 0.09766,-0.49219 0.10156,-0.78125c0.03516,-1.90234 -1.36719,-2.91016 -2.875,-2.91797c-1.50781,-0.00781 -2.22656,1.06641 -2.22656,1.06641v-3.56641zM12.19922,12.76172c-0.24609,1.63672 1.18359,2.14063 2.30078,2.13281c1.12109,-0.00781 1.82813,-0.34766 2.30078,-0.96484v0.96484h1.22656v-3.62109c-0.03516,-0.61719 -0.12109,-2.10156 -2.72656,-2.21094c0,0 -2.49219,-0.23828 -2.75,1.66406h1.27344c0,0 0.10547,-0.85547 1.40234,-0.83203c1.22656,0.02734 1.58203,0.91016 1.57422,1.66797c0,0 -1.19922,-0.00391 -1.55078,0c-0.63281,0.00391 -2.72266,-0.07812 -3.05078,1.19922zM17.22656,9.0625l2.77344,5.39063l-1.07422,2.10938h1.34766l3.72656,-7.5h-1.27344l-2.05078,4.16797l-2.05078,-4.16797zM3.07422,9.89453c1.72266,0 1.72656,1.66797 1.72656,1.66797h-3.57422c0,0 0.125,-1.66406 1.84766,-1.66797zM9.15234,9.89453c1.94141,-0.05078 1.875,2.08594 1.875,2.08594c0,0 0.03125,2.05469 -1.875,2.08203c-1.90625,0.02344 -1.875,-2.10937 -1.875,-2.10937c0,0 -0.06641,-2.00391 1.875,-2.05859zM15,12.39453c0.17578,-0.00781 0.30078,0 0.30078,0h1.375c0,0.00391 0.22266,1.75 -1.94922,1.71875c0,0 -1.23047,0.00391 -1.30078,-0.98828c0,-0.55469 1.05078,-0.69922 1.57422,-0.73047z"></path>
  //               </g>

  //           </g>
  //         </svg>
  //       ,

  //       href: "/bookmarks/ebay",
  //     },
  //     {
  //       key: "aliexpress",
  //       label: "Aliexpress",
  //     },
  //   ],
  // },
  // {
  //   type: "divider",
  // },
  // {
  //   key: "realestate",
  //   label: "Real Estate",
  //   icon: <HomeWorkIcon />,
  //   children: [
  //     {
  //       key: "zillow",
  //       label: "Zillow",
  //     },
  //     {
  //       key: "realtor.com",
  //       label: "Realtor.com",
  //     },
  //     {
  //       key: "Redfin",
  //       label: "redfin",
  //     },
  //   ],
  // },
  // {
  //   type: "divider",
  // },

  // {
  //   key: "cars",
  //   label: "Cars",
  //   icon: <DirectionsCarIcon />,
  //   children: [
  //     {
  //       key: "autoTrader",
  //       label: "AutoTrader",
  //     },
  //     {
  //       key: "cars.com",
  //       label: "Cars.com",
  //     },
  //     {
  //       key: "cargurus",
  //       label: "CarGurus",
  //     },
  //   ],
  // },
  // {
  //   type: "divider",
  // },

  // {
  //   key: "hobby",
  //   label: "Hobby",
  //   icon: <SportsBasketballIcon />,
  //   children: [
  //     {
  //       key: "films",
  //       label: "Films",
  //       children: [
  //         {
  //           key: "netflix",
  //           label: "Netflix",
  //         },
  //         {
  //           key: "disney+",
  //           label: "Disney+",
  //         },

  //         {
  //           key: "amazonprimevideo+",
  //           label: "Amazon Prime Video",
  //         },
  //       ],
  //     },

  //     {
  //       key: "books",
  //       label: "Books",
  //       children: [
  //         {
  //           key: "netflix1",
  //           label: "Netflix",
  //         },
  //         {
  //           key: "disney1+",
  //           label: "Disney+",
  //         },

  //         {
  //           key: "amazonprimevideo1+",
  //           label: "Amazon Prime Video",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   type: "divider",
  // },

  // {
  //   key: "work",
  //   label: "Work",
  //   icon: <WorkIcon />,
  //   children: [
  //     {
  //       key: "films2",
  //       label: "Films2",
  //       children: [
  //         {
  //           key: "netflix2",
  //           label: "Netflix2",
  //         },
  //         {
  //           key: "disney2+",
  //           label: "Disney+",
  //         },

  //         {
  //           key: "amazonprimevideo2+",
  //           label: "Amazon Prime Video",
  //         },
  //       ],
  //     },

  //     {
  //       key: "book1s",
  //       label: "Book1s",
  //       children: [
  //         {
  //           key: "netflix3",
  //           label: "Netflix",
  //         },
  //         {
  //           key: "disney+4",
  //           label: "Disney+",
  //         },

  //         {
  //           key: "amazonprimevideo+4",
  //           label: "Amazon Prime Video",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
const Sidebar2 = () => {
  const navigate = useNavigate(); // Get the navigate function

  const onClick = (e) => {
    console.log("click ", e);
    switch (e.key) {
      case "youtube":
        navigate("/bookmarks/youtube");
        break;
      case "tiktok":
        navigate("/bookmarks/tiktok");
        break;
      case "instagram":
        navigate("/bookmarks/instagram");
        break;
      case "X":
        navigate("/bookmarks/X");
        break;
      case "reddit":
        navigate("/bookmarks/reddit");
        break;
      case "spotify":
        navigate("/bookmarks/spotify");
        break;
      case "facebook":
        navigate("/bookmarks/facebook");
        break;
      case "connections":
        navigate("/bookmarks/connections");
        break;
      case "onenote":
        navigate("/bookmarks/onenote");
        break;
      case "ebay":
        navigate("/bookmarks/ebay");
        break;
      case "github":
        navigate("/bookmarks/github");
        break;
      default:
        // Handle any other cases or do nothing
        break;
    }
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 240,
        marginTop: 30,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
export default Sidebar2;
