import { Router as router } from 'express';

const categoryRouter = router();

categoryRouter.get('/', (req, res) => {
  res.status(200).json({
    statusCode: 200,
  });
});

export default categoryRouter;
