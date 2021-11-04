document.addEventListener('DOMContentLoaded', function() {
let tabs = function () {
    let btns = document.querySelectorAll('.catalog__btn-view');
    btns.forEach(function(e){
      e.addEventListener('click', function(ev){
        const btn = document.querySelectorAll('.catalog__btn-view')
        btn.forEach(function(ev){
          ev.classList.toggle('catalog__btn-view--active')
        if(ev.classList.contains('catalog__btn-view--active')){
          ev.disabled = true;
          ev.setAttribute('disabled', true)
        }
        else {
          ev.disabled = false;
        }
        })
        const path = ev.currentTarget.dataset.path;
        let catalogList = document.querySelectorAll('.catalog__list');
        catalogList.forEach(function(c){
          c.classList.remove('catalog__list--active')
        })

        document.querySelector(`[data-target="${path}"]`).classList.add('catalog__list--active')
        })
    });
}

let fixBlocks = document.querySelectorAll('.fix-block');

let disableScroll = function () {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
  document.body.classList.add('disable-scroll');
  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  })
  document.body.style.paddingRight = paddingOffset
}

let enableScroll = function () {
  document.body.classList.remove('disable-scroll');
  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  })
  document.body.style.paddingRight = '0px';
}

let orderModal = () => {
      const btns = document.querySelectorAll(".catalog__btn-buy");
      const modalOverlay = document.querySelectorAll('.modal__overlay');
      const modal = document.querySelectorAll('.modal')
      const btnClose = document.querySelectorAll(".modal__btn-close")
      btns.forEach( (el) => {
          el.addEventListener('click', (e) => {
              let path = e.currentTarget.getAttribute('data-path');
              modal.forEach((el) => {
                  el.classList.remove("modal--active")
              })
              document.querySelector(`[data-target="${path}"]`).classList.add("modal--active");
              modalOverlay.forEach((elems) => {
                elems.classList.add('modal__overlay--visible');
              })

              disableScroll();
          })
      });
      modalOverlay.forEach( (elem) =>{
        elem.addEventListener('click', (e) => {
          if (e.target === elem){
            elem.classList.remove("modal__overlay--visible")
              modal.forEach((el) => {
                  el.classList.remove("modal--active")
              })
              enableScroll ();
          }
      });
      })

      btnClose.forEach((el) => {
          el.addEventListener('click', () => {
            modal.forEach((el) => {
              el.classList.remove("modal--active")
              })
              modalOverlay.forEach((elems) => {
                elems.classList.remove('modal__overlay--visible');
              })
              document.getElementsByTagName('body')[0].style.overflow = "auto"
          })
      })
}

 const choices =  new Choices( ".modal__select", {
    searchEnabled: false,
    itemSelectText: '',
    classNames: {
      containerOuter: 'choices modal__choices',
    }
});

var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7(999)999-99-99")
im.mask(selector);

new JustValidate('.modal__form', {
		colorWrong: '#ff3300',
		rules: {
			name: {
				required: true,
				strength: {
					custom:'^[a-zA-Zа-яёА-ЯЁ]',
				},
				minLength:4,
				maxLength:15,

			},
			tel: {
					required:true,
					function: (name, value) => {
						const phone = selector.inputmask.unmaskedvalue()
						return Number(phone) && phone.length === 10
					}
			},
		},
		messages: {
			name: {
				required: 'Недопустимый формат',
				strength: 'Недопустимый формат',
				minLength: 'Минимум 4 символа',
			},

			tel: {
				required: 'Недопустимый формат',
				function: 'Недопустимый формат',
			}
		}
});

let rebootDisable = function() {
  let formBtn = document.querySelector('.modal__btn');
  formBtn.addEventListener('click', function(e){
    e.preventDefault();
  })
}

let modalContent = function (){
  let d = document.querySelectorAll(".catalog__btn-buy");
  let m = document.querySelector(".modal__title");
  let i = document.querySelector(".modal__img")
  d.forEach((a) => {
    a.addEventListener('click', function(e){
       let target = e.currentTarget;
       let mom = target.parentElement;
       let title = mom.children[1];
       let textTitle = title.innerHTML;
       m.innerHTML = textTitle;
       let img = mom.firstElementChild;
       let src = img.getAttribute("src")
       i.setAttribute("src", src);
    });
  });
}


modalContent();
rebootDisable ();
tabs ();
orderModal();
});

