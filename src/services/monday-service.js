const initMondayClient = require('monday-sdk-js');
const DOMPurify = require('isomorphic-dompurify');
// const { Storage } = require('@mondaycom/apps-sdk');
const getColumnValue = async (token, itemId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($itemId: [ID!]) {
        items (limit:500, ids: $itemId) {
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

    const query = `query boards($boardId: [ID!]) {
        boards(ids: $boardId) {
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
    const variables = { boardId };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};
const getAllItemsinGrp = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `query boards($boardId: [ID!]) {
        boards(ids: $boardId) {
      
            items_page(limit: 500) {
               items {
        group {
          id
          title
        }
        name
        id
        url
      }
            }
  
        }
      }
      `;
    const variables = { boardId };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};
const getAllItemsinStatus = async (token, boardId, columnId, index) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `query  {
        boards(ids: "${boardId}") {
      
            items_page(limit:200, query_params: {rules: [{column_id: "${columnId}", compare_value: [${index}] }] }) {
               items {
        
        name
        id
        url
      }
            }
  
        }
      }
      `;
    // const variables = { boardId ,columnId,arr};
    console.log(query);
    const response = await mondayClient.api(query);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const getAllItemsinStatusg = async (token, boardId, columnId, index) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `query  {
        boards(ids: "${boardId}") {
      
            items_page(limit: 500, query_params: {rules: [{column_id: "${columnId}", compare_value: [${index}] }] }) {
               items {
         group {
          id
          title
        }
        name
        id
        url
      }
            }
  
        }
      }
      `;
    // const variables = { boardId ,columnId,arr};
    console.log(query);
    const response = await mondayClient.api(query);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getAllItemsDue = async (token, boardId, columnId) => {
  try {
    const mondayClient = initMondayClient({ token });
    let query;
    if (/timeline/i.test(columnId)) {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 200,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TODAY"], compare_attribute: "END_DATE", operator: lower_than}]}) {
               items {
      
        name
        id
        url
      }
            }
  
        }
      }
      `;
    } else {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 500,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TODAY"], operator: lower_than}]}) {
               items {
      
        name
        id
        url
      }
            }
  
        }
      }
      `;
    }

    const response = await mondayClient.api(query);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const getAllItemsDueg = async (token, boardId, columnId) => {
  try {
    const mondayClient = initMondayClient({ token });
    let query;
    if (/timeline/i.test(columnId)) {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 500,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TODAY"], compare_attribute: "END_DATE", operator: lower_than}]}) {
               items {
                  group {
                        id
                        title
                      }
                      name
                      id
                      url
                }
            }
  
        }
      }
      `;
    } else {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 500,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TODAY"], operator: lower_than}]}) {
               items {
                  group {
                        id
                        title
                      }
                 name
                id
                url
               }
            }
  
        }
      }
      `;
    }

    const response = await mondayClient.api(query);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const updates = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `query  {
        boards(ids: "${boardId}") {
      
           
          updates (limit: 1000) {
    
                       created_at
                        item_id
              }

  
        }
      }
      `;
    // const variables = { boardId ,columnId,arr};

    const response = await mondayClient.api(query);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getAllItemsTom = async (token, boardId, columnId) => {
  try {
    const mondayClient = initMondayClient({ token });
    let query;
    
    if (/timeline/i.test(columnId)) {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 200,          
        query_params: {operator: and, rules: [{column_id: "${columnId}", compare_value: "TOMORROW",
         compare_attribute: "END_DATE" operator: greater_than_or_equals}, 
         {column_id: "${columnId}", compare_value: "TOMORROW", compare_attribute: "END_DATE" operator: lower_than_or_equal}]}
        ) {
               items {
      
        name
        id
        url
      }
            }
  
        }
      }
      `;
    } else {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 200,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TOMORROW"], operator: any_of}]}) {
               items {
      
        name
        id
        url
      }
            }
  
        }
      }
      `;
    }
    const response = await mondayClient.api(query);
    console.log(JSON.stringify(response))
    return response;
  } catch (err) {
    console.error(err);
  }
};
const getAllItemsTomg = async (token, boardId, columnId) => {
  try {
    const mondayClient = initMondayClient({ token });
    let query;
    if (/timeline/i.test(columnId)) {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 500, query_params: {operator: and, rules: [{column_id: "${columnId}", compare_value: "TOMORROW",
         compare_attribute: "END_DATE" operator: greater_than_or_equals}, 
         {column_id: "${columnId}", compare_value: "TOMORROW", compare_attribute: "END_DATE" operator: lower_than_or_equal}]}) {
               items {
                  group {
                        id
                        title
                      }
                      name
                      id
                      url
                }
            }
  
        }
      }
      `;
    } else {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 500,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TOMORROW"], operator:any_of}]}) {
               items {
                  group {
                        id
                        title
                      }
                 name
                id
                url
               }
            }
  
        }
      }
      `;
    }

    const response = await mondayClient.api(query);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getAllBoardItems24 = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `query boards($boardId: [ID!]) {
        boards(ids: $boardId) {
          items_page(limit:200) {
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
    const variables = { boardId };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const statusandtime = async (token, boardId, columnId, columnId2, index) => {
  try {
    const mondayClient = initMondayClient({ token });
    let query;
    if (/timeline/i.test(columnId)) {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 200,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TODAY"], compare_attribute: "END_DATE", operator: lower_than},{column_id: "${columnId2}", compare_value: [${index}] }] } ]}) {
               items {
      
        name
        id
        url
      }
            }
  
        }
      }
      `;
    } else {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 500,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TODAY"], operator: lower_than}, {column_id: "${columnId2}", compare_value: [${index}] }]}) {
               items {
      
        name
        id
        url
      }
            }
  
        }
      }
      `;
    }

    const response = await mondayClient.api(query);
    return response;
  } catch (err) {
    console.error(err);
  }
};
const statusandtime2 = async (token, boardId, columnId, columnId2, index) => {
  try {
    const mondayClient = initMondayClient({ token });

    let query;
    if (/timeline/i.test(columnId)) {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 200,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TOMORROW"], compare_attribute: "END_DATE", operator: lower_than_or_equal},{column_id: "${columnId2}", compare_value: [${index}]  } ]}) {
               items {
      
        name
        id
        url
      }
            }
  
        }
      }
      `;
    } else {
      query = `query  {
        boards(ids: "${boardId}") {
      
        items_page(limit: 500,  query_params: {rules: [ { 
        column_id: "${columnId}", compare_value:["TOMORROW"], operator: any_of}, {column_id: "${columnId2}", compare_value: [${index}] }]}) {
               items {
      
        name
        id
        url
      }
            }
  
        }
      }
      `;
    }

    const response = await mondayClient.api(query);
    return response;
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
      // console.log('or here')
      const resultString = text + '\n' + urls.map((item) => `<a href="${item.url}">${item.name}</a>`).join(', ');
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

const getPaymentStatus = async (token) => {
  try {
    const mondayClient = initMondayClient({ token });
    let query;

    query = `query {
  apps_monetization_info {
    seats_count
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
  getAllItemsinGrp,
  getColumnValue,
  getAllItemsinStatus,
  getAllItemsinStatusg,
  getAllItemsDue,
  getAllItemsDueg,
  getAllItemsTom,
  getAllItemsTomg,
  updates,
  statusandtime,
  statusandtime2,
  sendNotification,
  getPaymentStatus,
  getAllBoardItems24,
};
