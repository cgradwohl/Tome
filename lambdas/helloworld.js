"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = async (event = {}) => {
    console.log("DUDE: \n");
    console.log(process.env.USER_POOL_ID);
    return { statusCode: 201, body: 'hello creaturee ...' + process.env.USER_POOL_ID };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG93b3JsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbGxvd29ybGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLE9BQU8sR0FBRyxLQUFLLEVBQUUsUUFBYSxFQUFFLEVBQWtCLEVBQUU7SUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFHdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDckYsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSA9IHt9KSA6IFByb21pc2UgPGFueT4gPT4ge1xuICBjb25zb2xlLmxvZyhcIkRVREU6IFxcblwiKTtcbiAgY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuVVNFUl9QT09MX0lEKTtcblxuXG4gIHJldHVybiB7IHN0YXR1c0NvZGU6IDIwMSwgYm9keTogJ2hlbGxvIGNyZWF0dXJlZSAuLi4nICsgcHJvY2Vzcy5lbnYuVVNFUl9QT09MX0lEIH07XG59OyJdfQ==