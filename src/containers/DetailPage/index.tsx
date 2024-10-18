import Root from "@containers/Root";
import { Question } from "@models/Question";
import { User } from "@models/User";
import { Box, Button, Container, Typography } from "@mui/material";
import store, { setQuestion, setUser, setUsers } from "@utilities/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
export default function DetailPage() {
  let { question_id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<string>("");
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const question = useSelector(
    (state: { app: { question: Question } }) => state.app.question
  );
  const questions = useSelector(
    (state: { app: { questions: Array<Question> } }) => state.app.questions
  );
  const user = useSelector((state: { app: { user: User } }) => state.app.user);
  const users = useSelector(
    (state: { app: { users: Array<User> } }) => state.app.users
  );

  const isLogin = useSelector(
    (state: { app: { isLogin: boolean } }) => state.app.isLogin
  );

  const getAnswerInfo = () => {
    const optionOneCount = question?.optionOne?.votes?.length ?? 0;
    const optionTwoCount = question?.optionTwo?.votes?.length ?? 0;
    const total = optionOneCount + optionTwoCount;
    const optionOne = question?.optionOne?.text ?? "";
    const optionTwo = question?.optionTwo?.text ?? "";
    switch (answer) {
      case optionOne:
        return `${optionOneCount} (${
          total == 0 ? 0 : Number((optionOneCount / total) * 100).toFixed(2)
        }%)`;
      case optionTwo:
        return `${optionTwoCount} (${
          total == 0 ? 0 : Number((optionTwoCount / total) * 100).toFixed(2)
        }%)`;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!isLogin) {
      return;
    }
    if (!questions || questions.length === 0) {
      return;
    }
    const ques = questions.find((e) => e.id === question_id);
    if (!ques) {
      navigate("/404");
      return;
    }
    if (!question) {
      store.dispatch(setQuestion(ques));
      return;
    }
    if (!user) {
      return;
    }
    const votedOptionOne = question?.optionOne?.votes ?? [];
    const votedOptionTwo = question?.optionTwo?.votes ?? [];
    const submit =
      votedOptionOne.indexOf(user?.id ?? "") !== -1 ||
      votedOptionTwo.indexOf(user?.id ?? "") !== -1;
    if (!submit) {
      return;
    }
    const id = question?.id ?? "";
    const ansId: string = user?.answers[id];
    if (ansId !== "optionOne" && ansId !== "optionTwo") {
      return;
    }
    const ans = question[ansId].text;
    setAnswer(ans);
    setIsSubmited(submit);
  }, [question, user, questions, isLogin]);

  const onSubmitAnswer = () => {
    if (answer.trim() === "") {
      return;
    }
    setIsSubmited(true);
    const userAnswers = { ...user.answers };
    userAnswers[`${question.id}`] =
      answer === question?.optionOne?.text ? "optionOne" : "optionTwo";
    const newUser = {
      ...user,
      answers: userAnswers,
    };
    store.dispatch(setUser(newUser));
    const userArr: Array<any> = [...users];
    const userIndex = userArr.map((e) => e.id).indexOf(user.id);
    userArr[userIndex] = newUser;
    store.dispatch(setUsers(userArr));
  };

  const getUsername = (id: string) => {
    return users?.find((e) => e.id === id)?.name ?? "";
  };

  return (
    <Root>
      <Container>
        {question && user && (
          <Box display="flex" gap={4} flexDirection="column" pt={8}>
            <Typography>
              Created By: <strong>{getUsername(question?.author ?? "")}</strong>
            </Typography>
            <Typography id="" variant="h4" component="h2">
              Would you rather
            </Typography>
            {question ? (
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color={
                    answer === question?.optionOne?.text ? "success" : "warning"
                  }
                  fullWidth
                  onClick={() => setAnswer(question?.optionOne?.text)}
                  disabled={isSubmited && answer !== question?.optionOne?.text}
                >
                  {question?.optionOne?.text}
                </Button>
                <Typography>OR</Typography>
                <Button
                  variant="contained"
                  color={
                    answer === question?.optionTwo?.text ? "success" : "warning"
                  }
                  fullWidth
                  onClick={() => setAnswer(question?.optionTwo?.text)}
                  disabled={isSubmited && answer !== question?.optionTwo?.text}
                >
                  {question?.optionTwo?.text}
                </Button>
              </Box>
            ) : null}
            <Typography>
              Your Answer: <strong>{answer}</strong>
            </Typography>
            <Box display="flex" width="100%" gap={2} justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmitAnswer}
                disabled={isSubmited}
              >
                Submit
              </Button>
            </Box>
            {isSubmited && (
              <>
                <Typography color="success" alignSelf="center">
                  Thanks you for voting!
                </Typography>
                <Box>
                  <Typography>
                    Number of people voted the same: {getAnswerInfo()}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        )}
      </Container>
    </Root>
  );
}
