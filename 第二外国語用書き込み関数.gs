function foreignLanguage(sh2_write,departmentCategory,j_youbi,haitouYoubi,j_gyou,j_kamoku,haitouKamoku,haitouRen,
        haitouClass,j_tantou,haitouTantou,step) {
  let is_foreignName = true
  let germany = j_kamoku.includes('ドイツ');
  let france = j_kamoku.includes('フランス');
  let chinese = j_kamoku.includes('中国');
  let korea = j_kamoku.includes('韓国');


  //第二外国語の判別
  if(germany == true || france == true || chinese == true || korea == true){
    //科目名→曜日・時限→名前の順番に一致
    if(j_kamoku == haitouKamoku){
      if(j_youbi.includes(haitouYoubi) == true){
        j_tantou == haitouTantou ? writeRenAndClassData(sh2_write,departmentCategory,j_gyou,haitouRen,haitouClass,step): is_foreignName = false;
        //TODO:ここ応急処置
        if(j_tantou == haitouTantou=='的場寿光' && (j_youbi.includes('月1, 月2, 木3, 木4,月3, 月4, 木1, 木2,月5, 月6, 水3, 水4'))){
          
        }
      }else{
        is_foreignName = false
      }
    }else{
      is_foreignName = false
    }
  }else{
    is_foreignName = false
  }
  return is_foreignName;
}
