import "./js/utils/overlayClickHandler.js";
import "./js/utils/closePopupHandler.js";
import { checkConnection } from "./js/firestore/checkConnection.js";
import "./js/startCoroutine.js";
import "./js/noConnectionError.js";

await checkConnection();
