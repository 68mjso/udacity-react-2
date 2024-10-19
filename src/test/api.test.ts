import {
  _getUsers,
  _getQuestions,
  formatQuestion,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utilities/api";

describe("Test _getUsers", () => {
  it("Return list of users", async () => {
    const listUsers = await _getUsers();
    expect(typeof listUsers).toBe("object");
    expect(listUsers).not.toBeUndefined();
    expect(listUsers).not.toBeNull();
  });

  it("The list key is the same as user id", async () => {
    const listUsers = await _getUsers();
    for (let key of Object.keys(listUsers)) {
      const user: any = listUsers[key];
      if (key !== "id") {
        continue;
      }
      expect(user[key]).toBe(key);
    }
  });

  it("The user have the the correct properties", async () => {
    const listUsers = await _getUsers();
    for (let key of Object.keys(listUsers)) {
      const user: any = listUsers[key];
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("avatarURL");
      expect(user).toHaveProperty("answers");
      expect(user).toHaveProperty("questions");
    }
  });
});

describe("Test _getQuestions", () => {
  it("Return list of questions", async () => {
    const listQuestions = await _getQuestions();
    expect(typeof listQuestions).toBe("object");
    expect(listQuestions).not.toBeUndefined();
    expect(listQuestions).not.toBeNull();
  });

  it("The list key is the same as question id", async () => {
    const listQuestions = await _getQuestions();
    for (let key of Object.keys(listQuestions)) {
      const question: any = listQuestions[key];
      if (key !== "id") {
        continue;
      }
      expect(question[key]).toBe(key);
    }
  });

  it("The question have the the correct properties", async () => {
    const listQuestions = await _getQuestions();
    for (let key of Object.keys(listQuestions)) {
      const question: any = listQuestions[key];
      expect(question).toHaveProperty("id");
      expect(question).toHaveProperty("author");
      expect(question).toHaveProperty("timestamp");
      expect(question).toHaveProperty("optionOne");
      expect(question).toHaveProperty("optionTwo");
    }
  });

  it("Each option in question have the correct properties", async () => {
    const listQuestions = await _getQuestions();
    for (let key of Object.keys(listQuestions)) {
      const question: any = listQuestions[key];
      if (key !== "optionOne" && key !== "optionTwo") {
        continue;
      }
      expect(question[key]).toHaveProperty("votes");
      expect(question[key]).toHaveProperty("text");
    }
  });
});

describe("Test formatQuestion", () => {
  it("Test Format Question", async () => {
    const question = formatQuestion({
      author: "test_id",
      optionOneText: "test_optionOne",
      optionTwoText: "test_optionTwo",
    });
    expect(question).toHaveProperty("id");
    expect(question).toHaveProperty("author");
    expect(question).toHaveProperty("timestamp");
    expect(question).toHaveProperty("optionOne");
    expect(question).toHaveProperty("optionTwo");

    expect(typeof question.id).toBe("string");
    expect(typeof question.author).toBe("string");
    expect(typeof question.timestamp).toBe("number");
    expect(typeof question.optionOne.text).toBe("string");
    expect(typeof question.optionOne.votes).toBe("object");
    expect(typeof question.optionTwo.text).toBe("string");
    expect(typeof question.optionOne.votes).toBe("object");

    expect(question.author).toBe("test_id");
    expect(question.optionOne.text).toBe("test_optionOne");
    expect(question.optionTwo.text).toBe("test_optionTwo");
  });
});

describe("Test _saveQuestion", () => {
  it("Test Save Question Success", async () => {
    const result: any = await _saveQuestion({
      author: "test_id",
      optionOneText: "test_optionOne",
      optionTwoText: "test_optionTwo",
    }).catch((e) => e);
    for (let key of Object.keys(result)) {
      const question = result[key];
      if (question.author !== "test_id") {
        continue;
      }
      expect(question.optionOne.text).toBe("test_optionOne");
      expect(question.optionTwo.text).toBe("test_optionTwo");
    }
  });

  it("Test Save Question Failed - Missing Author", async () => {
    const result = await _saveQuestion({
      author: null,
      optionOneText: "test_optionOne",
      optionTwoText: "test_optionTwo",
    }).catch((e) => e);
    expect(result).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
  it("Test Save Question Failed - Missing Option One", async () => {
    const result = await _saveQuestion({
      author: "test_id",
      optionOneText: "test_optionOne",
      optionTwoText: null,
    }).catch((e) => e);
    expect(result).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
  it("Test Save Question Failed - Missing Option Two", async () => {
    const result = await _saveQuestion({
      author: "test_id",
      optionOneText: null,
      optionTwoText: "test_optionTwo",
    }).catch((e) => e);
    expect(result).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("Test _saveQuestionAnswer", () => {
  it("Test Save Answer Success", async () => {
    const result = await _saveQuestionAnswer({
      authedUser: "zoshikanlu",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne",
    }).catch((e) => e);
    expect(result).toBe(true);
  });
  it("Test Save Answer Failed - Missing auth user", async () => {
    const result = await _saveQuestionAnswer({
      authedUser: "zoshikanlu",
      qid: null,
      answer: "optionOne",
    }).catch((e) => e);
    expect(result).toBe("Please provide authedUser, qid, and answer");
  });
  it("Test Save Answer Failed - Missing question", async () => {
    const result = await _saveQuestionAnswer({
      authedUser: "zoshikanlu",
      qid: null,
      answer: "optionOne",
    }).catch((e) => e);
    expect(result).toBe("Please provide authedUser, qid, and answer");
  });
  it("Test Save Answer Failed - Missing answer", async () => {
    const result = await _saveQuestionAnswer({
      authedUser: "zoshikanlu",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: null,
    }).catch((e) => e);
    expect(result).toBe("Please provide authedUser, qid, and answer");
  });
});
