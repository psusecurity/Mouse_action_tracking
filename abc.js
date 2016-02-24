document.getElementById("b").style.display = 'none';
document.getElementById("c").style.display = 'none';
document.getElementById("d").style.display = 'none';
document.getElementById("a1").style.display = 'none';
document.getElementById("b1").style.display = 'none';
document.getElementById("c1").style.display = 'none';
document.getElementById("d1").style.display = 'none';
var status = 0;
var adddata = false;
var target = null;
var tabel= null

window.addEventListener('mousemove', function () {
    if (adddata) {
        //  console.log("From to :" + target + "\t" + tabel + " " + scrollPostion);
        eventProperty('mousemove', event, target, tabel, scrollPostion);
    };
});


var scrollPostion = 0;
$(window).scroll(function (event) {
    var direction = null;
    var postion = $(this).scrollTop();
    if (postion > scrollPostion) {
        direction = "down";
    } else {
        direction = "up";
    }
    // the scroll's Postion is the highest point of the scroll. 
    scrollPostion = postion;
    var timeStamp = Date.now();
    var url = window.location.href;
    var mousePro = ["Scroll", direction, scrollPostion, timeStamp, url];
    console.log(postion)
  //  chrome.runtime.sendMessage(mousePro);
});


document.getElementById("a").addEventListener("click", function () {
    if (status == 0) {
        document.getElementById("b").style.display = 'block';
        document.getElementById("a").innerHTML = "Go to B";
        adddata = true;
        target = "AB";
        tabel = "tabel1"
   }else  if (status == 1) {
        document.getElementById("c").style.display = 'block';
        document.getElementById("a").innerHTML = "Go to C";
        adddata = true;
        target = "AC";
        tabel = "tabel1"
    } else if (status == 2) {
        document.getElementById("d").style.display = 'block';
        document.getElementById("a").innerHTML = "Go to D";
        adddata = true;
        target = "AD";
        tabel = "tabel1"
    }
    
    });

document.getElementById("b").addEventListener("click", function () {
    document.getElementById("b").style.display = 'none';
    document.getElementById("a").innerHTML = "Start A";
    status = 1;
    adddata = false;
    target = null;

});

document.getElementById("c").addEventListener("click", function () {
    document.getElementById("c").style.display = 'none';
    document.getElementById("a").innerHTML = "Start A";
    status = 2;
    adddata = false;
    target = null;
});


document.getElementById("d").addEventListener("click", function () {
    document.getElementById("d").style.display = 'none';
    document.getElementById("a").innerHTML = "Start A";
    status = 3;
    document.getElementById("a").style.display = 'none';
    document.getElementById("a1").style.display = 'block';
    target = null;
    adddata = false;
       // document.write("Thank you :)");
});



document.getElementById("a1").addEventListener("click", function () {
    if (status == 3) {
        document.getElementById("b1").style.display = 'block';
        document.getElementById("a1").innerHTML = "Go to B";
        adddata = true;
        target = "AB";
        tabel = "tabel2"
    }else  if (status == 4) {
        document.getElementById("c1").style.display = 'block';
        document.getElementById("a1").innerHTML = "Go to C";
        adddata = true;
        target = "AC";
        tabel = "tabel2"

    } else if (status == 5) {
        document.getElementById("d1").style.display = 'block';
        document.getElementById("a1").innerHTML = "Go to D";
        adddata = true;
        target = "AD";
        tabel = "tabel2"
    }
});



document.getElementById("b1").addEventListener("click", function () {
    document.getElementById("b1").style.display = 'none';
    document.getElementById("a1").innerHTML = "Start A";
    status = 4;
});

document.getElementById("c1").addEventListener("click", function () {
    document.getElementById("c1").style.display = 'none';
    document.getElementById("a1").innerHTML = "Start A";
    status = 5;
});


document.getElementById("d1").addEventListener("click", function () {
    document.getElementById("d1").style.display = 'none';
    document.getElementById("a1").innerHTML = "Start A";
    status = 6;
    document.getElementById("a1").style.display = 'none';
    document.getElementById("a1").style.display = 'block';
    document.write("Thank you :)");
});




function eventProperty(action, event, target, tabel, scrollPostion) {
    var x = event.pageX;
    var y = event.clientY;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var scrX = window.screenX;
    var scrY = window.screenY;
    var timeStamp = Date.now();
    var target = target;
    var tabel = tabel;
    var scroll = scrollPostion;
    console.log(action + "\tx :" + x + "\ty :" + y + "\tw :" + w + "\tH :" + h + "\tscrx: " + scrX + "\tscrY :" + scrY + "\t" + timeStamp + "\ttarget: " + target + "\t" + tabel + "\t" + scrollPostion);

    var mousePro = [action, x, y, w, h, scrX, scrY, timeStamp, target, tabel, scrollPostion];

    //  console.log(action + "\t" + x + "\t" + y + "\t" + w + "\t" + h + "\t" + url)
    chrome.runtime.sendMessage(mousePro);
    
}


/*
window.addEventListener("keydown", function (event) {
    if (event.key !== undefined) {
    } else if (event.keyIdentifier !== undefined) {
        var y = event.which;
        var url = window.location.href;
        var timeStamp = Date.now();
        var url = window.location.href;
        var mousePro = ["keydown", y, timeStamp, url];
        chrome.runtime.sendMessage(mousePro);
         console.log(event.keyIdentifier + "\t OR: " + y);
        } 
    if (event.defaultPrevented) {
        return;
    }
}, true);


var scrollPostion = 0;
window.addEventListener('contextmenu', function (event) {
    var url = window.location.href;
    var mousePro = ["RightClick2", url];
    chrome.runtime.sendMessage(mousePro);
    eventProperty('RightClick', event);

});

// these vars and fucntion to make sure there is no douplicate of clikc when use dbclick
var t = 0;
var delay = 200;
var prevent = false;

$(window).click(function (event) {
    timer = setTimeout(function () {
        if (!prevent) {
            eventProperty('click', event);
        }
        prevent = false;
    }, delay);
}).dblclick(function (event) {
    clearTimeout(t);
    prevent = true;
    eventProperty('dblclick', event);
}).scroll(function (event) {
    var direction = null;
    var postion = $(this).scrollTop();
    if (postion > scrollPostion) {
        direction ="down";
        } else {
        direction="up";
    }
    // the scroll's Postion is the highest point of the scroll. 
    scrollPostion = postion;
    var timeStamp = Date.now();
    var url = window.location.href;
    var mousePro = ["Scroll", direction, scrollPostion, timeStamp, url];
    chrome.runtime.sendMessage(mousePro);
    });



*/