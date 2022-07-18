// const urlCat = 'https://api.thecatapi.com/v1/breeds?limit=25'
// const urlDog = 'https://thedogapi.com/'
// var api_url = "https://api.thecatapi.com/v1/images/upload"
// var api_key = "a9a5b15e-b1a4-4290-b07a-10274c71f558"

// https://docs.thecatapi.com/api-reference/breeds/breeds-search

async function httpReq (urlCat) {
  try {
    const response = await fetch(urlCat, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
          'content-type': 'application/json',
          'x-api-key': 'a9a5b15e-b1a4-4290-b07a-10274c71f558'
        }})
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    throw new Error ('Error')
  }
}


class CatsItem{

  render() {
    httpReq('https://api.thecatapi.com/v1/breeds?limit=25').then(res => {
      res.map((el, i) => {
        let gallery = document.querySelector('.gallery')
        let selectBody = document.querySelector('.select__body')
        let tempItem = `
          <div class="gallery__item">
          <div class="gallery__img">
          <img src="${el.image.url}" alt="${el.name}">
          </div>
          <button class="gallery__button gallery__btn-favorite icon-favorite"></button>
          </div>
        `
        let tempItemBreeds = `
          <div class="gellery__item-r gallery__item">
            <div class="gallery__img">
            <img src="${el.image.url}" alt="${el.name}">
            </div>
            <a class="gallery__button btn" onClick="catsItem.getCatInfo('${el.name}')" href="/Breeds/Breeds-info.html">${el.name}</a>
          </div>
        `
        let selectItem = `
          <div class="select__item">${el.name}</div>
        `

        if(location.pathname === "/Gallery.html"){
          gallery.insertAdjacentHTML('afterbegin', tempItem)
        }
        if(location.pathname === "/Breeds.html"){
          selectBody.insertAdjacentHTML('beforeEnd', selectItem)
          gallery.insertAdjacentHTML('afterbegin', tempItemBreeds)
        }
      })
    })
  }

  

  getCatInfo = (nameInfo) => {
    console.log('click')
    localStorage.setItem('nameInfo', nameInfo)
    httpReq(`https://api.thecatapi.com/v1/breeds/search?q=${nameInfo}`).then(res => {
      res.map(el => {
      let tempInfoCats = `
          <div class="btn-navigate">
            <button class="btn btn-back icon-arrow-back" onclick="history.back();return false;"></button>
            <button class="btn btn-title">GALLERY</button> 
            <span class="btn-navigate__coun-id">${el.id}</span>         
          </div>
          <div class="slider info-slider">
            <img src="../image/cat.png"alt="">
          </div>
          <div class="info">
            <h2 class="info__name">
              ${el.name}
            </h2>
            <div class="info__subtitle">Family companion cat</div>
            <div class="info__characteristics">
              <div class="info__l">
                <div class="info__item">
                  <h4 class="info__characteristics-title">Temperament:</h4>
                  <span class="info__characteristics-text">${el.temperament}</span>
                </div>
              </div>
              <div class="info__r">
                <div class="info__item">
                  <span class="info__characteristics-title">Origin:</span>
                  <span class="info__characteristics-text">${el.origin}</span>
                </div>
                <div class="info__item">
                  <span class="info__characteristics-title">Weight:</span>
                  <span class="info__characteristics-text">${el.weight.metric} kg</span>
                </div>
                <div class="info__item">
                  <span class="info__characteristics-title">Life span:</span>
                  <span class="info__characteristics-text">${el.life_span} years</span>
                </div>
              </div>
            </div>
          </div>
      `
      document.querySelector('.wrap__container-right__body').insertAdjacentHTML('afterbegin', tempInfoCats)
      })


    })
  }

}

const catsItem = new CatsItem()
catsItem.render()
if(location.pathname === "/Breeds/Breeds-info.html"){
  catsItem.getCatInfo(localStorage.getItem('nameInfo'))
}
