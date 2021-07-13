const btnColor = document.getElementById('btnCambiarFondo');
const body = document.getElementsByTagName('body')[0];

btnColor.addEventListener('click', () => {
    body.style.backgroundColor = "green";
})

