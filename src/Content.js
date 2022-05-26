import { useContext } from "react";
import RulesContext from "./context/rules/rulesContext";
import Spinner from "./Spinner";

const Content = ({ subHeadings, contIndex }) => {
  const rulesContext = useContext(RulesContext);
  const { getRules, isLoading } = rulesContext;

  let subId = subHeadings[contIndex].split(".")[0];
  // eslint-disable-next-line eqeqeq
  let rules = getRules.filter((rule) => rule.split(".")[0].indexOf(subId) == 0);

  return (
    <div className="content">
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {rules.map((content, index) => (
        <ul key={index}>{content}</ul>
      ))}
    </div>
  );
};

export default Content;
