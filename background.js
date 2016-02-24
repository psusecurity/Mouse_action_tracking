const dbName = "MouseMovment";
const dbTable = "ToRightToBottom"
const dbTable1 = "ToLeftToUP"

var request = indexedDB.open(dbName, 7);


request.onerror = function (event) {
    console.log("There is an error in your database");
};
request.onupgradeneeded = function (event) {
    var db = event.target.result;
    /*** left to right and up to bottom tabel ***/
    var objectStore = db.createObjectStore(dbTable, { keyPath: "timeStamp" });
    /*** right to left and bottom to up ***/
    var objectStore = db.createObjectStore(dbTable1, { keyPath: "timeStamp" });

    /*** tabel premesions ***/
    objectStore.transaction.oncomplete = function (event) {
        var customerObjectStore = db.transaction(dbTable, "readwrite").objectStore(dbTable);
        var customerObjectStore = db.transaction(dbTable1, "readwrite").objectStore(dbTable1);
    }
};

//**** add the data ***//
request.onsuccess = function (event1) {
    /** all the foliwng events depende on content class */
    chrome.runtime.onMessage.addListener(function (resonse, sender, sendResopnse) {
        var data = resonse;

        if (data[0] == "mousemove") {
            if (data[9] == "tabel1") {
                var tabel = dbTable;
            } else if (data[9] == "tabel2") {
                var tabel = dbTable1;

            }

            var even = data[0];
            var x = data[1];
            var y = data[2];
            var w = data[3];
            var h = data[4];
            var scrX = data[5];
            var scrY = data[6];
            var timeStamp = data[7];
            var trg = data[8];
            var scrollPostion = data[10];

          //  console.log(data[9] + "\t" + x + "\t" + y + "\t" + w + "\t" + h + "\t" + scrX + "\t" + scrY + "\t" + timeStamp + "\t" + trg + "\t" + scrollPostion);
            //  addEVENT(tabel, x, y, w, h, scrX, scrY,  event1, timeStamp, targer,scrollPostion);
            addEVENT(event1, x, y, w, h, scrX, scrY, timeStamp, trg, scrollPostion, tabel);
        } else if (data[0] == "downloadData") {
          
            getData(data[1], event1)
        }

    });
};


//*****  add events ***/
function addEVENT(event, x, y, w, h, scrX, scrY, timeStamp, trg, scrollPostion, tabel) {

    var theData = {
        timeStamp: timeStamp,
        x_postion: x,
        y_postion: y,
        scr_high: h,
        scr_width: w,
        scrPosX: scrX,
        scrPosY: scrY,
        trg: trg,
        scrollPostion: scrollPostion,
    };
    var idb = event.target.result;
    var transaction = idb.transaction(tabel, 'readwrite').objectStore(tabel);
    var request = transaction.add(theData);
    request.onsuccess = function (ev) {
        // console.log("\t" + x + "\t" + y + "\t" + w + "\t" + h + "\t" + scrX + "\t" + scrY + "\t" + timeStamp + "\t" + trg + "\t" + scrollPostion);
    };
    request.onerror = function (ev) {
        //  console.log("Error: " + even + "\t" + theData.tabID + "\t" + theData.windID + "\t\t" + x + "\t" + y + "\t" + theData.timeStamp + "\tSecHiWi: " + theData.scr_high + "\tSecPos:" + theData.scr_width + "\t" + theData.scrPosX + "\t" + theData.scrPosY);
        console.log('Error occured', ev.srcElement.error.message);
    };
}




function getData(dbTable1, event) {
    idb = event.target.result;
    var transaction = idb.transaction(dbTable1, IDBTransaction.READ_ONLY);
    var objectStore = transaction.objectStore(dbTable1);

    var dataString = "TiemStamp\tmoveFromTo\tx_Position\ty_Position\tscrollPosition\tscrPosX\tscrPosY\tscr_high\tscr_width\n";
    var lines = "";
      
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            lines = cursor.value.timeStamp + "\t";
         
            lines = lines.concat(cursor.value.trg + "\t");
            lines = lines.concat(cursor.value.x_postion + "\t");
            lines = lines.concat(cursor.value.y_postion + "\t");
            lines = lines.concat(cursor.value.scrollPostion + "\t");
            lines = lines.concat(cursor.value.scrPosX + "\t");
            lines = lines.concat(cursor.value.scrPosY + "\t");
            lines = lines.concat(cursor.value.scr_high + "\t");
            lines = lines.concat(cursor.value.scr_width + "\t");
            //    console.log(lines);
            dataString = dataString.concat(lines + "\n");
            cursor.continue();
        }
        else {
            //   console.log('Entries all displayed.');
            download(dbTable1 + '.txt', dataString);

        }

    };
};

/*
function getDataTab(dbTable1, event) {
    idb = event.target.result;
    var transaction = idb.transaction(dbTable1, IDBTransaction.READ_ONLY);
    var objectStore = transaction.objectStore(dbTable1);

    var dataString = "ForeignKey\tKey\tevent\ttimeStamp\ttabID\twindId\turl\n";
    var lines = "";
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {

            lines = cursor.value.foreignkey + "\t";
            lines = lines.concat(cursor.value.key + "\t");
            lines = lines.concat(cursor.value.event + "\t");
            lines = lines.concat(cursor.value.timeStamp + "\t");
            lines = lines.concat(cursor.value.tabID + "\t");
            lines = lines.concat(cursor.value.windId + "\t");
            lines = lines.concat(cursor.value.url + "\t");
            dataString = dataString.concat(lines + "\n");
            cursor.continue();
        }
        else {
            //    console.log('Entries all displayed.');
            download('tab.txt', dataString);
        }
    };
};



function getDataKeyEvent(dbTable1, event) {
    idb = event.target.result;
    var transaction = idb.transaction(dbTable1, IDBTransaction.READ_ONLY);
    var objectStore = transaction.objectStore(dbTable1);
    var dataString = "Foreignkey\ttimeStamp\Key\n";

    var lines = "";
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            lines = cursor.value.foreignkey + "\t";
            lines = lines.concat(cursor.value.timeStamp + "\t");
            lines = lines.concat(cursor.value.keyValue + "\t");
            dataString = dataString.concat(lines + "\n");
            cursor.continue();
        }
        else {
            //   console.log('Entries all displayed.');
            download('KeyEvent.txt', dataString);
        }
    };
};




function addKey(tabel, event, keyValue, timeStamp, tabID, windID, tabURL) {
    var hash1 = CryptoJS.MD5(tabID + windID + tabURL);
    foreignkey = hash1.toString();
    var theData = {
        foreignkey: foreignkey,
        timeStamp: timeStamp,
        keyValue: keyValue,
    };
    var idb = event.target.result;
    var transaction = idb.transaction(tabel, 'readwrite').objectStore(tabel);
    var request = transaction.add(theData);
    request.onsuccess = function (ev) {
        // console.log("Adding the key : " + "\t" + theData.keyValue + "\t" + theData.foreignkey);
    };
    request.onerror = function (ev) {
        console.log("Error: Adding the key " + "\t" + theData.keyValue + "\t" + theData.timeStamp);
        console.log('Error occured', ev.srcElement.error.message);
    };
}
*/

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}