document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.dataset.productId;

      try {
        const response = await fetch(`/add-to-cart/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error("Error al agregar el producto al carrito", error);
      }
    });
  });
});
