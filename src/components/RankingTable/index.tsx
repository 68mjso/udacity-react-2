import { User } from "@models/User";
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { stringAvatar } from "@utilities/utils";
export default function RankingTable({
  headers = [],
  rows = [],
}: {
  headers: Array<string>;
  rows: Array<User>;
}) {
  const getNumberAnswers = (user: User) => {
    return Object.keys(user?.answers).length ?? 0;
  };
  const getNumberQuestions = (user: User) => {
    return user?.questions?.length ?? 0;
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
        {rows.map((e: User, i: number) => (
          <TableRow
            key={`ranking-row-${i}`}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {`# ${i + 1}`}
            </TableCell>
            <TableCell component="th" scope="row">
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignItems="center"
              >
                <Avatar
                  {...stringAvatar(e?.name ?? "")}
                  sx={{ width: 35, height: 35 }}
                />
                <Typography>{e.name}</Typography>
              </Box>
            </TableCell>
            <TableCell>{getNumberAnswers(e)}</TableCell>
            <TableCell>{getNumberQuestions(e)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
