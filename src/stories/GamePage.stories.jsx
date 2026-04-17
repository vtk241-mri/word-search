import GamePage from "../pages/GamePage";

const demoGrid = [
  ["R", "E", "A", "C", "T"],
  ["N", "O", "D", "E", "S"],
  ["R", "O", "U", "T", "E"],
  ["S", "T", "O", "R", "E"],
  ["H", "O", "O", "K", "S"],
];

function toSet(positions = []) {
  return new Set(positions.map((item) => `${item.row},${item.col}`));
}

const meta = {
  title: "Complex/GamePage",
  component: GamePage,
  args: {
    grid: demoGrid,
    placedWords: ["REACT", "NODE", "ROUTE", "STORE", "HOOKS"],
    foundWords: ["REACT"],
    foundPositions: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
    ],
    remainingTime: 120,
    timerRunning: true,
  },
  argTypes: {
    foundPositionsSet: { control: false },
    foundPositions: { control: false },
    checkSelection: { action: "checkSelection" },
    stopTimer: { action: "stopTimer" },
    resumeTimer: { action: "resumeTimer" },
  },
  render: ({ foundPositions, ...args }) => (
    <div style={{ minWidth: 980, padding: 12 }}>
      <GamePage
        {...args}
        foundPositionsSet={toSet(foundPositions)}
        checkSelection={args.checkSelection || (() => null)}
        stopTimer={args.stopTimer || (() => {})}
        resumeTimer={args.resumeTimer || (() => {})}
      />
    </div>
  ),
};

export default meta;

export const NewGame = {};

export const MidGame = {
  args: {
    foundWords: ["REACT", "NODE"],
    foundPositions: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
    ],
    remainingTime: 68,
  },
};

export const TimerPaused = {
  args: {
    foundWords: ["REACT", "NODE", "ROUTE"],
    foundPositions: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
    ],
    remainingTime: 41,
    timerRunning: false,
  },
};
