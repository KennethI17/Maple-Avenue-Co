import Aezia from "../../images/Aezia.jpg";
import Maple_Ave_Logo from "../../images/Maple_Ave_Logo.jpg";

function AboutUs() {
  return (
    <div className=" container">
      <form className="sign-up-container">
        {/* First Grid: Logo & About */}
        <div className="w3-row">
          <div className="w3-half w3-container">
            <img src={Aezia} style={{ width: "100%" }} />
          </div>
          <div className="w3-half w3-container w3-xlarge w3-text-grey">
            <h1 className="w3-jumbo">About Us</h1>
            <p className="">Hello! My name is Aezia Cowan</p>
            <p>
              I started Maple Avenue & Co to create an environment of adorable
              yet, affordable boutique clothing!
            </p>
            <p>
              My goal is for nothing to be over $20 and still be able to provide
              high quality items! Happy shopping😉
            </p>
            <p className="w3-xlarge w3-text-grey">✨Proverbs 3:6✨</p>
            <p className="w3-xlarge w3-text-grey">
              •Seek His will in all you do and He will show you which path to
              take•
            </p>
          </div>
        </div>

        {/* Second Grid: Resent   */}
        <div className="w3-panel w3-text-grey"></div>
        <div className="w3-row">
          <div className="w3-half w3-container"></div>
          <div className="w3-half w3-container"></div>
        </div>
      </form>
    </div>
  );
}

export default AboutUs;
