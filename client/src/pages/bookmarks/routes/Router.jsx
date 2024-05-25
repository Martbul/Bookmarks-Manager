
import { Navigate } from "react-router-dom";
/****Layouts*****/
import FullLayout from "../layouts/FullLayout/FullLayout.jsx";
/****End Layouts*****/


/*****Pages******/
import Dashboard1 from "../views/dashboards/Dashboard1.jsx";

/*****Tables******/
import BasicTable from "../views/youtube/YouTube.jsx";

// form elements
import ExAutoComplete from "../views/FormElements/ExAutoComplete.jsx";
import ExButton from "../views/FormElements/ExButton.jsx";
import ExCheckbox from "../views/FormElements/ExCheckbox.jsx";
import ExRadio from "../views/FormElements/ExRadio.jsx";
import ExSlider from "../views/FormElements/ExSlider.jsx";
import ExSwitch from "../views/FormElements/ExSwitch.jsx";

// form layouts
import FormLayouts from "../views/FormLayouts/FormLayouts.jsx";
import Connections from "../../connections/Connections.jsx";
import YouTube from "../views/youtube/YouTube.jsx";
import StorageForComponent from "../views/dashboards/Dashboard1.jsx";


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element:<FullLayout/>,
    children: [
      { path: "/", element: <Navigate to="tiktok" /> },
      { path: "connections", exact: true, element: <Connections/> },
      { path: "tiktok", exact: true, element: <StorageForComponent /> },
      { path: "youtube", element: <YouTube /> },
      { path: "X", element: <FormLayouts /> },
      { path: "/instagram", element: <ExAutoComplete /> },
      { path: "/reddit", element: <ExButton /> },
      { path: "/spotify", element: <ExCheckbox /> },
      { path: "/facebook", element: <ExRadio /> },
      { path: "/google", element: <ExSlider /> },
      { path: "/github", element: <ExSwitch /> },
    ],
  },
];

export default ThemeRoutes;
