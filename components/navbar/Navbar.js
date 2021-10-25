import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import navbarStyles from "./Navbar.module.css";

import logo from "../../assets/_logo/logo.svg";

function PrimaryNavbar({ userDetails }) {
  const router = useRouter();

  return (
    <nav className={navbarStyles.navbar_primary_wrapper}>
      <div>
      <Link href="/">
          <div className={navbarStyles.primary_navbar_logo}>
            <Image src={logo} layout="responsive" />
          </div>
        </Link>
      </div>
      <div className={navbarStyles.navbar_left_sec}>
     
        <ul className={navbarStyles.primary_navbar_links}>
          <li
            className={
              router.pathname == "/"
                ? `${navbarStyles.primary_navbar_link} ${navbarStyles.active_primary_nav_link}`
                : navbarStyles.primary_navbar_link
            }
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={
              router.pathname == "/paths"
                ? `${navbarStyles.primary_navbar_link} ${navbarStyles.active_primary_nav_link}`
                : navbarStyles.primary_navbar_link
            }
          >
            <Link href="/paths">Paths</Link>
          </li>
          <li
            className={
              router.pathname == "/forum"
                ? `${navbarStyles.primary_navbar_link} ${navbarStyles.active_primary_nav_link}`
                : navbarStyles.primary_navbar_link
            }
          >
            <Link href="/forum">Forum</Link>
          </li>
        </ul>
        <div className={navbarStyles.navbar_user_details_sec}>
        {userDetails?.image ? (
          <div className={navbarStyles.navbar_user_image}>
            <Image
              src={userDetails?.image}
              height="100%"
              width="100%"
              layout="responsive"
            />
          </div>
        ) : null}
        <h5 className={navbarStyles.navbar_user_name}>{userDetails?.name}</h5>
      </div>
      </div>
     
    </nav>
  );
}

export default PrimaryNavbar;
