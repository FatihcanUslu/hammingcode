var arr, correction, m, object, r,datacik,reversed_data,paritybits,reversed_paritybits,hc,errorcuk;
    reversed_data = [];
    paritybits = [];
    reversed_paritybits = [];
    hc = [];
    datacik;
    errorcuk;
    var sonuccheck,sonuccheck1,sonuccheck2,sonuccheck3,sonuccheck4,sonuccheck5,sonuccheck6,sonuccheck7,sonuccheck8;
    sonuccheck=[];
    sonuccheck1=[];
    sonuccheck2=[];
    sonuccheck3=[];
    sonuccheck4=[];
    sonuccheck5=[];
    sonuccheck6=[];
    sonuccheck7=[];
    sonuccheck8=[];
    function gonder(){
      var databit = document.getElementById("data").value;
      document.getElementById("ciktilar").innerHTML=databit;
      datacik=databit;
      var errorbit= document.getElementById("error").value;
      errorcuk=errorbit;
      document.getElementById("errorkismi").style.display = "block";
      hesapla();
  }
  function gonder1(){
    var databit = document.getElementById("data").value;
    document.getElementById("ciktilar").innerHTML=databit;
    datacik=databit;
    var errorbit= document.getElementById("error").value;
    errorcuk=errorbit;
    document.getElementById("errorkismi").style.display = "block";
    hatabul();
}
  
  function reverseArr(input) {
    var ret = new Array;
    for(var i = input.length-1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}

function addTable() {
  document.getElementById("araislemler").style.display = "block";
  var myTableDiv = document.getElementById("databitsplaceholder");
  var myTableDiv1 = document.getElementById("checkbitsplaceholder");
  var myTableDiv2 = document.getElementById("hammingcodeplaceholder");
  sonuccheck2=sonuccheck.concat(sonuccheck1);
  sonuccheck5=sonuccheck3.concat(sonuccheck4);
  sonuccheck8=sonuccheck7.concat(sonuccheck6);
  var table = document.createElement('TABLE');
  table.border = '1';

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = 0,k=0; i < 2; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (var j = 0; j <sonuccheck.length; j++) {
      var td = document.createElement('TD');
      td.width = '75';
      td.appendChild(document.createTextNode(sonuccheck2[k]));
      tr.appendChild(td);
      k++;
    }
    
  }

  var table1 = document.createElement('TABLE');
  table1.border = '1';

  var tableBody1 = document.createElement('TBODY');
  table1.appendChild(tableBody1);

  for (var i = 0,k=0; i < 2; i++) {
    var tr = document.createElement('TR');
    tableBody1.appendChild(tr);

    for (var j = 0; j <sonuccheck3.length; j++) {
      var td = document.createElement('TD');
      td.width = '75';
      td.appendChild(document.createTextNode(sonuccheck5[k]));
      tr.appendChild(td);
      k++;
    }
    
  }

  var table2 = document.createElement('TABLE');
  table2.border = '1';

  var tableBody2 = document.createElement('TBODY');
  table2.appendChild(tableBody2); 

  for (var i = 0,k=0; i < 2; i++) {
    var tr = document.createElement('TR');
    tableBody2.appendChild(tr);

    for (var j = 0; j <sonuccheck6.length; j++) {
      var td = document.createElement('TD');
      td.width = '75';
      td.appendChild(document.createTextNode(sonuccheck8[k]));
      tr.appendChild(td);
      k++;
    }
    
  }

  myTableDiv.appendChild(table);
  myTableDiv1.appendChild(table1);
  myTableDiv2.appendChild(table2);

}


    function createData(datacik) {
    console.log("--------------------------------------------------------");
    console.log(datacik)


    
    reversed_data=reverseArr(datacik);//reverses data 
    console.log("ben reversed datayim",reversed_data);
    console.log("length:",datacik.length);
    for (var i = datacik.length,j=0; i > 0; i=i-1) {
      console.log(" D" + i);
      document.getElementById("ciktilar1").innerHTML+="D"+i+" ";
      sonuccheck[j]="D"+i;
      sonuccheck1[j]=datacik[j];
      j+=1;
    }
    
    document.getElementById("ciktilar1").innerHTML+=(": Location names");
    document.getElementById("ciktilar2").innerHTML=datacik+": The given data";
  }
  

  function createParity() {
    var p1, p2, p3;
    console.log("--------------------------------------------------------");

    if (datacik.length === 4) {
      p1 = datacik[3] ^ datacik[2] ^ datacik[0];
      p2 = datacik[3] ^ datacik[1] ^ datacik[0];
      p3 = datacik[2] ^ datacik[1] ^ datacik[0];
      paritybits[0]=p3;
      paritybits[1]=p2;
      paritybits[2]=p1;
      console.log("parity:",paritybits);
      
    }
    for (var i = paritybits.length,j=0; i > 0; i=i-1) {
      document.getElementById("ciktilar3").innerHTML+="P"+i+" ";
      sonuccheck3[j]="P"+i;
      j+=1;
    }
    sonuccheck4=paritybits;
    document.getElementById("ciktilar3").innerHTML+=(": Location names");

    reversed_paritybits=reverseArr(paritybits);//reverses parity bits

    document.getElementById("ciktilar4").innerHTML=paritybits+": Parity bits";
    console.log("--------------------------------------------------------");
  }

  function createHammingCode(datacik) {
    var b, sayac_data, sayac_parity;
    
    createData(datacik);
    createParity();
    sayac_parity = 0;
    sayac_data = 0;
    ortak=0;
    for (var i = 1, _pj_a = reversed_paritybits.length + reversed_data.length + 1; i < _pj_a; i += 1) {
      if ((i & i - 1) === 0 && i !== 0) {
        hc[ortak]=reversed_paritybits[sayac_parity];
        sayac_parity = sayac_parity + 1;
        ortak=ortak+1;
      } else {
        hc[ortak]=reversed_data[sayac_data];
        sayac_data = sayac_data + 1;
        ortak=ortak+1;
      }
    }
    hc.reverse();
    sayac_parity = 1;
    sayac_data = 1;
    ortak=0;
    b = [];

    for (var i = 1, _pj_a = reversed_paritybits.length + reversed_data.length + 1; i < _pj_a; i += 1) {
      if ((i & i - 1) === 0 && i !== 0) {
        b[ortak]=("P" + sayac_parity);
        sayac_parity = sayac_parity + 1;
        ortak=ortak+1;
      } else {
        b[ortak]=("D" + sayac_data);
        sayac_data = sayac_data + 1;
        ortak=ortak+1;
      }
    }
    b.reverse();

    for(var i=0;i<b.length;i++){
      sonuccheck6[i]=hc[i];
      sonuccheck7[i]=b[i];
    }
    console.log("omaffff:"+sonuccheck6);
    console.log("omaffff:"+sonuccheck7);
    document.getElementById("ciktilar5").innerHTML=b + ": Location of bits";
    document.getElementById("ciktilar6").innerHTML=hc + ": The hamming code";
  }

  function calcRedundantBits(m) {
    for (var i = 0, _pj_a = m; i < _pj_a; i += 1) {
      if (Math.pow(2, i) >= m + i + 1) {
        return i;
      }
    }
  }

  function posRedundantBits(datacik, r) {
    var j, k, res1,res2;
    j = 0;
    k = 1;
    m = datacik.length;
    res1 = "";
    res2="";
    for (var i = 1, _pj_a = m + r + 1; i < _pj_a; i += 1) {
      if (i == Math.pow(2, j)) {
        res1 = res1 + "0";
        j += 1;
      } else {
        res1 = res1 + "1";
        k += 1;
      }
      
    }

    console.log(res1);
    res2=reverseArr(res1);
    return res2;
  }

  function calcParityBits(arr, r,datacik) {
    var b, loop,parity, reversed_arr, sayac_data, sayac_parity, val,c, ch, j, r, h;
    [c, ch, j, r, h] = [0, 0, 0, 0, []];
    var toXor;
    var metadata=[];
    
    console.log("arr:"+arr);
    console.log("r:"+r);
    metadata=reverseArr(datacik);
    h=reverseArr(arr);
    console.log("h:"+h);
  var ph,startIndex,temg,block;
  
  for (var parity = 0, _pj_a = h.length; parity < _pj_a; parity += 1) {
    ph = Math.pow(2, ch);
    
    if (ph === parity + 1) {
      startIndex = ph - 1;
      temg = startIndex;
      toXor = [];
      block= 0;
      while (temg < h.length) {
          block = h.slice(temg,temg + ph);
          console.log(temg,":",block);
          toXor.push(block);     
          temg += 2 * ph;
      }
      for (var z = 1, _pj_b = toXor.length; z < _pj_b; z += 1) {
        h[startIndex] = h[startIndex] ^ toXor[z];
      }
      

      ch += 1;
    }
  }
  

  h.reverse();
  console.log(h);
  var mapcik=h.map(String);
  console.log(Number.parseInt(mapcik.join('')));



 
    sayac_parity = 1;
    sayac_data = 1;
    b = [];
    data2 = [];
    parity = [];
    loop = 0;
    ploop=0;
    sloop=0;
    reversed_arr = [];
    
    reversed_arr=reverseArr(arr);
    console.log("tf is that :"+arr);
    for (var i = 1, _pj_a = arr.length + 1; i < _pj_a; i += 1) {
      if ((i & i - 1) === 0 && i !== 0) {
        b[loop]=("P" + sayac_parity.toString());
        parity[ploop]=(Number.parseInt(reversed_arr[loop]));
        sayac_parity = sayac_parity + 1;
        loop = loop + 1;
        ploop=ploop+1;
      } else {
        b[loop]=("D" + sayac_data.toString());
        data2[sloop]=(Number.parseInt(reversed_arr[loop]));
        sayac_data = sayac_data + 1;
        loop = loop + 1;
        sloop=sloop+1;
      }
    }

    data2.reverse();
    parity.reverse();
    b.reverse();
    console.log("--------------------------------------------------------");

    for (var i = data2.length, _pj_a = 0; i < _pj_a; i += -1) {
      console.log(" D" + i.toString());
    }

    console.log(": Location names");
    console.log(data2.toString() + ": The given data");
    console.log("--------------------------------------------------------");

    for (var i = parity.length, _pj_a = 0; i < _pj_a; i += -1) {
      console.log(" P" + i.toString());
    }
    for (var i = parity.length,k=0; i > 0; i += -1) {
      sonuccheck3[k]="P"+i;
      sonuccheck4[k]=parity[k];
      k++;
    }
    for (var i = parity.length,k=0; i > 0; i += -1) {
      sonuccheck3[k]="P"+i;
      sonuccheck4[k]=parity[k];
      k++;
    }

    for(var i=0;i<b.length;i++){
      sonuccheck6[i]=arr[i];
      sonuccheck7[i]=b[i];
    }
    
    console.log("hakki bey:",sonuccheck3);
    console.log("hakki bey:",sonuccheck4);
    console.log("hakki bey:",parity);
    console.log(": Location names");
    console.log(parity.toString() + ": The check bits ");
    console.log("--------------------------------------------------------");
    console.log(b.toString() + ": Location of bits");
    hc=arr;
  }

  function detectError(nr) {
    var error, n, res, val;
    error=[];
    console.log("--------------------------------------------------------");
    for(var i=0;i<errorcuk.length;i++){
      error[i]=errorcuk[i];
    }  
    console.log("Error Data is: " + error);
    console.log("hammingcode: " + hc);
    document.getElementById("ciktilar7").innerHTML=(error+" :Error Data is");

    n = hc.length;
    res = 0;
    document.getElementById("ciktilar8").innerHTML=(n+" :Error length");
    for(var i=0;i<hc.length;i++){
      if(hc[i]===errorcuk[i]){
        res+=1;
      }
      else if(hc[i]!=errorcuk[i]){
      break;
    }
    }

    return n-res;
  }

