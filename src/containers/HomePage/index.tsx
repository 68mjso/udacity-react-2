import HomeTable from "@components/HomeTable";
import Root from "@containers/Root";
import { Question } from "@models/Question";
import { User } from "@models/User";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import store, { setQuestion } from "@utilities/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const [list, setList] = useState<Array<Question>>([]);
  const [listAnswered, setListAnswered] = useState<Array<string>>([]);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const questionList = useSelector(
    (state: { app: { questions: Array<Question> } }) => state.app.questions
  );
  const user = useSelector((state: { app: { user: User } }) => state.app.user);
  const users = useSelector(
    (state: { app: { users: Array<User> } }) => state.app.users
  );
  useEffect(() => {
    setList(questionList ?? []);
  }, [questionList]);

  useEffect(() => {
    const arr: Array<string> = [];
    const userAnswers = user?.answers;
    if (!userAnswers) {
      return;
    }
    for (let key of Object.keys(userAnswers)) {
      arr.push(key);
    }
    setListAnswered(arr);
  }, [user]);

  const onSelectQuestion = (e: Question) => {
    store.dispatch(setQuestion(e));
    navigate(`/question/${e.id}`);
  };

  return (
    <Root>
      <Box display="flex" flexDirection="column" gap={3}>
        <Tabs value={tab} onChange={(_, e) => setTab(e)}>
          <Tab label="Unanswered" />
          <Tab label="Answered" />
        </Tabs>
        {tab === 0 && (
          <HomeTable
            headers={["ID", "Author", "Date Created", ""]}
            rows={list
              .filter((e) => listAnswered.indexOf(e?.id ?? "") === -1)
              .sort((a, b) => b.timestamp - a.timestamp)}
            answered={listAnswered}
            onSelectQuestion={onSelectQuestion}
            users={users}
          />
        )}
        {tab === 1 && (
          <HomeTable
            headers={["ID", "Author", "Date Created", ""]}
            rows={list
              .filter((e) => listAnswered.indexOf(e?.id ?? "") !== -1)
              .sort((a, b) => b.timestamp - a.timestamp)}
            answered={listAnswered}
            onSelectQuestion={onSelectQuestion}
            users={users}
          />
        )}
      </Box>
    </Root>
  );
}
