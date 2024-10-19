import Root from "../Root";
import { Question } from "../../models/Question";
import { User } from "../../models/User";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { formatQuestion } from "../../utilities/api";
import store, { setQuestions } from "../../utilities/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddPage = () => {
  const [optionOne, setOptionOne] = useState<string>("");
  const [optionTwo, setOptionTwo] = useState<string>("");
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const navigate = useNavigate();
  const questionList = useSelector(
    (state: { app: { questions: Array<Question> } }) => state.app.questions
  );
  const user = useSelector((state: { app: { user: User } }) => state.app.user);

  const onSubmitQuestion = () => {
    const arr: Array<Question> = [...questionList];
    const newQuestion = formatQuestion({
      author: user?.id ?? "",
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    });
    arr.push(newQuestion);
    store.dispatch(setQuestions(arr));
    setIsSubmited(true);
  };

  useEffect(() => {
    if (!isSubmited) {
      return;
    }
    navigate("/");
  }, [questionList]);

  return (
    <Root>
      <Container>
        {user && (
          <Box display="flex" gap={4} flexDirection="column" pt={8}>
            <Typography id="" variant="h4" component="h2">
              Would you rather
            </Typography>
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              gap={2}
              alignItems="center"
            >
              <TextField
                name="optionOne"
                value={optionOne}
                onChange={(e) => setOptionOne(e.target.value)}
                variant="outlined"
                fullWidth
                label="Option One"
                data-testid="option-one-input"
              />
              <Typography>OR</Typography>
              <TextField
                name="optionTwo"
                value={optionTwo}
                onChange={(e) => setOptionTwo(e.target.value)}
                variant="outlined"
                label="Option Two"
                data-testid="option-two-input"
                fullWidth
              />
            </Box>
            <Box display="flex" width="100%" gap={2} justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmitQuestion}
                disabled={isSubmited}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Root>
  );
};
export default AddPage;
