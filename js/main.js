async function fetchProperties(buildType, containerId) {
  try {
    const response = await fetch('food_info.json');
    const data = await response.json();

    if (Array.isArray(data)) {
      const cardContainer = document.getElementById(containerId);
      cardContainer.innerHTML = ''; // مسح أي بيانات موجودة
      data.forEach((item, index) => {
        if (!buildType || item.category === buildType) { // تصفية بناءً على نوع العقار
          const card = document.createElement("div");
          card.className = "card-item swiper-slide"; 
          card.style.background = '#fff';
                  // التقييم الافتراضي (يمكن أن يكون عدد النجوم مثلاً من 0 إلى 5)
          const rating = item.rating || 0; // التقييم الافتراضي 0
          const stars = generateStars(rating); // إنشاء النجوم بناءً على التقييم

          card.innerHTML = `
            <img src="${item.images}" class="card-image">
            <div class="card-body">
              <h5 class="card-title">${item.food_name}</h5>
              <p style="color:#aaa;" class="card-text">${item.price} ر.ي</p>
              <div class="rating">
                ${stars} <!-- عرض النجوم هنا -->
              </div>
              <a href="details.html?fId=${index}" class="btn btn-outline-primary">تفاصيل</a>
            </div>
          `;
          cardContainer.appendChild(card);
        }
      });
      initializeSwiper();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

// دالة لإنشاء النجوم بناءً على التقييم
function generateStars(rating) {
let starsHtml = '';
for (let i = 1; i <= 5; i++) {
starsHtml += '<i class="bi bi-star-fill" style="color:#3ec15b;"></i>'; // نجمة فارغة
}
return starsHtml;
}

async function loadCarouselImages() {
  try {
    const response = await fetch('carousel_img.json');
    const data = await response.json(); // البيانات التي تم جلبها من الـ JSON
    const carouselInner = document.getElementById('carousel-inner');
    
    // تحميل الصور فقط في الكاروسيل
    data.forEach((item, index) => {  // استخدام 'data' بدلاً من 'images'
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }

      const imgElement = document.createElement('img');
      imgElement.src = item.image; // تأكد من أن العنصر 'image' في JSON صحيح
      imgElement.classList.add('d-block', 'w-100', 'hero-carousel-img');
      imgElement.alt = 'مطعم الزمن القديم للمأكولات الشعبية';

      carouselItem.appendChild(imgElement);
      carouselInner.appendChild(carouselItem);
    });
  } catch (error) {
    console.error("خطأ في تحميل الصور:", error);
  }
}

  

  async function fetchAllcat() {
    fetchProperties(null, "card-all"); // عرض جميع العقارات
  }

  async function fetchcat1() {
    fetchProperties('اصناف مميزة',"card-container"); // عرض المنازل فقط
  }

  async function fetchcat2() {
    fetchProperties('مطبق', "card-container2"); // عرض الأراضي فقط
  }

  async function fetchcat3() {
    fetchProperties('عريكة', "card-container3"); // عرض الشقق فقط
  }

  async function fetchcat4() {
    fetchProperties('معصوب', "card-container4"); // عرض الشقق فقط
  }
  async function fetchcat5() {
    fetchProperties('فول', "card-container5"); // عرض الشقق فقط
  }
  async function fetchcat6() {
    fetchProperties('فاصولياء', "card-container6"); // عرض الشقق فقط
  }
  async function fetchcat7() {
    fetchProperties('فطائر', "card-container7"); // عرض الشقق فقط
  }
  async function fetchcat8() {
    fetchProperties('وجبات منوعة', "card-container8"); // عرض الشقق فقط
  }

  // Initializing Swiper
  function initializeSwiper() {
    const swiper = new Swiper('.slider-wrapper', {
      loop: true,
      grabCursor: true,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }

  window.onload = function() {
    loadCarouselImages();
    fetchAllcat(); // عرض جميع العقارات
    fetchcat1(); 
    fetchcat2();
    fetchcat3();
    fetchcat4();
    fetchcat5();
    fetchcat6();
    fetchcat7();
    fetchcat8();
  };
