const mondayService = require('../services/subitem-service');
const transformationService = require('../services/transformation-service');
const { TRANSFORMATION_TYPES } = require('../constants/transformation');
const schedule = require('node-schedule');


async function executeAction2(req, res) {
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, text } = inputFields;

    const ids = await mondayService.getAllBoardItems(shortLivedToken, boardId);
   
    if(Object.keys(ids).length>0){
    const items = ids.data.boards[0].items_page.items;
    
    if (items && items.length > 0) {
      const sub_array = items.slice(0, 200);
     
      const text2 = await mondayService.sendNotificationall(shortLivedToken, receiver.value, boardId, sub_array, text);
    
      if (!text2) {
        return res.status(200).send({});
      }
    }
  }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function executeAction8(req, res) {
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, number,  text } = inputFields;

    const ids = await mondayService.updates(shortLivedToken, boardId);
    if(Object.keys(ids).length>0){
    const items = ids.data.boards[0].updates;
    
    const now = new Date();
    const daysAgo = new Date(now.getTime() - number * 24 * 60 * 60 * 1000);
    const latestItemsMap = items.reduce((acc, item) => {
      const current = acc[item.item_id];
      const currentDate = current ? new Date(current.created_at) : null;
      const newDate = new Date(item.created_at);
      
      if (!current || newDate > currentDate) {
          acc[item.item_id] = item;
      }
      
      return acc;
        }, {});
    const filteredItems =  Object.values(latestItemsMap)
    .filter(obj => new Date(obj.created_at) < daysAgo)
    .map(obj => obj.item_id);

    const finalItems1 = await mondayService.getColumnValue(shortLivedToken, filteredItems);
    if(finalItems1.length>0 && filteredItems.data){
      const finalItems = finalItems1.data.items
      const sub_array = finalItems.slice(0, 200)
       
       if (sub_array && sub_array.length > 0) {
  
      // const resultString = text + ' ' + finalItems.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, sub_array, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
   }
  }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function executeAction11(req, res) {
  //all items in 24hrs 
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, number, text } = inputFields;

    const ids = await mondayService.getAllBoardItems24(shortLivedToken, boardId);
  
    if(Object.keys(ids).length>0){
    const items = ids.data.boards[0].items_page.items;
   
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - number * 24 * 60 * 60 * 1000);
    const filteredItems = items
    .filter(item => new Date(item.created_at) > sevenDaysAgo)
    // console.log(filteredItems,'days ago:', sevenDaysAgo)
  
    if (filteredItems && filteredItems.length > 0) {
      const sub_array = filteredItems.slice(0, 200)
      // const resultString = text + ' ' + filteredItems.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, sub_array, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
  }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function getRemoteListOptions(req, res) {
  try {
    return res.status(200).send(TRANSFORMATION_TYPES);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {

  getRemoteListOptions,
  executeAction2,
  executeAction8,
  executeAction11,

};
