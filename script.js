function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
  
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
  
  const usuario = sessionStorage.getItem("usuario");
  
  if (!usuario) {
    window.location.href = "index.html";
  } else {
    const data = JSON.parse(usuario);
    document.getElementById("nombreUsuario").innerText = data.nombre || "Empleado";
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
  
    const diasParaCumple = calcularDiasParaCumple(data.fechaCumple);
    document.getElementById("diasParaCumple").innerText = `${diasParaCumple} días`;
  }  