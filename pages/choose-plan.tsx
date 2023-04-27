import React from "react";
import styles from "../styles/pricing.module.css";
import Image from "next/image";
import {
  FireOutlined,
  SnippetsOutlined,
  TeamOutlined,
} from "@ant-design/icons";

interface ChoosePlanProps {}
const ChoosePlan: React.FC<ChoosePlanProps> = () => {
  return (
    <div className={styles.planWrap}>
      <div className={styles.planHeaderWrap}>
        <div className={styles.planHeader}>
          <div className={styles.title}>
            Get unlimited access to many amazing books to read
          </div>
          <div className={styles.subTitle}>
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className={styles.imgMask}>
            <Image
              src={"/images/pricing-top.png"}
              height={280}
              width={340}
              alt={""}
            />
          </figure>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className={styles.featuresWrap}>
            <div className={styles.planFeatures}>
              <figure className={styles.icon}>
                <SnippetsOutlined />
              </figure>
              <div className={styles.featuresText}>
                <b>Key ideas in a few min</b> with many books to read
              </div>
            </div>
            <div className={styles.planFeatures}>
              <figure className={styles.icon}>
                <TeamOutlined />
              </figure>
              <div className={styles.featuresText}>
                <b>3 million people</b> start growing with Summarist every year
              </div>
            </div>
            <div className={styles.planFeatures}>
              <figure className={styles.icon}>
                <FireOutlined />
              </figure>
              <div className={styles.featuresText}>
                <b>Precise recommendations</b> collections curated by experts
              </div>
            </div>
          </div>
          <div className={styles.sectionTitle}>
            Choose the plan that fits for you
          </div>
          <div className={styles.planCard}>
            <div className={styles.circle}></div>
            <div className={styles.planContent}>
              <div className={styles.planTitle}>Premium Plus Yearly</div>
              <div className={styles.planPrice}>$99.99/year</div>
              <div className={styles.planText}>7-day free trial included</div>
            </div>
          </div>
          <div className={styles.planCardSeparator}>or</div>
          <div className={styles.planCard}>
            <div className={styles.circle}></div>
            <div className={styles.planContent}>
              <div className={styles.planTitle}>Premium Plus Monthly</div>
              <div className={styles.planPrice}>$9.99/month</div>
              <div className={styles.planText}>No trial included</div>
            </div>
          </div>
        </div>
      </div>
      <section id="footer"></section>
    </div>
  );
};

export default ChoosePlan;
