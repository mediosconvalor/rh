// Función para cerrar sesión
function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "/portal-rh/index.html";
}

// Función para calcular el tiempo trabajado (años, meses, días)
function calcularTiempoTrabajado(fechaInicio) {
  const inicio = new Date(fechaInicio);
  const hoy = new Date();
  let years = hoy.getFullYear() - inicio.getFullYear();
  let months = hoy.getMonth() - inicio.getMonth();
  let days = hoy.getDate() - inicio.getDate();

  if (days < 0) {
    months--;
    days += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// Función para calcular los días restantes para el cumpleaños
function calcularDiasParaCumple(fechaCumple) {
  const hoy = new Date();
  const cumple = new Date(fechaCumple);
  cumple.setFullYear(hoy.getFullYear());

  if (cumple < hoy) {
    cumple.setFullYear(hoy.getFullYear() + 1);
  }

  const diff = Math.ceil((cumple - hoy) / (1000 * 60 * 60 * 24));
  return diff;
}

// Función para mostrar la información del usuario en la página
function mostrarInformacionUsuario() {
  const data = JSON.parse(sessionStorage.getItem("usuario"));
  if (!data) return;

  document.getElementById("correo").innerText = data.correo || "No disponible";
  document.getElementById("sucursal").innerText = data.sucursal || "Sin asignar";
  document.getElementById("puesto").innerText = data.puesto || "No especificado";

  const fechaInicio = new Date(data.fechaInicio);
  const fechaFormateada = ("0" + fechaInicio.getDate()).slice(-2) + "/" +
    ("0" + (fechaInicio.getMonth() + 1)).slice(-2) + "/" +
    fechaInicio.getFullYear();
  document.getElementById("fechaInicio").innerText = fechaFormateada;

  const tiempo = calcularTiempoTrabajado(data.fechaInicio);
  document.getElementById("tiempoTrabajado").innerText = `${tiempo.years} años, ${tiempo.months} meses, ${tiempo.days} días`;

  if (data.fechaNacimiento) {
    const diasParaCumple = calcularDiasParaCumple(data.fechaNacimiento);
    document.getElementById("diasParaCumple").innerText = `${diasParaCumple} días`;
  } else {
    document.getElementById("diasParaCumple").innerText = "Fecha de nacimiento no registrada";
  }
}

// Función para alternar el menú hamburguesa
function toggleMenu() {
  document.getElementById("menuMobile").classList.toggle("show");
}

// Función para cambiar entre modo claro y oscuro
function cambiarModo() {
  const body = document.body;
  const esClaro = body.classList.toggle('light-mode');
  localStorage.setItem('modo', esClaro ? 'claro' : 'oscuro');
  // Asegurarse de que la página se recargue y aplique el modo
  window.location.reload();
}

// Función para comprobar el modo claro/oscuro al cargar la página
function comprobarModo() {
  if (localStorage.getItem('modo') === 'claro') {
    document.body.classList.add('light-mode');
    const switchModo = document.getElementById('switchModo');
    if (switchModo) switchModo.checked = true;
  }
}