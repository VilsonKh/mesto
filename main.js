




let editBtn = document.querySelector(".profile__btn-edit");
let addPlaceBtn = document.querySelector(".profile__btn-add");
let popups = document.querySelectorAll(".popup");
let closeBtns = document.querySelectorAll(".popup__btn-close");
let popupsArr = Array.from(popups);
let popupProfile = document.querySelector(".popup-profile");
let popupPlace = document.querySelector('.popup-place');

editBtn.addEventListener("click", () => {
  popupProfile.classList.add("active");
  document.body.classList.add("no-scroll");
});

addPlaceBtn.addEventListener("click", () => {
    popupPlace.classList.add("active");
    document.body.classList.add("no-scroll");
  });

let closeBtnArr = Array.from(closeBtns).forEach((element) => {
  element.addEventListener("click", () =>
    popupsArr.forEach((popup) => {
      popup.classList.remove("active");
      document.body.classList.remove("no-scroll");
    })
  );
});

let galleryImg = document.querySelectorAll('.card > img')


let popupImg = document.querySelector('.popup-image')

galleryImg.forEach((img)=>{
    img.addEventListener('click',()=>{
        popupImg.classList.add('active')
    }) 
})

let likeBtns = document.querySelectorAll('.card__btn-likes')
likeBtns.forEach((btn)=>{
    btn.addEventListener('click',(evt)=>{
        evt.target.classList.toggle('checked')
    })
})

let deleteBtns = document.querySelectorAll('.card__btn-del')

deleteBtns.forEach(btn => {
    btn.addEventListener('click',function(evt){
        evt.target.closest('.card').remove()
    })
});











// // POPUP-PROFILE

// let popupProfile = document.querySelector(".popup-profile");
// let closeBtns = document.querySelectorAll(".popup__btn-close");
// let closeBtnsArr = Array.from(closeBtns)
// let popups = document.querySelectorAll('.popup')
// let popup = Array.from(popups)

// closeBtnsArr.forEach
// function open() {
//   tag.classList.add("active");
//   document.body.classList.add("no-scroll");
// }

// function close(tag) {
//   tag.classList.remove("active");
//   document.body.classList.remove("no-scroll");
// }

// let editBtn = document.querySelector(".profile__btn-edit");

// editBtn.addEventListener("click", function () {
//   open(popupProfile);
// });

// document.addEventListener("keydown", function (evt) {
//   if (evt.keyCode == 27) {
//     close(popupProfile);
//   }
// });

// // POPUP-PLACE

// let addPhotoBtn = document.querySelector('.profile__btn-add')
// let popupPlace = document.querySelector('.popup-place')

// addPhotoBtn.addEventListener('click',()=>{
//     open(popupPlace)
// })

// // closeBtn.addEventListener('click',()=>{
// //     close(pupupPlace)
// // })
