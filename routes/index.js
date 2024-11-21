// import exampleRoutes from './example.js';

const constructorMethod = (app) => {
//   app.use('/example', exampleRoutes);

  app.use('*', (_, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;