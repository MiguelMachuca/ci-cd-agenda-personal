import React, { useEffect, useMemo } from 'react';
import { useContacts } from '../context/ContactContext';
import { Link } from 'react-router-dom';
import { Box, Grid, Card, CardContent, Typography, Button, Paper, Chip, Stack } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const { state, actions } = useContacts();

  useEffect(() => {
    actions.loadStats();
    actions.loadContacts(0, 5); // Últimos 5 contactos
  }, []);

  const categoryChart = useMemo(() => {
    if (!state.stats?.contactosPorCategoria) return null;
    const labels = Object.keys(state.stats.contactosPorCategoria);
    const values = Object.values(state.stats.contactosPorCategoria);
    return {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ['#1976d2', '#9c27b0', '#2ecc71', '#f39c12', '#e91e63', '#00bcd4'],
        borderWidth: 0,
      }],
    };
  }, [state.stats]);

  // Próximos cumpleaños mock desde contactos cargados
  const upcomingBirthdays = (state.contacts || [])
    .filter(c => !!c.fechaNacimiento)
    .slice(0, 4)
    .map(c => {
      const now = new Date();
      const birth = new Date(c.fechaNacimiento);
      const next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
      if (next < now) next.setFullYear(now.getFullYear() + 1);
      const diffDays = Math.ceil((next - now) / (1000 * 60 * 60 * 24));
      return { nombre: `${c.nombre} ${c.apellido||''}`.trim(), dias: diffDays };
    });

  return (
    <Box sx={{ px: 2, py: 3, maxWidth: 1200, mx: 'auto' }}>
      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Bienvenido a tu Agenda Personal
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Gestiona tus contactos de manera fácil y eficiente
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button component={Link} to="/add-contact" variant="contained" size="large">Nuevo contacto</Button>
              <Button component={Link} to="/contacts" variant="outlined" size="large">Ver contactos</Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            {state.stats?.contactosPorCategoria && categoryChart && (
              <Box sx={{ maxWidth: 220, mx: 'auto' }}>
                <Doughnut data={categoryChart} options={{ plugins: { legend: { display: false } } }} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>

      {state.stats && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined"><CardContent>
              <Typography variant="subtitle2" color="text.secondary">Total Contactos</Typography>
              <Typography variant="h4">{state.stats.totalContactos}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined"><CardContent>
              <Typography variant="subtitle2" color="text.secondary">Favoritos</Typography>
              <Typography variant="h4">{state.stats.totalFavoritos}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined"><CardContent>
              <Typography variant="subtitle2" color="text.secondary">Categorías</Typography>
              <Typography variant="h4">{Object.keys(state.stats.contactosPorCategoria || {}).length}</Typography>
            </CardContent></Card>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Contactos Recientes</Typography>
            <Button component={Link} to="/contacts" variant="contained" size="small">Ver todos</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Próximos cumpleaños</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {upcomingBirthdays.length === 0 ? (
                <Typography color="text.secondary">Sin próximos cumpleaños</Typography>
              ) : (
                upcomingBirthdays.map((b, idx) => (
                  <Chip key={idx} label={`${b.nombre} · ${b.dias}d`} size="small" />
                ))
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;