function updatePrice() {
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('product-price').getAttribute('data-price'));
  const totalPrice = price * quantity;

  // تصحيح استخدام النص داخل innerHTML باستخدام القوسين الصحيحين
  document.getElementById('product-price').innerHTML = `${totalPrice.toFixed(2)} <img src="img/ryal.png" style="width: 20px; height: 20px; vertical-align: middle;">`;
}

function addToCart() {
  const productId = document.getElementById('product-id').value;
  const productTitle = document.getElementById('product-title').innerText;
  const price = parseFloat(document.getElementById('product-price').getAttribute('data-price'));
  const quantity = parseInt(document.getElementById('quantity').value);
  const totalPrice = price * quantity;
  
  // الحصول على رابط الصورة
  const productImage = document.getElementById('product-image').src; // افترض أن هناك عنصر <img> مع id="product-image"
  
  const cartItem = {
      productId,
      productTitle,
      price,
      quantity,
      totalPrice,
      productImage // إضافة رابط الصورة
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(cartItem);
  localStorage.setItem('cart', JSON.stringify(cart));

  // عرض الإشعار
  showToast();
}

function showToast() {
  const toastElement = document.getElementById('toast');
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

function fetchData() {
  const url = new URL(window.location.href);
  const index = new URLSearchParams(url.search).get('fId'); 

  fetch('food_info.json')
    .then(response => response.json())
    .then(data => {
      const product = data[parseInt(index)];
      if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-title').innerText = product.food_name;
        document.getElementById('product-price').innerText = `${product.price} ريال`;
        document.getElementById('product-price').setAttribute('data-price', product.price);
        document.getElementById('product-description').innerText = product.description || 'لا يوجد وصف لهذا المنتج.';
        document.getElementById('product-image').src = product.images;
        updatePrice();
      } else {
        alert('لم يتم العثور على المنتج.');
      }
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
}

window.onload = function() {
  fetchData(); 
};
