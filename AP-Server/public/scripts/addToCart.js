const selector = document.querySelector(".addToCart");
selector.addEventListener("click", async (product) => {
    try {
        const data = { product_id: product.target.id };
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        let response = await fetch("/api/orders", opts);
        response = await response.json();

        if (response.statusCode === 401) {
            Swal.fire({
                icon: "warning",
                title: "¡PLEASE, FIRST LOG IN OR REGISTER!",
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            location.replace("/orders");
        }
    } catch (error) {
        alert(error.message);
    }
});
