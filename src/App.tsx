import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 400px);
  grid-template-rows: repeat(2, 300px);
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Switch = styled(motion.button)`
  margin-top: 50px;
  padding: 10px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    background-color: white;
  }
`;

const SwitchVarients = {
  clicked: (circleMove: boolean) => ({
    scale: circleMove ? 1.2 : 1,
    color: circleMove ? "orange" : "blue",
  }),
};

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
  const [circleMove, setCircleMove] = useState(false);
  const toggleCircleMove = () => setCircleMove((prev) => !prev);
  const [id, setId] = useState<null | string>(null);

  return (
    <Wrapper>
      <Grid>
        <Box
          whileHover={{ scale: 1.1, translateX: "-5%", translateY: "-5%" }}
          onClick={() => setId("1")}
          key={"1"}
          layoutId={"1"}
        ></Box>
        <Box>{!circleMove ? <Circle layoutId="circle" /> : null}</Box>
        <Box>{circleMove ? <Circle layoutId="circle" /> : null}</Box>
        <Box
          whileHover={{ scale: 1.1, translateX: "5%", translateY: "5%" }}
          onClick={() => setId("4")}
          key={"4"}
          layoutId={"4"}
        ></Box>
      </Grid>
      <Switch
        custom={circleMove}
        onClick={toggleCircleMove}
        variants={SwitchVarients}
        animate="clicked"
      >
        Switch
      </Switch>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box layoutId={id} style={{ width: 440, height: 330 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
