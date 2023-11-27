import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSortAmountDown } from "react-icons/fa";
import ProfilePic from "../../assets/ProfilePic.png";
import styles from "./Navbar.module.css";

const Navbar= () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <img src={ProfilePic} alt="Profile" className={styles.profileIcon} />
        <b className="navbar-brand">Notes App</b>

        <div className="ml-auto">
          <Dropdown show={showDropdown} onSelect={() => setShowDropdown(false)}>
            <Dropdown.Toggle
              as="a"
              variant="link"
              id="dropdown-basic"
              onClick={toggleDropdown}
            >
              <FaSortAmountDown />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                Sort by Date
              </Dropdown.Item>
              <Dropdown.Item>
                Sort by Name
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
