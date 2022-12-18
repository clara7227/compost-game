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
  /* The dragging code for '.draggable' from the demo above
  
  
   * applies to this demo as well so it doesn't have to be repeated. */
  console.log('buenas')
  interact('.draggable')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      // enable autoScroll
      autoScroll: true,

      listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,

        // call this function on every dragend event
        end(event) {
          var textEl = event.target.querySelector('p')

          textEl && (textEl.textContent =
            'moved a distance of ' +
            (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2) | 0))
              .toFixed(2) + 'px')
        }
      }
    })
  function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  // this function is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener


  // enable draggables to be dropped into this
  interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.yes-drop', //COMO SE ACEPTAN MÁS SELECTORES? - O PUEDEN TENER OTRA CLASE?
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,
    // listen for drop related events:

    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget
      var dropzoneElement = event.target

      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target')
      draggableElement.classList.add('can-drop')
      /*draggableElement.textContent = 'Dragged in'*/
      /*draggableElement.innerHTML = '<img class="restos-carne2"> carne' /*cambia el elemento draggable mientras hace esta acción*/
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')
      /*event.relatedTarget.textContent = 'Dragged out'*/
    },
    ondrop: function (event) {
      /*event.relatedTarget.innerHTML = '<img class="restos-carne2">'*/
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')
    }
  })
  interact('.drag-drop')
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      autoScroll: true,
      // dragMoveListener from the dragging demo above
      listeners: { move: dragMoveListener }
    })



  let btnCompost = document.querySelector("#btn-compostar")
  /*VALIDACIÓN*/
  function validar() {
    /*PUNTUACIÓN*/
    let puntuacion = 0;
    //ARRAYS CON RESULTADOS
    let resultadosPositivos = [];
    let resultadosNegativos = []
    //VALIDAR ELEMENTOS INDIVIDUALES
      //cÁSCARA
      let validarCascara = document.querySelector(".cascara-huevo");
      let clasesCascara = validarCascara.classList;
      let CascaraEnCompost = clasesCascara.contains("can-drop");
      if (CascaraEnCompost) {
        resultadosPositivos.unshift({
          clase: "cascara-huevo",
          imagen: src = "assets/img/ilustraciones/a-huevo.jpg",
          titulo: `Eggshells`,
          mensaje: `Great! Egg shells bring calcium into the compost, which is important for the growth of a lot of plants.` }
        )
        puntuacion = puntuacion + 25
      } else {
        resultadosNegativos.unshift({
          clase: "cascara-huevo",
          imagen: src = "assets/img/ilustraciones/f-huevo.jpg",
          titulo: `Eggshells waste`,
          mensaje: `Egg shells could have brought calcium into the compost, which is important for the growth of a lot of plants.`
        }) 
      }
    //CITRICOS
    let validarCitricos = document.querySelector(".citricos");
    let clasesCitricos = validarCitricos.classList;
    let CitricosEnCompost = clasesCitricos.contains("can-drop");
    if (CitricosEnCompost) {
      resultadosNegativos.unshift({
        clase: "citricos",
        imagen: src="assets/img/ilustraciones/f-acido.jpg",
        titulo: `Compost acidification`,
        mensaje: `Citrus such as oranges or lemons acidify the soil. Lots of microorganisms, which are crucial for the decomposition process, aren't able to thrive under an acid soil. The decomposition process could slow down or stop.
        `
      })
    } else {
      /*resultadosPositivos.unshift({
        clase: "citricos",
        imagen: src="assets/img/ilustraciones/f-acido.jpg",
        titulo: `Poda desaprovechada`,
        mensaje: `Restos de poda como hojas y ramas pueden ir a la compostera, puedes aprovecharla para generar más compost. `
      })*/
      puntuacion = puntuacion + 25
      console.log(puntuacion)
    }
    //PAN
    let validarPan = document.querySelector(".pan");
    let clasesPan = validarPan.classList;
    let PanEnCompost = clasesPan.contains("can-drop");
    if (PanEnCompost) {
      resultadosNegativos.unshift({
        clase: "pan",
        imagen: src="assets/img/ilustraciones/f-plaga.jpg",
        titulo: `Lurking plagues`,
        mensaje: `The bread brought plagues that will be difficult to exterminate. Other processed food like rice or pasta will have a similar effect on the compost.`
      })
    } else {
     /* console.log("mol bien")
      resultadosPositivos.unshift({
        clase: "restos-higiene",
        imagen: `src="img.png"`,
        titulo: `Higiene bien`,
        mensaje: ` Muy bien, has acertado con el higiene. bla bla asjd asd asd jd  aks dkasjj`
      })*/
      puntuacion = puntuacion + 25
      console.log(puntuacion)
    }
    // FRUTAS
    let validarFruta = document.querySelector(".manzana");
    let clasesFruta = validarFruta.classList;
    let FrutaEnCompost = clasesFruta.contains("can-drop");
    if (FrutaEnCompost) {
      resultadosPositivos.unshift({
        clase: "manzana",
        imagen: src="assets/img/ilustraciones/a-fruta.jpg",
        titulo: `Fruit waste`,
        mensaje: `
        Well done! You threw the remains of fruit into the composting bin. They have nutrients and bring humidity into the composting bin `
      })
      puntuacion = puntuacion + 25
      console.log(puntuacion)
    } else {
        resultadosNegativos.unshift({
        clase: "manzana",
        imagen: src="assets/img/ilustraciones/f-fruta.jpg",
        titulo: `Fruta desaprovechada`,
        mensaje: `
        What a shame! You didn't throw the remains of fruit into the composting bin. They have nutrients and bring humidity into the composting bin.
         `
      })
    }
    
    //RENDER RESULTADOFINAL
    let renderVentanaResultados = () => {
      let puntuacionDOM = `<div class="numero-puntuacion"> ${puntuacion}% </div> 
                          <div class="puntuacion-acierto"> success rate </div>`;
      document.querySelector(".puntuacion").innerHTML = puntuacionDOM
      let resultadosPositivosDOM = "";
      resultadosPositivos.forEach(resultadoPositivo => {
        resultadosPositivosDOM += `
        <div class="ficha-resultado">
        
        <img class="${resultadoPositivo.clase}" src="${resultadoPositivo.imagen}"> 
        <div class="mensaje-resultado">
        <h3>${resultadoPositivo.titulo}</h3>
        <p>${resultadoPositivo.mensaje} </p>
        </div>
        </div>`
      })
      document.querySelector(".resultados-positivos-lista").innerHTML = resultadosPositivosDOM
      let resultadosNegativosDOM = "";
      resultadosNegativos.forEach(resultadoNegativo => {
        resultadosNegativosDOM += `
        <div class="ficha-resultado">
        <img class="${resultadoNegativo.clase}" src="${resultadoNegativo.imagen}"> 
        <div class="mensaje-resultado">
        <h3>${resultadoNegativo.titulo}</h3>
        <p>${resultadoNegativo.mensaje} </p>
        </div>
        </div>`
      })
      document.querySelector(".resultados-negativos-lista").innerHTML = resultadosNegativosDOM
    }
    renderVentanaResultados()
    /*ABRIR VENTANA MODAL*/
    let abrirVentanaModal = () => {
      let ventanaModal = document.querySelector('.contenedor-ventana-modal');
      ventanaModal.classList.add('modal-visible');
      console.log('funciona aqui')
    }
    abrirVentanaModal()
    /*BOTON PARA VOLVER A INTENTAR*/
    let siguientePaso = () => {
      let btnSiguiente = document.querySelector('.btn-siguiente');
      if (puntuacion == 100) {
        btnSiguiente.innerHTML = `<a class="siguiente-nivel" href="nivel-2.html"> Next level </a> <a class="salir" href="index.html"> 
        Home</a>`
        console.log('aquiii')
      } else {
        btnSiguiente.innerHTML = '<a class="mismo-nivel" href="nivel-1.html"> Try again </a> <a class="salir" href="index.html"> Home</a>'
      }
    }
    siguientePaso()
  }

  btnCompost.addEventListener("click", validar);

}
