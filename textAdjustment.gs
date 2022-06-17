function textAdjusment(sheetName,spSheet) {
  console.log(sheetName)
  const sheetNameGakubu = spSheet.getSheetByName(sheetName);
  let countRow = sheetNameGakubu.getLastRow();

  for (let step = 2; step < countRow+1; step++){
    let subjectCell = sheetNameGakubu.getSheetValues(step,9,1,1);
    let subjectValue =subjectCell[0][0];
    let subjectCellRen = sheetNameGakubu.getSheetValues(step,8,1,1);
    let subjectValueRen =subjectCellRen[0][0];
    

    let wordIdou;
    let wordSulash;
    let wordKaigyou;
    let supecificWord;
    let removedWord;
    let removedNumRen;
    let removedNumClass;
    let wordRen;
    let wordClass;

    let is_idou = subjectValue.search('移動');
    let is_ICT = subjectValue.search('ICT');
    let is_kotei = subjectValue.search('固定');
    let is_horu = subjectValueRen.search('大学ホール');
    let is_blank = subjectValue.search(/\s/);

    is_idou != -1 ? wordIdou = subjectValue.replace('移動', "") : wordIdou = subjectValue;
    is_ICT != -1 ? wordSulash = 'ICTルーム' : wordSulash = wordIdou;
    is_kotei != -1 ? wordKaigyou = wordSulash.slice(0,is_kotei) : wordKaigyou = wordSulash;

    is_kotei != -1 && wordKaigyou.search('教室') == -1 && wordKaigyou.search('大学ホール') == -1 && wordKaigyou.search('数学') == -1?
     supecificWord = wordKaigyou.slice(0,3)+'講義室固定':supecificWord =wordKaigyou;

    is_blank != -1 ? removedWord = supecificWord.replace(/\s/, "") : removedWord = supecificWord;

    //練
    //例 最後尾の(250,18)等の除去
    removedNumRen = checkLastNumber(subjectValueRen);
    is_horu != -1 ? wordRen = '大学ホール固定' : wordRen = removedNumRen;
    //教室
    //例 最後尾の(250,18)等の除去
    removedWord.search('院') == -1 ? removedNumClass = checkLastNumber(removedWord):removedNumClass=removedWord;
    removedWord.indexOf('講講義室固定') != -1 ? wordClass = (removedNumClass.slice(0,2) +'講義室固定'):wordClass = removedNumClass;

    //更新
    sheetNameGakubu.getRange(step,8,1,1).setValue(wordRen)
    sheetNameGakubu.getRange(step,9,1,1).setValue(wordClass)
    if(step/10 == 0){console.log(step)}
  }
}


function arangeAdjusment(name) {
  const spreadSheet = SpreadsheetApp.openById("14Tu3h4hfHlT1Db8DaFzgVyQ4bmpuLmLzeAs30QyNCUU");
  const gakubuNameArray = [name];

  gakubuNameArray.map(x => textAdjusment(x,spreadSheet))
}
