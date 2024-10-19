import { User } from "@models/User";
import { Avatar, Box, Button, Link, Typography } from "@mui/material";
import * as Router from "react-router-dom";
import { stringAvatar } from "../../utilities/utils";

export default function Navbar({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void;
}) {
  return (
    <Box position="absolute" top={0} left={0} width="100%" boxShadow={1}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" px={4} gap={4} alignItems="center">
          <Link
            component={Router.Link}
            to="/"
            underline="none"
            color="#212121"
            fontWeight="bold"
          >
            Home
          </Link>
          <Link
            component={Router.Link}
            to="/leaderboard"
            underline="none"
            color="#212121"
            fontWeight="bold"
          >
            Leaderboard
          </Link>
          <Link
            component={Router.Link}
            to="/add"
            underline="none"
            color="#212121"
            fontWeight="bold"
          >
            Add
          </Link>
        </Box>
        <Box
          display="flex"
          p={2}
          gap={4}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box display="flex" gap={2} alignItems="center">
            <Typography>{user?.name ?? ""}</Typography>
            <Avatar
              {...stringAvatar(user?.id ?? "")}
              sx={{ width: 35, height: 35 }}
            />
          </Box>
          <Button color="error" variant="contained" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
