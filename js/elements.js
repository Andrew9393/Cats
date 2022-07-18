window.addEventListener("load", function(){
  let select = function(){
    let selectHeader = document.querySelectorAll('.select__header')
    let selectItem = document.querySelectorAll('.select__item')
    let selectBody = document.querySelector('.select__body')
    let selectBodyLimit = document.querySelector('.select-limit .select__body')

    selectHeader.forEach(item => {
      item.addEventListener('click' , selectToggle)
    })

    // selectItem.forEach(item => {
    //   item.addEventListener('click' , selectChoose)
    // })

    selectBodyLimit.addEventListener('click' ,(e) => {
      if(e.target.classList.contains('select__item')){
        let limit = selectChooseLimit.bind(e.target)
        limit()
      }
    })

    selectBody.addEventListener('click' ,(e) => {
      console.log(e.target)
      if(e.target.classList.contains('select__item')){
        let x = selectChooseBreeds.bind(e.target, e.target.innerText)
        x()
      }
    })
     

    function selectToggle() {
      this.parentElement.classList.toggle('select__is-active')
    }

    function selectChoose() {
      let text = this.innerText,
          select = this.closest('.select')
      let currentText = select.querySelector('.select__current')
      currentText.innerText = text;
      select.classList.remove('select__is-active')
    }

    function selectChooseLimit() {
      let text = this.innerText,
          select = this.closest('.select')
      let currentText = select.querySelector('.select__current')
      currentText.innerText = text;
      select.classList.remove('select__is-active')
      console.log(this.dataset.limit)
      currentText.addEventListener('change', filterLimit(this.dataset.limit))
    }

    function selectChooseBreeds() {
      let text = this.innerText,
          select = this.closest('.select')
      let currentText = select.querySelector('.select__current')
      currentText.innerText = text;
      select.classList.remove('select__is-active')
      currentText.addEventListener('change', filterBreeds(this.innerText))
      
    }

    function filterBreeds(name) {
      let galleryItemName = document.querySelectorAll('.gallery__button')
      galleryItemName.forEach(el => {
        el.closest('.gallery__item').classList.remove('hide')
        el.closest('.gallery__item').classList.remove('gallery__item-active3')
        if(el.innerText !== name.toUpperCase()){
          el.closest('.gallery__item').classList.add('hide')
        } else {
          el.closest('.gallery__item').classList.add('gallery__item-active')
        }
        if(name === 'All breeds'){
          el.closest('.gallery__item').classList.remove('hide')
        }
      })
    }

    function filterLimit(num) {
      let galleryItem = document.querySelectorAll('.gallery__item')

      galleryItem.forEach(el => {
        el.classList.add('hide')
        el.classList.remove('gallery__item-active')
      })
      for (let i = 0; i < num; i++){
        galleryItem[i].classList.add('gallery__item-active')
      }
    }


  }
  select()
})


$(document).ready(function(){

  $('.info-slider').slick({
    dots: true,
    arrows:false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  }); 

  $('.btn-upload').click(() => {
    $('.modal-upload').addClass('modal-upload__active')
    $('body').addClass('body__active')
  })

  $('.btn-close').click(() => {
    $('.modal-upload').removeClass('modal-upload__active')
    $('body').removeClass('body__active')
  })
})

