const selectors = document.querySelectorAll(".deleteButton");
selectors.forEach((each) =>
    each.addEventListener("click", async (product) => {
        try {
            const url = "/api/orders/" + product.target.id;
            const opts = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            };
            let response = await fetch(url, opts);
            response = await response.json();
            if (response.statusCode === 200) {
                // alert(response.message);
                Swal.fire({
                    title: "DELETED",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
                //location.reload();
            }
        } catch (error) {
            //alert(error.message);
            Swal.fire({
                icon: "warning",
                title: error.message,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    })
);
