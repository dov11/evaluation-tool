# A Tool to Monitor and Evaluate Students' Performance

Front-End part of MongoDB-Express-React-Redux-Node application.

Allows users to create classes of students, whose performance can be evaluated with a grade(color: RED, YELLLOW, GREEN) and a remark.

App allows users to select a student of a certain class, with a higher probability of selection of students with lower average grade (RED 50%, YELLOW 33%, GREEN 17%)

API for the project can be found [here](https://github.com/dov11/game-API)  


## Database structure
1. Performance Code
  * colorCode:String
  * evaluationDate:Date
  * comment:String
2. Student
  * firstName:String
  * lastName:String
  * linkToPhoto:String
  * performanceCodes:[Performance Code]
3. Batch
  * bathNumber:Number
  * startDate:Date
  * endDate:Date
  * students:[Student]
  * authorId:{Schema.Types.ObjectId, ref: users}
  * createdAt:Date
  * updatedAt:Date

## Running Locally

Make sure you have [node(8.x)](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/) and either [npm](https://www.npmjs.com/) and/or [yarn](https://yarnpkg.com/en/) installed

```bash
git clone git@github.com:dov11/evaluation-tool.git
cd evaluation-tool
yarn install
yarn start
```
