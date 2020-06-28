"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init = require('../test/utils/init.js');
const given = require('../test/utils/given.js');
const tearDown = require('../test/utils/tearDown.js');
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const tome_stack_1 = require("../../lib/tome-stack");
// console.log = jest.fn()
describe('Cognito User Pool', () => {
    let user;
    beforeAll(async () => {
        await init();
    });
    it('should return a new authed user', async () => {
        // TODO: pull in these values dynamically
        // I like this generate config idea :) ... see below:
        // THIS APPROACH should replace the need to have aws-cred 
        // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/cdk.ts#L384
        // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/generateConfig.ts#L17
        const app = new cdk.App();
        const tome = new tome_stack_1.TomeStack(app, 'TomeStack');
        const userPoolId = tome.userPool.userPoolId;
        const userPoolClientId = tome.userPoolClient.userPoolClientId;
        console.log('POOL', tome.userPool.userPoolId);
        user = await given.an_authenticated_user(userPoolId, userPoolClientId);
        expect(user.username).toBeDefined();
        expect(user.firstName).toBeDefined();
        expect(user.lastName).toBeDefined();
    });
    afterAll(async () => {
        await tearDown.an_authenticated_user(user);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9tZS50ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvbWUudGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUM5QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNoRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV0RCx1Q0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLHFEQUFpRDtBQUVqRCwwQkFBMEI7QUFFMUIsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtJQUNqQyxJQUFJLElBQXVELENBQUM7SUFFNUQsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ25CLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLElBQUksRUFBRTtRQUMvQyx5Q0FBeUM7UUFDekMscURBQXFEO1FBQ3JELDBEQUEwRDtRQUMxRCx5R0FBeUc7UUFDekcsbUhBQW1IO1FBQ25ILE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksc0JBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFHN0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDNUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDO1FBRTlELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFOUMsSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFBO0lBRUYsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2xCLE1BQU0sUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbml0ID0gcmVxdWlyZSgnLi4vdGVzdC91dGlscy9pbml0LmpzJyk7XG5jb25zdCBnaXZlbiA9IHJlcXVpcmUoJy4uL3Rlc3QvdXRpbHMvZ2l2ZW4uanMnKTtcbmNvbnN0IHRlYXJEb3duID0gcmVxdWlyZSgnLi4vdGVzdC91dGlscy90ZWFyRG93bi5qcycpO1xuXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgeyBUb21lU3RhY2sgfSBmcm9tICcuLi8uLi9saWIvdG9tZS1zdGFjayc7XG5cbi8vIGNvbnNvbGUubG9nID0gamVzdC5mbigpXG5cbmRlc2NyaWJlKCdDb2duaXRvIFVzZXIgUG9vbCcsICgpID0+IHtcbiAgbGV0IHVzZXI6IHsgdXNlcm5hbWU6IGFueTsgZmlyc3ROYW1lOiBhbnk7IGxhc3ROYW1lOiBhbnk7IH07XG5cbiAgYmVmb3JlQWxsKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBpbml0KCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGEgbmV3IGF1dGhlZCB1c2VyJywgYXN5bmMgKCkgPT4ge1xuICAgIC8vIFRPRE86IHB1bGwgaW4gdGhlc2UgdmFsdWVzIGR5bmFtaWNhbGx5XG4gICAgLy8gSSBsaWtlIHRoaXMgZ2VuZXJhdGUgY29uZmlnIGlkZWEgOikgLi4uIHNlZSBiZWxvdzpcbiAgICAvLyBUSElTIEFQUFJPQUNIIHNob3VsZCByZXBsYWNlIHRoZSBuZWVkIHRvIGhhdmUgYXdzLWNyZWQgXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2F3cy1zYW1wbGVzL2FtYXpvbi1jb2duaXRvLWV4YW1wbGUtZm9yLWV4dGVybmFsLWlkcC9ibG9iL21hc3Rlci9jZGsvc3JjL2Nkay50cyNMMzg0XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2F3cy1zYW1wbGVzL2FtYXpvbi1jb2duaXRvLWV4YW1wbGUtZm9yLWV4dGVybmFsLWlkcC9ibG9iL21hc3Rlci9jZGsvc3JjL2dlbmVyYXRlQ29uZmlnLnRzI0wxN1xuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgY29uc3QgdG9tZSA9IG5ldyBUb21lU3RhY2soYXBwLCAnVG9tZVN0YWNrJyk7XG5cbiAgICBcbiAgICBjb25zdCB1c2VyUG9vbElkID0gdG9tZS51c2VyUG9vbC51c2VyUG9vbElkO1xuICAgIGNvbnN0IHVzZXJQb29sQ2xpZW50SWQgPSB0b21lLnVzZXJQb29sQ2xpZW50LnVzZXJQb29sQ2xpZW50SWQ7XG5cbiAgICBjb25zb2xlLmxvZygnUE9PTCcsIHRvbWUudXNlclBvb2wudXNlclBvb2xJZCk7XG4gICAgICBcbiAgICB1c2VyID0gYXdhaXQgZ2l2ZW4uYW5fYXV0aGVudGljYXRlZF91c2VyKHVzZXJQb29sSWQsIHVzZXJQb29sQ2xpZW50SWQpO1xuICBcbiAgICBleHBlY3QodXNlci51c2VybmFtZSkudG9CZURlZmluZWQoKTtcbiAgICBleHBlY3QodXNlci5maXJzdE5hbWUpLnRvQmVEZWZpbmVkKCk7XG4gICAgZXhwZWN0KHVzZXIubGFzdE5hbWUpLnRvQmVEZWZpbmVkKCk7XG4gIH0pXG5cbiAgYWZ0ZXJBbGwoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHRlYXJEb3duLmFuX2F1dGhlbnRpY2F0ZWRfdXNlcih1c2VyKVxuICB9KVxufSk7XG4iXX0=