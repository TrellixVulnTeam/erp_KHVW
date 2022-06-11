const search = document.querySelector("#search")
const folder_table = document.querySelector(".folder_table > tbody")
const file_table =  document.querySelector(".file_table > tbody")

co_id = location.pathname.split("/")[2]
fol_id = location.pathname.split("/")[3]
ajax_Pathname = `/storage/${co_id}/${fol_id}/ajax`


window.addEventListener("keyup", () => {
    if(window.event.keyCode==13) { // 엔터키 감지
        let xhr = new XMLHttpRequest();
        
        const data = JSON.stringify({value: search.value})

        xhr.open('POST', ajax_Pathname)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(data)
        
        xhr.addEventListener('load', () => {
            const entryObj = JSON.parse(xhr.responseText)
            let folder_contents = ''
            let file_contents = ''
            switch(entryObj.type) {
                case "reset" :
                    for(let i=0; i<entryObj.folderList.length; ++i) {
                        co_id = entryObj.folderList[i].co_id
                        fol_id = entryObj.folderList[i].fol_id
                        fol_name = entryObj.folderList[i].fol_name
                        reg_date = entryObj.folderList[i].reg_date
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

                    for(let i=0; i<entryObj.fileList.length; ++i) {
                        file_id = entryObj.fileList[i].file_id
                        fol_id = entryObj.fileList[i].fol_id
                        file_name = entryObj.fileList[i].file_name
                        file_extension = entryObj.fileList[i].file_extension
                        file_path = entryObj.fileList[i].file_path
                        reg_date = entryObj.fileList[i].reg_date
                        
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

                    for(let i=0; i<entryObj.fileList.length; ++i) {
                        co_name = entryObj.fileList[i].co_name
                        file_id = entryObj.fileList[i].file_id
                        fol_id = entryObj.fileList[i].fol_id
                        file_name = entryObj.fileList[i].file_name
                        file_extension = entryObj.fileList[i].file_extension
                        reg_date = entryObj.fileList[i].reg_date
                        file_path = entryObj.fileList[i].file_path

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
