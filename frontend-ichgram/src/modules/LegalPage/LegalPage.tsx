import Wrapper from '../../components/Wrapper/Wrapper';

import styles from "./LegalPage.module.css";

interface ISectionsData {
  heading: string;
  content: string;
}

export interface ILegalPageData {
  title: string;
  date: string;
  sections: ISectionsData[];
}

interface ILegalPageProps {
  data: ILegalPageData;
}

const LegalPage = ({ data }: ILegalPageProps) => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.date}>{data.date}</p>
        {data.sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h4>{section.heading}</h4>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default LegalPage;
