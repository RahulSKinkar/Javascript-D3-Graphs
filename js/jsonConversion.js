var fs=require("fs");
const readline=require('readline');

var lineNum=1;//used to identify first row of the csv file
var firstAJson=[];//json array for first requirement
var firstBJson=[];//json array for second requirement
var firstCJson=[];//json array for third requirement
var secondJson=[];//json array for fourth requirement
var fields=[];// array to store all the row headings

var writerStream1A = fs.createWriteStream('../json/firstAFile.json');//to store first json array
var writerStream1B= fs.createWriteStream('../json/firstBFile.json');//to store second json array
var writerStream1C = fs.createWriteStream('../json/firstCFile.json');//to store third json array
var writerStream2 = fs.createWriteStream('../json/secondFile.json');//to store third json array
var writerStream3 = fs.createWriteStream('../json/thirdFile.json');//to store third json array

var continent= {"India":"Asia", "Argentina":"South America", "Australia":"Australia", "Brazil" :"South America", "Canada":"North America", "China":"Asia", "France":"Europe", "Germany":"Europe", "Indonesia":"Asia", "Italy":"Europe", "Japan": "Asia", "Mexico":"North America", "Russia":"Europe", "Saudi Arabia":"Asia","South Africa":"Africa", "Republic of Korea":"Asia", "Turkey":"Asia","United Kingdom":"Europe","USA":"South America","European Union":"Europe"}

var continentData={
"Asia":  {  "population":1,
            "gdp":0
          },
"Australia":{ "population":0,
              "gdp":0
            },
"North America":{ "population":0,
                  "gdp":0
                },
"South America": {  "population":0,
                    "gdp":0
                  },
"Europe":  {"population":0,
              "gdp":0
            },
"Africa":{  "population":0,
            "gdp":0
          },
"Antartica":  { "population":0,
                "gdp":0
              }
};

var mapXValue, mapFirstJsonYValue, mapSecondJsonYValue, mapThirdJsonYValue;//to fetch the index values of the elements that we need to plot in d3

const rl = readline.createInterface({
  input: fs.createReadStream('../csv/datafile.csv')
});//created a stream to fetch data from input file

rl.on('line',function(data){ //to fetch data from input file line-by-line

  if(lineNum==1)  {//to fetch first row from csv file
    fields=data.split(",");
    mapXValue=fields.indexOf("Country Name");
    mapFirstJsonYValue=fields.indexOf("Population (Millions) - 2013");
    mapSecondJsonYValue=fields.indexOf("GDP Billions (US$) - 2013");
    mapThirdJsonYValue=fields.indexOf("Purchasing Power in Billions ( Current International Dollar) - 2013");
    mapFourthJsonStack1Value=fields.indexOf("Population (Millions) - 2010");
    mapFourthJsonStack2Value=fields.indexOf("Population (Millions) - 2011");
    mapFourthJsonStack3Value=fields.indexOf("Population (Millions) - 2012");
    mapFourthJsonStack4Value=fields.indexOf("Population (Millions) - 2013");
    mapFourthAJsonStack1Value=fields.indexOf("Purchasing Power in Billions ( Current International Dollar) - 2010");
    mapFourthAJsonStack2Value=fields.indexOf("Purchasing Power in Billions ( Current International Dollar) - 2011");
    mapFourthAJsonStack3Value=fields.indexOf("Purchasing Power in Billions ( Current International Dollar) - 2012");
    mapFourthAJsonStack4Value=fields.indexOf("Purchasing Power in Billions ( Current International Dollar) - 2013");
    lineNum++;
  }//if
  else{//to fetch values from csv file other than first heading row
    var valueArray=data.split(",");

    if(valueArray[mapXValue]=="European Union"){
      // contEurope["name"]="Europe";
      // contEurope["population"] += parseFloat(valueArray[fields.indexOf("Population (Millions) - 2013")]),
      // contEurope["gdp"]+= parseFloat(valueArray[fields.indexOf("GDP Billions (US$) - 2013")]);
      return;
    }

    firstAJson.push({
      [valueArray[mapXValue]]: valueArray[mapFirstJsonYValue]
    });
    firstBJson.push({
      [valueArray[mapXValue]] : valueArray[mapSecondJsonYValue]
    });
    firstCJson.push({
      [valueArray[mapXValue]] : valueArray[mapThirdJsonYValue]
    });

    secondJson.push({
      "name":valueArray[mapXValue],
      "stack1":(valueArray[mapFourthJsonStack1Value] *10),
      "stack2":(valueArray[mapFourthJsonStack2Value]-valueArray[mapFourthJsonStack1Value]) *10,
      "stack3":(valueArray[mapFourthJsonStack3Value]-valueArray[mapFourthJsonStack2Value]) *10,
      "stack4":(valueArray[mapFourthJsonStack4Value]-valueArray[mapFourthJsonStack3Value]) *10,
      "stack1a":(valueArray[mapFourthAJsonStack1Value] ),
      "stack2a":(valueArray[mapFourthAJsonStack2Value]-valueArray[mapFourthAJsonStack1Value]) ,
      "stack3a":(valueArray[mapFourthAJsonStack3Value]-valueArray[mapFourthAJsonStack2Value]) ,
      "stack4a":(valueArray[mapFourthAJsonStack4Value]-valueArray[mapFourthAJsonStack3Value])
    });

    continentData[continent[valueArray[mapXValue]]].population += parseFloat(valueArray[fields.indexOf("Population (Millions) - 2013")]);
    continentData[continent[valueArray[mapXValue]]].gdp += parseFloat(valueArray[fields.indexOf("GDP Billions (US$) - 2013")]);

  }//else
});// end read line

rl.on('close', function(){  //to sort the json structures in descending order

  firstAJson.sort(function(a, b){
    var firstVal, secondVal;
    for(var key in a){
      firstVal=a[key];
    }
    for(var key in b){
      secondVal=b[key];
    }
    return secondVal - firstVal;
  });

  firstBJson.sort(function(a, b){
    var firstVal, secondVal;
    for(var key in a){
      firstVal=a[key];
    }
    for(var key in b){
      secondVal=b[key];
    }
    return secondVal - firstVal;
  });

  firstCJson.sort(function(a, b){
    var firstVal, secondVal;
    for(var key in a){
      firstVal=a[key];
    }
    for(var key in b){
      secondVal=b[key];
    }
    return secondVal - firstVal;
  });

  secondJson.sort(function(a, b){
    return b.stack1 - a.stack1;
  });

  //to write the json structures in JSON format in respective files
  writerStream1A.write(JSON.stringify(firstAJson,null,2),'UTF8');
  writerStream1B.write(JSON.stringify(firstBJson,null,2),'UTF8');
  writerStream1C.write(JSON.stringify(firstCJson,null,2),'UTF8');
  writerStream2.write(JSON.stringify(secondJson,null,2),'UTF8');
  writerStream3.write(JSON.stringify(continentData,null,2),'UTF8');

});//end rl   close
