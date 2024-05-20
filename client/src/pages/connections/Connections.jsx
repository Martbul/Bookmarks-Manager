import "./Connections.css";
import { useContext, useState } from "react";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";
const Connections = () => {
  const [googleProfile, setGoogleProfile] = useState(null);
  const { authToYouTube, userYoutubeDetails} = useContext(ConnectionsContext);

  return (
    <>
      <div className="social-media-auth">
        {googleProfile && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              style={{ backgroundColor: "blue" }}
            >
              {googleProfile.name}
            </button>
          </>
        )}
        

        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          TikTok
        </button>

{userYoutubeDetails && (<>
  <button
          className="shadow-[inset_0_0_0_2px_#616467] text-white px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
          
        >
          YouTube
        </button>
</>)}
        <button
          className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
          onClick={()=> authToYouTube()}
        >
          YouTube
        </button>
      </div>
    </>
  );
};

export default Connections;
