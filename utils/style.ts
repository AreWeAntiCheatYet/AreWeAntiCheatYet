import { createStyles } from '@mantine/core';

export const style = createStyles((theme) => ({
  mobileHide: {
    [theme.fn.smallerThan('sm')]: { display: 'none' },
  },
  mobileShow: {
    [theme.fn.largerThan('sm')]: { display: 'none' },
  },
  smallHide: {
    [theme.fn.smallerThan('lg')]: { display: 'none' },
  },
  largeShow: {
    [theme.fn.largerThan('lg')]: { display: 'none' },
  },
  breakdownWidth: {
    [theme.fn.smallerThan('sm')]: { width: '90%' },
    [theme.fn.largerThan('sm')]: { width: '60%' },
  },
  tableWidth: {
    [theme.fn.smallerThan('sm')]: { width: '100%' },
    [theme.fn.largerThan('sm')]: { width: '75%' },
  },
  mobileSmall: {
    [theme.fn.smallerThan('sm')]: { fontSize: '85%' },
  },
}));
