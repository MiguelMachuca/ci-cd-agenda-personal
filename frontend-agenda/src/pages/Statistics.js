import React, { useState, useEffect, useMemo } from 'react';
import { useContacts } from '../context/ContactContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Contact.css';
import { Card, CardContent, Grid, Typography, Box, Paper } from '@mui/material';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Statistics() {
  const { state, actions } = useContacts();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await actions.loadStats();
      setStats(response || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (!state.contacts || state.contacts.length === 0) {
      return {
        total: 0,
        favorites: 0,
        withEmail: 0,
        withPhone: 0,
        byCategory: {},
        recentContacts: []
      };
    }

    const total = state.contacts.length;
    const favorites = state.contacts.filter(c => c.favorito).length;
    const withEmail = state.contacts.filter(c => c.email).length;
    const withPhone = state.contacts.filter(c => c.telefono).length;
    
    const byCategory = {};
    state.contacts.forEach(contact => {
      const category = contact.categoria || 'Sin categoría';
      byCategory[category] = (byCategory[category] || 0) + 1;
    });

    const recentContacts = [...state.contacts]
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
      .slice(0, 5);

    return {
      total,
      favorites,
      withEmail,
      withPhone,
      byCategory,
      recentContacts
    };
  };

  const currentStats = calculateStats();

  const categoryChartData = useMemo(() => {
    const labels = Object.keys(currentStats.byCategory);
    const values = Object.values(currentStats.byCategory);
    return {
      labels,
      datasets: [
        {
          label: 'Contactos por categoría',
          data: values,
          backgroundColor: [
            '#1976d2', '#9c27b0', '#2ecc71', '#f39c12',
            '#e91e63', '#00bcd4', '#ff9800', '#34495e'
          ],
          borderWidth: 0,
        },
      ],
    };
  }, [currentStats.byCategory]);

  const totalsChartData = useMemo(() => {
    const labels = ['Total', 'Favoritos', 'Con Email', 'Con Teléfono'];
    const values = [
      currentStats.total,
      currentStats.favorites,
      currentStats.withEmail,
      currentStats.withPhone,
    ];
    return {
      labels,
      datasets: [
        {
          label: 'Resumen',
          data: values,
          backgroundColor: '#1976d2',
          borderRadius: 6,
        },
      ],
    };
  }, [currentStats.total, currentStats.favorites, currentStats.withEmail, currentStats.withPhone]);

  if (loading) {
    return <LoadingSpinner text="Cargando estadísticas..." />;
  }

  if (error) {
    return (
      <div className="statistics-page">
        <ErrorMessage 
          error={error} 
          onRetry={loadStats}
          title="Error al cargar estadísticas"
        />
      </div>
    );
  }

  return (
    <Box sx={{ px: 2, py: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>📊 Estadísticas de Contactos</Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Resumen visual de tu agenda personal
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <Card variant="outlined"><CardContent>
            <Typography variant="subtitle2" color="text.secondary">Total de Contactos</Typography>
            <Typography variant="h4">{currentStats.total}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined"><CardContent>
            <Typography variant="subtitle2" color="text.secondary">Favoritos</Typography>
            <Typography variant="h4">{currentStats.favorites}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined"><CardContent>
            <Typography variant="subtitle2" color="text.secondary">Con Email</Typography>
            <Typography variant="h4">{currentStats.withEmail}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card variant="outlined"><CardContent>
            <Typography variant="subtitle2" color="text.secondary">Con Teléfono</Typography>
            <Typography variant="h4">{currentStats.withPhone}</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Distribución por Categoría</Typography>
            {Object.keys(currentStats.byCategory).length === 0 ? (
              <Typography color="text.secondary">No hay categorías asignadas</Typography>
            ) : (
              <Doughnut data={categoryChartData} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Resumen General</Typography>
            <Bar data={totalsChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>🕒 Contactos Recientes</Typography>
        {currentStats.recentContacts.length === 0 ? (
          <Typography color="text.secondary">No hay contactos recientes</Typography>
        ) : (
          <Grid container spacing={2}>
            {currentStats.recentContacts.map(contact => (
              <Grid item xs={12} md={6} key={contact.id}>
                <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
                    {contact.nombre?.charAt(0).toUpperCase()}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">{contact.nombre} {contact.apellido}</Typography>
                    <Typography variant="caption" color="text.secondary">{new Date(contact.fechaCreacion).toLocaleDateString()}</Typography>
                  </Box>
                  {contact.favorito && <Box aria-label="favorito">⭐</Box>}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

// Función auxiliar para asignar colores a categorías
function getCategoryColor(category) {
  const colors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12', 
    '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
  ];
  
  const index = category.charCodeAt(0) % colors.length;
  return colors[index];
}

export default Statistics;
