import type { FC } from "react";
import Wrapper from '../../components/Wrapper/Wrapper';

import { faqData } from '../../data/faqData';
import type { IFaqData } from "../../data/faqData";

import styles from "./LearnMorePage.module.css";

const LearnMorePage: FC = () => {
  const elements = faqData.map((item: IFaqData) => (
    <div key={item.question}>
      <h4>{item.question}</h4>
      <p>{item.paragraph}</p>
      {item.bulletTitle && (
        <p>
          <strong>{item.bulletTitle}</strong>
        </p>
      )}
      {item.bullets && (
        <ul>
          {item.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
      {item.note && (
        <p>
          <em>{item.note}</em>
        </p>
      )}
      {item.linkText && item.linkUrl && (
        <p>
          <a href={item.linkUrl}>{item.linkText}</a>
        </p>
      )}
    </div>
  ));

  return (
    <main>
      <Wrapper>
        <div className={styles.container}>
          <h2 className={styles.title}>Learn More About Contact Information Uploads</h2>
          <div className={styles.box}>{elements}</div>
        </div>
      </Wrapper>
    </main>
  );
};

export default LearnMorePage;
