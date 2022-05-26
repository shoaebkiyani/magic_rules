import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import RulesContext from "./context/rules/rulesContext";
import Content from "./Content";
import Spinner from "./Spinner";

const SubHeadings = ({ subIndex }) => {
  const rulesContext = useContext(RulesContext);
  let { getSubHeadings, isLoading } = rulesContext;

  let subHeadings = [...new Set(getSubHeadings)];

  const [active, setActive] = useState(false);

  let subRef = useRef();
  // eslint-disable-next-line eqeqeq
  subHeadings = subHeadings.filter((subheading) => subheading[0] == subIndex);

  const handleSubHeadingClick = (e, index) => {
    e.preventDefault();
    if (active !== index) {
      subRef = document.getElementById("scrollToSub");
      subRef.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
      setActive(index);
    } else {
      setActive(false);
    }
  };

  return (
    <div
      id="scrollToSub"
      className="sub-content"
      style={{ whiteSpace: "pre-line" }}
    >
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {subHeadings.map((subheading, index) => (
        <ul key={index}>
          <Link
            to="/subheading"
            onClick={(e) => handleSubHeadingClick(e, index)}
          >
            <div> {subheading} </div>
          </Link>
          {active === index
            ? [
                <li
                  key={index}
                  style={{
                    listStyle: "none",
                  }}
                >
                  <Content subHeadings={subHeadings} contIndex={index} />
                </li>,
              ]
            : null}
        </ul>
      ))}
    </div>
  );
};

export default SubHeadings;
