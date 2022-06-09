const modal = document.querySelector("#modal")
const spaceBlack = document.querySelector("#space-black") 


const openModal = () => {
    let scrollY = document.body.scrollHeight; 
    modal.style.top = "40%"
    modal.style.left = "50%"
    
    spaceBlack.style.top = "0"
    spaceBlack.style.left = "0"
    spaceBlack.style.height = `${scrollY}px`
}

const closeModal = () => {
    

    modal.style.top = "-500%"
    modal.style.left = "-500%"

    spaceBlack.style.height = "0"
    spaceBlack.style.top = "-500%"
    spaceBlack.style.left = "-500%"
}

