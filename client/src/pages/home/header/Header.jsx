

import { motion } from "framer-motion";
import React from "react";

import { Link } from "react-router-dom";
import { AuroraBackground } from "../../../components/ui/auror-background";


export default function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.8, y: 40 }}
        whileInView={{ opacity: 1, y: -30 }}
        transition={{
          delay: 0.1,
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
              View your all saved `for later` posts 
              
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
         Connect your profiles now
           </div>
           <Link to='/bookmarks/connections'>
            <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
       Go to Dashboard
        </button>
           </Link>
       
      </motion.div>
    </AuroraBackground>
  );
}
