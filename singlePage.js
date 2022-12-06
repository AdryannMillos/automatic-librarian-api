const puppeteer = require("puppeteer");
const Models = require("./src/models/index");

async function execute() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://leviathancommander.wixsite.com/home/post/trident-leviathan-commander-oct-27-nizhny-novgorod-russia")
  await page.waitForSelector("p.mm8Nw");
  await page.waitForSelector("h1.UbhFJ7");
      
  const title = await page.$$eval("h1.UbhFJ7 ", (elements) =>
  elements.map((item) => item.textContent)
);

  let eventData = await page.$$eval("p.mm8Nw ", (elements) =>
elements.map((item) => item.textContent)
  ); 
  // eventData = eventData.map(item=> item.includes('\n') ? item.slice(0, item.indexOf('\n')) : item )

  eventData = eventData.reduce((accumResult, item) => {
    if (item.includes("\n")) {
       const splittedItems = item.split("\n").map(str => str.trim());
       accumResult.push(...splittedItems);
    } else {
        accumResult.push(item);
    }
  
    return accumResult;
  }, []);
  
  // console.log(eventData[6].substring(eventData[6].indexOf('\n'), eventData[6].length - 1))
  // console.log(eventData[6].slice(0, eventData[6].indexOf('\n')), eventData[6].slice(eventData[6].indexOf('\n'), eventData[6].length) )
   const deckLists = await page.$$eval('p.mm8Nw a', as => as.map(a => {
   return {url:a.href,
          commander: a.text
  }
  }));

// console.log(deckLists)
// return

  const standings = eventData.filter(item => Number(item[0]))

  const decks = standings.map((item, index) =>{
    const position =  isNaN(item[1]) ? item[0] : item[0] + item[1]
    const indexOfStringDivision = item.includes("-")
    ? item.indexOf("-")
    : item.indexOf(")");
    let commander = item.substring(indexOfStringDivision + 2, item.length);

    commander = commander[commander.length-1] == ' ' ? commander.slice(0, commander.length - 1) : commander 
    let list = deckLists.find(item => item.commander === commander)
    
    const obj = {
      position: position,
      commander: commander,
      deckList: typeof list == 'object' ? list.url : undefined
    }
    const indexOfList = deckLists.indexOf(list);
    if (indexOfList > -1) { // only splice array when item is found
      deckLists.splice(indexOfList, 1); // 2nd parameter means remove one item only
    }
    return obj
  })

// console.log(decks)







  // let location = podium.find((item) => item.includes("City"));
  // if (location) {
  //   location = location.replace("Country/City: ", "");
  // }

  // let date = podium.find((item) => item.includes("Data"));
  // if (date) {
  //   date = date.replace("Data:  ", "");
  // }

  // let nbPlayers = podium.find((item) => item.includes("Nb"));
  // if (nbPlayers) {
  //   nbPlayers = nbPlayers.replace("Nb of players: ", "");
  // }
  // let champion = podium.find(
  //   (item) =>
  //     !item.includes("Nb") &&
  //     !item.includes("Data") &&
  //     (item[0] == 1 || item[1] == 1)&&
  //     (item.includes("1.") ||
  //       item.includes("1)") ||
  //       item.includes("1-") ||
  //       item.includes("1"))
  // );
  // if (champion !== undefined) {
  //   remove_before = champion.includes("-")
  //     ? champion.indexOf("-")
  //     : champion.indexOf(")");
  //   champion = champion.substring(remove_before + 2, champion.length - 1);
  // }

  // let second = podium.find(
  //   (item) =>
  //     !item.includes("Nb") &&
  //     !item.includes("Data") &&
  //     item[0] == 2 &&
  //     (item.includes("2.") ||
  //       item.includes("2)") ||
  //       item.includes("2-") ||
  //       item.includes("2"))
  // );
  // if (second !== undefined) {
  //   remove_before = second.includes("-")
  //     ? second.indexOf("-")
  //     : second.indexOf(")");
  //   second = second.substring(remove_before + 2, second.length - 1);
  // }

  // let third = podium.find(
  //   (item) =>
  //     !item.includes("Nb") &&
  //     !item.includes("Data") &&
  //     item[0] == 3 &&
  //     (item.includes("3.") ||
  //       item.includes("3)") ||
  //       item.includes("3-") ||
  //       item.includes("3"))
  // );
  // if (third !== undefined) {
  //   remove_before = third.includes("-")
  //     ? third.indexOf("-")
  //     : third.indexOf(")");
  //   third = third.substring(remove_before + 2, third.length - 1);
  // }

  // let fourth = podium.find(
  //   (item) =>
  //     !item.includes("Nb") &&
  //     !item.includes("Data") &&
  //     item[0] == 4 &&
  //     (item.includes("4.") ||
  //       item.includes("4)") ||
  //       item.includes("4-") ||
  //       item.includes("4"))
  // );
  // if (fourth !== undefined) {
  //   remove_before = fourth.includes("-")
  //     ? fourth.indexOf("-")
  //     : fourth.indexOf(")");
  //   fourth = fourth.substring(remove_before + 2, fourth.length);
  // }

  // if (fourth !== undefined && fourth.includes("5")) {
  //   remove_after = fourth.indexOf("5");
  //   fourth = fourth.slice(0, remove_after);
  // }
  // if (!champion) {
  //   champion = await page.$$eval(
  //     "h3._3qMKZ._1j-51._1FoOD._3M0Fe.Z63qyL",
  //     (elements) => elements.map((item) => item.textContent)
  //   );
  //   champion = champion.filter(item => item.includes('1'))
  //   console.log(champion)
  //   if(!champion || champion.length < 1){
  //     champion = await page.$$eval("ol.public-DraftStyleDefault-ol", (elements) =>
  //     elements.map((item) => item.textContent))
  //     console.log(champion)
  //   }
  //   champion[0] = champion.length > 1 ? champion[1] : champion[0]

  //     remove_before = champion[0].includes("-")
  //   ? champion[0].indexOf("-")
  //   : champion[0].indexOf(")");
  // champion = champion[0].substring(remove_before + 2, champion[0].length - 1);
  // }



  // let championship = {
  //   id: 0,
  //   name: title[0],
  //   location: location,
  //   date: date,
  //   players: nbPlayers,
  //   champion: champion,
  //   top4: champion + " - " + second + " - " + third + " - " + fourth,
  // };

  // console.log(championship);
  // await Models.Championships.create(championship);
  // await page.waitForTimeout(4000);
  await browser.close();
}

execute();
