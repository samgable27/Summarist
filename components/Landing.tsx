import Image from "next/image";
import React from "react";
import { useModalStore } from "../pages/store";
import LoginModal from "./LoginModal";

type Props = {};

function Landing({}: Props) {
  const showModal = useModalStore((state) => state.showModal);

  return (
    <section id="landing">
      <div className="container">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>
              <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don’t like to read.
              </div>
              <button className="btn home__cta--btn" onClick={showModal}>
                Login
              </button>
              <LoginModal />
            </div>
            <figure className="landing__image--mask">
              <Image
                src="/images/landing.png"
                width={400}
                height={380}
                alt={""}
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