function hesapla(){

if (datacik.length == 4) {
  createHammingCode(datacik);
  addTable();
  
0} else {
  if (datacik.length < 4) {
    console.log("\u001b[1;32mdata bit's length has to be bigger or equal than 4.\nTry again.");
  } else {
    datacik = datacik.toString();

    for (var i = datacik.length,j=0; i > 0; i=i-1) {
      sonuccheck[j]="D"+i;
      sonuccheck1[j]=datacik[j];
      j+=1;
    }
    console.log("nolurr:"+sonuccheck);
    console.log("nolurr:"+sonuccheck1);
  

    m = datacik.length;
    r = calcRedundantBits(m);
    arr =posRedundantBits(datacik, r);
    calcParityBits(arr, r,datacik);
    addTable();
    
  }
}
}
function hatabul(){
  if (datacik.length == 4) {
  r =calcRedundantBits(4);
  correction =detectError(r);
  var hatasongirisi = document.getElementById("errorlocationplaceholder");
  hatasongirisi.innerHTML="Error Location is :"+correction;
  console.log("The position of error is: " + correction);
  document.getElementById("ciktilar9").innerHTML=correction+" :The position of error is";
  }

  else{
  correction =detectError(r);
  var hatasongirisi = document.getElementById("errorlocationplaceholder");
  hatasongirisi.innerHTML="Error Location is :"+correction;
    console.log("The position of error is: " + correction);
    document.getElementById("ciktilar9").innerHTML=correction+" :The position of error is";
  }
}