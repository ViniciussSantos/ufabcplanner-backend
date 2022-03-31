import { Link } from 'react-router-dom';

import styles from './InitialPageLayout.module.scss';

interface Props {
  title: string;
  subtitle: string;
  subtext: { question: string, linkLabel: string, linkTo: string }
  children: React.ReactNode;
}

const InitialPageLayout = ({ title, subtitle, children, subtext }: Props) => {
  return (
    <div className={styles.page_layout}>
      <div style={{ gridArea: 'logo-container' }}>
        <img
          src="/UFABCplanner_logo_dark.svg"
          alt="UFABCplanner_logo_dark"
          width="240px"
        />
      </div>

      <div className={styles.form_container}>
        <div className={styles.card_container}>
          <div className={styles.titles_container}>
            <h1 className={styles.title}>{title}</h1>

            <p className={styles.sub_title}>{subtitle}</p>
          </div>

          {children}

          <div className={styles.sub_text}>
            {subtext.question}

            <Link to={subtext.linkTo} className={styles.subtext_link}>
              {subtext.linkLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialPageLayout;
