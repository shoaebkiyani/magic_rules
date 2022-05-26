import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import RulesContext from "./context/rules/rulesContext";
// import Headings from "./Headings";
import SubHeadings from "./SubHeadings";
import Spinner from "./Spinner";

const HeadingList = () => {
  const rulesContext = useContext(RulesContext);
  let { getIntro, getMainHeadings, isLoading } = rulesContext;

  const [active, setActive] = useState(false);

  const mainHeadings = [...new Set(getMainHeadings)];

  let mainRef = useRef();

  const handleHeadingClick = (e, index) => {
    e.preventDefault();
    if (active !== index) {
      mainRef = document.getElementById("scrollToMain");
      mainRef.scrollIntoView({ behavior: "smooth" });
      setActive(index);
    } else {
      setActive(false);
    }
  };
  return (
    <div id="scrollToMain" className="content">
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      <div
        style={{
          whiteSpace: "pre-line",
          marginBottom: "10px",
        }}
      >
        {getIntro}
      </div>
      <div className="main-content">
        {mainHeadings.map((mainheading, index) => (
          <ul key={index}>
            <Link to="/" onClick={(e) => handleHeadingClick(e, index)}>
              {mainheading}
            </Link>
            {active === index
              ? [
                  <li
                    key={index + 1}
                    style={{
                      listStyle: "none",
                    }}
                  >
                    <SubHeadings subIndex={index + 1} />
                  </li>,
                ]
              : null}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default HeadingList;
