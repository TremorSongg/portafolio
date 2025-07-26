document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Tema Claro/Oscuro ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    // Función para establecer el tema y actualizar los iconos
    function setTheme(mode) {
  const logo = document.getElementById('logo-fondo');

  if (logo) {
    // Fade out
    logo.classList.add('fade-out');

    // Después de la transición, cambia el src y fade in
    setTimeout(() => {
      if (mode === 'light') {
        logo.src = 'images/dia-banner.png';
      } else {
        logo.src = 'images/noche-banner.png';
      }
      // Fade in
      logo.classList.remove('fade-out');
    }, 500); // 500ms coincide con el transition duration del CSS
  }

  if (mode === 'light') {
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light-mode');
    themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
  } else {
    body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark-mode');
    themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
  }

  const footer = document.querySelector('footer');

if (footer) {
  if (mode === 'light') {
    footer.classList.remove('is-dark');
    footer.classList.add('is-light');
  } else {
    footer.classList.remove('is-light');
    footer.classList.add('is-dark');
  }
}

  sunIcon.classList.toggle('is-hidden', mode === 'light');
  moonIcon.classList.toggle('is-hidden', mode !== 'light');
}

    // Cargar el tema guardado o establecer el modo oscuro por defecto al inicio
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
        setTheme('light');
    } else {
        setTheme('dark'); // Tema oscuro por defecto
    }

    // Toggle del tema al hacer clic en el botón
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });

    // --- Lógica de Carga de Secciones ---
    // Función para cargar secciones dinámicamente
    function cargarSeccion(seccion) {
        const contenido = document.getElementById("contenido");
        const navButtons = document.querySelectorAll('.nav-buttons .nes-btn');

        // Remover la clase 'is-active' de todos los botones de navegación
        navButtons.forEach(button => {
            // Asegurarse de no remover la clase 'is-active' del theme-toggle-btn si la tuviera
            if (!button.classList.contains('theme-toggle-btn')) {
                button.classList.remove('is-active');
            }
        });

        // Añadir la clase 'is-active' al botón clickeado (excluyendo el botón de tema)
        const clickedButton = document.querySelector(`.nav-buttons .nes-btn[onclick*="${seccion}"]`);
        if (clickedButton) {
            clickedButton.classList.add('is-active');
        }

        contenido.classList.remove("fade-in");

        setTimeout(() => {
            let htmlContent = '';
            let needsCarouselInit = false;

            switch (seccion) {
                case 'inicio':
                    htmlContent = `
                        <section class="nes-container with-title is-dark">
                            <p class="title">Bienvenido</p>
                            <p>Mi nombre es Juan Pablo, soy desarrollador Fullstack en proceso de titulacion, trabajo como freelance desarrollando proyectos.</p>
                            <p>En este portafolio encontrarás información sobre mis habilidades, proyectos y formas de contacto.</p>
                            <p>¡Espero que disfrutes explorando mi trabajo!</p>
                        </section>`;
                    break;

                case 'habilidades':
    htmlContent = `
        <section class="nes-container with-title is-dark habilidades-section">
            <p class="title">Habilidades</p>
            <div class="habilidades-wrapper">
                <aside class="sidebar">
                    <button class="nes-btn habilidad-btn" data-skill="java">Java / Spring Boot</button>
                    <button class="nes-btn habilidad-btn" data-skill="python">Python / PL/SQL</button>
                    <button class="nes-btn habilidad-btn" data-skill="frontend">HTML / CSS / JS</button>
                    <button class="nes-btn habilidad-btn" data-skill="bd">MySQL / Oracle</button>
                </aside>
                <article class="habilidad-info nes-container is-dark" id="habilidad-info">
                    <p>Selecciona una habilidad para ver más información.</p>
                </article>
            </div>
        </section>`;

    setTimeout(() => {
        document.querySelectorAll('.habilidad-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const skill = e.target.dataset.skill;
                const infoBox = document.getElementById('habilidad-info');
                let content = '';

                switch (skill) {
                    case 'java':
                        content = `
                            <h3 class="nes-text is-primary">Java / Spring Boot</h3>
                            <p>Desarrollo de APIs RESTful, control de dependencias con Maven, uso de JPA con Hibernate, y estructura MVC con Spring Boot.</p>
                            <p>Experiencia en pruebas unitarias con JUnit y Mockito.</p>
                            <p>Desarrollo de aplicaciones web con Thymeleaf y Spring Security para autenticación y autorización.</p>
                            <p>Implementación de microservicios.</p>
                            <p>Integración con bases de datos relacionales y NoSQL.</p>
                            <p>Uso de herramientas de construcción como Maven.</p>`;
                        break;
                    case 'python':
                        content = `
                            <h3 class="nes-text is-success">Python / PL/SQL</h3>
                            <p>Automatización, scripts de backend, análisis de datos, y desarrollo de lógica empresarial usando PL/SQL en bases de datos Oracle.</p>
                            <p>Certificado en Entry Level Python Programmer (PCEP).</p>`;
                        break;
                    case 'frontend':
                        content = `
                            <h3 class="nes-text is-warning">HTML / CSS / JS</h3>
                            <p>Diseño responsivo, uso de NES.css, interactividad con JavaScript puro y enfoque en UI/UX retro.</p>
                            <p>Desarrollo de aplicaciones web con HTML5, CSS3 y JavaScript.</p>
                            <p>Implementación de animaciones y transiciones CSS.</p>
                            <p>Uso de frameworks como Bootstrap y Tailwind CSS.</p>`;
                        break;
                    case 'bd':
                        content = `
                            <h3 class="nes-text is-error">MySQL / Oracle</h3>
                            <p>Diseño de esquemas relacionales, procedimientos almacenados, índices, y optimización de consultas en motores SQL.</p>
                            <p>Constructores de consultas complejas, uniones y subconsultas.</p>`;
                        break;
                }

                infoBox.innerHTML = content;
            });
        });
    }, 100);
    break;

                case 'proyectos':
                    htmlContent = `
                        <section class="section nes-container with-title is-dark">
                            <p class="title">🎮 Proyectos</p>
                            <div class="carousel-container">
                                <button class="nes-btn is-primary nav-arrow prev-btn">◀</button>
                                <div class="carousel-track">
                                    <div class="carousel-item">
                                        <iframe 
                                        width="560" 
                                        height="315" 
                                        src="https://www.youtube.com/embed/zOx9MnRFiRk?si=iWVXvvnclO7LNBRA" 
                                        title="Proyecto DuocUC - InscribeMe" 
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                                        picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" 
                                        allowfullscreen></iframe>
                                    </div>
                                    <div class="carousel-item">
                                        <iframe
                                            width="600"
                                            height="340"
                                            src="https://www.youtube.com/embed/some_other_video_id?si=abcdef"
                                            title="Proyecto NES - Video 2"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen>
                                        </iframe>
                                    </div>
                                    <div class="carousel-item">
                                        <iframe
                                            width="600"
                                            height="340"
                                            src="https://www.youtube.com/embed/yet_another_video_id?si=abcdef"
                                            title="Proyecto NES - Video 3"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen>
                                        </iframe>
                                    </div>
                                </div>
                                <button class="nes-btn is-primary nav-arrow next-btn">▶</button>
                            </div>
                        </section>`;
                    needsCarouselInit = true;
                    break;

                case 'contacto':
          htmlContent = `
            <section class="nes-container with-title is-dark">
              <p class="title">Contacto</p>
              <p>¡Espero tu mensaje! Conectemos y charlemos sobre proyectos interesantes. 📬</p>
              <form id="contact-form" novalidate>
                <div class="nes-field">
                  <label for="name">Nombre</label>
                  <input type="text" name="name" id="name" class="nes-input" required />
                </div>
                <div class="nes-field">
                  <label for="email">Email</label>
                  <input type="email" name="email" id="email" class="nes-input" required />
                </div>
                <div class="nes-field">
                  <label for="message">Mensaje</label>
                  <textarea name="message" id="message" class="nes-textarea" required></textarea>
                </div>
                <button type="submit" class="nes-btn is-primary mt-4">Enviar</button>
              </form>
              <div id="form-feedback" class="form-feedback nes-container is-rounded mt-4">
                <div class="social-icons">
                  <a href="https://www.linkedin.com/in/pablo-rivera-560923149/" target="_blank" aria-label="LinkedIn">
                    <i class="nes-icon linkedin is-medium"></i>
                  </a>
                  <a href="https://wa.me/56935116729" target="_blank" aria-label="WhatsApp">
                    <i class="nes-icon whatsapp is-medium"></i>
                  </a>
                  <a href="mailto:tremorsong86@gmail.com" target="_blank" aria-label="Correo">
                    <i class="nes-icon gmail is-medium"></i>
                  </a>
                  <a href="https://github.com/TremorSongg" target="_blank" aria-label="GitHub">
                    <i class="nes-icon github is-medium"></i>
                  </a>
                </div>
              </div>
            </section>`;
          break;
      }

      contenido.innerHTML = htmlContent;

      if (needsCarouselInit) {
        initCarousel();
        if (window.YT && window.YT.Player) {
          inicializarReproductoresYouTube();
        } else {
          window.onYouTubeIframeAPIReady = inicializarReproductoresYouTube;
        }
      }

      if (seccion === 'contacto') {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
          contactForm.addEventListener('submit', handleContactFormSubmit);
        }
      }

      contenido.classList.add("fade-in");
    }, 100);
  }

  function handleContactFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const formFeedback = document.getElementById('form-feedback');

    formFeedback.classList.remove('is-success', 'is-error');
    formFeedback.innerHTML = ''; // limpiar feedback previo

    if (!name || !email || !message) {
      formFeedback.innerHTML = `
        <p class="nes-text is-error">❌ Por favor, completa todos los campos.</p>
        ${getSocialIconsHtml()}
      `;
      formFeedback.classList.add('is-error');
      return;
    }

    // Construimos FormData para enviar
    const formData = new FormData(form);

    fetch('https://formspree.io/f/xvgqawyz', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        formFeedback.innerHTML = `
          <p class="nes-text is-success">✅ ¡Gracias! Tu mensaje ha sido enviado.</p>
          ${getSocialIconsHtml()}
        `;
        formFeedback.classList.add('is-success');

        setTimeout(() => {
          form.reset();
        }, 300);
      } else {
        return response.json().then(err => {
          formFeedback.innerHTML = `
            <p class="nes-text is-error">❌ Hubo un error al enviar. Intenta más tarde.</p>
            ${getSocialIconsHtml()}
          `;
          formFeedback.classList.add('is-error');
          console.error(err);
        });
      }
    })
    .catch(error => {
      formFeedback.innerHTML = `
        <p class="nes-text is-error">🚨 No se pudo conectar al servidor.</p>
        ${getSocialIconsHtml()}
      `;
      formFeedback.classList.add('is-error');
      console.error(error);
    });
  }

  function getSocialIconsHtml() {
    return `
      <div class="social-icons">
        <a href="https://www.linkedin.com/in/tremor" target="_blank" aria-label="LinkedIn">
          <i class="nes-icon linkedin is-medium"></i>
        </a>
        <a href="https://wa.me/56912345678" target="_blank" aria-label="WhatsApp">
          <i class="nes-icon whatsapp is-medium"></i>
        </a>
        <a href="mailto:tremor@example.com" target="_blank" aria-label="Correo">
          <i class="nes-icon gmail is-medium"></i>
        </a>
        <a href="https://github.com/TremorSongg" target="_blank" aria-label="GitHub">
          <i class="nes-icon github is-medium"></i>
        </a>
      </div>
    `;
  }

  // Exportar cargarSeccion para acceso global
  window.cargarSeccion = cargarSeccion;


    // Cargar la sección de inicio al cargar la página por primera vez
    cargarSeccion('inicio');
    const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const volumeControl = document.getElementById('volume-control');

