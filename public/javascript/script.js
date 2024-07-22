(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  const filterBar = document.getElementById('filter-bar');
  const slideLeftBtn = document.getElementById('slide-left');
  const slideRightBtn = document.getElementById('slide-right');

  slideLeftBtn.addEventListener('click',()=>{
          filterBar.scrollBy({left:-100,behavior:'smooth'})
  });
  slideRightBtn.addEventListener('click',()=>{
          filterBar.scrollBy({left:400,behavior:'smooth'})
  });