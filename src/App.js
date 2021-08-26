import './App.css';
import Home from './pages/Home'
import Toast from "./component/Toast";

function App() {
    return (
        <div className={"App"}>
            <Home/>
            <Toast ref={(ref) => {
                Toast.setRef(ref)
            }}/>
        </div>
    );
}

export default App;
