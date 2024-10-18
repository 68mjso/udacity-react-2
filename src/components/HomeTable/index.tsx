import { Question } from "@models/Question";
import { User } from "@models/User";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMemo } from "react";
export default function HomeTable({
  headers = [],
  rows = [],
  users = [],
  onSelectQuestion,
}: {
  headers: Array<string>;
  rows: Array<Question>;
  answered: Array<string>;
  users: Array<User>;
  onSelectQuestion: (e: Question) => void;
}) {
  const convertTimeStamp = useMemo(
    () => (timestamp: number) => {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;
    },
    []
  );
  const getUsername = (id: string) => {
    return users?.find((e) => e.id === id)?.name ?? "";
  };
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {headers.map((e: string, i: number) => (
            <TableCell key={`table-header-${i}`}>{e}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((e: Question, i: number) => (
          <TableRow
            key={`row-${i}`}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {e.id}
            </TableCell>
            <TableCell> {getUsername(e?.author ?? "")}</TableCell>
            <TableCell>{convertTimeStamp(e.timestamp)}</TableCell>
            <TableCell width="100px">
              <Button
                variant="contained"
                color="primary"
                onClick={() => onSelectQuestion(e)}
              >
                Detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
