import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({ week: 0, month: 0, year: 0, newProspects: 0, newClients: 0, conversionRate: 0, visitors: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const data = {
    labels: ['Week', 'Month', 'Year'],
    datasets: [
      {
        label: 'Revenue',
        data: [stats.week, stats.month, stats.year],
        backgroundColor: 'rgba(25,118,210,0.5)',
      },
    ],
  };

  const prospectData = {
    labels: ['New Prospects', 'New Clients'],
    datasets: [
      {
        label: 'Count',
        data: [stats.newProspects, stats.newClients],
        backgroundColor: 'rgba(67,160,71,0.5)',
      },
    ],
  };

  return (
    <div>
      <h2>Revenue Statistics</h2>
      <Bar data={data} />
      <h2>Prospects vs Clients (7 days)</h2>
      <Bar data={prospectData} />
      <p>Conversion Rate: {stats.conversionRate.toFixed(2)}%</p>
      <p>Website Visitors: {stats.visitors}</p>
    </div>
  );
}

export default Dashboard;
