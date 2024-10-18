import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store, { setUser } from "@utilities/store";
import { User } from "@models/User";
import { useSelector } from "react-redux";
export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const users = useSelector(
    (state: { app: { users: Array<User> } }) => state.app.users
  );
  const onLogin = () => {
    const users = store.getState()?.app?.users;
    if (!users || users.length <= 0) {
      setError("Missing all users info.");
      return;
    }
    const user = users.find(
      (e: User) => e.id === username && e.password === password
    );
    if (!user) {
      setError("Wrong id or password");
      return;
    }
    store.dispatch(setUser(user));
    navigate("/home");
    setLoading(false);
  };
  useEffect(() => {
    if (error && error.trim() !== "") {
      setError("");
    }
  }, [username, password]);
  useEffect(() => {
    if (!users || users.length <= 0) {
      return;
    }
    setLoading(false);
  }, [users]);
  return (
    <Box
      width="100%"
      height="calc(100vh - 16px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="400px"
        padding={4}
        boxShadow={1}
        gap={4}
      >
        <Typography variant="h1" fontSize="1.5rem" fontWeight="bold">
          Login
        </Typography>
        <Select
          name="username"
          value={username}
          onChange={(e) => {
            const user = users.find((user: User) => user.id === e.target.value);
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
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
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
    </Box>
  );
}
