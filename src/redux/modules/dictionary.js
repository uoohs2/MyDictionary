// dictionary.js

import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// 액션타입
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const UPDATE = "dictionary/UPDATE";
const DELETE = "dictionary/DELETE";

// 초기값 설정
const initialState = {
  card: [],
};

// 액션생성
export function loadDictionary(dictionary_card) {
  return { type: LOAD, dictionary_card: dictionary_card };
}
export function createDictionary(dictionary) {
  return { type: CREATE, dictionary };
}
export function updateDicitonary(dictionary_index) {
  return { type: UPDATE, dictionary_index };
}
export function deleteDictionary(dictionary_index) {
  return { type: DELETE, dictionary_index };
}

// 미들웨어(중간단계)
// 로드 미들웨어
export const loadDictionaryFB = () => {
  return async function (dispatch) {
    const dictionary_data = await getDocs(collection(db, "dictionary"));
    //받아온 데이터를 배열로 바꿔준다.
    let dictionary_card = [];
    dictionary_data.forEach((doc) => {
      // doc은 가져오는 데이터 하나하나가 들어가는 곳의 이름! 이름은 마음대로 정해도 된다.
      dictionary_card.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadDictionary(dictionary_card));
  };
};

// // 생성 미들웨어
// export const createDictionaryFB = (dictionary) => {
//   return async function (dispatch) {
//     const addCard = await addDoc(collection(db, "dictionary"), dictionary);
//     const dictionary_new_card = { id: addCard.id, ...dictionary };
//     dispatch(createDictionary(dictionary_new_card));
//   };
// };

// 생성 미들웨어
export const createDictionaryFB = (dictionary) => {
  return async function () {
    await setDoc(doc(db, "dictionary", dictionary.word), dictionary);
  };
};

// 업데이트 미들웨어
export const updateDictionaryFB = (dictionary_id) => {
  return async function (dispatch, getState) {
    const docCard = doc(db, "dictionary", dictionary_id);
    const dictionary_data = getState().dictionary.card;
    const dictionary_index = dictionary_data.findIndex((d) => {
      return d.id === dictionary_id;
    });
    await updateDoc(docCard, {
      completed: !dictionary_data[dictionary_index].completed,
    });
    dispatch(updateDicitonary(dictionary_index));
  };
};

// 삭제 미들웨어
export const deleteDictionaryFB = (dictionary_id) => {
  return async function (dispatch, getState) {
    if (!dictionary_id) {
      window.alert("아이디가 없네요.");
      return;
    }
    const docCard = doc(db, "dictionary", dictionary_id);
    const dictionary_data = getState().dictionary.card;
    const dictionary_index = dictionary_data.findIndex((d) => {
      return d.id === dictionary_id;
    });
    await deleteDoc(docCard);
    dispatch(deleteDictionary(dictionary_index));
  };
};

// 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // 로드 리듀서
    case "dictionary/LOAD": {
      return {
        //파이어스토어에서 데이터를 정렬해서 가져온다.
        card: action.dictionary_card.sort((a, b) =>
          a.word.localeCompare(b.word)
        ),
      };
    }

    // 생성 리듀서
    // case "dictionary/CREATE": {
    //   // 2가지 방법 : push사용 or 새로운 배열 선언
    //   // state.card.push(action.dictionary);
    //   // return { ...state };
    //   const new_card = [...state.card, action.dictionary];
    //   return { card: new_card };
    // }

    // 업데이트 리듀서
    case "dictionary/UPDATE": {
      const update_card = state.card.map((l, i) => {
        return parseInt(action.dictionary_index) === i
          ? { ...l, completed: !l.completed }
          : l;
      });
      return { card: update_card };
    }

    // 삭제 리듀서
    case "dictionary/DELETE": {
      const delete_card = state.card.filter((v, i) => {
        return action.dictionary_index !== i;
      });
      return { card: delete_card };
    }

    default:
      return state;
  }
}
