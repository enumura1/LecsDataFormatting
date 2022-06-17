//全角(英数字)→半角に変換
function wordFormatFullTohalf (word) {
  //半角
  let halfWord = word.replace(/[！-～]/g,
    function(word) {
      //コード値を0xFEE0シフト
      return String.fromCharCode( word.charCodeAt(0)-0xFEE0);
    }
  );
  return halfWord;
}

//半角カタカナの有無をチェック
function isHankakuKana(word) {
    let isHankakuword = !!word.match(/^[ｦ-ﾟ]*$/);
    return isHankakuword
}

//半角(カタカナ)→全角に変換
function katakanaSizeHalfToFull(str) {
    let kanaMap = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };

    let reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    let fullWidthKatakana = str
            .replace(reg, function (match) {
                return kanaMap[match];
            })
            .replace(/ﾞ/g, '゛')
            .replace(/ﾟ/g, '゜');
    return fullWidthKatakana
};


//正規表現：空白(全角半角)
function checkBlank (word) {
  let fullHalfBlank = word.search(/\s+/g);
  return fullHalfBlank
}


//正規表現：日本語
function checkJapaneseFormat (word) {
    let retval_japaneseFormat = word.search(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]/);
    return retval_japaneseFormat
}

//正規表現：大文字英語
function checkUpperEnglishWord (word) {
  let retval_upperEnglishWord = word.search(/^[A-Z]/);
  return retval_upperEnglishWord
}

//文字末尾(186),(62)等の消去
function checkLastNumber (word) {
  word=wordFormatFullTohalf(word);
  let wordNameIdou = word.search('移動');
  let wordNameKotei = word.search('固定');
  let wordNameKai = word.search('階');
  let daigkauIn = word.search('院')

  //後ろから５文字
  let lastFiveword = word.slice(-5);
  //数字３文字　例(186)
  let threeNumbers = lastFiveword.slice(1,4);
  //数字２文字　例(62)
  let twoNumbers = lastFiveword.slice(2,4);
  //数字１文字チェック  例(8)
  let oneNumbers = lastFiveword.slice(3,4);
  let checkThreeNumbers = threeNumbers.match(/^[0-9]+$/);
  let checkTwoNumbers = twoNumbers.match(/^[0-9]+$/);
  let checkOneNumers = oneNumbers.match(/^[0-9]+$/);
  let retval_word='';

  if(checkThreeNumbers != null){
    if(wordNameIdou!=-1){
      retval_word = word.replace('移動','');
    }else{
      retval_word = word;
    }
    if(wordNameKotei!=-1){
      retval_word = retval_word.replace('固定','');
    }else{
      retval_word = retval_word;
    }
    if(wordNameKai!=-1){
      retval_word=retval_word;
    }else{
      retval_word = retval_word.slice(0,-5);
    }
    return retval_word
  }else if (checkTwoNumbers != null) {
    if(wordNameIdou!=-1){
      retval_word = word.replace('移動','');
    }else{
      retval_word = word;
    }
    if(wordNameKotei!=-1){
      retval_word = retval_word.replace('固定','');
    }else{
      retval_word = retval_word;
    }
    if(wordNameKai!=-1){
      retval_word=retval_word;
    }else{
      retval_word=retval_word.slice(0,-4);
    }
    
    return retval_word
  }else if(checkOneNumers!= null){
    if(wordNameIdou!=-1){
      retval_word = word.replace('移動','');
    }else{
      retval_word = word;
    }
    if(wordNameKotei!=-1){
      retval_word = retval_word.replace('固定','');
    }else{
      retval_word = retval_word;
    }
    if(wordNameKai!=-1){
      retval_word=retval_word;
    }else{
      retval_word=retval_word.slice(0,-3);
    }
    return retval_word
  }else{
    retval_word=word;
    return retval_word
  }
}

//Ⅰ,Ⅱ,Ⅲ など→1,2,3に変換
function changeSymbolToNumber (word) {
  let retval_1 = word.search('Ⅰ');
  let retval_1_1 = word.search('I');
  let retval_1_2 = word.search('Ｉ');
  let retval_2 = word.search('Ⅱ');
  let retval_2_1 = word.search('II');
  let retval_3 = word.search('Ⅲ');
  let retval_3_1 = word.search('III');
  let retval_4 = word.search('IV');
  let retval_4_1 = word.search('Ⅳ');
  let retval_5 = word.search('Ⅴ');
  let retval_6 ='';
  
  if(retval_5 != -1) {
    retval_6 = word.replace('Ⅴ','5');
    return retval_6
  }else if(retval_4 != -1){
    retval_6 = word.replace('IV','4');
    return retval_6
  }else if(retval_4_1 != -1){
    retval_6 = word.replace('Ⅳ','4');
    return retval_6
  }else if(retval_3 != -1) {
    retval_6 = word.replace('Ⅲ','3');
    return retval_6
  }else if(retval_3_1 != -1) {
    retval_6 = word.replace('III','3');
    return retval_6
  }else if(retval_2 != -1) {
    retval_6 = word.replace('Ⅱ','2');
    return retval_6
  }else if(retval_2_1 != -1) {
    retval_6 = word.replace('II','2');
    return retval_6
  }else if(retval_1 != -1) {
    retval_6 = word.replace('Ⅰ','1');
    return retval_6
  }else if(retval_1_1 != -1) {
    retval_6 = word.replace('I','1');
    return retval_6
  }else if(retval_1_2 != -1) {
    retval_6 = word.replace('Ｉ','1');
    return retval_6
  }else{
    retval_6 = word;
    return retval_6
  }
}

//正規表現でチェック：カンマ
function checkComma(word) {
  let comma = word.search(/,/);
  return comma;
}

//正規表現でチェック：・ 
function checkDot (word) {
  let retval_dot = word.search(/・/g);
  return retval_dot
}

//全角中点(・)のチェック
function checkTyuten(word){
  let tyuten = word.search(/・/);
  return tyuten;
}

//全角コロン(:)のチェック
function checkKoron(word) {
  let koron = word.search(/：/);
  return koron;
}

