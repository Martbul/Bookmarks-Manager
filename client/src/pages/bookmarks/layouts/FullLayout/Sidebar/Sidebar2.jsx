import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { SiTiktok } from "react-icons/si";
import { GrSpotify } from "react-icons/gr";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import { redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import NotesTwoToneIcon from "@mui/icons-material/NotesTwoTone";
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
        class="bi bi-paperclip"
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
    key: "socialmedia",
    label: "Social Media",
    icon: <LanguageIcon />,
    children: [
      {
        key: "youtube",
        label: "YouTube",
        icon: <YouTubeIcon />,
        href: "/bookmarks/youtube",
      },
      {
        key: "tiktok",
        label: "TikTok",
        icon: <SiTiktok />,
        href: "/bookmarks/tiktok",
      },
      {
        key: "instagram",
        label: "Instagram",
        icon: <InstagramIcon />,
        href: "/bookmarks/instagram",
      },
      {
        key: "x",
        label: "X",
        icon: <XIcon />,
        href: "/bookmarks/X",
      },
      {
        key: "spotify",
        label: "Spotify",
        icon: <GrSpotify />,
        href: "/bookmarks/spotify",
      },
      {
        key: "facebook",
        label: "Facebook",
        icon: <FacebookSharpIcon />,
        href: "/bookmarks/facebook",
      },
      {
        key: "reddit",
        label: "Reddit",
        icon: <RedditIcon />,
        href: "/bookmarks/reddit",
      },
    ],
  },
  {
    type: "divider",
  },

  {
    key: "notes",
    label: "Notes",
    icon: <NotesTwoToneIcon />,
    children: [
      {
        key: "notion",
        label: "Notion",
      },
      {
        key: "googlenotes",
        label: "Google Notes",
      },
      {
        key: "applenotes",
        label: "Apple Notes",
      },
      {
        key: "onenote",
        label: "One Note",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "tasks",
    label: "Tasks",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-card-checklist"
        viewBox="0 0 16 16"
      >
        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
        <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
      </svg>
    ),
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "11",
        label: "Option 11",
      },
      {
        key: "12",
        label: "Option 12",
      },
    ],
  },
  {
    type: "divider",
  },

  {
    key: "hobby",
    label: "Hobby",
    icon: <NotesTwoToneIcon />,
    children: [
      {
        key: "films",
        label: "Films",
        children: [
          {
            key: "netflix",
            label: "Netflix",
          },
          {
            key: "disney+",
            label: "Disney+",
          },

          {
            key: "amazonprimevideo+",
            label: "Amazon Prime Video",
          },
        ],
      },

      {
        key: "books",
        label: "Books",
        children: [
          {
            key: "netflix",
            label: "Netflix",
          },
          {
            key: "disney+",
            label: "Disney+",
          },

          {
            key: "amazonprimevideo+",
            label: "Amazon Prime Video",
          },
        ],
      },
    ],
  },
  {
    type: "divider",
  },

  {
    key: "work",
    label: "Work",
    icon: <NotesTwoToneIcon />,
    children: [
      {
        key: "films",
        label: "Films",
        children: [
          {
            key: "netflix",
            label: "Netflix",
          },
          {
            key: "disney+",
            label: "Disney+",
          },

          {
            key: "amazonprimevideo+",
            label: "Amazon Prime Video",
          },
        ],
      },

      {
        key: "books",
        label: "Books",
        children: [
          {
            key: "netflix",
            label: "Netflix",
          },
          {
            key: "disney+",
            label: "Disney+",
          },

          {
            key: "amazonprimevideo+",
            label: "Amazon Prime Video",
          },
        ],
      },
    ],
  },
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
        marginTop:30,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default Sidebar2;