// Establecer volumen inicial
music.volume = volumeControl.value;

// Cambiar volumen en tiempo real
volumeControl.addEventListener('input', () => {
  music.volume = volumeControl.value;
});
let musicEnabled = false;

musicToggle.addEventListener('click', () => {
  if (musicEnabled) {
    music.pause();
    musicEnabled = false;
    musicToggle.textContent = '🎵 Música: OFF';
  } else {
    music.play().then(() => {
      musicEnabled = true;
      musicToggle.textContent = '🎵 Música: ON';
    }).catch(err => {
      console.error('No se pudo reproducir la música:', err);
    });
  }
});


let ytPlayers = [];

window.inicializarReproductoresYouTube = function () {
  const iframes = document.querySelectorAll('iframe[src*="youtube.com/embed"]');
  iframes.forEach((iframe) => {
    const player = new YT.Player(iframe, {
      events: {
        onStateChange: function (event) {
          if (event.data === YT.PlayerState.PLAYING) {
            if (!music.paused) {
              music.pause();
              musicToggle.textContent = '🎵 Música: OFF';
              musicEnabled = false;
            }
          }
        }
      }
    });
    ytPlayers.push(player);
  });
};



window.onYouTubeIframeAPIReady = function () {
  // Solo declaramos la función global aquí
  // La llamada real se hace cuando los videos están en el DOM
};


});

