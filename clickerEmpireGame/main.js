const config = {
  currentUser: '',
  intervalId: ''
}
class User{
  constructor(name, age, days, money, purchasedProducts, clickNum, incrementPerSec, incrementOfInvest){
    this.name = name
    this.age = age
    this.days = days
    this.money = money
    this.purchasedProducts = purchasedProducts
    this.clickNum = clickNum
    this.incrementPerSec = incrementPerSec
    this.incrementOfInvest = incrementOfInvest
  }
  clickBurger(){
    let num = this.purchasedProducts["Flip machine"]
    this.money += 25 * num
    this.clickNum += 1
    renderClickNum(this.clickNum)
    renderMoney(this.money)
  }
  
  getOld(){
    this.age += 1
    renderAge(this.age)
  }
  makeMoney(){
    this.money += this.incrementPerSec
    this.money += this.incrementOfInvest
    renderMoney(this.money)
  }
  updateIncrementOfInvest(){
    this.incrementOfInvest = 0
    if(this.purchasedProducts["ETF Stock"]){
      this.incrementOfInvest += Math.floor(products["ETF Stock"].price * products["ETF Stock"].value * this.purchasedProducts["ETF Stock"])
    }
    if(this.purchasedProducts["ETF Bonds"]){
      this.incrementOfInvest += Math.floor(products["ETF Bonds"].price * products["ETF Bonds"].value * this.purchasedProducts["ETF Bonds"])
    }
    // console.log(this.incrementOfInvest)
    return 
  }
}

class Product{
  constructor(name, maxPurchases, price, type, value, imageUrl){
    this.name = name
    this.maxPurchases = maxPurchases
    this.price = price
    this.type = type
    this.value = value
    this.imageUrl = imageUrl
  }

  purchase(num){
    let user = config.currentUser
    let total = this.price * num
    if(num <= 0 || num == null){
      alert('個数を入力してください')
      return
    }else if(total > user.money){
      alert('お金がたりません！！')
      return
    }else if(num + user.purchasedProducts[this.name] > this.maxPurchases){
      alert('最大購入数を超えています！！')
      return
    }

    user.money -= total
    if(user.purchasedProducts[this.name] == undefined){
      user.purchasedProducts[this.name] = Number(num)
    }else{
      user.purchasedProducts[this.name] += Number(num)
    }
    // console.log(user)
    if(this.type == "property"){
      user.incrementPerSec += this.value * num
    }
    if(this.type == "invest"){
      user.updateIncrementOfInvest()
      if(this.name == "ETF Stock"){
        for(let i = 1; i <= num; i++){
          this.price = Math.floor(this.price * 1.1)
        }
      }
    }

    renderMainView(user)
    renderProduct(products)

    // console.log(user)
  }
}

const products = {
  "Flip machine": new Product("Flip machine", 500, 15000, "ability", 25, "./images/burger.webp"),
  "ETF Stock": new Product("ETF Stock", Infinity, 300000, "invest", 0.001, './images/etf-stock.png'),
  "ETF Bonds": new Product("ETF Bonds", Infinity, 300000, "invest", 0.007, './images/etf-stock.png'),
  "Lemonade Stand": new Product("Lemonade Stand", 1000, 30000, "property", 30, './images/lemonade.webp'),
  "Ice Cream Truck": new Product("Ice Cream Truck", 500, 100000, "property", 120, './images/ice-cream.webp'),
  "House": new Product("House", 100, 20000000, "property", 32000, './images/home.webp'),
  "TownHouse": new Product("TownHouse", 100, 40000000, "property", 64000, './images/modern-house.webp'),
  "Mansion": new Product("Mansion", 20, 250000000, "property", 50000, './images/mansion.webp'),
  "Industrial Space": new Product("Industrial Space", 10, 1000000000, "property", 2200000, './images/industrial-space.png'),
  "Hotel Skyscraper": new Product("Hotel Skyscraper", 5, 10000000000, "property", 2500000, './images/skyscrapers.webp'),
  "Bullet-Speed Sky Railway": new Product("Bullet-Speed Sky Railway", 1, 10000000000000, "property", 30000000000, './images/train.webp'),
}

function displayNone(ele){
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}

function displayBlock(ele){
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}

