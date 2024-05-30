import { Navigate } from "react-router-dom";
/****Layouts*****/
import FullLayout from "../layouts/FullLayout/FullLayout.jsx";
/****End Layouts*****/


/*****Pages******/

import YouTube from "../views/youtube/YouTube.jsx";

// form elements
import ExAutoComplete from "../views/FormElements/ExAutoComplete.jsx";

import ExCheckbox from "../views/spotify/Spotify.jsx";
import ExRadio from "../views/FormElements/ExRadio.jsx";
import ExSlider from "../views/FormElements/ExSlider.jsx";
import ExSwitch from "../views/FormElements/ExSwitch.jsx";

// form layouts
import FormLayouts from "../views/FormLayouts/FormLayouts.jsx";
import Connections from "../views/connections/Connections.jsx";

import StorageForComponent from "../views/dashboards/Dashboard1.jsx";
import Reddit from "../views/reddit/Reddit.jsx";
import Spotify from "../views/spotify/Spotify.jsx";
import Onenote from "../views/onenote/Onenote.jsx";
import Github from "../views/github/Github.jsx";



/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="tiktok" /> },
      { path: "connections", exact: true, element: <Connections /> },
      { path: "tiktok", exact: true, element: <StorageForComponent /> },
      { path: "youtube", element: <YouTube /> },
      { path: "X", element: <FormLayouts /> },
      { path: "/instagram", element: <ExAutoComplete /> },
      { path: "/reddit", element: <Reddit /> },
      { path: "/spotify", element: <Spotify /> },
      { path: "/onenote", element: <Onenote /> },
      { path: "/facebook", element: <ExRadio /> },
      { path: "/google", element: <ExSlider /> },
      { path: "/github", element: <Github /> },
    ],
  },
];

export default ThemeRoutes;
