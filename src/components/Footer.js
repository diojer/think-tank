import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { NewTabLink } from "./NewTabLink";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

//FA Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const addToMailingList = (data, helpers) => {
  helpers.resetForm(initialValues);
  axios.post("https://leeds-think-tank-server.onrender.com/mailinglist", data);
};

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Leeds Think Tank mailing list to be kept up-to-date on future
          speakers and workshops.
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <Formik
            initialValues={initialValues}
            onSubmit={addToMailingList}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="input-areas-form">
                <Field
                  className="footer-input"
                  name="email"
                  placeholder="Your Email"
                />
                <div className="footer-button-wrapper">
                  <Button buttonStyle="btn--third" type="submit">
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="error-message-wrapper">
                <ErrorMessage name="email" />
              </div>
            </Form>
          </Formik>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>External Links</h2>
            <NewTabLink link="https://www.leeds.ac.uk/">
              University of Leeds
            </NewTabLink>
            <NewTabLink link="https://www.luu.org.uk/">
              Leeds University Union
            </NewTabLink>
            <NewTabLink link="https://www.leeds.gov.uk/">
              Leeds City Council
            </NewTabLink>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <NewTabLink link="https://goo.gl/maps/TZcVXb4Z6xgFDsNK6">
              Lifton Place, Leeds, LS2 9JZ
            </NewTabLink>
            <Link to="/">thinktank@luu.group</Link>
            <Link to="/sponsors">Support</Link>
            <Link to="/sponsors">Sponsorships</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Resources</h2>
            <NewTabLink link="https://drive.google.com/drive/folders/13lCtwAZpgExnrKjCQ3cud9sFVPsQeKf_">
              Member Resources
            </NewTabLink>
            <NewTabLink link="https://docs.google.com/document/d/152Wy2iNyi6iMN4u5y8YTXbLMBgBL5WvsyxGbgSKiV-4/edit?usp=sharing">
              Style Guide
            </NewTabLink>
            <Link to="/">Meetings</Link>
            <NewTabLink link="https://calendar.google.com/calendar/u/0?cid=YTZkZGUzYmU2ODNjN2Q4NDMzYjMyOWQ0YzI3ZjU4NDQ1MDYyYWIxODdmNWVmYmFjZTM2NjQ0MjE1ZGJhNGRhY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t">
              Calendar
            </NewTabLink>
          </div>
          <div className="footer-link-items">
            <h2>Social Media</h2>
            <NewTabLink link="https://www.instagram.com/leedsthinktank/">
              Instagram
            </NewTabLink>
            <NewTabLink link="https://www.linkedin.com/company/leeds-think-tank-society/">
              LinkedIn
            </NewTabLink>
            <NewTabLink link="https://twitter.com/leedsthinktank">
              Twitter
            </NewTabLink>
            <NewTabLink link="https://linktr.ee/leedsthinktank">
              LinkTree
            </NewTabLink>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          {/* <div className="footer-logo">
            <Link to="/" className="social-logo">
              TRVL
              <i className="fab fa-typo3" />
            </Link>
          </div>
          <small className="website-rights">TRVL © 2020</small> */}
          <div className="social-icons">
            <NewTabLink
              className="social-icon-link instagram"
              link="https://www.instagram.com/leedsthinktank/"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon="fab fa-instagram" />
            </NewTabLink>
            <NewTabLink
              className="social-icon-link linkedin"
              link="https://www.linkedin.com/company/leeds-think-tank-society/"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon="fab fa-linkedin" />
            </NewTabLink>
            <NewTabLink
              className="social-icon-link twitter"
              link="https://twitter.com/leedsthinktank"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon="fab fa-twitter" />
            </NewTabLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
