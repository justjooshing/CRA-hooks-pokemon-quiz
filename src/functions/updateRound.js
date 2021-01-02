const updateRound = (round, setRound, setPage, setWhichButton) => {
  if (round < 9) {
    setRound(round + 1);
  } else {
    setPage("finished");
  }
  setWhichButton("skip");
};

export default updateRound;
