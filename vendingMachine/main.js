// Drinkオブジェクトを定義
class Drink{
  constructor(name, price, imageSrc){
      this.name = name
      this.price = price
      this.imageSrc = imageSrc
  }
}

// drinks配列からDOMを作成
function setDrink(drinks){
  let target = document.getElementById('items')
  for(let i = 0; i < drinks.length; i++){
      let html = 
      `
      <div class="item">
              <img src=${drinks[i].imageSrc}>
      </div>
      `
      target.innerHTML += html
  }

}
const drinks=[
  new Drink("water", "1.0", "https://item-shopping.c.yimg.jp/i/n/salada-bowl_cc-4902102085649-1"),
  new Drink("orange", "1.5", "https://item-shopping.c.yimg.jp/i/n/salada-bowl_cc-4902102120654-1"),
  new Drink("green tea", "1.2", "https://galaxy.vc/img/cocacola_3/cc-4902102137614-2.jpg"),
  new Drink("milk tea", "1.3", "https://item-shopping.c.yimg.jp/i/n/salada-bowl_kb-4909411076665-2"),
  new Drink("coffee", "1.2", "https://ic4-a.wowma.net/mis/gr/135/image.wowma.jp/33417330/6008/a001/4902102118675.jpg"),
  new Drink("cola", "1.5", "https://www.cocodecow.com/forest/goods/images/p/661967.jpg"),
  new Drink("cider", "1.4", "https://images-na.ssl-images-amazon.com/images/I/71NIj8l149L._AC_SL1500_.jpg"),
  new Drink("pocari sweat", "1.4", "https://askul.c.yimg.jp/img/product/3L1/508928_3L1.jpg"),
  new Drink("potasu", "1.2", "https://dsimg.wowjpn.goo.ne.jp/rs/?src=https://wow-j.com/images/ext/allguides/02027/02027_008.jpg&maxw=770&maxh=0&resize=1")
]
setDrink(drinks)


const taret = document.getElementById('target')
const sliderItems = document.querySelectorAll(".item")

let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens");
main.classList.add("main", "full-width","pt-5");
extra.classList.add("extra", "full-width","pt-5");

sliderShow.append(main);
sliderShow.append(extra);
target.append(sliderShow);
main.append(sliderItems.item(0))
main.setAttribute("data-index", "0");

function slideJump(steps, animationType) {
  let index = parseInt(main.getAttribute("data-index"));
  let currentElement = sliderItems.item(index);

  index += steps;

  if(index < 0) index = sliderItems.length -1;
  else if(index >= sliderItems.length) index = 0;

  let nextElement = sliderItems.item(index);

  main.setAttribute("data-index", index.toString());

  // animateMain関数の呼び出し
  animateMain(currentElement, nextElement, animationType);
}

function animateMain(currentElement, nextElement, animationType) {
  main.innerHTML = "";
  main.append(nextElement);
  
  extra.innerHTML = "";
  extra.append(currentElement);

  main.classList.add("expand-animation");
  extra.classList.add("deplete-animation");
  
  if (animationType === "right"){
      sliderShow.innerHTML = "";
      sliderShow.append(extra);
      sliderShow.append(main);
  } else if (animationType === "left") {
      sliderShow.innerHTML = "";
      sliderShow.append(main);
      sliderShow.append(extra);
  }
}

// ボタンを押したときの挙動
function pushButton(btn){
  let num = parseInt(btn.innerHTML)
  // console.log(num)
  let curr = parseInt(main.getAttribute("data-index"));
  // console.log(curr)
  displayInfo(num)
  if(num - curr <= 0){
      for(let i = 0; i <= curr - num; i++){
          slideJump(-1,"left")
      }
  }else{
      for(let i = 0; i < num - curr - 1; i++){
          slideJump(1,"right")
      }
  }
}

// 右上のboxのDOMを作成
function displayInfo(num){
  const infoTarget = document.getElementById('drink-info')
  let html = 
  `
  <div class="bg-danger display-num"><p>${num}</p></div>
  <div class="display-info pl-3 py-2">
  <p>${drinks[num-1].name}</p>
  <p><span>$</span>${drinks[num-1].price}</p>
  </div>
  `
  infoTarget.innerHTML = html
}
// 初期値
const infoTarget = document.getElementById('drink-info')
let html = 
`
<div class="bg-danger display-num"><p>1</p></div>
<div class="display-info pl-3 py-2">
    <p>${drinks[0].name}</p>
    <p><span>$</span>${drinks[0].price}</p>
</div>
`
infoTarget.innerHTML = html


// PUSHを押した時の挙動
function buy(){
  let curr = parseInt(main.getAttribute("data-index"))
  alert("You bought " + drinks[curr].name + "!!!")
}

// btnにaddEventListenerを設定
for(let i = 1; i <= 9; i++){
  let btnId = "btn" + i
  let btn = document.getElementById(btnId)
  btn.addEventListener("click", function(){
      pushButton(btn)
  })      
}