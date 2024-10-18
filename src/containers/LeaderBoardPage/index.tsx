import RankingTable from "@components/RankingTable";
import Root from "@containers/Root";
import { User } from "@models/User";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function LeaderBoardPage() {
  const [list, setList] = useState<Array<User>>([]);
  const users = useSelector(
    (state: { app: { users: Array<User> } }) => state.app.users
  );

  useEffect(() => {
    if (!users || users.length <= 0) {
      return;
    }
    const arr = [...users];
    setList(
      arr.sort(
        (a, b) =>
          Object.keys(b?.answers).length - Object.keys(a?.answers).length
      )
    );
  }, [users]);

  return (
    <Root>
      {list && list.length > 0 && (
        <Container>
          <RankingTable
            headers={["Ranking", "User", "Answers", "Created"]}
            rows={list}
          />
        </Container>
      )}
    </Root>
  );
}
