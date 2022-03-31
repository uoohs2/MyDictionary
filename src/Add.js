import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createDictionaryFB } from "./redux/modules/dictionary";
import styled from "styled-components";

const Add = (props) => {
  const history = useHistory();
  const word = React.useRef(null);
  const explanation = React.useRef(null);
  const link = React.useRef(null);

  const dispatch = useDispatch();
  const addCard = () => {
    dispatch(
      createDictionaryFB({
        word: word.current.value,
        explanation: explanation.current.value,
        link: link.current.value,
        completed: false,
      })
    );
  };

  useEffect(() => {
    word.current.focus();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Development Dictionary</Title>
      </Header>
      <AddBox>
        <SubTitle>단어 추가하기</SubTitle>
        {/* <Form> */}
        <Label>
          단어
          <Input type="text" ref={word} />
        </Label>
        <Label>
          설명
          <Input type="text" ref={explanation} />
        </Label>
        <Label>
          참고자료 링크
          <Input type="text" ref={link} />
        </Label>
        <ButtonBox>
          <Button
            onClick={() => {
              history.push("/");
            }}
          >
            메인으로 돌아가기
          </Button>
          <Button
            onClick={() => {
              return word.current.value === "" ||
                explanation.current.value === "" ||
                link.current.value === ""
                ? alert("빈칸을 입력하세요.")
                : (history.push("/"), addCard());
            }}
          >
            저장하기
          </Button>
        </ButtonBox>
        {/* </Form> */}
      </AddBox>
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
  color: white;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 75px;
  padding-top: 25px;
  border-bottom: 4px solid #ff00a5;
  background-image: url("/images/note.jpg");
  background-size: contain;
  background-repeat: repeat-x;
  background-position: top;
  text-align: center;
`;

const Title = styled.h2`
  width: 320px;
  height: 50px;
  line-height: 45px;
  margin: 0 auto;
  background-color: black;
  border: 2px dotted #00ff5a;
  border-radius: 10px;
  font-size: 1.5rem;

  /* animate.css */
  animation: tada;
  animation-duration: 1s;
`;

const AddBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0 auto;
  font-family: "BMAir";
`;

const SubTitle = styled.h3`
  width: 150px;
  margin: 30px auto;
  text-align: center;
`;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 350px;
//   height: auto;
//   /* border: 1px solid red; */
// `;

const Label = styled.label`
  display: block;
  width: 350px;
  height: 60px;
  margin-bottom: 10px;
  line-height: 35px;
  border-bottom: 1px solid white;
`;

const Input = styled.input`
  display: block;
  width: 350px;
  padding: 0;
  white-space: normal;
  background-color: black;
  color: white;
  font-size: 0.8em;
  border: none;
  ::selection {
    background-color: #f79400;
  }
  :focus {
    outline: none;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0;
`;
const Button = styled.button`
  width: 150px;
  height: 40px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  font-family: "BMAir";
  font-size: 1em;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #00e7ff;
  }
  /* 반응형 */
  @media screen and (max-width: 1023px) {
    display: block;
    width: 250px;
    margin: 10px auto;
  }
`;

export default Add;
