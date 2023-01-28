var product = document.getElementById("product");

firebase
  .database()
  .ref("Dishes")
  .once("value", (snap) => {
    // console.log(snap.toJSON())

    var value = Object.values(snap.toJSON()); //object to array
    // console.log(value)

    value.map((v, i) => {
      console.log(v);
      product.innerHTML += `
        <tbody class="text-white">
        <tr>
            <td>${i + 1}</td>
            <td>${v.Dish_Name}</td>
            <td>${v.Price}</td>
            <td>${v.Qty}</td>
            <td>
            <img src=${v.img_Url} style="width:200px;height:100px" alt="">
          </td>
          <td>
          <button id=${
            v.Product_Key
          } ONCLICK ="edit_pro(this)" style="background-color:skyblue; color:black; border:none; padding: 6px 25px;">Edit</button>
        </td>
          <td>  <button class"btn btn-danger" id=${
            v.Product_Key
          } ONCLICK ="delete_pro(this)" style="background-color:red; color:white; border:none; padding: 6px 15px;"> Delete</button></td>
        </tr>
        <tbody/>`;
    });
  });

async function delete_pro(e) {
  console.log(e.id);
  await firebase.database().ref("Dishes").child(e.id).remove();
  window.location.reload();
}

function edit_pro(e) {
  localStorage.setItem("Current_Pid", e.id);
  window.location.href = "Edit_Product.html";
}
