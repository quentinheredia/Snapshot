import Button from "react-bootstrap/Button";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* [LOGO] with left margin */}
        <a className="navbar-brand ms-3" href="/Home">
          [LOGO]
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDivs"
          aria-controls="navbarDivs"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarDivs">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex">
              <div className="p-2">
                <a className="nav-link" href="./Home">
                  <Button>Home</Button>
                </a>
              </div>
              <div className="p-2">
                <a className="nav-link" href="./Snapshot">
                  <Button>Snapshot</Button>
                </a>
              </div>
              <div className="p-2">
                <a className="nav-link" href="./Tax">
                  <Button>Tax Calculator</Button>
                </a>
              </div>
            </div>
            <div className="d-flex">
              {/* Login with right margin */}
              <div className="p-2 me-3">
                <a className="nav-link" href="/Login">
                  <Button>Login</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
