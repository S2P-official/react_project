import router from "next/router";

const placeOrder = async () => {
  try {
    const response = await fetch("https://www.fictilecore.com/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        total,
        date: new Date(),
        status: "Pending",
      }),
    });

    if (!response.ok) {
      throw new Error("Order failed");
    }

    // Optionally clear cart
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    router.push("/homepages/ordersuccess");
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Something went wrong. Try again.");
  }
};
