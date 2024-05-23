
import { Navigate } from "react-router-dom";
/****Layouts*****/
import FullLayout from "../layouts/FullLayout/FullLayout.jsx";
/****End Layouts*****/


/*****Pages******/
import Dashboard1 from "../views/dashboards/Dashboard1.jsx";

/*****Tables******/
import BasicTable from "../views/tables/BasicTable.jsx";

// form elements
import ExAutoComplete from "../views/FormElements/ExAutoComplete.jsx";
import ExButton from "../views/FormElements/ExButton.jsx";
import ExCheckbox from "../views/FormElements/ExCheckbox.jsx";
import ExRadio from "../views/FormElements/ExRadio.jsx";
import ExSlider from "../views/FormElements/ExSlider.jsx";
import ExSwitch from "../views/FormElements/ExSwitch.jsx";

// form layouts
import FormLayouts from "../views/FormLayouts/FormLayouts.jsx";


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element:<FullLayout/>,
    children: [
      { path: "/", element: <Navigate to="dashboards/dashboard1" /> },
      { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      { path: "tables/basic-table", element: <BasicTable /> },
      { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      { path: "/auto", element: <ExAutoComplete /> },
      { path: "/form-elements/button", element: <ExButton /> },
      { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      { path: "/form-elements/radio", element: <ExRadio /> },
      { path: "/form-elements/slider", element: <ExSlider /> },
      { path: "/form-elements/switch", element: <ExSwitch /> },
    ],
  },
];

export default ThemeRoutes;
