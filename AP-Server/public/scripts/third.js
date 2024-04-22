import winstonLog from "../utils/logger/index.js";
const google = document.querySelector("#google");
google.addEventListener("click", async () => {
    try {
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        let response = await fetch("/api/sessions/google", opts);
        response = await response.json();
        winstonLog.INFO(response);
        //response.session && location.replace("/");
    } catch (error) {
        //alert(error.message);
        Swal.fire({
            icon: "warning",
            title: error.message,
            showConfirmButton: false,
            timer: 2000,
        });
    }
});

const github = document.querySelector("#github");
github.addEventListener("click", async () => {
    try {
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        let response = await fetch("/api/sessions/github", opts);
        response = await response.json();
        winstonLog.INFO(response);
        //response.session && location.replace("/");
    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: error.message,
            showConfirmButton: false,
            timer: 2000,
        });
    }
});
