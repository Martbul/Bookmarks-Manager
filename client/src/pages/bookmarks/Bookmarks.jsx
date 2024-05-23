import { Link } from "react-router-dom";

import "./css/Bookmarks.css"


const Bookmarks = () => {
  return (
    <>
      <>
        <div className="menu">
          <ion-icon name="menu-outline" />
          <ion-icon name="close-outline" />
        </div>
        <div className="barra-lateral">
          <div>
            <div className="nombre-pagina">
              <ion-icon id="cloud" name="cloud-outline" />
              <span>Apex</span>
            </div>
            <button className="boton">
              <ion-icon name="add-outline" />
              <span>Create new</span>
            </button>
          </div>
          <nav className="navegacion">
            <ul>
              <li>
                <Link to='sdsd'>
                  <a id="inbox" href="#">
                  <ion-icon name="mail-unread-outline" />
                  <span>Inbox</span>
                </a>
                </Link>
                
              </li>
              <li>
                <a href="#">
                  <ion-icon name="star-outline" />
                  <span>Starred</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="paper-plane-outline" />
                  <span>Sent</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="document-text-outline" />
                  <span>Drafts</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="bookmark-outline" />
                  <span>Important</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="alert-circle-outline" />
                  <span>Spam</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="trash-outline" />
                  <span>Trash</span>
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <div className="linea" />
            <div className="modo-oscuro">
              <div className="info">
                <ion-icon name="moon-outline" />
                <span>Drak Mode</span>
              </div>
              <div className="switch">
                <div className="base">
                  <div className="circulo"></div>
                </div>
              </div>
            </div>
            <div className="usuario">
              <img src="/Jhampier.jpg" alt="" />
              <div className="info-usuario">
                <div className="nombre-email">
                  <span className="nombre">Jhampier</span>
                  <span className="email">jhampier@gmail.com</span>
                </div>
                <ion-icon name="ellipsis-vertical-outline" />
              </div>
            </div>
          </div>
        </div>
        <main>
          <h1>Contenido</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            iure nam aliquid debitis voluptatum reiciendis reprehenderit minus,
            et sed hic suscipit facilis enim totam. Nesciunt eveniet velit modi
            voluptates temporibus?
          </p>
        </main>
       
      </>
    </>
  );
}
 
export default Bookmarks


