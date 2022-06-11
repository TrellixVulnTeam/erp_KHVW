const co_sel = document.querySelector("#co_sel")

co_sel.addEventListener('change', () => {
    location.href= `storage/${co_sel.value}/0`
})