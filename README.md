# Dashboard de Consumo Energético Doméstico

## 📋 Descripción
Sistema web para monitorear y optimizar el consumo eléctrico de tu hogar. Calcula el consumo energético de tus electrodomésticos, identifica los "vampiros energéticos" y proporciona recomendaciones para reducir tu huella de carbono y ahorrar dinero.

## 🎯 Características
- ✅ Cálculo de consumo energético por aparato
- ✅ Análisis por período (diario, semanal, mensual, anual)
- ✅ Visualización con gráficas (pastel y barras)
- ✅ Identificación de "vampiros energéticos"
- ✅ Cálculo de costos en pesos mexicanos
- ✅ Recomendaciones de eficiencia energética
- ✅ Interfaz responsive (funciona en móviles)

## 📁 Estructura del Proyecto

```
dashboard-energetico/
│
├── index.html          (Página principal)
├── styles.css          (Estilos CSS)
├── script.js           (Lógica JavaScript)
└── README.md          (Este archivo)
```

## 💻 Uso

### Agregar un Electrodoméstico
1. En la sección "Agregar Electrodoméstico"
2. Ingresa:
   - **Nombre**: Ej. "Refrigerador", "TV", "Laptop"
   - **Watts**: Potencia del aparato (busca en la etiqueta o manual)
   - **Horas por día**: Cuántas horas lo usas diariamente
   - **Categoría**: Tipo de electrodoméstico
3. Haz clic en "➕ Agregar"

### Consultar Información de Watts Comunes

| Electrodoméstico | Watts aproximados |
|-----------------|-------------------|
| Refrigerador | 150-300W |
| TV LED 50" | 80-120W |
| Laptop | 50-80W |
| Microondas | 1000-1500W |
| Lavadora | 400-600W |
| Aire acondicionado | 1000-2500W |
| Foco LED | 8-15W |
| Foco incandescente | 60-100W |
| Ventilador | 50-75W |
| Computadora de escritorio | 200-500W |
| Plancha | 1000-1800W |
| Secadora de pelo | 1500-2000W |
| Cafetera | 800-1200W |

### Cambiar Período de Análisis
- Haz clic en los botones: **Diario**, **Semanal**, **Mensual** o **Anual**
- Todas las estadísticas se actualizarán automáticamente

### Interpretar los Datos
- **kWh consumidos**: Energía total usada en el período
- **Costo estimado**: Basado en $0.89 MXN por kWh (tarifa promedio CFE)
- **Proyección anual**: Estimado de consumo en un año
- **Vampiros energéticos**: Los 3 aparatos que más consumen

## 🎨 Personalización

### Cambiar la Tarifa Eléctrica
En el archivo `script.js`, línea 9:
```javascript
const tarifa = 0.89; // Cambia este valor
```

Consulta tu recibo de CFE para usar tu tarifa real.

### Cambiar Colores
En el archivo `styles.css`, modifica las clases de colores:
```css
.card-blue { background: #3b82f6; }  /* Azul */
.card-green { background: #10b981; } /* Verde */
.card-purple { background: #8b5cf6; } /* Morado */
.card-orange { background: #f59e0b; } /* Naranja */
```

### Agregar Más Categorías
En `index.html`, línea donde está el `<select id="applianceCategory">`, agrega más opciones:
```html
<option value="Nueva Categoría">Nueva Categoría</option>
```

## 🌱 Relación con Desarrollo Sustentable

### Dimensión Ambiental
- Reduce consumo energético y emisiones de CO₂
- Promueve conciencia sobre el impacto ambiental
- Identifica oportunidades de eficiencia energética

### Dimensión Económica
- Ahorro directo en el recibo de luz
- Optimización de recursos económicos del hogar
- Justifica inversión en electrodomésticos eficientes

### Dimensión Social
- Educación sobre consumo responsable
- Acceso gratuito a herramienta de análisis
- Fomenta hábitos sustentables en la familia

## 📊 Datos de Impacto

**Por cada 100 kWh que ahorres al mes:**
- 🌳 Equivale a ~50 kg de CO₂ evitados
- 🌲 Es como plantar 2 árboles al mes
- 💰 Ahorras ~$89 MXN mensuales (~$1,068 anuales)

**Ejemplo de ahorro real:**
Si cambias 10 focos incandescentes (60W) por LED (10W) que usas 5 horas al día:
- Ahorro: 75 kWh/mes
- Reducción de CO₂: 37.5 kg/mes
- Ahorro económico: $66.75/mes ($801/año)

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura de la página
- **CSS3**: Estilos y diseño responsive
- **JavaScript (Vanilla)**: Lógica de la aplicación
- **Chart.js**: Biblioteca para gráficas

## 📱 Compatibilidad
- ✅ Google Chrome (recomendado)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Dispositivos móviles (iOS y Android)

## 🔧 Solución de Problemas

### Las gráficas no se muestran
- Verifica que tienes conexión a internet (Chart.js se carga desde CDN)
- Revisa la consola del navegador (F12) para ver errores

### Los cálculos no parecen correctos
- Verifica que los watts ingresados sean correctos
- Asegúrate de que las horas por día sean realistas
- Consulta la etiqueta del aparato o su manual

### El diseño se ve mal
- Verifica que el archivo `styles.css` esté en la misma carpeta
- Revisa que el nombre del archivo sea exactamente `styles.css`

## 📈 Mejoras Futuras Sugeridas
- [ ] Exportar reporte a PDF
- [ ] Guardar datos en localStorage (persistencia)
- [ ] Gráfica de tendencia histórica
- [ ] Comparación con promedio nacional
- [ ] Base de datos predefinida de electrodomésticos
- [ ] Calculadora de ahorro al reemplazar aparatos
- [ ] Modo oscuro
- [ ] Múltiples hogares/perfiles


## 👨‍💻 Autor
Proyecto desarrollado por Jonatan Uriel Gonzalez Ramirez estudiante de
Ingeniería en Sistemas Computacionales

## 📄 Licencia
Proyecto educativo de código abierto.
Libre para usar y modificar
