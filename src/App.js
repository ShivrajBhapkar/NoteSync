import "./App.css";
import Head from "./components/Head";
import { Provider } from "react-redux";
import store from "./utils/store";
import { RouterProvider} from "react-router-dom";
import appRouter from "./routerConfig";
import Sidebar from "./components/newSidebar";
function App() {
    return (
        <Provider store={store}>
            <div>
                <RouterProvider router={appRouter} />
            </div>
        </Provider>
    );
}

export default App;
