import axios from "axios";

let instance = axios.create();

export default function getHttpInstance() {
    return instance;
}
