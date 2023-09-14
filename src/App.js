import "./App.css";
import Head from "./components/Head";
import Body from "./components/Body";
import Demo from "./components/Demo"
import { Provider } from "react-redux";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MaineContainer from "./components/MaineContainer";
import WatchPage from "./components/WatchPage";
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <MaineContainer />,
            },
            {

                path: "watch",
                element: <WatchPage />,
            },
            {
                path: "demo",
                element:<Demo/>
            }
        ],
    },
]);
function App() {
    return (
        <Provider store={store}>
            <div>
            <Head />
                <RouterProvider router={appRouter} />
            </div>
        </Provider>
    );
}

export default App;
