// Создаем основной Объект с продуктами
const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
}
// Создаем доп Объект с модификациями
const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 300,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcall: 30
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptOut = receipt.querySelector('.receipt__window-out'),
    receiptWindow = receipt.querySelector('.receipt__window'),
    btnReceipt = receipt.querySelector('.receipt__window-btn');

//  перебор кнопок (  + , -)


for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        // Если было нажатие на + или -, то отправляем к 
       plusOrMinus(this);
    })

}

function plusOrMinus(element) {
    // closest() - метод объекта подключается к родительскому элементу
    //  getAttrubute() - берет информацию с атрибута 

    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'), 
        out = parent.querySelector('.main__product-num'), 
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'), 
        elemntData = element.getAttribute('data-symbol'); 

    if (elemntData == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elemntData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;

}
for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function () {
        addExtraProduct(this);
    })
}



function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        elAtr = element.getAttribute('data-extra');
    product[parentId][elAtr] = element.checked;

    if (product[parentId][elAtr] == true) {
        product[parentId].kcall += extraProduct[elAtr].kcall
        product[parentId].price += extraProduct[elAtr].price
    } else {
        product[parentId].kcall -= extraProduct[elAtr].kcall
        product[parentId].price -= extraProduct[elAtr].price
    }

    kcall.innerHTML = product[parentId].Kcall;
    price.innerHTML = product[parentId].Summ;
}

let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

addCart.addEventListener('click', function () {
    for (const key in product) { 
        const po = product[key]; 
        if (po.amount > 0) { 
            arrayProduct.push(po); 
            for (const infoKey in po) { 
                
                if (po[infoKey] === true) { 
                    po.name += '\n' + extraProduct[infoKey].name; 
                }
            }
        }
        po.price = po.Summ; 
        po.kcall = po.Kcall; 
    }

    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice += el.price; 
        totalKcall += el.kcall; 
        totalName += '\n' + el.name + '\n'; 
    }
    receiptOut.innerHTML = `Вы купили: \n ${totalName}   Каллорийность ${totalKcall} \n Стоимость покупки ${totalPrice} сумм`;
    receipt.style.display = 'flex';
    setTimeout(function () {
        receipt.style.opacity = '1';
    }, 100);
    setTimeout(function () {
        receiptWindow.style.top = '0';
    }, 200);
    document.body.style.overflow = 'hidden';
    const outNum = document.querySelectorAll('.main__product-num');
    for (let i = 0; i < outNum.length; i++) {
        outNum[i].innerHTML = 0
    }
    const outPrice = document.querySelectorAll('.main__product-price span');
    for (let i = 0; i < outPrice.length; i++) {
        outPrice[i].innerHTML = 0
    }
});

btnReceipt.addEventListener('click', function () {
    location.reload()
})

const lvl = document.querySelector('.header__timer-extra');

let quickly = 20;

function  LvL (speed = 0) { 
    lvl.innerHTML = speed;
    speed++;


    if(speed > 50 && speed < 75){
        quickly = 150;
    }else if (speed > 74 && speed < 85){
        quickly = 170;
    }else if (speed > 84 && speed < 95){
        quickly = 190
    }else if (speed > 94){
         quickly = 200;
    }

    if(speed <= 100){
        setTimeout(() => LvL(speed), quickly)
    }
 }
 LvL();

const view = document.querySelector('.view'),
    viewClose = view.querySelector('.view__close'),
    scaleImg = view.querySelector('img'),
    imgProduct = document.querySelectorAll('.main__product-info');


    for (let i = 0; i < imgProduct.length; i++) {
        imgProduct[i].addEventListener('dblclick', function () { 
            img(this)
         })
        
    }
    
    function img(el) { 
        view.classList.add('active');
        const img = el.querySelector('img').getAttribute('src');
        scaleImg.setAttribute('src', img);
     }

     viewClose.addEventListener('click', function () { 
         this.closest('.view').classList.remove('active')
      })




//   