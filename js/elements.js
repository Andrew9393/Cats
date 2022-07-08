console.log('cl');
window.addEventListener("load", function(){
  let select = function(){
    let selectHeader = document.querySelectorAll('.select__header')
    let selectItem = document.querySelectorAll('.select__item')

    selectHeader.forEach(item => {
      item.addEventListener('click' , selectToggle)
    })

    selectItem.forEach(item => {
      item.addEventListener('click' , selectChoose)
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
  }
  select()
})
