import footerStyles from '../css/footer.module.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerContent}>
        <div className={footerStyles.companyInfo}>
          <div className={footerStyles.companyName}>Demure 2023.</div>
          <div className={footerStyles.projectTitle}>포스코 X 코딩온 웹 풀스택 9기 프로젝트4</div>
          <div className={footerStyles.projectMembers}>
            <div>이원노</div>
            <div>이우종</div>
            <div>박가현</div>
            <div>황동하</div>
            <div>김민영</div>
          </div>
          {/* <div>
            <Link to="https://github.com/KDT9Demure" className={footerStyles.gitHubs}>
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
