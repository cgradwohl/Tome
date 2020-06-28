"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
require("@aws-cdk/assert/jest");
const core_1 = require("@aws-cdk/core");
const auth_stack_1 = require("../../lib/auth-stack");
const init_1 = require("../utils/init");
const app = new core_1.App();
const authStack = new auth_stack_1.AuthStack(app, 'TestAuthStack');
describe('auth-stack', () => {
    beforeAll(async () => {
        await init_1.init();
    });
    it('should work', () => {
        expect(assert_1.SynthUtils.toCloudFormation(authStack)).toMatchSnapshot();
    });
    it('should deploy user pool', () => {
        expect(authStack).toHaveResource('AWS::Cognito::UserPool', {
            AutoVerifiedAttributes: [
                "email"
            ],
            AdminCreateUserConfig: {
                AllowAdminCreateUserOnly: true,
            },
            AccountRecoverySetting: {
                RecoveryMechanisms: [
                    {
                        Name: "verified_phone_number",
                        Priority: 1,
                    },
                    {
                        Name: "verified_email",
                        Priority: 2,
                    },
                ],
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGFjay50ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgtc3RhY2sudGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNkM7QUFDN0MsZ0NBQThCO0FBQzlCLHdDQUF3QztBQUV4QyxxREFBaUQ7QUFFakQsd0NBQXFDO0FBRXJDLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxzQkFBUyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUl0RCxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMxQixTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDbkIsTUFBTSxXQUFJLEVBQUUsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7UUFDckIsTUFBTSxDQUFDLG1CQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7UUFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRTtZQUN6RCxzQkFBc0IsRUFBRTtnQkFDdEIsT0FBTzthQUNSO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLHdCQUF3QixFQUFFLElBQUk7YUFDL0I7WUFDRCxzQkFBc0IsRUFBRTtnQkFDdEIsa0JBQWtCLEVBQUU7b0JBQ2xCO3dCQUNFLElBQUksRUFBRSx1QkFBdUI7d0JBQzdCLFFBQVEsRUFBRSxDQUFDO3FCQUNaO29CQUNEO3dCQUNFLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLFFBQVEsRUFBRSxDQUFDO3FCQUNaO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ludGhVdGlscyB9IGZyb20gJ0Bhd3MtY2RrL2Fzc2VydCc7XG5pbXBvcnQgJ0Bhd3MtY2RrL2Fzc2VydC9qZXN0JztcbmltcG9ydCB7IEFwcCwgRm4gfSBmcm9tICdAYXdzLWNkay9jb3JlJztcblxuaW1wb3J0IHsgQXV0aFN0YWNrIH0gZnJvbSAnLi4vLi4vbGliL2F1dGgtc3RhY2snO1xuXG5pbXBvcnQgeyBpbml0IH0gZnJvbSAnLi4vdXRpbHMvaW5pdCc7XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmNvbnN0IGF1dGhTdGFjayA9IG5ldyBBdXRoU3RhY2soYXBwLCAnVGVzdEF1dGhTdGFjaycpO1xuXG5cblxuZGVzY3JpYmUoJ2F1dGgtc3RhY2snLCAoKSA9PiB7XG4gIGJlZm9yZUFsbChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgaW5pdCgpO1xuICB9KVxuICBcbiAgaXQoJ3Nob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgIGV4cGVjdChTeW50aFV0aWxzLnRvQ2xvdWRGb3JtYXRpb24oYXV0aFN0YWNrKSkudG9NYXRjaFNuYXBzaG90KCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZGVwbG95IHVzZXIgcG9vbCcsICgpID0+IHsgXG4gICAgZXhwZWN0KGF1dGhTdGFjaykudG9IYXZlUmVzb3VyY2UoJ0FXUzo6Q29nbml0bzo6VXNlclBvb2wnLCB7XG4gICAgICBBdXRvVmVyaWZpZWRBdHRyaWJ1dGVzOiBbXG4gICAgICAgIFwiZW1haWxcIlxuICAgICAgXSxcbiAgICAgIEFkbWluQ3JlYXRlVXNlckNvbmZpZzoge1xuICAgICAgICBBbGxvd0FkbWluQ3JlYXRlVXNlck9ubHk6IHRydWUsXG4gICAgICB9LFxuICAgICAgQWNjb3VudFJlY292ZXJ5U2V0dGluZzoge1xuICAgICAgICBSZWNvdmVyeU1lY2hhbmlzbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBOYW1lOiBcInZlcmlmaWVkX3Bob25lX251bWJlclwiLFxuICAgICAgICAgICAgUHJpb3JpdHk6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBOYW1lOiBcInZlcmlmaWVkX2VtYWlsXCIsXG4gICAgICAgICAgICBQcmlvcml0eTogMixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSlcbn0pOyJdfQ==