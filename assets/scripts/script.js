document.addEventListener("DOMContentLoaded", () => {
    
  //------------------------------------//
  // LÓGICA PARA EL MENÚ HAMBURGUESA
  //------------------------------------//
  const menuButton = document.getElementById("menu-button");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuButton && navMenu) {
      menuButton.addEventListener("click", () => {
          navMenu.classList.toggle("active");
          menuButton.classList.toggle("active");
      });

      // Cierra el menú al hacer clic en un enlace
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              navMenu.classList.remove('active');
              menuButton.classList.remove('active');
          });
      });
  }

  //------------------------------------//
  // LÓGICA PARA ANIMACIÓN DE BARRAS DE PROGRESO
  //------------------------------------//
  const skillsSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar');

  const animateProgressBars = () => {
      progressBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          bar.style.width = progress + '%';
      });
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateProgressBars();
              observer.unobserve(entry.target); // Dejar de observar una vez animado
          }
      });
  }, {
      threshold: 0.5 // Se activa cuando el 50% de la sección es visible
  });

  if (skillsSection) {
      observer.observe(skillsSection);
  }


  //------------------------------------//
  // LÓGICA PARA VALIDACIÓN DEL FORMULARIO
  //------------------------------------//
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  if (form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault(); // Prevenir el envío real del formulario
          const isNameValid = validateName();
          const isEmailValid = validateEmail();
          const isMessageValid = validateMessage();

          if (isNameValid && isEmailValid && isMessageValid) {
              // Si todo es válido, podrías enviar el formulario aquí
              alert('¡Formulario enviado con éxito!');
              form.reset(); // Limpiar el formulario
              clearAllErrors();
          } else {
              alert('Por favor, corrige los errores en el formulario.');
          }
      });
      
      // Validación en tiempo real al quitar el foco o escribir
      nameInput.addEventListener('input', validateName);
      emailInput.addEventListener('input', validateEmail);
      messageInput.addEventListener('input', validateMessage);
  }
  
  function validateName() {
      const value = nameInput.value.trim();
      if (value === '') {
          showError(nameInput, 'El nombre es obligatorio.');
          return false;
      }
      clearError(nameInput);
      return true;
  }

  function validateEmail() {
      const value = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value === '') {
          showError(emailInput, 'El correo electrónico es obligatorio.');
          return false;
      }
      if (!emailRegex.test(value)) {
          showError(emailInput, 'Por favor, introduce un correo válido.');
          return false;
      }
      clearError(emailInput);
      return true;
  }

  function validateMessage() {
      const value = messageInput.value.trim();
      if (value === '') {
          showError(messageInput, 'El mensaje no puede estar vacío.');
          return false;
      }
      clearError(messageInput);
      return true;
  }

  function showError(input, message) {
      input.classList.add('invalid');
      const errorElement = input.nextElementSibling;
      errorElement.textContent = message;
  }

  function clearError(input) {
      input.classList.remove('invalid');
      const errorElement = input.nextElementSibling;
      errorElement.textContent = '';
  }
  
  function clearAllErrors() {
      clearError(nameInput);
      clearError(emailInput);
      clearError(messageInput);
  }
});