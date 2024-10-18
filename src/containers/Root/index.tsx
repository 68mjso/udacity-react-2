import Navbar from "@components/Navbar";
import { User } from "@models/User";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import store, { setIsLogin, setUser } from "@utilities/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Root(props: { children: React.ReactNode }) {
  let { question_id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: { app: { user: User } }) => state.app.user);
  const users = useSelector(
    (state: { app: { users: Array<User> } }) => state.app.users
  );
  const isLogin = useSelector(
    (state: { app: { isLogin: boolean } }) => state.app.isLogin
  );
  const onLogout = () => {
    window.location.href = "/";
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onLogin = () => {
    const users = store.getState()?.app?.users;
    if (!users || users.length <= 0) {
      return;
    }
    const user = users.find(
      (e: User) => e.id === username && e.password === password
    );
    if (!user) {
      return;
    }
    store.dispatch(setUser(user));
    setLoading(false);
    store.dispatch(setIsLogin(true));
    handleClose();
  };
  useEffect(() => {
    if (!users || users.length <= 0) {
      return;
    }
    setLoading(false);
  }, [users]);
  useEffect(() => {
    if (!isLogin) {
      handleOpen();
      return;
    }
  }, []);
  return (
    <Box position="relative" px={4}>
      {user && (
        <>
          <Navbar user={user} onLogout={onLogout} />
          <Box pt={10}>{props.children}</Box>
        </>
      )}
      <Dialog disableEscapeKeyDown open={open} fullWidth maxWidth="sm">
        <DialogTitle id="">Login</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={4}>
            <Select
              name="username"
              value={username}
              onChange={(e) => {
                const user = users.find(
                  (user: User) => user.id === e.target.value
                );
                setUsername(e.target.value);
                setPassword(user?.password ?? "");
              }}
              id="loginUsername"
              variant="outlined"
              fullWidth
              disabled={loading}
              size="small"
            >
              {users.map((e: User, i: number) => (
                <MenuItem key={`username-menu-${i}`} value={e?.id ?? ""}>
                  {e.id}
                </MenuItem>
              ))}
            </Select>
            <TextField
              name="password"
              value={password}
              id="loginPassword"
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              fullWidth
              disabled
            />
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setLoading(true);
                onLogin();
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size="25px" /> : "Login"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
