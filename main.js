import { detectType,setStorage,detectItem } from "./helpers.js";

//HTML 'den gelenler
const form = document.querySelector('form')
const list = document.querySelector('ul')

//Olay izleyicileri
form.addEventListener('submit',handleSubmit)
list.addEventListener('click', handleClick)


//! Ortak kullanım alanı
var map;
var notes = JSON.parse(localStorage.getItem('notes'))||[];
var coords=[]
var layerGroup = []

console.log('notes')

//! Kullanıcı konuma izin verirse loadMap fonksiyonunu çalıştır, vermezse ekrana "Kullanıcı kabul etmedi" şeklinde alert çıkar 
navigator.geolocation.getCurrentPosition(
    loadMap,
    
    console.log('Kullanıcı kabul etmedi')

);
// !haritaya tıklayınca çalışacak fonksiyon
function onMapClick(e) {
    //formun stillerine git display stiline flex ekle
    form.style.display = 'flex';
   coords = ([e.latlng.lat , e.latlng.lng])
   //ekrana bas

 
}

//! Kullanıcının konumuna göre ekrana haritayı basma 
function loadMap(e) {
    // Haritanın kurulumunu yapar
    map = L.map('map').setView([e.coords.latitude, e.coords.longitude], 14);

    // Haritanın nasıl gözükeceğini belirler
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    //Haritada ekrana basılacak imleçleri tutacağımız katman
    layerGroup = L.layerGroup().addTo(map)
    
    //localden gelen notları listlelem
    renderNoteList(notes);

    // Haritada bir tıklanma olduğunda çalışacak fonksiyonu kütüphaneden aldık
    map.on('click', onMapClick);
    
    
}

//ekrana imleç basar
function renderMarker(item){
    //marker ı oluşturur
    L.marker(item.coords,{icon:detectItem(item.status)})
    //imleçlerin olduğu katmana ekler
    .addTo(layerGroup)
    //üzerine tıklanınca açılcak pop-up ekler
    .bindPopup(`${item.desc}`)
}

//!formun gönderilmesi olayında çalışır
function handleSubmit(e) {
    //formu gönderince sayfa  yenileniyor önlenmesi için
    e.preventDefault();
    

const desc = e.target[0].value ;
const date = e.target[1].value ;
const status = e.target[2].value ;


// notlar dizisine eleman ekleme 
//notes.push yerine unshift yazsaydık da en son ekledğimiz elemanı en başta gösterirdi
notes.push({ 
    id:new Date().getTime(), //id ekledik
    desc, 
    date, 
    status,
    coords, // globalde coords u tanımlayıp ekledik çünkü başka fonksiyonun içerisinde ve onu parametre olarak çağıramıyoruz.
});


//local storage yi güncelleme
setStorage(notes)


//Notları listeleme
renderNoteList(notes);


//formu kapatma
form.style.display ='none'
}


//!ekrana notları basma fonksiyonu
function renderNoteList(items){
   
  //imleçleri temizler kütüphaneden aldık
  layerGroup.clearLayers()
   
    //dizi 2 kere döndükten sonra 3. sünü ekrana yazarken 2 tane ekleyerek yazar bunu önlemek için
    list.innerHTML=''
    //her bir not için fonksiyonu çalıştırır
    items.forEach((item)=>{
       
       
     
        const listEle =  document.createElement('li')

        //datasına ship olduğu id'yi ekleme
        listEle.dataset.id = item.id;

    //içerği belirleme
    listEle.innerHTML = `
<div>
   <p>${item.desc}</p>
   <p><span>Tarih: </span>${item.date}</p>
   <p><span>Durum: </span>${detectType (item.status)}</p>
</div>
<i id="fly" class="bi bi-airplane-engines-fill"></i>
<i id="delete" class="bi bi-trash3"></i>
`

//Html deki listeye elemanı ekleme
list.insertAdjacentElement('afterbegin',listEle) //en son eklediğimiz elemanı dizinin başına ekler

//ekrana bas
renderMarker(item);

});

}

//notlar alanında tıklnama olayını izler

function handleClick(e) {
    // güncellenecek elemanın id'sini öğrenme
    const id = e.target.parentElement.dataset.id;
    if (e.target.id === 'delete') {
      // id sini bildğimiz elemanı diziden kaldırma
      notes = notes.filter((note) => note.id != id);
  
      // local'i gücelle
      setStorage(notes);
  
      // ekranı güncelle
      renderNoteList(notes);
    }
  
    if (e.target.id === 'fly') {
      const note = notes.find((note) => note.id == id);
  
      map.flyTo(note.coords);
    }
  }