// 最初から始める時の処理
function startGame(){
  let name = document.getElementById('userName').value
  if(!name){
    alert('ユーザー名を入力して下さい')
    return 
  }else if (name.length > 10){
    alert('ユーザー名は10文字以内で入力してください')
    return
  }
  // constructor(name, age, days, money, purchasedProducts, clickNum, incrementPerSec, incrementOfInvest){

  if(name == "okanemochi"){
    user = new User(name, 20, 1, 100000000, {"Flip machine": 1}, 0,0,0)
  }else{
    user = new User(name, 20, 1, 50000, {"Flip machine": 1}, 0,0,0)
  }
  config.currentUser = user
  // console.log(user)

  displayNone(document.getElementById('top'))

  renderMainView(user)
  renderProduct()
  timeGoesby(user)
}

document.getElementById('fromTheBeggining')
.addEventListener('click', function(){
  startGame()
})

// daysをカウントするためのメソッド
function timeGoesby(user){
  // console.log(user)
  let id = setInterval(function(){
    if(!config.currentUser) return 

    user.days += 1
    if(user.days % 365 == 0) user.getOld()
    renderDays(user.days)

    // makemoney()で毎秒お金を増やす
    user.makeMoney()
  },1000)
  // カウントを止めるためにidを保存
  config.intervalId = id
}

// 初期化の処理
function initializeGame(){
  if(window.confirm("ゲームをリセットします。本当によろしいですか？")){
    config.currentUser.days = 0
    config.currentUser.age = 20
    config.currentUser.money = 50000
    config.currentUser.purchasedProducts = {"Flip machine": 1}
    config.currentUser.clickNum = 0
    config.currentUser.incrementPerSec = 0
    config.currentUser.incrementOfInvest = 0
    renderMainView(config.currentUser)
    renderProduct()
  }
  return
}

// セーブの処理
function saveData(){
  alert('データをセーブしました')

  // ユーザーオブジェクトをJSONにしてlocalstorageに保存
  let data = JSON.stringify(config.currentUser)
  localStorage.setItem("user", data);
  console.log(data)

  config.currentUser = ''
  config.intervalId = ''

  // カウントを止める
  window.clearInterval(config.intervalId)

  // トップ画面に戻る
  displayBlock(document.getElementById('top'))
  displayNone(document.getElementById('main'))
}

// ログイン処理
function login(){
  // localstorageからuserオブジェクトを取り出す
  let data = JSON.parse(localStorage.getItem('user'))
  let user = new User(data.name, data.age, data.days, data.money, data.purchasedProducts, data.clickNum, data.incrementPerSec, data.incrementOfInvest)
  config.currentUser = user

  if(!config.currentUser) alert('データがありません')
  // console.log(config)
  console.log(user)

  displayNone(document.getElementById('top'))

  renderMainView(user)
  renderProduct()
  timeGoesby(user)
}

// 以下レンダリングのためのメソッド
function renderMainView(user){
  let container = document.getElementById('main')
  container.innerHTML = 
  `
  <div class="container d-flex h-100 w-100 flex-wrap">
      <div class="left-wrap d-flex flex-column  bg-dark col-lg-5 row-12 p-3 col-md-12 ">
        <div class="bg-secondary w-100 h-auto m-auto text-center text-white ">
          <p class="pt-3 h5 font-weight-bold"><span id="clickNum">${user.clickNum}</span> Bergers</p>
          <p class="pt-1 pb-2">¥<span id="incrementPerSec">${user.incrementPerSec + user.incrementOfInvest}</span> per second</p>
        </div>
        <div class="w-50 m-auto img-wrap flex-grow-1 d-flex align-items-center">
          <img src="./images/burger.webp" alt="" id="burger" class="w-100 m-auto py-5">
        </div>
      </div>
      <div class="right-wrap col-lg-7 col-md-12 p-3 d-flex flex-column">
        <div class="bg-dark h-auto mb-3 w-100 p-2 pb-3 text-white text-center">
          <div class="d-flex w-100 h-50 mb-2">
            <div class="bg-secondary w-50 h-100 mr-2">${user.name}</div>
            <div class="bg-secondary w-50 h-100"><span id="age">${user.age}</span> yrs old</div>
          </div>
          <div class="d-flex w-100 h-50">
            <div class="bg-secondary w-50 h-100 mr-2"><span id="days">${user.days}</span>days</div>
            <div class="bg-secondary w-50 h-100">¥<span id="money">${user.money}</span></div>
          </div>
        </div>
        <div id="products" class="bg-dark  p-2 flex-grow-1" style="overflow-y: scroll; height: 40px">
        </div>
        <div class="d-flex justify-content-end pt-2">
          <button class="btn btn-outline-dark mr-3 btn-lg fa fa-2x fa-repeat" onclick="initializeGame()"></button>
          <button class="btn btn-outline-dark btn-lg fa fa-2x fa-save" onclick="saveData()"></button>
        </div>
        </div>
      </div>
    </div>
  `
  displayBlock(document.getElementById('main'))

  let burger = document.getElementById('burger')
  burger.addEventListener('click', function(){
    user.clickBurger()
  })
}

