function ThankYou() {
  return (
    <div className="sign-up-container container thank-you">
      <div className="w3-content" style={{ "max-width": "1200px" }}>
        <div className="w3-panel">
          <i className="w3-xlarge fa fa-bars"></i>
        </div>
        {/* First Grid: Logo & About */}
        <div className="w3-row">
          <div className="w3-half w3-container">
            <h1 className="w3-xxlarge w3-text-grey"></h1>
            <h1 className="w3-jumbo"></h1>
          </div>
          <div className="w3-half w3-container w3-xlarge w3-text-grey">
            <p className=""></p>
            <p></p>
          </div>
        </div>

        {/* Second Grid: Resent   */}
        <div className="thank-you-text">
          <h4>Thanks for signing up! </h4>
        </div>
        <div className="w3-row">
          <div className="w3-half w3-container">
            <img style={{ width: "100%" }} />
          </div>
          <div className="w3-half w3-container">
            <p className="w3-xlarge w3-text-grey"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
