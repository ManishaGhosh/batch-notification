const mondayService = require('../services/monday-service');
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

    const items = ids.data.boards[0].items_page.items;
    
    if (items && items.length > 0) {
      // const resultString = text + ' ' + items.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, items, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
async function executeAction3(req, res) {
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, groupId, text } = inputFields;

    const ids = await mondayService.getAllItemsinGrp(shortLivedToken, boardId);

    const items = ids.data.boards[0].items_page.items;
    const filteredItems = items
      .filter((item) => item.group.id === groupId)
      .map((item) => ({
        id: item.id,
        name: item.name,
        url: item.url,
      }));
   
    if (filteredItems && filteredItems.length > 0) {
      // const resultString = text + ' ' + filteredItems.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, filteredItems, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
async function executeAction4(req, res) {
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, columnId, statusColumnValue, text } = inputFields;
    // console.log(boardId, columnId, statusColumnValue);
    const ids = await mondayService.getAllItemsinStatus(shortLivedToken, boardId, columnId, statusColumnValue.index);

    const items = ids.data.boards[0].items_page.items;

   
    if (items && items.length > 0) {
      // const resultString = text + ' ' + items.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, items, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
async function executeAction5(req, res) {
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, columnId, statusColumnValue, groupId, text } = inputFields;
   
    const ids = await mondayService.getAllItemsinStatusg(shortLivedToken, boardId, columnId, statusColumnValue.index);

    const items = ids.data.boards[0].items_page.items;
    const filteredItems = items
      .filter((item) => item.group.id === groupId)
      .map((item) => ({
        id: item.id,
        name: item.name,
        url: item.url,
      }));
    
    if (filteredItems && filteredItems.length > 0) {
      // const resultString = text + ' ' + filteredItems.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, filteredItems, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
async function executeAction6(req, res) {
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, columnId, text } = inputFields;

    const ids = await mondayService.getAllItemsDue(shortLivedToken, boardId, columnId);

    const items = ids.data.boards[0].items_page.items;

   
    if (items && items.length > 0) {
      // const resultString = text + ' ' + items.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, items, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
async function executeAction7(req, res) {
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, columnId, groupId, text } = inputFields;

    const ids = await mondayService.getAllItemsDueg(shortLivedToken, boardId, columnId);

    const items = ids.data.boards[0].items_page.items;
    const filteredItems = items
      .filter((item) => item.group.id === groupId)
      .map((item) => ({
        id: item.id,
        name: item.name,
        url: item.url,
      }));
    // const resultString = text + ' ' + filteredItems.map((item) => `${item.name} : ${item.url}`).join(', ');
    if (filteredItems && filteredItems.length > 0) {
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, filteredItems, text);

      if (!text2) {
        return res.status(200).send({});
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
    if(finalItems1.length>0 && filteredItems.data)
    {
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
async function executeAction9(req, res) {
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, columnId, text } = inputFields;

    const ids = await mondayService.getAllItemsTom(shortLivedToken, boardId, columnId);
    // console.log('Items tom',ids.data.boards[0])
    const items = ids.data.boards[0].items_page.items;
   
   
    if (items && items.length > 0) {
      // const resultString = text + ' ' + items.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, items, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
async function executeAction10(req, res) {
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, columnId, groupId, text } = inputFields;

    const ids = await mondayService.getAllItemsTomg(shortLivedToken, boardId, columnId);

    const items = ids.data.boards[0].items_page.items;
    const filteredItems = items
      .filter((item) => item.group.id === groupId)
      .map((item) => ({
        id: item.id,
        name: item.name,
        url: item.url,
      }));
    
   
    if (filteredItems && filteredItems.length > 0) {
      // const resultString = text + ' ' + filteredItems.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, filteredItems, text);

      if (!text2) {
        return res.status(200).send({});
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

    const items = ids.data.boards[0].items_page.items;
   
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - number * 24 * 60 * 60 * 1000);
    const filteredItems = items
    .filter(item => new Date(item.created_at) > sevenDaysAgo)
    // console.log(filteredItems,'days ago:', sevenDaysAgo)
  
    if (filteredItems && filteredItems.length > 0) {
      // const resultString = text + ' ' + filteredItems.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, filteredItems, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function executeAction12(req, res) {
 
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, text , columnId, columnId2, statusColumnValue} = inputFields;

    const ids = await mondayService.statusandtime(shortLivedToken, boardId, columnId, columnId2, statusColumnValue.index);

    const items = ids.data.boards[0].items_page.items;
   
   
  
    if (items && items.length > 0) {
      // const resultString = text + ' ' + items.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, items, text);

      if (!text2) {
        return res.status(200).send({});
      }
    }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
async function executeAction13(req, res) {
 
  const { shortLivedToken } = req.session;

  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { receiver, boardId, text , columnId, columnId2, statusColumnValue} = inputFields;

    const ids = await mondayService.statusandtime2(shortLivedToken, boardId, columnId, columnId2, statusColumnValue.index);
    // console.log(ids)
    const items = ids.data.boards[0].items_page.items;
   
   
  
    if (items && items.length > 0) {
      // const resultString = text + ' ' + items.map((item) => `${item.name} : ${item.url}`).join(', ');
      const text2 = await mondayService.sendNotification(shortLivedToken, receiver.value, boardId, items, text);

      if (!text2) {
        return res.status(200).send({});
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
  executeAction3,
  executeAction4,
  executeAction5,
  executeAction6,
  executeAction7,
  executeAction8,
  executeAction9,
  executeAction10,
  executeAction11,
  executeAction12,
  executeAction13
};
