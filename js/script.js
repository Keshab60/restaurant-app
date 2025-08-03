const swiper = new Swiper('.slider-wrapper', {
    
    //  loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    //  breakpoints: {
    //   0:{
    //     slidesperview: 1
    //   },
    //   620:{
    //     slidesperview: 1
    //   },
    //   1024:{
    //     slidesperview: 1
    //   },
    // }
  
    //  And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });