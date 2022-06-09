// index 
// (ctrl+f)로 "(숫자)"를 검색
// (1). 숫자 세자리수의 콤마를 부여 < 20211018 김진우
// (2). 랜덤 숫자 함수  < 20211018 김진우
// (3). 랜덤 문자 함수 < 20211018 김진우
// (4). 랜덤 문자+숫자 함수 < 20211018 김진우
// (5). url 이동 < 20220317 김진우

// (1).
addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

// (2). min 미만이 될 수 없으며, max를 초과할 수 없다.
randNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}   

// (3). a-z, A-Z 랜덤
randStr = (num) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const stringLength = num
    let randStr = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randStr += chars.substring(rnum, rnum + 1)
    }
    return randStr
}

// (4). a-z, A-Z, 0-9 랜덤
randStrNum = (num) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const stringLength = num
    let randStr = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randStr += chars.substring(rnum, rnum + 1)
    }
    return randStr
}

// (5). URI 단계를 조정 하여, 해당 URI로 이동
goToUrl = (step, uri) => {
  const urlArr = location.href.split("/").slice(3, location.href.split("/").lastIndex)
  const host = location.host
  const urlstep = step
  let url
  if(step === 0) {
    url = `${location.protocol}//${host}${urlArr.slice(0, urlstep).join('/')}/${uri}`
  } else {
    url = `${location.protocol}//${host}/${urlArr.slice(0, urlstep).join('/')}/${uri}`
  }

  location.href = url
}