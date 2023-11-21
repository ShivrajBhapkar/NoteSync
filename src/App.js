import "./App.css";
import { Provider } from "react-redux";
import store from "./utils/store";
import AppRouter from "./routerConfig";
function App() {
    return (
        <Provider store={store}>
            <div>
                <AppRouter />
            </div>
        </Provider>
    );
}

export default App;
