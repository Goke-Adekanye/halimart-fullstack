import React from "react";
import data from "../data";
import "./style/footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="f-container">
        <div className="f-row">
          <div className="f-column division">
            <div>
              <h4>
                Our <span>Mission</span>
              </h4>
              <div className="footer-about">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  hic repellendus labore, dolor iste sit itaque ipsam error
                  explicabo quasi quod voluptatum tempora esse magnam cum
                  praesentium ipsa deserunt rerum! Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
          <div className="f-columns division">
            <div>
              <h4>
                Our <span>Services</span>
              </h4>
              <ul className="footer-link">
                <li>
                  <a href="/">
                    <i className="fa fa-chevron-right"></i>Pricing
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-chevron-right"></i>Products
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-chevron-right"></i>Payment
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-chevron-right"></i>Profile
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-chevron-right"></i>Order History
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="f-columns col division">
            <div>
              <h4>Help</h4>
              <ul className="footer-link">
                <li>
                  <a href="/">
                    <i className="fa fa-chevron-right"></i>Contact us
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-chevron-right"></i>Customer Service
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-chevron-right"></i>FAQs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="f-rowss">
          <div className="col-9">
            developed by{" "}
            <span>
              Jvstblvck <i className="fa fa-copyright">2021</i>
            </span>
          </div>
          <div className="col-3">
            {Object.keys(data.socials).map((key) => (
              <div className="contactInfo_social">
                <a
                  href={data.socials[key].link}
                  rel="noreferrer"
                  target="_blank"
                >
                  {data.socials[key].icon}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
