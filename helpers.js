//form içerisndeki tipi analiz edip ona göre fonksiyonun çağrıldığı tipe denk gelen açıklamayı gönderme
export const detectType = (type)=>{
    switch (type) {
        case'park': return 'Park Yeri'
        case'home': return 'Ev'
        case'job': return 'İş Yeri'
        case'goto': return 'Gidilecek Yer'
    }
}

export const setStorage = (data) =>{
//veriyi locale göndermek için hazırlar
    const strData = JSON.stringify(data)
//lcoal storage yi günceller
    localStorage.setItem('notes', strData)
};

var carIcon = L.icon({
    iconUrl: 'https://static.thenounproject.com/png/331565-200.png',
    iconSize:     [70, 80], // size of the icon
    
});

var homeIcon = L.icon({
    iconUrl: 'https://static.thenounproject.com/png/279259-200.png',
    iconSize:     [70, 80], // size of the icon
    
});

var jobIcon = L.icon({
    iconUrl: 'https://www.shareicon.net/data/512x512/2017/05/22/886154_map_512x512.png',
    iconSize:     [70, 80], // size of the icon
    
});

var travelIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25613.png',
    iconSize:     [40, 50], // size of the icon
    
});

export function detectItem(type){
    switch (type) {
        case'park': return carIcon
        case'home': return homeIcon
        case'job': return jobIcon
        case'goto': return travelIcon
}
}