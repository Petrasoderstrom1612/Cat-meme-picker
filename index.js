import { catsData } from '/data.js'


const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const header = document.getElementById('header')
const main = document.getElementById('main')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

document.addEventListener('click',function(event){
  if(event.target === main) {
      closeModal();
  }  
})

header.addEventListener('click',function(event){
  if(event.target === header) {
      closeModal();
  }  
})

function renderCat(){
     const catObject = getSingleCatObject()
    memeModal.innerHTML=`
    <img
         class="cat-img" 
         src="./images/${catObject.image}"
         alt="${catObject.alt}"
         >`
    
    
    // const catObjects = getTwoCatObjects()
    // const catImagesHTML = catObjects.map(catObject => `
    //     <img 
    //     class="cat-img" 
    //     src="./images/${catObject.image}"
    //     alt="${catObject.alt}"
    //     >`)
    //     .join('')
   
    // memeModalInner.innerHTML = catImagesHTML;    
    memeModal.style.display = 'flex'
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

// function getTwoCatObjects(){
//     const catsArray = getMatchingCatsArray()
//     const selectedCats = []
    
//     if(catsArray.length === 1){
//         return catsArray[0]
//     }
//     else{
//         const randomNumber1 = Math.floor(Math.random() * catsArray.length)
//         const randomNumber2 = Math.floor(Math.random() * catsArray.length)
//         selectedCats.push(catsArray[randomNumber1])
//         selectedCats.push(catsArray[randomNumber2])
//     }
//     return selectedCats
// }

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




