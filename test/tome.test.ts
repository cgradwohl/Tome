const init = require('../test/utils/init.js');
const given = require('../test/utils/given.js');
const tearDown = require('../test/utils/tearDown.js');

console.log = jest.fn()

describe('Cognito User Pool', () => {
  let user: { username: any; firstName: any; lastName: any; };

  beforeAll(async () => {
    await init();
  });

  it('should return a new authed user', async () => {
    // TODO: pull in these values dynamically
    // I like this generate config idea :) ... see below:
    // THIS APPROACH should replace the need to have aws-cred 
    // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/cdk.ts#L384
    // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/generateConfig.ts#L17
    const userPoolId = 'how to get this ?';
    const userPoolClientId = 'how to get this ?';
      
    user = await given.an_authenticated_user(userPoolId, userPoolClientId);
  
    expect(user.username).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
  })

  afterAll(async () => {
    await tearDown.an_authenticated_user(user)
  })
});
