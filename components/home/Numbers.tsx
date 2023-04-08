import React from "react";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";

type Props = {};

function Numbers({}: Props) {
  return (
    <section id="numbers">
      <div className="container">
        <div className="row">
          <div className="section__title">Start growing with Summarist now</div>
          <div className="numbers__wrapper">
            <div className="numbers">
              <div className="numbers__icon">
                <BiCrown />
              </div>
              <div className="numbers__title">3 Million</div>
              <div className="numbers__sub--title">
                Downloads on all platforms
              </div>
            </div>
            <div className="numbers">
              <div className="numbers__icon numbers__star--icon">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
              </div>
              <div className="numbers__title">4.5 Stars</div>
              <div className="numbers__sub--title">
                Average ratings on iOS and Google Play
              </div>
            </div>
            <div className="numbers">
              <div className="numbers__icon">
                <RiLeafLine />
              </div>
              <div className="numbers__title">97%</div>
              <div className="numbers__sub--title">
                Of Summarist members create a better reading habit
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Numbers;
