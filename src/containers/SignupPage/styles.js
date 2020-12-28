const styles = theme => ({
  background: {
    backgroundColor: theme.palette.primary.main,
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    minHeight: '100vh',
    textAlign: 'center',
    flex: '1 0 auto',
  },
  wrapper: {
    flex: 'none',
    maxWidth: '400px',
    width: '100%',
    margin: '0 auto',
  },
});
export default styles;
