const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.getAttribute("data-product-id");
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        console.log("Producto agregado");
      } else {
        console.error("error al agregar");
      }
    } catch (error) {
      console.error(error);
    }
  });
});
