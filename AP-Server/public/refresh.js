

const socket = io();


socket.on("products", (data) => {
    const template = data
        .map(
            (each) => `
        <div class="col-10 col-sm-6 col-md-4 col-xl-3 p-4 d-flex align-items-stretch">
            <div class="card__products">
                <img src=${each.photo} alt=${each.title} class="img-fluid" />
                <div class="card__products--data">
                    <h5 class="card-title">${each.title}</h5>
                    <p class="card-text">USD ${each.price}</p>
                    <p class="card-text">STOCK: ${each.stock}</p>
                    <button type="button" class="card__products--add"><i class="bi bi-cart"></i>
                        ADD TO CART!</button>
                </div>
            </div>
        </div>
      `
        )
        .join("");
    document.querySelector("#products").innerHTML = template;
});