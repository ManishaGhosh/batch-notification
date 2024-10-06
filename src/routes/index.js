const router = require('express').Router();
const mondayRoutes = require('./monday');

router.use(mondayRoutes);

router.get('/', function (req, res) {
  res.json(getHealth());
});

router.post('/webhook', (req, res) => {
  // console.log('Webhook received:', req.body);
  // const { type } = req.body;
  console.log(req.body);
 
    res.status(200).send({ message: 'Webhook received' });
  
});
router.get('/health', function (req, res) {
  res.json(getHealth());
  res.end();
});

function getHealth() {
  return {
    ok: true,
    message: 'Healthy',
  };
}

module.exports = router;
