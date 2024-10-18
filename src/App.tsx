import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./containers/HomePage";
import { useEffect } from "react";
import { _getQuestions, _getUsers } from "@utilities/api";
import store, { setQuestions, setUsers } from "@utilities/store";
import AddPage from "@containers/AddPage";
import DetailPage from "@containers/DetailPage";
import NotFoundPage from "@containers/NotFoundPage";
import LeaderBoardPage from "@containers/LeaderBoardPage";

function App() {
  useEffect(() => {
    _getUsers().then((res: any) => {
      let arr = [];
      for (let key of Object.keys(res)) {
        arr.push(res[key]);
      }
      store.dispatch(setUsers(arr));
    });
    _getQuestions().then((res: any) => {
      let arr = [];
      for (let key of Object.keys(res)) {
        arr.push(res[key]);
      }
      store.dispatch(setQuestions(arr));
    });
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/leaderboard",
      element: <LeaderBoardPage />,
    },
    {
      path: "/add",
      element: <AddPage />,
    },
    {
      path: "/question",
      element: <DetailPage />,
    },
    {
      path: "/question/:question_id",
      element: <DetailPage />,
    },
    {
      path: "/404",
      element: <NotFoundPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
