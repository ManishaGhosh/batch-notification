const e = require('express');
const initMondayClient = require('monday-sdk-js');
const DOMPurify = require('isomorphic-dompurify');
const getColumnValue = async (token, itemId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($itemId: [ID!]) {
        items (limit:200, ids: $itemId) {
        id
        name
          url
        }
      }`;
    const variables = { itemId };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getAllBoardItems = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient({ token });
    const q = `{
      boards(ids: ${boardId}) {
        columns(types: [subtasks]) {
          settings_str
        }
      }
    }`;
    const res = await mondayClient.api(q);
    const sett = res.data.boards[0].columns[0].settings_str;
    const subboardId = JSON.parse(sett).boardIds[0];
    if (subboardId && subboardId !== null && subboardId !== undefined) {
      const query = `query  {
        boards(ids: ${subboardId}) {
          items_page(limit:200) {
            items {
              id
              name
              url
            }
          }
        }
      }
      `;

      const response = await mondayClient.api(query);
      return response;
    } else {
      return {};
    }
  } catch (err) {
    console.error(err);
  }
};

const updates = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient({ token });
    const q = `{
      boards(ids: ${boardId}) {
        columns(types: [subtasks]) {
          settings_str
        }
      }
    }`;
    const res = await mondayClient.api(q);
    const sett = res.data.boards[0].columns[0].settings_str;
    const subboardId = JSON.parse(sett).boardIds[0];
    if (subboardId && subboardId !== null && subboardId !== undefined) {
      // console.log('update suboards',subboardId)
      const query = `query  {
        boards(ids: "${subboardId}") {
      
           
          updates (limit: 1000) {
    
                       created_at
                        item_id
              }

  
        }
      }
      `;
      // const variables = { boardId ,columnId,arr};

      const response = await mondayClient.api(query);
      // console.log(response);
      return response;
    } else {
      return {};
    }
  } catch (err) {
    console.error(err);
  }
};

const getAllBoardItems24 = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient({ token });
    const q = `{
      boards(ids: ${boardId}) {
        columns(types: [subtasks]) {
          settings_str
        }
      }
    }`;
    const res = await mondayClient.api(q);
    const sett = res.data.boards[0].columns[0].settings_str;
    const subboardId = JSON.parse(sett).boardIds[0];
    if (subboardId && subboardId !== null && subboardId !== undefined) {
      // console.log('last 24 hrs suboards',subboardId)
      const query = `query boards($subboardId: [ID!]) {
        boards(ids: $subboardId) {
          items_page(limit:500) {
            items {
              id
              name
              url
              created_at
            }
          }
        }
      }
      `;
      const variables = { subboardId };

      const response = await mondayClient.api(query, { variables });
      return response;
    } else {
      return {};
    }
  } catch (err) {
    console.error(err);
  }
};
const sendNotification = async (token, userId, itemId, urls, text) => {
  text = DOMPurify.sanitize(text);
  try {
    const mondayClient = initMondayClient({ token });
    let seats = [];
    let seat = 0;
    let result = [];
    let res = {};
    let plan = '';
    let trial = false;

    try {
      seats = await getPaymentStatus(token);
    } catch (err) {
      console.log(err);
    }
    if (seats && seats.data && seats.data.users) {
      result = seats.data.users
        .filter((item) => !item.is_pending && (item.is_verified || item.is_guest))
        .map((item) => item.id);
      seat = result.length;
    }
    const qr = `query{
   app_subscription {
    plan_id
    days_left
  }
  }`;
    try {
      res = await mondayClient.api(qr);
    } catch (err) {
      console.log(err);
    }
    if (res && res.data && res.data.app_subscription) {
      plan = res.data.app_subscription[0].plan_id;
      days = res.data.app_subscription[0].days_left;
    }

    let trueMone;
    // https://developer.monday.com/api-reference/reference/me
    if (plan === 'basic_plan' && seat <= 3) {
      trueMone = true;
    } else if (plan === 'basic_plan1' && seat > 3 && seat <= 25) {
      trueMone = true;
    } else if (plan === 'basic_plan2' && seat > 25 && seat <= 100) {
      trueMone = true;
    } else if (plan === 'basic_plan3' && seat > 100) {
      trueMone = true;
    } else {
      trueMone = false;
    }

    if (days>0 && trueMone) {
      const url = urls[0].url;
      const boardsIndex = url.indexOf('/boards/');
      const baseUrl = url.substring(0, boardsIndex + 8);
      const mondayClient = initMondayClient({ token });
      const resultString =
        text + '\n' + urls.map((item) => `<a href="${baseUrl}${itemId}/pulses/${item.id}">${item.name}</a>`).join(', ');
      
      // const resultString = `<html><body><a href="google.com">Link</a>\n<p>hello</p></body></html>`
      const query = `mutation create_notification($userId: ID!, $itemId: ID!, $resultString:String!){
  create_notification (user_id: $userId, target_id: $itemId, text: $resultString , target_type: Project) {
    text
  }
}
      `;
      const variables = { userId, itemId, resultString };

      const response = await mondayClient.api(query, { variables });
      // console.log(response)
      return response;
    } else if (days>0 && trueMone === false) {
      // console.log('or 1 here')
      const acctids = await getMe(token);
      if (acctids && acctids.data) {
        const acct = acctids.data.me.id;

        const resultString =
          'The plan you have chosen does not match the seat count of your account. Please choose a proper plan to use this application.';
        // const resultString = `<html><body><a href="google.com">Link</a>\n<p>hello</p></body></html>`
        const query = `mutation create_notification($acct: ID!, $itemId: ID!, $resultString:String!){
create_notification (user_id: $acct, target_id: $itemId, text: $resultString , target_type: Project) {
text
}
}
  `;
        const variables = { acct, itemId, resultString };

        const response = await mondayClient.api(query, { variables });

        return response;
      }
    }  else if (days<0 && trueMone === true) {
      // console.log('or 1 here')
      const acctids = await getMe(token);
      if (acctids && acctids.data) {
        const acct = acctids.data.me.id;

        const resultString =
          'The plan has expired. Please renew your plan to use this application.';
        // const resultString = `<html><body><a href="google.com">Link</a>\n<p>hello</p></body></html>`
        const query = `mutation create_notification($acct: ID!, $itemId: ID!, $resultString:String!){
create_notification (user_id: $acct, target_id: $itemId, text: $resultString , target_type: Project) {
text
}
}
  `;
        const variables = { acct, itemId, resultString };

        const response = await mondayClient.api(query, { variables });

        return response;
      }
    }else {
      // console.log('or2here')
      const acctids = await getMe(token);
      if (acctids && acctids.data) {
        const acct = acctids.data.me.id;

        const resultString =
          'Something went wrong. Please contact support using the link in the Board-view of this app.';
        // const resultString = `<html><body><a href="google.com">Link</a>\n<p>hello</p></body></html>`
        const query = `mutation create_notification($acct: ID!, $itemId: ID!, $resultString:String!){
create_notification (user_id: $acct, target_id: $itemId, text: $resultString , target_type: Project) {
text
}
}
  `;
        const variables = { acct, itemId, resultString };

        const response = await mondayClient.api(query, { variables });

        return response;
      }
    }
  } 
   catch (err) {
    console.error(err);
  }
  // }
};

const sendNotificationall = async (token, userId, itemId, urls, text) => {
  text = DOMPurify.sanitize(text);

  try {
    const url = urls[0].url;
    const boardsIndex = url.indexOf('/boards/');
    const baseUrl = url.substring(0, boardsIndex + 8);
    const mondayClient = initMondayClient({ token });
    urls.shift();
    const resultString =
      text + '\n' + urls.map((item) => `<a href="${baseUrl}${itemId}/pulses/${item.id}">${item.name}</a>`).join(', ');
    // const resultString = `<html><body><a href="google.com">Link</a>\n<p>hello</p></body></html>`
    const query = `mutation create_notification($userId: ID!, $itemId: ID!, $resultString:String!){
create_notification (user_id: $userId, target_id: $itemId, text: $resultString , target_type: Project) {
  text
}
}
    `;
    const variables = { userId, itemId, resultString };

    const response = await mondayClient.api(query, { variables });

    return response;
  } catch (err) {
    console.error(err);
  }
  // }
};
const getPaymentStatus = async (token) => {
  try {
    const mondayClient = initMondayClient({ token });
    let query;

    query = `{
  users (non_active:false, limit:100) {
   id
    is_verified
    is_guest
    is_view_only
    is_pending
  }
}
      `;

    const response = await mondayClient.api(query);

    return response;
  } catch (err) {
    console.error(err);
  }
};

const getMe = async (token) => {
  try {
    const mondayClient = initMondayClient({ token });
    let query;

    query = `query { me {
   
    id
  }
}
      `;

    const response = await mondayClient.api(query);

    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllBoardItems,
  getColumnValue,
  updates,
  sendNotification,
  sendNotificationall,
  getPaymentStatus,
  getAllBoardItems24,
};
