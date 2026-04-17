import LetterCell from "../components/LetterCell";

const meta = {
  title: "Base/LetterCell",
  component: LetterCell,
  args: {
    letter: "A",
    isSelected: false,
    isFound: false,
  },
  argTypes: {
    letter: { control: "text" },
    isSelected: { control: "boolean" },
    isFound: { control: "boolean" },
  },
};

export default meta;

export const Default = {};

export const Selected = {
  args: {
    letter: "S",
    isSelected: true,
  },
};

export const Found = {
  args: {
    letter: "F",
    isFound: true,
  },
};
