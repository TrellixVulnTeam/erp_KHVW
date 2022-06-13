const search = document.querySelector("#search")
const folder_table = document.querySelector(".folder_table > tbody")
const file_table =  document.querySelector(".file_table > tbody")

let page = 0
let type = "reset"

let co_id = location.pathname.split("/")[2]
let fol_id = location.pathname.split("/")[3]

window.addEventListener("keyup", () => {
    if(window.event.keyCode==13) { // 엔터키 감지
        let xhr = new XMLHttpRequest();
        
        const data = JSON.stringify({value: search.value})

        page = 0

        xhr.open('POST', `/storage/${co_id}/${fol_id}/${page}/ajax`)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(data)
        
        xhr.addEventListener('load', () => {
            const obj = JSON.parse(xhr.responseText)
            let folder_contents = ''
            let file_contents = ''
            type = obj.type

            switch(obj.type) {
                case "reset" :
                    for(let i=0; i<obj.folderList.length; ++i) {
                        co_id = obj.folderList[i].co_id
                        fol_id = obj.folderList[i].fol_id
                        fol_name = obj.folderList[i].fol_name
                        reg_date = obj.folderList[i].reg_date
                        folder_contents +=`
                        <tr>        
                            <td>
                                <a href="/storage/${co_id}/${fol_id}"> 
                                    ${fol_name} 
                                </a>
                            </td>
                            <td>
                                ${reg_date}
                            </td>
                        </tr>`
                    }

                    folder_table.innerHTML = folder_contents

                    for(let i=0; i<obj.fileList.length; ++i) {
                        file_id = obj.fileList[i].file_id
                        fol_id = obj.fileList[i].fol_id
                        file_name = obj.fileList[i].file_name
                        file_extension = obj.fileList[i].file_extension
                        file_path = obj.fileList[i].file_path
                        reg_date = obj.fileList[i].reg_date
                        
                        file_contents += `
                        <tr>
                            <td>
                                ${file_name}
                            </td>
                            <td>
                                ${reg_date}
                            </td>
                            <td>
                                <a href="/viewer/${file_extension}/${file_id}" target="_blank">열기</a> 
                            </td>
                            <td>
                            <a href="/storage/${file_path}"> 다운로드 </a>
                            </td>   
                        </tr>`
                    }

                    file_table.innerHTML = file_contents

                    break

                case "search" :                    
                    folder_table.innerHTML = folder_contents
                    for(let i=0; i<obj.searchList.length; ++i) {
                        co_name = obj.searchList[i].co_name
                        file_id = obj.searchList[i].file_id
                        fol_id = obj.searchList[i].fol_id
                        file_name = obj.searchList[i].file_name.replaceAll(search.value, `<mark>${search.value}</mark>`)
                        file_extension = obj.searchList[i].file_extension
                        reg_date = obj.searchList[i].reg_date
                        file_path = obj.file_path[i]

                        file_contents += `
                            <tr>
                                <td>
                                    ${file_name} <br>
                                    <div class="file_path"> ${file_path} <div>
                                </td>
                                <td>
                                    ${reg_date}
                                </td>
                                <td>
                                    <a href="/viewer/${file_extension}/${file_id}" target="_blank">열기</a> 
                                </td>
                                <td>
                                    <a href="/storage/${file_path}" download> 다운로드 </a> 
                                </td>   
                            </tr>`
                    }
            
                    file_table.innerHTML = file_contents

                    break
                
            }
        })
    }
})

window.addEventListener("scroll", () => {
    bottom = document.body.scrollHeight
    curPos = window.scrollY + window.innerHeight;

    if(curPos >= bottom && type == "search") {
        let xhr = new XMLHttpRequest();
        
        const data = JSON.stringify({value: search.value})

        page ++
        
        xhr.open('POST', `/storage/${co_id}/${fol_id}/${page}/ajax`)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(data)
        
        xhr.addEventListener('load', () => {
            const obj = JSON.parse(xhr.responseText)
            let file_contents = ''
            type = obj.type

            for(let i=0; i<obj.searchList.length; ++i) {
                co_name = obj.searchList[i].co_name
                file_id = obj.searchList[i].file_id
                fol_id = obj.searchList[i].fol_id
                file_name = obj.searchList[i].file_name.replaceAll(search.value, `<mark>${search.value}</mark>`)
                file_extension = obj.searchList[i].file_extension
                reg_date = obj.searchList[i].reg_date
                file_path = obj.file_path[i]

            file_contents += `
                <tr>
                    <td>
                        ${file_name} <br>
                        <div class="file_path"> ${file_path} <div>
                    </td>
                    <td>
                        ${reg_date}
                    </td>
                    <td>
                        <a href="/viewer/${file_extension}/${file_id}" target="_blank">열기</a> 
                    </td>
                    <td>
                        <a href="/storage/${file_path}" download> 다운로드 </a> 
                    </td>   
                </tr>`
            }
            
            file_table.insertAdjacentHTML('beforeend', file_contents)
        })
    }
})
