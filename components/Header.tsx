import Image from "next/image";
import React from "react";
import { useModalStore } from "../src/store/store-client";

type Props = {};

function Header({}: Props) {
  const showModal = useModalStore((state) => state.showModal);

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image
            className="nav__img"
            src={"/images/logo.png"}
            width={200}
            height={45}
            alt={""}
          />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login" onClick={showModal}>
            Login
          </li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
