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
