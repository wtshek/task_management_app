import SidebarLayout from '@/layouts/SidebarLayout';
import Footer from '@/components/Footer';
import { useTheme, Typography } from '@mui/material';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Kanban } from '@/components/Kanban';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import { KanbanDataType } from '@/utils/types';

function Dashboard() {
  const theme = useTheme();
  const [data, setData] = useState<null | KanbanDataType>();
  const { title, description } = data || {};

  useEffect(() => {
    const getKanbanData = async () => {
      const res = await axios.get('/api/kanban');
      const { data } = res.data;
      setData(data);
    };

    getKanbanData();
  }, []);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_CLUSTER
    });

    const channel = pusher.subscribe('kanban');

    channel.bind('update', (data) => {
      setData(data);
    });

    return () => pusher.unsubscribe('kanban');
  }, []);

  return (
    <>
      <PageTitleWrapper>
        <Typography variant="h1">{title}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
      </PageTitleWrapper>
      <Kanban data={data} />
      <Footer />
    </>
  );
}

Dashboard.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dashboard;
