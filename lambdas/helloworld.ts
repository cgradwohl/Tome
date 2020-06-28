export const handler = async (event: any = {}) : Promise <any> => {
  console.log("DUDE: \n");
  console.log(process.env.USER_POOL_ID);


  return { statusCode: 201, body: 'hello creaturee ...' + process.env.USER_POOL_ID };
};