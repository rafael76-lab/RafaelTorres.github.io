// main.js - interacciones y dashboard Plotly
document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Make project cards keyboard accessible
  document.querySelectorAll('.project-card').forEach(card=>{
    card.setAttribute('tabindex','0');
    card.addEventListener('keypress', e=>{
      if(e.key === 'Enter' || e.key === ' ') card.querySelector('a')?.click();
    });
  });

  // Inicializar dashboard Plotly con datos inline
  try {
    const trace1 = {
      x: ['2019','2020','2021','2022','2023','2024'],
      y: [120, 135, 150, 165, 180, 210],
      name: 'Ingresos (nominal)',
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: '#00e5ff'},
      line: {width: 2}
    };

    const trace2 = {
      x: ['2019','2020','2021','2022','2023','2024'],
      y: [100, 110, 125, 140, 155, 170],
      name: 'Egresos (nominal)',
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: '#7b61ff'},
      line: {width: 2}
    };

    const data = [trace1, trace2];

    const layout = {
      margin: {t:30, r:20, l:50, b:40},
      legend: {orientation: 'h', y: -0.18},
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: {color: '#e6eef6', family: 'Inter, sans-serif'},
      xaxis: {title: 'Año', showgrid: false},
      yaxis: {title: 'Millones', gridcolor: 'rgba(255,255,255,0.04)'}
    };

    const config = {responsive: true, displayModeBar: false};

    Plotly.newPlot('dashboard', data, layout, config);
  } catch (err) {
    console.error('Error inicializando Plotly:', err);
    const dash = document.getElementById('dashboard');
    if(dash) dash.innerHTML = '<p style="color:var(--muted);padding:18px">No se pudo cargar el dashboard. Revisa la consola para más detalles.</p>';
  }
});
