import { Accordion, AccordionProps, createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
  control: {
    ref: getRef('control'),
    border: 0,
    opacity: 0.6,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    '&:hover': {
      backgroundColor: 'transparent',
      opacity: 1,
    },
  },

  item: {
    borderBottom: 0,
    overflow: 'hidden',
    transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
    border: '1px dashed',
    borderRadius: theme.radius.sm,
    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],

      [`& .${getRef('control')}`]: {
        opacity: 1,
      },
    },
  },

  panel: {
    paddingLeft: 0,
  },
}));

export default function StyledAccordion({ children, ...props }: AccordionProps) {
  const { classes } = useStyles();
  return (
    <Accordion classNames={classes} {...props}>
      {children}
    </Accordion>
  );
}
