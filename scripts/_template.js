const tsxTemplate = `
import "./index.scss";

type {COMP_NAME}Props = {
  
};

function {COMP_NAME}(props: {COMP_NAME}Props) {
  const {} = props;

  return (
    <div className="{KEBAB_NAME}">
      {COMP_NAME}
    </div>
  );
}

export default {COMP_NAME};
`;

const scssTemplate = `
.{KEBAB_NAME} {

}
`;

module.exports = {
  tsxTemplate,
  scssTemplate,
};
