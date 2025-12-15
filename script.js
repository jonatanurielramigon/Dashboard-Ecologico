// Estado de la aplicación
let appliances = [
    { id: 1, name: 'Refrigerador', watts: 150, hoursPerDay: 24, category: 'Cocina' },
    { id: 2, name: 'TV 50"', watts: 100, hoursPerDay: 6, category: 'Entretenimiento' },
    { id: 3, name: 'Laptop', watts: 65, hoursPerDay: 8, category: 'Oficina' }
];

let currentPeriod = 'month';
const tarifa = 0.89; // Pesos por kWh

// Gráficas
let pieChart = null;
let barChart = null;

// Períodos
const periodLabels = {
    day: 'Diario',
    week: 'Semanal',
    month: 'Mensual',
    year: 'Anual'
};

const periodMultipliers = {
    day: 1,
    week: 7,
    month: 30,
    year: 365
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateDashboard();
});

// Event Listeners
function setupEventListeners() {
    // Botones de período
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPeriod = this.dataset.period;
            updateDashboard();
        });
    });

    // Formulario de agregar electrodoméstico
    document.getElementById('applianceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addAppliance();
    });
}


// Agregar electrodoméstico
function addAppliance() {
    const name = document.getElementById('applianceName').value;
    const watts = parseFloat(document.getElementById('applianceWatts').value);
    const hours = parseFloat(document.getElementById('applianceHours').value);
    const category = document.getElementById('applianceCategory').value;

    if (name && watts && hours) {
        appliances.push({
            id: Date.now(),
            name: name,
            watts: watts,
            hoursPerDay: hours,
            category: category
        });

        // Limpiar formulario
        document.getElementById('applianceForm').reset();
        
        updateDashboard();
    }
}

// Eliminar electrodoméstico
function deleteAppliance(id) {
    appliances = appliances.filter(a => a.id !== id);
    updateDashboard();
}

// Calcular consumo
function calculateConsumption(watts, hours, period) {
    const dailyKwh = (watts * hours) / 1000;
    return dailyKwh * periodMultipliers[period];
}

// Actualizar dashboard completo
function updateDashboard() {
    updateSummaryCards();
    updateCharts();
    updateVampires();
    updateAppliancesTable();
}

// Actualizar tarjetas de resumen
function updateSummaryCards() {
    const totalConsumption = appliances.reduce((sum, app) => 
        sum + calculateConsumption(app.watts, app.hoursPerDay, currentPeriod), 0
    );
    const totalCost = totalConsumption * tarifa;
    const yearlyProjection = totalConsumption * (365 / periodMultipliers[currentPeriod]);

    document.getElementById('totalConsumption').textContent = totalConsumption.toFixed(2);
    document.getElementById('totalCost').textContent = '$' + totalCost.toFixed(2);
    document.getElementById('yearlyProjection').textContent = Math.round(yearlyProjection);
    document.getElementById('applianceCount').textContent = appliances.length;

    // Actualizar etiquetas de período
    const periodLabel = periodLabels[currentPeriod];
    document.getElementById('periodLabel1').textContent = periodLabel;
    document.getElementById('periodLabel2').textContent = periodLabel;
    document.getElementById('periodLabelTable').textContent = periodLabel;
}

// Actualizar gráficas
function updateCharts() {
    if (appliances.length === 0) {
        // Mostrar mensaje de no datos
        document.getElementById('noDataPie').style.display = 'block';
        document.getElementById('noDataBar').style.display = 'block';
        document.getElementById('pieChart').style.display = 'none';
        document.getElementById('barChart').style.display = 'none';
        
        if (pieChart) pieChart.destroy();
        if (barChart) barChart.destroy();
        return;
    }

    document.getElementById('noDataPie').style.display = 'none';
    document.getElementById('noDataBar').style.display = 'none';
    document.getElementById('pieChart').style.display = 'block';
    document.getElementById('barChart').style.display = 'block';

    const totalConsumption = appliances.reduce((sum, app) => 
        sum + calculateConsumption(app.watts, app.hoursPerDay, currentPeriod), 0
    );

    // Datos para las gráficas
    const labels = appliances.map(app => app.name);
    const data = appliances.map(app => 
        calculateConsumption(app.watts, app.hoursPerDay, currentPeriod)
    );
    const percentages = data.map(d => ((d / totalConsumption) * 100).toFixed(1));

    const colors = [
        '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', 
        '#10b981', '#6366f1', '#ef4444', '#14b8a6'
    ];

    // Gráfica de pastel
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    if (pieChart) pieChart.destroy();
    
    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const percentage = percentages[context.dataIndex];
                            return `${label}: ${value.toFixed(2)} kWh (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Gráfica de barras
    const barCtx = document.getElementById('barChart').getContext('2d');
    if (barChart) barChart.destroy();
    
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labels.map(l => l.length > 15 ? l.substring(0, 15) + '...' : l),
            datasets: [{
                label: 'Consumo (kWh)',
                data: data,
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1) + ' kWh';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(2)} kWh`;
                        }
                    }
                }
            }
        }
    });
}

// Actualizar vampiros energéticos
function updateVampires() {
    const vampiresSection = document.getElementById('vampiresSection');
    const vampiresGrid = document.getElementById('vampiresGrid');

    if (appliances.length === 0) {
        vampiresSection.style.display = 'none';
        return;
    }

    vampiresSection.style.display = 'block';

    // Obtener top 3 consumidores
    const vampires = [...appliances]
        .sort((a, b) => 
            calculateConsumption(b.watts, b.hoursPerDay, currentPeriod) - 
            calculateConsumption(a.watts, a.hoursPerDay, currentPeriod)
        )
        .slice(0, 3);

    vampiresGrid.innerHTML = vampires.map((app, index) => {
        const consumption = calculateConsumption(app.watts, app.hoursPerDay, currentPeriod);
        const cost = consumption * tarifa;
        return `
            <div class="vampire-card">
                <div class="vampire-header">
                    <div class="vampire-rank">${index + 1}</div>
                    <div class="vampire-name">${app.name}</div>
                </div>
                <div class="vampire-details">
                    <p><strong>Consumo:</strong> ${consumption.toFixed(2)} kWh</p>
                    <p><strong>Costo:</strong> $${cost.toFixed(2)} MXN</p>
                    <p><strong>Potencia:</strong> ${app.watts}W × ${app.hoursPerDay}h/día</p>
                </div>
            </div>
        `;
    }).join('');
}

// Actualizar tabla de electrodomésticos
function updateAppliancesTable() {
    const noAppliances = document.getElementById('noAppliances');
    const appliancesTable = document.getElementById('appliancesTable');
    const tbody = document.getElementById('appliancesTableBody');

    if (appliances.length === 0) {
        noAppliances.style.display = 'block';
        appliancesTable.style.display = 'none';
        return;
    }

    noAppliances.style.display = 'none';
    appliancesTable.style.display = 'block';

    tbody.innerHTML = appliances.map(app => {
        const consumption = calculateConsumption(app.watts, app.hoursPerDay, currentPeriod);
        const cost = consumption * tarifa;
        return `
            <tr>
                <td>${app.name}</td>
                <td><span class="category-badge">${app.category}</span></td>
                <td>${app.watts}</td>
                <td>${app.hoursPerDay}</td>
                <td class="consumption-value">${consumption.toFixed(2)}</td>
                <td class="cost-value">$${cost.toFixed(2)}</td>
                <td>
                    <button class="btn-delete" onclick="deleteAppliance(${app.id})" title="Eliminar">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}