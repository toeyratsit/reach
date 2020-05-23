function mockupClick(pageToHide, pageToShow) {
    document.querySelector('#' + pageToHide).style.display = "none";
    document.querySelector('#' + pageToShow).style.display = "block";
}

function Result() {
    mockupClick('Sec-Page', 'Td-Page')
    var day_start = document.getElementById('start').value;
    var day_end = document.getElementById('end').value;

    var money_start = parseInt(document.getElementById('goalMoney').value);
    var money_end = parseInt(document.getElementById('moneyNow').value);


    var date_start = new Date(day_start);
    if (!!date_start.valueOf()) { // Valid date
        var year = date_start.getFullYear();
        var month = date_start.getMonth();
        var day = date_start.getDate();
    } else { /* Invalid date */ }

    const date1 = new Date(day_start);
    const date2 = new Date(day_end);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const count = parseInt((money_start - money_end) / diffDays);


    var getData = JSON.parse(localStorage.getItem('datalist'));
    var getonlyDateStart = '';
    var getonlyDateEnd = '';
    for (i = 0; i < getData.length; i++) {

        getonlyDateStart += getData[i].listDateStart.split('-').reverse().join('/'),
            getonlyDateEnd += getData[i].listDateEnd.split('-').reverse().join('/');
    }

    document.getElementById("ShowDateStart").innerHTML = getonlyDateStart;
    document.getElementById("ShowDateEnd").innerHTML = "ถึง " + getonlyDateEnd;



    var daycount = 1;

    var getData = JSON.parse(localStorage.getItem('datalist'));
    var getonlyDateEnd = '';
    for (i = 0; i < getData.length; i++) {
        getonlyDateEnd += getData[i].listDateEnd;
    }

    // Set the date we're counting down to
    var countDownDate = new Date(getonlyDateEnd).getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("CountDown").style.color = "red";
        document.getElementById("CountDown").innerHTML = days + "d " + hours + "h " +
            minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("CountDown").innerHTML = "EXPIRED";
        }

        var StartToCal = '';
        var EndToCal = '';
        for (i = 0; i < getData.length; i++) {

            StartToCal += getData[i].listMoney,
                EndToCal += getData[i].listNow;
        }
        var ToCal = parseInt((StartToCal - EndToCal) / days);
        var minus = parseInt(StartToCal - EndToCal);
        document.getElementById("calC").innerHTML = ToCal + " บาท";
        document.getElementById("minus").innerHTML = minus + " บาท";
    }, 1000);


    const form = document.querySelector('form')
    const ul = document.querySelector('ul')
    const button = document.getElementById('clear')
    const input = document.getElementById('item')
    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

    localStorage.setItem('items', JSON.stringify(itemsArray))
    const data = JSON.parse(localStorage.getItem('items'))

    const liMaker = text => {
        const li = document.createElement('li')
        li.textContent = "เก็บแล้ว " + text + " บาท"
        ul.appendChild(li)
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault()

        itemsArray.push(input.value)
        localStorage.setItem('items', JSON.stringify(itemsArray))
        liMaker(input.value)
        input.value = ''

        var getData = JSON.parse(localStorage.getItem('datalist'));
        var StartToCal = '';
        var EndToCal = '';
        for (i = 0; i < getData.length; i++) {

            StartToCal += getData[i].listMoney,
                EndToCal += getData[i].listNow;
        }
        var minus = parseInt(StartToCal - EndToCal);
        var getData = JSON.parse(localStorage.getItem('items'));
        var getList = 0;
        for (i = 0; i < getData.length; i++) {
            getList += parseInt(getData[i])
        }
        document.getElementById("show").innerHTML = "เก็บได้แล้ว " + getList + " บาท";

        if (getList >= minus) {
            document.getElementById("show").style.color = "green";
            document.getElementById("show").innerHTML = "คุณเก็บเงินครบแล้ว " + getList + " บาท";
        }
    })

    data.forEach(item => {
        liMaker(item)
    })

    button.addEventListener('click', function() {
        localStorage.removeItem("items")
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild)
        }
    })

}


function testStr() {

    var Default = [{
        listProduct: document.getElementById("goalName").value,
        listMoney: document.getElementById("goalMoney").value,
        listDateStart: document.getElementById("start").value,
        listDateEnd: document.getElementById("end").value,
        listNow: document.getElementById("moneyNow").value,

    }];
    localStorage.setItem("datalist", JSON.stringify(Default));


}


function showList() {
    testStr()
    mockupClick('First-Page', 'Sec-Page')
    document.getElementById('showList').innerHTML;
    var getData = JSON.parse(localStorage.getItem('datalist'));
    var getList = '';
    for (i = 0; i < getData.length; i++) {

        getList += `<h4 class="m-4">ของที่อยากได้ : ` + getData[i].listProduct + `</h4>
                    <h4 class="m-4">ราคา : ` + getData[i].listMoney + ` บาท</h4>
                    <h4 class="m-4">วันที่เริ่มเก็บ : ` + getData[i].listDateStart.split('-').reverse().join('/') + `</h4>
                    <h4 class="m-4">สิ้นสุดวันที่ : ` + getData[i].listDateEnd.split('-').reverse().join('/') + `</h4>
                    <h4 class="m-4">เงินที่มีอยู่ตอนนี้ : ` + getData[i].listNow + ` บาท</h4>`;
    }
    document.getElementById('showList').innerHTML = getList;
}


function addDate() {
    let thisdateCal = document.getElementById("done").value;
    if (thisdateCal != null) {
        dateCal.push(thisdateCal)
        console.log(dateCal);
        finished();
    }
}

function finished() {
    let i = 1;
    for (aCal of dateCal) {
        lastCal.innerHTML += `
            <li class="list" onclick="" ondblclick="">
            ${i}. ${aCal}
            </li>
            `;
        i++;
    }
    localStorage.setItem("dateCal", JSON.stringify(dateCal));
}