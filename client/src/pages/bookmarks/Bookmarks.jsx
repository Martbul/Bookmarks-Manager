import "./Bookmarks.css"

const Bookmarks = () => {
    return (
      <>
        {/* sidebar */}
        <nav className="sidebar">
          <div className="menu_content">
            <ul className="menu_items">
              <div className="menu_title menu_dahsboard" />
              {/* duplicate or remove this li tag if you want to add or remove navlink with submenu */}
              {/* start */}
              <li className="item">
                <div href="#" className="nav_link submenu_item">
                  <span className="navlink_icon">
                    <i className="bx bx-home-alt" />
                  </span>
                  <span className="navlink">Home</span>
                  <i className="bx bx-chevron-right arrow-left" />
                </div>
                <ul className="menu_items submenu">
                  <a href="#" className="nav_link sublink">
                    Nav Sub Link
                  </a>
                  <a href="#" className="nav_link sublink">
                    Nav Sub Link
                  </a>
                  <a href="#" className="nav_link sublink">
                    Nav Sub Link
                  </a>
                  <a href="#" className="nav_link sublink">
                    Nav Sub Link
                  </a>
                </ul>
              </li>
              {/* end */}
              {/* duplicate this li tag if you want to add or remove  navlink with submenu */}
              {/* start */}
              <li className="item">
                <div href="#" className="nav_link submenu_item">
                  <span className="navlink_icon">
                    <i className="bx bx-grid-alt" />
                  </span>
                  <span className="navlink">Overview</span>
                  <i className="bx bx-chevron-right arrow-left" />
                </div>
                <ul className="menu_items submenu">
                  <a href="#" className="nav_link sublink">
                    Nav Sub Link
                  </a>
                  <a href="#" className="nav_link sublink">
                    Nav Sub Link
                  </a>
                  <a href="#" className="nav_link sublink">
                    Nav Sub Link
                  </a>
                  <a href="#" className="nav_link sublink">
                    Nav Sub Link
                  </a>
                </ul>
              </li>
              {/* end */}
            </ul>
            <ul className="menu_items">
              <div className="menu_title menu_editor" />
              {/* duplicate these li tag if you want to add or remove navlink only */}
              {/* Start */}
              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bxs-magic-wand" />
                  </span>
                  <span className="navlink">Tik Tok</span>
                </a>
              </li>
              {/* End */}
              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-loader-circle" />
                  </span>
                  <span className="navlink">You Tube</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-social-media" />
                  </span>
                  <span className="navlink">Facebook</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-filter" />
                  </span>
                  <span className="navlink">Google</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-cloud-upload" />
                  </span>
                  <span className="navlink">Instagram</span>
                </a>
              </li>

              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-cloud-upload" />
                  </span>
                  <span className="navlink">Spotify</span>
                </a>
              </li>

              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-cloud-upload" />
                  </span>
                  <span className="navlink">GitHub</span>
                </a>
              </li>
            </ul>
            <ul className="menu_items">
              <div className="menu_title menu_setting" />
              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-flag" />
                  </span>
                  <span className="navlink">Spotify</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-medal" />
                  </span>
                  <span className="navlink">Award</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-cog" />
                  </span>
                  <span className="navlink">Setting</span>
                </a>
              </li>
              <li className="item">
                <a href="#" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bx-layer" />
                  </span>
                  <span className="navlink">Features</span>
                </a>
              </li>
            </ul>
            {/* Sidebar Open / Close */}
            <div className="bottom_content">
              <div className="bottom expand_sidebar">
                <span> Expand</span>
                <i className="bx bx-log-in" />
              </div>
              <div className="bottom collapse_sidebar">
                <span> Collapse</span>
                <i className="bx bx-log-out" />
              </div>
            </div>
          </div>
        </nav>
      </>
    );
}
 
export default Bookmarks;