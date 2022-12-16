window.onload = function () {
  
    /*ABRIR Y CERRAR MENU*/
    let menuEvent = () => {
      let btnMenu = document.querySelector('.btn-menu');
      let menuDesplegable = document.querySelector('.menu-desplegable');
      let menuDesplegableAbierto = false;
      let abrirMenuDesplegable = () => {
        menuDesplegable.classList.add('abrir-menu-desplegable');
        btnMenu.classList.add('fa-times');
        btnMenu.classList.remove('fa-bars');
      }
      let cerrarMenuDesplegable = () => {
        menuDesplegable.classList.remove('abrir-menu-desplegable');
        btnMenu.classList.remove('fa-times');
        btnMenu.classList.add('fa-bars');
      }
      btnMenu.addEventListener('click', () => {
        if (!menuDesplegableAbierto) {
          abrirMenuDesplegable()
          menuDesplegableAbierto = true;
        } else {
          cerrarMenuDesplegable()
          menuDesplegableAbierto = false;
        }
      });
    }
    menuEvent()
}