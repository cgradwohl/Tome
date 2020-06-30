"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
require("@aws-cdk/assert/jest");
const core_1 = require("@aws-cdk/core");
const auth_stack_1 = require("../../lib/auth-stack");
const app = new core_1.App();
const authStack = new auth_stack_1.default(app, 'TestAuthStack');
describe('auth-stack', () => {
    it('should generate expected cloud formation template', () => {
        expect(assert_1.SynthUtils.toCloudFormation(authStack)).toMatchSnapshot();
    });
    it('should deploy a user pool', () => {
        expect(authStack).toHaveResource('AWS::Cognito::UserPool', {
            AutoVerifiedAttributes: [
                'email',
            ],
            AdminCreateUserConfig: {
                AllowAdminCreateUserOnly: true,
            },
            AccountRecoverySetting: {
                RecoveryMechanisms: [
                    {
                        Name: 'verified_phone_number',
                        Priority: 1,
                    },
                    {
                        Name: 'verified_email',
                        Priority: 2,
                    },
                ],
            },
        });
    });
    it('should deploy a user pool client', () => { expect('todo').toEqual('todo'); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGFjay50ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgtc3RhY2sudGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNkM7QUFDN0MsZ0NBQThCO0FBQzlCLHdDQUF3QztBQUV4QyxxREFBNkM7QUFFN0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFTLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRXRELFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzFCLEVBQUUsQ0FBQyxtREFBbUQsRUFBRSxHQUFHLEVBQUU7UUFDM0QsTUFBTSxDQUFDLG1CQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7UUFDbkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRTtZQUN6RCxzQkFBc0IsRUFBRTtnQkFDdEIsT0FBTzthQUNSO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ3JCLHdCQUF3QixFQUFFLElBQUk7YUFDL0I7WUFDRCxzQkFBc0IsRUFBRTtnQkFDdEIsa0JBQWtCLEVBQUU7b0JBQ2xCO3dCQUNFLElBQUksRUFBRSx1QkFBdUI7d0JBQzdCLFFBQVEsRUFBRSxDQUFDO3FCQUNaO29CQUNEO3dCQUNFLElBQUksRUFBRSxnQkFBZ0I7d0JBQ3RCLFFBQVEsRUFBRSxDQUFDO3FCQUNaO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEYsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTeW50aFV0aWxzIH0gZnJvbSAnQGF3cy1jZGsvYXNzZXJ0JztcbmltcG9ydCAnQGF3cy1jZGsvYXNzZXJ0L2plc3QnO1xuaW1wb3J0IHsgQXBwLCBGbiB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG5pbXBvcnQgQXV0aFN0YWNrIGZyb20gJy4uLy4uL2xpYi9hdXRoLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuY29uc3QgYXV0aFN0YWNrID0gbmV3IEF1dGhTdGFjayhhcHAsICdUZXN0QXV0aFN0YWNrJyk7XG5cbmRlc2NyaWJlKCdhdXRoLXN0YWNrJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIGdlbmVyYXRlIGV4cGVjdGVkIGNsb3VkIGZvcm1hdGlvbiB0ZW1wbGF0ZScsICgpID0+IHtcbiAgICBleHBlY3QoU3ludGhVdGlscy50b0Nsb3VkRm9ybWF0aW9uKGF1dGhTdGFjaykpLnRvTWF0Y2hTbmFwc2hvdCgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGRlcGxveSBhIHVzZXIgcG9vbCcsICgpID0+IHtcbiAgICBleHBlY3QoYXV0aFN0YWNrKS50b0hhdmVSZXNvdXJjZSgnQVdTOjpDb2duaXRvOjpVc2VyUG9vbCcsIHtcbiAgICAgIEF1dG9WZXJpZmllZEF0dHJpYnV0ZXM6IFtcbiAgICAgICAgJ2VtYWlsJyxcbiAgICAgIF0sXG4gICAgICBBZG1pbkNyZWF0ZVVzZXJDb25maWc6IHtcbiAgICAgICAgQWxsb3dBZG1pbkNyZWF0ZVVzZXJPbmx5OiB0cnVlLFxuICAgICAgfSxcbiAgICAgIEFjY291bnRSZWNvdmVyeVNldHRpbmc6IHtcbiAgICAgICAgUmVjb3ZlcnlNZWNoYW5pc21zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgTmFtZTogJ3ZlcmlmaWVkX3Bob25lX251bWJlcicsXG4gICAgICAgICAgICBQcmlvcml0eTogMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIE5hbWU6ICd2ZXJpZmllZF9lbWFpbCcsXG4gICAgICAgICAgICBQcmlvcml0eTogMixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBkZXBsb3kgYSB1c2VyIHBvb2wgY2xpZW50JywgKCkgPT4geyBleHBlY3QoJ3RvZG8nKS50b0VxdWFsKCd0b2RvJyk7IH0pO1xufSk7XG4iXX0=