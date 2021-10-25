import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import HomePageStyles from "./HomePage.module.css";

import factBgGraphic from "../../assets/home/graphic.svg";
import factBgLinesGraphic from "../../assets/home/lines.svg";
import arrowGraphic from "../../assets/home/arrow.svg";

import Navbar from "../navbar";
import { signOut } from "next-auth/react";

function HomePage({ Session }) {
  const [fact,setFact] = useState();


  useEffect(() => {
    userAction();
  }, []);
  const userAction = async () => {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const myJson = await response.json(); //extract JSON from the http response
    setFact(myJson.text);
  };
  return (
    <div className={HomePageStyles.home_page_priamry_wrapper}>
      <Navbar userDetails={Session.user} />
      <div className={HomePageStyles.home_page_secondary_wrapper}>
        <div className={HomePageStyles.home_page_fact_wrapper}>
          <div className={HomePageStyles.home_page_fact_gaphic}>
            <Image src={factBgGraphic} layout="responsive" />
          </div>
          <div className={HomePageStyles.home_page_fact_gaphic_lines}>
            <Image src={factBgLinesGraphic} layout="responsive" />
          </div>
      {fact &&    <div className={HomePageStyles.home_page_fact_text}>{fact}</div>}
        </div>
        <div className={HomePageStyles.home_page_content}>
          <div className={HomePageStyles.home_page_content_sec}>
            <div className={HomePageStyles.home_page_content_text}>
              {"Create your learning roadmap easily."}
            </div>
            <div className={HomePageStyles.home_page_content_text}>
              {"Share with your learning with your friend with just one click."}
            </div>
            <div className={HomePageStyles.home_page_content_text}>
              {"Explore new roadmaps."}
            </div>
            <Link href="/paths">
              <div className={HomePageStyles.home_page_content_redirect_button}>
                Get started with paths
                <div
                  className={
                    HomePageStyles.home_page_content_redirect_button_arrow
                  }
                >
                  <Image src={arrowGraphic} layout="responsive" />
                </div>
              </div>
            </Link>
          </div>
          <div className={HomePageStyles.home_page_content_sec}>
            <div className={HomePageStyles.home_page_content_text}>
              {"Get your queries resolved quickly by the community."}
            </div>
            <div className={HomePageStyles.home_page_content_text}>
              {"Contribute to the comunity by helping others out."}
            </div>
            <div className={HomePageStyles.home_page_content_text}>
              {"Share something new..."}
            </div>
            <div className={HomePageStyles.home_page_content_text}>
              {"Have fun!!"}
            </div>
            <Link href="/forum">
              <div className={HomePageStyles.home_page_content_redirect_button}>
                Ask something new
                <div
                  className={
                    HomePageStyles.home_page_content_redirect_button_arrow
                  }
                >
                  <Image src={arrowGraphic} layout="responsive" />
                </div>
              </div>
            </Link>
            <div className={HomePageStyles.Signout}>
            <div onClick={signOut} className={HomePageStyles.home_page_content_redirect_button}>Sign out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
