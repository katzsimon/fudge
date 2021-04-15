import Fudge from "../fudge";
import "../styles/fudge.scss";
import "../styles/fudge-dark2.scss";
import "../styles/fudge-firefox.scss";

const fudges = document.querySelectorAll(".fudge"); // eslint-disable-next-line no-console
console.log("Fudge Targets: ", fudges);

fudges.forEach((item) => {
    // eslint-disable-next-line no-new,no-unused-vars
    const FudgeInstance = new Fudge(item, {
        mode: "select",
    });
});
