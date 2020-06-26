"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const aws_cognito_1 = require("@aws-cdk/aws-cognito");
class TomeStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // Auth:
        // Cognito User Pool
        // note this is from the construct library and not a CFN Construct
        this.userPool = new aws_cognito_1.UserPool(this, 'TomeUserPool', {
            signInAliases: {
                email: true,
            },
            signInCaseSensitive: false,
            autoVerify: {
                email: true,
            },
            passwordPolicy: {
                minLength: 8,
                requireLowercase: true,
                requireDigits: true,
                requireUppercase: true,
                requireSymbols: true
            },
            standardAttributes: {
                givenName: {
                    mutable: true,
                    required: true
                },
                familyName: {
                    mutable: true,
                    required: true
                },
                email: {
                    mutable: true,
                    required: true
                }
            }
        });
        this.userPoolClient = new aws_cognito_1.UserPoolClient(this, 'TomeTestUserPoolClient', {
            userPoolClientName: 'testClient',
            userPool: this.userPool,
            authFlows: {
                adminUserPassword: true,
                refreshToken: true,
            },
            preventUserExistenceErrors: true
        });
        // Lambda
        // DynamoDB Table
        // User Data: Profile, Library, Group Meta, Queue, Tome
        // API Gateway
        // Cognito Authorizer
        // Lambda w/ read access to DDD
        // DynamoDB Table
        // TODO: folder structure (infra vs application code .... or are they the same?   :))
    }
}
exports.TomeStack = TomeStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9tZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvbWUtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBcUM7QUFDckMsc0RBQWdFO0FBQ2hFLE1BQWEsU0FBVSxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBSXRDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBRTdDLFFBQVE7UUFDUixvQkFBb0I7UUFDcEIsa0VBQWtFO1FBQ2xFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxzQkFBUSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDakQsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxJQUFJO2FBQ1o7WUFDRCxtQkFBbUIsRUFBRSxLQUFLO1lBQzFCLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsSUFBSTthQUNaO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLFNBQVMsRUFBRSxDQUFDO2dCQUNaLGdCQUFnQixFQUFFLElBQUk7Z0JBQ3RCLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixjQUFjLEVBQUUsSUFBSTthQUNyQjtZQUNELGtCQUFrQixFQUFFO2dCQUNsQixTQUFTLEVBQUU7b0JBQ1QsT0FBTyxFQUFFLElBQUk7b0JBQ2IsUUFBUSxFQUFFLElBQUk7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLE9BQU8sRUFBRSxJQUFJO29CQUNiLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2dCQUNELEtBQUssRUFBRTtvQkFDTCxPQUFPLEVBQUUsSUFBSTtvQkFDYixRQUFRLEVBQUUsSUFBSTtpQkFDZjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLDRCQUFjLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQ3ZFLGtCQUFrQixFQUFFLFlBQVk7WUFDaEMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVCxpQkFBaUIsRUFBRSxJQUFJO2dCQUN2QixZQUFZLEVBQUUsSUFBSTthQUNuQjtZQUNELDBCQUEwQixFQUFFLElBQUk7U0FDakMsQ0FBQyxDQUFDO1FBRUgsU0FBUztRQUNULGlCQUFpQjtRQUdqQix1REFBdUQ7UUFDdkQsY0FBYztRQUNkLHFCQUFxQjtRQUNyQiwrQkFBK0I7UUFDL0IsaUJBQWlCO1FBRWpCLHFGQUFxRjtJQUN2RixDQUFDO0NBQ0Y7QUFqRUQsOEJBaUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgVXNlclBvb2wsIFVzZXJQb29sQ2xpZW50IH0gZnJvbSAnQGF3cy1jZGsvYXdzLWNvZ25pdG8nO1xuZXhwb3J0IGNsYXNzIFRvbWVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIHVzZXJQb29sOiBVc2VyUG9vbDtcbiAgdXNlclBvb2xDbGllbnQ6IFVzZXJQb29sQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcblxuICAgIC8vIEF1dGg6XG4gICAgLy8gQ29nbml0byBVc2VyIFBvb2xcbiAgICAvLyBub3RlIHRoaXMgaXMgZnJvbSB0aGUgY29uc3RydWN0IGxpYnJhcnkgYW5kIG5vdCBhIENGTiBDb25zdHJ1Y3RcbiAgICB0aGlzLnVzZXJQb29sID0gbmV3IFVzZXJQb29sKHRoaXMsICdUb21lVXNlclBvb2wnLCB7XG4gICAgICBzaWduSW5BbGlhc2VzOiB7XG4gICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHNpZ25JbkNhc2VTZW5zaXRpdmU6IGZhbHNlLFxuICAgICAgYXV0b1ZlcmlmeToge1xuICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZFBvbGljeToge1xuICAgICAgICBtaW5MZW5ndGg6IDgsXG4gICAgICAgIHJlcXVpcmVMb3dlcmNhc2U6IHRydWUsXG4gICAgICAgIHJlcXVpcmVEaWdpdHM6IHRydWUsXG4gICAgICAgIHJlcXVpcmVVcHBlcmNhc2U6IHRydWUsXG4gICAgICAgIHJlcXVpcmVTeW1ib2xzOiB0cnVlXG4gICAgICB9LFxuICAgICAgc3RhbmRhcmRBdHRyaWJ1dGVzOiB7XG4gICAgICAgIGdpdmVuTmFtZToge1xuICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZmFtaWx5TmFtZToge1xuICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICBtdXRhYmxlOiB0cnVlLFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudXNlclBvb2xDbGllbnQgPSBuZXcgVXNlclBvb2xDbGllbnQodGhpcywgJ1RvbWVUZXN0VXNlclBvb2xDbGllbnQnLCB7XG4gICAgICB1c2VyUG9vbENsaWVudE5hbWU6ICd0ZXN0Q2xpZW50JyxcbiAgICAgIHVzZXJQb29sOiB0aGlzLnVzZXJQb29sLFxuICAgICAgYXV0aEZsb3dzOiB7XG4gICAgICAgIGFkbWluVXNlclBhc3N3b3JkOiB0cnVlLFxuICAgICAgICByZWZyZXNoVG9rZW46IHRydWUsXG4gICAgICB9LFxuICAgICAgcHJldmVudFVzZXJFeGlzdGVuY2VFcnJvcnM6IHRydWVcbiAgICB9KTtcbiAgICBcbiAgICAvLyBMYW1iZGFcbiAgICAvLyBEeW5hbW9EQiBUYWJsZVxuICAgIFxuXG4gICAgLy8gVXNlciBEYXRhOiBQcm9maWxlLCBMaWJyYXJ5LCBHcm91cCBNZXRhLCBRdWV1ZSwgVG9tZVxuICAgIC8vIEFQSSBHYXRld2F5XG4gICAgLy8gQ29nbml0byBBdXRob3JpemVyXG4gICAgLy8gTGFtYmRhIHcvIHJlYWQgYWNjZXNzIHRvIERERFxuICAgIC8vIER5bmFtb0RCIFRhYmxlXG5cbiAgICAvLyBUT0RPOiBmb2xkZXIgc3RydWN0dXJlIChpbmZyYSB2cyBhcHBsaWNhdGlvbiBjb2RlIC4uLi4gb3IgYXJlIHRoZXkgdGhlIHNhbWU/ICAgOikpXG4gIH1cbn1cbiJdfQ==