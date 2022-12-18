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
    //carne
    let validarCarne = document.querySelector(".restos-carne");
    let clasesCarne = validarCarne.classList;
    let carneEnCompost = clasesCarne.contains("can-drop");
    if (carneEnCompost) {
      resultadosNegativos.unshift({
        clase: "restos-carne",
        imagen: src="assets/img/ilustraciones/f-ratas.jpg",
        titulo: `Undercover rats`,
        mensaje: `Drawn by the smell of rotten meat and fish, a family of rats has built its home in the composting bin. And they won't leave it without a fight.`
      })
    } else {
      /*resultadosPositivos.unshift({
        clase: "restos-carne",
        imagen: `src="img.png"`,
        titulo: `Carne bien`,
        mensaje: `Muy bien, has acertado con la carne. (..)`
      })*/
      puntuacion = puntuacion + 25
      console.log(puntuacion)
    }
    //PODA
    let validarPoda = document.querySelector(".restos-poda");
    let clasesPoda = validarPoda.classList;
    let podaEnCompost = clasesPoda.contains("can-drop");
    if (podaEnCompost) {
      resultadosPositivos.unshift({
        clase: "restos-poda",
        imagen: src="assets/img/ilustraciones/a-poda.jpg",
        titulo: `Pruning waste`,
        mensaje: `The remains of pruning such as leaves and branches can go in the composting bin. After you throw your food waste, it's important to cover it up with this kind of "dry matter" to help the decomposition process.`
      })
      puntuacion = puntuacion + 25
      console.log(puntuacion)
    } else {
      resultadosNegativos.unshift({
        clase: "restos-poda",
        imagen: src="assets/img/ilustraciones/f-poda.jpg",
        titulo: `Pruning waste`,
        mensaje: `The remains of pruning such as leaves and branches can go in the composting bin. After you throw your food waste, it's important to cover it up with this kind of "dry matter" to help the decomposition process. `
      })
    
    }
    //HIGIENE
    let validarHigiene = document.querySelector(".productos-higiene");
    let clasesHigiene = validarHigiene.classList;
    let higieneEnCompost = clasesHigiene.contains("can-drop");
    if (higieneEnCompost) {
      resultadosNegativos.unshift({
        clase: "restos-higiene",
        imagen: src="assets/img/ilustraciones/f-pañal.jpg",
        titulo: `Immortal diaper`,
        mensaje: `After months and even years, diapers, sanitary towels and tampons remain the same. Probably not even our grandchildren will get to see how they decompose. Plus, they leave an ugly smell that won't go away in a long time either.`
      })
    } else {
      console.log("mol bien")
      /*resultadosPositivos.unshift({
        clase: "restos-higiene",
        imagen: `src="img.png"`,
        titulo: `Higiene bien`,
        mensaje: ` Muy bien, has acertado con el higiene. bla bla asjd asd asd jd  aks dkasjj`
      })*/
      puntuacion = puntuacion + 25
      console.log(puntuacion)
    }
    //VERDURAS
    let validarVerdurasF = document.querySelector(".restos-verduras-frescas");
    let clasesVerdurasF = validarVerdurasF.classList;
    let VerdurasFEnCompost = clasesVerdurasF.contains("can-drop");
    if (VerdurasFEnCompost) {
      resultadosPositivos.unshift({
        clase: "",
        imagen: src="assets/img/ilustraciones/a-verdura.jpg",
        titulo: `Vegetable waste`,
        mensaje: `Nice job! The remains of fresh vegetables like stems, leaves or skins can go to the compost.`
      })
      puntuacion = puntuacion + 25
      console.log(puntuacion)
    } else {
        resultadosNegativos.unshift({
        clase: "",
        imagen: src="assets/img/ilustraciones/f-verdura.jpg",
        titulo: `Vegetable waste`,
        mensaje: `The remains of fresh vegetables like stems, leaves or skins can go to the compost. `
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