function renderDays(days){
  let moneyDiv = document.querySelectorAll('#days')[0]
  moneyDiv.innerHTML = String(days)
}

function renderMoney(money){
  let moneyDiv = document.querySelectorAll('#money')[0]
  moneyDiv.innerHTML = String(money)
}

function renderClickNum(num){
  let clickNumDiv = document.querySelectorAll('#clickNum')[0]
  clickNumDiv.innerHTML = String(num)
}

function renderAge(age){
  let ageSpan = document.querySelectorAll('#age')[0]
  ageSpan.innerHTML = String(age)
}

function renderProduct(){
  let target = document.getElementById('products')
  target.innerHTML = ""
  let html = ''
  for(let i in products){
    // console.log(products[i])
    let num = config.currentUser.purchasedProducts[i] == undefined ? 0 : config.currentUser.purchasedProducts[i]
    html +=
    `
    <div id="productCard" class="bg-secondary w-100 mb-2 p-2 d-flex text-white" style="height: auto;" data-name="${products[i].name}" onclick='renderDetail("${products[i].name}")'>
      <img src=${products[i].imageUrl} alt="" style="max-height: 100px; width: auto;">
      <div class="flex-grow-1 pl-3 h5">
        <h3>${products[i].name}</h3>
        <div class="d-flex justify-content-between flex-wrap">
          <div>¥${products[i].price}</div>
    `
    if(products[i].type == "ability"){
      html +=
      `
      <div class="text-success" id="productValue">+¥${products[i].value} / click</div>
      `
    }else if(products[i].type == "invest"){
      html +=
      `
      <div class="text-success" id="productValue">+${(products[i].value * 100).toPrecision(1)}%/ sec</div>
      `
    }else{
      html +=
      `
      <div class="text-success" id="productValue">+¥${products[i].value} / sec</div>
      `
    }
    html +=
    `
        </div>
      </div>
      <div class="w-25 text-center h3" style="line-height: 80px;">
        ${num}
      </div>
    </div>
    `
  }
  target.innerHTML = html
  return
}

function renderDetail(productName){
  product = products[productName]
  // console.log(product)
  let target = document.getElementById('products')
  target.innerHTML = ''
  let html =
  `
  <div class="bg-secondary w-100 h-auto text-white p-3">
    <div class="d-flex mb-5">
      <div class="col-7">
        <h2 class="h1 mb-3" id="productName">${product.name}</h2>
        <p class="h5 mb-2">Max Purchases: <span id="maxPurchases">${product.maxPurchases}</span></p>
        <p class="h5 mb-2">price: ¥<span id="productPrice">${product.price}</span></p>
  `
  if(product.type == "ability"){
    html +=
    `
    <p class="h6 mb-2">Get <span id="productValue">${product.value}</span> extra yen per click</p>
    `
  }else if(product.type == "invest"){
    html +=
    `
    <p class="h6 mb-2">Get <span id="productValue">${(product.value * 100).toPrecision(1)}</span>% extra per sec</p>
    `
  }else{
    html +=
    `
    <p class="h6 mb-2">Get <span id="productValue">${product.value}</span> extra yen per sec</p>
    `
  }

  html +=
  `
      </div>
      <div class="col-5">
        <img src="${product.imageUrl}" alt="" class="w-100">
      </div>
    </div>
    <form class="mb-5">
      <div class="form-group">
        <label for="purchaseNum">How Many would you like purchase?</label>
        <input type="number" min="0" class="form-control" id="purchaseNum" value="1">
      </div>
      <p class="text-right">Total: ¥<span id="totalPrice">${product.price}</span></p>
    </form>
    <div class="d-flex mb-3">
      <button class="btn btn-outline-primary col-6 mr-2" style="background-color: white;" onclick="renderProduct()">Go Back</button>
      <button class="btn btn-primary col-6" id="puchaseBtn">Purchase</button>
    </div>
  </div>
  `
  target.innerHTML = html

  let num = document.getElementById('purchaseNum')
  document.getElementById('puchaseBtn').addEventListener('click', function(){
    product.purchase(num.value)
  })

  num.addEventListener('change', function(){
    let totalPrice = document.getElementById('totalPrice')
    totalPrice.innerHTML = num.value * product.price
  })
}
