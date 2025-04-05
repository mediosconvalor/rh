function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "/index.html";
}

function calcularTiempoTrabajado(fechaInicio) {
  const inicio = new Date(fechaInicio);
  const hoy = new Date();

  let años = hoy.getFullYear() - inicio.getFullYear();
  let meses = hoy.getMonth() - inicio.getMonth();
  let dias = hoy.getDate() - inicio.getDate();

  if (dias < 0) {
    meses--;
    dias += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
  }

  if (meses < 0) {
    años--;
    meses += 12;
  }

  return { años, meses, dias };
}

function calcularDiasParaCumple(fechaNacimiento) {
  const hoy = new Date();
  const cumple = new Date(fechaNacimiento);
  cumple.setFullYear(hoy.getFullYear());

  if (cumple < hoy) {
    cumple.setFullYear(hoy.getFullYear() + 1);
  }

  const diff = Math.ceil((cumple - hoy) / (1000 * 60 * 60 * 24));
  return diff;
}

function mostrarInformacionUsuario() {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  if (!usuario) {
    window.location.href = "/index.html";
    return;
  }

  document.getElementById("nombreUsuario").innerText = usuario.nombre || "Empleado";
  if (document.getElementById("correo")) document.getElementById("correo").innerText = usuario.correo || "Sin correo";
  if (document.getElementById("sucursal")) document.getElementById("sucursal").innerText = usuario.sucursal || "Sin sucursal";
  if (document.getElementById("puesto")) document.getElementById("puesto").innerText = usuario.puesto || "Sin puesto";

  if (usuario.fechaInicio && document.getElementById("fechaInicio")) {
    const inicio = new Date(usuario.fechaInicio);
    const fechaTexto = `${inicio.getDate().toString().padStart(2, '0')}/${(inicio.getMonth() + 1).toString().padStart(2, '0')}/${inicio.getFullYear()}`;
    document.getElementById("fechaInicio").innerText = fechaTexto;
  }

  if (usuario.fechaInicio && document.getElementById("tiempoTrabajado")) {
    const tiempo = calcularTiempoTrabajado(usuario.fechaInicio);
    document.getElementById("tiempoTrabajado").innerText = `${tiempo.años} años, ${tiempo.meses} meses, ${tiempo.dias} días`;
  }

  if (usuario.fechaNacimiento && document.getElementById("diasParaCumple")) {
    const dias = calcularDiasParaCumple(usuario.fechaNacimiento);
    document.getElementById("diasParaCumple").innerText = `${dias} días`;
  }
}

function mostrarPerfil() {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  if (!usuario) {
    window.location.href = "/index.html";
    return;
  }

  document.getElementById("nombreUsuario").innerText = usuario.nombre || "Sin nombre";
  document.getElementById("correo").innerText = usuario.correo || "Sin correo";

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nombre || 'U')}&background=2596be&color=fff&rounded=true&size=100`;
  document.getElementById("avatar").src = avatarUrl;
}
