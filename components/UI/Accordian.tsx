import React from "react";
import { Collapse } from "antd";
import styles from "..//..//styles/pricing.module.css";

interface AccordianProps {}

const { Panel } = Collapse;

const textDescI = (
  <p className={styles.panelDesc} style={{ paddingLeft: "24px" }}>
    Begin your complimentary 7-day trial with a Summarist annual membership. You
    are under no obligation to continue your subscription, and you will only be
    billed when the trial period expires. With Premium access, you can learn at
    your own pace and as frequently as you desire, and you may terminate your
    subscription prior to the conclusion of the 7-day free trial.
  </p>
);
const textDescII = (
  <p className={styles.panelDesc} style={{ paddingLeft: "24px" }}>
    While an annual plan is active, it is not feasible to switch to a monthly
    plan. However, once the current month ends, transitioning from a monthly
    plan to an annual plan is an option.
  </p>
);
const textDescIII = (
  <p className={styles.panelDesc} style={{ paddingLeft: "24px" }}>
    Premium membership provides you with the ultimate Summarist experience,
    including unrestricted entry to many best-selling books high-quality audio,
    the ability to download titles for offline reading, and the option to send
    your reads to your Kindle.
  </p>
);
const textDescIV = (
  <p className={styles.panelDesc} style={{ paddingLeft: "24px" }}>
    You will not be charged if you cancel your trial before its conclusion.
    While you will not have complete access to the entire Summarist library, you
    can still expand your knowledge with one curated book per day.
  </p>
);

const Accordian: React.FC<AccordianProps> = () => {
  return (
    <Collapse bordered={false}>
      <Panel
        key={1}
        className={styles.panelDesc}
        header={
          <span className={styles.panelHeader}>
            How does the free 7-day trial work?
          </span>
        }
      >
        {textDescI}
      </Panel>
      <Panel
        key={2}
        className={styles.panelDesc}
        header={
          <span className={styles.panelHeader}>
            Can I switch subscriptions from monthly to yearly, or vice versa?
          </span>
        }
      >
        {textDescII}
      </Panel>
      <Panel
        key={3}
        className={styles.panelDesc}
        header={
          <span className={styles.panelHeader}>
            What's included in the premium plan?
          </span>
        }
      >
        {textDescIII}
      </Panel>
      <Panel
        key={4}
        className={styles.panelDesc}
        header={
          <span className={styles.panelHeader}>
            Am I able to cancel during my trial or subscription?
          </span>
        }
      >
        {textDescIV}
      </Panel>
    </Collapse>
  );
};
export default Accordian;
