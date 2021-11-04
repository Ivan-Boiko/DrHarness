document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.catalog__btn-view').forEach(function(tabsLang){
      tabsLang.addEventListener('click', function(ev){
        const btn = document.querySelectorAll('.catalog__btn-view')
        btn.forEach(function(btns){
          btns.classList.toggle('catalog__btn-view--active')
        if(btns.classList.contains('catalog__btn-view--active')){
          btns.disabled = true;
          btns.setAttribute('disabled', true)
        }
        else {
          btns.disabled = false;
        }
        })

        const path = ev.currentTarget.dataset.path;
        document.querySelectorAll('.catalog__list').forEach(function(c){
          c.classList.remove('catalog__list--active')
        })

        document.querySelector(`[data-target="${path}"]`).classList.add('catalog__list--active')
        })
    });

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

              document.getElementsByTagName('body')[0].style.overflow = "hidden"
          })
      });
      modalOverlay.forEach( (elem) =>{
        elem.addEventListener('click', (e) => {
          if (e.target === elem){
            elem.classList.remove("modal__overlay--visible")
              modal.forEach((el) => {
                  el.classList.remove("modal--active")
                  document.getElementsByTagName('body')[0].style.overflow = "auto"
              })
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
  orderModal();


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

});

