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
  const productId = new URLSearchParams(url.search).get('fId'); // الحصول على fId كـ string
  
  fetch('food_info.json')
    .then(response => response.json())
    .then(data => {
      // البحث عن المنتج باستخدام id بعد التأكد أنه كـ string
      const product = data.find(item => item.id === productId);
      
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

// تحميل التعليقات من ملف JSON
function loadComments() {
  const url = new URL(window.location.href);
  const productId = new URLSearchParams(url.search).get('fId');
  const commentStatus = new URLSearchParams(url.search).get('comment_status');
// إذا كان التعليق ناجحًا، نعرض إشعار النجاح
if (commentStatus === 'success') {
  console.log('تم إرسال التعليق بنجاح!');
} else if (commentStatus === 'failure') {
  console.log('فشل في إرسال التعليق. يرجى المحاولة مرة أخرى.');
}
  fetch('comments.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('فشل في تحميل الملف');
      }
      return response.json();
    })
    .then(comments => {
      const commentsContainer = document.getElementById('comments-container');
      commentsContainer.innerHTML = '';  

      if (comments[productId]) {
        comments[productId].forEach(comment => {
          const commentElement = document.createElement('div');
          commentElement.classList.add('comment');
          commentElement.innerHTML = `
            <div class="comment-text">${comment.text}</div>
          `;

          commentsContainer.appendChild(commentElement);
        });
      }
    })
    .catch(error => {
      console.error('Error loading comments:', error);
    });
}

window.onload = function() {
  fetchData(); 
  loadComments();
};
