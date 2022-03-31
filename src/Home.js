import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loadDictionaryFB,
  updateDictionaryFB,
  deleteDictionaryFB,
} from "./redux/modules/dictionary";

import styled from "styled-components";
import "animate.css";

const Home = (props) => {
  const history = useHistory();
  const cards = useSelector((state) => state.dictionary.card);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadDictionaryFB());
  }, []);

  return (
    <Container>
      <Header>
        <Title>Development Dictionary</Title>
      </Header>
      <Note>
        {cards.map((v, i) => (
          <WordBox key={v + i} completed={cards[i].completed}>
            <IconBox>
              <IconButton
                onClick={() => {
                  dispatch(updateDictionaryFB(cards[i].id));
                }}
              >
                <IconImg src="/images/check.png" alt="CheckIcon" />
              </IconButton>
              <IconButton
                onClick={() => {
                  history.push({
                    pathname: "/modify/" + cards[i].id,
                    state: { cards: cards[i] },
                  });
                }}
              >
                <IconImg src="/images/pencil.png" alt="ModifyIcon" />
              </IconButton>
              <IconButton
                onClick={() => {
                  if (window.confirm("삭제하시겠습니까?") === true) {
                    dispatch(deleteDictionaryFB(cards[i].id));
                  }
                }}
              >
                <IconImg src="/images/delete.png" alt="DeleteIcon" />
              </IconButton>
            </IconBox>
            <Word>{v.word}</Word>
            <Line />
            <Text>{v.explanation}</Text>
            <Line />
            <Text>
              <Link target="_blank" href={v.link}>
                "여기"를 클릭해서 참고해보세요.
              </Link>
            </Text>
          </WordBox>
        ))}
      </Note>
      <AddButton
        onClick={() => {
          history.push("/add");
        }}
      ></AddButton>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  max-width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: black;
  font-family: "BMPro";
  font-size: 1.1em;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  border-bottom: 4px solid #ff00a5;
  background-image: url("/images/note.jpg");
  background-size: contain;
  background-repeat: repeat-x;
  background-position: center;
  z-index: 1;
`;

const Title = styled.h2`
  text-align: center;
  width: 320px;
  height: 50px;
  line-height: 45px;
  margin: 25px auto;
  background-color: black;
  border: 2px dotted #00ff5a;
  border-radius: 10px;
  color: white;
  font-size: 1.5rem;

  /* animate.css */
  animation: tada;
  animation-duration: 1s;
`;

const Note = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  width: 1155px;
  margin: 100px auto 0 auto;
  padding-top: 30px;
  border-radius: 10px;

  /* 반응형 */
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    width: 770px;
  }
  @media screen and (max-width: 767px) {
    width: 360px;
  }
`;

const WordBox = styled.div`
  position: relative;
  width: 350px;
  height: auto;
  margin: 15px;
  box-shadow: 2px 1px 1px 1px #1aa0ff;
  background-color: ${(props) =>
    props.completed === true ? "#400070" : "black"};
  border: 2px solid #8a52fd;
  border-radius: 10px;
  color: white;
  font-family: "BMAir";

  /* 반응형 */
  @media screen and (max-width: 767px) {
    width: 330px;
    margin: 15px 11px;
  }
`;
const IconBox = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 115px;
  height: 38px;
`;

const IconButton = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;
const IconImg = styled.img`
  width: 23px;
  height: 23px;
  margin: 0 auto;
`;
const Word = styled.h3`
  width: 200px;
  min-height: 30px;
  line-height: 30px;
  margin: 10px;
`;

const Text = styled.p`
  width: 320px;
  min-height: 50px;
  line-height: 23px;
  margin: 10px;
  word-break: break-all;
`;

const Link = styled.a`
  display: block;
  width: 320px;
  min-height: 50px;
  margin: 5px 0px;
  color: #ff00b3;
  text-decoration: none;
`;

const Line = styled.hr`
  border: 1px dotted #ffbd03;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 40px;
  width: 50px;
  height: 50px;
  border: 2px solid #00e7ff;
  border-radius: 50%;
  background-color: black;
  background-image: url("/images/plus.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.25s linear;
  &:hover {
    cursor: pointer;
    transform: scale(1.25);
  }

  /* 반응형 */
  @media screen and (max-width: 767px) {
    bottom: 20px;
    right: 20px;
  }
`;

export default Home;
