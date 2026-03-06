const API = "http://localhost:5000/products";

async function loadProducts() {
  const res = await fetch(API);
  const data = await res.json();

  const table = document.getElementById("productTable");
  table.innerHTML = "";

  data.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.quantity}</td>
        <td>${p.price}</td>
        <td>${p.supplier}</td>
        <td>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function addProduct() {
  const product = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    quantity: document.getElementById("quantity").value,
    price: document.getElementById("price").value,
    supplier: document.getElementById("supplier").value
  };

  console.log(product); // check values

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  loadProducts();
}
async function deleteProduct(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadProducts();
}

loadProducts();