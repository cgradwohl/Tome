"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@aws-cdk/core");
const auth_stack_1 = require("../lib/auth-stack");
describe('auth-stack', () => {
    it('should work', () => {
        const app = new core_1.App();
        new auth_stack_1.AuthStack(app, 'TestAuthStack');
        console.log('app', Object.keys(app));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGFjay50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC1zdGFjay50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esd0NBQW9DO0FBRXBDLGtEQUE4QztBQUU5QyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMxQixFQUFFLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQUcsRUFBRSxDQUFDO1FBRXRCLElBQUksc0JBQVMsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTeW50aFV0aWxzIH0gZnJvbSAnQGF3cy1jZGsvYXNzZXJ0JztcbmltcG9ydCB7IEFwcCB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG5pbXBvcnQgeyBBdXRoU3RhY2sgfSBmcm9tICcuLi9saWIvYXV0aC1zdGFjayc7XG5cbmRlc2NyaWJlKCdhdXRoLXN0YWNrJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHdvcmsnLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuXG4gICAgbmV3IEF1dGhTdGFjayhhcHAsICdUZXN0QXV0aFN0YWNrJyk7XG5cbiAgICBjb25zb2xlLmxvZygnYXBwJywgT2JqZWN0LmtleXMoYXBwKSk7XG4gIH0pO1xufSk7Il19